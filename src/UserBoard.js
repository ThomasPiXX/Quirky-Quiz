import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import { useNavigate } from 'react-router-dom';
import Quiz from './Quiz';
import QuizEth from './QuizEth';
import useCsrfToken from './csrfToken';

const quizzes = [
    {id: 1, types: 'Quiz', label: 'JavaScript', component: Quiz },
    {id: 2, types: 'QuizEth', label: 'Ethereum', component: QuizEth},
]


const UserBoard =  () => {

    const [username, setUsername] = useState('');
    const [ethStat, setEthStat] = useState('');
    const [jsStat, setJsStat] = useState('');
    const csrfToken = useCsrfToken();
    const navigate = useNavigate();


    useEffect(() => {
        axios.get('/api/UserState/', {
            headers: {
                'CSRF-Token': csrfToken,
            },
        }).then((response) => {
            setUsername(response.data.username);
            setEthStat(response.data.ethStat);
            setJsStat(response.data.jsStat);
        }).catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }, [csrfToken]);

const handleLogout = () => {
    console.log("logging out...");
    navigate('/login');
};


const handleQuizSelection = (quizType) => {
    navigate(`/${quizType}`);
}

return (
    <div className='container'>
        <h4>dashBoard</h4>
        <p>Welcome, {username}</p>
        <p>JavaScript Stats: {jsStat}</p>
        <p>Ethereum Stats: {ethStat}</p>
    {quizzes.map((quiz) => {
        <button key={quiz.id} onClick={() => handleQuizSelection(quiz.type)}>
            {quiz.label}
        </button>
    })}

    <button onClick={handleLogout}> Logout</button>
    </div>
);
};

export default UserBoard;
