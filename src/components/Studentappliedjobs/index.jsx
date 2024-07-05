import React from "react";
import styles from "./index.module.css";
import Image from "next/image";
const StudentApplicationOfJobs = (props) => {
  return (
    <div>
      <div className="row">
        <div className="col-sm-4">
          <Image
            src={props.img}
            className={`${styles.image_student} mt-2`}
            alt=""
            width={130}
            height={135}
          />
        </div>
        <div className="col-sm-8">
          <span>
            <h5 className="mt-3">{props.studentname}</h5>
            <p className="my-2">{props.Experience}</p>
            <p>{props.Skills}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudentApplicationOfJobs;
