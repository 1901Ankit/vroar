import Authcontrollers from "@/api/auth";
import data from "@/assessts/data/data";
import Filter from "@/components/filter";
import Leftbar from "@/components/leftbar";
import Post from "@/components/post";
import Rightbar from "@/components/rightbar";
import Head from "next/head";
import student from "../../assessts/images/profile/avatar.jpg";
import styles from "./index.module.css";
import React, { useEffect, useState } from "react";
import Loading from "@/components/loading";
import ListingControllers from "@/api/listing";
import { useDispatch, useSelector } from "react-redux";
import { user } from "@/redux/reducers/userDetails";
import { useRouter } from "next/router";
import { AiOutlineFilter } from "react-icons/ai";
import Whitewrapper from "@/components/whitewrapper";
import companyControllers from "@/api/companyJobs";
import { parentController } from "@/api/parent";
import { toast } from "react-toastify";
import Pagination from "@/components/pagination";
import TopInternship from "@/components/topInternship";
import Label from "@/components/label";
import SideBar from "@/components/sidebar";
import JobPost from "@/components/jobPost";
import Link from "next/link";
import { Offcanvas } from "react-bootstrap";
import Paginate from "@/components/paginate";
import Approval from "@/components/approval";
import Applicants from "@/components/applicants";
import { JOB_STATUS_COMPANY, USER_ROLES } from "@/utils/enum";
import { createArray } from "@/utils/number";
import ItemsPerPage from "@/components/itemsperpage";
import Tabs from "@/components/tabs";

