import Image from "next/image";
import React from "react";
import styles from "./index.module.css";
import { Roboto_Slab } from "next/font/google";
import { BsArrowRight } from "react-icons/bs";
const roboto = Roboto_Slab({ subsets: ["latin"], weight: "500" });
const Imageflow = (props) => {
  return (
    <div>
      <div className={`${styles.wrapper}`}>
        {props.data.map((val, id) => {
          return (
            <img
              src={val.img}
              className={`${styles.img_overflow} ${
                id === 1 ? styles.image_relative : ""
              } ${id === 0 ? styles.image_first : ""}`}
              key={`${id}`}
              // data-aos="fade-right"
              // data-aos-offset="0"
              // data-aos-delay="20"
              // data-aos-duration={`${
              //   id === 0 ? "700" : id === 1 ? "800" : "900"
              // }`}
              // data-aos-easing="ease-in-out"
              // data-aos-mirror="false"
              // data-aos-once="true"
              // data-aos-anchor-placement="top-center"
              alt=""
            />
          );
        })}
        <p className={`f-13 ${roboto.className} ms-4`}>
          {props.desc} <BsArrowRight />
        </p>
      </div>
    </div>
  );
};

export default Imageflow;
