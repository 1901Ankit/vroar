import React from "react";
import styles from "./index.module.css";
const Whitewrapper = (props) => {
  return (
    <div
      className={`${styles.wrapper_element} ${props.className}   `}
      style={{
        height: props.height || "",
        overflowY: props.overflow || "",
        backgroundColor: props.bg ? props.bg : "transparent",
        width: props.width,
      }}
      onClick={props.onClick}
    >
      <div>{props.children}</div>
    </div>
  );
};

export default Whitewrapper;
