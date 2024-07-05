import React from "react";
import styles from "./index.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import Whitewrapper from "../whitewrapper";
import "swiper/css";
import { CiLocationOn } from "react-icons/ci";
import { Autoplay } from "swiper";
const TopInternship = (props) => {
  return (
    <div>
      <Swiper
        grabCursor={true}
        autoplay={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        modules={[Autoplay]}
      >
        {props.data.map((val, i) => (
          <SwiperSlide key={i}>
            <Whitewrapper className="p-2 my-2  ">
              <div className="d-flex align-items-center ">
                <img src={val.company.logo} className={styles.logo} />
                <div className="ms-1">
                  <h6 className="f-13">{val.title}</h6>
                  <p className="f-12">{val.company.companyName}</p>
                </div>
              </div>
            </Whitewrapper>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopInternship;
