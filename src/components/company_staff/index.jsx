import React from "react";
import styles from "./index.module.css";
const CompanyStaff = (props) => {
  return (
    <div className="mt-3">
      {props.data.map((val, i) => (
        <div className="container mb-2" key={i}>
          {/* <div className="row align-items-center">
            <div className="col-sm-2">
              <img width="100%" src={val.avatar} alt="" className={styles.logo} />
            </div>
            <div className="col-sm-9">
              <p className="fw-semibold text-capitalize">{val.name}</p>
              <p className="fw-semibold f-13">
                Designation :{" "}
                <span className="f-12 fw-normal">{val.designation}</span>
              </p>
              <p className="fw-semibold f-13">
                Email : <span className="f-12 fw-normal">{val.email}</span>
              </p>
            </div>
          </div> */}
          <div className="d-flex align-items-center ">
            <img width="100%" src={val.avatar} alt="" className={styles.logo} />
            <div className="ms-4">
              <h6 className=" text-capitalize">{val.name}</h6>
              <p className="">
                <span className="f-12 fw-normal">{val.designation}</span>
              </p>
              <p className=" f-13">
                Email : <span className="f-12 fw-normal">{val.email}</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompanyStaff;
