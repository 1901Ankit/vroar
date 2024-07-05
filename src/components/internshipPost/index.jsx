import { useState } from "react";
import { useEffect } from "react";
import Whitewrapper from "../whitewrapper";
import styles from "./index.module.css";
import suitcase from "../../assessts/images/dashboard/suitcase.png";
import location from "../../assessts/images/dashboard/pin.png";
import Loading from "../loading";
import Speedometer from "../speedometer";
import { useRouter } from "next/router";
import { parentController } from "@/api/parent";
import PieChart from "../piechart";
import Button from "../button";
import moment from "moment";
import Progressbar from "@/components/progressBar";
import AnimatedExample from "../progs";
const InternshipPost = (props) => {
  const [child, setChild] = useState("");
  const router = useRouter();
  const backgroundColor = [
    "#f79663",
    "#fdc878",
    "#15d7d7",
    "#00ACb3",
    "#f14c88",
    "#d84675",
  ];
  const suggestiveSkills = [
    "Cloud Computing",
    "Product Management",
    "AI",
    "ML",
    "Communication",
  ];
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
  useEffect(() => {
    router.query.slug ? getChildDescription(router.query.slug) : () => {};
  }, [router.query.slug]);

  const borderColor = ["#ffffff"];

  const studentInternshipdetailPage = (value) => {
    let body = value.internshipJob
      ? {
          jobId: value.internshipJob._id,
          studentId: router.query.slug,
        }
      : {
          jobId: value._id,
          studentId: router.query.slug,
        };
    parentController
      .getChildInternshipdetails(body)
      .then((res) => {
        router.push(
          `/job-detail/${
            value.internshipJob ? value.internshipJob._id : value._id
          }`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (props.loading) {
    return <Loading type="spin" width={25} height={25} className="m-auto" />;
  } else {
    return (
      <div>
        <div className="row">
          <div className="col-sm-7 ">
            {props.data.map((val, i) => (
              <Whitewrapper className="mb-5 p-3  " key={i}>
                <div className="row  ">
                  <div className={` ${styles.jobs__wrapper} col-sm-7 pt-3 `}>
                    <h5
                      onClick={() => studentInternshipdetailPage(val)}
                      className={`${styles.heading_title} mb-2`}
                    >
                      {val.title ? val.title : val.internshipJob.title}
                    </h5>
                    <p className="f-12 fw-semibold">
                      {val.company.companyName}
                    </p>
                    <div className="d-flex align-items-center">
                      <p className="f-12 my-2  me-2 ">{val.company.industry}</p>
                      <span>|</span>
                      <p className="f-12 my-2 ms-2 ">{`${val.company.companyEmail} `}</p>
                    </div>

                    {props.isApplied ? (
                      val.internshipJob.skills.length ? (
                        <p className="fw-semibold f-13 my-2">
                          Skills :
                          <span className="f-12 fw-normal ms-1">
                            {val.internshipJob.skills.join(" , ")}
                          </span>
                        </p>
                      ) : val.skills.length ? (
                        <p className="fw-semibold f-13 my-2">
                          Skills :
                          <span className="f-12 fw-normal ms-1">
                            {val.skills.join(" , ")}
                          </span>
                        </p>
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )}
                    {val && val.description ? (
                      <p className="f-12">{val.description.slice(0, 50)}... </p>
                    ) : (
                      ""
                    )}
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <img src={suitcase.src} alt="" width={15} />
                        <span className="f-12 ms-2">
                          {val.experience
                            ? val.experience === "0" ||
                              val.experience === "fresher" ||
                              val.experience === "Fresher"
                              ? "Fresher"
                              : `${val.experience} ${
                                  val.experience > 1 ? "Years" : ""
                                }`
                            : val.internshipJob.experience === "0" ||
                              val.internshipJob.experience === "fresher" ||
                              val.internshipJob.experience === "Fresher"
                            ? "Fresher"
                            : `${val.internshipJob.experience} ${
                                val.internshipJob.experience > 1
                                  ? "Years"
                                  : "year"
                              }`}
                        </span>
                      </div>
                      <div>
                        <img src={location.src} width={15} alt="" />
                        <span className="f-12 ms-12 text-capitalize">
                          {val.workMode
                            ? val.workMode
                            : val.internshipJob
                            ? val.internshipJob.workMode
                            : "Not Disclosed"}
                        </span>
                      </div>
                      <p className="fw-semibold f-12">
                        $
                        <span className="ms-1 fw-normal">
                          {val.stipend ? val.stipend.amount : "Not Disclosed"}
                        </span>
                      </p>
                    </div>
                    <p className="f-12 mt-2">
                      Posted :{" "}
                      <span className="f-12">
                        {moment(val.createdAt).fromNow()}
                      </span>
                    </p>
                  </div>
                  {/* <div className="col-sm-6 text-center">
                    <Button className="custom_btn" border="1px solid #f15d17">
                      View Internship
                    </Button>
                  </div> */}
                  <div className="col-sm-5">
                    <Speedometer
                      height={100}
                      height1={100}
                      width={230}
                      width1={230}
                      maxValue={100}
                      paddingVertical={0}
                      valueBeforeInternship={
                        val.currentSkill
                          ? val.currentSkill
                          : val.internshipJob && val.internshipJob.currentSkill
                          ? val.internshipJob.currentSkill
                          : 0
                      }
                      valueAfterInternship={
                        val.skillMatchCount
                          ? val.skillMatchCount
                          : val.internshipJob &&
                            val.internshipJob.skillMatchCount
                          ? val.internshipJob.skillMatchCount
                          : 0
                      }
                    />
                  </div>
                </div>
              </Whitewrapper>
            ))}
          </div>

          <div className="col-sm-1"></div>
          <div className="col-sm-4 text-center">
            <div className="row">
              {props.speedometerObj !== "" ? (
                <div className="col-sm-12">
                  <Whitewrapper className=" p-2 mb-5">
                    <div className="d-flex align-items-center">
                      <Button
                        className="custom_btn me-2"
                        width="15px"
                        height="15px"
                        rounded="0px"
                      ></Button>
                      <h6 className="">After Taking Top Internships</h6>
                    </div>
                    <div className="">
                      <Speedometer
                        height={100}
                        width={230}
                        height1={100}
                        width1={230}
                        valueBeforeInternship={
                          props.speedometerObj.currentSkill
                        }
                        maxValue={100}
                        valueAfterInternship={props.speedometerObj.rating}
                      />
                      <div className="ms-2">
                        <h6 className="mb-2">
                          Career goal {rating}
                          <span className="f-12">%</span>
                        </h6>
                        {/* <Progressbar
                        completed={props.speedometerObj.rating}
                        maxCompleted={100}
                        bgColor="#f15d17"
                        height="20px"
                      /> */}
                        <div className="p-2">
                          <AnimatedExample
                            completed={props.speedometerObj.rating}
                            maxCompleted={100}
                            height="20px"
                            bgColor="#f15d17"
                            label={`${props.speedometerObj.rating}%`}
                          />
                        </div>
                        <p className="f-12 mt-1 border-bottom">
                          Add more skills to achieve 100%
                        </p>
                        {suggestiveSkills.length ? (
                          <div>
                            <p className="f-12 fw-semibold text-start mx-2">
                              Suggested Skills
                            </p>
                            <div className="row">
                              {suggestiveSkills.map((val, i) => (
                                <div
                                  className="col-sm-8 text-start f-12 mx-2"
                                  key={i}
                                >
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
                </div>
              ) : (
                ""
              )}

              <div className="col-sm-12 ">
                <Whitewrapper className="p-3 mb-5">
                  <div className="d-flex align-items-center">
                    <Button
                      className="custom_btn me-2"
                      width="15px"
                      height="15px"
                      rounded="0px"
                    ></Button>
                    <h6 className="">Prospective Opportunity</h6>
                  </div>
                  {/* <h6 className="my-2 text-center">Prospective Opportunity</h6> */}
                  <div className={` p-4`}>
                    <PieChart
                      label={props.count.industryCount.map((val) => val._id)}
                      data={props.count.industryCount.map((val) => val.count)}
                      backgroundColor={backgroundColor}
                      border={borderColor}
                      score="Prospective Opportunity"
                    />
                  </div>
                </Whitewrapper>
                {props.count && props.count.skillCount.length ? (
                  <Whitewrapper className="mb-5 p-3">
                    <div className="d-flex align-items-center">
                      <Button
                        className="custom_btn me-2"
                        width="15px"
                        height="15px"
                        rounded="0px"
                      ></Button>
                      <h6 className="">Skill Matching</h6>
                    </div>
                    {/* <h6 className="my-2 text-center">Skill Matching</h6> */}
                    <div className={` p-4`}>
                      <PieChart
                        label={props.count.skillCount.map((val) => val._id)}
                        data={props.count.skillCount.map((val) => val.count)}
                        score="Skill Count"
                        backgroundColor={backgroundColor}
                        borderColor={borderColor}
                      />
                    </div>
                  </Whitewrapper>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          {/* <div className="col-sm-1"></div> */}
          {/* <div className="col-sm-4">
            <Whitewrapper className="p-3">
              <h4 className="my-2 text-center">Prospective Opportunity</h4>
              <PieChart
                label={props.count.industryCount.map((val) => val._id)}
                data={props.count.industryCount.map((val) => val.count)}
                backgroundColor={backgroundColor}
                border={borderColor}
                score="Prospective Opportunity"
              />
            </Whitewrapper>
            {props.count && props.count.skillCount.length ? (
              <Whitewrapper className="my-2 p-3">
                <h4 className="my-2 text-center">Skill Matching</h4>

                <PieChart
                  label={props.count.skillCount.map((val) => val._id)}
                  data={props.count.skillCount.map((val) => val.count)}
                  score="Skill Count"
                  backgroundColor={backgroundColor}
                  borderColor={borderColor}
                />
              </Whitewrapper>
            ) : (
              <></>
            )}
          </div> */}
        </div>
      </div>
    );
  }
};

export default InternshipPost;
