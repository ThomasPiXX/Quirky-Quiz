import React, { useState } from 'react';
import axios from 'axios';
import useCsrfToken from './csrfToken';
import {useNavigate}  from 'react-router-dom';

function SignUpForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const { csrfToken, loading } = useCsrfToken();
    const navigate = useNavigate();

    const handleBackToQuizSelection = () => {
        navigate('/');
    }

    const handleSignUp = async (event) => {
        event.preventDefault();
        setErrorPassword('');

        if (loading) {
            console.error('CSRF token not yet loaded');
            return;
        }

        if(password !== confirmPassword) {
            setErrorPassword('Password do not match');
            return;
        }

        try {
            const response = await axios.post('/api/createAccount', {
                username,
                password,
                confirmPassword,
            }, {
                headers: {
                    'CSRF-Token': csrfToken,
                },
            });

            console.log('Sign up successful:', response.data);
            navigate('/LoginForm');
        } catch (error) {
            console.error('Error signing up a new user:', error);
        }
    };

    return(
        <form onSubmit={handleSignUp} className="container">
            <div className='row'>
                <div className="input-field col s12">
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <label htmlFor='username'>Username</label> 
                </div>
            </div>
            <div className='row'>
                <div className='input-field col s12'>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <label htmlFor='password'>Password</label>
                </div>
            </div>
            <div className='row'>
                <div className='input-field col s12'>
                    <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    <label htmlFor='confirmPassword'>ConfirmPassword</label>
                </div>
            </div>
            {errorPassword && (
                <div className='row'>
                    <div className='error' style={{color: 'red'}}> {errorPassword}</div>
                </div>
            )}
            <div className='row'>
                <button className ='btn waves-effect waves-light' type="submit" disabled={loading}>SignUp</button>
            </div>
            <div className='row'>
                <button className= 'btn waves-effect waves-light' type="submit" onClick={handleBackToQuizSelection}>Home</button>
            </div> 
        </form>
    );
}
export default SignUpForm;