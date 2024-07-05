import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import Head from "next/head";
import { CiEdit } from "react-icons/ci";
import Label from "@/components/label";
import Button from "@/components/button";
import Input from "@/components/input";
import { toast } from "react-toastify";
import { FaArrowLeft, FaArrowRight, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { hideModal, showModal } from "@/redux/reducers/modal";
import { useRouter } from "next/router";
import { GiNotebook } from "react-icons/gi";
import Whitewrapper from "@/components/whitewrapper";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import Skills from "@/components/skills";
import url from "@/assessts/data/url";
import Interests from "@/components/interests";
import data from "@/assessts/data/data";
import Rightbar from "@/components/rightbar";
import Education from "@/components/education";
import profileControllers from "@/api/profile";
import Loading from "@/components/loading";
import {
  communityLead,
  editProfilevalidation,
  educationValidation,
  parentsprofileValidation,
  skillValidation,
  studentAddExperience,
} from "@/utils/validation";
import Speedometer from "@/components/speedometer";
import PieChart from "@/components/piechart";
import Beaker from "@/components/beaker";
import Placeholder from "@/components/placeholder-loading";
import Range from "@/components/rangeSlider";
import Select from "react-select";
import ReactSpeedometer from "react-d3-speedometer";
import accountant from "../../assessts/images/dashboard/accountant.png";
import { BsCheckLg, BsStopwatch } from "react-icons/bs";
import moment from "moment";
import Rating from "@/components/ratingstars";
import PolarChart from "@/components/polarAreaChart";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import DatePicker from "react-date-picker";
import { UsaStates } from "@/assessts/data/usState";
import { usaCities } from "@/assessts/data/city";
import { citiesZip } from "@/assessts/data/zipCode";
import Square from "@/components/square";
const EditParentProfile = () => {
  const s3url = url.s3url;
  const cover_image = `${s3url}/profile/Cover_Banner.jpg`;
  const profile_image = `${s3url}/profile/avatar.jpg`;

  const dispatch = useDispatch();
  const IntroEdit = ({ value }) => {
    const [state, setState] = useState({
      fullName: value.name,

      state: value.state ? value.state : "",
      city: value.city ? value.city : "",
      country: "",
      address1: "",
      address2: "",
      zipCode: value.zipCode ? value.zipCode : "",
    });

    const [error, setError] = useState({
      fullName: "",
      headline: "",
      state: "",
      city: "",
      country: "",
      address: "",
      skills: [],
      industry: [],
      workMode: "",
      zipCode: "",
      availabilityDays: "",
      availabilityHoursInWeek: "",
      avatar: null,
      coverImage: null,
      about: "",
    });
    const inputChangeHandler = (e) => {
      let { id, value } = e.target;
      setState({ ...state, [id]: value });
      setError({ ...error, [id]: "" });
    };

    const [prefrence, setPrefrence] = useState(
      value.locationWeight === "LOW"
        ? "0%"
        : value.locationWeight === "MEDIUM"
        ? "45%"
        : "95%"
    );

    const [usCities, setUsaCities] = useState([]);
    const stateHandler = (e) => {
      setState({ ...state, state: e.value });

      const cities = usaCities[e.value];
      setUsaCities(cities);
    };

    const cityHandler = (e) => {
      setState({
        ...state,
        city: e.value,
        zipCode:
          citiesZip[e.value] && citiesZip[e.value].zip
            ? citiesZip[e.value].zip
            : "",
      });
    };

    const [loading, setLoading] = useState(false);
    const editStudentProfile = () => {
      setLoading(true);
      let fd = new FormData();
      {
        state.fullName == "" ? "" : fd.append("fullName", state.fullName);
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
        state.city == "" ? "" : fd.append("city", state.city);
      }

      {
        state.state == "" ? "" : fd.append("state", state.state);
      }
      {
        state.country == "" ? "" : fd.append("country", state.country);
      }

      {
        state.zipCode == "" ? "" : fd.append("zipCode", state.zipCode);
      }

      let body = Object.fromEntries(fd);

      profileControllers
        .editProfile(body)
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

      editStudentProfile();
    };

    const colourstyles = {
      control: (styles) => ({
        ...styles,
        backgroundColor: "transparent",
        padding: "1px",
        border: "1px solid #000",
      }),
    };
    return (
      <div>
        <h4 className={`${styles.modalheader} my-3 fw-700 `}>
          Update Profile Details
        </h4>
        {/* <p className="text-danger my-2 f-12 fw-semibold">
          * Indicates Required
        </p> */}

        <form onSubmit={submitHandler} className={styles.scroll_form}>
          <div className="container ">
            <div className="row">
              <div className="col-sm-12">
                <div className="row mb-3">
                  <div className="col-sm-6">
                    <Label className="f-14 fw-semibold mb-3">Full Name</Label>
                    <Input
                      border="1px solid #656161"
                      className="custom_input"
                      width="100%"
                      bg="transparent"
                      padding="6px"
                      rounded="5px"
                      id="fullName"
                      onChange={inputChangeHandler}
                      value={state.fullName}
                    />
                    {error.fullName && (
                      <p className="text-danger f-12">{error.fullName}</p>
                    )}
                  </div>
                  <div className="col-sm-6">
                    <Label className="f-14 fw-semibold mb-3">State</Label>
                    <Select
                      options={UsaStates.map((val) => {
                        return {
                          value: val.name,
                          label: val.name,
                        };
                      })}
                      onChange={stateHandler}
                      styles={colourstyles}
                      id="state"
                      defaultValue={{ label: state.state, value: state.state }}
                    />

                    {error.state && (
                      <p className="text-danger f-12">{error.state}</p>
                    )}
                  </div>
                </div>

                <div className="mb-3 row">
                  <div className="col-sm-6">
                    <Label className="f-14 fw-semibold mb-3">City</Label>

                    <Select
                      options={usCities.map((val) => {
                        return {
                          value: val,
                          label: val,
                        };
                      })}
                      styles={colourstyles}
                      onChange={cityHandler}
                      id="city"
                      defaultValue={{ label: state.city, value: state.city }}
                    />
                    {error.city && (
                      <p className="text-danger f-12">{error.city}</p>
                    )}
                  </div>
                  <div className="col-sm-6">
                    <Label className="f-14 fw-semibold mb-3">Zip Code</Label>
                    <Input
                      border="1px solid #656161"
                      className="custom_input"
                      width="100%"
                      bg="transparent"
                      padding="6px"
                      rounded="5px"
                      id="zipCode"
                      onChange={inputChangeHandler}
                      value={state.zipCode}
                    />
                    {error.zipCode && (
                      <p className="text-danger f-12">{error.zipCode}</p>
                    )}
                  </div>
                </div>
                <div className="mb-3 row">
                  <div className="col-sm-6">
                    <Label className="f-14 fw-semibold mb-3">
                      Address Line 1
                    </Label>
                    <Input
                      type="text"
                      onChange={inputChangeHandler}
                      id="address1"
                      className="custom_input"
                      width="100%"
                      bg="transparent"
                      padding="6px"
                      rounded="5px"
                      value={state.address1}
                      border="1px solid #000"
                    />
                  </div>
                  <div className="col-sm-6">
                    <Label className="f-14 fw-semibold mb-3">
                      Address Line 2
                    </Label>
                    <Input
                      type="text"
                      onChange={inputChangeHandler}
                      id="address2"
                      className="custom_input"
                      width="100%"
                      bg="transparent"
                      padding="6px"
                      rounded="5px"
                      value={state.address2}
                      border="1px solid #000"
                    />
                  </div>
                </div>

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
      fullName: "",
      headline: "",
      state: "",
      city: "",
      country: "",
      address: "",
      skills: [],
      industry: [],
      workMode: "",
      zipCode: "",
      availabilityDays: "",
      from: "",
      to: "",
      availabilityHoursInWeek: "",
      avatar: null,
      coverImage: null,
      about: "",
      locationWeight: "",
    });
    const editStudentProfile = () => {
      let fd = new FormData();
      {
        state.fullName == "" ? "" : fd.append("fullName", state.fullName);
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
        state.address == "" ? "" : fd.append("address", state.address);
      }
      {
        state.city == "" ? "" : fd.append("city", state.city);
      }
      {
        state.availabilityDays == ""
          ? ""
          : fd.append("availabilityDays", state.availabilityDays);
      }
      {
        state.availabilityHoursInWeek == ""
          ? ""
          : fd.append("availabilityHoursInWeek", state.availabilityHoursInWeek);
      }
      {
        state.state == "" ? "" : fd.append("state", state.state);
      }
      {
        state.country == "" ? "" : fd.append("country", state.country);
      }
      {
        state.headline == "" ? "" : fd.append("headline", state.headline);
      }
      {
        state.skills == "" ? "" : fd.append("skills", state.skills);
      }
      {
        state.industry == ""
          ? ""
          : fd.append("industry", JSON.stringify(state.industry));
      }
      {
        state.workMode == "" ? "" : fd.append("workMode", state.workMode);
      }
      {
        state.zipCode == "" ? "" : fd.append("zipCode", state.zipCode);
      }
      {
        state.locationWeight === ""
          ? ""
          : fd.append("locationWeight", state.locationWeight);
      }
      {
        state.industry === ""
          ? ""
          : fd.append("industry", JSON.stringify(state.industry));
      }
      {
        state.to === "" ? "" : fd.append("to", state.to);
      }
      {
        state.from === "" ? "" : fd.append("from", state.from);
      }
      {
        state.workMode === "" ? "" : fd.append("workMode", state.workMode);
      }

      let body = Object.fromEntries(fd);
      profileControllers
        .editProfile(body)
        .then((res) => {
          toast.success(res.data.message);
          setLoading(false);
          getuserdetails();
          dispatch(hideModal());
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };

    const [coverpreview, setCoverpreview] = useState(null);
    const updloadcoverhandler = () => {
      const file = coverimageref.current.files[0];
      setState({ ...state, coverImage: file });
      setCoverpreview(URL.createObjectURL(file));
    };
    const [loading, setLoading] = useState(false);
    const submitHandler = (e) => {
      e.preventDefault();
      setLoading(true);
      if (state.coverImage == null) {
        toast.error("Please Select Photo");
        setLoading(false);
      } else {
        editStudentProfile();
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
              {loading ? (
                <Loading
                  type="spin"
                  width={25}
                  height={25}
                  className="m-auto"
                />
              ) : (
                "Upload"
              )}
            </Button>
          </div>
        </form>
      </div>
    );
  };

  // Add about

  const Addabout = ({ value }) => {
    const [state, setState] = useState({
      fullName: "",
      headline: "",
      state: "",
      city: "",
      country: "",
      address: "",
      skills: [],
      industry: [],
      workMode: "",
      zipCode: "",
      availabilityDays: "",
      availabilityHoursInWeek: "",
      avatar: null,
      coverImage: null,
      about: value,
      locationWeight: "",
    });
    const editStudentProfile = () => {
      let fd = new FormData();
      {
        state.fullName == "" ? "" : fd.append("fullName", state.fullName);
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
        state.address == "" ? "" : fd.append("address", state.address);
      }
      {
        state.city == "" ? "" : fd.append("city", state.city);
      }
      {
        state.availabilityDays == ""
          ? ""
          : fd.append("availabilityDays", state.availabilityDays);
      }
      {
        state.availabilityHoursInWeek == ""
          ? ""
          : fd.append("availabilityHoursInWeek", state.availabilityHoursInWeek);
      }
      {
        state.state == "" ? "" : fd.append("state", state.state);
      }
      {
        state.country == "" ? "" : fd.append("country", state.country);
      }
      {
        state.headline == "" ? "" : fd.append("headline", state.headline);
      }
      {
        state.skills == "" ? "" : fd.append("skills", state.skills);
      }
      {
        state.industry == ""
          ? ""
          : fd.append("industry", JSON.stringify(state.industry));
      }
      {
        state.workMode == "" ? "" : fd.append("workMode", state.workMode);
      }
      {
        state.zipCode == "" ? "" : fd.append("zipCode", state.zipCode);
      }
      {
        state.locationWeight === ""
          ? ""
          : fd.append("locationWeight", state.locationWeight);
      }
      {
        state.industry === ""
          ? ""
          : fd.append("industry", JSON.stringify(state.industry));
      }
      {
        state.about === "" ? "" : fd.append("about", state.about);
      }
      let body = Object.fromEntries(fd);
      profileControllers
        .editProfile(body)
        .then((res) => {
          toast.success(res.data.message);
          setLoading(false);
          getuserdetails();
          dispatch(hideModal());
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };

    const aboutHandler = (e) => {
      setState({ ...state, about: e.target.value });
    };
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const submitHandler = (e) => {
      e.preventDefault();
      setLoading(true);
      if (state.about == "") {
        setError("Please Enter About Yourself");
        setLoading(false);
      } else {
        editStudentProfile();
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
            <p className="text-danger f-12">{error}</p>
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
                    className="m-auto"
                    type="spin"
                    width={25}
                    height={25}
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
    const [state, setState] = useState({
      fullName: "",
      headline: "",
      state: "",
      city: "",
      country: "",
      address: "",
      skills: [],
      industry: [],
      workMode: "",
      zipCode: "",
      availabilityDays: "",
      availabilityHoursInWeek: "",
      avatar: null,
      coverImage: null,
      about: "",
      locationWeight: "",
    });
    const [avatarLoading, setAvatarLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const editStudentProfile = () => {
      let fd = new FormData();
      {
        state.fullName == "" ? "" : fd.append("fullName", state.fullName);
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
        state.address == "" ? "" : fd.append("address", state.address);
      }
      {
        state.city == "" ? "" : fd.append("city", state.city);
      }
      {
        state.availabilityDays == ""
          ? ""
          : fd.append("availabilityDays", state.availabilityDays);
      }
      {
        state.availabilityHoursInWeek == ""
          ? ""
          : fd.append("availabilityHoursInWeek", state.availabilityHoursInWeek);
      }
      {
        state.state == "" ? "" : fd.append("state", state.state);
      }
      {
        state.country == "" ? "" : fd.append("country", state.country);
      }
      {
        state.headline == "" ? "" : fd.append("headline", state.headline);
      }
      {
        state.skills == ""
          ? ""
          : fd.append("skills", JSON.stringify(state.skills));
      }
      {
        state.industry == ""
          ? ""
          : fd.append("industry", JSON.stringify(state.industry));
      }
      {
        state.workMode == "" ? "" : fd.append("workMode", state.workMode);
      }
      {
        state.zipCode == "" ? "" : fd.append("zipCode", state.zipCode);
      }
      {
        state.locationWeight === ""
          ? ""
          : fd.append("locationWeight", state.locationWeight);
      }
      {
        state.industry === ""
          ? ""
          : fd.append("industry", JSON.stringify(state.industry));
      }
      {
        state.to === "" ? "" : fd.append("to", state.to);
      }
      {
        state.from === "" ? "" : fd.append("from", state.from);
      }
      {
        state.availabilityHoursInWeek === ""
          ? ""
          : fd.append("availabilityHoursInWeek", state.availabilityHoursInWeek);
      }
      {
        state.workMode === "" ? "" : fd.append("workMode", state.workMode);
      }
      let body = Object.fromEntries(fd);

      profileControllers
        .editProfile(body)
        .then((res) => {
          toast.success(res.data.message);
          setAvatarLoading(false);
          getuserdetails();
          dispatch(hideModal());
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setAvatarLoading(false);
        });
    };
    const [previewprofile, setPreviewProfile] = useState(null);
    const uploadProfilehandler = () => {
      const file = profileimageref.current.files[0];
      setState({ ...state, avatar: file });
      setPreviewProfile(URL.createObjectURL(file));
    };

    const addProfileImage = (e) => {
      e.preventDefault();

      setAvatarLoading(true);

      if (state.avatar == null) {
        toast.error("Please Select Photo");
        setAvatarLoading(false);
      } else {
        editStudentProfile();
      }
    };

    return (
      <div className="my-3">
        <div>
          <div className="row">
            <div className="col-sm-10 m-auto">
              <form onSubmit={addProfileImage}>
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
                {previewprofile ? (
                  <div className="text-center mb-3">
                    <img
                      className={styles.profile__image}
                      src={previewprofile}
                    />
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
                    width="100px"
                  >
                    {avatarLoading ? (
                      <Loading
                        type="spin"
                        width={25}
                        height={25}
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
  const Addskill = ({ value }) => {
    const [skillOption, setSkillOptions] = useState(data.skillsOptions);
    const [defaultValues, setDefaultValues] = useState();
    useEffect(() => {
      let selectedSkills = value
        ? skillOption.filter((skill) => value.includes(skill.value))
        : [];
      let newSkillArray = selectedSkills.map((val) => {
        return {
          value: val.value,
          label: val.label,
        };
      });
      setDefaultValues(newSkillArray);
    }, [value]);
    const [state, setState] = useState({
      fullName: "",
      headline: "",
      state: "",
      city: "",
      country: "",
      address: "",
      skills: [],
      industry: [],
      workMode: "",
      zipCode: "",
      availabilityDays: "",
      availabilityHoursInWeek: "",
      avatar: null,
      coverImage: null,
      about: "",
    });
    const editStudentProfile = () => {
      let fd = new FormData();
      {
        state.fullName == "" ? "" : fd.append("fullName", state.fullName);
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
        state.address == "" ? "" : fd.append("address", state.address);
      }
      {
        state.city == "" ? "" : fd.append("city", state.city);
      }
      {
        state.availabilityDays == ""
          ? ""
          : fd.append("availabilityDays", state.availabilityDays);
      }
      {
        state.availabilityHoursInWeek == ""
          ? ""
          : fd.append("availabilityHoursInWeek", state.availabilityHoursInWeek);
      }
      {
        state.state == "" ? "" : fd.append("state", state.state);
      }
      {
        state.country == "" ? "" : fd.append("country", state.country);
      }
      {
        state.headline == "" ? "" : fd.append("headline", state.headline);
      }
      {
        state.skills == ""
          ? ""
          : fd.append("skills", JSON.stringify(state.skills));
      }
      {
        state.industry == ""
          ? ""
          : fd.append("industry", JSON.stringify(state.industry));
      }
      {
        state.workMode == "" ? "" : fd.append("workMode", state.workMode);
      }
      {
        state.zipCode == "" ? "" : fd.append("zipCode", state.zipCode);
      }
      {
        state.locationWeight === ""
          ? ""
          : fd.append("locationWeight", state.locationWeight);
      }
      {
        state.industry === ""
          ? ""
          : fd.append("industry", JSON.stringify(state.industry));
      }
      let body = Object.fromEntries(fd);
      profileControllers
        .editProfile(body)
        .then((res) => {
          toast.success(res.data.message);
          setLoading(false);
          getuserdetails();
          dispatch(hideModal());
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };

    const [chip, setChip] = useState([]);
    const getSkillshandler = (e) => {
      setChip(e);
      setState({ ...state, skills: e.map((val) => val.value) });
      setDefaultValues(e);
      setError("");
    };
    // const removeSkill = (value) => {
    //   console.log(state.skills.indexOf(value));
    // };
    const skillHandler = (value) => {
      const index = state.skills.indexOf(value);
      state.skills.splice(index, 1);
    };
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const submitHandler = (e) => {
      e.preventDefault();
      setLoading(true);

      if (skillValidation(state, setError)) {
        editStudentProfile();
      } else {
        toast.error("Please Enter valid data");
        setLoading(false);
      }
    };
    return (
      <div style={{ height: "60vh" }}>
        <h4 className="mb-3">Add skills to build your profile</h4>
        <p className="mb-3">you can add up to 10 skills to your profile.</p>

        <p className="text-danger f-12">{error}</p>
        <Skills
          onSelect={getSkillshandler}
          options={data.skillsOptions}
          onRemove={skillHandler}
          data={chip}
          onSubmit={submitHandler}
          isOptionDisabled={() => chip.length >= 10}
          loading={loading}
          button="Submit"
          chips
          value={defaultValues}
        />
      </div>
    );
  };
  const addSkill = (value) => {
    dispatch(showModal(<Addskill value={value.skills} />));
  };

  const addAbout = (value) => {
    dispatch(showModal(<Addabout value={value.about} />));
  };

  const editIntro = (value) => {
    dispatch(showModal(<IntroEdit value={value} />));
  };

  const [role, setRole] = useState("");
  const [userDetail, setUserDetail] = useState("");

  const [show, setShow] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [education, setEducation] = useState([]);
  const [profileImage, setProfileImage] = useState({
    avatar: `url(${profile_image})`,
    cover_image: `url(${cover_image})`,
  });
  const userRole = useSelector((state) => state.userdetails.group);
  const [userSkill, setUserSkill] = useState([]);
  const [placeholderLoading, setPlaceholderLoading] = useState(true);

  const getuserdetails = () => {
    profileControllers
      .getProfile()
      .then((res) => {
        let response = res.data.data;
        setUserDetail(res.data.data);
        setPlaceholderLoading(false);
        setRole(res.data.data.group);
        setUserSkill(res.data.data.skills);
        getSkillrating();
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const router = useRouter();

  const openUpdateImageModal = () => {
    dispatch(showModal(<Imagemodal />));
  };

  useEffect(() => {
    getuserdetails();
  }, []);
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
                      userRole == "STUDENT"
                        ? userDetail.coverImage
                        : userDetail.coverImage
                    })`,
                    height: "30vh",
                    crossOrigin: "anonymous",
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
                      src={`${
                        role === "COMPANY"
                          ? `${userDetail.company.logo}`
                          : `${userDetail.avatar}`
                      }`}
                      className={`${styles.profile_image} ms-2`}
                      alt=""
                    />
                  </div>
                </div>

                <div className="row mt-5">
                  <div className="col-sm-12 p-3 ">
                    <div className="text-end mb-2">
                      <AiOutlineEdit
                        className={`${styles.edit_profile__icon} me-3`}
                        onClick={() => editIntro(userDetail)}
                      />
                    </div>
                    <div className="mb-4">
                      <div className="row ">
                        <div className="col-sm-4 mt-3 ms-2 text-start">
                          <h4>{userDetail.name}</h4>

                          <p>{`${
                            role === "PARENT"
                              ? ""
                              : `${userDetail.state ? userDetail.state : ""}${
                                  userDetail.country ? userDetail.country : ""
                                }`
                          }`}</p>
                          {placeholderLoading ? (
                            <Placeholder />
                          ) : (
                            <div className="d-flex align-items-center">
                              {/* <span>Facebook : </span> */}
                              <p className="">
                                {userDetail.socialLink
                                  ? userDetail.socialLink.facebook
                                  : ""}
                              </p>
                            </div>
                          )}
                          {placeholderLoading ? (
                            <Placeholder />
                          ) : (
                            <div className="d-flex align-items-center">
                              {/* <span>Twitter : </span> */}
                              <p className="">
                                {userDetail.socialLink
                                  ? userDetail.socialLink.twitter
                                  : ""}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="col-sm-2"></div>
                        <div className="col-sm-1"></div>
                        <div className="col-sm-3  ">
                          {/* <CircularProgressbarWithChildren
                            value={userDetail.profileCompleteScore}
                            textColor="#f00"
                            activeStrokeColor="#cc6600"
                          >
                            <p>{`${userDetail.profileCompleteScore} % Profile`}</p>
                            <p>completed</p>
                          </CircularProgressbarWithChildren> */}
                        </div>
                      </div>
                    </div>

                    <Whitewrapper className="my-3 p-4">
                      <div className="d-flex align-items-center">
                        <Square width={20} height={20} />
                        <h5 className="mb-1 ms-2 ">Tell us about yourself</h5>
                      </div>
                      <div className="  mt-2 ms-28">
                        <p className="f-13 text-justify">{userDetail.about}</p>
                        <Button
                          border="1px solid #656161"
                          bg="transparent"
                          className="mt-3 custom_btn"
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
                    </Whitewrapper>

                    <Whitewrapper className="p-3 my-2">
                      <div className="d-flex align-items-center mb-2">
                        <Square width={20} height={20} />
                        <h5 className="ms-2">Contact Details</h5>
                      </div>

                      <div className="d-grid align-items-center  ms-28">
                        <div className="d-flex align-items-center">
                          <h6>Email Address : </h6>
                          <p className="mb-0 ms-2">{userDetail.email}</p>
                        </div>
                        <div className="d-flex align-items-center mt-2">
                          <h6>Phone no : </h6>
                          <p className="mb-0 ms-2">{userDetail.phoneNo}</p>
                        </div>
                      </div>
                    </Whitewrapper>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-sm-3">
              <Rightbar
                img={
                  role === "COMPANY"
                    ? userDetail.company.logo
                    : userDetail.avatar
                }
                width={50}
                height={50}
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditParentProfile;
