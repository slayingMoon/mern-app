import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        });

        const data = await response.json();

        if(!response.ok) {
            setIsLoading(false);
            setError(data.error);
        }
        if(response.ok) {
            //update loading state
            setIsLoading(false);

            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(data));

            //update the auth context
            dispatch({type: 'LOGIN', payload: data});

            //navigate to home page
            navigate('/');
        }
    };

    return { login, isLoading, error };
};