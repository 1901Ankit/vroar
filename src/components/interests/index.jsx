import React from "react";
import Button from "../button";

const Interests = (props) => {
  return (
    <div className="my-3">
      <div className="row">
        {props.data.map((val, i) => (
          <div className="col-sm-6">
            <div
              className={` ${props.className} row align-items-center`}
              key={i}
            >
              <div className="col-sm-4 text-center">
                <img src={val.companyLogo} width={"100%"} />
              </div>
              <div className="col-sm-8">
                <h6 className="f-18">{val.companyName}</h6>
                <p className="mt-1 mb-2 f-13">{` ${val.followers} followers`}</p>
                <Button
                  className="custom_btn"
                  padding="5px"
                  border="none"
                  rounded="20px"
                  width="100px"
                  fw="600"
                >
                  {val.btn}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interests;
