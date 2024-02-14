import React, {useState} from 'react';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();

    const handleBackToQuizSelection = () => {
        Navigate('/');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.post('/login',{
                username,
                password,
            });
            if(response.status === 200) {
                console.log('login successful:', response.data.token);
            }else{
                console.error('error during login:', response.statusText);
            }

        }catch(error){
            console.error(`Error during login${error}`);
        }
    }


return (
    <form onSubmit={handleSubmit}  className="container">
        <div className='row'>
            <div className="input-field col s12">
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor='username'Username>Username</label>
            </div>
        </div>
        <div className='row'>
            <div className='input-field col s12'>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor='password'>Password</label>
            </div>
        </div>
        <div className='row'>
            <button className='btn waves-effect waves-light' type="submit"> Login</button>
        </div>
        <div className='row'>
            <button className='btn waves-effect waves-light' type="submit" onClick={handleBackToQuizSelection}> Home </button>
        </div>
    </form>
);
}

export default LoginForm;