import React, { useState } from "react";
import styles from "./index.module.css";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import Select, { components } from "react-select";
const Selectbar = (props) => {
  const Caretdown = () => {
    return <AiFillCaretDown />;
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <Caretdown />
      </components.DropdownIndicator>
    );
  };
  const colourstyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "transparent",
      padding: props.padding,
      border: props.border,
    }),
  };
  return (
    <div>
      <Select
        styles={colourstyles}
        options={props.data.map((val) => {
          return {
            value: val.value,
            label: val.name,
          };
        })}
        onChange={props.onChange}
        isSearchable={true}
        isMulti={props.multi}
        placeholder={props.placeholder}
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator,
        }}
        id={props.id}
      />
    </div>
  );
};

export default Selectbar;
