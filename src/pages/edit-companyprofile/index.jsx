import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import Head from "next/head";
import { CiEdit } from "react-icons/ci";
import Label from "@/components/label";
import Button from "@/components/button";
import Input from "@/components/input";
import Authcontrollers from "@/api/auth";
import verifyControllers from "@/api/verify";
import { toast } from "react-toastify";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { hideModal, showModal } from "@/redux/reducers/modal";
import { useRouter } from "next/router";
import { GiConsoleController, GiNotebook } from "react-icons/gi";
import userDetails, { user } from "@/redux/reducers/userDetails";
import Whitewrapper from "@/components/whitewrapper";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import Progressbar from "@/components/progressBar";
import Skills from "@/components/skills";
import url from "@/assessts/data/url";
import Interests from "@/components/interests";
import data from "@/assessts/data/data";
import Rightbar from "@/components/rightbar";
import Aos from "aos";
import Education from "@/components/education";
import profileControllers from "@/api/profile";
import Company from "../company";
import Selectbar from "@/components/selectbar";
import moment from "moment";
import Placeholder from "@/components/placeholder-loading";
import Loading from "@/components/loading";
import ListingControllers from "@/api/listing";
import CompanyStaff from "@/components/company_staff";
import Select from "react-select";
import DateSelector from "@/components/datePicker";
import AnimatedExample from "@/components/progs";
import Square from "@/components/square";
const CompanyProfile = () => {
  const s3url = url.s3url;
  const cover_image = `${s3url}/profile/Cover_Banner.jpg`;
  const profile_image = `${s3url}/profile/avatar.jpg`;
  const dispatch = useDispatch();

  const IntroEdit = ({ value }) => {
    console.log(value);
    const [state, setState] = useState({
      companyName: value.company.companyName,
      companyPhoneNo: value.company.companyPhoneNo,
      companyEmail: value.company.companyEmail,
      website: value.company.website,
      startedDate: moment(value.company.startedDate).format("L"),
      companyType: value.company.companyType,
      teamSize: value.company.teamSize,
      industry: value.company.industry,
      tagLine: value.company.tagLine,
    });

    const inputChangeHandler = (e) => {
      let { id, value } = e.target;
      setState({ ...state, [id]: value });
    };
    const [startDate, setStartDate] = useState(
      value.company ? value.company.startedDate : ""
    );

    const startedDateHandler = (e) => {
      setState({ ...state, startedDate: moment(e).format("YYYY-MM-DD") });
      setStartDate(e);
    };

    const teamselectchangehandler = (e) => {
      let { value } = e;
      setState({ ...state, teamSize: value });
    };
    const companytypechangehandler = (e) => {
      let { value } = e;
      setState({ ...state, companyType: value });
    };

    const industrychangehandler = (e) => {
      let { value } = e;
      setState({ ...state, industry: value });
    };
    const [loading, setLoading] = useState(false);
    let CompanyProfile = () => {
      setLoading(true);
      let fd = new FormData();
      {
        state.companyName == ""
          ? ""
          : fd.append("companyName", state.companyName);
      }
      {
        state.avatar == null ? "" : fd.append("avatar", state.avatar);
      }
      {
        state.coverImage == null
          ? ""
          : fd.append("coverImage", state.coverImage);
      }
      {
        state.companyPhoneNo == ""
          ? ""
          : fd.append("companyPhoneNo", state.companyPhoneNo);
      }
      {
        state.companyEmail == ""
          ? ""
          : fd.append("companyEmail", state.companyEmail);
      }
      {
        state.website == "" ? "" : fd.append("website", state.website);
      }
      {
        state.startedDate == ""
          ? ""
          : fd.append("startedDate", state.startedDate);
      }
      {
        state.companyType == ""
          ? ""
          : fd.append("companyType", state.companyType);
      }
      {
        state.teamSize == "" ? "" : fd.append("teamSize", state.teamSize);
      }
      {
        state.industry == "" ? "" : fd.append("industry", state.industry);
      }
      {
        state.tagLine == ""
          ? ""
          : fd.append("tagLine", JSON.stringify(state.tagLine));
      }

      let body = Object.fromEntries(fd);

      profileControllers
        .getCompanyProfile(body)
        .then((res) => {
          toast.success(res.data.message);
          setLoading(false);
          getuserdetails();
          dispatch(hideModal());
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setLoading(false);
        });
    };

    const submitHandler = (e) => {
      e.preventDefault();
      CompanyProfile();
    };

    return (
      <div>
        <h4 className={`${styles.modalheader} my-3 fw-700 `}>
          Update Profile Details
        </h4>
        <p className="text-danger my-2 f-12 fw-semibold">
          * Indicates Required
        </p>
        <form onSubmit={submitHandler} className="form_scrollbar">
          <div className="container ">
            <div className="row">
              <div className="col-sm-12">
                <div className="row mb-3">
                  <div className="col-sm-6">
                    <Label className="f-14 fw-semibold mb-3">
                      Company Name*
                    </Label>
                    <Input
                      border="1px solid #656161"
                      className="custom_input"
                      width="100%"
                      bg="transparent"
                      padding="6px"
                      rounded="5px"
                      id="companyName"
                      onChange={inputChangeHandler}
                      value={state.companyName}
                    />
                  </div>
                  <div className="col-sm-6">
                    <Label className="f-14 fw-semibold mb-3">
                      Company PhoneNumber*
                    </Label>
                    <Input
                      border="1px solid #656161"
                      className="custom_input"
                      width="100%"
                      type="number"
                      bg="transparent"
                      padding="6px"
                      rounded="5px"
                      id="companyPhoneNo"
                      onChange={inputChangeHandler}
                      value={state.companyPhoneNo}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-6">
                    <Label className="f-14 fw-semibold mb-3">
                      Company Email*
                    </Label>
                    <Input
                      border="1px solid #656161"
                      className="custom_input"
                      width="100%"
                      bg="transparent"
                      padding="6px"
                      rounded="5px"
                      id="companyEmail"
                      onChange={inputChangeHandler}
                      value={state.companyEmail}
                    />
                  </div>
                  <div className="col-sm-6">
                    <Label className="f-14 fw-semibold mb-3">Industry*</Label>
                    <Selectbar
                      data={data.industrytype}
                      border="1px solid grey"
                      padding="8px"
                      id="industry"
                      onChange={industrychangehandler}
                      placeholder={state.industry}
                    />
                    {/* <Label className="f-14 fw-semibold mb-3">Website*</Label>
                    <Input
                      border="1px solid #656161"
                      className="custom_input"
                      width="100%"
                      bg="transparent"
                      padding="6px"
                      rounded="5px"
                      onChange={inputChangeHandler}
                      id="website"
                      value={state.website}
                    /> */}
                  </div>
                </div>

                {/* <div className="mb-3 row">
                  <div className="col-sm-6">
                    <Label className="f-14 fw-semibold mb-3">Start Date*</Label>

                    <DateSelector
                      value={startDate}
                      onChange={startedDateHandler}
                      name="startedDate"
                      className={styles.date__picker}
                    />
                  </div>
                  <div className="col-sm-6">
                    <Label className="f-14 fw-semibold mb-3">
                      Company Type*
                    </Label>
                    <Selectbar
                      data={data.companyttype}
                      padding="8px"
                      border="1px solid grey"
                      id="companyType"
                      onChange={companytypechangehandler}
                      placeholder={state.companyType}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <div className="col-sm-6">
                    <Label color="#656161" fw="600" className="mb-3">
                      Team Size*
                    </Label>
                    <Selectbar
                      data={data.teamsize}
                      border="1px solid grey"
                      padding="8px"
                      id="teamSize"
                      onChange={teamselectchangehandler}
                      placeholder={state.teamSize}
                    />
                  </div>
                  <div className="col-sm-6">
                    <Label className="f-14 fw-semibold mb-3">Industry*</Label>
                    <Selectbar
                      data={data.industrytype}
                      border="1px solid grey"
                      padding="8px"
                      id="industry"
                      onChange={industrychangehandler}
                      placeholder={state.industry}
                    />
                  </div>
                </div> */}
                {/* <div className="mb-3 row">
                  <div className="col-sm-6">
                    <Label className="f-14 fw-semibold mb-3">Tag Line*</Label>
                    <Input
                      border="1px solid #656161"
                      className="custom_input"
                      width="100%"
                      bg="transparent"
                      padding="6px"
                      rounded="5px"
                      onChange={inputChangeHandler}
                      id="tagLine"
                      value={state.tagLine}
                    />
                  </div>
                </div> */}
                <div className="mb-3 text-center">
                  <Button
                    className="custom_btn"
                    border="none"
                    width="150px"
                    padding="6px"
                    fw="500"
                  >
                    {loading ? (
                      <Loading
                        type="spin"
                        width="25px"
                        height="25px"
                        className="m-auto"
                      />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  };

  // Cover Image modal
  const coverimageref = useRef();
  const Imagemodal = () => {
    const [state, setState] = useState({
      companyName: "",
      companyPhoneNo: "",
      companyEmail: "",
      website: "",
      startedDate: "",
      companyType: "",
      teamSize: "",
      industry: "",
      tagLine: "",
      companyLogo: null,
      companyCoverImage: null,
      about: "",
    });

    const [coverpreview, setCoverpreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const updloadcoverhandler = () => {
      const file = coverimageref.current.files[0];
      setState({ ...state, companyCoverImage: file });
      setCoverpreview(URL.createObjectURL(file));
    };

    let CompanyProfile = () => {
      let fd = new FormData();
      {
        state.companyName === ""
          ? ""
          : fd.append("companyName", state.companyName);
      }
      {
        state.companyPhoneNo === ""
          ? ""
          : fd.append("companyPhoneNo", state.companyPhoneNo);
      }
      {
        state.companyEmail === ""
          ? ""
          : fd.append("companyEmail", state.companyEmail);
      }
      {
        state.website === "" ? "" : fd.append("website", state.website);
      }
      {
        state.startedDate === ""
          ? ""
          : fd.append("startedDate", state.startedDate);
      }
      {
        state.companyType === ""
          ? ""
          : fd.append("companyType", state.companyType);
      }
      {
        state.teamSize === "" ? "" : fd.append("teamSize", state.teamSize);
      }
      {
        state.industry === "" ? "" : fd.append("industry", state.industry);
      }
      {
        state.companyLogo === null
          ? ""
          : fd.append("companyLogo", state.companyLogo);
      }
      {
        state.companyCoverImage === null
          ? ""
          : fd.append("companyCoverImage", state.companyCoverImage);
      }
      {
        state.tagLine === ""
          ? ""
          : fd.append("tagLine", JSON.stringify(state.tagLine));
      }
      {
        state.about === "" ? "" : fd.append("about", state.about);
      }

      let body = Object.fromEntries(fd);

      profileControllers
        .getCompanyProfile(body)
        .then((res) => {
          toast.success(res.data.message);
          dispatch(hideModal());
          getuserdetails();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // console.log("file after fn", file);

    const submitHandler = (e) => {
      e.preventDefault();
      if (state.companyCoverImage == null) {
        toast.error("Please select Company Cover Photo");
        setLoading(false);
      } else {
        CompanyProfile();
      }
    };
    return (
      <div className="my-3">
        <form onSubmit={submitHandler}>
          <div className="d-flex align-items-center justify-content-center">
            <input
              type="file"
              style={{ display: "none" }}
              ref={coverimageref}
              onChange={updloadcoverhandler}
            />
            <div className="row">
              <div className="col-sm-9 m-auto">
                <div className="d-flex align-items-center">
                  <h6>
                    Add a picture that showcases your personality, interests, or
                    achievements.{" "}
                    <span
                      className="pointer text-underline ms-1"
                      onClick={() => coverimageref.current.click()}
                    >
                      Select Photo.
                    </span>
                    {/* <br />
                    <p className="text-center">or</p>
                    <br />
                    <span>Drag and Drop your Cover Image Here..</span> */}
                  </h6>
                </div>

                {coverpreview ? (
                  <img
                    src={coverpreview}
                    alt=""
                    className="m-auto mt-4"
                    width={"100%"}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="text-center">
            <Button
              className="custom_btn shadow mt-4"
              padding="5px"
              rounded="5px"
              border="none"
              fw="500"
              width="150px"
            >
              Upload
            </Button>
          </div>
        </form>
      </div>
    );
  };

  // Add about

  const Addabout = ({ value }) => {
    const [state, setState] = useState({
      companyName: "",
      companyPhoneNo: "",
      companyEmail: "",
      website: "",
      startedDate: "",
      companyType: "",
      teamSize: "",
      industry: "",
      tagLine: "",
      companyLogo: null,
      companyCoverImage: null,
      about: value.company.about,
    });

    const aboutHandler = (e) => {
      setState({ ...state, about: e.target.value });
    };
    const [loading, setLoading] = useState(false);
    let companyProfile = () => {
      setLoading(true);
      let fd = new FormData();
      {
        state.companyName === ""
          ? ""
          : fd.append("companyName", state.companyName);
      }
      {
        state.companyPhoneNo === ""
          ? ""
          : fd.append("companyPhoneNo", state.companyPhoneNo);
      }
      {
        state.companyEmail === ""
          ? ""
          : fd.append("companyEmail", state.companyEmail);
      }
      {
        state.website === "" ? "" : fd.append("website", state.website);
      }
      {
        state.startedDate === ""
          ? ""
          : fd.append("startedDate", state.startedDate);
      }
      {
        state.companyType === ""
          ? ""
          : fd.append("companyType", state.companyType);
      }
      {
        state.teamSize === "" ? "" : fd.append("teamSize", state.teamSize);
      }
      {
        state.industry === "" ? "" : fd.append("industry", state.industry);
      }
      {
        state.companyLogo === null
          ? ""
          : fd.append("companyLogo", state.companyLogo);
      }
      {
        state.companyCoverImage === null
          ? ""
          : fd.append("companyCoverImage", state.companyCoverImage);
      }
      {
        state.tagLine === ""
          ? ""
          : fd.append("tagLine", JSON.stringify(state.tagLine));
      }
      {
        state.about === "" ? "" : fd.append("about", state.about);
      }

      let body = Object.fromEntries(fd);

      profileControllers
        .getCompanyProfile(body)
        .then((res) => {
          toast.success(res.data.message);
          setLoading(false);
          dispatch(hideModal());
          getuserdetails();
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data.message);
        });
    };

    const submitHandler = (e) => {
      e.preventDefault();
      if (state.about === "") {
        toast.error("Please Enter About Yourself");
      } else {
        companyProfile();
      }
    };
    return (
      <div>
        <form onSubmit={submitHandler}>
          <div>
            <h1 className="mb-3 f-25">Tell us who you are?</h1>
            <textarea
              className={`${styles.address_field}`}
              rows={10}
              cols={100}
              onChange={aboutHandler}
              id="about"
              value={state.about}
            />
            <div className="text-end">
              <Button
                className="custom_btn shadow"
                padding="8px"
                rounded="5px"
                border="none"
                width="150px"
              >
                {loading ? (
                  <Loading
                    type="spin"
                    width={25}
                    height={25}
                    className="m-auto"
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

  const AddProfile = () => {
    const profileimageref = useRef();
    const [loading, setLoading] = useState(false);

    const [companyLogo, setCompanyLogo] = useState(null);
    const [state, setState] = useState({
      companyName: "",
      companyPhoneNo: "",
      companyEmail: "",
      website: "",
      startedDate: "",
      companyType: "",
      teamSize: "",
      industry: "",
      tagLine: "",
      companyLogo: null,
      companyCoverImage: null,
    });

    const uploadProfilehandler = () => {
      const file = profileimageref.current.files[0];
      setState({ ...state, companyLogo: file });
      setCompanyLogo(URL.createObjectURL(file));
    };

    let CompanyProfile = () => {
      setLoading(true);
      let fd = new FormData();
      {
        state.companyName == ""
          ? ""
          : fd.append("companyName", state.companyName);
      }
      {
        state.companyPhoneNo == ""
          ? ""
          : fd.append("companyPhoneNo", state.companyPhoneNo);
      }
      {
        state.companyEmail == ""
          ? ""
          : fd.append("companyEmail", state.companyEmail);
      }
      {
        state.website == "" ? "" : fd.append("website", state.website);
      }
      {
        state.startedDate == ""
          ? ""
          : fd.append("startedDate", state.startedDate);
      }
      {
        state.companyType == ""
          ? ""
          : fd.append("companyType", state.companyType);
      }
      {
        state.teamSize == "" ? "" : fd.append("teamSize", state.teamSize);
      }
      {
        state.industry == "" ? "" : fd.append("industry", state.industry);
      }
      {
        state.companyLogo == null
          ? ""
          : fd.append("companyLogo", state.companyLogo);
      }
      {
        state.companyCoverImage == null
          ? ""
          : fd.append("companyCoverImage", state.companyCoverImage);
      }
      {
        state.tagLine == ""
          ? ""
          : fd.append("tagLine", JSON.stringify(state.tagLine));
      }

      let body = Object.fromEntries(fd);

      profileControllers
        .getCompanyProfile(body)
        .then((res) => {
          toast.success(res.data.message);
          getuserdetails();
          dispatch(hideModal());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };

    const submitHandler = (e) => {
      e.preventDefault();
      if (state.companyLogo == null) {
        toast.error("Please Select A Company Logo");
      } else {
        CompanyProfile();
      }
    };
    return (
      <div className="my-3">
        <div>
          <div className="row">
            <div className="col-sm-10 m-auto">
              <form onSubmit={submitHandler}>
                <h6 className="mb-3">
                  Add your picture and let everyone know who you are.
                  <span
                    className="text-underline pointer ms-1"
                    onClick={() => profileimageref.current.click()}
                  >
                    Select Photo
                  </span>
                </h6>
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="profile_image"
                  ref={profileimageref}
                  onChange={uploadProfilehandler}
                />
                {companyLogo ? (
                  <div className="text-center mb-3">
                    <img className={styles.profile__image} src={companyLogo} />
                  </div>
                ) : (
                  ""
                )}
                <div className="text-center">
                  <Button
                    className="custom_btn mt-3"
                    border="none"
                    rounded="5px"
                    fw="500"
                    padding="5px"
                    width={"150px"}
                  >
                    {loading ? (
                      <Loading
                        type={"spin"}
                        width="25px"
                        height="25px"
                        className="m-auto"
                      />
                    ) : (
                      "Upload"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const addProfileImage = () => {
    dispatch(showModal(<AddProfile />));
  };

  const Addskill = () => {
    const options = [
      {
        value: "HTML",
        label: "HTML",
      },
      {
        value: "CSS",
        label: "CSS",
      },
      {
        value: "JAVA",
        label: "JAVA",
      },
      {
        value: "JAVASCRIPT",
        label: "JAVASCRIPT",
      },
      {
        value: "NODE JS",
        label: "NODE JS",
      },
      {
        value: "REACT JS",
        label: "REACT JS",
      },
      {
        value: "ANGULAR",
        label: "ANGULAR",
      },
      {
        value: "VUE JS",
        label: "VUE JS",
      },
      {
        value: "GO LANG",
        label: "GO LANG",
      },
      {
        value: "REACT NATIVE",
        label: "REACT NATIVE",
      },
      {
        value: "FLUTTER",
        label: "FLUTTER",
      },
    ];
    const [skills, setSkills] = useState([]);
    const getSkillshandler = (e) => {
      setSkills(e);
    };

    const skillHandler = (value) => {
      const index = skills.indexOf(value);
      skills.splice(index, 1);
      setSkills([...skills]);
    };

    const submitHandler = () => {
      dispatch(hideModal());
    };

    return (
      <div style={{ height: "40vh" }}>
        <h4 className="mb-3">Add skills to build your profile</h4>
        <p className="mb-3">you can add up to 10 skills to your profile.</p>
        <Skills
          onSelect={getSkillshandler}
          options={options}
          onRemove={skillHandler}
          data={skills}
          onSubmit={submitHandler}
          isOptionDisabled={() => skills.length >= 10}
        />
      </div>
    );
  };

  const addSkill = () => {
    dispatch(showModal(<Addskill />));
  };

  const Addjobs = () => {
    const submitHandler = () => {
      dispatch(hideModal());
    };
    return (
      <div style={{ height: "40vh" }}>
        <h4 className="mb-3">Add jobs to build your profile</h4>
        <p className="mb-3">you can add up to 10 jobs to your profile.</p>
        <Skills
          onSelect={getjobshandler}
          options={options}
          onRemove={jobHandler}
          data={jobs}
          onSubmit={submitHandler}
          isOptionDisabled={() => jobs.length >= 10}
        />
      </div>
    );
  };
  const addJob = () => {
    dispatch(showModal(<Addjobs />));
  };
  const addAbout = (val) => {
    dispatch(showModal(<Addabout value={val} />));
  };

  const editIntro = (value) => {
    dispatch(showModal(<IntroEdit value={value} />));
  };
  // const user = useSelector((state) => state);
  // console.log(user);

  const [role, setRole] = useState("");
  const [userDetail, setUserDetail] = useState("");
  const [verify, setVerify] = useState(false);
  const [verifyemail, setVerifyEmail] = useState(false);
  const [show, setShow] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [education, setEducation] = useState([]);
  const [profileImage, setProfileImage] = useState({
    avatar: `url(${profile_image})`,
    cover_image: `url(${cover_image})`,
  });
  const [placeholderLoading, setPlaceholderLoading] = useState(true);
  const [companyStaff, setCompanyStaff] = useState([]);
  const getCompanyStaff = (value) => {
    ListingControllers.getCompanyStaff(value)
      .then((res) => {
        setCompanyStaff(res.data.data.docs);
      })
      .catch((err) => {
        console.log("dfghjkl", err);
      });
  };
  const getuserdetails = () => {
    profileControllers
      .getProfile()
      .then((res) => {
        let response = res.data.data;
        setPlaceholderLoading(false);
        dispatch(user({ ...response }));
        setUserDetail(res.data.data);
        setRole(res.data.data.roleName);
        getCompanyStaff(res.data.data.company._id);
        res.data.data && res.data.data.roleName == "COMPANY"
          ? setProfileImage({
              avatar: response.company.logo,
              cover_image: response.company.coverImage,
            })
          : setProfileImage({
              avatar: response.avatar,
              cover_image: response.coverImage,
            });

        let education = res.data.data.education ? res.data.data.education : [];
        education.length > 0 ? setShow(true) : setShow(false);
        if (education.length >= 3) {
          setEducation(education.slice(0, 3));
          setViewAll(true);
        } else {
          setViewAll(false);
          setEducation(education);
        }

        res.data.data.phoneNo ? setVerify(false) : setVerify(true);
        res.data.data.email ? setVerifyEmail(false) : setVerifyEmail(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [error, setError] = useState({
    fullName: "",
    emailId: "",
    address: "",
    phoneNo: "",
    birthDate: "",
    password: "",
    mobile: "",
    username: "",

    countryCode: "+91",
  });

  const submithandler = (e) => {
    e.preventDefault();
    let fd = new FormData();
    fd.append("fullName", state.fullName);
    fd.append("userName", state.username);
    {
      role == "COMPANY"
        ? fd.append("companyEmail", state.companyEmail)
        : fd.append("birthDate", state.birthDate);
    }
    fd.append("email", state.emailId);
    fd.append("phoneNo", state.phoneNo);
    fd.append("avatar", state.avatar);
    fd.append("coverImage", state.coverImage);
    let body = Object.fromEntries(fd);
    verifyControllers
      .addmember(body)
      .then((res) => {})
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const router = useRouter();

  const openUpdateImageModal = () => {
    dispatch(showModal(<Imagemodal />));
  };

  const AddStaff = () => {
    const salutation = [
      {
        value: "MR",
        label: "Mr",
      },
      {
        value: "MRS",
        label: "Mrs",
      },
      {
        value: "MS",
        label: "Ms",
      },
    ];
    const [state, setState] = useState({
      salutation: "",
      fullName: "",
      email: "",
      salutation: "",
      roleId: "",
    });
    const inputChangeHandler = (e) => {
      let { id, value } = e.target;
      setState({ ...state, [id]: value });
    };
    const roleHandler = (e) => {
      setState({ ...state, roleId: e.value });
    };
    const [loading, setLoading] = useState(false);
    const AddStaffMember = () => {
      setLoading(true);
      let body = {
        salutation: state.salutation,
        fullName: state.fullName,
        roleId: state.roleId,
        email: state.email,
      };
      Authcontrollers.addchild(body)
        .then((res) => {
          toast.success(res.data.message);
          setLoading(false);
          dispatch(hideModal());
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    };
    const submitHandler = (e) => {
      e.preventDefault();
      AddStaffMember();
    };
    const [staff, setStaff] = useState([]);
    const getStaffRole = () => {
      verifyControllers
        .getStaff()
        .then((res) => {
          setStaff(res.data.data.docs);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const colourStyles = {
      control: (styles) => ({
        ...styles,
        border: "1px solid #000",
        background: "transparent",

        borderRadius: "5px",
      }),
    };
    useEffect(() => {
      getStaffRole();
    }, []);
    return (
      <div className="container">
        <div className="border__bottom">Add Staff Memebers</div>
        <form onSubmit={submitHandler} className="form_scrollbar">
          <div className="row mb-3">
            <div className="col-sm-6">
              <Label className="fw-se mibold f-13 mb-2">Full Name*</Label>
              <div className="d-flex align-items-center bordered">
                <select
                  id="salutation"
                  onChange={inputChangeHandler}
                  className={styles.salutation_selector}
                >
                  <option selected hidden>
                    Select
                  </option>
                  {salutation.map((val, i) => (
                    <option value={val.value} key={i}>
                      {val.label}
                    </option>
                  ))}
                </select>
                <Input
                  type="text"
                  bg="transparent"
                  id="fullName"
                  padding="5px"
                  rounded="5px"
                  border="none"
                  className="custom_input"
                  onChange={inputChangeHandler}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <Label className="fw-semibold f-13 mb-2">Email*</Label>
              <Input
                type="email"
                bg="transparent"
                padding="5px"
                rounded="5px"
                border="1px solid #000"
                id="email"
                className="custom_input"
                onChange={inputChangeHandler}
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-6">
              <Label className="fw-semibold f-13 mb-2">Designation</Label>
              <Select
                options={staff.map((val) => {
                  return {
                    value: val.roleId,
                    label: val.roleName,
                  };
                })}
                onChange={roleHandler}
                styles={colourStyles}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
            <div className="col-sm-6"></div>
          </div>
          <div className="text-center mb-3">
            <Button
              className="custom_btn"
              padding="5px"
              border="none"
              width="150px"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  };
  const addStaff = () => {
    dispatch(showModal(<AddStaff />));
  };
  useEffect(() => {
    getuserdetails();
    if (!localStorage.getItem("accesstoken")) {
      router.push("/");
    }

    if (localStorage.getItem("group") !== "COMPANY") {
      router.push("/");
    }
  }, []);

  const navigateToAnother = (value) => {
    router.push(
      {
        pathname: "/details/education",
        query: value,
      },
      `/details/education`
    );
  };
  return (
    <div>
      <div>
        <Head>
          <title>Profile</title>
        </Head>
        {/* <div className="container">
          <div className="text-start pointer">
            <FaArrowLeft onClick={() => router.back()} size={20} />
          </div>
        </div> */}
        <div className="container">
          <div className="row">
            <div className="col-sm-9 px-3">
              <div
                className={`${styles.wrapper_update_profile} mt-5 container p-0`}
              >
                <div
                  style={{
                    backgroundImage: `url(${
                      role == "COMPANY"
                        ? userDetail.company.coverImage
                        : profileImage.cover_image
                    })`,

                    height: "30vh",
                    crossOrigin: "anonymous",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="text-end">
                    <CiEdit
                      color="#656161"
                      className={`pointer ${styles.edit_btn}`}
                      size={25}
                      onClick={openUpdateImageModal}
                    />
                  </div>
                  <div className={`${styles.overflow__hidden}`}>
                    <div className={`${styles.edit_profile_image}`}>
                      <CiEdit
                        size={25}
                        className={`pointer ${styles.edit_profile_icon}`}
                        color="grey"
                        onClick={addProfileImage}
                      />
                    </div>
                    <img
                      src={userDetail.company ? userDetail.company.logo : null}
                      className={`${styles.profile_image}`}
                      alt=""
                    />
                  </div>
                </div>

                <div className="row mt-5">
                  <div className="col-sm-12 p-3 ">
                    <div className={"text-end mb-2"}>
                      <AiOutlineEdit
                        className={`${styles.edit_profile__icon} me-3`}
                        onClick={() => editIntro(userDetail)}
                      />
                    </div>
                    <div className="mb-4">
                      <div className="row">
                        <div
                          className={`col-sm-3 mt-3 m-auto ${
                            placeholderLoading ? "" : "text-center"
                          } `}
                        >
                          {placeholderLoading ? (
                            <Placeholder />
                          ) : (
                            <h4 className="text-capitalize">
                              {userDetail.company.companyName}
                            </h4>
                          )}
                          {placeholderLoading ? (
                            <Placeholder />
                          ) : (
                            <p>{userDetail.company.industry}</p>
                          )}

                          {/* {placeholderLoading ? (
                            <Placeholder />
                          ) : userDetail.company.website ? (
                            <p>{userDetail.company.website}</p>
                          ) : (
                            ""
                          )} */}
                        </div>
                      </div>
                    </div>
                    <div className="mt-5">
                      {/* <div className="d-flex align-items-center mb-2">
                        <Button
                          className="custom_btn"
                          width={20}
                          height={20}
                          rounded="0px"
                        ></Button>
                        <h6 className="ms-2">Complete your Profile</h6>
                      </div> */}

                      {/* <Progressbar
                        bgColor="#f57d51"
                        labelColor="#000"
                        labelAlignment="outside"
                        maxCompleted={"100"}
                        completed={userDetail.profileCompleteScore}
                        height="10px"
                      /> */}
                      <AnimatedExample
                        completed={userDetail.profileCompleteScore}
                        label={`${userDetail.profileCompleteScore} %`}
                      />
                    </div>
                    <Whitewrapper className="mb-4 my-4 p-3 ">
                      <div className="d-flex align-items-center">
                        <Button
                          className="custom_btn"
                          width={20}
                          height={20}
                          rounded="0px"
                        ></Button>
                        <h5 className="mb-0 ms-2 ">Tell us about yourself</h5>
                      </div>
                      {placeholderLoading ? (
                        <Placeholder />
                      ) : (
                        <div className="ms-28">
                          <p className=" f-12 my-2 text-justify">
                            {userDetail.company.about}
                          </p>
                          <Button
                            border="1px solid #656161"
                            bg="transparent"
                            className="custom_btn"
                            padding="5px"
                            rounded="8px"
                            fs="12px"
                            width="100px"
                            fw="normal"
                            onClick={() => addAbout(userDetail)}
                          >
                            Update details
                          </Button>
                        </div>
                      )}
                    </Whitewrapper>
                    <Whitewrapper className="p-3 my-4">
                      <div className="border__bottom d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <Button
                            className="custom_btn"
                            width={20}
                            height={20}
                            rounded="0px"
                          ></Button>
                          <h5 className="mb-0 ms-2 ">Company Staff</h5>
                        </div>
                        <div className={styles.addIcon} onClick={addStaff}>
                          <AiOutlinePlus />
                        </div>
                      </div>

                      <div>
                        <CompanyStaff data={companyStaff} />
                      </div>
                    </Whitewrapper>

                    <Whitewrapper className="p-3 my-2">
                      <div className="d-flex align-items-center mb-2">
                        <Square width={20} height={20} />
                        <h5 className="ms-2">Contact Details</h5>
                        {/* <div className={styles.addIcon}>
                          <AiOutlineEdit />
                        </div> */}
                      </div>
                      {placeholderLoading ? (
                        <Placeholder count={2} />
                      ) : (
                        <div className="d-grid align-items-center  ms-28">
                          <div className="d-flex align-items-center">
                            <h6>Email Address : </h6>
                            <p className="mb-0 ms-2 f-12">{userDetail.email}</p>
                          </div>
                          <div className="d-flex align-items-center mt-2">
                            <h6>Phone no : </h6>
                            <p className="mb-0 ms-2 f-12">
                              {userDetail.company.companyPhoneNo}
                            </p>
                          </div>
                          {userDetail && userDetail.address ? (
                            <div className="d-flex align-items-center mt-2">
                              <h6>Address : </h6>
                              <p className="mb-0 ms-2">
                                <span className="f-12">
                                  {userDetail &&
                                  userDetail.company &&
                                  userDetail.company.address
                                    ? userDetail.company.address.address1
                                    : ""}
                                  ,
                                  {userDetail &&
                                  userDetail.company &&
                                  userDetail.company.address
                                    ? userDetail.company.address.address2
                                    : ""}
                                </span>
                              </p>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      )}

                      {/* <div className="text-center align-items-center">
                        <span className="pointer">
                          <p className="py-2 mb-0">
                            Show All {`${name}`} <FaArrowRight />
                          </p>
                        </span>
          
          
          </div> */}
                    </Whitewrapper>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <Rightbar
                img={
                  role === "COMPANY"
                    ? userDetail.company.logo
                    : userDetail.avatar
                }
                width={50}
                height={50}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
