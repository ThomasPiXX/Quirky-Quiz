import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './AuthContext';

const Logout = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();

    const handleLogout = async () => {
        try {

            const csrfResponse = await axios.get('/api/csrfToken');
            const csrfToken = csrfResponse.data.csrfToken;

            
            await axios.post('/api/logout', {}, {
                withCredentials: true, 
                headers: {
                    'CSRF-Token': csrfToken 
                }
            });

            console.log("Logout successful");
            setIsAuthenticated(false);
            localStorage.removeItem('isAuthenticated');
            navigate('/');
        } catch (error) {
            console.error('Error while logging out', error);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;