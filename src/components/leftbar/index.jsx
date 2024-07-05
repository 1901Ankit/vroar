import React, { useState } from "react";
import Profiledashboard from "../profile_Dashboard";
import styles from "./index.module.css";
import profiledescription from "../../assessts/data/constant";
import student from "../../assessts/images/homepage/07.png";
import StudentChart from "../studentchart";
// import { useEffect } from "react";

import List from "../list";
import data from "@/assessts/data/data";
import Whitewrapper from "../whitewrapper";
import { useEffect } from "react";
import Authcontrollers from "@/api/auth";
import { useSelector } from "react-redux";
import Rating from "../ratingstars";
import Button from "../button";
import companyControllers from "@/api/companyJobs";
import { USER_ROLES } from "@/utils/enum";
import Placeholder from "../placeholder-loading";
const Leftbar = (props) => {
  const [studentdata, setStudentdata] = useState({});
  let [skills, setSkills] = useState([]);
  const userDetails = () => {
    Authcontrollers.getuserdetails()
      .then((res) => {
        res.data.data &&
          res.data.data.company &&
          companyReview(res.data.data.company._id);
        setStudentdata(res.data.data);
        const outputArray = res.data.data.skills.map((item) => ({
          name: item,
        }));

        setSkills(outputArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [rating, setRating] = useState("");
  const [reviewCount, setReviewCount] = useState("");

  const companyReview = (id) => {
    companyControllers
      .getCompanyreview(id)
      .then((res) => {
        setRating(res.data.data.rating);
        setReviewCount(res.data.data.reviewsCount);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const role = useSelector((state) => state.userdetails.group);
  useEffect(() => {
    userDetails();
  }, []);
  return (
    <div className={`${styles.leftsidebar}  my-5 `}>
      <div className={`${styles.leftbar}`}>
        {/* <Profiledashboard
          className="mb-5"
          img={props.img}
          name={props.name}
          username={props.username}
          description={props.description}
          cover={props.cover}
          bg={props.bg}
          designation={props.designation}
          companyRepresentative={props.companyRepresentative}
          loading={props.loading}
        /> */}
        <Whitewrapper className="mb-5">
          <div
            style={{
              backgroundImage: `url(${props.cover})`,
              height: "20vh",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              position: "relative",
              borderTopRightRadius: "8px",
              borderTopLeftRadius: "8px",
            }}
          >
            <div className={styles.profile_image}>
              {props.loading ? (
                <Placeholder circle={true} width={80} height={80} />
              ) : (
                <img
                  src={props.img}
                  width={80}
                  height={80}
                  style={{ borderRadius: "50%" }}
                />
              )}
            </div>
          </div>
          {props.loading ? (
            <Placeholder count={2} className="p-2 mt-2" />
          ) : (
            <div className="p-2 mt-5 ">
              <h5 className="text-center text-capitalize mb-1">{props.name}</h5>
              <p className="text-justify text-grey f-12 ">
                {props.description}
              </p>
            </div>
          )}
        </Whitewrapper>

        {role === USER_ROLES.STUDENT ? <></> : <></>}

        {role === USER_ROLES.COMPANY && rating !== "" ? (
          <>
            <Whitewrapper className="mb-5 p-3">
              <div className="d-flex align-items-center">
                <Button
                  className="custom_btn me-1"
                  width="15px"
                  height="15px"
                  rounded="0px"
                ></Button>

                <h6 className="ms-1">Company Representative</h6>
              </div>
              <p className="f-12  mt-2 ms-4 text-capitalize ">
                {props.companyRepresentative}
              </p>
              <p className="f-11 ms-4 mt-6 text-capitalize">
                {props.designation}
              </p>
            </Whitewrapper>
            <Whitewrapper className="p-3 mb-5">
              <div className="d-flex mb-2 ">
                <Button
                  className="custom_btn  mt-1"
                  width="15px"
                  height="15px"
                  rounded="0px"
                  // margin="5px"
                ></Button>
                <h6 className="ms-2">Company Rating</h6>
              </div>

              <div className="d-flex align-items-end justify-content-start mx-4">
                <p className="f-15 me-1 mb-0">{rating}</p>
                <Rating value={rating} isEditable={false} />
                <p className="f-12 text-orange ms-2 fw-semibold">
                  {reviewCount} Reviews
                </p>
              </div>
            </Whitewrapper>
          </>
        ) : role === USER_ROLES.STUDENT ? (
          <Whitewrapper className="p-3 mb-5">
            <div className="d-flex align-items-center  py-2  ">
              <Button
                className="custom_btn me-2"
                width="15px"
                height="15px"
                rounded="0px"
              ></Button>
              <h6 className="">Skills</h6>
            </div>
            {skills.map((val, i) => (
              <p className="f-12 my-2 ms-4" key={i}>
                # {val.name}
              </p>
            ))}
          </Whitewrapper>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Leftbar;
