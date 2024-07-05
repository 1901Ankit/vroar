import companyControllers from "@/api/companyJobs";
import Button from "@/components/button";
import Loading from "@/components/loading";
import Placeholder from "@/components/placeholder-loading";
import Whitewrapper from "@/components/whitewrapper";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "swiper/css";
import styles from "./index.module.css";
const InternshipDetails = () => {
  const INTERNSHIP_APPLICATION_STATUS = {
    APPLIED: "APPLIED",
    SELECTED: "SELECTED",
    INTERVIEW_SCHEDULED: "INTERVIEW_SCHEDULED",
    REJECTED: "REJECTED",
  };
  const router = useRouter();
  const [internship, setIntenship] = useState("");
  const [internshipLoading, setInternshipLoading] = useState(true);
  const [childId, setChildId] = useState("");
  const jobInternship = (value) => {
    companyControllers
      .getJobsById(value)
      .then((res) => {
        // console.log(res.data.data._id);
        setIntenship(res.data.data);
        setInternshipLoading(false);
        setChildId(res.data.data._id);
        getJobsApplicantList(res.data.data._id);
        getSuggestedCandidate(res.data.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [applicant, setApplicant] = useState([]);
  const [applyLoading, setApplyLoading] = useState(true);
  const getJobsApplicantList = (value) => {
    companyControllers
      .getApplicantList(value)
      .then((res) => {
        setApplicant(res.data.data.docs);
        setApplyLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setApplyLoading(true);
      });
  };
  const [suggested, setSuggested] = useState([]);
  const [suggestLoading, setSuggestLoading] = useState(true);
  const getSuggestedCandidate = (value) => {
    companyControllers
      .getSuggestedStudents(value)
      .then((res) => {
        setSuggested(res.data.data.docs);
        setSuggestLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setSuggestLoading(true);
      });
  };
  const companyData = [
    {
      name: internship.company ? internship.company.companyName : "",
    },
    {
      name: internship.company ? internship.company.industry : "",
    },
    {
      name: `${internship.company ? internship.company.teamSize : ""} `,
    },
    {
      name: internship.company ? internship.company.website : "",
    },
  ];
  const [loading, setLoading] = useState(applicant.map(() => false));
  const selectIntern = (value, status, id) => {
    setLoading((prevLoading) => {
      const updatedLoading = [...prevLoading];
      updatedLoading[id] = true;
      return updatedLoading;
    });
    let body = {
      applicant_id: value._id,
      status: status,
    };

    companyControllers
      .selectStudents(body)
      .then((res) => {
        toast.success(res.data.message);
        setLoading((prevLoading) => {
          const updatedLoading = [...prevLoading];
          updatedLoading[id] = false;
          return updatedLoading;
        });
        getJobsApplicantList(childId);
      })
      .catch((err) => {
        setLoading((prevLoading) => {
          const updatedLoading = [...prevLoading];
          updatedLoading[id] = false;
          return updatedLoading;
        });
        console.log(err);
      });
  };
  const rejectIntern = (value, status, id) => {
    setLoading((prevLoading) => {
      const updatedLoading = [...prevLoading];
      updatedLoading[id] = true;
      return updatedLoading;
    });

    let body = {
      applicant_id: value._id,
      status: status,
    };

    companyControllers
      .selectStudents(body)
      .then((res) => {
        toast.success(res.data.message);
        setLoading((prevLoading) => {
          const updatedLoading = [...prevLoading];
          updatedLoading[id] = false;
          return updatedLoading;
        });
        getJobsApplicantList(childId);
      })
      .catch((err) => {
        setLoading((prevLoading) => {
          const updatedLoading = [...prevLoading];
          updatedLoading[id] = false;
          return updatedLoading;
        });
        console.log(err);
      });
  };
  // const selectIntern = (value, status, id) => {

  //   setLoading((prevstate) => ({
  //     ...prevstate,
  //     [id]: true,
  //   }));
  //   let body = {
  //     applicant_id: value._id,
  //     status: status,
  //   };
  //   companyControllers
  //     .selectStudents(body)
  //     .then((res) => {
  //       toast.success(res.data.message);
  //       setLoading((prevstate) => ({
  //         ...prevstate,
  //         [id]: false,
  //       }));
  //       getJobsApplicantList(childId);
  //     })
  //     .catch((err) => {
  //       setLoading((prevstate) => ({
  //         ...prevstate,
  //         [id]: false,
  //       }));
  //       console.log(err);
  //     });
  // };
  const [deleteLoading, setDeleteLoading] = useState(false);

  const deleteInternship = (value) => {
    setDeleteLoading(true);
    companyControllers
      .deleteInternshipjobs(value._id)
      .then((res) => {
        toast.success(res.data.message);
        setDeleteLoading(false);
        router.back();
      })
      .catch((err) => {
        setDeleteLoading(false);
        console.log(err);
      });
  };
  const getStudentDetail = (value) => {
    router.push(`/intern-detail/${value.user._id}`);
  };

  useEffect(() => {
    // if (router.query.slug === "") {
    //   console.log("api not calling");
    // } else {
    //   jobInternship(router.query.slug);
    // }
    router.query.slug ? jobInternship(router.query.slug) : () => {};
  }, [router.query.slug]);
  return (
    <div>
      <Head>
        <title>Internship Detail</title>
      </Head>
      <div className="container pt-4 pb-5">
        <div className="row">
          <div className="col-sm-3">
            <div className={styles.applied}>
              <h4>Suggested Candidates</h4>
            </div>
            {suggestLoading ? (
              <Loading
                type="bars"
                color="#f15d17"
                width={25}
                height={25}
                className="m-auto"
              />
            ) : suggested.length === 0 ? (
              <p className="text-center mt-3">No data</p>
            ) : (
              suggested.map((val, i) => (
                <Whitewrapper
                  key={i}
                  className={`mb-2 p-2 ${styles.student_detail} pointer`}
                >
                  <div className="row">
                    <div className="col-sm-3">
                      <img
                        className={styles.image_profile}
                        src={val.user.avatar}
                      />
                    </div>
                    <div className="col-sm-9">
                      <h6
                        onClick={() => getStudentDetail(val)}
                        className="text-decoration-underline"
                      >
                        {val.user.name || undefined}
                      </h6>
                      <p className="f-11">{val.user && val.user.email}</p>
                    </div>
                  </div>
                </Whitewrapper>
              ))
            )}
          </div>
          <div className={`${styles.intenship_data} col-sm-6`}>
            <div className="">
              <div>
                {internshipLoading ? (
                  <Placeholder width={200} />
                ) : (
                  <h4 className="">{internship.title}</h4>
                )}
              </div>
              {internshipLoading ? (
                <Placeholder />
              ) : (
                <div className="d-flex align-items-center">
                  {companyData.map((val, i) => (
                    <p className=" f-10 p-1" key={i}>
                      {val.name}
                      <span className="ms-1">|</span>
                    </p>
                  ))}
                </div>
              )}
              {internshipLoading ? (
                <Placeholder />
              ) : (
                <div className="my-1 mt-1 d-flex align-items-center">
                  <h6 className="f-12">Work Mode:</h6>

                  <p className="mb-0 pb-0 ms-2 f-12"> {internship.workMode}</p>
                </div>
              )}
              {internshipLoading ? (
                <Placeholder />
              ) : (
                <div className="my-1 mt-1 d-flex align-items-center">
                  <h6 className="f-12">Location:</h6>

                  <p className="mb-0 pb-0 ms-2 f-12">
                    {" "}
                    {internship.location
                      ? internship.location
                      : "Not Disclosed"}
                  </p>
                </div>
              )}
              {internshipLoading ? (
                <Placeholder />
              ) : (
                <div className="d-flex my-1">
                  <h6 className="f-12">Experience : </h6>
                  <p className="ms-2 f-12">
                    {internship.experience === "0"
                      ? "Fresher"
                      : `${internship.experience} Years`}
                  </p>
                </div>
              )}
              {internshipLoading ? (
                <Placeholder />
              ) : (
                <div className="d-flex align-items-center my-1">
                  <h6 className="f-12">No of Jobs: </h6>
                  <p className="ms-2 f-12">{internship.noOfJobs}</p>
                </div>
              )}
              {internshipLoading ? (
                <Placeholder />
              ) : (
                <div className="d-flex align-items-center">
                  <h6 className="f-12">Skills :</h6>
                  <p className="f-12 ms-1">{internship.skills.join(" , ")}</p>
                </div>
              )}
              {internshipLoading ? (
                <Placeholder />
              ) : (
                <div className="d-flex  align-items-center my-1">
                  <h6 className="f-12">Qualtification:</h6>
                  <p className="ms-2 f-12">{internship.qualification}</p>
                </div>
              )}

              {internshipLoading ? <Placeholder /> : <div></div>}
              {internshipLoading ? (
                <Placeholder />
              ) : (
                <div className="my-2">
                  <h6 className="mb-1 f-12">Description</h6>
                  <p className="text-justify f-12 ">{internship.description}</p>
                </div>
              )}
            </div>
            {/* <div className="text-end">
              <Button
                className="custom_btn"
                border="none"
                rounded="8px"
                padding="5px"
                width="70px"
                onClick={() => deleteInternship(internship)}
              >
                {deleteLoading ? (
                  <Loading
                    type="spin"
                    width={25}
                    height={25}
                    className="m-auto"
                  />
                ) : (
                  " Delete"
                )}
              </Button>
            </div> */}
          </div>
          <div className="col-sm-3">
            <div className={styles.applied}>
              <h4>Applied Candidates </h4>
            </div>
            {applyLoading ? (
              <Loading
                type="bars"
                color="#f15d17"
                width={25}
                height={25}
                className="m-auto"
              />
            ) : applicant.length === 0 ? (
              <p className="text-center mt-2">No Applicant find</p>
            ) : (
              applicant.map((val, i) => (
                <Whitewrapper
                  key={i}
                  className={`mb-2 p-2 pointer ${styles.student_detail} `}
                >
                  <div className="row">
                    <div className="col-sm-3">
                      <img
                        className={styles.image_profile}
                        src={val.user.avatar}
                      />
                    </div>
                    <div className="col-sm-9">
                      <h6
                        onClick={() => getStudentDetail(val)}
                        className="text-decoration-underline"
                      >
                        {val.user.name}
                      </h6>
                      <p className="f-12">{val.user.email}</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between my-2">
                      <Button
                        bg="green"
                        rounded="8px"
                        border="none"
                        width="70px"
                        color="#ffffff"
                        onClick={() =>
                          selectIntern(
                            val,
                            INTERNSHIP_APPLICATION_STATUS.SELECTED,
                            i
                          )
                        }
                      >
                        {loading[i] ? (
                          <Loading
                            type="spin"
                            width={5}
                            height={5}
                            className="m-auto"
                          />
                        ) : (
                          "Select"
                        )}
                      </Button>

                      <Button
                        bg="red"
                        rounded="8px"
                        border="none"
                        color="#ffffff"
                        onClick={() =>
                          rejectIntern(
                            val,
                            INTERNSHIP_APPLICATION_STATUS.REJECTED,
                            i
                          )
                        }
                      >
                        {loading[i] ? (
                          <Loading
                            type="spin"
                            width={5}
                            height={5}
                            className="m-auto"
                          />
                        ) : (
                          "Reject"
                        )}
                      </Button>

                      {/* <Button
                        bg="red"
                        rounded="8px"
                        border="none"
                        color="#ffffff"
                        onClick={() =>
                          selectIntern(
                            val,
                            INTERNSHIP_APPLICATION_STATUS.REJECTED,
                            i
                          )
                        }
                      >
                        Reject
                      </Button> */}
                    </div>
                  </div>
                </Whitewrapper>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetails;
