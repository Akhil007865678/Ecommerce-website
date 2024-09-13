import accountLogo from '../../assets/accountLogo.png';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const { id } = useParams();

    const clickHandle = () => {
        navigate('/ProductUpload');
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/profile/${id}`);
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, [id]);

    if (!data) return <div>Loading...</div>;

    return (
        <>
        <div>
            <div>
            <img src={accountLogo} alt="Loading..." />
            <div>
                <h3>Hello,</h3>
                <h3>{data.name}</h3>
            </div>
            <button onClick={clickHandle}>Upload Your Product</button>
            </div>
        </div>
        </>
    );
};

export default Profile;