import React from "react";
import url from "@/assessts/data/url";
import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Loading from "../loading";
import { useRouter } from "next/router";

const s3url = url.s3url;

const Education = (props) => {
  const router = useRouter();
  if (props.loading) {
    return <Loading type="spin" width={25} height={25} className="m-auto" />;
  } else {
    return (
      <div className="ms-1">
        <div className="container ">
          {props.data.map((val, i) => {
            return (
              <div className="row border-bottom p-2 " key={i}>
                <div className="col-sm-12">
                  <div className="row ">
                    <div className="col-sm-1">
                      <img
                        src={`${s3url}/logo/Vroar_Icon.svg`}
                        alt=""
                        width={"100%"}
                      />
                    </div>
                    <div className="col-sm-8 ">
                      <h6>{val.institution}</h6>
                      <div className="d-flex align-items-center">
                        <p className="f-12">{val.degree} , </p>
                        <p className="f-12">{val.fieldofstudy}</p>
                      </div>
                      {/* <p className="fw-semibold f-13 my-1">
                        Degree :{" "}
                        <span className="f-12 fw-normal">{val.degree}</span>
                      </p>
                      <p className="fw-semibold f-13 my-1">
                        Grade :{" "}
                        <span className="f-13 fw-normal">{val.grade}</span>
                      </p>
                      <p className="fw-semibold my-1 f-13">
                        Field :
                        <span className="f-12 fw-normal">
                          {val.fieldofstudy}
                        </span>
                      </p> */}
                    </div>
                    <div className="col-sm-2">
                      {router.pathname === "/details/education" ? (
                        <div className="d-flex align-items-center">
                          <AiOutlineEdit
                            className="mx-3 pointer"
                            size={20}
                            onClick={() => props.onEdit(val)}
                          />
                          <AiOutlineDelete
                            size={20}
                            onClick={() => props.onDelete(val)}
                            className="pointer"
                          />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Education;
