import React from "react";
import Whitewrapper from "../whitewrapper";
import Image from "next/image";
import styles from "./index.module.css";
import save from "../../assessts/images/dashboard/save.svg";
import share from "../../assessts/images/dashboard/share.svg";
import { useState } from "react";
import saveFill from "../../assessts/images/dashboard/fillSave.svg";
import Button from "../button";
import companyControllers from "@/api/companyJobs";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Loading from "../loading";
import moment from "moment";
import suitcase from "../../assessts/images/dashboard/suitcase.png";
import location from "../../assessts/images/dashboard/pin.png";
import locationPreference from "../../assessts/images/dashboard/preferences.png";
import { USER_ROLES } from "@/utils/enum";
const Post = (props) => {
  const [loadingStates, setLoadingStates] = useState({});
  const applyJob = (value, id) => {
    setLoadingStates((prevLoadingStates) => ({
      ...prevLoadingStates,
      [id]: true,
    }));
    companyControllers
      .appliedJob(value._id)
      .then((res) => {
        toast.success(res.data.message);
        setLoadingStates((prevLoadingStates) => ({
          ...prevLoadingStates,
          [id]: false,
        }));
        props.recommendedIntern();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoadingStates((prevLoadingStates) => ({
          ...prevLoadingStates,
          [id]: false,
        }));
      });
  };
  const router = useRouter();
  const getJobdetail = (value) => {
    router.push({
      pathname: `/job-detail/${
        props.isApplied ? value.internshipJob._id : value._id
      }`,
    });
  };
  const getChildDescription = (value, role) => {
    // console.log(value)
    if (role === USER_ROLES.COMPANY || role === USER_ROLES.COMPANY_STAFF) {
      router.push(`/intern-detail/${value.user._id}`);
    } else {
    }
  };
  if (!props.data || props.data.length === 0) {
    return (
      <p className="text-center mt-5">
        Empower the Future: Enhance Opportunities for Students by Adding More
        Internships and Bridging the Gap to Success!
      </p>
    );
  } else {
    return (
      <div className={`${props.className}  mt-2`}>
        {props.data.map((val, id) => {
          return (
            <Whitewrapper
              className={`mb-5 py-2 pointer ${styles.student_detail}`}
              key={`${id}`}
              onClick={() => getChildDescription(val, props.role)}
            >
              {props.role === USER_ROLES.COMPANY ||
              props.role === USER_ROLES.COMPANY_STAFF ? (
                <div className="d-flex align-items-center justify-content-end me-4">
                  {" "}
                  <div
                    className={`${styles.dot} me-2`}
                    style={{
                      backgroundColor: `${
                        val.status === "SELECTED" ? "#f15d17" : "green"
                      }`,
                    }}
                  ></div>
                  <p className="f-12 fw-semibold">{val.status}</p>
                </div>
              ) : (
                ""
              )}
              <div className="row">
                <div className="col-sm-2 ">
                  <img
                    src={
                      props.role === USER_ROLES.COMPANY ||
                      props.role === USER_ROLES.COMPANY_STAFF
                        ? val.user.avatar
                        : props.role === USER_ROLES.STUDENT
                        ? val.company.logo
                        : val.avatar
                    }
                    alt=""
                    className={`${styles.logo} mb-5`}
                  />
                </div>
                <div className="col-sm-8">
                  <div className="ms-3">
                    <p className="fw-semibold ">
                      {val.internshipJob ? val.internshipJob.title : val.title}
                    </p>
                    <p className={`text-capitalize f-13 fw-semibold  `}>
                      {props.role === USER_ROLES.COMPANY ||
                      props.role === USER_ROLES.COMPANY_STAFF
                        ? val.user.name
                        : props.role === USER_ROLES.STUDENT
                        ? val.company.companyName
                        : val.name}
                    </p>
                    {props.role === USER_ROLES.PARENT
                      ? val.profile
                        ? val.profile.headline
                        : ""
                      : ""}

                    {props.role === USER_ROLES.STUDENT ? (
                      <></>
                    ) : props.role === USER_ROLES.COMPANY ||
                      props.role === USER_ROLES.COMPANY_STAFF ? (
                      <p className="text-capitalize f-13">
                        <span className="fw-semibold f-13">Email : </span>
                        <span className="f-12">
                          {val.user && val.user.email}
                        </span>
                      </p>
                    ) : (
                      <p>
                        <span className="fw-semibold f-13">Birth date :</span>{" "}
                        {moment(val.birthDate).format("L")}
                      </p>
                    )}
                    {props.role === USER_ROLES.PARENT ? (
                      <p>
                        <span className="fw-semibold f-13">Email : </span>{" "}
                        {val.email}
                      </p>
                    ) : (
                      <></>
                    )}
                    <div className="my-1">
                      {props.role === USER_ROLES.PARENT ? (
                        ""
                      ) : (
                        <p className="f-12">
                          <span className="fw-semibold f-13">Skills: </span>
                          <span className="f-12">
                            {val.skills
                              ? val.skills.join(" . ")
                              : val.internshipJob.skills
                              ? val.internshipJob.skills.join(" . ")
                              : val.userProfile
                              ? val.userProfile.skills.join(" . ")
                              : ""}
                          </span>
                        </p>
                      )}
                    </div>
                    {/* <div className="row mb-2">
                      <div className="col-sm-4">
                        {props.role === "STUDENT" ? (
                          <p className="f-12 ">
                            <span className="">
                              <img
                                src={suitcase.src}
                                alt=""
                                width={15}
                                className="me-1"
                              />
                            </span>
                            {val.experience === "0" ||
                            val.experience === "fresher" ||
                            !val.experience
                              ? "Fresher"
                              : `${val.experience} ${
                                  val.experience > "1" ? "Years" : "Year"
                                }`}
                          </p>
                        ) : props.role === "COMPANY" ||
                          props.role === "COMPANY_STAFF" ? (
                          <p className="f-12">
                            <span className="f-13 fw-semibold">
                              <img
                                src={locationPreference.src}
                                width={15}
                                alt=""
                              />
                            </span>
                            {val.userProfile
                              ? val.userProfile.locationWeight
                              : ""}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-sm-4">
                        {props.role === "PARENT" ? (
                          ""
                        ) : (
                          <p className="f-12 ">
                            <span>
                              <img src={location.src} alt="" width={15} />
                            </span>
                            {val.workMode}
                          </p>
                        )}
                      </div>
                      <div className="col-sm-4">
                        {props.role === "STUDENT" ? (
                          val.stipend ? (
                            <p className="f-13 ">
                              <span className="me-1 fw-bold">$</span>
                              {val.stipend.amount}
                            </p>
                          ) : (
                            <p className="f-12">
                              <span className="me-1 fw-bold"> $</span>
                              Not disclosed
                            </p>
                          )
                        ) : props.role === "COMPANY" ||
                          props.role === "COMPANY_STAFF" ? (
                          ""
                        ) : (
                          ""
                        )}
                      </div>
                    </div> */}

                    <div>
                      {val.description ? (
                        <p className="f-12 my-1">
                          Description: {val.description.slice(0, 50) + " .... "}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {props.role === USER_ROLES.COMPANY ? (
                <p className="ms-2">
                  <span
                    className={`fw-semibold f-12 ${
                      val.status === "APPLIED" ? "text-success" : "text-orange"
                    }`}
                  >
                    {val.status === "APPLIED" ? "Applied : " : "Selected : "}
                  </span>
                  <span className="f-12">
                    {moment(val.createdAt).fromNow()}
                  </span>
                </p>
              ) : (
                ""
              )}
              {props.role === USER_ROLES.COMPANY ||
              props.role === USER_ROLES.PARENT ||
              props.role === USER_ROLES.COMPANY_STAFF ? (
                <></>
              ) : (
                <div
                  className={`${styles.multi_media} d-flex align-items-center justify-content-between`}
                >
                  <div>
                    {props.isApplied ? (
                      <p className="f-12 text-success">Applied</p>
                    ) : (
                      <Button
                        className="custom_btn f-12"
                        border="none"
                        color="#ffffff"
                        width="100px"
                        padding="5px"
                        rounded="8px"
                        onClick={() => applyJob(val, id)}
                        disabled={loadingStates[id]}
                      >
                        {loadingStates[id] === true ? (
                          <Loading
                            type="spin"
                            width={25}
                            height={25}
                            className="m-auto "
                          />
                        ) : (
                          "Apply Now"
                        )}
                      </Button>
                    )}
                  </div>

                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex align-items-center ms-3 pointer"
                      onClick={() => props.onSave(val, id)}
                    >
                      <Image src={val.isSave ? saveFill : save} alt="" />
                      <p className="ms-1 f-13">Save</p>
                    </div>
                    <div className="d-flex align-items-center ms-3 pointer">
                      <Image src={share} alt="" />
                      <p className="ms-1 f-13">Share</p>
                    </div>
                  </div>
                </div>
              )}
            </Whitewrapper>
          );
        })}
      </div>
    );
  }
};

export default Post;
