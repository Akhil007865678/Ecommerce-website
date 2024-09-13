import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const storedUserId = localStorage.getItem('userId');
        if (token && storedUserId) {
            const validateToken = async () => {
                try {
                    await axios.get('http://localhost:5000/api/products/validateToken', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setIsAuthenticated(true);
                    setUserId(storedUserId);
                } catch (error) {
                    console.error('Error validating token:', error);
                    setIsAuthenticated(false);
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('userId');
                }
            };
            validateToken();
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/products/login', { email, password });
            const { token, userId } = response.data;
            localStorage.setItem('authToken', token);
            localStorage.setItem('userId', userId);
            setIsAuthenticated(true);
            setUserId(userId);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userId, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
