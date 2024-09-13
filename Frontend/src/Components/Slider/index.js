import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, Scrollbar, A11y } from 'swiper/modules';
import banner from '../../assets/banner.png'
import banner2 from '../../assets/banner2.jpg';
import banner3 from '../../assets/banner3.webp';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './swiper.css'; 

const SwiperSlider = () => {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide>
        <div className="slide">
          <img src={banner2} alt=''/>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="slide">
          <img src={banner3} alt=''/>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="slide">
          <img src={banner2} alt=''/>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="slide">
          <img src={banner} alt=''/>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperSlider;

