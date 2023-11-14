import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizSelection from './QuizSelection';
import Quiz from './Quiz';
import QuizEth from './QuizEth';

const quizzes = [
  { id: 1, type: 'Quiz', label: 'JavaScript' },
  { id: 2, type: 'QuizEth', label: 'Ethereum' },
];

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizSelection quizzes={quizzes} />} />
        {quizzes.map((quiz) => (
          <Route
            key={quiz.id}
            path={`/quiz/${quiz.type.toLowerCase()}/:quizId`}
            element={
              quiz.type === 'Quiz' ? (
                <Quiz />
              ) : quiz.type === 'QuizEth' ? (
                <QuizEth />
              ) : null
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;


