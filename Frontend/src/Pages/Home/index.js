import Dropdown from '../../Components/Dropdown';
import SwiperSlider from '../../Components/Slider';
import ProductSlider from '../../Components/cart'
import Footer from '../../Components/Footer';
//import Header from '../../Components/Header';
import './index.css';

const Home = () =>{
    
    return(
        <>    
            <Dropdown/>
            <SwiperSlider/>
            <div className='cart'>
                <ProductSlider/>
            </div>
            <Footer/>
            
        </>
    );
}

export default Home;