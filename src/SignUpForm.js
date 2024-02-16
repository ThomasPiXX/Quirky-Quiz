import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';

function SignUpForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const Navigate = useNavigate();

    const handleBackToQuizSelection = () => {
        Navigate('/');
    }

    

    const handleSignUp = async(event) => {
        event.preventDefault();
        try{
            const response = await axios.post('./createAccount', {
                username,
                password,
                confirmPassword,
            });
            if(response.status === 200) {
                console.log('login succesful:', response.data.token);
            }else{
                console.error('error during login:', response.statusText);
            }
        }catch(error){
            console.error(`Error signUp a new user${error}`);
        }
    }

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
            <div className='row'>
                <button className ='btn waves-effect waves-light' type="submit">SignUp</button>
            </div>
            <div className='row'>
                <button className= 'btn waves-effect waves-light' type="submit" onClick={handleBackToQuizSelection}>Home</button>
            </div>
        </form>
    );
}
export default SignUpForm;