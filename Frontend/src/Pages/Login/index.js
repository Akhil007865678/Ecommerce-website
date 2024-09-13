
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './login.css';

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
        navigate('/');
    };
    const handleClick = () => {
        navigate('/signin');
    };

    return (
        <div className='full-Page'>
            <div className="Login-Container">
                <h3>Login</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                        placeholder='Email'
                            className="input-field"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                        placeholder='Password'
                            className="input-field"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                    <ul className='signIn-button'>If you don't have any account?<li onClick={handleClick}>Sign In</li></ul>
                </form>
            </div>
        </div>
    );
};

export default LoginForm; 


/*import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import './login.css';

const LoginForm = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated, setUserId } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/products/login', { email, password });
            setIsAuthenticated(true);
            setUserId(response.data.userId); // Set userId
            localStorage.setItem('authToken', response.data.token); // Save token in local storage
            navigate('/');
        } catch (error) {
            console.log('Fetching the error: ', error);
        }
    };

    const handleClick = () => {
        navigate('/signin');
    };

    return (
        <div className='full-Page'>
            <div className="Login-Container">
                <h3>Login</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        className="input-field"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="input-field"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                    <ul className='signIn-button'>If you don't have any account?<li onClick={handleClick}>Sign In</li></ul>
                </form>
            </div>
        </div>
    );
};

export default LoginForm; */