import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import useCsrfToken  from './csrfToken';
const AuthContext = createContext();




export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { csrfToken} = useCsrfToken(); 

    useEffect(() => {

        const storedAuth = localStorage.getItem('isAuthenticated');
        if(storedAuth){
            setIsAuthenticated(JSON.parse(storedAuth));
        }else{
            axios.get('/api/authCheck',{
                headers:{
                    'CSRF-Token': csrfToken,
                },
            })
            .then(response => {
                setIsAuthenticated(response.data.isLoggedIn);
            })
            .catch(error => {
                console.error('Error checking authentication status: ', error);

            });
        }
    }, []);

    return(
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};
const useAuth = () => useContext(AuthContext);


export default useAuth;