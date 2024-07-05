import React from "react";
import styles from "./index.module.css";
import Image from "next/image";
const Topscorer = (props) => {
  return (
    <div>
      {props.data.map((val, i) => {
        return (
          <div className={`${styles.bg_Arrow} mb-3 mx-2`} key={i}>
            <span className={`ms-3 text-orange`}>{`${
              i >= 9 ? i + 1 : `0${i + 1}`
            }`}</span>
            <img
              src={val.img}
              className={`me-4 ${styles.image_student}`}
              alt=""
            />
            <span className={`text-uppercase ${styles.topscorer_name} `}>
              {val.name}
            </span>
            <span className={`text-orange me-5 ${styles.topscorer_score}`}>
              {val.score}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Topscorer;
