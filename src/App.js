import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizSelection from './QuizSelection';
import Quiz from './Quiz';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizSelection />} />
        <Route path="/quiz/:quizId" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;

