import React from "react";
import ReactLoading from "react-loading";
const Loading = (props) => {
  return (
    <div>
      <ReactLoading
        type={props.type}
        width={props.width}
        height={props.height}
        className={props.className}
        color={props.color}
      />
    </div>
  );
};

export default Loading;