const Dashboard = () => {
  const [studentdata, setStudentdata] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const [applicant, setApplicant] = useState(false);
  const [applied, setApplied] = useState([]);
  const [appliedBorder, setAppliedBorder] = useState(false);
  const [internshipe, setInternship] = useState([]);
  const [recommendedBorder, setRecommendedBorder] = useState(false);
  const [savedBorder, setSavedBorder] = useState(false);
  const [savedJob, setSavedJob] = useState([]);
  const [isApplied, setIsApplied] = useState(false);
  const [nextPage, setNextpage] = useState(false);
  const [prevPage, setPrevPage] = useState(false);
  const [status, setStatus] = useState();
  // const statusHandler = (e) => {
  //   setStatus(e.target.value);
  //   const value = {
  //     company_id: studentdata.company._id,
  //     status: e.target.value,
  //   };
  //   companyApplicantData(value);
  // };
  const [loading, setLoading] = useState(true);
  const recommendedIntern = (pageSize, page) => {
    setpageSize(pageSize);
    setPage(page);
    const value = {
      page: page,
      pageSize: pageSize,
    };
    ListingControllers.getIntenshipList(value)
      .then((res) => {
        // console.log(res);
        setTotalPages(res.data.data.totalPages);
        setRecommendedBorder(true);
        setAppliedBorder(false);
        setSavedBorder(false);
        setApplicant(false);
        setIsApplied(false);
        setInternship(res.data.data.docs);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const appliedInternships = (pageSize, page) => {
    setpageSize(pageSize);
    setPage(page);
    const value = {
      page: page,
      pageSize: pageSize,
    };
    ListingControllers.getAppliedJobs(value)
      .then((res) => {
        setApplicant(true);
        setTotalPages(res.data.data.totalPages);
        setIsApplied(true);
        setSavedBorder(false);
        setRecommendedBorder(false);
        setAppliedBorder(true);
        setApplied(res.data.data.docs);
        setLoading(false);
      })
      .catch((err) => {
        console.log("first", err);
      });
  };

  const getSavedJobs = (pageSize, page) => {
    setpageSize(pageSize);
    setPage(page);
    let value = {
      page: page,
      pageSize: pageSize,
    };
    companyControllers
      .getSavedJobs(value)
      .then((res) => {
        setTotalPages(res.data.data.totalPages);
        setSavedJob(res.data.data.docs);
        setApplicant(false);
        setIsApplied(false);
        setSavedBorder(true);
        setRecommendedBorder(false);
        setAppliedBorder(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [child, setChild] = useState([]);
  const getChild = () => {
    parentController
      .getChild()
      .then((res) => {
        setChild(res.data.data);
        setApplicantLoader(false);
      })
      .catch((err) => {
        console.log("child err", err);
      });
  };
  const [show, setShow] = useState(false);
  const [parentApproval, setParentApproval] = useState([]);
  const getParentRequest = () => {
    parentController
      .parentRequest()
      .then((res) => {
        setParentApproval(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const [loading,setLoading]=useState(true)
  const userDetails = () => {
    Authcontrollers.getuserdetails()
      .then((res) => {
        let response = res.data.data;
        recommendedIntern(pageSize, page);
        setRole(res.data.data.group);
        dispatch(user({ ...response }));
        setStudentdata(res.data.data);
        setLoading(false);
        // console.log("dfg",res.data.data);
        res.data.data.group === "STUDENT"
          ? getTopInternship()
          : res.data.data.group === "COMPANY" ||
            res.data.data.group === "COMPANY_STAFF"
          ? companyApplicantData(
              {
                companyId: res.data.data.company._id,
                status: JOB_STATUS_COMPANY.ALL,
              },
              page,
              pageSize
            )
          : res.data.data.group === "PARENT"
          ? getChild()
          : "";
        res.data.data.group === "STUDENT" ? getParentRequest() : () => {};

        res.data.data.group === "STUDENT"
          ? res.data.data.parentVerified
            ? setShow(false)
            : setShow(true)
          : "";
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const [companyApplicant, setCompanyApplicant] = useState([]);
  const [applicantLoader, setApplicantLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setpageSize] = useState(50);
  const pagePerSize = (e) => {
    e.preventDefault();
    setpageSize(e.target.value);
    appliedBorder
      ? appliedInternships(e.target.value, page)
      : savedBorder
      ? getSavedJobs(e.target.value, page)
      : recommendedIntern(e.target.value, page);
  };
  const [allBorder, setAllBorder] = useState(true);
  const [applicantBorder, setapplicantBorder] = useState(false);
  const [selectedBorder, setselectedBorder] = useState(false);
  const selectNumberOfRows = (e) => {
    setpageSize(e.target.value);
    let value = {
      companyId: studentdata.company._id,
      status: status,
    };
    companyApplicantData(value, page, e.target.value);
  };

  const [totalPages, setTotalPages] = useState("");
  const [companyApplicantPages, setCompanyApplicantPages] = useState("");
  const companyApplicantData = (value, page, pageSize) => {
    if (value.status === JOB_STATUS_COMPANY.ALL) {
      setAllBorder(true);
      setapplicantBorder(false);
      setselectedBorder(false);
    } else if (value.status === JOB_STATUS_COMPANY.APPLIED) {
      setAllBorder(false);
      setapplicantBorder(true);
      setselectedBorder(false);
    } else {
      setAllBorder(false);
      setapplicantBorder(false);
      setselectedBorder(true);
    }
    setPage(page);

    setStatus(value.status);
    let body = {
      status: value.status ? value.status : "All",
      companyId: value.companyId,
      page: page,
      pageSize: pageSize,
    };

    companyControllers
      .getApplicantListdashboard(body)
      .then((res) => {
        setCompanyApplicant(res.data.data.docs);
        setApplicantLoader(false);
        setCompanyApplicantPages(res.data.data.totalPages);
        setNextpage(res.data.data.hasNextPage);
        setPrevPage(res.data.data.hasPrevPage);
        setTotalPages(res.data.data.totalPages);
      })
      .catch((err) => {
        setApplicantLoader(false);
      });
  };
  // console.log("studentdata", stde);

  const [top, setTop] = useState([]);
  const [rating, setRating] = useState("");
  const getTopInternship = () => {
    parentController
      .getChildTopInternship()
      .then((res) => {
        setRating(res.data.data.topInternshipRating);
        setTop(res.data.data.docs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("accesstoken") == null) {
      router.push("/");
    }
  }, [page, pageSize, studentdata.parentVerified]);

  useEffect(() => {
    userDetails();
    createArray(page);
  }, [role]);
  const maxValue = 100;
  const skillsBeforeInternship = 0;
  const skillsAfterInternship = 90;
  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>

      {role === USER_ROLES.STUDENT && show && (
        <Offcanvas
          placement="top"
          show={show}
          className={styles.offcanvas__top}
        >
          <Offcanvas.Body className={styles.offcanvas_body}>
            <div>
              <h2 className="f-50">Parent Approval is Pending!</h2>
              <h3
                className="text-decoration-underline f-13 text-center pointer mt-7"
                onClick={() => {
                  router.push("/");
                  localStorage.clear();
                }}
              >
                Back to Home{" "}
              </h3>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      )}
      <div className="container">
        <div className="row">
          <div className="col-sm-3 col-md-3 col-lg-3">
            <Leftbar
              name={
                role === USER_ROLES.COMPANY || role === USER_ROLES.COMPANY_STAFF
                  ? studentdata.company.companyName
                  : studentdata.name
              }
              username={studentdata ? studentdata.username : ""}
              img={
                role === USER_ROLES.COMPANY || role === USER_ROLES.COMPANY_STAFF
                  ? studentdata.company.logo
                  : studentdata.avatar
              }
              cover={
                role === USER_ROLES.COMPANY || role === USER_ROLES.COMPANY_STAFF
                  ? studentdata.company.coverImage
                  : studentdata.coverImage
              }
              companyRepresentative={
                role === USER_ROLES.COMPANY ? studentdata.name : ""
              }
              description={
                role === USER_ROLES.COMPANY || role === USER_ROLES.COMPANY_STAFF
                  ? studentdata.company.about
                    ? `${studentdata.company.about.slice(0, 200)}...`
                    : ""
                  : studentdata.about
                  ? `${studentdata.about.slice(0, 335)}...`
                  : ""
              }
              designation={studentdata.designation}
              loading={loading}
            />
            {/* <SideBar/> */}
          </div>
          <div className="col-sm-6 col-md-5 col-lg-6">
            {role == USER_ROLES.STUDENT ? (
              loading ? (
                <Loading
                  type="bars"
                  width={30}
                  height={30}
                  className="m-auto"
                  color="#f15d17"
                />
              ) : (
                <div className="mt-5 ">
                  {parentApproval && (
                    <Approval
                      data={parentApproval}
                      parentRequest={getParentRequest}
                    />
                  )}
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 className="my-2">Top Internships</h5>
                    <Link
                      href={"/student-dashboard"}
                      className={`text-decoration-none ${styles.view}`}
                    >
                      <p className="fw-semibold  text-center f-13">View all</p>
                    </Link>
                  </div>
                  <TopInternship data={top} />
                  <div className="d-flex align-items-center justify-content-between mb-1 mt-3">
                    <ItemsPerPage onChange={pagePerSize} pageSize={pageSize} />
                    <Tabs
                      firstTab={"Recommended"}
                      firstTabActive={recommendedBorder}
                      onFirstTabClick={() => recommendedIntern(pageSize, 1)}
                      secondTab={"Applied"}
                      secondTabActive={appliedBorder}
                      onSecondTabClick={() => appliedInternships(pageSize, 1)}
                      thirdTab={"Saved"}
                      thirdTabActive={savedBorder}
                      onThirdTabClick={() => getSavedJobs(pageSize, 1)}
                    />
                  </div>

                  <JobPost
                    data={
                      applicant ? applied : savedBorder ? savedJob : internshipe
                    }
                    isApplied={isApplied}
                    recommendedIntern={
                      recommendedBorder
                        ? recommendedIntern
                        : appliedBorder
                        ? appliedInternships
                        : getSavedJobs
                    }
                    role={role}
                  />
                  <Pagination
                    total={totalPages}
                    onPageChange={
                      appliedBorder
                        ? (newPage) => appliedInternships(pageSize, newPage)
                        : savedBorder
                        ? (newPage) => getSavedJobs(pageSize, newPage)
                        : (newPage) => recommendedIntern(pageSize, newPage)
                    }
                    current={page}
                  />
                </div>
              )
            ) : applicantLoader ? (
              <Loading
                type="bars"
                width={25}
                height={25}
                className="m-auto"
                color="#f15d17"
              />
            ) : (
              <div className="mt-5">
                <div className="d-flex align-items-center justify-content-between">
                  <ItemsPerPage
                    onChange={selectNumberOfRows}
                    pageSize={pageSize}
                  />

                  <Tabs
                    firstTab={JOB_STATUS_COMPANY.ALL}
                    firstTabActive={allBorder}
                    onFirstTabClick={() =>
                      companyApplicantData(
                        {
                          status: JOB_STATUS_COMPANY.ALL,
                          companyId: studentdata.company._id,
                        },
                        page,
                        pageSize
                      )
                    }
                    secondTab={JOB_STATUS_COMPANY.APPLIED}
                    secondTabActive={applicantBorder}
                    onSecondTabClick={() =>
                      companyApplicantData(
                        {
                          status: JOB_STATUS_COMPANY.APPLIED,
                          companyId: studentdata.company._id,
                        },
                        page,
                        pageSize
                      )
                    }
                    thirdTab={JOB_STATUS_COMPANY.SELECTED}
                    thirdTabActive={selectedBorder}
                    onThirdTabClick={() =>
                      companyApplicantData(
                        {
                          status: JOB_STATUS_COMPANY.SELECTED,
                          companyId: studentdata.company._id,
                        },
                        page,
                        pageSize
                      )
                    }
                  />
                </div>
                <Applicants data={companyApplicant} />

                <Pagination
                  total={totalPages}
                  current={page}
                  onPageChange={(newPage) =>
                    companyApplicantData(
                      {
                        status: status,
                        companyId: studentdata.company._id,
                      },
                      newPage,
                      pageSize
                    )
                  }
                />
              </div>
            )}
          </div>
          <div className="col-sm-3 ">
            <Rightbar
              width={50}
              height={50}
              maxValue={maxValue}
              valueBeforeInternship={skillsBeforeInternship}
              valueAfterInternship={rating}
              rating={rating}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
