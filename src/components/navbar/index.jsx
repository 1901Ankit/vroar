import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import {
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlinePlusCircle,
  AiOutlineDashboard,
  AiOutlineUserAdd,
} from "react-icons/ai";
import Button from "../button";
import Link from "next/link";
// import logo from "../../assessts/images/logo/Vroar-Logo-black.svg";
import logo from "@/assessts/images/logo/Vroar_Logo_Blacknew.svg";
import logowhite from "@/assessts/images/logo/Vroar_Logo_Whitenew.svg";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { hideModal, showModal } from "@/redux/reducers/modal";
import Label from "../label";
import Input from "../input";
import menu from "@/assessts/images/dashboard/menu.png";
import {
  Parentvalidation,
  addchildvalidation,
  comapnystaffvalidation,
} from "@/utils/validation";
import { toast } from "react-toastify";
import Authcontrollers from "@/api/auth";
import { Offcanvas } from "react-bootstrap";
import { isEmail } from "@/utils/number";
import verifyControllers from "@/api/verify";
import Select from "react-select";
import Loading from "../loading";
import { login } from "@/redux/reducers/user";
import url from "@/assessts/data/url";
import DateSelector from "../datePicker";
import moment from "moment";
import { user } from "@/redux/reducers/userDetails";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import dashboard from "@/assessts/images/dashboard/dashboard.png";
import { GiBookshelf } from "react-icons/gi";
import { useRef } from "react";
import Head from "next/head";

