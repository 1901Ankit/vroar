import Input from "@/components/input";
import Loginbg from "@/components/login_background";
import React, { useState } from "react";
import styles from "./index.module.css";
import Button from "@/components/button";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Authcontrollers from "@/api/auth";
import { isEmail, isNumber, isPhonenumber } from "@/utils/number";
import Head from "next/head";
import Loading from "@/components/loading";
import countryPhone from "@/assessts/data/country";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReactFlagsSelect from "react-flags-select";
import countryData from "../../assessts/data/countries.json";
import countries from "@/assessts/data/country";
import countryFlag from "@/assessts/data/countryFlag";
const Loginwithotp = () => {
  const router = useRouter();

  let [contact, setContact] = useState({
    identity: "",
    countryCode: "",
  });
  let [country, setCountry] = useState(false);
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

  const inputhandler = (e) => {
    let { id, value } = e.target;
    if (value == "") {
      setCountry(false);
    } else {
      if (isNumber(value)) {
        setContact({ ...contact, [id]: value });
        setCountry(true);
      } else {
        setContact({ ...contact, [id]: value });
        setCountry(false);
      }
    }
    setError("");
  };
  const [error, setError] = useState("");
  let { identity, countryCode } = contact;
  const validation = () => {
    if (identity === "") {
      toast.error("Please Enter Mobile or Email ");
      return false;
    } else {
      return true;
    }
  };

  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);

  const loadingHandler = () => {
    setLoading(true);
    setDisable(true);
  };
  const countryCodeHandler = (e) => {
    setContact({ ...contact, countryCode: e.value });
  };
  const Submithandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setDisable(true);

    if (country) {
      if (!isPhonenumber(identity)) {
        setError("Please Enter Valid phone!");
        setLoading(false);
        setDisable(false);
        return;
      }
    } else {
      if (!isEmail(identity)) {
        setError("Please Enter valid Email!");
        setLoading(false);
        setDisable(false);
        return;
      }
    }

    const body = isNumber(identity)
      ? {
          identity: identity,
          countryCode: dialcode,
        }
      : {
          identity: identity,
        };
    if (validation()) {
      Authcontrollers.register(body)
        .then((res) => {
          localStorage.setItem("referenceid", res.data.data.referenceId);
          router.push(
            {
              pathname: "/verifyOtp",
              query: { identity },
            },
            `/verifyOtp`
          );
          setLoading(false);
          setDisable(false);
        })
        .catch((err) => {
          let error = err.message || err.response.data.message;
          // console.log(err)
          setError(error);
          setLoading(false);
          setDisable(false);
        });
    } else {
      setLoading(false);
      setDisable(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Create Account</title>
      </Head>
      <Loginbg>
        <div className="row p-5">
          <div className="col-sm-5 text-center m-auto">
            <h4 className="mb-3 fw-bold">Future is Now!</h4>
            {/* <h5 className="mb-3 fw-bold">Verification</h5> */}
            <div className="mb-3">
              <p className="text-capitalize text-grey">
                {" "}
                We will send you{" "}
                <span className="fw-semibold">One time password</span>{" "}
              </p>
              <p className="text-capitalize text-grey">
                On Your Phone Number(USA Only)/ Email Address
                {/* on Your Email Address */}
              </p>
              {/* <p className="f-13 fw-semibold mt-2">
                You can Login/Signup as Student/Company/Parents.
              </p> */}
            </div>
            <form onSubmit={Submithandler}>
              <div className="d-flex align-items-center ">
                {country ? (
                  <ReactFlagsSelect
                    searchable={true}
                    onSelect={onSelect}
                    selected={selected}
                    showSecondarySelectedLabel={false}
                    showSecondaryOptionLabel={true}
                    showSelectedLabel={true}
                    showOptionLabel={true}
                    countries={countries}
                    customLabels={countryFlag}
                    selectedSize={13}
                    optionsSize={13}
                    className={styles.flags_select}
                    fullWidth={true}
                  />
                ) : (
                  // <></>
                  <div></div>
                )}

                <Input
                  className={`${styles.input_otp} mb-3`}
                  placeholder="Type Email Address or Phone Number"
                  border="none"
                  padding="12px"
                  bg="#d7d7d7"
                  width="100%"
                  id="identity"
                  onChange={inputhandler}
                  type="text"
                  maxLength={50}
                />
              </div>
              <p className="text-danger text-start mb-3">{error}</p>

              <Button
                fw="600"
                className="custom_btn"
                border="1px solid #f15d17"
                padding="12px"
                rounded="0px"
                width="100% "
                disabled={disable}
              >
                {loading ? (
                  <Loading
                    type="spin"
                    width={20}
                    height={20}
                    className="m-auto"
                  />
                ) : (
                  "Get OTP"
                )}
              </Button>
            </form>
            {/* <p
              onClick={() => router.push("/login")}
              className="text-start f-13 my-2 fw-semibold pointer"
            >
              Already Have an Account?
              <span className="text-orange ms-1">Login</span>
            </p> */}
          </div>
        </div>
      </Loginbg>
    </div>
  );
};

export default Loginwithotp;
