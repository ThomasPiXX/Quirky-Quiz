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
        

    }
}