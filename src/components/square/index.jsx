import React from "react";
import Button from "../button";

const Square = (props) => {
  return (
    <div>
      <Button
        className="custom_btn"
        width={props.width}
        height={props.height}
        rounded="0px"
      ></Button>
    </div>
  );
};

export default Square;
