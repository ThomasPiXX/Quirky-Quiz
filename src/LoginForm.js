import React, {useState} from 'react';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import { useNavigate } from 'react-router-dom';
import useAuth from './AuthContext';
import useCsrfToken  from './csrfToken';


function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { csrfToken, loading } = useCsrfToken();
    const { setIsAuthenticated } = useAuth();


    const navigate = useNavigate();

    const handleBackToQuizSelection = () => {
        navigate('/');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (loading) {
            console.error('CSRF token not yet loaded');
            return;
        }
        try{
            const response = await axios.post('/api/login',{
                
                username,
                password,
            },{
                headers: {
                    'CSRF-Token': csrfToken,
                },
            });

            if(response.status === 200) {
                console.log('login successful:', response.data);
                setIsAuthenticated(true);
                localStorage.setItem('isAuthenticated:', 'true');
                navigate('/UserBoard');
            }else{
                console.error('error during login:', response.statusText);
                navigate('/SignUpForm');
                
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
                <label htmlFor='username'>Username</label>
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



