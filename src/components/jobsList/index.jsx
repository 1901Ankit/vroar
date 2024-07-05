import React from "react";
import Whitewrapper from "../whitewrapper";

const JobsList = (props) => {
  return (
    <div>
      {props.data.map((val, i) => (
        <Whitewrapper>
          <div className="row">
            <div className="col-sm-3">
              {/* <img src={val.logo} /> */}
              <></>
            </div>
            <div className="col-sm-9">
              <h4>{val.title}</h4>
            </div>
          </div>
        </Whitewrapper>
      ))}
    </div>
  );
};

export default JobsList;
