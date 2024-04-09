import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css';
import axios from 'axios';
import useAuth from "./AuthContext";
import useCsrfToken from "./csrfToken";


const QuizAvax = () => {
    const [questions, setQuestions] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScores] = useState(0);
    const [previousQuestion, setPreviousQuestion] = useState(0);
    const [ quizCompleted, setQuizCompleted] = useState(false);
    const Navigate = useNavigate();
    const [ showCustomAlert, setShowCustomAlert] = useState(false);
    const [customAlertMessage, setCustomAlertMessage] = useState('');
    const { isAuthenticated, updateUserStats, userStats } = useAuth();
    const { csrfToken } = useCsrfToken();



    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for(let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    useEffect(() => {
        axios.get('/api/avaxquiz')
        .then((response) => {
            const dataWithParsedOptions = response.data.map(question => {
                return {
                    ...question,
                    options: JSON.parse(question.options)
                };
            });
            const shuffledArray = shuffleArray(dataWithParsedOptions);
            setQuestions(shuffledArray);
        }).catch((error) => {
            console.error(`error fetching avax related Question: ${error}`);
        });
    }, []);

    if(!questions){
        return <div>Loading Quizz...</div>;
    }

    const handleAnswerClick = (selectedAnswer) => {
        let isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;

        if(isCorrect){
            setScores(score + 1);
        }

        setCurrentQuestion(isCorrect ? 'Correct' : 'Incorrect!');
        setShowCustomAlert(true);

        const nextQuestion = currentQuestion + 1;
        const previousQuestion = currentQuestion;

        setPreviousQuestion(previousQuestion);

        if(nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        }else {
            setQuizCompleted(true);
        }
    };

    const handleRestartQuiz = () => {
        axios.get('/api/avaxquiz')
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
            console.error(`Error while fetching question on quiz Restart:${error}`);
        });
        setShowCustomAlert(false);
        setCurrentQuestion(0);
        setScores(0);
        setQuizCompleted(false);
    };

    const handleBackToQuizSelection = async () => {
        if(isAuthenticated && quizCompleted === true) {
            try{
                await updateUserStats();
                
                const { jsStat, ethStat} = userStats;
                
                const newScore = (score / questions.length * 100).toFixed(0);
                const newAverage = ((parseFloat(newScore) + parseFloat(ethStat) + parseFloat(jsStat)) / 3) . toFixed(2);
                
                console.log(newScore);
                console.log(newAverage);


                await axios.post('/api/submitScoresAvax',{
                    newScore,
                    newAverage
                },{
                    withCredentials: true,
                headers: {
                    'CSRF-Token': csrfToken,
                }
                });

                Navigate('/UserBoard');
            }catch(error){
                console.log('Error when handleBackToQuizSelection', error);
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

    export default QuizAvax;