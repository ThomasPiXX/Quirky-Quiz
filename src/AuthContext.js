import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import useCsrfToken from './csrfToken';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userStats, setUserStats] = useState('');
    const { csrfToken } = useCsrfToken();

    // Define updateUserStats outside of useEffect so it can be included in the context value.

    const updateUserStats = async() => {
        try{
        const response = await axios.get('/api/UserStats', { withCredentials: true});
        if(response.status === 200) {
            setUserStats(response.data);
            console.log(response.data);
        }else{
            console.error('Failed to fetch user stats');
        }
    }catch(error){
        console.error(`error while trying to mount userstat: ${error}`);
    }
    };

    useEffect(() => {
        const checkAuthStatus = async () => {
            const storedAuth = localStorage.getItem('isAuthenticated');
            if (storedAuth) {
                setIsAuthenticated(JSON.parse(storedAuth));
                await updateUserStats(); // Update user stats if already authenticated
            } else {
                try {
                    const response = await axios.get('/api/authCheck', {
                        headers: { 'CSRF-Token': csrfToken },
                        withCredentials: true,
                    });
                    setIsAuthenticated(response.data.isLoggedIn);
                    if (response.data.isLoggedIn) {
                        await updateUserStats(); // Update user stats upon confirming authentication
                    }
                } catch (error) {
                    console.error('Error checking authentication status:', error);
                }
            }
        };

        checkAuthStatus();
    }, [csrfToken]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userStats, updateUserStats }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
