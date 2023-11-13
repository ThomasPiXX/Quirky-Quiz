import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';


const Quiz = () => {
    const initialQuestions = [
        {
            question:'function checkSign(-3){ return num < 0 ? "positive" : num < 0 ? "negative" : "zero"};',
            options: ['positive', 'negative','zero'],
            correctAnswer: 'negative',
        },
        {
            question: 'for (let i = 0, text = ""; i < 5; text += i++)(console.log(text))',
            options: ['01234','5','0, 01,012,0123,01234'],
            correctAnswer:'0, 01,012,0123,01234'
        },
        // more question 
    ];

    const [questions, setQuestions] = useState(initialQuestions);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const Navigate = useNavigate();

    const handleAnswerClick = (selectedAnswer) => {
      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
  
      const nextQuestion = currentQuestion + 1;
  
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setQuizCompleted(true);
      }
    };
  
    const handleRestartQuiz = () => {
      setQuestions(initialQuestions);
      setCurrentQuestion(0);
      setScore(0);
      setQuizCompleted(false);
    };

    const handleBackToQuizSelection = () => {
      Navigate('/');
    }

    return (
      <div className="container">
        {quizCompleted ? (
          <div className="row">
            <div className="col s12">
              <h2 className="center-align">
                Quiz completed! Your score: {score} out of {questions.length}
              </h2>
              <div className="center-align">
                <button
                  className="btn waves-effect waves-light blue"
                  onClick={handleRestartQuiz}
                >
                  Restart Quiz
                </button>
                <button
                  className="btn waves-effect waves-light blue"
                  onClick={handleBackToQuizSelection}
                >
                  Back to Quiz Selection
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col s12">
              <h4 className="question">{questions[currentQuestion].question}</h4>
              <div className="options">
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="card blue-grey darken-1">
                    <div className="card-content white-text">
                      <button
                        className="btn waves-effect waves-light"
                        onClick={() => handleAnswerClick(option)}
                      >
                        {option}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <p className="center-align">Current Score: {score}</p>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  
export default Quiz;