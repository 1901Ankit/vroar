import React from "react";
import styles from "./index.module.css";
import { AiOutlineClose } from "react-icons/ai";
const Chips = (props) => {
  return (
    <div className={props.className}>
      <div className={styles.chips}>
        <div className="text-center p-1">
          <p className="f-10">{props.skill}</p>
        </div>
        {/* <div className="d-flex align-items-center">
          <AiOutlineClose size={15} onClick={props.onClick} className="pointer" />
        </div> */}
      </div>
    </div>
  );
};

export default Chips;
