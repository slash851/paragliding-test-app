import React, { useState } from 'react';
import { Button, Container, Typography, Box, Grid } from '@mui/material';
import { School, Science, LibraryBooks, CheckCircleOutline } from '@mui/icons-material';

function StartScreen({ onStartPractice, onStartTest, onStartSectionPractice, onReviewAll, sections }) {
  const [showSections, setShowSections] = useState(false);

  const handleSectionClick = (sectionTitle) => {
    onStartSectionPractice(sectionTitle);
  };

  if (showSections) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h4" component="h4" gutterBottom>
          Wybierz dział:
        </Typography>
        <Box sx={{ mt: 4 }}>
          {sections.map(section => (
            <Button
              key={section}
              variant="contained"
              size="large"
              onClick={() => handleSectionClick(section)}
              sx={{ m: 1 }}
            >
              {section}
            </Button>
          ))}
        </Box>
        <Button onClick={() => setShowSections(false)} sx={{ mt: 2 }}>
          Powrót
        </Button>
      </Container>
    );
  }

  const buttonSx = {
    width: '8em',    
    aspectRatio: '1 / 1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    p: 2,
    m: 1,
    fontSize: '1.2rem',
    backgroundColor: '#1976d2',
    '&:hover': {
      backgroundColor: '#1565c0',
    },
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h4" component="h4" gutterBottom>
        Świadectwo Kwalifikacji Pilota Paralotniowego
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={onStartPractice}
            sx={buttonSx}
          >
            <School sx={{ fontSize: 40, mb: 1 }} />
            Praktyka
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={onStartTest}
            sx={buttonSx}
          >
            <Science sx={{ fontSize: 40, mb: 1 }} />
            Test
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => setShowSections(true)}
            sx={buttonSx}
          >
            <LibraryBooks sx={{ fontSize: 40, mb: 1 }} />
            Ucz się z działu
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={onReviewAll}
            sx={buttonSx}
          >
            <CheckCircleOutline sx={{ fontSize: 40, mb: 1 }} />
            Wszystkie odpowiedzi
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default StartScreen;
