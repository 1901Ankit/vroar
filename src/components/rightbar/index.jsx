import React, { useEffect, useState } from "react";
import Whitewrapper from "../whitewrapper";
import Companyskill from "../companyskill";
import data from "@/assessts/data/data";
import styles from "./index.module.css";
import Rating from "../ratingstars";
import trophy from "../../assessts/images/dashboard/trophy_icon.svg";
import badge from "../../assessts/images/dashboard/badge_icon.svg";
import student from "../../assessts/images/homepage/06.png";
import studentchart from "../../assessts/images/homepage/07.png";
import Image from "next/image";
import Topscorer from "../topscorer";
import StudentChart from "../studentchart";
import List from "../list";
import ListingControllers from "@/api/listing";
import AnimatedExample from "../progs";
import {
  AiFillEdit,
  AiOutlineClockCircle,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineFileAdd,
} from "react-icons/ai";
import { VscEdit } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { hideModal, showModal } from "@/redux/reducers/modal";
import Label from "../label";
import Input from "../input";
import Button from "../button";
import { addJobValidation } from "@/utils/validation";
import companyControllers from "@/api/companyJobs";
import { toast } from "react-toastify";
import Loading from "../loading";
import { useRouter } from "next/router";
import Link from "next/link";
import Skills from "../skills";
import moment from "moment";
import Select from "react-select";
import { SALARY_PAY_DURATION, USER_ROLES, WORK_MODE } from "@/utils/enum";
import ReactSpeedometer from "react-d3-speedometer";
import DateSelector from "../datePicker";
import Speedometer from "../speedometer";
import Placeholder from "../placeholder-loading";
import { FaAngleRight } from "react-icons/fa";
import Progressbar from "../progressBar";
const Rightbar = (props) => {
  const dispatch = useDispatch();

  const Addjobs = () => {
    const [state, setState] = useState({
      job_title: "",
      noOfJobs: "",
      experience: "",
      qualification: "",
      job_description: "",
      location: "",
      skills: [],
      amount: "",
      currency: "$",
      from: "",
      to: "",
      isOpen: true,
      workMode: "",
      rate: SALARY_PAY_DURATION.HOUR,
    });
    let [show, setShow] = useState(false);

    const [error, setError] = useState({
      job_title: "",
      noOfJobs: "",
      experience: "",
      qualification: "",
      job_description: "",
      location: "",
      skills: "",
      amount: "",
      from: "",
      to: "",
      workMode: "",
    });
    const inputChangeHandler = (e) => {
      let { id, value } = e.target;
      setError({ ...error, [id]: "" });
      setState({ ...state, [id]: value });
    };
    const [startDate, setStartDate] = useState("");
    const startDateHandler = (e) => {
      setState({ ...state, from: moment(e).format("YYYY-MM-DD") });
      setStartDate(e);
    };
    const [toDate, setToDate] = useState("");
    const toDateHandler = (e) => {
      setState({ ...state, to: moment(e).format("YYYY-MM-DD") });
      setToDate(e);
    };

    const getSkillshandler = (e) => {
      setState({ ...state, skills: e.map((val) => val.value) });
    };

    const [loading, setLoading] = useState(false);
    const isOpenHandler = (e) => {
      setState({ ...state, isOpen: e.target.checked });
    };

    const addPost = () => {
      let body = {
        job_title: state.job_title,
        noOfJobs: state.noOfJobs,
        experience: state.experience,
        qualification: state.qualification,
        job_description: state.job_description,
        location: state.location,
        skills: JSON.stringify(state.skills),
        stipend: {
          currency: state.currency,
          amount: state.amount,
          rate: state.rate,
        },
        duration: {
          from: state.from,
          to: state.to,
        },
        isOpen: state.isOpen,
        workMode: state.workMode,
      };

      companyControllers
        .addPost(body)
        .then((res) => {
          toast.success(res.data.message);
          setLoading(false);
          dispatch(hideModal());
          getAddedJobs(company._id);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setLoading(false);
        });
    };

    const submitHandler = (e) => {
      e.preventDefault();
      setLoading(true);
      if (addJobValidation(state, setError, error)) {
        addPost();
      } else {
        setLoading(false);
      }
    };
    const colourStyles = {
      control: (styles) => ({
        ...styles,
        backgroundColor: "transparent",
        border: "1px solid #000",
        padding: "8px",
      }),
    };
    useEffect(() => {
      if (
        state.workMode === WORK_MODE.ON_SITE ||
        state.workMode === WORK_MODE.HIBRID
      ) {
        setShow(true);
      } else {
        setShow(false);
      }
    }, [state]);

    return (
      <div className="">
        <div>
          <h4 className="text-center fw-semibold mb-4">Add Internship</h4>

          <form onSubmit={submitHandler} className="form_scrollbar">
            <div className="container-fluid">
              <div className="row align-items-center mb-3">
                <div className="col-sm-6">
                  <Label className="mb-2 f-15 fw-semibold ">
                    Internship Title
                  </Label>
                  <Input
                    type="text"
                    bg="transparent"
                    padding="12px"
                    rounded="3px"
                    className="custom_input"
                    border="1px solid grey"
                    width="100%"
                    id="job_title"
                    onChange={inputChangeHandler}
                  />
                  {error.job_title && (
                    <p className="text-danger">{error.job_title}</p>
                  )}
                </div>
                {/* <div className="col-sm-1"></div> */}
                <div className="col-sm-6">
                  <Label className="mb-2 f-15 fw-semibold">
                    Vacancies Available
                  </Label>
                  <Input
                    type="number"
                    bg="transparent"
                    padding="12px"
                    rounded="3px"
                    className="custom_input"
                    border="1px solid grey"
                    width="100%"
                    onChange={inputChangeHandler}
                    id="noOfJobs"
                  />
                  {error.noOfJobs && (
                    <p className="text-danger">{error.noOfJobs}</p>
                  )}
                </div>
              </div>
              <div className="row align-items-center mb-3">
                <div className="col-sm-6">
                  <Label className="mb-2 f-15 fw-semibold ">
                    Experience(in Years)
                  </Label>
                  <Input
                    type="number"
                    bg="transparent"
                    padding="12px"
                    rounded="3px"
                    className="custom_input"
                    border="1px solid grey"
                    width="100%"
                    onChange={inputChangeHandler}
                    id="experience"
                  />
                  {error.experience && (
                    <p className="text-danger">{error.experience}</p>
                  )}
                </div>
                <div className="col-sm-6">
                  <Label className="mb-2 f-15 fw-semibold">Qualification</Label>
                  <Input
                    type="text"
                    bg="transparent"
                    padding="12px"
                    rounded="3px"
                    className="custom_input"
                    border="1px solid grey"
                    width="100%"
                    onChange={inputChangeHandler}
                    id="qualification"
                  />
                  {error.qualification && (
                    <p className="text-danger">{error.qualification}</p>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-6 ">
                  <Label className="mb-2 f-15 fw-semibold ">
                    Internship Description
                  </Label>
                  <textarea
                    className={`${styles.jobs_description}`}
                    // rows={2}
                    onChange={inputChangeHandler}
                    id="job_description"
                  />
                  {error.job_description && (
                    <p className="text-danger">{error.job_description}</p>
                  )}
                </div>
                {/* <div className="col-sm-1"></div> */}
                <div className="col-sm-6">
                  <Label className="mb-2 f-15 fw-semibold">Work Mode</Label>
                  <select
                    className={styles.workmode_Selector}
                    onChange={inputChangeHandler}
                    id="workMode"
                  >
                    <option selected hidden>
                      Select Workmode
                    </option>
                    <option value={WORK_MODE.REMOTE}>Remote</option>
                    <option value={WORK_MODE.ON_SITE}>On Site</option>
                    <option value={WORK_MODE.Hybrid}>Hybrid</option>
                  </select>
                  {error.workMode && (
                    <p className="text-danger">{error.workMode}</p>
                  )}
                  {/* <Label className="mb-2 f-15 fw-semibold">
                    Preferred Location
                  </Label>
                  <Input
                    type="text"
                    bg="transparent"
                    padding="12px"
                    rounded="3px"
                    className="custom_input"
                    border="1px solid grey"
                    width="100%"
                    onChange={inputChangeHandler}
                    id="location"
                  />
                  {error.location && (
                    <p className="text-danger">{error.location}</p>
                  )} */}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-6">
                  <Label className="mb-2 f-15 fw-semibold ">Skills</Label>
                  <Select
                    options={data.skillsOptions.map((val) => {
                      return {
                        label: val.label,
                        value: val.value,
                      };
                    })}
                    isMulti={true}
                    onChange={getSkillshandler}
                    styles={colourStyles}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    id="skills"
                  />
                  {error.skills && (
                    <p className="text-danger ">{error.skills}</p>
                  )}
                </div>
                <div className="col-sm-6">
                  <Label className="mb-2 f-15 fw-semibold">Stipend</Label>
                  <div className="d-flex align-items-center bordered">
                    <Input
                      type="number"
                      bg="transparent"
                      padding="12px"
                      rounded="3px"
                      className="custom_input"
                      border="none"
                      width="100%"
                      onChange={inputChangeHandler}
                      id="amount"
                    />
                    <select
                      className={styles.stipend_selector}
                      onChange={inputChangeHandler}
                      id="rate"
                    >
                      <option value={SALARY_PAY_DURATION.HOUR}>per Hour</option>
                      <option value={SALARY_PAY_DURATION.ANNUM}>
                        per Annum
                      </option>
                    </select>
                  </div>
                  {error.amount && (
                    <p className="text-danger ">{error.amount}</p>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-6">
                  <Label className="mb-2 f-15 fw-semibold ">
                    Starting Date
                  </Label>

                  <DateSelector
                    onChange={startDateHandler}
                    value={startDate}
                    className={styles.date_picker}
                    calendarClassName={styles.calendar_picker}
                    name="from"
                    minDate={new Date()}
                  />
                  {error.from && <p className="text-danger ">{error.from}</p>}
                </div>
                <div className="col-sm-6">
                  <Label className="mb-2 f-15 fw-semibold">End Date</Label>
                  <DateSelector
                    onChange={toDateHandler}
                    value={toDate}
                    name="to"
                    className={styles.date_picker}
                    calendarClassName={styles.calendar_picker}
                    minDate={new Date()}
                  />
                  {error.to && <p className="text-danger">{error.to}</p>}
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <input
                  type="checkbox"
                  id="isOpen"
                  className="me-2"
                  checked={state.isOpen}
                  onChange={isOpenHandler}
                />
                <Label for="isOpen">Status</Label>
              </div>
              {show ? (
                <div className="row mb-3">
                  <div className="col-sm-12">
                    <Label className="mb-2 f-15 fw-semibold">Location</Label>
                    <textarea
                      className={`${styles.jobs_description}`}
                      // rows={2}
                      onChange={inputChangeHandler}
                      id="location"
                    />
                    {error.location && (
                      <p className="text-danger">{error.location}</p>
                    )}
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div>
                <Button
                  className="custom_btn"
                  border="none"
                  width="150px"
                  padding="12px"
                  fw="600"
                >
                  {loading ? (
                    <Loading
                      type="spin"
                      width={25}
                      height={25}
                      className="m-auto"
                    />
                  ) : (
                    "  Add Internship"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };
  const router = useRouter();
  const [show, setShow] = useState(true);
  const Editjobs = ({ value }) => {
    const [skillsOptions, setSkillOptions] = useState(data.skillsOptions);
    const [defaultSkills, setDefaultskills] = useState([]);
    const [skills, setSkills] = useState(
      value.skills.map((skill) => ({ label: skill, value: skill }))
    );

    const [state, setState] = useState({
      job_title: value.title,
      noOfJobs: value.noOfJobs,
      experience: value.experience,
      qualification: value.qualification,
      job_description: value.description,
      location: value.location,
      skills: value.skills.map((skill) => skill),
      currency: value.stipend ? value.stipend.currency : "",
      amount: value.stipend ? value.stipend.amount : "",
      from: value.duration ? moment(value.duration.from).format("L") : "",
      to: value.duration ? moment(value.duration.to).format("L") : "",
      workMode: value.workMode,
      isOpen: value.status === "Open" ? true : false,
      rate: value.stipend
        ? value.stipend.rate == "annum"
          ? SALARY_PAY_DURATION.ANNUM
          : SALARY_PAY_DURATION.HOUR
        : SALARY_PAY_DURATION.HOUR,
    });

    const getSkillshandler = (e) => {
      setSkills(e);
      setState({ ...state, skills: e.map((val) => val.value) });
    };
    const statusHandler = (e) => {
      setState({ ...state, isOpen: e.target.checked });
    };
    let fromDate =
      value.duration && value.duration.from ? value.duration.from : "";
    const fromDateHandler = (e) => {
      setState({ ...state, from: moment(e).format("YYYY-MM-DD") });
      fromDate = e;
      setError("");
    };
    let toDate = value.duration && value.duration.to ? value.duration.to : "";
    const toDateHandler = (e) => {
      setState({ ...state, to: moment(e).format("YYYY-MM-DD") });
      toDate = e;
      setError("");
    };
    const [show, setShow] = useState(false);
    const inputChangeHandler = (e) => {
      let { id, value } = e.target;
      setState({ ...state, [id]: value });
    };

    const [loading, setLoading] = useState(false);
    const editJobs = () => {
      setLoading(true);
      let body = {
        title: state.job_title,
        noOfJobs: state.noOfJobs,
        location: state.location,
        qualification: state.qualification,
        description: state.job_description,
        _id: value._id,
        experience: state.experience,
        skills: JSON.stringify(state.skills),
        stipend: {
          currency: "$",
          amount: state.amount,
          rate: state.rate,
        },
        duration: {
          from: state.from,
          to: state.to,
        },
        workMode: state.workMode,
        isOpen: state.isOpen,
      };
      companyControllers
        .editJobs(body)
        .then((res) => {
          toast.success(res.data.message);
          setLoading(false);
          dispatch(hideModal());
          getAddedJobs(company._id);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setLoading(false);
        });
    };
    const [error, setError] = useState({
      job_title: "",
      noOfJobs: "",
      experience: "",
      qualification: "",
      job_description: "",
      location: "",
    });
    const submitHandler = (e) => {
      e.preventDefault();
      editJobs();
    };

    const colourStyles = {
      control: (styles) => ({
        ...styles,
        backgroundColor: "transparent",
        border: "1px solid #000",
        padding: "8px",
      }),
    };
    useEffect(() => {
      let selectedSkills = skillsOptions.filter((skill) =>
        value.skills.includes(skill.value)
      );
      let newSkilledArray = selectedSkills.map((val) => {
        return {
          value: val.value,
          label: val.label,
        };
      });
      setDefaultskills(newSkilledArray);
      if (
        state.workMode === WORK_MODE.ON_SITE ||
        state.workMode === WORK_MODE.Hybrid
      ) {
        setShow(true);
      } else {
        setShow(false);
      }
    }, [state]);
    return (
      <div className="">
        <div>
          <h4 className="text-center">Edit Internship</h4>
        </div>

        <form onSubmit={submitHandler} className="form_scrollbar">
          <div className="container-fluid">
            <div className="row align-items-center mb-3">
              <div className="col-sm-6">
                <Label className="mb-2 f-15 fw-semibold ">
                  Internship Title
                </Label>
                <Input
                  type="text"
                  bg="transparent"
                  padding="12px"
                  rounded="3px"
                  className="custom_input"
                  border="1px solid grey"
                  width="100%"
                  id="job_title"
                  onChange={inputChangeHandler}
                  value={state.job_title}
                />
                {error.job_title && <p>{error.job_title}</p>}
              </div>
              {/* <div className="col-sm-1"></div> */}
              <div className="col-sm-6">
                <Label className="mb-2 f-15 fw-semibold">Vacancies</Label>
                <Input
                  type="text"
                  bg="transparent"
                  padding="12px"
                  rounded="3px"
                  className="custom_input"
                  border="1px solid grey"
                  width="100%"
                  onChange={inputChangeHandler}
                  id="noOfJobs"
                  value={state.noOfJobs}
                />
                {error.noOfJobs && <p>{error.noOfJobs}</p>}
              </div>
            </div>
            <div className="row align-items-center mb-3">
              <div className="col-sm-6">
                <Label className="mb-2 f-15 fw-semibold ">Experience</Label>
                <Input
                  type="text"
                  bg="transparent"
                  padding="12px"
                  rounded="3px"
                  className="custom_input"
                  border="1px solid grey"
                  width="100%"
                  onChange={inputChangeHandler}
                  id="experience"
                  value={state.experience}
                />
                {error.experience && <p>{error.experience}</p>}
              </div>
              <div className="col-sm-6">
                <Label className="mb-2 f-15 fw-semibold">Qualification</Label>
                <Input
                  type="text"
                  bg="transparent"
                  padding="12px"
                  rounded="3px"
                  className="custom_input"
                  border="1px solid grey"
                  width="100%"
                  onChange={inputChangeHandler}
                  id="qualification"
                  value={state.qualification}
                />
                {error.qualification && <p>{error.qualification}</p>}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-6 ">
                <Label className="mb-2 f-15 fw-semibold ">
                  Internship Description
                </Label>
                <textarea
                  className={`${styles.jobs_description}`}
                  onChange={inputChangeHandler}
                  id="job_description"
                  value={state.job_description}
                />
                {error.job_description && <p>{error.job_description}</p>}
              </div>
              <div className="col-sm-6">
                <Label className="mb-2 f-15  fw-semibold">Work Mode</Label>
                <select
                  onChange={inputChangeHandler}
                  id="workMode"
                  value={state.workMode}
                  className={styles.workmode_Selector}
                >
                  <option selected hidden>
                    Select WorkMode
                  </option>
                  <option value={WORK_MODE.REMOTE}>REMOTE</option>
                  <option value={WORK_MODE.ON_SITE}>On Site</option>
                  <option value={WORK_MODE.Hybrid}>Hybrid</option>
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-6 ">
                <Label className="mb-2 f-15 fw-semibold ">Skills</Label>
                <Select
                  options={data.skillsOptions.map((val) => {
                    return {
                      label: val.label,
                      value: val.value,
                    };
                  })}
                  isMulti={true}
                  onChange={getSkillshandler}
                  styles={colourStyles}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  value={skills}
                  id="skills"
                />
              </div>
              <div className="col-sm-6">
                <Label className="mb-2 f-15 fw-semibold">Stipend</Label>
                <div className="d-flex align-items-center bordered">
                  <Input
                    type="number"
                    bg="transparent"
                    padding="12px"
                    rounded="3px"
                    className="custom_input"
                    border="none"
                    width="100%"
                    onChange={inputChangeHandler}
                    id="amount"
                    value={state.amount}
                  />
                  <select
                    className={styles.stipend_selector}
                    onChange={inputChangeHandler}
                    id="rate"
                    value={state.rate}
                  >
                    <option value={SALARY_PAY_DURATION.HOUR}>per Hour</option>
                    <option value={SALARY_PAY_DURATION.ANNUM}>per Annum</option>
                  </select>
                </div>
                {error.amount && <p className="text-danger ">{error.amount}</p>}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-6 ">
                <Label className="mb-2 f-15 fw-semibold ">Starting Date</Label>
                <DateSelector
                  onChange={fromDateHandler}
                  value={fromDate}
                  name="from"
                  className={styles.date_picker}
                  calendarClassName={styles.calendar_picker}
                  minDate={new Date()}
                />
              </div>
              <div className="col-sm-6">
                <Label className="mb-2 f-15 fw-semibold">End Date</Label>
                <DateSelector
                  onChange={toDateHandler}
                  value={toDate}
                  name="to"
                  className={styles.date_picker}
                  calendarClassName={styles.calendar_picker}
                  minDate={new Date()}
                />
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-start">
              <input
                type="checkbox"
                checked={state.isOpen}
                onChange={statusHandler}
                id="isOpen"
              />
              <Label className=" f-15 fw-semibold" for="isOpen">
                Status
              </Label>
            </div>
            {show ? (
              <div className="row mb-3">
                <div className="col-sm-12">
                  <Label className="mb-2 f-15 fw-semibold">Location</Label>
                  <textarea
                    className={`${styles.jobs_description}`}
                    id="location"
                    value={state.location}
                    onChange={inputChangeHandler}
                  />
                  {error.location && <p>{error.location}</p>}
                </div>
              </div>
            ) : (
              <></>
            )}
            <div>
              <Button
                className="custom_btn"
                border="none"
                width="150px"
                padding="12px"
                fw="600"
              >
                {loading ? (
                  <Loading
                    type="spin"
                    width={25}
                    height={25}
                    className="m-auto"
                    color="#000"
                  />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  const editJobsModal = (value) => {
    dispatch(showModal(<Editjobs value={value} />));
  };
  const [jobs, setJobs] = useState([]);
  let user = useSelector((state) => state);
  const company = useSelector((state) => state.userdetails.company);

  const roleName = useSelector((state) => state.userdetails.group);
  const [loading, setLoading] = useState(true);
  const getAddedJobs = (value) => {
    let body = {
      companyId: value,
    };
    companyControllers
      .getJobs(roleName == USER_ROLES.COMPANY ? body : "")
      .then((res) => {
        setJobs(res.data.data.docs);
        setLoading(true);
      })
      .catch((err) => {
        console.log("errrrrr", err);
        setLoading(false);
      });
  };
  // console.log(jobs);

  const addJobModal = () => {
    dispatch(showModal(<Addjobs />));
  };

  const achievement = [
    {
      img: trophy,
      number: 4,
    },
    {
      img: badge,
      number: 6,
    },
  ];
  const [companyList, setCompanyList] = useState([]);
  const [student, setStudent] = useState([]);
  const getCompany = () => {
    ListingControllers.getcompanyListing()
      .then((res) => {
        setCompanyList(res.data.data.docs);
        setLoading(false);
      })
      .catch((errr) => {
        console.log(errr);
        setLoading(true);
      });
  };

  const suggestiveSkills = [
    "Cloud Computing",
    "Product Management",
    "AI",
    "ML",
    "Communication",
  ];

  const getStudent = () => {
    ListingControllers.getStudentList()
      .then((res) => {
        setStudent(res.data.data.docs);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(true);
      });
  };

  useEffect(() => {
    if (router.pathname === "/edit-profile/[slug]") {
      setShow(false);
    } else {
      setShow(true);
    }
    if (
      roleName === USER_ROLES.COMPANY ||
      roleName === USER_ROLES.COMPANY_STAFF
    ) {
      getStudent();
    } else {
      getCompany();
    }
  }, [roleName, router]);
  useEffect(() => {
    getAddedJobs(
      roleName == USER_ROLES.COMPANY || roleName === USER_ROLES.COMPANY_STAFF
        ? company._id
        : ""
    );
  }, [roleName]);

  // const changePage = (value) => {
  //   router.push(`/latestinternshipdetails/${value._id}`);
  // };
  const latestInternshipdetails = (value) => {
    router.push(`/latestinternshipdetails/${value._id}`);
  };
  const jobDetail = (value) => {
    router.push(`/job-detail/${value._id}`);
  };
  const dummyFunction = () => {};

  return (
    <div className="my-5">
      {/* {roleName !== "COMPANY" &&
        (show ? (
          <Whitewrapper className="mb-5 p-2">
            <h6 className="my-3">After Taking Top 5 Internships</h6>
            <ReactSpeedometer
              maxValue={100}
              segments={10}
              needleColor="#f15d17"
              value={props.rating}
              needleTransitionDuration={3000}
              width={200}
              height={120}
              paddingHorizontal={20}
            />
            <h6>
              Career goal achieved by {props.rating}
              <span className="f-12">%</span>
            </h6>
            <p className="f-12 mt-1">Add more skills to achieve 100%</p>
          </Whitewrapper>
        ) : (
          <></>
        ))} */}
      {router.pathname === "/edit-profile/[slug]" ? (
        <></>
      ) : roleName === USER_ROLES.STUDENT ? (
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
              valueBeforeInternship={props.valueBeforeInternship}
              maxValue={props.maxValue}
              valueAfterInternship={props.valueAfterInternship}
            />
            <div className="ms-2">
              <h6 className="mb-2 ms-2">
                Career goal {props.rating}
                <span className="f-12">%</span>
              </h6>
              <div className="ms-2">
                <AnimatedExample
                  completed={props.rating}
                  maxCompleted={100}
                  height="20px"
                  bgColor="#f15d17"
                  label={`${props.rating}%`}
                />
              </div>
              {/* <Progressbar
                completed={props.rating}
                maxCompleted={100}
                bgColor="#f15d17"
                height="20px"
              /> */}
              <p className="f-12 mt-1 border-bottom ms-2">
                Add more skills to achieve 100%
              </p>
              {suggestiveSkills.length ? (
                <div>
                  <h6 className="f-12 fw-semibold ms-2">Suggested Skills</h6>
                  <div className="row">
                    {suggestiveSkills.map((val, i) => (
                      <div className="col-sm-8 f-12 ms-2" key={i}>
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
      ) : (
        <></>
      )}
      {roleName !== USER_ROLES.PARENT &&
        (roleName === USER_ROLES.COMPANY ? (
          <Whitewrapper className="mb-5 p-3">
            <div className="d-flex align-items-center justify-content-between mb-3 ms-2">
              <div className="d-flex align-items-center ">
                {/* <span class="tp-section__subtitle white-bg mb-15 text-center">
                  <i class="before-border f-12"></i>Roar With VROAR{" "}
                </span> */}
                <Button
                  className="custom_btn me-2"
                  width="15px"
                  height="15px"
                  rounded="0px"
                  // margin="5px"
                ></Button>
                <h6 className="f-15  fw-semibold">Latest Internships</h6>
              </div>
              <div className="heartbeat-container">
                <AiOutlineFileAdd
                  className="pointer icon"
                  onClick={addJobModal}
                  size={20}
                />
              </div>
            </div>
            {jobs.map((val, i) => (
              <div
                className={`${styles.latestinternship} border-bottom ms-4 my-2 mb-2`}
                key={i}
              >
                <Link
                  href={`/latestinternshipdetails/${val._id}`}
                  className={`${styles.internship_link}`}
                >
                  <p className="f-12 fw-semibold text-uppercase">{val.title}</p>
                  {val.duration && val.duration.from && val.duration.to ? (
                    <p className="f-12 fw-normal d-flex align-items-center">
                      <AiOutlineClockCircle />
                      <span className="ms-2">
                        {moment(val.duration.to).diff(
                          val.duration.from,
                          "weeks"
                        )}{" "}
                        Weeks
                      </span>
                    </p>
                  ) : (
                    <p className="f-12 d-flex align-items-center fw-normal">
                      <AiOutlineClockCircle />
                      <span className="ms-2">Not Disclosed </span>
                    </p>
                  )}
                </Link>
                <div className="d-flex align-items-center">
                  {/* <AiOutlineEye /> */}
                  <AiOutlineEdit
                    onClick={() => editJobsModal(val)}
                    className="pointer"
                  />
                </div>
              </div>
            ))}

            {/* <Link href={"/internship-listing"}>
              <p className="f-12 ms-2 fw-semibold text-orange text-decoration-underline pointer">
                View all
              </p>
            </Link> */}
          </Whitewrapper>
        ) : roleName === USER_ROLES.COMPANY_STAFF ? (
          <></>
        ) : (
          <Whitewrapper className="mb-5 p-2">
            <div className="d-flex align-items-center ms-2 ">
              <Button
                className="custom_btn me-2"
                width="15px"
                height="15px"
                rounded="0px"
                // margin="5px"
              ></Button>
              <h6>Latest Internships</h6>
            </div>
            {jobs.slice(0, 5).map((val, i) => (
              <Link href={`/job-detail/${val._id}`} className="link">
                <div className={`${styles.jobs_desc} ms-4   my-3`} key={i}>
                  {/* <img alt="" src={val.company.logo} /> */}
                  <div>
                    {/* <div className={`${styles.dot_job} mb-3 me-2`}></div> */}
                    <div className="border-bottom">
                      <p className="f-12 fw-semibold text-capitalize">
                        {val.title}
                      </p>
                      <p className="f-11">{val.company.companyName}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            <Link href={"/student-dashboard"}>
              <p className="f-12  fw-semibold text-orange text-decoration-underline pointer ms-4">
                <span>View All</span>
                <FaAngleRight />
              </p>
            </Link>
          </Whitewrapper>
        ))}

      {roleName !== USER_ROLES.PARENT &&
        (roleName === USER_ROLES.COMPANY ||
        roleName === USER_ROLES.COMPANY_STAFF ? (
          <Whitewrapper className="mb-5 p-2" height="400px" overflow="scroll">
            <div className="d-flex align-items-center ms-2">
              <Button
                className="custom_btn ms-2"
                width="15px"
                height="15px"
                rounded="0px"
              ></Button>
              <h6 className="ms-2">Suggested Candidates</h6>
            </div>
            {student.map((val, i) => (
              <div
                className={`${styles.suggested} border-bottom px-2 my-3`}
                key={i}
              >
                <img src={val.avatar} alt="" className={`${styles.dot} ms-4`} />
                <div className="ms-3">
                  <p className=" f-12 fw-semibold ">{val.name}</p>
                  <p className="f-11">{val.userName}</p>
                </div>
              </div>
            ))}
            {/* <Link href={"/intern-listing"}>
              <p className="f-12 ms-2 fw-semibold text-orange text-decoration-underline pointer">
                View all
              </p>
            </Link> */}
          </Whitewrapper>
        ) : (
          <Whitewrapper className="mb-5 p-2">
            <div className="d-flex align-items-center ms-2">
              <Button
                className="custom_btn me-2"
                width="15px"
                height="15px"
                rounded="0px"
              ></Button>
              <h6 className="">Suggested Companies</h6>
            </div>
            {companyList.slice(0, 5).map((val, i) => (
              <Link
                href={`/suggestedcompanydetails/${val._id}`}
                className="link"
              >
                <div className={`${styles.suggested}  ms-4  my-3`} key={i}>
                  <img src={val.logo} alt="" className={styles.dot} />
                  <div className="ms-2">
                    <p className=" f-12 fw-semibold ">{val.companyName}</p>
                    <p className="f-11">{val.industry}</p>
                  </div>
                </div>
              </Link>
            ))}
            {/* <Link href="/companyListing" className="link ">
              <div className={styles.border__top}>
                <p className="f-12 ms-2 fw-semibold text-orange  pointer">
                  View all
                </p>
                <FaAngleRight color="#f15d17" />
              </div>
            </Link> */}
            <Link href={"/companyListing"} className="link">
              <p className="f-12 text-orange text-decoration-underline ms-2  fw-semibold">
                <span className="ms-3">View All</span>
                <FaAngleRight />
              </p>
            </Link>
          </Whitewrapper>
        ))}
      {/* {roleName === "COMPANY" || roleName === "COMPANY_STAFF" ? (
        <></>
      ) : (
        <Whitewrapper className="mb-5">
          <Companyskill
            data={data.interestedcompanies}
            className="mb-3"
            heading="Suggested Internships"
          />
        </Whitewrapper>
      )} */}

      {roleName === USER_ROLES.COMPANY ||
      roleName === USER_ROLES.COMPANY_STAFF ? (
        <></>
      ) : (
        <Whitewrapper className="p-3 mb-5">
          <div className="d-flex align-items-center">
            <Button
              className="custom_btn me-2"
              width="15px"
              height="15px"
              rounded="0px"
            ></Button>

            <h6>Performance </h6>
          </div>
          <div className="p-3">
            <div className={`${styles.white_bg} mb-3 `}>
              <Rating value={4.5} isEditable={false} />
            </div>
            <div className="container">
              {achievement.map((val, i) => (
                <div className={`  row  align-items-center mb-4`} key={`${i}`}>
                  <div className={`col-sm-6 ${styles.white_bg}`}>
                    <Image src={val.img} />
                  </div>
                  <div className="col-sm-6">
                    <span className="ms-3 fw-bold fs-4">{val.number}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Whitewrapper>
      )}
      {roleName === USER_ROLES.COMPANY ||
      roleName === USER_ROLES.COMPANY_STAFF ? (
        <></>
      ) : (
        roleName !== USER_ROLES.PARENT && (
          <Whitewrapper className="p-3">
            <div className="d-flex align-items-center mb-3">
              <Button
                className="custom_btn me-2"
                width="15px"
                height="15px"
                rounded="0px"
              ></Button>
              <h6 className="">Top Scoreboard</h6>
            </div>
            <Topscorer data={data.topscorer} />
          </Whitewrapper>
        )
      )}
    </div>
  );
};

export default Rightbar;
