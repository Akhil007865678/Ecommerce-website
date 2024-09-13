import '../Login/login.css';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { useState } from 'react';

const SignUp = () => {
    const navigate = useNavigate();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/products/signin', {
                name,
                email,
                password
            });

            navigate('/');
        } catch (error) {
            console.log('Feching the error: ', error);
        }
    };
    const handleClick = () => {
        navigate('/login');
    }

    return (
        <>
        <div className='full-Page'>
            <div className="Login-Container">
                <h3>Sign Up</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        className="input-field"
                        placeholder="User Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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
                    <button type="submit">Create</button>
                    <ul className='signIn-button'>If you have an account?<li onClick={handleClick}>Login</li></ul>
                </form>
            </div>
        </div>
        </>
    );
}

export default SignUp;

