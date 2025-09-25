import React, { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import StartScreen from "./StartScreen";
import ReviewQuestionCard from "./ReviewQuestionCard"; // Import new component
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
} from "@mui/material";

function App() {
  const TIME_LIMIT = 1200;
  const [allQuestions, setAllQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [sections, setSections] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [mode, setMode] = useState("start"); // 'start', 'practice', 'test', 'section', 'reviewAll'
  const [timer, setTimer] = useState(TIME_LIMIT); // 30 minutes in seconds

  useEffect(() => {
    fetch("/questions.json")
      .then((res) => res.json())
      .then((data) => {
        const sectionsData = data.map((section) => section.category);
        setSections(sectionsData);
        const flatQuestions = data.flatMap((section) =>
          section.questions.map((question) => ({
            ...question,
            sectionTitle: section.category,
          }))
        );
        setAllQuestions(flatQuestions);
      });
  }, []);

  useEffect(() => {
    if (mode === "test" && timer > 0 && !showResult) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setShowResult(true);
    }
  }, [mode, timer, showResult]);

  const handleStartPractice = (sectionTitle = null) => {
    let questionsToSet = allQuestions;
    if (typeof sectionTitle === "string") {
      questionsToSet = allQuestions.filter(
        (q) => q.sectionTitle === sectionTitle
      );
    }
    setQuestions(questionsToSet);
    setMode("practice");
  };

  const handleStartTest = () => {
    const randomQuestions = [...allQuestions]
      .sort(() => 0.5 - Math.random())
      .slice(0, 20);
    setQuestions(randomQuestions);
    setMode("test");
  };

  const handleReviewAll = () => {
    setQuestions(allQuestions);
    setMode("reviewAll");
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setShowResult(true);
    }
  };

  const handleStop = () => {
    setShowResult(true);
  };

  const restart = () => {
    setQuestions([]);
    setCurrent(0);
    setScore(0);
    setShowResult(false);
    setMode("start");
    setTimer(TIME_LIMIT);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (mode === "start") {
    return (
      <StartScreen
        onStartPractice={handleStartPractice}
        onStartTest={handleStartTest}
        onStartSectionPractice={handleStartPractice}
        onReviewAll={handleReviewAll}
        sections={sections}
      />
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {mode === "test" && (
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Pozostały czas: {formatTime(timer)}
        </Typography>
      )}
      {mode === "reviewAll" ? (
        <Card>
          <CardContent>
            <Typography variant="h4" component="h2" align="center" gutterBottom>
              Wszystkie odpowiedzi
            </Typography>
            <Button variant="contained" onClick={restart} sx={{ mt: 2 }}>
              Strona główna
            </Button>
            {sections.map((sectionTitle) => (
              <Box key={sectionTitle} sx={{ mb: 4 }}>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{ mt: 4, mb: 2 }}
                >
                  {sectionTitle}
                </Typography>
                {allQuestions
                  .filter((q) => q.sectionTitle === sectionTitle)
                  .map((q, index) => (
                    <ReviewQuestionCard
                      key={index}
                      question={q}
                      questionNumber={index + 1}
                    />
                  ))}
              </Box>
            ))}
            <Button variant="contained" onClick={restart} sx={{ mt: 2 }}>
              Strona główna
            </Button>
          </CardContent>
        </Card>
      ) : questions.length > 0 && !showResult ? (
        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                sx={{ fontWeight: "bold" }}
              >
                {questions[current].sectionTitle}
              </Typography>
              <Button variant="outlined" color="error" onClick={handleStop}>
                Stop
              </Button>
            </Box>
            <QuestionCard
              question={questions[current]}
              onAnswer={handleAnswer}
            />
            <Typography variant="h6" component="h3" gutterBottom>
              Pytanie {current + 1} z {questions.length}
            </Typography>
          </CardContent>
        </Card>
      ) : showResult ? (
        <Card>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Twój wynik: {score} / {questions.length}
            </Typography>
            <Typography>Poprawne odpowiedzi: {score}</Typography>
            <Typography>
              Niepoprawne odpowiedzi: {questions.length - score}
            </Typography>
            <Button variant="contained" onClick={restart} sx={{ mt: 2 }}>
              Zacznij od nowa
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Typography>Loading questions...</Typography>
      )}
    </Container>
  );
}

export default App;
