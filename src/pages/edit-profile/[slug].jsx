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
import skill from "@/assessts/images/dashboard/skill.png";
import "react-circular-progressbar/dist/styles.css";
import DatePicker from "react-date-picker";
import { UsaStates } from "@/assessts/data/usState";
import { usaCities } from "@/assessts/data/city";
import { citiesZip } from "@/assessts/data/zipCode";
import Progressbar from "@/components/progressBar";
import AnimatedExample from "@/components/progs";
const EditProfile = () => {
  const s3url = url.s3url;
  const cover_image = `${s3url}/profile/Cover_Banner.jpg`;
  const profile_image = `${s3url}/profile/avatar.jpg`;

  const dispatch = useDispatch();
  const IntroEdit = ({ value }) => {
    const [industryOptions, setIndustryOptions] = useState(data.industrytype);
    const [selectedIndustry, setSelectedIndustry] = useState();

    useEffect(() => {
      let defaultIndustry = value.industry
        ? industryOptions.filter((industry) =>
            value.industry.includes(industry.value)
          )
        : [];
      let defaultIndustryArray = defaultIndustry.map((val) => {
        return {
          value: val.value,
          label: val.name,
        };
      });
      setSelectedIndustry(defaultIndustryArray);
    }, [value]);

    const [state, setState] = useState({
      fullName: value.name,
      headline: value.headline === undefined ? "" : value.headline,
      state: value.address && value.address.state ? value.address.state : "",
      city: value.address && value.address.city ? value.address.city : "",
      country: value.country,

      skills: [],
      industry: [],
      workMode: value.workMode ? value.workMode : "",
      zipCode:
        value.address && value.address.zipCode ? value.address.zipCode : "",
      from:
        value.availability && value.availability.from
          ? moment(value.availability.from)
          : "",
      to:
        value.availability && value.availability.to
          ? moment(value.availability.to)
          : "",
      availabilityHoursInWeek: value.availabilityHoursInWeek,
      avatar: null,
      coverImage: null,
      about: "",
      locationWeight: value.locationWeight ? value.locationWeight : "",
      address1:
        value.address && value.address.address1 ? value.address.address1 : "",
      address2:
        value.address && value.address.address2 ? value.address.address2 : "",
    });

    const workMode = [
      {
        value: "on-site",
        label: "On-Site",
      },
      {
        value: "Remote",
        label: "Remote",
      },
      {
        value: "Hibrid",
        label: "Hibrid",
      },
    ];
    const [error, setError] = useState({
      fullName: "",
      headline: "",
      state: "",
      city: "",
      country: "",

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
        : value.locationWeight === "MID"
        ? "45%"
        : "95%"
    );
    const locationPreference = (range, value) => {
      setPrefrence(range);
      setState({ ...state, locationWeight: value });
    };
    const handleIndustry = (e) => {
      setState({ ...state, industry: e.map((val) => val.value) });
      setSelectedIndustry(e);
    };
    const [toDate, setToDate] = useState(
      value.availability ? value.availability.to : ""
    );
    const toDateInputHandler = (e) => {
      setState({ ...state, to: moment(e).format("YYYY-MM-DD") });
      setToDate(e);
    };
    const [fromDate, setFromDate] = useState(
      value.availability ? value.availability.from : ""
    );
    const fromDateInputHandler = (e) => {
      setState({ ...state, from: moment(e).format("YYYY-MM-DD") });
      setFromDate(e);
    };
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
      });
    };
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
        state.availabilityHoursInWeek == ""
          ? ""
          : fd.append("availabilityHoursInWeek", state.availabilityHoursInWeek);
      }
      {
        state.state == "" ? "" : fd.append("state", state.state);
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
        moment(state.to).isValid() ? fd.append("to", state.to) : "";
      }
      {
        moment(state.from).isValid() ? fd.append("from", state.from) : "";
      }
      {
        state.availabilityHoursInWeek === ""
          ? ""
          : fd.append("availabilityHoursInWeek", state.availabilityHoursInWeek);
      }
      {
        state.workMode === "" ? "" : fd.append("workMode", state.workMode);
      }
      {
        state.address1 === "" ? "" : fd.append("address1", state.address1);
      }
      {
        state.address2 === "" ? "" : fd.append("address2", state.address2);
      }

      let body = Object.fromEntries(fd);
      console.log(body);
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
      setLoading(true);

      if (editProfilevalidation(state, error, setError)) {
        editStudentProfile();
      } else {
        toast.error("Please Provide Valid Data");
        setLoading(false);
      }
    };

    const colourstyles = {
      control: (styles) => ({
        ...styles,
        backgroundColor: "transparent",
        padding: "2px",
        border: "1px solid #000",
      }),
    };
    return (
      <div>
        <h4 className={`${styles.modalheader} my-3 fw-700 `}>
          Update Profile Details
        </h4>
        <p className="text-danger my-2 f-12 fw-semibold">
          * Indicates Required
        </p>

        <form onSubmit={submitHandler} className={styles.scroll_form}>
          <div className="container ">
            <div className="row">
              <div className="col-sm-12">
                <div className="row mb-3">
                  <div className="col-sm-6">
                    <Label className="f-14 fw-semibold mb-3">Full Name*</Label>
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
                    <Label className="f-14 fw-semibold mb-3">
                      Intern Profile*
                    </Label>
                    <Input
                      border="1px solid #656161"
                      className="custom_input"
                      width="100%"
                      bg="transparent"
                      padding="6px"
                      rounded="5px"
                      id="headline"
                      onChange={inputChangeHandler}
                      value={state.headline}
                    />
                    {error.headline && (
                      <p className="text-danger f-12">{error.headline}</p>
                    )}
                  </div>
                </div>

                <div className="mb-3 row">
                  <div className="col-sm-6">
                    <Label className="f-14 fw-semibold mb-3">State*</Label>

                    <Select
                      options={UsaStates.map((val) => {
                        return {
                          value: val.name,
                          label: val.name,
                        };
                      })}
                      id="state"
                      defaultValue={{ label: state.state, value: state.state }}
                      styles={colourstyles}
                      onChange={stateHandler}
                    />
                    {error.state && (
                      <p className="text-danger f-12">{error.state}</p>
                    )}
                  </div>
                  <div className="col-sm-6">
                    <Label className="f-14 fw-semibold mb-3">City*</Label>

                    <Select
                      id="city"
                      options={usCities.map((val) => {
                        return {
                          value: val,
                          label: val,
                        };
                      })}
                      styles={colourstyles}
                      defaultValue={{ label: state.city, value: state.city }}
                      onChange={cityHandler}
                    />
                    {error.city && (
                      <p className="text-danger f-12">{error.city}</p>
                    )}
                  </div>
                </div>
                <div className="mb-3 row">
                  <div className="col-sm-6">
                    <Label className="f-14 fw-semibold mb-3 ">
                      Industry type
                    </Label>
                    <Select
                      styles={colourstyles}
                      options={data.industrytype.map((val, i) => {
                        return {
                          label: val.name,
                          value: val.value,
                        };
                      })}
                      onChange={handleIndustry}
                      isMulti={true}
                      value={selectedIndustry}
                    />
                  </div>
                  <div className="col-sm-6">
                    <Label className="f-14 fw-semibold mb-3">Zip Code*</Label>
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
                <div className="row mb-3">
                  <div className="col-sm-12">
                    <Label className="f-14 mb-3 fw-semibold">
                      Location Preference{" "}
                    </Label>
                    <Range
                      lowClick={() => locationPreference("0%", "LOW")}
                      mediumClick={() => locationPreference("45%", "MID")}
                      highClick={() => locationPreference("95%", "HIGH")}
                      left={prefrence}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-6">
                    <Label className="f-14 mb-3 fw-semibold">
                      Availability in Hrs.
                    </Label>
                    <Input
                      border="1px solid #656161"
                      className="custom_input"
                      width="100%"
                      bg="transparent"
                      padding="6px"
                      rounded="5px"
                      id="availabilityHoursInWeek"
                      onChange={inputChangeHandler}
                      value={state.availabilityHoursInWeek}
                    />
                  </div>
                  <div className="col-sm-6">
                    <Label className="f-14 fw-semibold mb-3 ">WorkMode</Label>
                    <select
                      className={styles.workMode}
                      onChange={inputChangeHandler}
                      id="workMode"
                      value={state.workMode}
                    >
                      <option selected hidden>
                        Select..
                      </option>
                      {workMode.map((val, i) => (
                        <option value={val.value} key={i}>
                          {val.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-6">
                    <Label className="f-14 mb-3 fw-semibold">From</Label>

                    <DatePicker
                      onChange={fromDateInputHandler}
                      name="from"
                      className={styles.date_picker}
                      calendarClassName={styles.dob_calendar}
                      minDate={new Date()}
                      value={fromDate}
                      format="y-MM-dd"
                    />
                  </div>
                  <div className="col-sm-6">
                    <Label className="f-14 mb-3 fw-semibold">To</Label>

                    <DatePicker
                      onChange={toDateInputHandler}
                      name="to"
                      className={styles.date_picker}
                      calendarClassName={styles.dob_calendar}
                      minDate={new Date()}
                      value={toDate}
                      format="y-MM-dd"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-6">
                    <Label className="f-14 fw-semibold mb-3">
                      Address line 1
                    </Label>

                    <Input
                      border="1px solid #656161"
                      className="custom_input"
                      width="100%"
                      bg="transparent"
                      padding="6px"
                      rounded="5px"
                      id="address1"
                      onChange={inputChangeHandler}
                      value={state.address1}
                    />
                  </div>
                  <div className="col-sm-6">
                    <Label className="f-14 fw-semibold mb-3">
                      Address line 2
                    </Label>

                    <Input
                      border="1px solid #656161"
                      className="custom_input"
                      width="100%"
                      bg="transparent"
                      padding="6px"
                      rounded="5px"
                      id="address2"
                      onChange={inputChangeHandler}
                      value={state.address2}
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
                    rounded="8px"
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

    const skillHandler = (value) => {
      console.log(value);
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
      <div style={{ height: "450px" }}>
        <h4 className="mb-3">Add skills to build your profile</h4>
        <p className="mb-3">you can add up to 10 skills to your profile.</p>

        <p className="text-danger f-12">{error}</p>
        <Skills
          onSelect={getSkillshandler}
          options={data.skillsOptions}
          onRemove={() => skillHandler(chip)}
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

  const [interest, setInterest] = useState([
    {
      companyLogo: `${s3url}/logo/Vroar_Icon.svg`,
      companyName: "Vroar",
      followers: "42,378",
      btn: "Following",
    },
    {
      companyLogo: `${s3url}/logo/Vroar_Icon.svg`,
      companyName: "Vroar",
      followers: "42,378",
      btn: "Following",
    },
  ]);

  const [border, setBorder] = useState(true);
  const [name, setName] = useState("Companies");
  const interestHandler = (value, i) => {
    setInterest(value.Query);
    if (i == 0) {
      setName("Companies");
      setBorder(true);
    } else {
      setName("Schools");
      setBorder(false);
    }
  };
  //Education///
  const Addeducation = () => {
    let [data, setData] = useState({
      institution: "",
      current: false,
      degree: "",
      description: "",
      fieldofstudy: "",
      from: "",
      grade: "",
      to: "",
    });
    const [educationError, setEducationError] = useState({
      institution: "",
      current: false,
      degree: "",
      description: "",
      fieldofstudy: "",
      from: "",
      grade: "",
      to: "",
    });
    let dispatch = useDispatch();
    const inputhandler = (e) => {
      let { id, value } = e.target;
      setData({ ...data, [id]: value });
      setEducationError({ ...educationError, [id]: "" });
    };
    const checkHandler = (e) => {
      setData({ ...data, current: e.target.checked });
      setEducationError({ ...educationError, to: "" });
    };
    const [fromDate, setFromDate] = useState("");
    const fromDateHandler = (e) => {
      setData({ ...data, from: moment(e).format("YYYY-MM-DD") });
      setFromDate(e);
    };
    const [toDate, setToDate] = useState("");
    const toDateHandler = (e) => {
      setData({ ...data, to: moment(e).format("YYYY-MM-DD") });
      setToDate(e);
    };
    const [educationLoading, setEducationLoading] = useState(false);
    const handleSubmit = (e) => {
      e.preventDefault();
      setEducationLoading(true);

      if (educationValidation(data, setEducationError, educationError)) {
        let body =
          data.current == true
            ? {
                current: data.current,
                degree: data.degree,
                description: data.description,
                fieldofstudy: data.fieldofstudy,
                from: data.from,
                grade: data.grade,
                institution: data.institution,
              }
            : {
                current: data.current,
                degree: data.degree,
                description: data.description,
                fieldofstudy: data.fieldofstudy,
                from: data.from,
                grade: data.grade,
                institution: data.institution,
                to: data.to,
              };

        profileControllers
          .addEducation(body)
          .then((res) => {
            toast.success(res.data.message);
            setEducationLoading(false);
            getuserdetails();
            dispatch(hideModal());
          })
          .catch((err) => {
            toast.error(err.response.data.message);
            setEducationLoading(false);
          });
      } else {
        setEducationLoading(false);
      }
    };
    return (
      <div>
        <div className="mb-3">
          <h5 className="border_bottom p-2 mb-2">Add Education</h5>
        </div>
        <p className="text-danger f-12">*indicates Required</p>
        <form>
          <div className="row mb-2">
            <div className="col-sm-6">
              <Label className="mb-2 fw-semibold">Institution*</Label>
              <Input
                className="custom_input"
                padding="5px"
                bg="transparent"
                border="1px solid #000"
                rounded="5px"
                id="institution"
                value={data.institution}
                onChange={inputhandler}
              />
              {educationError.institution && (
                <p className="text-danger f-12">{educationError.institution}</p>
              )}
            </div>
            <div className="col-sm-6">
              <Label className="mb-2 fw-semibold">Field of study*</Label>
              <Input
                className="custom_input"
                padding="5px"
                bg="transparent"
                border="1px solid #000"
                rounded="5px"
                id="fieldofstudy"
                value={data.fieldofstudy}
                onChange={inputhandler}
              />
              {educationError.fieldofstudy && (
                <p className="text-danger f-12">
                  {educationError.fieldofstudy}
                </p>
              )}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-6">
              <Label className="mb-2 fw-semibold">Grade</Label>
              <Input
                className="custom_input"
                padding="5px"
                bg="transparent"
                border="1px solid #000"
                rounded="5px"
                id="grade"
                value={data.grade}
                onChange={inputhandler}
              />
            </div>
            <div className="col-sm-6">
              <Label className="mb-2 fw-semibold">Degree*</Label>
              <Input
                className="custom_input"
                padding="5px"
                bg="transparent"
                border="1px solid #000"
                rounded="5px"
                id="degree"
                value={data.degree}
                onChange={inputhandler}
              />
              {educationError.degree && (
                <p className="text-danger f-12">{educationError.degree}</p>
              )}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-6">
              <Label className="mb-2 fw-semibold">Start Date*</Label>

              <DatePicker
                className={styles.date_picker}
                calendarClassName={styles.dob_calendar}
                name="from"
                onChange={fromDateHandler}
                value={fromDate}
              />
              {educationError.from && (
                <p className="text-danger f-12">{educationError.from}</p>
              )}
            </div>
            <div className="col-sm-6">
              <Label className="mb-2 fw-semibold">End Date*</Label>

              <DatePicker
                className={styles.date_picker}
                calendarClassName={styles.dob_calendar}
                onChange={toDateHandler}
                value={toDate}
                name="to"
                minDate={fromDate}
                disabled={data.current}
              />
              {educationError.to && (
                <p className="text-danger f-12">{educationError.to}</p>
              )}
            </div>
          </div>
          <div className="d-flex align-items-center  mb-2">
            <input type="checkbox" id="current" onChange={checkHandler} />
            <Label className="mb-1  ms-2 f-12" for="current">
              Currently Studying
            </Label>
          </div>
          <div className="mb-2">
            <Label className="mb-2  fw-semibold">Description</Label>
            <textarea
              className={styles.address_field}
              id="description"
              value={data.description}
              onChange={inputhandler}
            ></textarea>
          </div>
          <div className="text-center">
            <Button
              className="custom_btn"
              width="150px"
              padding="5px"
              rounded="5px"
              border="none"
              fw="500"
              onClick={handleSubmit}
            >
              {educationLoading ? (
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
        </form>
      </div>
    );
  };

  const addEducation = () => {
    dispatch(showModal(<Addeducation />));
  };
  ///// Education ends

  // Experience //

  const Experience = () => {
    const [state, setState] = useState({
      companyName: "",
      title: "",
      employmentType: "",
      from: "",
      to: "",
      skills: [],
      location: "",
      description: "",
      current: false,
    });
    const inputChangeHandler = (e) => {
      let { id, value } = e.target;
      setState({ ...state, [id]: value });
    };
    const [fromDate, setFromDate] = useState("");
    const fromDateHandler = (e) => {
      setState({ ...state, from: moment(e).format("YYYY-MM-DD") });
      setFromDate(e);
    };
    const [toDate, setToDate] = useState("");
    const toDateHandler = (e) => {
      setState({ ...state, to: moment(e).format("YYYY-MM-DD") });
      setToDate(e);
    };
    const checkHandler = (e) => {
      setState({ ...state, current: e.target.checked });
    };
    const colourStyles = {
      control: (styles) => ({
        ...styles,
        backgroundColor: "transparent",
        border: "1px solid #000",
      }),
    };
    const skillHandler = (e) => {
      setState({ ...state, skills: e.map((val) => val.value) });
    };
    const [loading, setLoading] = useState(false);
    const addStudentExperience = () => {
      setLoading(true);
      let body = state.current
        ? {
            title: state.title,
            companyName: state.companyName,
            employmentType: state.employmentType,
            from: state.from,
            skills: JSON.stringify(state.skills),
            location: state.location,
            description: state.description,
            current: state.current,
          }
        : {
            title: state.title,
            companyName: state.companyName,
            employmentType: state.employmentType,
            from: state.from,
            to: state.to,
            skills: JSON.stringify(state.skills),
            location: state.location,
            description: state.description,
            current: state.current,
          };
      profileControllers
        .addExperience(body)
        .then((res) => {
          toast.success(res.data.message);
          setLoading(false);
          dispatch(hideModal());
          getuserdetails();
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setLoading(false);
        });
    };
    const [error, setError] = useState({
      companyName: "",
      title: "",
      employmentType: "",
      from: "",
      skills: [],
      location: "",
      description: "",
    });
    const submitHandler = (e) => {
      e.preventDefault();
      if (studentAddExperience(state, setError, error)) {
        addStudentExperience();
      } else {
        toast.error("Please Enter Required Details");
      }
    };
    return (
      <div>
        <div className="border-bottom mb-2">
          <h5>Add Experience</h5>
        </div>
        <p className="f-12 text-danger fw-semibold">* Indicates Required</p>
        <form onSubmit={submitHandler}>
          <div className="row mb-3">
            <div className="col-sm-6">
              <Label className="mb-1 fw-semibold">Title*</Label>
              <Input
                type="text"
                bg="transparent"
                className="custom_input"
                border="1px solid #000"
                padding="5px"
                rounded="5px"
                id="title"
                onChange={inputChangeHandler}
              />
              {error.title && <p className="f-12 text-danger">{error.title}</p>}
            </div>
            <div className="col-sm-6">
              <Label className="mb-1 fw-semibold">Employment Type*</Label>
              <Input
                type="text"
                bg="transparent"
                className="custom_input"
                border="1px solid #000"
                padding="5px"
                rounded="5px"
                id="employmentType"
                onChange={inputChangeHandler}
              />
              {error.employmentType && (
                <p className="f-12 text-danger">{error.employmentType}</p>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-6">
              <Label className="mb-1 fw-semibold">Company Name*</Label>
              <Input
                type="text"
                bg="transparent"
                className="custom_input"
                border="1px solid #000"
                padding="5px"
                rounded="5px"
                id="companyName"
                onChange={inputChangeHandler}
              />
              {error.companyName && (
                <p className="f-12 text-danger">{error.companyName}</p>
              )}
            </div>
            <div className="col-sm-6">
              <Label className="mb-1 fw-semibold">Location*</Label>
              <Input
                type="text"
                bg="transparent"
                className="custom_input"
                border="1px solid #000"
                padding="5px"
                rounded="5px"
                id="location"
                onChange={inputChangeHandler}
              />
              {error.location && (
                <p className="f-12 text-danger">{error.location}</p>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-6">
              <Label className="mb-1 fw-semibold">Starting Date*</Label>
              {/* <Input
                type="text"
                bg="transparent"
                className="custom_input"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                border="1px solid #000"
                padding="5px"
                rounded="5px"
                onChange={inputChangeHandler}
                id="from"
              /> */}
              <DatePicker
                name="from"
                maxDate={new Date()}
                onChange={fromDateHandler}
                value={fromDate}
                className={styles.date_picker}
                calendarClassName={styles.calendarClassName}
              />
              {error.from && <p className="f-12 text-danger">{error.from}</p>}
            </div>
            <div className="col-sm-6">
              <Label className="mb-1 fw-semibold">End Date</Label>
              {/* <Input
                type="text"
                bg="transparent"
                className="custom_input"
                border="1px solid #000"
                padding="5px"
                rounded="5px"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                id="to"
                onChange={inputChangeHandler}
              /> */}
              <DatePicker
                name="from"
                maxDate={new Date()}
                onChange={toDateHandler}
                value={toDate}
                className={styles.date_picker}
                calendarClassName={styles.calendarClassName}
              />
            </div>
          </div>
          <div className="mb-3 d-flex align-items-center ">
            <input
              type="checkbox"
              className="custom_input me-2"
              onChange={checkHandler}
              id="current"
            />
            <Label for="current">Current</Label>
          </div>
          <div className="row mb-3">
            <div className="col-sm-6">
              <Label className="mb-3 fw-semibold">Description</Label>
              <textarea
                id="description"
                onChange={inputChangeHandler}
                className="textArea"
              />
            </div>
            <div className="col-sm-6">
              <Label className="mb-3 fw-semibold">Skills*</Label>
              <Select
                styles={colourStyles}
                isMulti={true}
                options={data.skillsOptions}
                id="skills"
                onChange={skillHandler}
              />
              {error.skills && (
                <p className="f-12 text-danger">{error.skills}</p>
              )}
            </div>
          </div>
          <div className="text-center">
            <Button
              className="custom_btn"
              width="100px"
              border="none"
              padding="5px"
              disabled={loading ? true : false}
            >
              {loading ? (
                <Loading
                  type="spin"
                  className="m-auto"
                  width={25}
                  height={25}
                />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </div>
    );
  };
  const addExperience = () => {
    dispatch(showModal(<Experience />));
  };

  const [rating, setRating] = useState({});
  let communitybg = [];
  const [bg1, setbg1] = useState([]);
  let skillbg = [];
  let experiencebg = [];
  const [bg2, setbg2] = useState([]);
  const [bg3, setbg3] = useState([]);
  const [skillLoading, setSkillLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [errmessage, setErrMessage] = useState(false);
  const getSkillrating = () => {
    profileControllers
      .getSkillRating()
      .then((res) => {
        res.data.data.communityRating.map((val) => {
          if (val.value === -1) {
            communitybg.push("#d7d7d7");
          } else {
            communitybg.push("blue");
          }

          setbg1(communitybg);
          return communitybg;
        });
        res.data.data.experienceRating.map((val) => {
          if (val.value === -1) {
            experiencebg.push("#d7d7d7");
          } else {
            experiencebg.push("blue");
          }
          setbg2(experiencebg);
          return experiencebg;
        });
        res.data.data.skillsRating.map((val) => {
          if (val.value === -1) {
            skillbg.push("#d7d7d7");
          } else {
            skillbg.push("pink");
          }
          setbg3(skillbg);
          return skillbg;
        });
        setErrMessage(false);
        setRating(res.data.data);
        setSkillLoading(false);
      })
      .catch((err) => {
        setErrMessage(true);
        setMessage(err.response.data.message);
        setSkillLoading(false);
        console.log(err);
      });
  };
  const EditExperience = ({ value }) => {
    const [skillsOptions, setSkillOptions] = useState(data.skillsOptions);
    const [defaultSkills, setDefaultskills] = useState([]);
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
    }, []);
    const [state, setState] = useState({
      companyName: value.companyName,
      current: value.current,
      description: value.description,
      from: moment(value.from).format("L"),
      location: value.location,
      to: value.to ? moment(value.to).format("L") : "",
      title: value.title,
      _id: value._id,
      employmentType: value.employmentType,
      skills: [],
    });
    const skillHandler = (e) => {
      setState({ ...state, skills: e.map((val) => val.value) });
      setDefaultskills(e);
    };
    const inputChangehandler = (e) => {
      let { id, value } = e.target;
      setState({ ...state, [id]: value });
    };
    const [fromDate, setFromDate] = useState(value.from ? value.from : "");
    const fromDateHandler = (e) => {
      setState({ ...state, from: moment(e).format("YYYY-MM-DD") });
      setFromDate(e);
    };
    const [toDate, setToDate] = useState(value.to ? value.to : "");
    const toDateHandler = (e) => {
      setState({ ...state, to: moment(e).format("YYYY-MM-DD") });
      setToDate(e);
    };

    const colourStyles = {
      control: (styles) => ({
        ...styles,
        border: "1px solid #000",
        backgroundColor: "transparent",
        padding: "5px",
        borderRadius: "5px",
      }),
    };
    const checkHandler = (e) => {
      setState({ ...state, current: e.target.checked });
    };
    const [loading, setLoading] = useState(false);
    const submitHandler = (e) => {
      setLoading(true);
      e.preventDefault();
      let body = state.current
        ? {
            companyName: state.companyName,
            current: state.current,
            description: state.description,
            from: state.from,
            location: state.location,
            skills: JSON.stringify(state.skills),
            title: state.title,
            _id: state._id,
            employmentType: state.employmentType,
          }
        : {
            companyName: state.companyName,
            current: state.current,
            description: state.description,
            from: state.from,
            location: state.location,
            skills: JSON.stringify(state.skills),
            title: state.title,
            _id: state._id,
            employmentType: state.employmentType,
            to: state.to,
          };

      profileControllers
        .addExperience(body)
        .then((res) => {
          toast.success(res.data.message);
          setLoading(false);
          dispatch(hideModal());
          getuserdetails();
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setLoading(false);
        });
    };
    return (
      <div>
        <div className="border-bottom">
          <h4>Edit Experience</h4>
        </div>
        <form onSubmit={submitHandler}>
          <div className="row mb-3">
            <div className="col-sm-6">
              <Label className="fw-semibold f-13 mb-2">Title</Label>
              <Input
                type="text"
                id="title"
                value={state.title}
                onChange={inputChangehandler}
                bg="transparent"
                className="custom_input"
                border="1px solid #000"
                padding="5px "
                rounded="5px"
              />
            </div>
            <div className="col-sm-6">
              <Label className="fw-semibold f-13 mb-2">Employment Type</Label>
              <Input
                type="text"
                value={state.employmentType}
                id="employmentType"
                onChange={inputChangehandler}
                bg="transparent"
                border="1px solid #000"
                padding="5px "
                rounded="5px"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-6">
              <Label className="fw-semibold f-13 mb-2">Company Name</Label>
              <Input
                type="text"
                id="companyName"
                value={state.companyName}
                onChange={inputChangehandler}
                bg="transparent"
                className="custom_input"
                border="1px solid #000"
                padding="5px "
                rounded="5px"
              />
            </div>
            <div className="col-sm-6">
              <Label className="fw-semibold f-13 mb-2">Location</Label>
              <Input
                type="text"
                value={state.location}
                id="location"
                onChange={inputChangehandler}
                bg="transparent"
                border="1px solid #000"
                padding="5px "
                rounded="5px"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-6">
              <Label className="fw-semibold f-13 mb-2">Starting Date</Label>

              <DatePicker
                name="from"
                value={fromDate}
                onChange={fromDateHandler}
                className={styles.date_picker}
                calendarClassName={styles.dob_calendar}
              />
            </div>
            <div className="col-sm-6">
              <Label className="fw-semibold f-13 mb-2">End Date</Label>

              <DatePicker
                name="to"
                className={styles.date_picker}
                calendarClassName={styles.dob_calendar}
                onChange={toDateHandler}
                value={toDate}
              />
            </div>
          </div>
          <div className="d-flex align-items-center">
            <input
              id="current"
              checked={state.current}
              type="checkbox"
              className="me-2"
              onChange={checkHandler}
            />
            <Label className="fw-semibold f-13 ">Current</Label>
          </div>
          <div className="row mb-3">
            <div className="col-sm-12">
              <Label className="fw-semibold f-13 mb-2">Skills</Label>

              <Select
                options={data.skillsOptions}
                styles={colourStyles}
                onChange={skillHandler}
                value={defaultSkills}
                isMulti={true}
              />
            </div>
          </div>
          <div className="mb-3 text-center">
            <Button
              className="custom_btn"
              padding="5px"
              rounded="5px"
              border="none"
              width="150px"
              disabled={loading ? true : false}
            >
              {loading ? (
                <Loading
                  type="spin"
                  className="m-auto"
                  width={25}
                  height={25}
                />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </div>
    );
  };

  const editExperience = (value) => {
    dispatch(showModal(<EditExperience value={value} />));
  };

  const navigateToAnother = (value) => {
    router.push(
      {
        pathname: "/details/education",
        query: value,
      },
      `/details/education`
    );
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
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
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
                        onClick={addProfileImage}
                      />
                    </div>
                    {placeholderLoading ? (
                      <Placeholder
                        circle={true}
                        className="ms-2"
                        width={150}
                        height={150}
                      />
                    ) : (
                      <img
                        src={`${
                          role === "COMPANY"
                            ? `${userDetail.company.logo}`
                            : `${userDetail.avatar}`
                        }`}
                        className={`${styles.profile_image} ms-2`}
                        alt=""
                      />
                    )}
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
                      <div className="row  ">
                        <div className="col-sm-4 mt-3 ms-28 text-start">
                          {placeholderLoading ? (
                            <Placeholder />
                          ) : (
                            <h4>{`${
                              role === "COMPANY"
                                ? `${
                                    userDetail.company.companyName == ""
                                      ? "No Data"
                                      : userDetail.company.companyName
                                  }`
                                : `${userDetail.name}`
                            }`}</h4>
                          )}
                          <p>{`${
                            role === "PARENT"
                              ? ""
                              : `${
                                  userDetail.headline ? userDetail.headline : ""
                                }`
                          }`}</p>
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
                        <div className="col-sm-3">
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
                      <div className="my-5 ">
                        {/* <Progressbar
                          maxCompleted={100}
                          labelAlignment="outside"
                          completed={userDetail.profileCompleteScore}
                          labelColor="#f15d17"
                          bgColor="#f15d17"
                          height={20}
                        /> */}
                        <AnimatedExample
                          completed={userDetail.profileCompleteScore}
                          label={`${userDetail.profileCompleteScore}%`}
                        />
                      </div>
                    </div>
                    {role === "PARENT" ? (
                      <></>
                    ) : (
                      <Whitewrapper className="mb-4  p-3  border">
                        <div className="d-flex ">
                          <Button
                            className="custom_btn"
                            width={20}
                            height={20}
                            rounded="0px"
                          ></Button>
                          <h5 className="ms-1">
                            Roadmap to Career Fulfillment
                          </h5>
                        </div>
                        <div className="row align-items-center">
                          <div className="col-sm-6 border__right ">
                            <div className="d-flex align-items-center justify-content-center   ">
                              <ReactSpeedometer
                                value={500}
                                maxValue={1000}
                                height={180}
                                // paddingVertical={200}
                              />
                            </div>
                            <p className="f-12 text-justify mt-2">
                              Elevate your career meter! Add skills, apply for
                              internships, and pursue continuous learning to
                              supercharge your career potential. Upgrade your
                              path, unlock new opportunities, and embrace
                              challenges today, fostering exponential growth in
                              your professional journey.
                            </p>
                          </div>
                          {/* <div className="col-sm-2 border_vertical"></div> */}
                          <div className="col-sm-6">
                            {skillLoading ? (
                              <Loading
                                type="spin"
                                className="m-auto"
                                color="#f15d17"
                              />
                            ) : (
                              <PolarChart />
                            )}
                          </div>
                        </div>
                      </Whitewrapper>
                    )}
                    <Whitewrapper className="mb-4 p-3">
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
                        <Placeholder count={2} className="ms-28" />
                      ) : (
                        <div className=" mt-2 ms-28 ">
                          <p className="f-13 text-justify">
                            {userDetail.about}
                          </p>
                        </div>
                      )}
                      <Button
                        border="1px solid #656161"
                        className="mt-3 custom_btn ms-28"
                        padding="5px"
                        rounded="8px"
                        fs="12px"
                        width="100px"
                        fw="normal"
                        onClick={() => addAbout(userDetail)}
                      >
                        Update details
                      </Button>
                    </Whitewrapper>
                    {role == "PARENT" ? (
                      <></>
                    ) : (
                      <Whitewrapper className="p-3 mb-4">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div className="d-flex align-items-center">
                            <Button
                              className="custom_btn"
                              width={20}
                              height={20}
                              rounded="0px"
                            ></Button>
                            <h5 className="ms-2">Add Skills</h5>
                          </div>
                          <div className="text-end">
                            <AiOutlineEdit
                              className={styles.edit_profile__icon}
                              onClick={() => addSkill(userDetail)}
                            />
                          </div>
                        </div>
                        <div className={` ms-28`}>
                          <div className="row">
                            {userSkill && userSkill.length
                              ? userSkill.map((val, i) => (
                                  <div className="col-sm-4 mb-3 ">
                                    <div className="d-flex align-items-center ">
                                      <div
                                        className={`${styles.skills_dot} me-2`}
                                      ></div>
                                      <p className="mb-0 ms-1 f-12" key={i}>
                                        {val}
                                      </p>
                                    </div>
                                  </div>
                                ))
                              : ""}
                          </div>
                          {/* {userSkill.length
                            ? userSkill.map((val, i) => (
                                <div className="d-flex align-items-center">
                                  <img src={skill.src} />
                                  <p className="f-13 mb-1" key={i}>
                                    {val}
                                  </p>
                                </div>
                              ))
                            : "Add Your Skill"} */}
                        </div>
                      </Whitewrapper>
                    )}
                    {role != "COMPANY" && (
                      <Whitewrapper className="p-3 mb-4">
                        <div className="mb-2 d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <Button
                              className="custom_btn"
                              width={20}
                              height={20}
                              rounded="0px"
                            ></Button>
                            <h5 className="ms-2">Education</h5>
                          </div>

                          {show ? (
                            <div className="d-flex align-items-center ">
                              <AiOutlinePlus
                                className={`${styles.edit_profile__icon} me-3`}
                                onClick={addEducation}
                              />

                              <AiOutlineEdit
                                className={styles.edit_profile__icon}
                                onClick={navigateToAnother}
                              />
                            </div>
                          ) : (
                            <AiOutlinePlus
                              className={`${styles.edit_profile__icon} me-3`}
                              onClick={addEducation}
                            />
                          )}
                        </div>

                        <Education data={education} />
                        {viewAll ? (
                          <div className="text-center">
                            <Button
                              border="none"
                              bg="transparent"
                              onClick={() => navigateToAnother(data.education)}
                            >
                              View All <FaArrowRight />
                            </Button>
                          </div>
                        ) : (
                          ""
                        )}
                      </Whitewrapper>
                    )}

                    <Whitewrapper className="p-3 my-2">
                      <div className="d-flex align-items-center">
                        <Button
                          className="custom_btn"
                          width={20}
                          height={20}
                          rounded="0px"
                        ></Button>
                        <h5 className="ms-2">Contact Details</h5>
                      </div>
                      {placeholderLoading ? (
                        <Placeholder count={3} />
                      ) : (
                        <div className="d-grid align-items-center  ms-28 ">
                          <div className="d-flex align-items-center my-1">
                            <h6>Email Address : </h6>
                            <p className="mb-0 ms-2 f-13">{userDetail.email}</p>
                          </div>
                          {userDetail.phoneNo && (
                            <div className="d-flex align-items-center my-1">
                              <h6>Phone no : </h6>
                              <p className="mb-0 ms-2 f-13">
                                {userDetail.phoneNo}
                              </p>
                            </div>
                          )}

                          {userDetail &&
                          userDetail.address &&
                          userDetail.address.address1 &&
                          userDetail.address.address2 ? (
                            <div className="d-flex align-items-center my-1">
                              <h6>Address : </h6>
                              <p className="mb-0 ms-2 f-13">
                                {userDetail.address.address1}
                                {userDetail.address.address2}
                              </p>
                            </div>
                          ) : (
                            ""
                          )}

                          {userDetail &&
                          userDetail.address &&
                          userDetail.address.state ? (
                            <div className="d-flex align-items-center">
                              <h6>State :</h6>
                              <p className="f-13 ms-1">
                                {userDetail.address.state}
                              </p>
                            </div>
                          ) : (
                            ""
                          )}
                          {userDetail &&
                          userDetail.address &&
                          userDetail.address.city ? (
                            <div className="d-flex align-items-center">
                              <h6>City :</h6>
                              <p className="f-13 ms-1">
                                {userDetail.address.city}
                              </p>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      )}
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

export default EditProfile;
