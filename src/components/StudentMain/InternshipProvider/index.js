import React, { useState, useEffect } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const gallery_one = [
  "https://gencio-next-js.vercel.app/assets/img/gallery/mp-gl-5.jpg",
  "https://gencio-next-js.vercel.app/assets/img/gallery/mp-gl-5.jpg",
  "https://gencio-next-js.vercel.app/assets/img/gallery/mp-gl-5.jpg",
  "https://gencio-next-js.vercel.app/assets/img/gallery/mp-gl-5.jpg",
  "https://gencio-next-js.vercel.app/assets/img/gallery/mp-gl-5.jpg",
  "https://gencio-next-js.vercel.app/assets/img/gallery/mp-gl-5.jpg",
];

const gallery_two = [
  "https://gencio-next-js.vercel.app/assets/img/gallery/mp-gl-5.jpg",
  "https://gencio-next-js.vercel.app/assets/img/gallery/mp-gl-5.jpg",
  "https://gencio-next-js.vercel.app/assets/img/gallery/mp-gl-5.jpg",
  "https://gencio-next-js.vercel.app/assets/img/gallery/mp-gl-5.jpg",
  "https://gencio-next-js.vercel.app/assets/img/gallery/mp-gl-5.jpg",
  "https://gencio-next-js.vercel.app/assets/img/gallery/mp-gl-5.jpg",
];

const setting_1 = {
  spaceBetween: 30,
  speed: 6000,
  slidesPerView: "auto",
  allowTouchMove: false,
};

const setting_2 = {
  spaceBetween: 30,
  speed: 6000,
  slidesPerView: "auto",
  allowTouchMove: false,
  centeredSlides: true,
  centeredSlidesBounds: true,
};

const InternshipProvider = () => {
  
  const [isLoop, setIsLoop] = useState(false);
  useEffect(() => {
    setIsLoop(true);
  }, []);

  return (
    <>
      <div className="tp-mp-sw-slider">


        <div className="container-fluid gx-0">

          <Swiper
            {...setting_1}
            loop={isLoop}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              reverseDirection: false
            }}
            modules={[Autoplay]}
            className="swiper-container tp-gl-silder"
          >
            {gallery_one.map((item, i) => (
              <SwiperSlide key={i} className="tp-mp-slider-item">
                <img src={item} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>

        </div>



        <div className="container-fluid">

          <Swiper
            {...setting_2}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              reverseDirection: true,
            }}
            
            modules={[Autoplay]}
            className="swiper-container tp-gl-silder-2"
          >
            {gallery_two.map((item, i) => (
              <SwiperSlide key={i} className="tp-mp-slider-item">
                <img src={item} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
          
        </div>



      </div>
    </>
  );
};

export default InternshipProvider;
