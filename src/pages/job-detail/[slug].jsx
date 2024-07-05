import companyControllers from "@/api/companyJobs";
import Placeholder from "@/components/placeholder-loading";
import Whitewrapper from "@/components/whitewrapper";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import company from "../../assessts/images/profile/company.svg";
import styles from "./index.module.css";
import Button from "@/components/button";
import { CiShare1 } from "react-icons/ci";
import { toast } from "react-toastify";
import moment from "moment";
import Speedometer from "@/components/speedometer";
import BarChart from "@/components/barchart";
import { useSelector } from "react-redux";
import Loading from "@/components/loading";
import { FaStar } from "react-icons/fa";
const Jobdetail = () => {
  const router = useRouter();
  const [detail, setDetail] = useState("");
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState("");
  const getJobDetails = (value) => {
    companyControllers
      .getJobbyJobId(value)
      .then((res) => {
        setPost(moment(res.data.data.createdAt).fromNow());
        setDetail(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(true);
      });
  };
  console.log(detail);
  const [applyloading, setApplyLoading] = useState(false);
  const applyJob = (val) => {
    setApplyLoading(true);

    companyControllers
      .appliedJob(val._id)
      .then((res) => {
        toast.success(res.data.message);
        setApplyLoading(false);
        getJobDetails(router.query.slug);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setApplyLoading(false);
      });
  };
  // const [value, setValue] = useState("150");
  // const skillsHandler = () => {
  //   setValue("250");
  // };
  const maxValue = 100;
  const skillsBeforeInternship = 70;
  const skillsAfterInternship = 90;
  const role = useSelector((state) => state.userdetails.group);

  useEffect(() => {
    router.query.slug ? getJobDetails(router.query.slug) : () => {};
  }, [router]);
  return (
    <div>
      <Head>
        <title>Job Detail</title>
      </Head>

      <div className="container py-5">
        <div className="row">
          <div className="col-sm-8">
            <Whitewrapper className="p-3">
              {loading ? (
                <Placeholder count={4} />
              ) : (
                // <div>
                //   <div className="border-bottom">
                //     <h3 className="f-18">{detail.title}</h3>
                //     <div className="d-flex align-items-center py-1 mb-2">
                //       <p className="border__right pe-1 f-12">
                //         {detail.company ? detail.company.companyName : ""}
                //       </p>
                //       <p className="border__right px-1 f-12">
                //         {detail.company ? detail.company.industry : ""}
                //       </p>
                //       <p className="border__right px-1 f-12">
                //         {detail.company ? detail.company.teamSize : ""}{" "}
                //         employees
                //       </p>

                //       <p className="px-1 f-12">{post}</p>
                //     </div>
                //     <div className="d-flex align-items-center mb-2">
                //       <p className="me-2 f-13 fw-semibold">
                //         Website :
                //         <span className="fw-normal f-12 ms-1">
                //           {detail.company ? detail.company.website : ""}
                //         </span>
                //       </p>
                //     </div>
                //     <div className="d-flex align-items-center mb-2 ">
                //       <p className="f-13 fw-semibold">Skills :</p>

                //       <span className="f-12 ms-1 ">
                //         {detail.skills ? detail.skills.join(" . ") : ""}
                //       </span>
                //     </div>
                //     <div className="d-flex align-items-center mb-2">
                //       <span className="fw-semibold f-13">Vacancies :</span>{" "}
                //       <span className=" ms-2 f-12">{detail.noOfJobs}</span>
                //     </div>
                //     <p className="mb-2 f-12">
                //       <span className="fw-semibold f-13">Experience</span>:{" "}
                //       {detail.experience === "0" ||
                //       detail.experience === "Fresher"
                //         ? "Fresher"
                //         : `${detail.experience} `}
                //     </p>
                //     <p className="mb-2 f-12">
                //       <span className="fw-semibold f-13">Qualification</span>:{" "}
                //       {detail.qualification}
                //     </p>
                //     {/* <p className="mb-2">
                //   <span className="fw-semibold">Duration</span>
                //   {detail.duration ? detail.duartion.from : ""}
                // </p> */}
                //     <p className="mb-2 f-12">
                //       <span className="fw-semibold f-13">Description</span>:{" "}
                //       {detail.description}
                //     </p>
                //     <p className="fw-semibold f-14">About the Company</p>
                //     <p className="text-justify f-12">
                //       {detail.company ? detail.company.about : ""}
                //     </p>
                //   </div>
                //   <div className="mt-3">
                //     {role === "PARENT" ? (
                //       <></>
                //     ) : detail.isApplied ? (
                //       <p className="text-success">Applied</p>
                //     ) : (
                //       <Button
                //         fw="500"
                //         className="custom_btn"
                //         border="none"
                //         rounded="8px"
                //         padding="5px"
                //         fs="12px"
                //         width={100}
                //         onClick={() => applyJob(detail)}
                //       >
                //         {applyloading ? (
                //           <Loading
                //             type="spin"
                //             className="m-auto"
                //             width={25}
                //             height={25}
                //           />
                //         ) : (
                //           "Apply"
                //         )}
                //       </Button>
                //     )}
                //   </div>
                // </div>
                <div>
                  <h5 className=" text-uppercase mb-2">
                    {detail && detail.title ? detail.title : ""}
                  </h5>
                  <p className="text-grey f-13 text-uppercase mb-2">
                    {detail && detail.company.companyName
                      ? detail.company.companyName
                      : ""}
                  </p>
                  {/* <div className="d-flex align-items mb-2">
                      <p className="text-grey f-15 text-uppercase">
                        {detail && detail.company.companyName
                          ? detail.company.companyName
                          : ""}
                      </p>
                      <span className="mx-2 f-15">|</span>
                      <p className="f-15 text-grey">
                        {detail && detail.company
                          ? detail.company.industry
                          : ""}
                      </p>
                      <span className="mx-2 f-15">|</span>
                      <p className="text-grey f-15">{post}</p>
                      <span className="mx-2 f-15">|</span>
                      <p className="text-grey f-15">
                        {detail.noOfJobs} openings
                      </p>
                    </div> */}
                  <div className="d-flex align-items-center border-bottom mb-2 ">
                    <p className="f-12">
                      <span className="fw-semibold f-14 me-2">Duration :</span>
                      {detail &&
                      detail.duration &&
                      detail.duration.from &&
                      detail.duration.to
                        ? `${moment(detail.duration.to).diff(
                            detail.duration.from,
                            "weeks"
                          )} Weeks`
                        : "Not Disclosed"}
                    </p>
                    <span className="f-14 mx-2">|</span>
                    <p className="f-12 text-capitalize">
                      <span className="f-14 fw-semibold">
                        Internship Type :
                      </span>
                      {detail && detail.payStatus
                        ? detail.payStatus
                        : "Not Disclosed"}
                    </p>
                    <span className="f-14 mx-2">|</span>
                    <p className="f-12">
                      <span className="f-14 fw-semibold">Experience : </span>
                      {detail && detail.experience
                        ? detail.experience
                        : "Not Disclosed"}
                    </p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="f-12">{post}</p>
                    {role === "PARENT" ? (
                      <></>
                    ) : detail.isApplied ? (
                      <p className="f-12 text-success">Applied</p>
                    ) : (
                      <Button
                        className="custom_btn"
                        fw="500"
                        fs="12px"
                        width="70px"
                        padding="5px"
                        rounded="8px"
                        onClick={() => applyJob(detail)}
                      >
                        {applyloading ? (
                          <Loading
                            type="spin"
                            width="10px"
                            height="10px"
                            color="#000"
                            className="m-auto"
                          />
                        ) : (
                          "Apply"
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </Whitewrapper>
            <Whitewrapper className="p-3 my-3">
              {loading ? (
                <Placeholder count={20} />
              ) : (
                <div>
                  <div className="mb-2">
                    <p className="fw-semibold">Internship Description </p>
                    <p className="f-13 text-justify">
                      {detail && detail.description ? detail.description : ""}
                    </p>
                  </div>
                  <div className="mb-2 f-13">
                    <span className="fw-semibold f-14">Industry Type : </span>
                    <span className="f-13 text-justify">
                      {detail && detail.company ? detail.company.industry : ""}
                    </span>
                  </div>
                  <div className="mb-2 f-13">
                    <span className="fw-semibold f-14">Location : </span>
                    <span className="f-13 text-justify">
                      {detail && detail.workMode
                        ? detail.workMode === "Hibrid"
                          ? "Hybrid"
                          : detail.workMode
                        : "Not Disclosed"}
                    </span>
                  </div>
                  <div className="mb-2 f-13">
                    <span className="fw-semibold f-14">Stipend : </span>
                    <span className="f-13 text-justify">
                      {detail && detail.stipend && detail.stipend.amount
                        ? ` ${detail.stipend.currency} ${detail.stipend.amount}/${detail.stipend.rate}`
                        : "Not Disclosed"}
                    </span>
                  </div>
                  <div className="mb-2 f-13">
                    <span className="fw-semibold f-14">Qualification : </span>
                    <span className="f-13 text-justify text-capitalize">
                      {detail && detail.qualification
                        ? detail.qualification
                        : "Not Disclosed"}
                    </span>
                  </div>
                  <div className="mb-2">
                    <p className="f-13 fw-semibold">Key Skills</p>
                  </div>
                  {detail && detail.skills ? (
                    <div className="row">
                      {detail.skills.map((val, i) => (
                        <div className="col-sm-3 mb-2" key={i}>
                          <p className={`${styles.skills} text-center`}>{val}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </Whitewrapper>
          </div>
          <div className="col-sm-4">
            <div>
              <Whitewrapper className="py-3">
                <div className="d-flex align-items-center ms-2 pt-2">
                  <Button
                    className="custom_btn me-2"
                    width="15px"
                    height="15px"
                    rounded="0px"
                  ></Button>
                  <h6 className="text-capitalize">After taking Internship</h6>
                </div>
                <Speedometer
                  height={100}
                     width={230}
                     height1={100}
                     width1={230}
                  maxValue={maxValue}
                  valueBeforeInternship={detail.currentSkill}
                  valueAfterInternship={detail.skillMatchCount}
                />
                <div className="ms-4 mt-3">
                  <h6 className="ms-2">What Will You Learn ? </h6>
                  {detail && detail.skills ? (
                    detail.skills.map((val, i) => (
                      <p className="f-13 ms-2 text-uppercase my-2" key={i}>
                        # {val}
                      </p>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </Whitewrapper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobdetail;
