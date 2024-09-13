const express = require('express');
const multer = require('multer');
const { uploadProduct } = require('../controllers/productController');
const { getProducts } = require('../controllers/productController');
const { singleProducts } = require('../controllers/productController');
const { SignIn, login, validateToken } = require('../controllers/SignIn');
const {profile} = require('../controllers/profile');
const router = express.Router();
const upload = multer({ storage: multer.diskStorage({}) });

router.post('/upload', upload.single('image'), uploadProduct);
router.get('/', getProducts);
router.get('/singleProducts/:id', singleProducts);
router.post('/signin', SignIn);
router.post('/login', login);
router.get('/profile/:id', profile);
router.get('/validateToken', validateToken);

module.exports = router;
