import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Header from './Components/Header';
import ProductUpload from './Pages/ProductUpload';
import Product from './Pages/Product';
import SearchResults from './Pages/search';
import XProduct from './Pages/XProduct';
import Login from './Pages/Login';
import SignIn from './Pages/Signup';
import Profile from './Pages/profile';
import Cart from './Pages/Cart';
import Buy from './Pages/Buy';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import HighlightForm from './Pages/practice';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/ProductUpload' element={<ProductUpload />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/search/:searchTerm" element={<SearchResults />} />
            <Route path='/singleProducts/:id' element={<XProduct />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/buy/:productId' element={<Buy/>} />
            <Route path='/practice' element={<HighlightForm/>} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

