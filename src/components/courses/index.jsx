import { Roboto_Slab } from "next/font/google";
import React from "react";
import styles from "./index.module.css";
const roboto = Roboto_Slab({ subsets: ["latin"], weight: "500" });

const Courses = (props) => {
  return (
    <div className={`container ${props.className}  `}>
      <div className="row align-items-center">
        <div className="col-sm-8 m-auto">
          <div className="my-3">
            <h2
              className={`fw-bold text-uppercase   ${styles.border__courses} `}
            >
              E-learning courses
            </h2>
          </div>
          {props.data.map((val, index) => (
            <div
              className={` row align-items-center  ${styles.border_courses}`}
              key={`${index}`}
            >
              <div className="col-sm-10">
                <h4 className={`${roboto.className}`}>{val.Courses}</h4>
              </div>
              <div className="col-sm-2 ">
                <p className={`${roboto.className} f-13 `}>{val.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
