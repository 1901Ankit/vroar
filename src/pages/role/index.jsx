import Loginbg from "@/components/login_background";
import Image from "next/image";
import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import student from "../../assessts/images/profile/avatar.jpg";
import parent from "../../assessts/images/profile/Parents.jpg";
import styles from "./index.module.css";
import Button from "@/components/button";
import { useRouter } from "next/router";
import Head from "next/head";
import { toast } from "react-toastify";
const Role = () => {
  const router = useRouter();
  const [selectcompany, setSelectedcompany] = useState(false);
  const [selectstudent, setSelectedstudent] = useState(false);
  const [selectparent, setSelectedparent] = useState(false);
  const [studentflip, setStudentFlip] = useState(false);

  const studentFlipped = () => {
    setStudentFlip(!studentflip);
  };
  const [parentflip, setParentFlip] = useState(false);
  const parentFlipped = () => {
    setParentFlip(!parentflip);
  };
  const [companyflip, setCompanyFlip] = useState(false);
  const companyFlipped = () => {
    setCompanyFlip(!companyflip);
  };
  const [role, setRole] = useState("Select Your Role");
  const roleSelector = (value) => {
    setRole(value);
    if (value === "COMPANY") {
      setSelectedcompany(true);
      setSelectedstudent(false);
      setSelectedparent(false);
    } else if (value === "PARENT") {
      setSelectedcompany(false);
      setSelectedstudent(false);
      setSelectedparent(true);
    } else {
      setSelectedcompany(false);
      setSelectedstudent(true);
      setSelectedparent(false);
    }
  };
  const roleSelected = () => {
    if (role === "Select Your Role") {
      toast.error("Please Select your Role");
    } else {
      router.push(`/createProfile/${role}`);
    }
  };
  return (
    <div>
      <Head>
        <title>Select Role</title>
      </Head>
      <Loginbg>
        <div className="container">
          <div className="row">
            <h4 className="text-center text-orange text-capitalize mb-4">
              {role}
            </h4>
            <div className="col-sm-9 m-auto">
              <div className="row">
                <div className="col-sm-4 col-md-4 col-lg-4 text-center">
                  <ReactCardFlip isFlipped={studentflip}>
                    <img
                      src={
                        "https://vroar-prod.s3.us-west-1.amazonaws.com/images/profile/student_profileAvatar.jpeg"
                      }
                      className={`${styles.image_role} ${
                        selectstudent ? styles.role_border : ""
                      }`}
                      onMouseOver={studentFlipped}
                      onClick={() => roleSelector("STUDENT")}
                    />
                    <div
                      className={`${styles.rounded_section} ${
                        selectstudent ? styles.role_border : ""
                      }`}
                      onMouseLeave={studentFlipped}
                      onClick={() => roleSelector("STUDENT")}
                    >
                      Student
                    </div>
                  </ReactCardFlip>
                </div>
                <div className="col-sm-4 text-center">
                  <ReactCardFlip isFlipped={parentflip}>
                    <img
                      src={
                        "https://vroar-prod.s3.us-west-1.amazonaws.com/images/profile/family.jpg"
                      }
                      className={`${styles.image_role} ${
                        selectparent ? styles.role_border : ""
                      }`}
                      onMouseOver={parentFlipped}
                      onClick={() => roleSelector("PARENT")}
                    />
                    <div
                      className={`${styles.rounded_section} ${
                        selectparent ? styles.role_border : ""
                      }`}
                      onMouseLeave={parentFlipped}
                      onClick={() => roleSelector("PARENT")}
                    >
                      parents
                    </div>
                  </ReactCardFlip>
                </div>
                <div className="col-sm-4 text-center">
                  <ReactCardFlip isFlipped={companyflip}>
                    <img
                      src={
                        "https://cdn-icons-png.flaticon.com/128/4270/4270090.png"
                      }
                      className={`${styles.image_role} ${
                        selectcompany ? styles.role_border : ""
                      }`}
                      onMouseOver={companyFlipped}
                      onClick={() => roleSelector("COMPANY")}
                    />
                    <div
                      className={`${styles.rounded_section} ${
                        selectcompany ? styles.role_border : ""
                      }`}
                      onMouseLeave={companyFlipped}
                      onClick={() => roleSelector("COMPANY")}
                    >
                      COMPANY
                    </div>
                  </ReactCardFlip>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center my-3">
            <Button
              className="custom_btn"
              border="none"
              fw="500"
              rounded="8px"
              padding="12px"
              width="100px"
              onClick={roleSelected}
            >
              Submit
            </Button>
          </div>
        </div>
      </Loginbg>
    </div>
  );
};

export default Role;
