import React, { useEffect } from "react";
import styles from "./index.module.css";
import Aos from "aos";
import { Roboto_Slab } from "next/font/google";
import Button from "../button";
import { FaArrowUp } from "react-icons/fa";
const roboto = Roboto_Slab({ subsets: ["latin"], weight: "500" });
const Overflow = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className="clearfix">
      <div className={`${styles.border_wrap}`}>
        <div className={`${styles.border__dashed}`}></div>
      </div>
      <div className={`${styles.heading_border_wrap} `}>
        <h1 className="text-uppercase">Future </h1>
        <h1
          // data-aos="fade-left"
          // data-aos-offset="0"
          // data-aos-delay="50"
          // data-aos-duration="300"
          // data-aos-easing="ease-in-out"
          // data-aos-mirror="true"
          // data-aos-once="false"
          // data-aos-anchor-placement="top-center"
          className="text-uppercase"
        >
          is
        </h1>
        <h1
          // data-aos="fade-right"
          // data-aos-offset="0"
          // data-aos-delay="50"
          // data-aos-duration="300"
          // data-aos-easing="ease-in-out"
          // data-aos-mirror="true"
          // data-aos-once="false"
          // data-aos-anchor-placement="top-center"
          className="text-uppercase"
        >
          Now!
        </h1>
      </div>
      <div className={`${styles.bg_wrap}`}>
        <div className={`${styles.bg_home}`}></div>
      </div>
      {/* <div className={`${styles.home_bg}`}>
        <div className={`${styles.border__dashed} mb-5`}></div>
        <h1 className={`${styles.heading_border_wrap} ${roboto.className}`}>
          <span>YOUR BEST</span>
          <span
            data-aos="fade-left"
            data-aos-offset="0"
            data-aos-delay="50"
            data-aos-duration="300"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
          >
            PLACE FOR GROWTH
          </span>
          <span
            data-aos="fade-right"
            data-aos-offset="0"
            data-aos-delay="50"
            data-aos-duration="300"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
          >
            & DEVELOPMENT
          </span>
        </h1>
      </div> */}
    </div>
  );
};

export default Overflow;
