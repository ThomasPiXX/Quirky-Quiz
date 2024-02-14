import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import QuizSelection from './QuizSelection';
import Quiz from './Quiz';
import QuizEth from './QuizEth';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const quizzes = [
  { id: 1, type: 'Quiz', label: 'JavaScript' },
  { id: 2, type: 'QuizEth', label: 'Ethereum' },
  { id: 3, type: 'LoginForm', label: 'Login'},
  { id: 4, type: 'SignUpForm', label: 'SingUp'},
];

function App() {
return (
  <Router>
    <Routes>

      <Route path="/" element={<QuizSelection quizzes={quizzes} />} />
      {quizzes.map((quiz) => (
        <Route
        key={quiz.id}
        path ={`/quiz/${quiz.type.toLowerCase()}/:quizId`}
        element={
          quiz.type === 'Quiz' ?(
            <Quiz />
          ) : quiz.type === 'QuizEth' ? (
            <QuizEth/>
          ) : quiz.type === 'LoginForm' ? (
            <LoginForm/> 
          ) : quiz.type === 'SignUpForm' ?(
            <SignUpForm/>
          ) : null
        }
        />
      ))}
    </Routes>
  </Router>
);
}


export default App;
