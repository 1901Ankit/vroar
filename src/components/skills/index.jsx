import React from "react";
import { useState } from "react";
import Select from "react-select";
import Chips from "../chips";
import Button from "../button";
import { useEffect } from "react";
import Loading from "../loading";

const Skills = (props) => {
  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "transparent",
    }),
  };

  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <Select
          isMulti={true}
          onChange={props.onSelect}
          options={props.options}
          styles={colourStyles}
          isOptionDisabled={props.isOptionDisabled}
          value={props.value}
          defaultValue={props.defaultValue}
        />
        {props.chips ? (
          <div className="container">
            <div className="row">
              {props.data.length == 0 ? (
                <></>
              ) : (
                props.data.map((val, i) => (
                  <div className="col-sm-4 my-2" key={i}>
                    <Chips skill={val.value} onClick={props.onRemove} />
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="my-3 text-center">
          {props.button ? (
            <Button
              className="custom_btn"
              width="100px"
              rounded="5px"
              border="none"
              padding="8px"
              fw="600"
            >
              {props.loading ? (
                <Loading
                  type="spin"
                  width={25}
                  height={25}
                  className="m-auto"
                />
              ) : (
                props.button
              )}
            </Button>
          ) : (
            ""
          )}
        </div>
      </form>
      {/* <div className="my-2 d-flex align-items-center justify-content-center">
        {state.map((val, i) => (
          <Chips
            key={i}
            className="mx-1"
            skill={val.value}
            onClick={() => skillHandler(val)}
          />
        ))}
      </div> */}
    </div>
  );
};

export default Skills;
