import ProgressBar from "@ramonak/react-progress-bar";
import React from "react";

const Progressbar = (props) => {
  return (
    <div>
      <ProgressBar
      
        completed={props.completed}
        bgColor={props.bgColor}
        labelColor={props.labelColor}
        maxCompleted={props.maxCompleted}
        width={props.width}
        labelAlignment={props.labelAlignment}
        height={props.height}
      />
    </div>
  );
};

export default Progressbar;
