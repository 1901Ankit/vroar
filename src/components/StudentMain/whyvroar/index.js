import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import slide1 from "@/assessts/images/about/slide1.png";
import slide2 from "@/assessts/images/about/slide2.png";
import slide3 from "@/assessts/images/about/slide3.png";
import slide4 from "@/assessts/images/about/slide4.png";
import slide5 from "@/assessts/images/about/slide5.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css"

const brands_data = [
  {
    img: slide1,
    tpfade: "tpfadeRight",
    delay: ".4s",
    para: "Real-World  Experience",
  },
  {
    img: slide2,
    tpfade: "tpfadeRight",
    delay: "",
    para: "Tailored Internships",
  },
  {
    img: slide3,
    tpfade: "tpfadeRight",
    delay: "",
    para: "Growth & Development",
  },
  {
    img: slide4,
    tpfade: "tpfadeLeft",
    delay: "",
    para: "Network with Professionals",
  },
  {
    img: slide1,
    tpfade: "tpfadeRight",
    delay: ".4s",
    para: "Real-World Experience",
  },
];

// brands slider setting
const setting = {
  slidesPerView: 4,
  spaceBetween: 30,
  breakpoints: {
    1200: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 2,
    },
    576: {
      slidesPerView: 2,
    },
    0: {
      slidesPerView: 1,
    },
  },
};
const WhyVroar = () => {
  const [isLoop, setIsLoop] = useState(false);
  useEffect(() => {
    setIsLoop(true);
  }, []);

  return (
    <>
      <div className="tp-bs-brand pt-60 section_spcr-40">
        <div className="">
          <div className="tp-border-bottom pb-60">
            <div className="row align-items-center ">
              <div className="col-lg-3  ">
                <div className="text-left mb-4 ">
                  {" "}
                  <span class="tp-section__subtitle white-bg mb-15 text-center">
                    <i class="before-border"></i>Roar With VROAR{" "}
                  </span>
                </div>
                <div className="tp-bs-brand mr-60 align-items-center ">
                  <h2
                    className={`tp-bs-brand__title wow tpfadeRight ${styles.page__head_title} `}
                  >
                    Why<span></span> Vroar
                  </h2>
                  <p className="para_style1 text-justify f-13 ">
                    VROAR streamlines your journey. Students find opportunities,
                    parents stay informed, and companies discover top talent
                    effortlessly. Your path to success starts here.
                  </p>
                </div>
              </div>
              <div className="col-lg-9  ">
                <div className={` ${styles.vroar_slider} tp-bs-brand-slider`}>
                  <Swiper
                    {...setting}
                    loop={isLoop}
                    autoplay={{
                      delay: 4000,
                      disableOnInteraction: false,
                    }}
                    modules={[Navigation, Autoplay]}
                    className="brand-slider-active swiper-container"
                  >
                    {brands_data.map((item, i) => (
                      <SwiperSlide
                        key={i}
                        className={`tp-bs-brand-item wow ${item?.tpfade}`}
                        data-wow-delay={item?.delay}
                      >
                        <div className={`${styles.whyVroar} text-center`} >
                          <img src={item.img.src} alt="" className={styles.image_vroar} />
                          <p className={`${styles.para_vroar} para_style1 text-center `}>
                            {" "}
                            {item.para}
                          </p>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyVroar;
