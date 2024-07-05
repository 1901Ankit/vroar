import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import share from "@/assessts/images/dashboard/share.svg";

import watch from "@/assessts/images/dashboard/watch.png";
import suitcase from "@/assessts/images/dashboard/suitcase.png";
import dollar from "@/assessts/images/dashboard/dollar.png";
import save from "@/assessts/images/dashboard/save.svg";
import saveFill from "@/assessts/images/dashboard/fillSave.svg";
import location from "@/assessts/images/dashboard/location.png";
import job_image from "../../assessts/images/profile/JobsImage.jpeg";
import cover_img from "../../assessts/images/profile/Cover_Banner.jpg";
import profileimg from "../../assessts/images/profile/Company.jpg";
import profileimage from "../../assessts/images/profile/image03.jpg";
import Whitewrapper from "@/components/whitewrapper";
import Label from "@/components/label";
import { AiOutlineArrowRight, AiOutlineArrowUp } from "react-icons/ai";
import { AiOutlineArrowDown } from "react-icons/ai";
import StudentApplicationOfJobs from "@/components/Studentappliedjobs";
import StaffSwiper from "@/components/topInternship";
import Companyskill from "@/components/companyskill";
import data from "@/assessts/data/data";
import companyControllers from "@/api/companyJobs";
import { useRouter } from "next/router";
import moment from "moment";
import JobsList from "@/components/jobsList";
import Head from "next/head";
import JobPost from "@/components/jobPost";
import Link from "next/link";
import Button from "@/components/button";
import Speedometer from "@/components/speedometer";
import Loading from "@/components/loading";
import { toast } from "react-toastify";
import Rating from "../../components/ratingstars";
const SuggestedCompanyDetails = () => {
  let [show, setShow] = useState(false);
  const overview_status = () => {
    setShow(!show);
  };

  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const getCompanyJobs = (id) => {
    let body = {
      companyId: id,
    };
    companyControllers
      .getJobs(body)
      .then((res) => {
        setJobs(res.data.data.docs);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [company, setCompany] = useState({});
  const [loader, setLoader] = useState(true);
  const companyDate = (value) => {
    companyControllers
      .getCompanyById(value)
      .then((res) => {
        setCompany(res.data.data);
        getCompanyJobs(res.data.data._id);
        companyReview(res.data.data._id);
      })
      .catch((err) => {
        console.log("second", err);
      });
  };

  const [loading, setLoading] = useState({});
  const [disable, setDisable] = useState(false);
  const savedJobs = (value) => {
    setDisable(true);

    let body = {
      isSave: value.isSave ? false : true,
      internshipJobId: value._id,
    };

    companyControllers
      .savedJobs(body)
      .then((res) => {
        toast.success(res.data.message);
        setDisable(false);
        getCompanyJobs(value.company._id);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
        setDisable(false);
      });
  };
  const applyJob = (value, id) => {
    console.log(value);
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
        getCompanyJobs(value.company._id);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
        setLoading((prevLoadingStates) => ({
          ...prevLoadingStates,
          [id]: false,
        }));
      });
  };

  const [rating, setRating] = useState("");
  const [reviewCount, setReviewCount] = useState("");
  const companyReview = (id) => {
    companyControllers
      .getCompanyreview(id)
      .then((res) => {
        // console.log(res)
        setRating(res.data.data.rating);
        setReviewCount(res.data.data.reviewsCount);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  const addReview = (rating) => {
    companyControllers
      .addCompanyReview({ companyId: company._id, rating })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    router.query.slug ? companyDate(router.query.slug) : () => {};
  }, [router.query.slug]);
  return (
    <div className={`${styles.mainpage}`}>
      <Head>
        <title>Company Details</title>
      </Head>
      <div className="container">
        <div className="row">
          <div className="col-sm-9">
            <div>
              <img
                src={company.coverImage}
                className={`${styles.Company_coverimages}`}
                width={100}
                height={100}
              />
              <div className={`${styles.profile_photoalignment}`}>
                <Image
                  src={company.logo}
                  width={100}
                  height={100}
                  className={`${styles.profile_photo}`}
                />
              </div>
            </div>

            <div className={`${styles.Profile_data}`}>
              <div className="mt-5 p-4">
                <h4>{company.companyName}</h4>
                {/* <Label className="f-15 fw-semibold">
                  {company.companyType}
                </Label>
                <Label className="mb-2 f-15 fw-semibold">
                  Staffing and Recruiting . Noida UttarPardesh . 100 Employees
                </Label> */}
              </div>

              {rating !== "" ? (
                <div className="d-flex align-items-end ms-4">
                  <p className="f-15 me-1 mb-0">{rating}</p>
                  <Rating value={rating} isEditable={false} />
                  <p className="f-12 text-orange ms-2 fw-semibold">
                    {reviewCount} Reviews
                  </p>
                </div>
              ) : (
                ""
              )}

              <Whitewrapper className="mt-4">
                <div className="p-4">
                  <h4>Overview</h4>
                  <p className="my-4">
                    #{" "}
                    {company && company.about ? company.about : "Not Disclosed"}
                  </p>
                  {show ? (
                    <div className="mt-3">
                      <span className="d-flex align-items-center">
                        <h6>Phone Number : </h6>
                        <p className="ms-2 mb-0">{company.companyPhoneNo}</p>
                      </span>
                      {/* <span className="d-flex align-items-center mt-2">
                        <h6>Headquarters : </h6>
                        <p className="ms-2 mb-0">Noida UttarPardesh</p>
                      </span> */}
                      <span className="d-flex align-items-center mt-2">
                        <h6>Email Address : </h6>
                        <p className="ms-2 mb-0">{company.companyEmail}</p>
                      </span>
                      {companyDate.startedDate ? (
                        <span className="d-flex align-items-center mt-2">
                          <h6>Founded : </h6>
                          <p className="ms-2 mb-0">
                            {moment(company.startedDate).format("YYYY")}
                          </p>
                        </span>
                      ) : (
                        <></>
                      )}
                      {company.industry ? (
                        <span className="d-flex align-items-center mt-2">
                          <h6>Industry : </h6>
                          <p className="ms-2 mb-0">{company.industry}</p>
                        </span>
                      ) : (
                        <></>
                      )}
                      {rating !== "" ? (
                        <div className="d-flex align-items-end">
                          <h6>Add the reviews : </h6>
                          {/* <p className="f-15 me-1 mb-0">{rating}</p> */}
                          <Rating
                            value={0}
                            isEditable={true}
                            handleRatingChange={addReview}
                            className="mt-3"
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {/* <span className="d-flex align-items-center mt-2">
                        <h6>Facebook : </h6>
                        <p className="ms-2 mb-0"></p>
                      </span>
                      <span className="d-flex align-items-center mt-2">
                        <h6>Twitter : </h6>
                        <p className="ms-2 mb-0"></p>
                      </span> */}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                {show ? (
                  <div>
                    <div
                      className={`${styles.About_section} pointer`}
                      onClick={overview_status}
                    >
                      <h6 className="my-1">
                        Less Details <AiOutlineArrowUp />
                      </h6>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div
                      className={`${styles.About_section} pointer`}
                      onClick={overview_status}
                    >
                      <h6 className="my-1">
                        All Details <AiOutlineArrowDown />
                      </h6>
                    </div>
                  </div>
                )}
              </Whitewrapper>
              <div>
                {jobs.map((val, i) => {
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
                    return (
                      <p className="f-12 text-semibold">No Internship Found!</p>
                    );
                  } else {
                    return (
                      <Whitewrapper key={i} className="p-3 my-2 ">
                        <div className="row">
                          <div className="pt-2 px-3 col-sm-8">
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
                                      : val.internshipJob &&
                                        val.internshipJob.title
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
                              <span className="d-flex align-items-center border__right p-1">
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
                              <span className="d-flex align-items-center border__right p-1">
                                <img
                                  src={dollar.src}
                                  alt=""
                                  width={14}
                                  className="me-2"
                                />
                                <p className="f-12 mb-0">
                                  {val.stipend
                                    ? val.stipend.amount
                                    : "Not disclosed"}
                                </p>
                              </span>
                              <span className="d-flex align-items-center border__right p-1">
                                <img
                                  src={location.src}
                                  alt=""
                                  width={14}
                                  className="me-2"
                                />
                                <p className="f-12 mb-0">
                                  {val.workMode
                                    ? val.workMode
                                    : val.internshipJob &&
                                      val.internshipJob.workMode
                                    ? val.internshipJob.workMode
                                    : "Not disclosed"}
                                </p>
                              </span>
                              <span className="d-flex align-items-center  p-2">
                                <img
                                  src={watch.src}
                                  alt=""
                                  width={14}
                                  className="me-2"
                                />
                                <p className="f-12 mb-0">
                                  {val.duration &&
                                  val.duration.from &&
                                  val.duration.to
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
                              <p className="f-11">
                                {moment(val.createdAt).fromNow()}
                              </p>
                              <div className="d-flex align-items-center">
                                {val.isApplied ? (
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
                                        color="#000"
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
                                        : val.internshipJob &&
                                          val.internshipJob.isSave
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

                          <div className="col-sm-4 border-left">
                            <Speedometer
                              width={200}
                              width1={200}
                              height={80}
                              height1={80}
                              maxValue={100}
                              paddingvertical={0}
                              valueAfterInternship={val.skillMatchCount}
                            />
                          </div>
                        </div>
                      </Whitewrapper>
                    );
                  }
                })}
              </div>

              {/* <Whitewrapper className="mt-5 py-2">
                <div className="container px-4 py-3">
                  <h4>Student Applied</h4>
                  <div className="row my-4">
                    <div className="col-sm-6">
                      <div className={`${styles.Student_jobsborder}`}>
                        <StudentApplicationOfJobs
                          img={profileimg}
                          studentname="Student Name"
                          Experience="2 years"
                          Skills="Skills"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className={`${styles.Student_jobsborder}`}>
                        <StudentApplicationOfJobs
                          img={profileimage}
                          studentname="Student Name"
                          Experience="2 years"
                          Skills="Skills"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles.About_section}`}>
                  <h6>
                    Show All Events <AiOutlineArrowRight />
                  </h6>
                </div>
              </Whitewrapper> */}

              {/* <Whitewrapper className="mt-5 py-2">
                <div className="px-4 py-2">
                  <span>
                    <h4>Company Staff</h4>
                  </span>
                  <div className="row">
                    <StaffSwiper />
                  </div>
                </div>
                <div className={`${styles.About_section}`}>
                  <h6>
                    Show All Events <AiOutlineArrowRight />
                  </h6>
                </div>
              </Whitewrapper> */}
            </div>
            {/* <div className="mt-5">
              <Whitewrapper>
                <div className="p-4">
                  <h4>Recently Posted Jobs</h4>
                  <JobsList data={jobs} />
                </div>
              </Whitewrapper>
            </div> */}
          </div>
          {/* <div className="col-sm-3">
            <div>
              <Whitewrapper>
                <Companyskill
                  data={data.interestedcompanies}
                  className="mb-3"
                  heading="Similar Company"
                />
              </Whitewrapper>
            </div>
            <div className="mt-4">
              <Whitewrapper>
                <Companyskill
                  data={data.interestedcompanies}
                  className="mb-3"
                  heading="Similar Company"
                />
              </Whitewrapper>
            </div>
            <div className="mt-4">
              <Whitewrapper>
                <Companyskill
                  data={data.interestedcompanies}
                  className="mb-3"
                  heading="Similar Company"
                />
              </Whitewrapper>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SuggestedCompanyDetails;