const Navbar = () => {
  const dispatch = useDispatch();
  const s3url = url.s3url;
  const [details, setDetails] = useState([]);
  const getProfile = () => {
    Authcontrollers.getuserdetails()
      .then((res) => {
        setDetails(res.data.data);

        dispatch(user({ ...res.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const company = useSelector((state) => state.userdetails.company);
  const myUser = useSelector((state) => state.userdetails);
  const role = useSelector((state) => state.userdetails.group);
  const [disable, setDisable] = useState(false);
  const logouthandler = () => {
    setDisable(true);
    Authcontrollers.logout()
      .then((res) => {
        toast.success(res.data.message);
        dispatch(login({ isAuthenticated: false }));
        localStorage.clear();
        setTooltip(false);
        router.push("/");
        setDisable(false);
      })
      .catch((err) => {
        console.log(err);
        localStorage.clear();
        router.push("/");
        setDisable(false);
      });
  };

  const Addmodal = () => {
    const [child, setChild] = useState({
      fullName: "",
      email: "",
      userRole: `${role === "STUDENT" ? "PARENT" : "STUDENT"}`,
      salutation: "Mr",
      birthDate: "",
      roleId: "",
      designation: "",
    });

    const roleidchangeinputhandler = (e) => {
      let { value } = e;
      setChild({ ...child, roleId: value });
      setError({ ...error, roleId: "" });
    };
    const addchildinputchangehandler = (e) => {
      let { id, value } = e.target;
      setChild({ ...child, [id]: value });
      setError({
        ...error,
        [id]:
          id == "email"
            ? isEmail(value)
              ? ""
              : "Please Provide valid email"
            : "",
      });
    };
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
      fullName: "",
      email: "",
      birthDate: "",
      roleId: "",
      designation: "",
    });
    const [dob, setDob] = useState("");
    const dateBirthHandler = (e) => {
      setChild({ ...child, birthDate: moment(e).format("YYYY-MM-DD") });
      setDob(e);
    };

    let {
      fullName,
      birthDate,
      userRole,
      email,
      salutation,
      roleId,
      designation,
    } = child;
    const addsubmithandler = (e) => {
      e.preventDefault();
      setLoading(true);
      let body =
        role == "STUDENT"
          ? {
              fullName,
              email,
              salutation,
              userRole,
            }
          : role == "COMPANY" || role == "COMPANY_STAFF"
          ? {
              fullName,
              email,
              salutation,
              designation,
            }
          : {
              fullName,
              email,
              salutation,
              userRole,
              birthDate,
            };
      if (role == "STUDENT") {
        if (Parentvalidation(child, setError, error, setLoading)) {
          Authcontrollers.addchild(body)
            .then((res) => {
              toast.success(res.data.message);
              dispatch(hideModal());
              setLoading(false);
            })
            .catch((err) => {
              toast.success(err.response.data.message);
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      } else if (role == "COMPANY" || role == "COMPANY_STAFF") {
        if (comapnystaffvalidation(child, setError, error, setLoading)) {
          Authcontrollers.addchild(body)
            .then((res) => {
              toast.success(res.data.message);
              setLoading(false);
              dispatch(hideModal());
            })
            .catch((err) => {
              toast.error(err.response.data.message);
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      } else {
        if (addchildvalidation(child, setError, error, setLoading)) {
          Authcontrollers.addchild(body)
            .then((res) => {
              toast.success(res.data.message);
              dispatch(hideModal());
              setLoading(false);
            })
            .catch((err) => {
              toast.error(err.response.data.message);
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      }
    };
    const [staffrole, setStafrole] = useState([]);
    const GetStaffselector = () => {
      verifyControllers
        .getStaff()
        .then((res) => {
          // console.log("reds", res);
          setStafrole(res.data.data.docs);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const colourstyles = {
      control: (styles) => ({
        ...styles,
        backgroundColor: "transparent",
        padding: " 12px",
        border: error.roleId ? "1px solid red" : "1px solid grey",
      }),
    };
    useEffect(() => {
      role == "COMPANY" || role == "COMPANY_STAFF" ? GetStaffselector() : "";
    }, [role]);
    return (
      <div>
        <div className="mt-5">
          <h5 className="text-center my-3">{`${
            role === "STUDENT"
              ? "Add Parent"
              : role === "COMPANY" || role == "COMPANY_STAFF"
              ? "Add Staff Member"
              : "Add Children"
          }`}</h5>
          <form onSubmit={addsubmithandler}>
            <div className="container">
              <div className="row my-3">
                <div className="col-sm-6">
                  <Label color="#000" className="my-3 f-13" fw="600">
                    Full Name
                  </Label>
                  <div
                    className={`${
                      error.fullName ? "error_bordered" : "bordered"
                    } d-flex align-items-center`}
                  >
                    {role === "PARENT" ? (
                      <select
                        onChange={addchildinputchangehandler}
                        id="salutation"
                        className={`${styles.gender_selectbar}`}
                      >
                        <option selected hidden>
                          select
                        </option>
                        <option value={"Mr."}>Mr</option>
                        <option value={"Mrs."}>Mrs</option>
                        <option value={"Ms."}>Ms</option>
                      </select>
                    ) : (
                      <select
                        onChange={addchildinputchangehandler}
                        id="salutation"
                        className={`${styles.gender_selectbar}`}
                      >
                        {/* <option selected hidden>
                          select
                        </option> */}
                        <option value={"Mr."}>Mr</option>
                        <option value={"Mrs."}>Mrs</option>
                        <option value={"Ms."}>Ms</option>
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
                      id="fullName"
                      onChange={addchildinputchangehandler}
                    />
                  </div>
                  {error.fullName && (
                    <p className="text-danger text-start f-12">
                      {error.fullName}
                    </p>
                  )}
                </div>
                <div className="col-sm-6">
                  <Label color="#000" className="my-3 f-13" fw="600">
                    Email
                  </Label>
                  <Input
                    type="email"
                    className="custom_input"
                    bg="transparent"
                    padding="12px"
                    placeholder="Email"
                    border={error.email ? "1px solid red" : "1px solid grey"}
                    rounded="3px"
                    width="100%"
                    id="email"
                    onChange={addchildinputchangehandler}
                  />
                  {error.email && (
                    <p className="text-danger text-start f-12">{error.email}</p>
                  )}
                </div>
              </div>
              {role === "STUDENT" ? (
                <></>
              ) : (
                <div className="row my-3">
                  <div className="col-sm-6">
                    <Label color="#000" className="my-3 f-13" fw="600">
                      {role === "COMPANY" || role == "COMPANY_STAFF"
                        ? "Designation"
                        : "Birth Date"}
                    </Label>
                    {role === "COMPANY" || role == "COMPANY_STAFF" ? (
                      <>
                        {/* <Select
                          options={staffrole.map((val, i) => {
                            return {
                              value: val.roleId,
                              label: val.roleName,
                            };
                          })}
                          styles={colourstyles}
                          onChange={roleidchangeinputhandler}
                          isSearchable={true}
                        /> */}
                        <Input
                          type="text"
                          className="custom_input"
                          bg="transparent"
                          padding="12px"
                          placeholder="Designation"
                          border={
                            error.designation
                              ? "1px solid red"
                              : "1px solid grey"
                          }
                          rounded="3px"
                          width="100%"
                          id="designation"
                          onChange={addchildinputchangehandler}
                        />
                        {/* {error.roleId && (
                          <p className="text-danger text-start">
                            {error.roleId}
                          </p>
                        )} */}
                        {error.designation && (
                          <p className="text-danger text-start f-12">
                            {error.designation}
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <DateSelector
                          onChange={dateBirthHandler}
                          value={dob}
                          name="birthDate"
                          className={styles.date_picker}
                          calendarClassName={styles.dob_calendar}
                          maxDate={new Date()}
                        />
                        {error.birthDate && (
                          <p className="text-danger text-start">
                            {error.birthDate}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                  <div className="col-sm-6"></div>
                </div>
              )}
              <div className="text-center">
                <Button
                  className="custom_btn"
                  color="#ffffff"
                  border="none"
                  rounded="5px"
                  width="100px"
                  padding="8px"
                >
                  {loading ? (
                    <Loading
                      type="spin"
                      width={25}
                      height={25}
                      className="m-auto"
                    />
                  ) : role === "STUDENT" ? (
                    "Add Parent"
                  ) : role === "COMPANY" || role == "COMPANY_STAFF" ? (
                    "Add Staff"
                  ) : (
                    "Add Child"
                  )}
                </Button>
              </div>
              {/* <p>{error}</p> */}
            </div>
          </form>
        </div>
      </div>
    );
  };

  const [imagelogin, setImagelogin] = useState(true);
  const router = useRouter();
  const [show, setShow] = useState(true);
  const addchild = () => {
    dispatch(showModal(<Addmodal />));
    setTooltip(false);
  };
  const [tooltip, setTooltip] = useState(false);
  const [link, setLink] = useState(false);
  useEffect(() => {
    if (
      router.pathname === "/" ||
      router.pathname === "/loginwithotp" ||
      router.pathname === "/login" ||
      router.pathname === "/createAccount" ||
      router.pathname === "/verifyOtp" ||
      router.pathname === "/updateProfile/[slug]" ||
      router.pathname === "/student" ||
      router.pathname === "/company" ||
      router.pathname === "/case" ||
      router.pathname === "/news" ||
      router.pathname === "/terms&conditions" ||
      router.pathname === "/privacy-policy" ||
      router.pathname === "/terms&service" ||
      router.pathname === "/disclaimer" ||
      router.pathname === "/termsofuse" ||
      router.pathname === "/parent" ||
      router.pathname === "/role"
    ) {
      setShow(false);
    } else {
      setShow(true);
    }
    setTimeout(() => {
      setTooltip(false);
    }, [1500]);
    if (
      router.pathname === "/createProfile/[slug]" ||
      router.pathname === "/dashboard/[slug]" ||
      router.pathname === "/edit-profile"
    ) {
    } else {
    }

    if (
      router.pathname === "/createProfile/[slug]" ||
      router.pathname === "/updateProfile/[slug]" ||
      router.pathname === "/role"
    ) {
      setImagelogin(false);
    } else {
      setImagelogin(true);
    }
    if (router.pathname === "/dashboard/[slug]") {
      setLink(true);
    } else {
      setLink(false);
    }
  }, [router]);

  let mobilemenu = [
    {
      name: "Student",
      url: "/student",
    },
    {
      name: "Company",
      url: "/company",
    },
    {
      name: "Cases",
      url: "/",
    },
    {
      name: "News",
      url: "/",
    },
  ];
  let [sidebar, setSidebar] = useState(false);

  const handleshowSidebar = () => {
    setSidebar(true);
  };
  const handlehideSidebar = () => {
    setSidebar(false);
  };
  useEffect(() => {
    const logintoken = localStorage.getItem("accesstoken");
    if (logintoken) {
      getProfile();
    }
  }, []);

  useEffect(() => {
    const logintoken = localStorage.getItem("accesstoken");
    if (logintoken != null) {
      setShow(true);
    } else {
      setShow(false);
    }
  });
  // console.log(router.pathname === "/"?);

  return (
    <div
      className={` container ${
        router.pathname === "/" ? styles.navbar_home : styles.navbar
      } ${router.pathname === "/" ? "text-white" : ""}`}
    >
      <Head>
        {/* <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-NBPRMSYMN5"
        ></script>
        <script>
          window.dataLayer = window.dataLayer || []; function gtag()
          {dataLayer.push(arguments)}
          gtag('js', new Date()); gtag('config', 'G-NBPRMSYMN5');
        </script>
        <meta
          name="google-site-verification"
          content="mEQ_sOPkmauw4vYbugnUJfg6ygVrM9c1rSOlfy5Qx90"
        /> */}
      </Head>
      <div className={`${styles.menu}`}>
        <AiOutlineMenu size={30} onClick={handleshowSidebar} />
      </div>
      <div className={`${styles.nav_links}`}>
        <Link
          href={{
            pathname: `${
              show
                ? `${
                    role === "PARENT"
                      ? "/parent-dashboard"
                      : `/dashboard/${role}`
                  }`
                : "/student"
            }  `,
          }}
          className="link"
        >
          {show ? (
            <h6 className="f-14 pointer">Dashboard</h6>
          ) : (
            <h6 className={`f-14 pointer`}>Student</h6>
          )}
        </Link>
        <Link
          className="link f-14 fw-semibold mx-3"
          href={`${show ? "/student-dashboard" : "/company"}`}
        >
          {show ? (
            role === "PARENT" ||
            role === "COMPANY" ||
            role === "COMPANY_STAFF" ? (
              <></>
            ) : (
              <h6 className="f-14 pointer"> Internship </h6>
            )
          ) : (
            <h6 className={`f-14 pointer`}>Company</h6>
          )}
        </Link>
        {show ? (
          <></>
        ) : (
          <Link href="/parent" className="link f-14 fw-semibold">
            <h6 className={`f-14 `}>Parent</h6>
          </Link>
        )}
      </div>

      <div className={`${styles.logo_container}`}>
        <Link href="/">
          <Image
            src={router.pathname === "/" ? logowhite : logo}
            className={`${styles.logo} `}
            alt=""
            // width={50}
            // height={50}
          />
        </Link>
      </div>
      <div className="login_btn_container">
        <div className="d-flex">
          <div className={`${styles.nav_links}`}>
            {/* <Link href={"/"} className="link"> */}
            {/* <h6 className={` f-14 `}>Cases</h6> */}
            {/* </Link> */}
            {/* <Link href="/" className="link"> */}
            {/* <h6 className={` mx-3 f-14  `}>News</h6> */}
            {/* </Link> */}
          </div>
          {show ? (
            <div className={styles.tooltip_wrapper}>
              <div
                className="d-flex align-items-center pointer"
                onClick={() => {
                  setTooltip(!tooltip);
                }}
              >
                {imagelogin ? (
                  <div
                    className={` ${styles.login_image} d-flex align-items-center bordered justify-content-center p-1`}
                  >
                    <img src={menu.src} alt="" className="me-1" />
                    <img
                      src={role === "COMPANY" ? company.logo : myUser.avatar}
                      alt=""
                      width={30}
                      height={30}
                      className={`${styles.avatar}`}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/* {tooltip ? (
              <div>
                <div className={`${styles.tooltip} shadow pointer `}>
                  <p className="f-12 fw-semibold">
                    {" "}
                    {role === "COMPANY" ? company.companyName : myUser.name}
                  </p>

                  <Link
                    href={`
                  ${
                    role == "COMPANY" || role == "COMPANY_STAFF"
                      ? "/edit-companyprofile"
                      : role === "STUDENT"
                      ? `/edit-profile/${role}`
                      : "/edit-parentProfile"
                  }
              `}
                  >
                    <Button
                      border="1px solid #f51d51"
                      bg="transparent"
                      fs="10px"
                      className="mb-3"
                      rounded="8px"
                      width="100%"
                    >
                      View Profile
                    </Button>
                  </Link>

                  <Link
                    href={`${
                      role === "PARENT"
                        ? "/parent-dashboard"
                        : `/dashboard/${role}`
                    }   `}
                    className="link mb-2"
                  >
                    <h6 className="f-12"> Dashboard</h6>
                  </Link>
                  <h6
                    className="f-12 d-flex align-items-center"
                    onClick={addchild}
                  >
                    {role == "STUDENT" ? (
                      <></>
                    ) : role == "PARENT" ? (
                      <div className="d-flex align-items-center">
                        <h6 className="f-12">Add Child</h6>
                        <AiOutlinePlusCircle className="ms-2" />
                      </div>
                    ) : role == "COMPANY" || role == "COMPANY_STAFF" ? (
                      <div className="d-flex align-items-center">
                        <h6 className="f-12">Add Staff</h6>
                        <AiOutlinePlusCircle className="ms-2" />
                      </div>
                    ) : (
                      <></>
                    )}
                  </h6>

                  <div className="bordered"></div>

                  <h6 className="f-12 pointer" onClick={logouthandler}>
                    Logout
                  </h6>
                </div>
              </div>
            ) : (
              <></>
            )} */}
            </div>
          ) : (
            <Link href="/signup">
              <Button
                className={` custom_btn`}
                border="none"
                rounded="8px"
                padding="5px"
                width="100px"
                fw="600"
                marggin="0"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>

      <Offcanvas show={sidebar} onHide={handlehideSidebar}>
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          {mobilemenu.map((val, i) => (
            <Link
              href={val.url}
              className={`${styles.menu_links}`}
              key={`${i}`}
            >
              {val.name}
            </Link>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
      <Offcanvas
        show={tooltip}
        placement="end"
        onHide={() => setTooltip(false)}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="row border-bottom">
            <div className="col-sm-3">
              <CircularProgressbarWithChildren
                value={details.profileCompleteScore}
                maxValue={100}
                circleRatio={0.75}
                styles={buildStyles({
                  rotation: 1 / 2 + 1 / 8,
                  strokeLinecap: "butt",
                  trailColor: "#eee",
                  pathColor: "#f15d17",
                })}
                // text={`${details.profileCompleteScore}`}
              >
                <img
                  src={role === "COMPANY" ? company.logo : myUser.avatar}
                  alt=""
                  width={50}
                  height={50}
                  className={`${styles.avatar}`}
                />
                {/* <span className="f-8">{`${details.profileCompleteScore} %`}</span> */}
              </CircularProgressbarWithChildren>
            </div>
            <div className="col-sm-9">
              <h6 className="text-capitalize">
                {" "}
                {role === "COMPANY" ? company.companyName : myUser.name}
              </h6>
              <Link
                href={`${
                  role === "PARENT"
                    ? "/edit-parentProfile"
                    : role === "STUDENT"
                    ? `/edit-profile/${role}`
                    : role === "COMPANY_STAFF"
                    ? "/edit-companyStaff"
                    : "/edit-companyprofile"
                }`}
              >
                <Button
                  className={styles.profile_btn}
                  onClick={() => setTooltip(false)}
                >
                  View Profile
                </Button>
              </Link>
            </div>
          </div>

          <div className={`${styles.navlinks} mt-3`}>
            <Link
              href={`${
                role === "PARENT" ? "/parent-dashboard" : `/dashboard/${role}`
              }`}
              className={`${styles.hyperlink} mb-2`}
            >
              <span className="f-12 " onClick={() => setTooltip(false)}>
                {/* <img src={dashboard.src} alt="" className="me-2"/> */}
                <AiOutlineDashboard size={20} className="me-2" />
                Dashboard
              </span>
            </Link>
            {role === "COMPANY" ? (
              <span
                className={`${styles.hyperlink}  f-13 pointer`}
                onClick={addchild}
              >
                <AiOutlineUserAdd className="me-2" size={20} />
                Add Staff{" "}
              </span>
            ) : role === "PARENT" ? (
              <span
                className={`${styles.hyperlink}  f-13 pointer`}
                onClick={addchild}
              >
                <AiOutlineUserAdd className="me-2" size={20} />
                Add Child{" "}
              </span>
            ) : role === "COMPANY_STAFF" ? (
              <></>
            ) : (
              <Link href={"/student-dashboard"} className={styles.hyperlink}>
                <div className="ms-2">
                  <span className="f-14">
                    <GiBookshelf className="me-2 " />
                    Internships
                  </span>
                </div>
              </Link>
            )}
          </div>
          <Button
            className={styles.logout_btn}
            border="none"
            onClick={logouthandler}
            disabled={disable ? true : false}
          >
            <AiOutlineLogout size={20} className="me-2" />
            Logout
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Navbar;
