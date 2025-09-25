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
        <Typography variant="h4" component="h1" gutterBottom>
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
    width: '200px',    
    aspectRatio: '1 / 1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    p: 2,
    fontSize: '1.2rem',
    backgroundColor: '#1976d2',
    '&:hover': {
      backgroundColor: '#1565c0',
    },
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Świadectwo Kwalifikacji Pilota Paralotniowego
      </Typography>
      <Typography variant="h5" component="p" color="text.secondary" paragraph>
        Wybierz tryb:
      </Typography>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={2} sx={{ maxWidth: '420px' }}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              size="large"
              onClick={onStartPractice}
              sx={buttonSx}
            >
              <School sx={{ fontSize: 40, mb: 1 }} />
              Praktyka
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              size="large"
              onClick={onStartTest}
              sx={buttonSx}
            >
              <Science sx={{ fontSize: 40, mb: 1 }} />
              Test
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              size="large"
              onClick={() => setShowSections(true)}
              sx={buttonSx}
            >
              <LibraryBooks sx={{ fontSize: 40, mb: 1 }} />
              Ucz się z działu
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              size="large"
              onClick={onReviewAll}
              sx={buttonSx}
            >
              <CheckCircleOutline sx={{ fontSize: 40, mb: 1 }} />
              Wszystkie odpowiedzi
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default StartScreen;
