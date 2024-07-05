import React from "react";
import styles from "./index.module.css";

const Journey = (props) => {
  return (
    <div className={`${styles.cirls}  ${props.className}`}>
      <div className={styles.journey_border}>
        <div className="d-flex align-items-center justify-content-between mb-5">
          <div className={`${styles.journey_first} ${styles.journey}`}>
            <h6 className="text-center f-14">{props.process1}</h6>
          </div>
          <div className={`${styles.journey_second} ${styles.journey}`}>
            <h6 className="text-center f-14">{props.process2}</h6>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between mb-5">
          <div className={`${styles.journey_third} ${styles.journey}`}>
            <h6 className="text-center f-14">{props.process3}</h6>
          </div>
          <div className={`${styles.journey_fourth} ${styles.journey}`}>
            <h6 className="text-center f-14">{props.process4}</h6>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between mb-5">
          <div className={`${styles.journey_fifth} ${styles.journey}`}>
            <h6 className="text-center f-14">{props.process5}</h6>
          </div>
          <div className={`${styles.journey_sixth} ${styles.journey}`}>
            <h6 className="text-center f-14">{props.process6}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;
