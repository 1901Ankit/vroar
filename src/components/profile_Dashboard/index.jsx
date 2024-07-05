import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import Whitewrapper from "../whitewrapper";
import student from "../../assessts/images/profile/avatar.jpg";
import parents from "../../assessts/images/profile/Parents.jpg";
import companies from "../../assessts/images/profile/Company.jpg";
import { useRouter } from "next/router";
import Button from "../button";
import user from "@/assessts/images/profile/user.png";
import cover from "../../assessts/images/profile/Cover_Banner.jpg";
import Label from "../label";
import twitter from "@/assessts/images/profile/twitter.svg";
import Input from "../input";
import { AiFillFacebook, AiOutlineTwitter, AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import Authcontrollers from "@/api/auth";
import ReactCardFlip from "react-card-flip";
import data from "@/assessts/data/data";
import Selectbar from "../selectbar";
import { companyvalidation, studentvalidation } from "@/utils/validation";
import Loading from "../loading";
import { isEmail, isPhonenumber } from "@/utils/number";
import verifyControllers from "@/api/verify";
import ReactFlagsSelect from "react-flags-select";
import countryFlag from "@/assessts/data/countryFlag";
import countries from "@/assessts/data/country";
import countryData from "../../assessts/data/countries.json";
import moment from "moment";
import DatePicker from "react-date-picker";
import Select from "react-select";
import { UsaStates } from "@/assessts/data/usState";
import { usaCities } from "@/assessts/data/city";
import { USER_ROLES } from "@/utils/enum";
const Profiledashboard = (props) => {
  const Inputref = useRef();
  const coverinput = useRef();
  let [show, setShow] = useState(false);
  const router = useRouter();
  const role = router.query.slug;
  const pathname = router.pathname;
  useEffect(() => {
    if (router.pathname === "/createProfile/[slug]") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [router]);
  let initialState = {
    fullname: "",
    username: "",
    password: "",
    dob: "",
    email: "",
    mobile: "",
    salutation: "",
    avatar: null,
    cover: null,
    companyName: "",
    website: "",
    companyPhoneNo: "",
    companyEmail: "",
    companyType: "",
    teamSize: "",
    industry: "",
    tagLine: "",
    startedDate: "",
    facebook: "",
    twitter: "",
    state: "",
    city: "",
    zipCode: "",
    address1: "",
    address2: "",
    parentEmail: "",
    designation: "",
  };
  const [createprofile, setCreateprofile] = useState(initialState);
  const [avatarimage, setAvatarimage] = useState();
  const hadnleupload = () => {
    const file = Inputref.current.files[0];
    setCreateprofile({ ...createprofile, avatar: file });
    setAvatarimage(file ? URL.createObjectURL(file) : "");
  };
  const [coveravatar, setCoveravatar] = useState();
  const handlecoverphoto = () => {
    const coverphoto = coverinput.current.files[0];
    setCreateprofile({ ...createprofile, cover: coverphoto });
    setCoveravatar(URL.createObjectURL(coverphoto));
  };

  const [error, setError] = useState(false);
  const [formerr, setFormerr] = useState({
    fullname: "",
    username: "",
    password: "",
    dob: "",
    email: "",
    mobile: "",
    salutation: "",
    avatar: null,
    cover: null,
    companyName: "",
    website: "",
    companyPhoneNo: "",
    companyEmail: "",
    companyType: "",
    teamSize: "",
    industry: "",
    tagLine: "",
    startedDate: "",
    zipCode: "",
    state: "",
    city: "",
    parentEmail: "",
    designation: "",
  });
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const startLoading = () => {
    setLoading(true);
    setDisable(true);
  };
  const [usCities, setUsaCities] = useState([]);
  const stateHandler = (e) => {
    setCreateprofile({ ...createprofile, state: e.value });
    const cities = usaCities[e.value];
    setUsaCities(cities);
  };

  const cityHandler = (e) => {
    setCreateprofile({
      ...createprofile,
      city: e.value,
    });
  };

  const closeLoading = () => {
    setLoading(false);
    setDisable(false);
  };
  const [country, setCountry] = useState(false);
  const [selected, setSelected] = useState("US");
  const [dialcode, setDialCode] = useState("+1");
  const selectedCountry = (value) => {
    setSelected(value);
    const dialCode = countryData.find((country) => country.code == value);
    if (dialCode) {
      setDialCode(dialCode.dial_code);
    } else {
      console.log("no such country Found");
    }
  };
  const [ageVerification, setAgeVerification] = useState(true);
  const createprofileinputhandler = (e) => {
    let { id, value } = e.target;
    setCreateprofile({ ...createprofile, [id]: value });
    setError("");
    if (value == "") {
      setCountry(false);
    } else if (isPhonenumber(value)) {
      setCountry(true);
    } else {
      setCountry(false);
    }

    setFormerr({
      ...formerr,
      [id]:
        id === "email"
          ? isEmail(value)
            ? ""
            : "Please Enter Valid Email"
          : id === "mobile"
          ? isPhonenumber(value)
            ? ""
            : "Please Provide Valid Phone Number"
          : id === "companyEmail"
          ? isEmail(value)
            ? ""
            : "Please provide valid email"
          : id === "companyPhoneNo"
          ? isPhonenumber(value)
            ? ""
            : "Please Provide valid Phone Number"
          : id === "parentEmail"
          ? isEmail(value)
            ? setAgeVerification(false)
            : setAgeVerification(true)
          : "",
    });
  };

  const [emailLoading, setEmailLoading] = useState(false);
  const [emailotp, setEmailOtp] = useState("");
  const [emailOtpInput, setEmailOtpInput] = useState(false);
  const emailVerification = () => {
    setEmailLoading(true);
    const body = {
      email: createprofile.email,
    };
    verifyControllers
      .getEmailVerification(body)
      .then((res) => {
        toast.success(res.data.message);
        localStorage.setItem("referenceid", res.data.data.referenceId);
        setEmailOtpInput(true);
        setEmailLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setEmailLoading(false);
        setEmailOtpInput(false);
      });
  };
  const [age, setAge] = useState(true);
  const [date, setDate] = useState("");
  const dateChangeHandler = (e) => {
    setCreateprofile({ ...createprofile, dob: moment(e).format("YYYY-MM-DD") });
    setDate(e);
    setError("");
    setAge(moment().diff(moment(e), "years") > 14);
  };

  const startedDatehandler = (e) => {
    setCreateprofile({
      ...createprofile,
      startedDate: moment(e).format("YYYY-MM-DD"),
    });
    setOpeningDate(e);
  };

  const updateprofile = () => {
    const fd = new FormData();
    let socialLinks = {
      facebook: createprofile.facebook,
      twitter: createprofile.twitter,
    };
    let socialLink = JSON.stringify(socialLinks);
    fd.append("salutation", createprofile.salutation);
    fd.append("fullName", createprofile.fullname);
    fd.append("userRole", role);
    fd.append("userName", createprofile.username);
    fd.append("phoneNo", createprofile.mobile);
    fd.append("email", createprofile.email);
    fd.append("password", createprofile.password);
    role === USER_ROLES.STUDENT
      ? fd.append("birthDate", createprofile.dob)
      : "";

    fd.append("socialLink", socialLink);
    createprofile.avatar === null
      ? ""
      : fd.append("avatar", createprofile.avatar);
    createprofile.cover === null
      ? ""
      : fd.append("coverImage", createprofile.cover);
    role === USER_ROLES.STUDENT
      ? fd.append("parentEmail", createprofile.parentEmail)
      : "";

    const body = Object.fromEntries(fd);
    Authcontrollers.createprofile(body)
      .then((res) => {
        toast.success(res.data.message);
        router.push(
          ` ${
            role === USER_ROLES.PARENT
              ? "/parent-dashboard"
              : `/dashboard/${role}`
          }  `
        );
        localStorage.clear();
        localStorage.setItem("accesstoken", res.data.data.accessToken);
        localStorage.setItem("refreshtoken", res.data.data.refreshToken);
        localStorage.setItem("group", role);
        closeLoading();
      })
      .catch((err) => {
        let errmessage = err.response.data.message;
        toast.error(errmessage);
        setLoading(false);
        setDisable(false);
      });
  };
  const teamselectchangehandler = (e) => {
    let { value } = e;
    setCreateprofile({ ...createprofile, teamSize: value });
    setFormerr({ ...formerr, teamSize: "" });
  };

  const companytypechangehandler = (e) => {
    let { value } = e;
    setCreateprofile({ ...createprofile, companyType: value });
    setFormerr({ ...formerr, companyType: "" });
  };
  const industrychangehandler = (e) => {
    let { value } = e;
    setCreateprofile({ ...createprofile, industry: value });
    setFormerr({ ...formerr, industry: "" });
  };
  const [openingDate, setOpeningDate] = useState("");

  const updateCompanyprofile = () => {
    let fd = new FormData();
    let socialLinks = {
      twitter: createprofile.twitter,
      facebook: createprofile.facebook,
    };
    const social_links = JSON.stringify(socialLinks);
    fd.append("fullName", createprofile.fullname);
    fd.append("salutation", createprofile.salutation);
    fd.append("userRole", role);
    fd.append("email", createprofile.email);
    fd.append("phoneNo", createprofile.mobile);
    fd.append("password", createprofile.password);
    fd.append("companyName", createprofile.companyName);
    fd.append("companyPhoneNo", createprofile.mobile);
    fd.append("companyEmail", createprofile.email);
    fd.append("industry", createprofile.industry);
    fd.append("address1", createprofile.address1);
    fd.append("address2", createprofile.address2);
    fd.append("state", createprofile.state);
    fd.append("city", createprofile.city);
    fd.append("zipCode", createprofile.zipCode);
    fd.append("designation", createprofile.designation);
    createprofile.avatar === null
      ? ""
      : fd.append("companyLogo", createprofile.avatar);

    createprofile.cover === null
      ? ""
      : fd.append("companyCoverImage", createprofile.cover);

    let body = Object.fromEntries(fd);

    Authcontrollers.updatecompanyprofile(body)
      .then((res) => {
        localStorage.setItem("accesstoken", res.data.data.accessToken);
        localStorage.setItem("refreshtoken", res.data.data.refreshToken);
        localStorage.setItem("group", role);
        toast.success(res.data.message);
        router.push(
          {
            pathname: `/dashboard/${role}`,
          },
          `/dashboard/${role}`
        );
        closeLoading();
      })
      .catch((err) => {
        let errmessage = err.message && err.response.data.message;
        toast.error(errmessage);
        closeLoading();
      });
  };
  const emailOtpVerification = () => {
    setEmailLoading(true);
    let body = {
      otp: emailotp,
      referenceId: localStorage.getItem("referenceid"),
    };
    verifyControllers
      .getEmailOtpVerification(body)
      .then((res) => {
        toast.success(res.data.message);
        localStorage.setItem("accesstoken", res.data.data.accessToken);
        setEmailOtpInput(false);
        getUserdetails();
        setEmailLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setEmailLoading(false);
      });
  };

  const [verify, setVerify] = useState(false);
  const [emailVerify, setEmailVerify] = useState(false);
  const [mobileDisabled, setMobileDisabled] = useState(false);
  const [emaildisabled, setEmailDisabled] = useState(false);
  const mobiledisableHandler = () => {
    setMobileDisabled(true);
    setVerify(false);
  };
  const mobileenableHandler = () => {
    setMobileDisabled(false);
    setVerify(true);
  };
  const emaildisabledHandler = () => {
    setEmailDisabled(true);
    setEmailVerify(false);
  };
  const emailenableHandler = () => {
    setEmailDisabled(false);
    setEmailVerify(true);
  };
  const getUserdetails = () => {
    Authcontrollers.getProfileUserDetails(router.query.slug)
      .then((res) => {
        {
          res.data.data
            ? setCreateprofile({
                ...createprofile,
                email: res.data.data.email,
                fullname: res.data.data.name ? res.data.data.name : "",
                mobile: res.data.data.phoneNo ? res.data.data.phoneNo : "",
              })
            : "";
        }
        // setAvatarimage(res.data.data.avatar);
        setCoveravatar(res.data.data.coverImage);
        {
          res.data.data.phoneNo
            ? mobiledisableHandler()
            : mobileenableHandler();
        }
        {
          res.data.data.email ? emaildisabledHandler() : emailenableHandler();
        }
      })
      .catch((err) => {});
  };
  const createsubmithandler = (e) => {
    e.preventDefault();
    startLoading();
    if (role === USER_ROLES.COMPANY) {
      if (companyvalidation(createprofile, formerr, setFormerr, closeLoading)) {
        updateCompanyprofile();
      }
    } else {
      if (
        studentvalidation(
          createprofile,
          closeLoading,
          formerr,
          setFormerr,
          age,
          role
        )
      ) {
        updateprofile();
      } else {
        closeLoading();
      }
    }
  };

  // Phone number verify
  const [otpInput, setOtpINput] = useState(false);
  const [getotploading, setGetotploading] = useState(false);
  const VerifyPhone = () => {
    setGetotploading(true);
    let body = {
      phoneNo: createprofile.mobile,
      countryCode: dialcode,
    };
    verifyControllers
      .verifyPhone(body)
      .then((res) => {
        localStorage.removeItem("referenceid");
        localStorage.setItem("referenceid", res.data.data.referenceId);
        toast.success(res.data.message);
        setGetotploading(false);
        setOtpINput(true);
      })
      .catch((err) => {
        setGetotploading(false);
        toast.error(err.response.data.message);
      });
  };
  const [otp, setOTP] = useState("");
  const verifyOtp = () => {
    const referenceId = localStorage.getItem("referenceid");
    let body = {
      otp: otp,
      referenceId: referenceId,
    };

    verifyControllers
      .getOtpverification(body)
      .then((res) => {
        setOtpINput(false);
        getUserdetails();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    router.query.slug ? getUserdetails() : () => {};
  }, [router.query.slug]);
  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "transparent",
      width: "100%",
      border: "1px solid grey",
      padding: "8px",
    }),
  };
  return (
    <div
      className={`${props.className}  ${
        pathname === "/createProfile/[slug]"
          ? "bordered my-5 container p-0"
          : ""
      }`}
    >
      <Whitewrapper bg={props.bg}>
        <div
          className={`mb-3 ${pathname === "/createProfile/[slug]" ? "" : ""} `}
          style={{
            backgroundImage: `url(${coveravatar ? coveravatar : props.cover})`,
            height: `${pathname === "/createProfile/[slug]" ? "60vh" : "20vh"}`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {show ? (
            <div className="text-end me-3">
              <AiFillEdit
                size={30}
                className={`pointer ${styles.delete_icon}`}
                color="grey"
                onClick={() => coverinput.current.click()}
              />
              <input
                type="file"
                style={{ display: "none" }}
                ref={coverinput}
                id="coverImage"
                onChange={handlecoverphoto}
              />
            </div>
          ) : (
            <></>
          )}
          <div className={`${styles.overflow_hidden}`}>
            {show ? (
              <div className={`${styles.delete_image_profile}`}>
                <AiFillEdit
                  size={30}
                  className={`pointer ${styles.delete_icon}`}
                  color="grey"
                  onClick={() => Inputref.current.click()}
                />
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="profile_image"
                  ref={Inputref}
                  onChange={hadnleupload}
                />
              </div>
            ) : (
              <></>
            )}

            <Image
              src={avatarimage ? avatarimage : props.img}
              className={`${
                pathname === "/createProfile/[slug]"
                  ? styles.image_updateprofile
                  : styles.image_student
              }`}
              alt=""
              width={50}
              height={50}
            />
          </div>
        </div>
        <div
          className={`${
            pathname === "/createProfile/[slug]" ? " mt-7" : "mt-5"
          }`}
        >
          <h4 className={`text-center text-capitalize`}>
            {pathname == "/createProfile/[slug]" ? "" : props.name}
          </h4>
          <p className={`f-12 text-center  fw-semibold `}>
            {pathname == "/createProfile/[slug]" ? "" : props.username}
          </p>
          {pathname === "/createProfile/[slug]" ? (
            <></>
          ) : (
            <>
              {/* <p className="f-12 px-3">
                <span className="fw-semibold f-12">Company Representative </span>
              </p>
              <span className="p-3 f-12">{props.companyRepresentative}</span> */}
            </>
          )}
          {!show ? (
            <>
              {/* <p className="fw-semibold f-12 px-3">About Company</p> */}
              <p className={`text-justify text-grey px-3 f-12 pb-3 `}>
                {props.description}
              </p>
            </>
          ) : (
            <div className="container-fluid text-left p-5">
              {role === USER_ROLES.COMPANY ? (
                <h3 className="fw-bold mb-4  ">Edit Company Profile</h3>
              ) : (
                <h3 className="fw-bold mb-4  ">Edit Profile</h3>
              )}
              <div className="row">
                {/* form for student */}
                <form onSubmit={createsubmithandler}>
                  <div className="col-sm-10">
                    <h4
                      style={{
                        borderBottom: "2px solid blue",
                        width: "fit-content",
                      }}
                      className="my-4"
                    >
                      {role === USER_ROLES.PARENT
                        ? "Parent Info"
                        : role === USER_ROLES.STUDENT
                        ? "Profile Details"
                        : "Company Representative"}
                    </h4>
                    <div className="row my-3">
                      <div className="col-sm-5">
                        <Label color="#656161" fw="600" className="mb-3">
                          Full Name*
                        </Label>

                        <div
                          className={`${
                            formerr.fullname && formerr.salutation
                              ? "error_bordered"
                              : "bordered"
                          } d-flex align-items-center`}
                        >
                          {role === USER_ROLES.STUDENT ? (
                            <select
                              onChange={createprofileinputhandler}
                              id="salutation"
                              className={`${styles.gender_selectbar}`}
                              style={{
                                border: `${
                                  formerr.salutation ? "1px solid red" : ""
                                }`,
                              }}
                            >
                              <option selected hidden>
                                Select
                              </option>
                              <option value="MR.">Mr</option>
                              <option value="Ms.">Ms</option>
                            </select>
                          ) : (
                            <select
                              onChange={createprofileinputhandler}
                              id="salutation"
                              className={`${styles.gender_selectbar}`}
                              style={{
                                border: `${
                                  formerr.salutation ? "1px solid red" : ""
                                }`,
                              }}
                            >
                              <option selected hidden>
                                Select
                              </option>
                              <option value={"Mr."}>Mr</option>
                              <option value={"Ms."}>Ms</option>
                              <option value={"Mrs."}>Mrs</option>
                            </select>
                          )}

                          <Input
                            type="text"
                            bg="transparent"
                            border="none"
                            placeholder="Full Name"
                            rounded="3px"
                            padding="12px"
                            width="100%"
                            className="custom_input"
                            id={"fullname"}
                            value={createprofile.fullname}
                            onChange={createprofileinputhandler}
                          />
                        </div>
                        {/* {formerr.salutation && (
                          <p className="text-danger">{formerr.salutation}</p>
                        )} */}
                        {formerr.fullname ? (
                          <p className="text-danger">{formerr.fullname}</p>
                        ) : formerr.salutation ? (
                          <p className="text-danger ">{formerr.salutation}</p>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-sm-2"></div>
                      {role === USER_ROLES.PARENT ||
                      role === USER_ROLES.COMPANY ? (
                        <div className="col-sm-5">
                          <Label color="#656161" fw="600" className="mb-3">
                            Password*
                          </Label>

                          <Input
                            type="password"
                            bg="transparent"
                            border={"1px solid grey"}
                            rounded="3px"
                            padding="12px"
                            width="100%"
                            className="custom_input"
                            placeholder="Password"
                            id="password"
                            onChange={createprofileinputhandler}
                          />
                          {formerr.password && (
                            <p className="text-danger">{formerr.password}</p>
                          )}
                        </div>
                      ) : (
                        <div className="col-sm-5">
                          <Label color="#656161" fw="600" className="mb-3">
                            Username*
                          </Label>
                          <Input
                            type="text"
                            bg="transparent"
                            border={"1px solid grey"}
                            rounded="3px"
                            padding="12px"
                            width="100%"
                            className="custom_input"
                            id="username"
                            placeholder="Username"
                            onChange={createprofileinputhandler}
                          />
                          {formerr.username && (
                            <p className="text-danger">{formerr.username}</p>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="row my-3">
                      {role === USER_ROLES.PARENT ||
                      role === USER_ROLES.COMPANY ? (
                        <div className="col-sm-5">
                          <Label color="#656161" fw="600" className="mb-3">
                            {emailOtpInput ? "OTP*" : "Email*"}
                          </Label>
                          <div
                            className={`${
                              formerr.email ? "error_bordered" : "bordered"
                            } `}
                          >
                            {emailOtpInput ? (
                              <div className="d-flex align-items-center justify-content-between">
                                <Input
                                  maxLength={4}
                                  bg="transparent"
                                  border="none"
                                  rounded="3px"
                                  padding="12px"
                                  width="100%"
                                  className="custom_input"
                                  onChange={(e) => setEmailOtp(e.target.value)}
                                />
                                <Button
                                  className="custom_btn"
                                  border="none"
                                  padding="12px"
                                  type="button"
                                  onClick={emailOtpVerification}
                                >
                                  {emailLoading ? (
                                    <Loading
                                      type="spin"
                                      width={25}
                                      height={25}
                                      className="m-auto"
                                    />
                                  ) : (
                                    "Verify"
                                  )}
                                </Button>
                              </div>
                            ) : (
                              <div className="d-flex align-items-center">
                                <Input
                                  bg="transparent"
                                  rounded="3px"
                                  border="none"
                                  padding="12px"
                                  width="100%"
                                  className="custom_input"
                                  placeholder="Email"
                                  id="email"
                                  onChange={createprofileinputhandler}
                                  value={createprofile.email}
                                  disabled={emaildisabled}
                                />
                                {/* {emailVerify ? (
                               <Button
                                 className="custom_btn"
                                 border="none"
                                 padding="12px"
                                 onClick={emailVerification}
                                 type="button"
                               >
                                 {emailLoading ? (
                                   <Loading
                                     type="spin"
                                     width={25}
                                     height={25}
                                     className="m-auto"
                                   />
                                 ) : (
                                   "Verify"
                                 )}
                               </Button>
                             ) : (
                               ""
                             )} */}
                              </div>
                            )}
                          </div>
                          {formerr.email && (
                            <p className="text-danger">{formerr.email}</p>
                          )}
                        </div>
                      ) : (
                        <div className="col-sm-5">
                          <Label color="#656161" fw="600" className="mb-3">
                            Password*
                          </Label>
                          <Input
                            type="password"
                            bg="transparent"
                            border={"1px solid grey"}
                            rounded="3px"
                            padding="12px"
                            width="100%"
                            className="custom_input"
                            placeholder="Password"
                            id="password"
                            onChange={createprofileinputhandler}
                          />
                          {formerr.password && (
                            <p className="text-danger">{formerr.password}</p>
                          )}
                        </div>
                      )}
                      <div className="col-sm-2"></div>
                      {role === USER_ROLES.PARENT ||
                      role === USER_ROLES.COMPANY ? (
                        <div className="col-sm-5">
                          <Label color="#656161" fw="600" className="mb-3">
                            Phone Number*
                          </Label>
                          <div className={"bordered "}>
                            <Input
                              type="number"
                              bg="transparent"
                              border="none"
                              rounded="3px"
                              padding="12px"
                              width="100%"
                              className="custom_input"
                              placeholder="Mobile"
                              id="mobile"
                              onChange={createprofileinputhandler}
                              value={createprofile.mobile}
                              disabled={mobileDisabled}
                            />
                          </div>
                          {formerr.mobile && (
                            <p className="text-danger">{formerr.mobile}</p>
                          )}
                        </div>
                      ) : (
                        <div className="col-sm-5">
                          <Label color="#656161" fw="600" className="mb-3">
                            DOB*
                          </Label>

                          <DatePicker
                            onChange={dateChangeHandler}
                            className={styles.date_picker}
                            value={date}
                            maxDate={new Date()}
                            calendarClassName={styles.dob_calendar}
                            name="dob"
                            monthPlaceholder="MM"
                            dayPlaceholder="DD"
                            yearPlaceholder="YYYY"
                          />

                          {formerr.dob && (
                            <p className="text-danger">{formerr.dob}</p>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="row my-3">
                      {role === USER_ROLES.PARENT ||
                      role === USER_ROLES.COMPANY ? (
                        <></>
                      ) : (
                        <div className="col-sm-5">
                          <Label color="#656161" fw="600" className="mb-3">
                            {emailOtpInput ? "OTP*" : "Email*"}
                          </Label>
                          <div
                            className={`${
                              formerr.email ? "error_bordered" : "bordered"
                            } `}
                          >
                            {emailOtpInput ? (
                              <div className="d-flex align-items-center justify-content-between">
                                <Input
                                  maxLength={4}
                                  bg="transparent"
                                  border="none"
                                  rounded="3px"
                                  padding="12px"
                                  width="100%"
                                  className="custom_input"
                                  onChange={(e) => setEmailOtp(e.target.value)}
                                />
                                <Button
                                  className="custom_btn"
                                  border="none"
                                  padding="12px"
                                  type="button"
                                  onClick={emailOtpVerification}
                                >
                                  {emailLoading ? (
                                    <Loading
                                      type="spin"
                                      width={25}
                                      height={25}
                                      className="m-auto"
                                    />
                                  ) : (
                                    "Verify"
                                  )}
                                </Button>
                              </div>
                            ) : (
                              <div className="d-flex align-items-center">
                                <Input
                                  bg="transparent"
                                  rounded="3px"
                                  border="none"
                                  padding="12px"
                                  width="100%"
                                  className="custom_input"
                                  placeholder="Email"
                                  id="email"
                                  onChange={createprofileinputhandler}
                                  value={createprofile.email}
                                  disabled={emaildisabled}
                                />
                                {/* {emailVerify ? (
                                <Button
                                  className="custom_btn"
                                  border="none"
                                  padding="12px"
                                  onClick={emailVerification}
                                  type="button"
                                >
                                  {emailLoading ? (
                                    <Loading
                                      type="spin"
                                      width={25}
                                      height={25}
                                      className="m-auto"
                                    />
                                  ) : (
                                    "Verify"
                                  )}
                                </Button>
                              ) : (
                                ""
                              )} */}
                              </div>
                            )}
                          </div>
                          {formerr.email && (
                            <p className="text-danger">{formerr.email}</p>
                          )}
                        </div>
                      )}
                      <div className="col-sm-2"></div>
                      {role === USER_ROLES.PARENT ||
                      role === USER_ROLES.COMPANY ? (
                        <></>
                      ) : (
                        <div className="col-sm-5">
                          <Label color="#656161" fw="600" className="mb-3">
                            Phone Number*
                          </Label>
                          <div
                            className={`${
                              formerr.mobile ? "error_bordered" : "bordered "
                            }  `}
                          >
                            <Input
                              type="number"
                              bg="transparent"
                              border="none"
                              rounded="3px"
                              padding="12px"
                              width="100%"
                              className="custom_input"
                              placeholder="Mobile"
                              id="mobile"
                              onChange={createprofileinputhandler}
                              value={createprofile.mobile}
                              disabled={mobileDisabled}
                            />
                          </div>
                          {formerr.mobile && (
                            <p className="text-danger">{formerr.mobile}</p>
                          )}
                        </div>
                      )}
                      {role === USER_ROLES.PARENT ||
                      role === USER_ROLES.COMPANY ? (
                        <></>
                      ) : (
                        <div className="row my-3">
                          <div className="col-sm-5">
                            <Label color="#656161" fw="600" className="mb-3">
                              Parent Email
                            </Label>
                            <Input
                              bg="transparent"
                              border="1px solid grey"
                              rounded="3px"
                              padding="12px"
                              width="100%"
                              className="custom_input"
                              placeholder="Parent Email"
                              id="parentEmail"
                              onChange={createprofileinputhandler}
                              value={createprofile.parentEmail}
                            />
                            {age
                              ? ""
                              : formerr.parentEmail && (
                                  <p className="text-danger">
                                    {formerr.parentEmail}
                                  </p>
                                )}
                          </div>
                        </div>
                      )}
                    </div>
                    {role === USER_ROLES.COMPANY ? (
                      <div className="row">
                        <div className="col-sm-5">
                          <Label color="#656161" fw="600" className="mb-3">
                            Designation
                          </Label>
                          <Input
                            bg="transparent"
                            border="1px solid grey"
                            rounded="3px"
                            padding="12px"
                            width="100%"
                            className="custom_input"
                            placeholder="Designation"
                            id="designation"
                            onChange={createprofileinputhandler}
                            value={createprofile.designation}
                          />
                        </div>
                        {formerr.designation && (
                          <p className="text-danger">{formerr.designation}</p>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                    {/* Company form details */}
                    {role == USER_ROLES.COMPANY ? (
                      <div>
                        <div className="bordered my-3"></div>
                        <h5
                          style={{
                            borderBottom: "2px solid blue",
                            width: "fit-content",
                          }}
                          className="my-4"
                        >
                          Company Details
                        </h5>
                        <div className="row my-3">
                          <div className="col-sm-5">
                            <Label color="#656161" fw="600" className="mb-3">
                              Company Name*
                            </Label>
                            <Input
                              type="text"
                              bg="transparent"
                              border="1px solid grey"
                              rounded="3px"
                              padding="12px"
                              width="100%"
                              className="custom_input"
                              id="companyName"
                              placeholder="Company Name"
                              onChange={createprofileinputhandler}
                            />
                            {formerr.companyName && (
                              <p className="text-danger">
                                {formerr.companyName}
                              </p>
                            )}
                          </div>
                          <div className="col-sm-2"></div>
                          <div className="col-sm-5">
                            <Label color="#656161" fw="600" className="mb-3">
                              Industry*
                            </Label>
                            <Selectbar
                              data={data.industrytype}
                              border="1px solid grey"
                              padding="8px"
                              id="industry"
                              onChange={industrychangehandler}
                            />
                            {formerr.industry && (
                              <p className="text-danger">{formerr.industry}</p>
                            )}
                          </div>
                          {/* <div className="col-sm-5">
                            <Label color="#656161" fw="600" className="mb-3">
                              Email Address
                            </Label>
                            <Input
                              type="email"
                              bg="transparent"
                              border="1px solid grey"
                              rounded="3px"
                              padding="12px"
                              width="100%"
                              placeholder="Email Address"
                              className="custom_input"
                              id="companyEmail"
                              onChange={createprofileinputhandler}
                            />
                            {formerr.companyEmail && (
                              <p className="text-danger">
                                {formerr.companyEmail}
                              </p>
                            )}
                          </div> */}
                        </div>
                        {/* <div className="row my-3">
                          <div className="col-sm-5">
                            <Label color="#656161" fw="600" className="mb-3">
                              Company Website*
                            </Label>
                            <Input
                              type="text"
                              bg="transparent"
                              border="1px solid grey"
                              rounded="3px"
                              padding="12px"
                              width="100%"
                              placeholder="Company Website"
                              className="custom_input"
                              id="website"
                              onChange={createprofileinputhandler}
                            />
                            {formerr.website && (
                              <p className="text-danger">{formerr.website}</p>
                            )}
                          </div>
                          <div className="col-sm-2"></div>
                          <div className="col-sm-5">
                            <Label color="#656161" fw="600" className="mb-3">
                              Contact Number *
                            </Label>
                            <Input
                              type="number"
                              bg="transparent"
                              border="1px solid grey"
                              rounded="3px"
                              padding="12px"
                              width="100%"
                              className="custom_input"
                              placeholder="Contact Number"
                              id="companyPhoneNo"
                              onChange={createprofileinputhandler}
                            />
                            {formerr.companyPhoneNo && (
                              <p className="text-danger">
                                {formerr.companyPhoneNo}
                              </p>
                            )}
                          </div>
                        </div> */}
                        {/* <div className="row my-3">
                          <div className="col-sm-5">
                            <Label color="#656161" fw="600" className="mb-3">
                              Company Type*
                            </Label>
                            <Selectbar
                              data={data.companyttype}
                              padding="8px"
                              border="1px solid grey"
                              id="companyType"
                              onChange={companytypechangehandler}
                            />
                            {formerr.companyType && (
                              <p className="text-danger">
                                {formerr.companyType}
                              </p>
                            )}
                          </div>
                          <div className="col-sm-2"></div>
                          <div className="col-sm-5">
                            <Label color="#656161" fw="600" className="mb-3">
                              Team Size*
                            </Label>
                            <Selectbar
                              data={data.teamsize}
                              border="1px solid grey"
                              padding="8px"
                              id="teamSize"
                              onChange={teamselectchangehandler}
                            />
                            {formerr.teamSize && (
                              <p className="text-danger">{formerr.teamSize}</p>
                            )}
                          </div>
                        </div> */}
                        {/* <div className="row my-3">
                          <div className="col-sm-5">
                            <Label color="#656161" fw="600" className="mb-3">
                              Industry*
                            </Label>
                            <Selectbar
                              data={data.industrytype}
                              border="1px solid grey"
                              padding="8px"
                              id="industry"
                              onChange={industrychangehandler}
                            />
                            {formerr.industry && (
                              <p className="text-danger">{formerr.industry}</p>
                            )}
                          </div>
                          <div className="col-sm-2"></div>
                          <div className="col-sm-5">
                            <Label className="mb-3" fw="600" color="#656161">
                              Zip Code*
                            </Label>
                            <Input
                              bg="transparent"
                              border="1px solid grey"
                              rounded="3px"
                              padding="12px"
                              width="100%"
                              className="custom_input"
                              placeholder="ZipCode"
                              id="zipCode"
                              onChange={createprofileinputhandler}
                            />
                            {formerr.zipCode && (
                              <p className="text-danger">{formerr.zipCode}</p>
                            )}
                          </div>
                          <div className="col-sm-5">
                            <Label className="mb-3" fw="600" color="#656161">
                              Started Date*
                            </Label>

                            <DatePicker
                              className={styles.date_picker}
                              calendarClassName={styles.dob_calendar}
                              name="startedDate"
                              onChange={startedDatehandler}
                              value={openingDate}
                              dayPlaceholder="DD"
                              monthPlaceholder="MM"
                              yearPlaceholder="YYYY"
                            />
                            {formerr.startedDate && (
                              <p className="text-danger">
                                {formerr.startedDate}
                              </p>
                            )}
                          </div>
                        </div> */}
                        <div className="row my-3">
                          <div className="col-sm-5">
                            <Label color="#656161" fw="600" className="mb-3">
                              State*
                            </Label>
                            <Select
                              id="state"
                              options={UsaStates.map((val) => {
                                return {
                                  value: val.name,
                                  label: val.name,
                                };
                              })}
                              onChange={stateHandler}
                              styles={colourStyles}
                            />
                            {formerr.state && (
                              <p className="text-danger">{formerr.state}</p>
                            )}
                          </div>
                          <div className="col-sm-2"></div>
                          <div className="col-sm-5">
                            <Label className="mb-3" color="#656161" fw="600">
                              City*
                            </Label>
                            <Select
                              options={usCities.map((val) => {
                                return {
                                  value: val,
                                  label: val,
                                };
                              })}
                              styles={colourStyles}
                              id="city"
                              onChange={cityHandler}
                            />{" "}
                            {formerr.city && (
                              <p className="text-danger">{formerr.city}</p>
                            )}
                          </div>
                        </div>
                        <div className="row my-3">
                          <div className="col-sm-5">
                            <Label className="mb-3" color="#656161" fw="600">
                              Address line 1
                            </Label>
                            <Input
                              bg="transparent"
                              border="1px solid grey"
                              rounded="3px"
                              padding="12px"
                              width="100%"
                              className="custom_input"
                              placeholder="Address Line 1"
                              id="address1"
                              onChange={createprofileinputhandler}
                            />
                          </div>
                          <div className="col-sm-2"></div>
                          <div className="col-sm-5">
                            <Label className="mb-3" color="#656161" fw="600">
                              Address line 2
                            </Label>
                            <Input
                              bg="transparent"
                              border="1px solid grey"
                              rounded="3px"
                              padding="12px"
                              width="100%"
                              className="custom_input"
                              placeholder="Address Line 1"
                              id="address2"
                              onChange={createprofileinputhandler}
                            />
                          </div>
                        </div>
                        <div className="row my-3">
                          {/* <div className="col-sm-5">
                            <Label className="mb-3" fw="600" color="#656161">
                              Company motto
                            </Label>
                            <textarea
                              className={`${styles.tagline}`}
                              rows={2}
                              placeholder="Company's motto"
                              id="tagLine"
                              onChange={createprofileinputhandler}
                            />
                            {formerr.tagLine && (
                              <p className="text-danger">{formerr.tagLine}</p>
                            )}
                          </div> */}
                          {/* <div className="col-sm-2"></div> */}
                          {/* <div className="col-sm-5">
                            <Label className="mb-3" fw="600" color="#656161">
                              Zip Code*
                            </Label>
                            <Input
                              bg="transparent"
                              border="1px solid grey"
                              rounded="3px"
                              padding="12px"
                              width="100%"
                              className="custom_input"
                              placeholder="ZipCode"
                              id="zipCode"
                              onChange={createprofileinputhandler}
                            />
                            {formerr.zipCode && (
                              <p className="text-danger">{formerr.zipCode}</p>
                            )}
                          </div> */}
                          <div className="col-sm-5">
                            <Label className="mb-3" fw="600" color="#656161">
                              Zip Code*
                            </Label>
                            <Input
                              type="number"
                              bg="transparent"
                              border="1px solid grey"
                              rounded="3px"
                              padding="12px"
                              width="100%"
                              className="custom_input"
                              placeholder="ZipCode"
                              id="zipCode"
                              onChange={createprofileinputhandler}
                            />
                            {formerr.zipCode && (
                              <p className="text-danger">{formerr.zipCode}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {role == USER_ROLES.PARENT ||
                    role === USER_ROLES.COMPANY ? (
                      <></>
                    ) : (
                      <div className="row my-3">
                        <h4 className="fw-bold my-3">Social Profile</h4>
                        <div className="col-sm-5">
                          <div className="bordered d-flex align-items-center">
                            <AiFillFacebook color="#00acee" size={40} />
                            <Input
                              padding="12px"
                              width="100%"
                              bg="transparent"
                              border="none"
                              placeholder="Facebook Username"
                              className="custom_input"
                              onChange={createprofileinputhandler}
                              id="facebook"
                            />
                          </div>
                        </div>
                        <div className="col-sm-2"></div>
                        <div className="col-sm-5">
                          <div className="bordered d-flex align-items-center">
                            {/* <AiOutlineTwitter color="#00acee" size={40} /> */}
                            <div className="p-1">
                              <img src={twitter.src} alt="" width={20} />
                            </div>
                            <Input
                              padding="12px"
                              width="100%"
                              bg="transparent"
                              border="none"
                              placeholder="Twitter Username"
                              className="custom_input"
                              onChange={createprofileinputhandler}
                              id="twitter"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {ageVerification ? (
                      <p className="text-danger f-12">
                        {!age
                          ? "You Are under Age Please Enter Your Parent Email Id and Wait for their Confirmation"
                          : ""}
                      </p>
                    ) : (
                      ""
                    )}
                    <Button
                      className="custom_btn my-3"
                      border="1px solid #f15d17"
                      type="submit"
                      color="#000"
                      fw="500"
                      padding="10px"
                      width="150px"
                      rounded="3px"
                      // disabled={!age ? true : false}
                    >
                      {loading ? (
                        <Loading
                          type="spin"
                          width={25}
                          height={25}
                          className="m-auto"
                        />
                      ) : (
                        "Update Details"
                      )}
                    </Button>
                  </div>
                </form>
                {/* form for student */}
              </div>
            </div>
          )}
        </div>
      </Whitewrapper>
    </div>
  );
};

export default Profiledashboard;
