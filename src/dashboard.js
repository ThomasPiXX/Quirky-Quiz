import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import { useNavigate } from 'react-router-dom';
import Quiz from '/Quiz';
import QuizEth from '/QuizEth';
import useCsrfToken from './csrfToken';



const dashBoard =  () => {

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
        <button onClick={() => handleQuizSelection(`js`)}>JS Quiz</button>
        <button onClick={() => handleQuizSelection('eth')}>ETH Quiz</button>
        <button onClick={handleLogout}>Logout</button>
    </div>
);
};

export default dashBoard;
