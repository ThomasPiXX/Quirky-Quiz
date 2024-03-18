import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
            axios.get('/api/authCheck')
            .then(response => {
                setIsAuthenticated(response.data.isLoggedIn);
            })
            .catch(error => {
                console.error('Error checking authentication status: ', error);

            });
    }, []);

    return(
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);