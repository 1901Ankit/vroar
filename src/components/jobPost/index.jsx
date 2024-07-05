import Whitewrapper from "@/components/whitewrapper";
import React, { useEffect, useState } from "react";
import suitcase from "@/assessts/images/dashboard/suitcase.png";
import dollar from "@/assessts/images/dashboard/dollar.png";
import location from "@/assessts/images/dashboard/location.png";
import watch from "@/assessts/images/dashboard/watch.png";
import moment from "moment";
import styles from "./index.module.css";
import share from "@/assessts/images/dashboard/share.svg";
import save from "@/assessts/images/dashboard/save.svg";
import saveFill from "@/assessts/images/dashboard/fillSave.svg";
import Speedometer from "@/components/speedometer";
import Button from "@/components/button";
import Loading from "../loading";
import companyControllers from "@/api/companyJobs";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
const JobPost = (props) => {
  const [loading, setLoading] = useState({});
  const router = useRouter();
  const [disable, setDisable] = useState(false);
  const savedJobs = (value) => {
    setDisable(true);

    let body = props.isApplied
      ? {
          isSave: value.internshipJob.isSave ? false : true,
          internshipJobId: value.internshipJob._id,
        }
      : {
          isSave: value.isSave ? false : true,
          internshipJobId: value._id,
        };
    companyControllers
      .savedJobs(body)
      .then((res) => {
        toast.success(res.data.message);
        setDisable(false);
        props.recommendedIntern();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
        setDisable(false);
      });
  };
  const applyJob = (value, id) => {
    setLoading((prevLoadingStates) => ({
      ...prevLoadingStates,
      [id]: true,
    }));
    companyControllers
      .appliedJob(value._id)
      .then((res) => {
        toast.success(res.data.message);
        setLoading((prevLoadingStates) => ({
          ...prevLoadingStates,
          [id]: false,
        }));
        props.recommendedIntern();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading((prevLoadingStates) => ({
          ...prevLoadingStates,
          [id]: false,
        }));
      });
  };
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (router.pathname === "/dashboard/[slug]") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [router]);
  if (props.data.length < 1) {
    return <p>No Matching Internship Found</p>;
  } else {
    return (
      <div>
        {props.data.map((val, i) => {
          const weeks = moment(
            val.duration && val.duration.to
              ? val.duration.to
              : val.internshipJob &&
                val.internshipJob.duration &&
                val.internshipJob.duration.to
              ? val.internshipJob.duration.to
              : ""
          ).diff(
            val.duration && val.duration.from
              ? val.duration.from
              : val.internshipJob &&
                val.internshipJob.duration &&
                val.internshipJob.duration.from
              ? val.internshipJob.duration.from
              : "",
            "weeks"
          );

          if (val.length) {
            return <p className="f-12 text-semibold">No Internship Found!</p>;
          } else {
            return (
              <Whitewrapper key={i} className="p-3 mb-4 ">
                <div className="row">
                  <div
                    className={`${show ? "col-sm-8" : "col-sm-12"} pt-2 px-3 `}
                  >
                    <div className="d-flex  justify-content-between">
                      <div>
                        <Link
                          href={`/job-detail/${
                            val.internshipJob && val.internshipJob._id
                              ? val.internshipJob._id
                              : val._id
                          }`}
                          className={styles.job_hyperlink}
                        >
                          <h5 className="f-14">
                            {val.title
                              ? val.title
                              : val.internshipJob && val.internshipJob.title
                              ? val.internshipJob.title
                              : ""}
                          </h5>
                        </Link>
                        <p className="text-grey fw-semibold f-12 text-capitalize">
                          {val.company.companyName}
                        </p>
                      </div>
                      {/* <Link href={`/job-detail/${val._id}`}>
                        <p className={`f-12 fw-semibold pointer ${styles.view}`}>
                          View internship
                        </p>
                      </Link> */}
                    </div>
                    <div className="d-flex align-items-center my-1 ">
                      {/* <span className="d-flex align-items-center  p-1"> */}
                      <span
                        className={`${styles.lie} d-flex align-items-center  p-1`}
                      >
                        <img
                          src={suitcase.src}
                          alt=""
                          width={16}
                          className="me-2"
                        />
                        <p className="f-12 mb-0">
                          {val.experience
                            ? val.experience
                            : val.internshipJob.experience}
                        </p>
                      </span>
                      <span
                        className={`${styles.ine} d-flex align-items-center  p-1`}
                      >
                        <span className="me-1">|</span>
                        <img
                          src={dollar.src}
                          alt=""
                          width={14}
                          className="me-2"
                        />
                        <p className="f-12 mb-0">
                          {val.stipend ? val.stipend.amount : "Not disclosed"}
                        </p>
                      </span>
                      <span
                        className={`${styles.lin} d-flex align-items-center  p-1`}
                      >
                        <span className="me-1">|</span>
                        <img
                          src={location.src}
                          alt=""
                          width={14}
                          className="me-2"
                        />
                        <p className="f-12 mb-0">
                          {val.workMode
                            ? val.workMode
                            : val.internshipJob && val.internshipJob.workMode
                            ? val.internshipJob.workMode
                            : "Not disclosed"}
                        </p>
                      </span>
                      <span className="d-flex align-items-center  p-2">
                        <span className="me-1">|</span>
                        <img
                          src={watch.src}
                          alt=""
                          width={14}
                          className="me-2"
                        />
                        <p className="f-12 mb-0">
                          {val.duration && val.duration.from && val.duration.to
                            ? ` ${weeks} weeks`
                            : val.internshipJob &&
                              val.internshipJob.duration &&
                              val.internshipJob.duration.from &&
                              val.internshipJob.duration.to
                            ? ` ${weeks} weeks`
                            : "Not disclosed"}
                        </p>
                      </span>
                    </div>
                    <div className="d-flex align-items-center mb-1">
                      <p className="f-12">Skills : </p>

                      <p className="f-10 ms-1 ">
                        {" "}
                        {val.skills
                          ? val.skills.join(" . ")
                          : val.internshipJob.skills.join(" . ")}
                      </p>
                    </div>

                    <p className="f-12">
                      {val.description
                        ? val.description.slice(0, 50) + "....."
                        : val.internshipJob &&
                          val.internshipJob.description.slice(0, 50) +
                            "...... "}{" "}
                    </p>
                    <div className="d-flex align-items-center justify-content-between mt-2">
                      <p className="f-11">{moment(val.createdAt).fromNow()}</p>
                      <div className="d-flex align-items-center">
                        {(val.internshipJob && val.internshipJob.isApplied) ||
                        val.isApplied ? (
                          <p className="text-success f-12">Applied</p>
                        ) : (
                          <Button
                            className="custom_btn"
                            border="1px solid #f15d17"
                            rounded="5px"
                            fs="10px"
                            width={80}
                            padding="5px"
                            fw="500"
                            onClick={() => applyJob(val, i)}
                          >
                            {loading[i] === true ? (
                              <Loading
                                type="spin"
                                className="m-auto"
                                width={20}
                                height={20}
                              />
                            ) : (
                              "Apply Now"
                            )}
                          </Button>
                        )}
                        <Button
                          bg="transparent"
                          border="none"
                          className="mx-2"
                          fs="12px"
                          onClick={() => {
                            savedJobs(val, i);
                          }}
                          disabled={disable ? true : false}
                        >
                          <img
                            src={
                              val.isSave
                                ? saveFill.src
                                : val.internshipJob && val.internshipJob.isSave
                                ? saveFill.src
                                : save.src
                            }
                            alt=""
                            className="me-1"
                          />
                          Save
                        </Button>
                        <Button
                          bg="transparent"
                          border="none"
                          className=""
                          fs="12px"
                        >
                          <img src={share.src} alt="" />
                          share
                        </Button>
                      </div>
                    </div>
                  </div>
                  {show ? (
                    <div className="col-sm-4 border-left">
                      <Speedometer
                        height={100}
                        height1={100}
                        width={230}
                        width1={230}
                        maxValue={100}
                        paddingVertical={0}
                        valueAfterInternship={val.skillMatchCount}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </Whitewrapper>
            );
          }
        })}
      </div>
    );
  }
};

export default JobPost;
