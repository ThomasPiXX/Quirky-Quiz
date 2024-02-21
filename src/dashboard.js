import react,{ useEffect, useState } from 'react';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import Quiz from '/Quiz';
import QuizEth from '/QuizEth';



const dashBoard =  () => {

    const [username, setUsername] = useState('');
    const [ethStat, setEthStat] = useState('');
    const [jsStat, setJsStat] = useState('');


    useEffect(() => {
        axios.get('/api/UserState/')
        .then((response) => {
            const userInformation = response.data.map(userData => {
                return {
                    ...userData,
                    stat: JSON.parse(userData.stat)
                }
            }
            )
        })
    })
}


//TODO: extract the information from backend properly
//TODO: set the JSX with the user stat as a dashboard
//TODO: add JS and ETH quiz button + logout