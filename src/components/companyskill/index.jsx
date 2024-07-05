import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Roboto_Slab } from "next/font/google";
import Image from "next/image";
import Button from "../button";
import { AiOutlineFileAdd } from "react-icons/ai";
import { VscEdit } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { AiOutlineEye } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
const roboto = Roboto_Slab({ subsets: ["latin"] });
const Companyskill = (props) => {
  const role = useSelector((state) => state.userdetails.group);

  // const [role, setRole] = useState("");
  // useEffect(() => {
  //   const userRole = localStorage.getItem("role");
  //   setRole(userRole);
  // });
  const user = useSelector((state) => state);

  const router = useRouter();

  const data = router.query;

  // const getCompanyDetail = (val, role) => {
  //   router.push({ pathname: `/suggestedcompanydetails/${val._id}` });
  // };
  // const getInternshipDetail = (val, role) => {
  //   if (role === "COMPANY") {
  //     router.push({
  //       pathname: `/latestinternshipdetails/${val._id}`,
  //     });
  //   } else {
  //   }
  // };

  return (
    <div className={`p-3 ${styles.wrapper_companySkill} ${props.className}`}>
      <h6 className="mb-3  fw-bold d-flex align-items-center justify-content-between ">
        <span>{props.heading}</span>
        <span>{props.icon}</span>
      </h6>
      {props.data.map((val, i) => {
        return (
          <div className="container-fluid p-0 my-3" key={`${i}`}>
            <div className="row ">
              <div className="col-sm-8 col-md-10 col-lg-8">
                <div className={"d-flex "}>
                  {val.logo ? (
                    <Image
                      src={val.logo}
                      alt=""
                      className={`${styles.logo_profile}`}
                      width={50}
                      height={50}
                    />
                  ) : val.avatar ? (
                    <Image
                      src={`${val.avatar}`}
                      alt=""
                      className={`${styles.logo_profile}`}
                      width={35}
                      height={35}
                    />
                  ) : (
                    <div className={`${styles.dot} mt-2`}></div>
                  )}
                  <div className="ms-2">
                    <p
                      className="fw-bold f-12 text-capitalize"
                      onClick={() => props.changePage(val)}
                    >
                      <span
                        className={`${role === "COMPANY" ? "" : "pointer"}`}
                      >
                        {val.companyName
                          ? val.companyName
                          : val.title
                          ? val.title
                          : val.name
                          ? val.name
                          : ""}
                      </span>
                      {/* </Link> */}
                    </p>
                    <p className="f-12">
                      {val.industry
                        ? val.industry
                        : val.location
                        ? val.location
                        : "Developer"}
                    </p>
                    <p className="f-12 text-orange">
                      {val.jobs
                        ? val.jobs
                        : val.experience
                        ? `${val.experience} year`
                        : "2 years"}
                    </p>

                    {/* <div>
                      {role == "STUDENT" ? (
                        <Link href="/suggestedcompanydetails">
                          <p className="f-12 text-orange pointer">view</p>
                        </Link>
                      ) : (
                        ""
                      )}
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="col-sm-4 col-md-6 col-lg-4">
                {val.button ? (
                  <Button
                    border="2px solid gray"
                    text="uppercase"
                    bg="transparent"
                    width="100%"
                  >
                    {val.button}
                  </Button>
                ) : (
                  <div className="text-end pointer">
                    {role == "COMPANY" || role === "COMPANY_STAFF" ? (
                      val.title ? (
                        <div>
                          <AiOutlineEye
                            className="me-2 mt-1"
                            color="black"
                            size={20}
                            onClick={() => props.changePage(val)}
                          />

                          <VscEdit onClick={() => props.editJobsModal(val)} />
                        </div>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                    {/* {props.icon } */}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Companyskill;
