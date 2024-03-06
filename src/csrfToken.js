import { useState, useEffect } from 'react';
import axios from 'axios';

const useCsrfToken = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [loading, setLoading ] = useState(true);

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {

                const response = await axios.get('http://localhost:3001/api/csrfToken');
                setCsrfToken(response.data.csrfToken);
                setLoading(false);
                console.log(`Token fetched: ${response.data.csrfToken}`);
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
                setLoading(false);
            }
        };

        fetchCsrfToken();
    }, []);

    return csrfToken, loading;
}


export default useCsrfToken;