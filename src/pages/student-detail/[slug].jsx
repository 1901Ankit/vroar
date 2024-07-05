import React from "react";
import { CiEdit, CiLocationOn } from "react-icons/ci";
import backgroundImage from "../../assessts/images/profile/Cover_Banner.jpg";
import profile from "../../assessts/images/profile/avatar.jpg";
import styles from "./index.module.css";
import Whitewrapper from "@/components/whitewrapper";
import Multicarousel from "@/components/multicarousel";
import Head from "next/head";
import { useRouter } from "next/router";
import { parentController } from "@/api/parent";
import { useEffect } from "react";
import { useState } from "react";
import Placeholder from "@/components/placeholder-loading";
import InternshipPost from "@/components/internshipPost";
import PieChart from "@/components/piechart";
import "swiper/css";
import ReactSpeedometer from "react-d3-speedometer";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaSuitcase } from "react-icons/fa";
import moment from "moment";
import Progressbar from "@/components/progressBar";
import Button from "@/components/button";
import Speedometer from "@/components/speedometer";
const StudentDetail = () => {
  const router = useRouter();
  const [child, setChild] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [internshipLoading, setInternshipLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [matchingJob, setMatchingJob] = useState([]);
  const [count, setCount] = useState("");
  const getChildMatchingInternship = (value) => {
    parentController
      .getChildMatchingInternship(value)
      .then((res) => {
        setIsApplied(false);
        // console.log(res.data.data);
        setCount(res.data.data);
        setMatchingJob(res.data.data.docs);
        setInternshipLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [appliedInternship, setAppliedInternship] = useState([]);
  const getInternsAppliedInternships = (value) => {
    parentController
      .getChildAppliedInternship(value)
      .then((res) => {
        setIsApplied(true);
        setAppliedInternship(res.data.data.docs);
        setInternshipLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getChildDescription = (value) => {
    parentController
      .getChildDescription(value)
      .then((res) => {
        // console.log(res)
        setChild(res.data.data);
        setLoading(false);
        getChildMatchingInternship(res.data.data._id);
        getChildtopInternship(res.data.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const skillsBeforeInternship = 0;
  const [rating, setRating] = useState("");
  const [top, setTop] = useState([]);
  const getChildtopInternship = (value) => {
    parentController
      .getChildTopInternship(value)
      .then((res) => {
        setTop(res.data.data.docs);
        setRating(res.data.data.topInternshipRating);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getChildInternshipdetails = (value) => {
    let body = {
      job_id,
    };
  };
  const suggestiveSkills = [
    "Cloud Computing",
    "Product Management",
    "AI",
    "ML",
    "Communication",
  ];

  useEffect(() => {
    router.query.slug ? getChildDescription(router.query.slug) : () => {};
  }, [router.query.slug]);

  return (
    <div>
      <Head>
        <title>Student Detail</title>
      </Head>

      <div className="container p-0">
        <div
          className={`${styles.cvrimg}`}
          style={{
            backgroundImage: `url(${child.coverImage})`,
            height: "40vh",
            crossOrigin: "anonymous",
            backgroundRepeat: "no-repeat",
            width: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            objectFit: "cover",
          }}
        >
          <div className="text-end"></div>
          <div className={`${styles.overflow__hidden}`}>
            <div className={`${styles.edit_profile_image}`}></div>
            <img
              src={child.avatar}
              className={`${styles.profile_image} ms-2`}
              alt=""
            />
          </div>
        </div>
        <div className="mt-5">
          {loading ? (
            <Placeholder count={4} />
          ) : (
            <div className="row ">
              <div className={`${styles.line} col-sm-2 mt-5`}>
                <div className="mt-2">
                  <h5 className="text-capitalize">{child.name}</h5>
                  {child.profile === null ? (
                    <></>
                  ) : (
                    <p className="f-12">{child.profile.headline}</p>
                  )}
                  <p className="f-12">{child.email}</p>
                  <p className="f-12">
                    <span className="fw-semibold f-12">Birth Date : </span>
                    {moment(child.birthDate).format("MMM-DD-YYYY")}
                  </p>
                  {/* {child.profile && child.profile.availabilityHoursInWeek ? (
                    <p>
                      <span className="fw-semibold f-13 me-1">
                        Available For (Hours in Week) :
                      </span>
                      {child.profile
                        ? child.profile.availabilityHoursInWeek
                        : ""}{" "}
                      Hours
                    </p>
                  ) : (
                    <></>
                  )} */}
                </div>
              </div>
              {/* <div className={`${styles.separator} col-sm-1`}></div> */}
              <div className="col-sm-9 mt-2">
                <div className="d-flex align-items-center">
                  <Button
                    className="custom_btn me-2"
                    width="15px"
                    height="15px"
                    rounded="0px"
                  ></Button>
                  <h6>Top Internships For</h6>{" "}
                  <h6 className="ms-1">{child.name}</h6>
                </div>

                <Swiper
                  height={400}
                  // className={`${styles['swiper-container']}`}
                  className={`${styles.swipered} `}
                  breakpoints={{
                    640: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 4,
                      spaceBetween: 5,
                    },
                    1024: {
                      slidesPerView: 5,
                      spaceBetween: 5,
                    },
                  }}
                >
                  {top.map((val, i) => (
                    <SwiperSlide key={i} className={`${styles.swislid} `}>
                      <Whitewrapper className="my-4 p-3">
                        <div className="row">
                          <div className="col-sm-12"></div>
                          <div className={`${styles.swilid} col-sm-12`}>
                            <h4
                              className="f-13"
                              onClick={() => getChildInternshipdetails(val)}
                            >
                              {" "}
                              <img
                                className={`${styles.company_logo} align-items-center`}
                                src={val.company.logo}
                              />{" "}
                              {val.title}
                              <p className={`${styles.companynme} f-12 ms-4`}>
                                {val.company.companyName}
                              </p>
                            </h4>
                            <div className="d-flex align-items-center mt-1">
                              <CiLocationOn
                                className={`${styles.companynme} ms-4`}
                              />
                              <p className="f-12 ">
                                {val.workMode ? val.workMode : "Not Disclosed"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Whitewrapper>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* <div className="col-sm-4 text-center">
                <Whitewrapper className="mb-5 p-2">
                  <div className="d-flex align-items-center">
                    <Button
                      className="custom_btn me-2"
                      width="15px"
                      height="15px"
                      rounded="0px"
                    ></Button>
                    <h6 className="">After Taking Top Internships</h6>
                  </div>
                  <div className=" p-2">
                    <Speedometer
                      height={100}
                      width={230}
                      height1={100}
                      width1={230}
                      valueBeforeInternship={child.currentSkill}
                      maxValue={100}
                      valueAfterInternship={child.skillMatchCount}
                    />
                    <div className="ms-2">
                      <h6 className="mb-2">
                        Career goal {rating}
                        <span className="f-12">%</span>
                      </h6>
                      <Progressbar
                        completed={rating}
                        maxCompleted={100}
                        bgColor="#f15d17"
                        height="20px"
                      />
                      <p className="f-12 mt-1 border-bottom">
                        Add more skills to achieve 100%
                      </p>
                      {suggestiveSkills.length ? (
                        <div>
                          <p className="f-12 fw-semibold text-start">Suggested Skills</p>
                          <div className="row">
                            {suggestiveSkills.map((val, i) => (
                              <div className="col-sm-8 text-start f-12" key={i}>
                                #{val}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </Whitewrapper>
              </div> */}
            </div>
          )}

          {child && child.profile && child.profile.skills.length ? (
            loading ? (
              <Placeholder />
            ) : (
              <div className="d-flex  align-items-center">
                <h5 className="">Skills : </h5>

                <div
                  className={`${styles.skils} ms-2 d-flex  align-items-center `}
                >
                  {child.profile.skills.map((val) => (
                    <p className={styles.skills_wrapper}>{val}</p>
                  ))}
                </div>
              </div>
            )
          ) : (
            <></>
          )}
          {/* <div className="my-5">
            <h4>Top Internships</h4>
            <Swiper slidesPerView={5} spaceBetween={10} height={400}>
              {top.map((val, i) => (
                <SwiperSlide key={i}>
                  <Whitewrapper className="my-4 p-">
                    <div className="row">
                      <div className="col-sm-3">
                        <img
                          className={styles.company_logo}
                          src={val.company.logo}
                        />
                      </div>
                      <div className="col-sm-9">
                        <h4
                          className="f-13"
                          onClick={() => getChildInternshipdetails(val)}
                        >
                          {" "}
                          {val.title}
                        </h4>
                        <p className="f-12">{val.company.companyName}</p>
                        <div className="d-flex align-items-center mt-1">
                          <CiLocationOn />
                          <p className="f-12">
                            {val.workMode ? val.workMode : "Not Disclosed"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Whitewrapper>
                </SwiperSlide>
              ))}
            </Swiper>
          </div> */}

          <div
            className="d-flex align-items-center mb-3 mt-4"
            style={{ borderBottom: "1px solid #d7d7d7" }}
          >
            <p
              className="f-13 fw-semibold pointer"
              style={{
                borderBottom: `${isApplied ? "" : "2px solid #f15d17"}`,
              }}
              onClick={() => getChildMatchingInternship(child._id)}
            >
              Matching internships
            </p>
            <p
              className="f-13 ms-4 fw-semibold pointer"
              style={{
                borderBottom: `${isApplied ? "2px solid #f15d17" : ""}`,
              }}
              onClick={() => getInternsAppliedInternships(child._id)}
            >
              Applied internships
            </p>
          </div>
          <InternshipPost
            data={isApplied ? appliedInternship : matchingJob}
            loading={internshipLoading}
            count={count}
            isApplied={isApplied}
            speedometerObj={
              rating ? { rating, currentSkill: skillsBeforeInternship } : ""
            }
          />
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
