import profileControllers from "@/api/profile";
import Button from "@/components/button";
import Input from "@/components/input";
import Loading from "@/components/loading";
import Loginbg from "@/components/login_background";
import { isEmail } from "@/utils/number";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [state, setState] = useState({
    contact: "",
  });
  const inputChangeHandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
    setError("");
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    if (state.contact === "") {
      setError("Please Enter valid Email");
      setLoading(false);
    }
    if (isEmail(state.contact)) {
      profileControllers
        .forgotPassword(state.contact)
        .then((res) => {
          localStorage.setItem("referenceId", res.data.data.referenceId);
          //   toast.error()
          toast.success(res.data.message);
          setLoading(false);
          router.push("/forgotpassword-OTP");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setLoading(false);
        });
    } else {
      setError("Entered email is not valid");
      setLoading(false);
    }
  };
  return (
    <div>
      <Head>
        <title>Forgot password</title>
      </Head>
      <Loginbg>
        <div className="row">
          <h5 className="text-center mb-4">Forgot password</h5>
          <div className="col-sm-5 m-auto text-center">
            <p>Enter your Email </p>
            <p className="text-capitalize">
              We will Send <span className="text-grey">one Time Password</span>{" "}
            </p>
            <form onSubmit={submitHandler}>
              <div className="my-3">
                <Input
                  className="custom_input"
                  padding="12px"
                  border={error ? "1px solid red" : "1px solid #eee "}
                  rounded="4px"
                  bg="#eee"
                  width="100%"
                  placeholder="Enter Your Email"
                  onChange={inputChangeHandler}
                  id="contact"
                />
                <p className="text-danger f-13 text-start">{error}</p>
              </div>
              <div className="text-center">
                <Button
                  tt="Capitalize"
                  fw="600"
                  className="custom_btn"
                  padding="8px"
                  width="100% "
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
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Loginbg>
    </div>
  );
};

export default ForgotPassword;
