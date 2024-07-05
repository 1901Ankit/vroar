import profileControllers from "@/api/profile";
import Loading from "@/components/loading";
import { useRouter } from "next/router";
import React from "react";
import { CiEdit, CiTextAlignLeft } from "react-icons/ci";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./index.module.css";
import moment from "moment";
import Whitewrapper from "@/components/whitewrapper";
import ReactSpeedometer from "react-d3-speedometer";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Carousel } from "react-responsive-carousel";
import Placeholder from "@/components/placeholder-loading";
import Button from "@/components/button";

const InternDetail = () => {
  const router = useRouter();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const getInternDetails = (value) => {
    profileControllers
      .getInternById(value)
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    router.query.slug ? getInternDetails(router.query.slug) : () => {};
  }, [router]);
  return (
    <div>
      {/* {loading ? (
        <Loading
          type="bars"
          height={30}
          width={30}
          className="m-auto"
          color="#f15d17"
        />
      ) : ( */}
      <div className="container p-0">
        {loading ? (
          <Placeholder height="40vh" />
        ) : (
          <div
            style={{
              backgroundImage: `url(${data.coverImage})`,
              height: "40vh",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className={`${styles.overflow__hidden}`}>
              {loading ? (
                <Placeholder circle={true} />
              ) : (
                <img
                  className={`${styles.profile_image} ms-2`}
                  src={data.avatar}
                  alt=""
                />
              )}
            </div>
          </div>
        )}
        {loading ? (
          <Placeholder count={3} />
        ) : (
          <div className="mt-7 ms-2">
            <h5 className="">{data.name}</h5>
            {data.headline ? (
              <p>
                <span className="f-12">{data.headline}</span>
              </p>
            ) : (
              <></>
            )}
            <p className="my-2">
              <span className="f-13 fw-semibold">Email : </span>
              <span className="f-12">{data.email}</span>
            </p>
            {data.phoneNo ? (
              <p>
                <span className="f-13 fw-semibold">Phone : </span>
                <span className="f-12">{data.phoneNo}</span>
              </p>
            ) : (
              <></>
            )}
            <p className="mb-2">
              <span className="f-13 fw-semibold">Birth Date : </span>
              <span className="f-12">
                {moment(data.birthDate).format("DD-MM-YYYY")}
              </span>
            </p>
            {data.about === "undefined" || !data.about ? (
              <></>
            ) : (
              <div className="d-flex mb-2">
                <p className=" f-13 fw-semibold">About: </p>
                <p className="f-12 ms-2">{data.about}</p>
              </div>
            )}

            {data.skills && data.skills.length ? (
              <p>
                <span className="fw-semibold f-13">Skills : </span>
                <span className="f-12">{data.skills.join(" . ")}</span>
              </p>
            ) : (
              <></>
            )}
            {/* <p className="mb-2">
              <span className="f-13 fw-semibold">Availability : </span>
              <span className="fw-12"></span>
            </p> */}
            <div className="row my-3">
              {data.availability && data.availabilityHoursInWeek ? (
                <div className="col-sm-3">
                  <Whitewrapper className="p-3  " height={"100%"}>
                  <div className="d-flex align-items-center">
                      <Button
                        className="custom_btn me-2"
                        width="15px"
                        height="15px"
                        rounded="0px"
                      ></Button>
                     <h6 className="">Duration</h6>
                    </div>
                  
                    <div className="my-4">
                      <div className="d-flex ">
                        <AiOutlineClockCircle className="me-2" />
                        
                        <div className="" >
                          <h6>Availability </h6>
                          <p>
                            <span className="f-13 fw-semibold">From : </span>
                            <span className="f-12">
                              {moment(data.availability.from).format(
                                "DD-MM-YYYY"
                              )}{" "}
                            </span>
                          </p>
                          <p>
                            <span className="f-13 fw-semibold">To : </span>
                            <span className="f-12">
                              {moment(data.availability.To).format(
                                "DD-MM-YYYY"
                              )}{" "}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 d-flex ">
                      <AiOutlineClockCircle className="me-2" />
                      <div>
                        <h6>Availability in Hours</h6>
                        <p className="f-12">
                          {data.availabilityHoursInWeek} hours / week
                        </p>
                      </div>
                    </div>
                  </Whitewrapper>
                </div>
              ) : (
                <></>
              )}
              {data.locationWeight ? (
                <div className="col-sm-4">
                  <Whitewrapper className="p-3" height="225px">
                  <div className="d-flex align-items-center">
                      <Button
                        className="custom_btn me-2"
                        width="15px"
                        height="15px"
                        rounded="0px"
                      ></Button>
                      <h6 className="">Location Preference</h6>
                    </div>
                   
                    <div className="text-center">

                    
                    <ReactSpeedometer
                      className=""
                      width={300}
                      needleHeightRatio={0.7}
                      value={
                        data.locationWeight === "LOW"
                          ? 111
                          : data.locationWeight === "MID"
                          ? 555
                          : 777
                      }
                      height={150}
                      customSegmentStops={[0, 250, 750, 1000]}
                      segmentColors={["red", "yellow", "green"]}
                      customSegmentLabels={[
                        {
                          text: "LOW",
                          position: "INSIDE",
                          color: "#000",
                        },
                        {
                          text: "MEDIUM",
                          position: "INSIDE",
                          color: "#000",
                        },
                        {
                          text: "HIGH",
                          position: "INSIDE",
                          color: "#000",
                        },
                      ]}
                      ringWidth={47}
                      needleTransitionDuration={3333}
                      needleTransition="easeElastic"
                      needleColor={"#a7ff83"}
                      textColor={"#d8dee9"}
                    />
                    </div>
                  </Whitewrapper>
                </div>
              ) : (
                <></>
              )}
              {data.education && data.education.length ? (
                <div className="col-sm-5">
                  <Whitewrapper className="p-3">
                  <div className="d-flex align-items-center">
                      <Button
                        className="custom_btn me-2"
                        width="15px"
                        height="15px"
                        rounded="0px"
                      ></Button>
                       <h6 className="">Education</h6>
                    </div>
                    
                

                    <Carousel
                      showArrows={false}
                      showIndicators={true}
                      showStatus={false}
                      showThumbs={false}
                    >
                      {data.education.map((val, i) => (
                        <div className="bordered text-start p-2 mt-2" key={i}>
                          <p>
                            <span className="fw-semibold f-13">
                              Institution :{" "}
                            </span>
                            <span className="f-12">{val.institution}</span>
                          </p>
                          <p className="my-1">
                            <span className="fw-semibold f-13">Degree : </span>
                            <span className="f-12">{val.degree}</span>
                          </p>
                          <p className="my-1">
                            <span className="fw-semibold f-13">
                              Field of Study :{" "}
                            </span>
                            <span className="f-12">{val.fieldofstudy}</span>
                          </p>
                          <p className="my-1">
                            <span className="fw-semibold f-13">From : </span>
                            <span className="f-12">
                              {moment(val.from).format("DD-MM-YYYY")}
                            </span>
                          </p>
                          <p className="my-1">
                            <span className="fw-semibold f-13">To : </span>
                            <span className="f-12">
                              {moment(val.To).format("DD-MM-YYYY")}
                            </span>
                          </p>
                          {/* <p className="my-1">
                            <span className="fw-semibold">Grade : </span>
                            <span>{val.grade}</span>
                          </p> */}
                        </div>
                      ))}
                    </Carousel>
                  </Whitewrapper>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
      </div>
      {/* )} */}
      {/* <div
        style={{
          backgroundImage: `url(${
            userRole == "STUDENT"
              ? userDetail.coverImage
              : userDetail.coverImage
          })`,
          height: "30vh",
          crossOrigin: "anonymous",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
       
      </div> */}
    </div>
  );
};

export default InternDetail;
