import React from "react";
import styles from "./index.module.css";
import { parentController } from "@/api/parent";
import { CHILD_STATUS } from "@/utils/enum";
import { toast } from "react-toastify";
const Approval = (props) => {
  const apporvedDisApprovedChild = (id, status) => {
    let body = {
      requestId: id,
      status: status,
    };
    parentController
      .approvedChild(body)
      .then((res) => {
        toast.success(res.data.message);
        props.getParentRequest();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {props.data.map((val, i) => (
        <div className={`${styles.invitationcard} shadow my-2`} key={i}>
          <img src={val.parent.avatar} alt={val.parent.name} />
          <div className={styles.studentinfo}>
            <h2>{val.parent.name}</h2>
            <p>Email: {val.parent.email}</p>
            {val.child && val.parent.phoneNo ? (
              <p>Phone No : {val.parent.phoneNo}</p>
            ) : (
              ""
            )}
            <p className="text-danger fw-semibold  text-capitalize">
              {" "}
              {val.status}
            </p>
          </div>
          <div className={styles.actionbuttons}>
            <button
              className={styles.approvebutton}
              onClick={() =>
                apporvedDisApprovedChild(val._id, CHILD_STATUS.VERIFIED)
              }
            >
              Approve
            </button>
            <button
              className={styles.rejectbutton}
              onClick={() =>
                apporvedDisApprovedChild(val._id, CHILD_STATUS.REJECTED)
              }
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Approval;
