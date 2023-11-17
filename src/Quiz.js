import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';


const Quiz = () => {
    const initialQuestions = [
        {
          question:'console.log([] + {});',
          options:['undefined', '{}', 'TypeError', '0[object Object]'],
          correctAnswer: '[object Object]',
        },        
        {
          question:'console.log("10" + 2 - "5");',
          options:['5', '15', '102', 'TypeError'],
          correctAnswer: '52',
        },
        {
          question:'console.log(2 == [[2]]);',
          options:['true', 'false', 'undefined', 'TypeError'],
          correctAnswer: 'true',
        },
        {
          question:'let x = "5"; x -= 2;',
          options:['3', '5', 'NaN', 'TypeError'],
          correctAnswer: '3',
        },
        {
          question:'console.log(!!"false" == !!"true");',
          options:['true', 'false', 'undefined', 'TypeError'],
          correctAnswer: 'true',
        },
        {
          question:'console.log("20" - "2" + "5");',
          options:['25', '18', '23', 'TypeError'],
          correctAnswer: '235',
        },
        {
          question:'console.log("true" === true);',
          options:['true', 'false', 'undefined', 'TypeError'],
          correctAnswer: 'false',
        },
        {
          question:'let x = 0; x = x++ + ++x;',
          options:['0', '1', '2', '3'],
          correctAnswer: '2',
        },
        {
          question:'console.log("5" + 3 * 2)',
          options:['11', '56', '15', 'TypeError'],
          correctAnswer: '56',
        },
        {
          question:'console.log(typeof typeof 42);',
          options:['"number"', '"string"', '"undefined"', '"object"'],
          correctAnswer: '"string"',
        },
        {
          question:'console.log(1 < 2 < 3);',
          options:['true', 'false', 'undefined', 'TypeError'],
          correctAnswer: 'true',
        },
        {
          question:'console.log("hello" - 1);',
          options:['hello1', 'NaN', 'SyntaxError', 'undefined'],
          correctAnswer: 'NaN',
        },
        {
          question:'console.log("2" * "3");',
          options:['6', '23', 'NaN', 'SyntaxError'],
          correctAnswer: '6',
        },
        {
          question:'console.log(1 + "1" - 1);',
          options:['10', '11', '01', '21'],
          correctAnswer: '10',
        },
        {
          question:'console.log("true" == true);',
          options:['true', 'false', 'undefined', 'TypeError'],
          correctAnswer: 'true',
        },
        {
          question:'let x = 5; x += x - (x * 2);',
          options:['-5', '0', '5', '10'],
          correctAnswer: '-5',
        },
        {
          question:'console.log(0.1 + 0.2 === 0.3);',
          options:['true', 'false', 'undefined', 'TypeError'],
          correctAnswer: 'false',
        },
        {
          question:'console.log(+"42");',
          options:['42', 'NaN', 'SyntaxError', 'TypeError'],
          correctAnswer: '42',
        },
        {
            question: 'console.log("5" - 3);',
            options: ['2', '8', '53', 'NaN'],
            correctAnswer: '2',
        },
        {
            question: 'console.log(typeof NaN === "number");',
            options: ['true', 'false', 'undefined', 'NaN'],
            correctAnswer: 'true',
        },
        {
            question: 'console.log([] == ![]);',
            options: ['true', 'false', 'undefined', 'NaN'],
            correctAnswer: 'true',
        },  
        {
            question: 'console.log(2 + "2" == "2" + 2);',
            options: ['true', 'false', 'undefined', 'NaN'],
            correctAnswer: 'true',
        },
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
    const [showCustomAlert, setShowCustomAlert] = useState(false);
    const [customAlertMessage, setCustomAlertMessage] = useState('');

    const shuffleArray = (array) => {
      const shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1 ));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
    }

    useEffect(() => {

      setQuestions(shuffleArray(initialQuestions));
    }, []);

    const handleAnswerClick = (selectedAnswer) => {
      let isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    
      if (isCorrect) {
        setScore(score + 1);
      }
    
      setCustomAlertMessage(isCorrect ? 'Correct!' : 'Incorrect!');
      setShowCustomAlert(true);
    
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
                  <div key={index} className="card white">
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
              <div className="row">
                <div className="col s12">
                  <p className="center-align">Current Score: {score} out of {questions.length}</p>
                </div>
              </div>
              {showCustomAlert && (
            <div className={`row ${customAlertMessage === 'Correct!' ? 'green' : 'red'}`}>
              <div className="col s12">
                <div className="">
                  <div className="card-content white-text">
                    <p className="center-align">
                      {customAlertMessage === 'Incorrect!'
                      ? `Correct Answer: ${questions[currentQuestion - 1].correctAnswer}`
                    : customAlertMessage}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
            </div>
          </div>
        )}
      </div>
    );
    
  };
  
export default Quiz;



/* 
        {
          question:'',
          options:[],
          correctAnswer: '',
        },*/
