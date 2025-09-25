import React, { useState, useEffect } from 'react';
import { Button, Typography, Box } from '@mui/material';

function QuestionCard({ question, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const correctIndex = question.correctAnswer;

  useEffect(() => {
    setSelected(null);
    setAnswered(false);
  }, [question]);

  const handleClick = (index) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
  };

  const handleNext = () => {
    onAnswer(selected === correctIndex);
  };

  const getButtonVariant = (index) => {
    if (!answered) {
      return selected === index ? 'contained' : 'outlined';
    }
    if (index === correctIndex) {
      return 'contained';
    }
    return 'outlined';
  };

  const getButtonColor = (index) => {
    if (!answered) {
      return 'primary';
    }
    if (index === correctIndex) {
      return 'success';
    }
    if (index === selected) {
      return 'error';
    }
    return 'primary';
  };

  return (
    <>
      <Typography variant="h5" component="h3" gutterBottom>
        {question.question}
      </Typography>
      {question.image && (
        <Box sx={{ mt: 2, mb: 2 }}>
          <img src={`/assets/${question.image}`} alt="question illustration" style={{ maxWidth: '100%', height: 'auto' }} />
        </Box>
      )}
      <Box sx={{ mt: 2 }}>
        {question.answers.map((opt, i) => (
          <Button
            key={i}
            onClick={() => handleClick(i)}
            variant={getButtonVariant(i)}
            color={getButtonColor(i)}
            disabled={answered && selected !== i && i !== correctIndex}
            fullWidth
            sx={{ mb: 1, justifyContent: 'flex-start', textTransform: 'none', textAlign: 'left' }}
          >
            {opt}
          </Button>
        ))}
      </Box>
      {answered && (
        <Button onClick={handleNext} variant="contained" sx={{ mt: 2 }}>
          Następne
        </Button>
      )}
    </>
  );
}

export default QuestionCard;
