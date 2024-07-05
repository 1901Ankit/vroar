import Image from "next/image";
import React from "react";
import gridimage1 from "../../assessts/images/homepage/01.png";
import gridimage2 from "../../assessts/images/homepage/02.png";
import gridimage3 from "../../assessts/images/homepage/03.png";
import styles from "./index.module.css";
const Imagegrid = (props) => {
  return (
    <div className={`${props.className} mobile_view`}>
      <div className="">
        <div className={`${styles.gridimage}`}>
          <img
            src={props.gridimage1}
            className={`${styles.gridimage1}`}
            data-aos="fade-right"
            data-aos-offset="0"
            data-aos-delay="20"
            data-aos-duration="800"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
            alt=""
          />
          <img
            src={props.gridimage2}
            className={`${styles.gridimage2}`}
            data-aos="fade-left"
            data-aos-offset="0"
            data-aos-delay="20"
            data-aos-duration="800"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
            alt=""
          />
        </div>
        <div className={`${styles.image_grid_mobile}`}>
          <img
            src={props.gridimage3}
            className={`${styles.gridimage3}`}
            data-aos="fade-up"
            data-aos-offset="0"
            data-aos-delay="20"
            data-aos-duration="800"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Imagegrid;
