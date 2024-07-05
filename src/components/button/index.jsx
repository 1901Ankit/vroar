import React from "react";

const Button = (props) => {
  return (
    <button
      type={props.type}
      className={props.className}
      style={{
        height: props.height,
        width: props.width,
        padding: props.padding,
        margin: props.margin,
        backgroundColor: props.bg,
        color: props.color,
        border: props.border,
        borderRadius: props.rounded,
        fontSize: props.fs,
        fontWeight: props.fw,
        textDecoration: props.td,
        textTransform: props.tt,
        transition: props.transition,
        cursor: props.cursor,
        boxShadow: props.shadow,
        marginRight: props.mr,
        marginTop: props.mt,
      }}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
