import Button from "@/components/button";
import Loginbg from "@/components/login_background";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import styles from "@/styles/signup.module.css";
import ReactFlagsSelect from "react-flags-select";
import countryData from "@/assessts/data/countries.json";
import countries from "@/assessts/data/country";
import countryFlag from "@/assessts/data/countryFlag";
import Input from "@/components/input";
import logo from "@/assessts/images/logo/Vroar_Icon.svg";
import google from "@/assessts/images/dashboard/googlecolor.png";
import email from "@/assessts/images/dashboard/email.png";
import password from "@/assessts/images/dashboard/password.png";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import Authcontrollers from "@/api/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Head from "next/head";
// import halfface from "@/assessts/images/logo/"
const Signup = () => {
  const router = useRouter();
  const [selected, setSelected] = useState("US");
  const [dialcode, setDialCode] = useState("+1");
  const onSelect = (e) => {
    setSelected(e);
    const dial_Code = countryData.find((country) => country.code == e);
    if (dial_Code) {
      setDialCode(dial_Code.dial_code);
    } else {
      console.log("no data found");
    }
  };
  const gmailLogin = () => {
    Authcontrollers.googleLogin()
      .then((res) => {
        router.push(res.data.data.url);
      })
      .catch((err) => {
        let errMessage = err.message || err.response.data.message;
        toast.error(errMessage);
      });
  };
  return (
    <div>
      <Head>
        <title>Sign Up</title>
      </Head>

      <div className={styles.desktop_page}>
        <div className={styles.signup}>
          <div className={`${styles.bg_circle} `}>
            <div className={`container-fluid ${styles.login_bg} shadow  `}>
              <div className="row">
                <div className="col-sm-6 p-0">
                  <div className={styles.bg_image}>
                    <div className="row">
                      <div className="col-sm-8 m-auto">
                        <div className="text-center">
                          <img src={logo.src} width={80} className="mb-3" />
                        </div>
                        <p className="text-white text-justify f-12 lh-base">
                          Students explore career-building internships,
                          companies find top talent, and parents follow their
                          child's promising path. Register now for a
                          collaborative platform that empowers everyone in the
                          education and career ecosystem.
                        </p>
                        <div className="text-start">
                          <Link href={"/createAccount"}>
                            <Button
                              className={` custom_btn text-capitalize f-12 mt-3`}
                              rounded="0px"
                              width="100%"
                              color="#000"
                              fs="15px"
                              padding="13px"
                            >
                              sign up with VROAR
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-sm-6 "
                  style={{ display: "grid", placeItems: "center" }}
                >
                  <div
                    className={styles.closeButton}
                    onClick={() => router.back()}
                  >
                    <AiOutlineClose />
                  </div>
                  <div className={styles.heading}>
                    <h3 className="mb-3 ">Sign in with</h3>

                    <Button
                      bg="transparent"
                      padding="8px"
                      width="75%"
                      border="1px solid #d7d7d7"
                      className="mt-2 text-capitalize "
                      rounded="0px"
                      fw="500"
                      color="#000000"
                      onClick={gmailLogin}
                    >
                      <div className="d-flex align-items-center  ">
                        <img src={google.src} width={15} />
                        <p className={` mx-2 `}>Google</p>
                      </div>
                    </Button>
                    <Link href={"/login"}>
                      <Button
                        bg="transparent"
                        padding="8px"
                        width="75%"
                        border="1px solid #d7d7d7"
                        className="my-3 text-capitalize "
                        rounded="0px"
                        fw="500"
                      >
                        <div className={"d-flex align-items-center"}>
                          <img src={email.src} width={15} className="me-2" />
                          <span className="text__dark">Email & Password</span>
                        </div>
                      </Button>
                    </Link>
                    <Link href={"/createAccount"}>
                      <Button
                        bg="transparent"
                        padding="8px"
                        width="75%"
                        border="1px solid #d7d7d7"
                        className=" text-capitalize "
                        rounded="0px"
                        fw="500"
                      >
                        <div className="d-flex align-items-center">
                          <img src={password.src} width={20} className="me-2" />
                          Phone/Email & OTP
                        </div>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mobile_page}>
        <div className={styles.signup_mobile}>
          <div className={`${styles.bg_circle} `}>
            <div className={`container-fluid ${styles.login_bg} shadow  `}>
              <div className="row">
                <div
                  className="col-sm-6 "
                  style={{ display: "grid", placeItems: "center" }}
                >
                  <div
                    className={styles.closeButton}
                    onClick={() => router.back()}
                  >
                    <AiOutlineClose />
                  </div>
                  <div className={styles.heading}>
                    <h3 className="mb-3 ">Sign in with</h3>

                    <Button
                      bg="transparent"
                      padding="8px"
                      width="100%"
                      border="1px solid #d7d7d7"
                      className="mt-2 text-capitalize "
                      rounded="0px"
                      fw="500"
                      color="#000000"
                      onClick={gmailLogin}
                    >
                      <div className="d-flex align-items-center  ">
                        <img src={google.src} width={15} />
                        <p className={` mx-2 `}>Google</p>
                      </div>
                    </Button>
                    <Link href={"/login"}>
                      <Button
                        bg="transparent"
                        padding="8px"
                        width="100%"
                        border="1px solid #d7d7d7"
                        className="my-3 text-capitalize "
                        rounded="0px"
                        fw="500"
                      >
                        <div className="d-flex align-items-center ">
                          <img src={email.src} width={15} className="me-2" />
                          Email & Password
                        </div>
                      </Button>
                    </Link>
                    <Link href={"/createAccount"}>
                      <Button
                        bg="transparent"
                        padding="8px"
                        width="100%"
                        border="1px solid #d7d7d7"
                        className=" text-capitalize "
                        rounded="0px"
                        fw="500"
                      >
                        <div className="d-flex align-items-center">
                          <img src={password.src} width={20} className="me-2" />
                          Phone/Email & OTP
                        </div>
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="col-sm-6 ">
                  <div className={styles.mobile_bg_image}>
                    <div className="row">
                      <div className="col-sm-8 m-auto">
                        <div className="text-center">
                          <img src={logo.src} width={80} className="mb-3" />
                        </div>
                        <p className="text-white text-justify f-12 lh-base p-3">
                          Students explore career-building internships,
                          companies find top talent, and parents follow their
                          child's promising path. Register now for a
                          collaborative platform that empowers everyone in the
                          education and career ecosystem.
                        </p>
                        <div className="text-center">
                          <Link href={"/createAccount"}>
                            <Button
                              className="custom_btn text-capitalize f-12 mt-3"
                              rounded="0px"
                              width="75%"
                              fs="15px"
                              padding="13px"
                            >
                              sign up with vroar
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
