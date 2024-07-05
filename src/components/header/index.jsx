import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import {
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlinePlusCircle,
  AiOutlineDashboard,
  AiOutlineUserAdd,
  AiOutlineUsergroupAdd,
  AiOutlineUser,
  AiOutlineClose,
} from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
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
import { BsFillEnvelopeAtFill, BsFillTelephoneFill } from "react-icons/bs";
import { USER_ROLES } from "@/utils/enum";

const Header = () => {
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
      userRole: `${
        role === USER_ROLES.STUDENT ? USER_ROLES.PARENT : USER_ROLES.STUDENT
      }`,
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
        role == USER_ROLES.STUDENT
          ? {
              fullName,
              email,
              salutation,
              userRole,
            }
          : role == USER_ROLES.COMPANY || role == USER_ROLES.COMPANY_STAFF
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
      if (role == USER_ROLES.STUDENT) {
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
      } else if (
        role == USER_ROLES.COMPANY ||
        role == USER_ROLES.COMPANY_STAFF
      ) {
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
      role == USER_ROLES.COMPANY || role == USER_ROLES.COMPANY_STAFF
        ? GetStaffselector()
        : "";
    }, [role]);
    return (
      <div>
        <div className="mt-5">
          <h5 className="text-center my-3">{`${
            role === USER_ROLES.STUDENT
              ? "Add Parent"
              : role === USER_ROLES.COMPANY || role == USER_ROLES.COMPANY_STAFF
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
                    {role === USER_ROLES.PARENT ? (
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
              {role === USER_ROLES.STUDENT ? (
                <></>
              ) : (
                <div className="row my-3">
                  <div className="col-sm-6">
                    <Label color="#000" className="my-3 f-13" fw="600">
                      {role === USER_ROLES.COMPANY ||
                      role == USER_ROLES.COMPANY_STAFF
                        ? "Designation"
                        : "Birth Date"}
                    </Label>
                    {role === USER_ROLES.COMPANY ||
                    role == USER_ROLES.COMPANY_STAFF ? (
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
                  ) : role === USER_ROLES.STUDENT ? (
                    "Add Parent"
                  ) : role === USER_ROLES.COMPANY ||
                    role == USER_ROLES.COMPANY_STAFF ? (
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
  const [show, setShow] = useState(false);
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
      name: "Parent",
      url: "/parent",
    },
    {
      name: "Company",
      url: "/company",
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
  const isLinkActive = (href) => {
    return router.pathname === href ? styles.activeLink : "link ";
  };
  const [showNavbar, setShowNavbar] = useState(false);
  return (
    <div
      className={` container p-1 ${
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
                    role === USER_ROLES.PARENT
                      ? "/parent-dashboard"
                      : `/dashboard/${role}`
                  }`
                : "/student"
            }  `,
          }}
          className={isLinkActive(
            show
              ? role === USER_ROLES.PARENT
                ? "/parent-dashboard"
                : `/dashboard/${role}`
              : "/student"
          )}
        >
          {show ? (
            <h6 className="f-14 pointer ">Dashboard</h6>
          ) : (
            <h6 className={`f-14 pointer`}>Student</h6>
          )}
        </Link>
        {/* {show ? (
          <Link
            href={`${
              role === "PARENT" ? "/parent-dashboard" : `/dashboard/${role}`
            }`}
            className="link"
          >
            <h6 className="f-14 pointer">Dashboard</h6>
          </Link>
        ) : (
          <Link
            href={"/student"}
            className={`${styles.navbar__links} ${
              router.pathname === "/" ? "text-white" : "text-dark"
            }`}
          >
            <h6 className={`f-14 pointer `}>Student</h6>
          </Link>
        )} */}
        {show ? (
          <></>
        ) : (
          <Link href="/parent" className={`${isLinkActive("/parent")} mx-3`}>
            <h6 className={`f-14 `}>Parent</h6>
          </Link>
        )}

        <Link
          className={`${isLinkActive(
            show ? "/student-dashboard" : "/company"
          )} `}
          href={`${show ? "/student-dashboard" : "/company"}`}
        >
          {show ? (
            role === USER_ROLES.PARENT ||
            role === USER_ROLES.COMPANY ||
            role === USER_ROLES.COMPANY_STAFF ? (
              <></>
            ) : (
              <h6 className="f-14 pointer ms-3"> Internship </h6>
            )
          ) : (
            <h6 className={`f-14 pointer`}>Company</h6>
          )}
        </Link>
        {/* {show ? (
          role
        ) : (
          <Link
            href={"/company"}
            className={`${styles.navbar__links} ${
              router.pathname === "/" ? "text-white" : "text-dark"
            } mx-3`}
          >
            <h6 className="f-14 pointer">Company</h6>
          </Link>
        )} */}
      </div>

      <div className={`${styles.logo_container}`}>
        <Link
          href={`${
            show
              ? role === USER_ROLES.PARENT
                ? "/parent-dashboard"
                : `/dashboard/${role}`
              : "/"
          }`}
        >
          <Image
            src={router.pathname === "/" ? logowhite : logo}
            className={`${styles.logo} ms-4 `}
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
                      src={
                        role === USER_ROLES.COMPANY
                          ? company.logo
                          : myUser.avatar
                      }
                      alt=""
                      width={30}
                      height={30}
                      className={styles.avatar}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            // <Link href="/signup">
            <Button
              className="d-flex align-items-center justify-content-center"
              border={`${
                router.pathname === "/" ? "1px solid #d7d7d7" : "1px solid #000"
              }`}
              rounded="50px"
              padding="5px"
              width="75px"
              height="35px"
              fw="600"
              margin="0"
              bg="transparent"
              onClick={() => setShowNavbar(true)}
            >
              <AiOutlineMenu
                color={router.pathname === "/" ? "#ffffff" : "#000000"}
                size={20}
                // className="me-1"
              />

              <AiOutlineUsergroupAdd
                color={router.pathname === "/" ? "white" : "#000"}
                size={20}
                // style={{
                //   border: `${
                //     router.pathname === "/"
                //       ? "1px solid #ffffff"
                //       : "1px solid #000000"
                //   }`,
                //   padding: "5px",
                //   borderRadius: "50%",
                // }}
              />
            </Button>
            // </Link>
          )}
        </div>
      </div>
      {/* Mobile view  */}
      <Offcanvas
        show={sidebar}
        onHide={handlehideSidebar}
        placement="top"
        className={styles.offCanvasTop}
      >
        <Offcanvas.Header className={styles.canvas_header_mobile}>
          <img src={logo.src} width={100} />

          <AiOutlineMenu
            size={30}
            onClick={() => {
              router.push("/");
              handlehideSidebar();
            }}
          />
        </Offcanvas.Header>
        <Offcanvas.Body className={styles.canvas_mobile}>
          {mobilemenu.map((val, i) => (
            <div onClick={handlehideSidebar}>
              <Link
                href={val.url}
                className={`${styles.menu_links}`}
                key={`${i}`}
              >
                {val.name}
              </Link>
            </div>
          ))}
          <div className={styles.close__button} onClick={handlehideSidebar}>
            <AiOutlineClose size={30} />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      {/* Mobile view  */}

      {/* After Login */}
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
                  src={
                    role === USER_ROLES.COMPANY ? company.logo : myUser.avatar
                  }
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
                {role === USER_ROLES.COMPANY
                  ? company.companyName
                  : myUser.name}
              </h6>
              <Link
                href={`${
                  role === USER_ROLES.PARENT
                    ? "/edit-parentProfile"
                    : role === USER_ROLES.STUDENT
                    ? `/edit-profile/${role}`
                    : role === USER_ROLES.COMPANY_STAFF
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
                role === USER_ROLES.PARENT
                  ? "/parent-dashboard"
                  : `/dashboard/${role}`
              }`}
              className={`${styles.hyperlink} mb-2`}
            >
              <span className="f-12 " onClick={() => setTooltip(false)}>
                {/* <img src={dashboard.src} alt="" className="me-2"/> */}
                <AiOutlineDashboard size={20} className="me-2" />
                Dashboard
              </span>
            </Link>
            {role === USER_ROLES.COMPANY ? (
              <span
                className={`${styles.hyperlink}   pointer`}
                onClick={addchild}
              >
                <AiOutlineUserAdd className="me-2" size={20} />
                Add Staff{" "}
              </span>
            ) : role === USER_ROLES.PARENT ? (
              <span
                className={`${styles.hyperlink}   pointer`}
                onClick={addchild}
              >
                <AiOutlineUserAdd className="me-2" size={20} />
                Add Child{" "}
              </span>
            ) : role === USER_ROLES.COMPANY_STAFF ||
              role === USER_ROLES.COMPANY ||
              role === USER_ROLES.PARENT ? (
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
      {/* After Login */}

      {/* before Login */}

      <Offcanvas
        placement="end"
        show={showNavbar}
        onHide={() => setShowNavbar(false)}
      >
        <Offcanvas.Header
          closeButton
          className={styles.header_offcanvas}
        ></Offcanvas.Header>
        <Offcanvas.Body className={styles.body_offCanvas}>
          <div>
            <div className="mb-5">
              <h4 className="my-2  fw-700">Why VROAR?</h4>
              <p>
                VROAR streamlines your journey. Students find opportunities,
                parents stay informed, and companies discover top talent
                effortlessly. Your path to success starts here.
              </p>
            </div>
            {/* Contact info */}
            <div>
              <h4 className="my-2 fw-700 text-capitalize">contact info</h4>
              <div>
                <p className="mb-2">
                  <BsFillTelephoneFill className="ms-1" />
                  <a className="ms-2 link" href="tel:+1(214)412-8345">
                    +1(214)412-8345
                  </a>
                </p>
                <p className="mb-2">
                  <BsFillEnvelopeAtFill className="ms-1" />
                  <a className="ms-2 link" href="mailto:info@vroar.ai">
                    info@vroar.ai
                  </a>
                </p>
                <p className="mb-2">
                  <MdLocationPin size={20} />
                  <span className="ms-2">Texas, USA</span>
                </p>
              </div>
            </div>
            <div className="border my-5"></div>
            <div>
              <Link href={"/signup"}>
                <Button
                  className="custom_btn "
                  width="100%"
                  fw="500"
                  rounded="8px"
                  padding="13px"
                  onClick={() => setShowNavbar(false)}
                >
                  Login
                </Button>
              </Link>
              <p className="f-12 mt-2" onClick={() => setShowNavbar(false)}>
                Your adventure starts with a simple
                <Link
                  className={`${styles.register} ms-1  text-capitalize  text-decoration-underline text-orange`}
                  href={"/signup"}
                >
                  Sign-up.
                </Link>
              </p>
            </div>
          </div>
          <div className={styles.copyright}>
            <p className="f-12 ">&#169; All Rights Reserved</p>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      {/* before Login */}
    </div>
  );
};

export default Header;
