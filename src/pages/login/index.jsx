import React, { useState } from "react";
import styles from "./login.module.css";
import { Roboto_Slab } from "next/font/google";
import Button from "@/components/button";
import { FcGoogle } from "react-icons/fc";
import Input from "@/components/input";
import Loginbg from "@/components/login_background";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { loginvalidation } from "@/utils/validation";
import Authcontrollers from "@/api/auth";
import { toast } from "react-toastify";
import Loading from "@/components/loading";
import { isEmail } from "@/utils/number";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/reducers/user";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const roboto = Roboto_Slab({ subsets: ["latin"], weight: "500" });
const Loginwithemail = () => {
  const router = useRouter();

  let [state, setState] = useState({
    email: "",
    password: "",
  });

  const [formerr, setFormerr] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const loadinghandler = () => {
    setLoading(true);
    setDisable(true);
  };
  const inputchangehandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
    setError("");
    setFormerr({
      ...formerr,
      [id]:
        id === "email"
          ? !isEmail(value)
            ? "Please Provide Valid Email"
            : ""
          : "",
    });
  };
  const dispatch = useDispatch();
  const { email, password } = state;

  const logindetails = () => {
    let body = {
      email,
      password,
    };
    Authcontrollers.login(body)
      .then((res) => {
        toast.success(res.data.message);
        dispatch(login({ role: res.data.data.group, isAuthenticated: true }));
        localStorage.setItem("accesstoken", res.data.data.accessToken);
        localStorage.setItem("refreshtoken", res.data.data.refreshToken);
        localStorage.setItem("group", res.data.data.group);
        router.push(
          res.data.data.group === "PARENT"
            ? {
                pathname: `/parent-dashboard`,
              }
            : {
                pathname: `/dashboard/${res.data.data.group}`,
              }
        );
        setLoading(false);
        setDisable(false);
        localStorage.setItem("companytoken", res.data.data.company);
      })
      .catch((err) => {
        // console.log(err);
        let errMessage = err.message && err.response.data.message;
        toast.error(errMessage);
        setLoading(false);
        setDisable(false);
      });
  };
  const callbackGoogle = (value) => {
    Authcontrollers.googleLoginCallback(value)
      .then((res) => {
        // console.log(res)
        if (res.data.data.group == null) {
          localStorage.setItem("verifiedToken", res.data.data.accessToken);
          router.push("/role");
        } else {
          localStorage.setItem("accesstoken", res.data.data.accessToken);
          res.data.data.group === "PARENT"
            ? router.push("/parent-dashboard")
            : router.push(`/dashboard/${res.data.data.group}`);
        }
      })
      .catch((err) => {
        console.log("tfgh", err);
      });
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
  const [error, setError] = useState("");
  const submithandler = (e) => {
    e.preventDefault();
    loadinghandler();
    if (loginvalidation(state, setFormerr, formerr)) {
      logindetails();
    } else {
      setDisable(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    router.query.code ? callbackGoogle(router.query.code) : () => {};
  }, [router.query.code]);

  useEffect(() => {
    if (localStorage.getItem("accesstoken")) {
      router.push("/");
    }
  }, []);
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <div className="my-5">
        <Loginbg>
          <div className=" d-flex align-items-center justify-content-end ">
            {/* <AiOutlineClose
              size={20}
              className="pointer"
              onClick={() => {
                router.push("/");
              }}
            /> */}
          </div>
          <div className="row">
            <div className="col-sm-5 text-center m-auto">
              <h3 className="mb-3">Future is Now</h3>
              <p className="f-13 fw-semibold mb-2">
                Navigate Your Future - Start Your Journey Here.
              </p>
              {/* <Button
                bg="transparent"
                padding="8px"
                width="100%"
                border="2px solid #eee"
                className="my-3"
                onClick={gmailLogin}
              >
                <div className="d-flex align-items-center justify-content-center">
                  <FcGoogle size={20} />
                  <p className={`${roboto.className} mx-2 text-grey`}>
                    Sign in with Google
                  </p>
                </div>
              </Button>
              <p className="mb-3">or</p> */}
              <form onSubmit={submithandler}>
                <Input
                  bg="#eee"
                  type="email"
                  id="email"
                  width="100%"
                  padding="12px"
                  border={formerr.email ? "1px solid red" : "1px solid grey"}
                  rounded="3px"
                  placeholder="Type Your Email"
                  className={`${styles.login_input} ${
                    formerr.email ? "mb-2" : "mb-3"
                  }`}
                  onChange={inputchangehandler}
                />
                {formerr.email && (
                  <p className="text-danger text-start mb-2">{formerr.email}</p>
                )}
                <Input
                  bg="#eee"
                  type="password"
                  id="password"
                  width="100%"
                  padding="10px"
                  border={formerr.password ? "1px solid red" : "1px solid grey"}
                  rounded="3px"
                  placeholder="Type Your Password"
                  className={`${styles.login_input}`}
                  onChange={inputchangehandler}
                />
                {formerr.password && (
                  <p className="text-danger text-start mb-2">
                    {formerr.password}
                  </p>
                )}
                <Button
                  className="custom_btn mb-2 text-center"
                  width="100%"
                  fw="600"
                  padding="8px"
                  rounded="0px"
                  disabled={disable}
                >
                  {loading ? (
                    <div className="text-center m-auto">
                      <Loading
                        type={"spin"}
                        width={25}
                        height={25}
                        className="m-auto"
                        color="#f15d17"
                      />
                    </div>
                  ) : (
                    "Log in"
                  )}
                </Button>
              </form>
              {/* <Link href={"/createAccount"}>
                <Button
                  border="2px solid #eee"
                  bg="#eee"
                  padding="8px"
                  className="mb-2"
                  fw="600"
                  width="100%"
                >
                  Create Account
                </Button>
              </Link> */}
              <Link href={"/forgot-Password"} className="link">
                <div className="text-start">
                  <span className="text-decoration-underline pointer f-12 fw-semibold">
                    Forgot your password?
                  </span>
                </div>
              </Link>
            </div>
          </div>

          <p className="text-center text-danger ">{error}</p>
        </Loginbg>
      </div>
    </div>
  );
};

export default Loginwithemail;
