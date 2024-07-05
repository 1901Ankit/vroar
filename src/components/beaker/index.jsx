import React from "react";
import styles from "./index.module.css";
const Beaker = (props) => {
  return (
    <div className="d-flex align-items-center">
      <div>
        <div
          className={styles.svg_beaker}
          dangerouslySetInnerHTML={{
            __html: `  <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="250px"
        height="300px"
        viewBox="0 0 300 300"
        enable-background="new 0 0 300 300"
        xml:space="preserve"
        style=fill:transparent;margin-top:-92px
      >
        <defs>
          <mask id="mask-liquid" x="0" y="0" width="300" height="300">
            <path
              fill="white"
              d="M207.4,185.1c0,31.7-25.7,57.4-57.4,57.4s-57.4-25.7-57.4-57.4c0-2.7,0.2-5.4,0.5-8c9.9,3.3,22.6,6.2,34,4.9
          c23.3-2.5,22.8-5.8,48.7-5.9c10.9-0.1,22,1,31.2,2.3C207.3,180.6,207.4,182.8,207.4,185.1z"
            />
          </mask>
          <mask id="mask-pour" x="0" y="0" width="300" height="300">
            <path
              fill="white"
              d="M158,289.9h-15V71c0,0,0.5-13.6,3.1-21.2s4.3-28.8,4.3-28.8s1,17.4,4.3,28.2S158,71,158,71V289.9z"
            />
          </mask>
          <mask id="mask-beaker" x="0" y="0" width="300" height="300">
            <path
              fill="white"
              d="M0,0v300h300V0H0z M150.3,242.8c-31.5,0-57-25.6-57-57c0-24.6,16.4-46.9,40-54.4l9.8-3.1V71h15v57.3l9.7,3.1
          c23.3,7.5,39.6,29.8,39.6,54.3C207.4,217.2,181.8,242.8,150.3,242.8z"
            />
          </mask>
        </defs>
    
        <rect class="box1" width="300" height="300" />
        <rect class="box2" width="300" height="300" />
        <rect class="box3" width="300" height="300" />
    
        <path
          fill="#2B2C2D"
          d="M172,118V57h-43v61c-30,9.3-49.7,36.9-49.7,67.8c0,39.2,31.8,71.2,71.1,71.2c39.2,0,71.1-31.9,71.1-71.2
      C221.5,155,201,127.3,172,118z M150.3,251.8c-36.4,0-66-29.6-66-66c0-29.2,19.7-55.3,47.8-63.4l2-0.5V62h33v59.8l1.8,0.5
      c28.1,8.1,47.6,34.2,47.6,63.4C216.4,222.2,186.7,251.8,150.3,251.8z"
        />
      </svg>`,
          }}
        ></div>
        <div
          className={`${styles.beaker} custom_btn `}
          style={{ height: "116px", width: "112px" }}
        ></div>
      </div>
      <div>
        <p>Profile</p>
        <p>{props.profile} completed</p>
      </div>
    </div>
  );
};

export default Beaker;
