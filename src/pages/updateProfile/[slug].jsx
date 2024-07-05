import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import coverimage from "../../assessts/images/profile/Cover_Banner.jpg";
import Head from "next/head";
import { CiEdit } from "react-icons/ci";
import { useRef } from "react";
import Image from "next/image";
import student from "../../assessts/images/profile/avatar.jpg";

import Label from "@/components/label";
import Input from "@/components/input";
import { useRouter } from "next/router";
import Button from "@/components/button";
import { isEmail, isNumber, isPhonenumber } from "@/utils/number";
import verifyControllers from "@/api/verify";
import moment from "moment/moment";
import { UpdateProfilevalidation } from "@/utils/validation";
import { toast } from "react-toastify";
import Loading from "@/components/loading";
import user from "@/redux/reducers/user";
import { useDispatch, useSelector } from "react-redux";
import Authcontrollers from "@/api/auth";
import DateSelector from "@/components/datePicker";
import DatePicker from "react-date-picker";
const SetProfile = () => {
  const dispatch = useDispatch();
  const coverimageref = useRef();
  const profileimageref = useRef();

  const router = useRouter();
  const unverifiedtoken = router.query.slug;

  const [data, setData] = useState({
    fullName: "",
  });
  const [state, setState] = useState({
    coverImage: null,
    profileImage: null,
    salutation: "",
    fullName: "",
    userName: "",
    password: "",
    birthDate: "",
    emailAddress: "",
    mobile: "",
    countryCode: "+91",
  });

  // const [show, setShow] = useState(false);
  const [role, setRole] = useState("");
  const getunverifieduserdetails = () => {
    Authcontrollers.getuserdetails()
      .then((res) => {
        setRole(res.data.data.group);
        setState({
          ...state,
          fullName: res.data.data.name,
          emailAddress: res.data.data.email,
          birthDate: res.data.data.birthDate
            ? moment(res.data.data.birthDate).format("L")
            : "",
          salutation: res.data.data.salutation,
          mobile: res.data.data.phoneNo,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Getunverifieduserdetails = (value) => {
    verifyControllers
      .getmemberverification(value)
      .then((res) => {
        localStorage.clear();
        localStorage.setItem("accesstoken", res.data.data.accessToken);
        getunverifieduserdetails();
        // setData(res.data.data);
      })
      .catch((err) => {
        console.log("erruser", err);
      });
  };

  const [previewcoverimage, setPrviewcoverImage] = useState(null);
  const updloadcoverhandler = () => {
    const coverfile = coverimageref.current.files[0];
    setState({ ...state, coverImage: coverfile });
    setPrviewcoverImage(URL.createObjectURL(coverfile));
  };
  const [previewprofile, setPreviewProfile] = useState(null);

  const uploadProfilehandler = () => {
    const profileimage = profileimageref.current.files[0];
    setState({ ...state, profileImage: profileimage });
    setPreviewProfile(URL.createObjectURL(profileimage));
  };

  let [country, setCountry] = useState(false);

  const inputchangehandler = (e) => {
    let { id, value } = e.target;
    if (isPhonenumber(value)) {
      setState({ ...state, [id]: value });
      setCountry(true);
    } else {
      setState({ ...state, [id]: value });
    }

    setError({
      ...error,
      [id]:
        id == "email"
          ? isEmail(value)
            ? ""
            : "Please provide valid email"
          : id == "mobile"
          ? isPhonenumber(value)
            ? ""
            : "Please provide valid number"
          : "",
    });
  };
  const [date, setDate] = useState("");
  const dateChangeHandler = (e) => {
    setState({ ...state, birthDate: moment(e).format("YYYY-MM-DD") });
    setDate(e);
    setError("");
  };
  const [error, setError] = useState({
    userName: "",
    name: "",
    password: "",
    mobile: "",
    emailAddress: "",
    fullName: "",
    salutation: "",
    password: "",
    birthDate: "",
  });
  let [loading, setLoading] = useState(false);
  const adduser = () => {
    let fd = new FormData();
    {
      state.userName == "" ? "" : fd.append("userName", state.userName);
    }
    fd.append("password", state.password);
    fd.append("phoneNo", state.mobile);
    // fd.append("countryCode", state.countryCode);
    {
      state.profileImage == null ? "" : fd.append("avatar", state.profileImage);
    }
    {
      state.coverImage == null ? "" : fd.append("coverImage", state.coverImage);
    }
    {
      state.name === "" ? "" : fd.append("fullName", state.fullName);
    }

    let body = Object.fromEntries(fd);
    verifyControllers
      .addmember(body)
      .then((res) => {
        toast.success(res.data.message);
        setLoading(false);
        localStorage.setItem("group", res.data.data.group);
        if (role === "PARENT") {
          router.push("/parent-dashboard");
        } else {
          router.push(`/dashboard/${res.data.data.group}`);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };
  const [otpInput, setOtpInput] = useState(false);
  const [otploading, setOtpLoading] = useState(false);
  const verifyPhone = () => {
    setOtpLoading(true);
    let body = {
      phoneNo: state.mobile,
      countryCode: state.countryCode,
    };
    verifyControllers
      .verifyPhone(body)
      .then((res) => {
        toast.success(res.data.message);
        setOtpLoading(false);
        setOtpInput(true);
        localStorage.setItem("referenceid", res.data.data.referenceId);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setOtpLoading(false);
      });
  };
  const [otp, setOtp] = useState("");
  const verifyOtp = () => {
    setOtpLoading(true);
    let body = {
      otp: otp,
      referenceId: localStorage.getItem("referenceid"),
    };
    verifyControllers
      .getOtpverification(body)
      .then((res) => {
        toast.success(res.data.message);
        setOtpLoading(false);
        setOtpInput(false);
        localStorage.setItem("accesstoken", res.data.data.accessToken);
        getunverifieduserdetails();
      })
      .catch((err) => {
        toast.error(err.reponse.data.message);
        setOtpLoading(false);
      });
  };

  const Submithandler = (e) => {
    e.preventDefault();
    setLoading(true);
    if (UpdateProfilevalidation(state, setError, error, setLoading, role)) {
      adduser();
    } else {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    unverifiedtoken ? Getunverifieduserdetails(unverifiedtoken) : "";
  }, [unverifiedtoken]);
  useEffect(() => {
    // const token = localStorage.getItem("accesstoken");
    getunverifieduserdetails();
  }, []);
  return (
    <div>
      <Head>
        <title>Update Profile</title>
      </Head>
      <div className={`${styles.wrapper_update_profile} mt-5 container p-0`}>
        <div
          style={{
            backgroundImage: `url(${
              previewcoverimage ? previewcoverimage : coverimage.src
            })`,
            height: "60vh",
          }}
        >
          <div>
            <CiEdit
              color="#656161"
              className={`pointer ${styles.edit_btn}`}
              size={25}
              onClick={() => coverimageref.current.click()}
            />
            <input
              type="file"
              style={{ display: "none" }}
              ref={coverimageref}
              onChange={updloadcoverhandler}
            />
          </div>
          <div className={`${styles.overflow__hidden}`}>
            <div className={`${styles.edit_profile_image}`}>
              <CiEdit
                size={25}
                className={`pointer ${styles.edit_profile_icon}`}
                color="grey"
                onClick={() => profileimageref.current.click()}
              />
              <input
                type="file"
                style={{ display: "none" }}
                id="profile_image"
                ref={profileimageref}
                onChange={uploadProfilehandler}
              />
            </div>
            <Image
              src={previewprofile ? previewprofile : student}
              className={`${styles.profile_image}`}
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className="container mt-10">
          <form onSubmit={Submithandler}>
            <div className="row mt-10 p-5">
              <h6 className="text-uppercase">Update Profile</h6>
              <div className="my-4">
                <div className="col-sm-10">
                  <div className="row mb-3">
                    <div className="col-sm-5">
                      <Label className="fw-semibold f-15 mb-3">Fullname</Label>
                      <div className="bordered d-flex">
                        {role == "STUDENT" ? (
                          <select
                            className={`${styles.gender_selectbar}`}
                            id="salutation"
                            onChange={inputchangehandler}
                          >
                            <option value={"Mr."}>Mr.</option>
                            <option value={"Mrs."}>Mrs.</option>
                            <option value={"Ms."}>Ms.</option>
                          </select>
                        ) : (
                          <select
                            className={`${styles.gender_selectbar}`}
                            id="salutation"
                            onChange={inputchangehandler}
                          >
                            <option value={"Mr."}>Mr.</option>
                            <option value={"Mrs."}>Mrs.</option>
                            <option value={"Ms."}>Ms.</option>
                          </select>
                        )}
                        <Input
                          type="text"
                          className="custom_input"
                          bg="transparent"
                          border="none"
                          padding="12px"
                          width="100%"
                          rounded="3px"
                          id="fullName"
                          onChange={inputchangehandler}
                          value={state.fullName}
                        />
                      </div>
                      {error.fullName && (
                        <p className="text-danger text-start">
                          {error.fullName}
                        </p>
                      )}
                    </div>
                    <div className="col-sm-2"></div>
                    {role === "COMPANY_STAFF" || role === "PARENT" ? (
                      <div className="col-sm-5">
                        <Label className="fw-semibold f-15 mb-3">
                          Password
                        </Label>

                        <Input
                          type="password"
                          className="custom_input"
                          bg="transparent"
                          border="1px solid #656161"
                          padding="12px"
                          width="100%"
                          rounded="3px"
                          id="password"
                          onChange={inputchangehandler}
                        />
                        {error.password && (
                          <p className="text-danger text-start">
                            {error.password}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="col-sm-5">
                        <Label className="mb-3 fw-semibold f-15">
                          Username
                        </Label>
                        <Input
                          type="text"
                          className="custom_input"
                          bg="transparent"
                          border="1px solid #656161"
                          padding="12px"
                          width="100%"
                          rounded="3px"
                          id="userName"
                          onChange={inputchangehandler}
                        />
                        {error.userName && (
                          <p className="text-danger text-start">
                            {error.userName}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="row mb-4">
                    {/* {
                      (role =
                        "COMPANY_STAFF" ||
                        (role = "PARENT" ? (
                          <></>
                        ) : (
                          <div className="col-sm-5">
                            <Label className="fw-semibold f-15 mb-3">
                              Password
                            </Label>

                            <Input
                              type="password"
                              className="custom_input"
                              bg="transparent"
                              border="1px solid #656161"
                              padding="12px"
                              width="100%"
                              rounded="3px"
                              id="password"
                              onChange={inputchangehandler}
                            />
                            {error.password && (
                              <p className="text-danger text-start">
                                {error.password}
                              </p>
                            )}
                          </div>
                        )))
                    } */}
                    {role === "COMPANY_STAFF" || role === "PARENT" ? (
                      <></>
                    ) : (
                      <div className="col-sm-5">
                        <Label className="fw-semibold f-15 mb-3">
                          Password
                        </Label>

                        <Input
                          type="password"
                          className="custom_input"
                          bg="transparent"
                          border="1px solid #656161"
                          padding="12px"
                          width="100%"
                          rounded="3px"
                          id="password"
                          onChange={inputchangehandler}
                        />
                        {error.password && (
                          <p className="text-danger text-start">
                            {error.password}
                          </p>
                        )}
                      </div>
                    )}
                    <div className="col-sm-2"></div>
                    {role === "STUDENT" ? (
                      <div className="col-sm-5">
                        <Label>Birth Date</Label>
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
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="row mb-4">
                    <div className="col-sm-5">
                      <Label className="fw-semibold f-15 mb-3">
                        Email Address
                      </Label>
                      <Input
                        type="email"
                        className="custom_input"
                        bg="transparent"
                        border="1px solid #656161"
                        padding="12px"
                        width="100%"
                        rounded="3px"
                        id="email"
                        onChange={inputchangehandler}
                        value={state.emailAddress}
                      />
                      {error.emailAddress && (
                        <p className="text-danger text-start">
                          {error.emailAddress}
                        </p>
                      )}
                    </div>
                    <div className="col-sm-2"></div>
                    {/* {otpInput ? (
                      <div className="col-sm-5">
                        <Label className="mb-3 fw-semibold f-15">OTP</Label>
                        <div className="bordered d-flex align-items center justify-content-between">
                          <Input
                            type="number"
                            className="custom_input"
                            bg="transparent"
                            border="none"
                            padding="12px"
                            width="100%"
                            rounded="3px"
                            onChange={(e) => setOtp(e.target.value)}
                          />
                          <Button
                            className="custom_btn"
                            border="none"
                            fw="500"
                            padding="12px"
                            onClick={verifyOtp}
                            type="button"
                          >
                            {otploading ? (
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
                      </div>
                    ) : (
                    <div className="col-sm-5">
                      <Label className="mb-3 fw-semibold f-15">Mobile</Label>
                      <div className="bordered d-flex align-items-center justify-content-between">
                        {country ? (
                            <select
                              onChange={inputchangehandler}
                              id="countryCode"
                              className={`${styles.gender_selectbar}`}
                            >
                              <option value="+91" selected>
                                +91
                              </option>
                            </select>
                          ) : (
                            <></>
                          )}
                        <Input
                          type="number"
                          className="custom_input"
                          bg="transparent"
                          border="none"
                          padding="12px"
                          width="100%"
                          rounded="3px"
                          id="mobile"
                          onChange={inputchangehandler}
                          value={state.mobile}
                        />
                      </div>
                      {error.mobile && (
                        <p className="text-danger text-start">{error.mobile}</p>
                      )}
                    </div>
                     )}  */}
                    <div className="col-sm-5">
                      <Label className="mb-3 fw-semibold f-15">Mobile</Label>
                      <Input
                        type="number"
                        className="custom_input"
                        bg="transparent"
                        border="1px solid #000"
                        padding="12px"
                        width="100%"
                        rounded="3px"
                        id="mobile"
                        onChange={inputchangehandler}
                        value={state.mobile}
                      />
                      {error.mobile && (
                        <p className="text-danger text-start">{error.mobile}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Button
                      className="custom_btn"
                      padding="12px"
                      width="200px"
                      border="none"
                      fw="500"
                      type="submit"
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
      </div>
    </div>
  );
};

export default SetProfile;
