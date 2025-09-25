import React, { useState } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { School, Science, LibraryBooks } from '@mui/icons-material';

function StartScreen({ onStartPractice, onStartTest, onStartSectionPractice, sections }) {
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

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Świadectwo Kwalifikacji
      </Typography>
      <Typography variant="h5" component="p" color="text.secondary" paragraph>
        Wybierz tryb:
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<School />}
          onClick={onStartPractice}
          sx={{ m: 1 }}
        >
          Praktyka
        </Button>
        <Button
          variant="contained"
          size="large"
          startIcon={<Science />}
          onClick={onStartTest}
          sx={{ m: 1 }}
        >
          Test
        </Button>
        <Button
          variant="contained"
          size="large"
          startIcon={<LibraryBooks />}
          onClick={() => setShowSections(true)}
          sx={{ m: 1 }}
        >
          Ucz się z działu
        </Button>
      </Box>
    </Container>
  );
}

export default StartScreen;
