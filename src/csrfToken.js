import {useState, useEffect } from 'react';
import axios from 'axios';

const useCsrfToken = () => {
    const [useCsrfToken, setCsrfToken] = useState('');
 

 useEffect(() => {
    const fetchCsrfToken = async () => {
        try{
            const response = await axios.get('/api/csrfToken');
            setCsrfToken(response.data.csrfToken);
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
        }
    };

    fetchCsrfToken();
 }, []);

 return useCsrfToken;
}


export default useCsrfToken;