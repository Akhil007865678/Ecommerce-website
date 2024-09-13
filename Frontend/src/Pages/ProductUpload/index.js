import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../../Components/Footer';
import './index.css';

const ProductUpload = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [description, setdescription] = useState('');
  const [productType, setproductType] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image);
    formData.append('description', description);
    formData.append('productType', productType);

    try {
      const response = await axios.post('http://localhost:5000/api/products/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error uploading product');
      console.error('Error uploading product:', error);
    }
  };

  return (
    <>
    <div className='form-Page'>
            <div className="Form-Container">
                <h3>Upload Your product</h3>
                <form onSubmit={handleSubmit}>  
                <div>
                    <input
                      className="input-field"
                      placeholder='Product Name'
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                </div>
                <div>
                    <input
                      type="number"
                      placeholder='Product Price'
                      className="input-field"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                </div>
                <div>
                    <input
                      type="text"
                      placeholder='Description'
                      className="input-field"
                      value={description}
                      onChange={(e) => setdescription(e.target.value)}
                      required
                    />
                </div>
                
                <div>
                    <select
                      className="input-field"
                      value={productType}
                      onChange={(e) => setproductType(e.target.value)}
                      required
                    >
                      <option value="" disabled>Select Product Type</option>
                      <option value="male">Mobiles</option>
                      <option value="female">jeans</option>
                    </select>
                </div>
                <div className='file'>
                    <label>Product Image:</label>
                    <input
                      type="file"
                      className="input-field"
                      onChange={handleImageChange}
                      required
                    />
                </div>
                <button type="submit">Upload</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    <Footer/>
    </>
  );
};

export default ProductUpload;
