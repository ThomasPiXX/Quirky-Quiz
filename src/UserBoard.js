import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import { useNavigate } from 'react-router-dom';
import Quiz from './Quiz';
import QuizEth from './QuizEth';
import QuizAvax from './QuizAvax';
import useCsrfToken from './csrfToken';
import Logout from './Logout';
import useAuth from './AuthContext';

const quizzes = [
    {id: 1, types: 'Quiz', label: 'JavaScript', component: Quiz },
    {id: 2, types: 'QuizEth', label: 'Ethereum', component: QuizEth},
    {id: 3, types: 'QuizAvax', label: 'Avax', component: QuizAvax},
]


const UserBoard =  () => {

    const [username, setUsername] = useState('');
    const [ethStat, setEthStat] = useState('');
    const [jsStat, setJsStat] = useState('');
    const [ avaxStat, setAvaxStat] = useState('');
    const [averageStat, setAverageStats] = useState('');
    const csrfToken = useCsrfToken();
    const navigate = useNavigate();
    const { isAuthenticated,  } = useAuth();


    useEffect(() => {
        if( isAuthenticated ){
        console.log(csrfToken, 'useeffect one ');
        axios.get('/api/UserStats/', {
            headers: {
                'CSRF-Token': csrfToken,
            },
        }).then((response) => {
            setUsername(response.data.username);
            setEthStat(response.data.ethStat);
            setJsStat(response.data.jsStat);
            setAvaxStat(response.data.avaxStat);
            setAverageStats(response.data.averageStat);
        }).catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }else{
        navigate('/');
    }
    }, [isAuthenticated, csrfToken, navigate]);



const handleQuizSelection = (quizType) => {
    navigate(`/${quizType}`);
}

return (
    <div className='container'>
        <div className='row'>
            <div className='col s12'>
                <h4 className='center-align'> Welcome, <strong>{username}</strong></h4>
            </div>
        </div>
        <div className='row'>
            <div className='col s12 m6 14'>
                <div className='card blue-grey darken-1'>
                    <div className='card-content white-text'>
                        <span className='card-title'> JavaScript Succes Rate</span>
                        <p className='flow-text'>{jsStat}%</p>
                    </div>
                </div>
            </div>
        </div>
            <div className='col S12 m6 14'>
                <div className='card deep-orange darken-2'>
                    <div className='card-content white-text'>
                        <span className='card-title'>EThereum Sucess Rate</span>
                        <p className='flow-text'>{ethStat}%</p>
                    </div>
                </div>
            </div>
            <div className='col s12 m6 14 offset-m3 offset-10'>
                <div className='card teal darken-3'>
                    <div className='card-content white-text'>
                        <span className='card-title'> Avax Success Rate</span>
                        <p className='flow-text'>{avaxStat}</p>
                    </div>
                </div>
            </div>
        <div className='row'>
            <div className='col s12'>
                <div className='card-panel teal'>
                    <span className='white-text'>
                        Average Success Rate: <strong>{averageStat}</strong>
                    </span>
                </div>
            </div>
        </div>
    {quizzes.map((quiz) => {
        return (
        <button key={quiz.id} className='btn waves-effect waves-light' onClick={() => handleQuizSelection(quiz.types)}>
            {quiz.label}
        </button>
        );
    })}

    <Logout />
    </div>
);
};

export default UserBoard;

/*<h4>dashBoard</h4>
<p>Welcome, {username}</p>
<p>JavaScript Stats: {jsStat}%</p>
<p>Ethereum Stats: {ethStat}%</p>
<p>Avax Stats: {avaxStat}%</p>
<p>Average Score: {averageStat}%</p>*/


