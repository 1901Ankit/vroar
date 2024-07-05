import { parentController } from "@/api/parent";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Button from "@/components/button";
import SideBar from "@/components/sidebar";
import Leftbar from "@/components/leftbar";
import Authcontrollers from "@/api/auth";
import { CHILD_STATUS } from "@/utils/enum";
import { toast } from "react-toastify";
import Head from "next/head";
import moment from "moment";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import Whitewrapper from "@/components/whitewrapper";
import { user } from "@/redux/reducers/userDetails";
import { useRouter } from "next/router";
const ParentDashboard = () => {
  const [childList, setChildList] = useState([]);
  const [childRequest, setChildRequest] = useState([]);
  const [profile, setProfile] = useState({});
  const dispatch = useDispatch();
  const getChild = () => {
    parentController
      .getChild()
      .then((res) => {
        setChildRequest(res.data.data.childRequest);

        setChildList(res.data.data.childList);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const userDetails = () => {
    Authcontrollers.getuserdetails()
      .then((res) => {
        setProfile(res.data.data);
        dispatch(user({ ...res.data.data }));
        getChild();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const apporvedDisApprovedChild = (id, status) => {
    let body = {
      requestId: id,
      status: status,
    };
    parentController
      .approvedChild(body)
      .then((res) => {
        toast.success(res.data.message);
        getChild();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const router = useRouter();
  const studentDetail = (value) => {
    router.push(`/student-detail/${value}`);
  };
  useEffect(() => {
    userDetails();
    if (!localStorage.getItem("accesstoken")) {
      router.push("/");
    }
  }, []);
  return (
    <div>
      <Head>
        <title>Parent-Dashboard</title>
      </Head>
      <div className="container p-0">
        <div className="row">
          <div className="col-sm-4">
            <Leftbar
              img={profile.avatar}
              cover={profile.coverImage}
              description={profile.about ? profile.about : ""}
              name={profile.name}
            />
          </div>
          <div className="col-sm-8 ">
            <div className="my-3">
              {childRequest.length === 0 ? (
                <></>
              ) : (
                <h4 className={`my-3 ${styles.heading}`}>
                  Student Approval List
                </h4>
              )}
              {childRequest.map((val, i) => {
                if (childRequest.length === 0) {
                  return <div></div>;
                } else {
                  return (
                    <div
                      className={`${styles.invitationcard} row  mb-4`}
                      key={i}
                    >
                      <div className={`${styles.studentinfo} col-sm-9`}>
                        <div className="d-flex align-item-center">
                          <img src={val.child.avatar} alt={val.child.name} />
                          <div>
                            <h2 className="text-capitalize">
                              {val.child.name}
                            </h2>
                            <p>
                              <span className="fw-semibold">Email:</span>
                              {val.child.email}
                            </p>
                            {val.child && val.child.phoneNo ? (
                              <p>
                                <span className="fw-semibold">Phone No :</span>
                                {val.child.phoneNo}
                              </p>
                            ) : (
                              ""
                            )}
                            <p className="text-danger fw-semibold  text-capitalize">
                              {" "}
                              {val.status}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className={`${styles.actionbuttons} col-sm-3`}>
                        <div className="row">
                          <div className="col-6">
                            <Button
                              className={styles.approvebutton}
                              // className="custom_btn"
                              border="1px solid green"
                              fs="12px"
                              rounded="8px"
                              fw="normal"
                              padding="8px"
                              width="90%"
                              onClick={() =>
                                apporvedDisApprovedChild(
                                  val._id,
                                  CHILD_STATUS.VERIFIED
                                )
                              }
                            >
                              Approve
                            </Button>
                          </div>
                          <div className="col-6">
                            <Button
                              //  className="custom_btn"
                              border="1px solid #f15d17"
                              fs="12px"
                              rounded="8px"
                              width="90%"
                              fw="normal"
                              padding="8px"
                              className={styles.rejectbutton}
                              onClick={() =>
                                apporvedDisApprovedChild(
                                  val._id,
                                  CHILD_STATUS.REJECTED
                                )
                              }
                            >
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>

            <div>
              {childList.length === 0 ? (
                <></>
              ) : (
                <h4 className={`my-3 ${styles.heading}`}>Your Child</h4>
              )}
              {childList.map((val, i) => {
                if (childList.length === 0) {
                  return <></>;
                } else {
                  return (
                    <div>
                      <div
                        className={`${styles.invitationcard} row  mb-4 pointer`}
                        key={i}
                      >
                        <div className="col-sm-10 d-flex align-item-center">
                          <img src={val.avatar} alt={val.name} />
                          <div className={styles.studentinfo}>
                            <h2 className="text-capitalize">{val.name}</h2>

                            <p>
                              {val.profile && val.profile.headline
                                ? val.profile.headline
                                : ""}
                            </p>
                            <p>
                              <span className="fw-semibold">Email : </span>{" "}
                              {val.email}
                            </p>
                            {val.phoneNo ? (
                              <p>
                                <span className="fw-semibold">Phone : </span>{" "}
                                {val.phoneNo}
                              </p>
                            ) : (
                              <></>
                            )}
                            {val.birthDate ? (
                              <p>
                                <span className="fw-semibold">DOB : </span>
                                {moment(val.birthDate).format("DD-MM-YYYY    ")}
                              </p>
                            ) : (
                              <></>
                            )}
                            {val.profile &&
                            val.profile.skills &&
                            val.profile.skills.length ? (
                              <p>Skills :{val.profile.skills.join(" . ")} </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-sm-2 text-end">
                          <Button
                            className="custom_btn"
                            border="1px solid #f15d17"
                            fs="12px"
                            rounded="8px"
                            fw="normal"
                            padding="8px"
                            onClick={() => studentDetail(val._id)}
                          >
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
