const cloudinary = require('cloudinary').v2;
const Product = require('../models/Product');
//const User = require('../models/User');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadProduct = async (req, res) => {
  try {
    const { name, price, description, productType } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'products',
    });

    const newProduct = new Product({
      name,
      price,
      imageUrl: result.secure_url,
      description,
      productType
    });

    await newProduct.save();

    res.status(200).json({ message: 'Product uploaded successfully', product: newProduct });
  } catch (error) {
    console.error('Error uploading product:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


const singleProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


module.exports = {
  uploadProduct,
  getProducts,
  singleProducts
};
