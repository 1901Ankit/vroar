import Input from "@/components/input";
import Loginbg from "@/components/login_background";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import styles from "./index.module.css";
import Label from "@/components/label";
import { AiOutlineEye } from "react-icons/ai";
import { toast } from "react-toastify";
import Button from "@/components/button";
import verifyControllers from "@/api/verify";
import { useRouter } from "next/router";
import Loading from "@/components/loading";
const ForgotPasswordOTP = () => {
  const [otp, setOTP] = useState("");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const submitHandler = (e) => {
    let body = {
      referenceId: localStorage.getItem("referenceId"),
      otp: otp,
      password: password,
    };
    e.preventDefault();
    setLoading(true);
    if (otp === "" || otp.length != 4) {
      toast.error("Please Enter valid OTP");
      setLoading(false);
    } else if (password === "") {
      toast.error("Please Enter Password");
      setLoading(false);
    } else {
      verifyControllers
        .verifyOtpForgotPassword(body)
        .then((res) => {
          toast.success(res.data.message);
          router.push("/login");
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <Loginbg>
        <div className="row">
          <div className="col-sm-5 m-auto text-center">
            <div>
              <h4 className="mb-3">Forgot Password</h4>
              <p>We have Sent One Time Password</p>
              <p>on your Email</p>
            </div>
            <form onSubmit={submitHandler}>
              <div>
                {/* <Label className="fw-semibold f-15 text-start">OTP</Label> */}
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

                <div className="text-start">
                  <Label className="fw-semibold mb-3">Password</Label>
                  <div className="d-flex align-items-center">
                    <Input
                      type="password"
                      className="custom_input"
                      width="100%"
                      padding="10px"
                      border="1px solid #eee"
                      bg="#eee"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* <div className={styles.eye}>
                      <AiOutlineEye />
                    </div> */}
                  </div>
                </div>
                <div className="my-3">
                  <Button
                    className="custom_btn"
                    padding="10px"
                    rounded="5px"
                    width="100%"
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
              </div>
            </form>
          </div>
        </div>
      </Loginbg>
    </div>
  );
};

export default ForgotPasswordOTP;
