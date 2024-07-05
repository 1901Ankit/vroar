import React from "react";
import styles from "./index.module.css";
import { useState } from "react";
const Range = (props) => {
  return (
    <div>
      <div className={styles.range_slider}>
        <div className={styles.range_dot} style={{ left: props.left }}></div>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <p onClick={props.lowClick} className="pointer">Low</p>
        <p onClick={props.mediumClick} className="pointer">Medium</p>
        <p onClick={props.highClick } className="pointer">High</p>
      </div>
    </div>
  );
};

export default Range;
