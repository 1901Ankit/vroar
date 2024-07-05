import React from "react";

const Label = (props) => {
  return (
    <div>
      <label
        htmlFor={props.for}
        className={props.className}
        style={{ color: props.color, fontWeight: props.fw }}
      >
        {props.children}
      </label>
    </div>
  );
};

export default Label;
