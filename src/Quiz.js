import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useCsrfToken } from './csrfToken';

const Quiz = () => {
  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [previousQuestion, setPreviousQuestion] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const Navigate = useNavigate();
  const [showCustomAlert, setShowCustomAlert] = useState(false);
  const [customAlertMessage, setCustomAlertMessage] = useState('');
  const { isAuthenticated } = useAuth();
  const [ ethStat, setEthStat] = useState('');
  const [ jsStat, setJsStat] = useState('');
  const [averageStat, setAverageStats] = useState('');
  const csrfToken = useCsrfToken();

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  useEffect(() => {
    axios.get('/api/jsquiz')
      .then((response) => {
        const dataWithParsedOptions = response.data.map(question => {
          return {
            ...question,
            options: JSON.parse(question.options)
          };
        });
  
        const shuffledQuestions = shuffleArray(dataWithParsedOptions);
        setQuestions(shuffledQuestions);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  if (!questions) { 
    return <div>Loading quiz...</div>;
  }

  const handleAnswerClick = (selectedAnswer) => {
    let isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
    }

    setCustomAlertMessage(isCorrect ? 'Correct!' : 'Incorrect!');
    setShowCustomAlert(true);

    const nextQuestion = currentQuestion + 1;
    const previousQuestion = currentQuestion;

    setPreviousQuestion(previousQuestion);

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {

    //TODO fix the restart quizz logic

    axios.get('/api/jsquiz')
      .then((response) => {
        const dataWithParsedOptions = response.data.map(question => {
          return {
            ...question,
            options: JSON.parse(question.options)
          };
        });
  
        const shuffledQuestions = shuffleArray(dataWithParsedOptions);
        setQuestions(shuffledQuestions);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
    setShowCustomAlert(false);
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    };

  const handleBackToQuizSelection =  async () => {
    if(isAuthenticated && quizCompleted === true){
      try{
        const response = await axios.get('/api/UserStats', {
          headers:{
          'CSRF-Token': csrfToken,
        },
        });
        
        const { ethStat, jsStat, averageStat } = response.data;

        setEthStat(ethStat);
        setJsStat(jsStat);
        setAverageStats(averageStat);

        const newScore = score / questions.length * 100;
        const newAverage = ((newScore + parse.float(jsStat) + parseFloat(averageStat)) / 3).toFixed(2); 

        await axios.post('/api/submitScoresJS', {
          newScore,
          newAverage,
        }, {
          headers: {
            'CSRF-Token': csrfToken,
          }
        });

        Navigate('/UserBoard');
      }catch(error){
        console.error(`Error while handlebackToQuizJS:${error}`);
      }
    }else{
      Navigate('/');
    }

  };

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
            <h4 className="question">{questions[currentQuestion]?.question}</h4>
            <div className="options">
            {questions[currentQuestion]?.options && Array.isArray(questions[currentQuestion].options) ? (
              questions[currentQuestion].options.map((options, index) => (
                <div key={index} className="card white">
                  <div className="card-content white-text">
                    <button
                      className="btn waves-effect waves-light"
                      onClick={() => handleAnswerClick(options)}
                    >
                      {options}
                    </button>
                  </div>
                </div>
              ))
            ) : (

              <p>No options available</p>

            )}
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
                          ? `Correct Answer: ${questions[previousQuestion]?.correctAnswer}`
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
