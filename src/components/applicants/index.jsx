import React from "react";
import Whitewrapper from "../whitewrapper";
import styles from "./index.module.css";
import Button from "../button";
import { AiFillCheckCircle } from "react-icons/ai";
import moment from "moment";
import Link from "next/link";
const Applicants = (props) => {
  return (
    <div>
      {props.data.map((val, i) => (
        <Whitewrapper className=" mb-4 p-2" key={i}>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex ">
              <img src={val.user.avatar} className={styles.avatar} />
              <div className="ms-3">
                <p className="mb-1 text-capitalize">{val.user.name}</p>
                {val.user && val.user.email ? (
                  <p className="f-13">
                    <span className="">Email : </span>
                    {val.user.email}
                  </p>
                ) : (
                  <></>
                )}
                {val.user && val.user.phoneNo ? (
                  <p className="f-13 mb-1">
                    <span className="">Phone No : </span>
                    {val.user.phoneNo}
                  </p>
                ) : (
                  <></>
                )}
                {val.userProfile && val.userProfile.skills.length ? (
                  <p className="f-13 my-1">
                    <span className="">Skills : </span>
                    {val.userProfile.skills.slice(0, 2).join(" , ")}{" "}
                    {val.userProfile.skills.length > 2 ? (
                      <span className={`${styles.moreSKills} ms-2`}>
                        +{val.userProfile.skills.length - 2} more
                      </span>
                    ) : (
                      <></>
                    )}
                  </p>
                ) : (
                  ""
                )}
                {val.userProfile && val.userProfile.about ? (
                  <p className="f-12">
                    {val.userProfile.about.slice(0, 50)}...
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div>
              <div className="d-flex align-items-center mb-3 ">
                <AiFillCheckCircle
                  color={val.status === "APPLIED" ? "green" : "#f15d17"}
                  size={15}
                />
                <p
                  className={`${
                    val.status === "APPLIED" ? "text-success" : "text-orange"
                  } f-12 text-capitalize ms-1`}
                >
                  {val && val.status
                    ? val.status === "APPLIED"
                      ? "Applied"
                      : "Selected"
                    : "Not Disclosed"}
                </p>
              </div>
              <Link href={`/intern-detail/${val.user._id}`}>
                <Button
                  className="custom_btn"
                  border="1px solid #f15d17"
                  rounded="8px"
                  width="90px"
                  padding="5px"
                  fs="12px"
                  fw="normal"
                >
                  View Profile
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-1 text-end">
            <p
              className={`${
                val.status === "APPLIED" ? "text-success" : "text-orange"
              } f-12`}
            >
              {val.status === "APPLIED" ? "Applied" : "Selected"} :{" "}
              {moment(val.createdAt).fromNow()}
            </p>
          </div>
        </Whitewrapper>
      ))}
    </div>
  );
};

export default Applicants;
