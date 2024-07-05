import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = (props) => {
  if (props.type === "password") {
    const [show, setShow] = useState(true);
    return (
      <div
        className=" d-flex align-items-center mb-2"
        style={{
          border: "1px solid grey",
          backgroundColor: props.bg,
          borderRadius: "3px",
          width:"100%"
        }}
      >
        <input
          type={show ? "password" : "text"}
          id={props.id}
          style={{
            border: "none",
            width: props.width,
            padding: props.padding,
            backgroundColor: props.bg,
          }}
          className={props.className}
          placeholder="Type Your Password"
          onChange={props.onChange}
          maxLength={props.maxLength}
          pattern={props.pattern}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          readOnly={props.readOnly}
          disabled={props.disabled}
          autoFocus={props.autoFocus}
          max={props.max}
        />
        <div
          className="d-flex align-items-center justify-content-center pointer  "
          style={{
            borderLeft: "1px solid grey",
            height: "100%",
            padding: "1rem",
          }}
          onClick={() => setShow(!show)}
        >
          {show ? <FaEye size={15} /> : <FaEyeSlash size={15} />}
        </div>
      </div>
    );
  }
  return (
    <input
      className={props.className}
      placeholder={props.placeholder}
      type={props.type}
      id={props.id}
      value={props.value}
      style={{
        width: props.width,
        height: props.height,
        padding: props.padding,
        margin: props.margin,
        border: props.border,
        borderRadius: props.rounded,
        backgroundColor: props.bg,
        fontSize: props.fs,
      }}
      onChange={props.onChange}
      maxLength={props.maxLength}
      pattern={props.pattern}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      readOnly={props.readOnly}
      disabled={props.disabled}
      autoFocus={props.autoFocus}
      max={props.max}
    />
  );
};

export default Input;
