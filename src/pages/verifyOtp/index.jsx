import Input from "@/components/input";
import Loginbg from "@/components/login_background";
import React, { useState } from "react";
import styles from "./index.module.css";
import Button from "@/components/button";
import { toast } from "react-toastify";
import Authcontrollers from "@/api/auth";
import { useRouter } from "next/router";
import Head from "next/head";
import OTPInput from "react-otp-input";
import Loading from "@/components/loading";
import { isEmail } from "@/utils/number";
import { useEffect } from "react";
import { USER_ROLES } from "@/utils/enum";
const Verifyotp = () => {
  const router = useRouter();
  let [otp, setOTP] = useState("");

  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);

  const loadingHandler = () => {
    setDisable(true);
    setLoading(true);
  };
  const closeLoading = () => {
    setDisable(false);
    setLoading(false);
  };
  const submithandler = (e) => {
    e.preventDefault();
    loadingHandler();
    if (otp === "") {
      toast.error("Please Enter OTP");
      closeLoading();
      return false;
    } else {
      let body = {
        otp: otp,
        referenceId: localStorage.getItem("referenceid"),
      };
      Authcontrollers.verifyotp(body)
        .then((res) => {
          toast.success(res.data.message);
          // console.log(res);

          localStorage.setItem("group", res.data.data.group);
          localStorage.setItem(
            `${res.data.data.group === null ? "verifiedToken" : "accesstoken"}`,
            res.data.data.accessToken
          );
          localStorage.setItem("new", res.data.data.isNewUser);
          res.data.data.group == null
            ? router.push("/role")
            : res.data.data.group === USER_ROLES.PARENT
            ? router.push("/parent-dashboard")
            : router.push(`/dashboard/${res.data.data.group}`);
          closeLoading();
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          closeLoading();
        });
    }
  };
  const [message, setMessage] = useState("");
  useEffect(() => {
    localStorage.setItem(
      "identity",
      isEmail(router.query.identity) ? "Email" : "Phone"
    );
    const identity = localStorage.getItem("identity");
    if (identity == "Email") {
      setMessage("Email");
    } else {
      setMessage("SMS");
    }
  }, []);
  return (
    <div>
      <Head>
        <title>Verify OTP</title>
      </Head>
      <Loginbg>
        <div className="row">
          <div className="col-sm-5 m-auto shadow text-center p-5">
            <div className="mb-4">
              <h4 className="mb-4">Verify OTP</h4>
              {/* <h5 className="fw-semibold  text-dark">Verification</h5> */}
              <p className="text-capitalize f-13 mt-1 text-grey">
                You will Get OTP <span className="text-lowercase">via</span>
                <span className="text-dark fw-semibold ms-1">
                  {message}
                </span>{" "}
              </p>
            </div>
            <div>
              <form onSubmit={submithandler}>
                <OTPInput
                  renderInput={(props) => (
                    <input
                      {...props}
                      className={`${styles.verify_otp} mb-4 `}
                    />
                  )}
                  onChange={setOTP}
                  inputType="number"
                  value={otp}
                />

                <Button
                  className="custom_btn f-12 fw-bold"
                  border="1px solid #f15d17"
                  padding="12px"
                  width="100%"
                  rounded="0px"
                >
                  {loading ? (
                    <Loading
                      type="spin"
                      width={30}
                      height={30}
                      className="m-auto"
                    />
                  ) : (
                    "Verify"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Loginbg>
    </div>
  );
};

export default Verifyotp;
