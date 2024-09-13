import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './XProduct.css';
import Footer from '../../Components/Footer';

const XProduct = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/singleProducts/${id}`);
                setData(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleBuyNowClick = () => {
        navigate(`/buy/${id}`);
    };

    return (
        <>
            <div className='XProduct-Container'>
                <img src={data.imageUrl} alt={data.name} />
                <div className='product-details'>
                    <h2>{data.name}</h2>
                    <p>Price: <b>{data.price}</b></p>
                    <p>{data.description}</p>
                    <div>
                        <button onClick={handleBuyNowClick}>BUY NOW</button>
                        <button>Add to Cart</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default XProduct;
