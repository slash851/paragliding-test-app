import React from 'react';
import { Typography, Box, Button } from '@mui/material';

function ReviewQuestionCard({ question, questionNumber }) {
  return (
    <Box sx={{ mb: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
      <Typography variant="h6" component="h4" gutterBottom>
        {questionNumber}. {question.question}
      </Typography>
      {question.image && (
        <Box sx={{ mt: 2, mb: 2 }}>
          <img src={`/assets/${question.image}`} alt="question illustration" style={{ maxWidth: '100%', height: 'auto' }} />
        </Box>
      )}
      <Box sx={{ mt: 2 }}>
        {question.answers.map((answer, i) => (
          <Button
            key={i}
            variant={i === question.correctAnswer ? 'contained' : 'outlined'}
            color={i === question.correctAnswer ? 'success' : 'primary'}
            fullWidth
            sx={{ mb: 1, justifyContent: 'flex-start', textTransform: 'none', textAlign: 'left' }}
          >
            {answer}
          </Button>
        ))}
      </Box>
    </Box>
  );
}

export default ReviewQuestionCard;
