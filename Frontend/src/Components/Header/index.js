import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CgProfile } from "react-icons/cg";
import './header.css';
import cartImage from '../../assets/cart.png';

const Header1 = () => {
    const navigate = useNavigate();
    const { isAuthenticated, userId } = useContext(AuthContext);
    const [query, setQuery] = useState('');

    const onLogin = () => {
        navigate('/login');
    };
    
    const onCart = () => {
        navigate('/cart');
    };

    const onSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
          navigate(`/search/${query}`);
        }
    };

    const handleClick = () => {
        navigate('/');
    };
    
    return (
        <>
        <div className='header'>
            <div className="logo" onClick={handleClick}>
                <h1>VASTRA</h1>
            </div>
            <form onSubmit={onSearch}>
                <div className="search-bar">
                    <input 
                        type="text" 
                        placeholder="Search products..." 
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type='submit'>Submit</button>
                </div>
            </form>
            <div className="icons">
                {isAuthenticated ? (
                    <div className="profile-icon" onClick={() => navigate(`/profile/${userId}`)}>
                        <CgProfile />
                    </div>
                ) : (
                    <div className="login-icon" onClick={onLogin}>
                        <button>Login</button>
                    </div>
                )}
                <div className="cart-icon" onClick={onCart}>
                    <img src={cartImage} alt="Cart" />
                </div>
            </div>
        </div>
        </>
    );
}

export default Header1;