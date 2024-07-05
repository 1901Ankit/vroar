import React, { useEffect, useState } from "react";
import Whitewrapper from "../whitewrapper";
import data from "@/assessts/data/data";
import Button from "../button";
import styles from "./index.module.css";
import Selectbar from "../selectbar";
import Input from "../input";
import companyControllers from "@/api/companyJobs";
import { toast } from "react-toastify";
import Loading from "../loading";
import { WORK_MODE } from "@/utils/enum";
import { useSelector } from "react-redux";
import Select from "react-select";
const Filter = (props) => {
  let [show, setShow] = useState(false);
  const [state, setState] = useState({
    title: "",
    workMode: "",
    location: "",
    skills: [],
  });
  const inputChangeHandler = (e) => {
    const { id, value } = e.target;
    setState({ ...state, [id]: value });
  };
  const skillHandler = (e) => {
    setState({ ...state, skills: e.map((val) => val.value) });
  };
  const role = useSelector((state) => state.userdetails.group);

  const [loading, setLoading] = useState(false);
  const filterforStudent = () => {
    let body = {
      search: state.title,
      workMode: state.workMode,
      location: state.location,
    };
    companyControllers
      .internshipFilterAndSorting(body)
      .then((res) => {
        props.setInternship(res.data.data.docs);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };
  const filterForCompany = () => {
    let body = {
      search: state.title,
      skills: JSON.stringify(state.skills),
    };

    companyControllers
      .getfiltereApplicant(body)
      .then((res) => {
        props.setCompanyApplicant(res.data.data.docs);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        let errMessage = err.message && err.response.data.message;
        toast.error(errMessage);
      });
  };

  const submitHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    if (role === "STUDENT") {
      filterforStudent();
    } else {
      filterForCompany();
    }
  };
  useEffect(() => {
    if (role === "COMPANY" || role === "COMPANY_STAFF") {
    } else {
      if (
        state.workMode === WORK_MODE.ON_SITE ||
        state.workMode === WORK_MODE.HIBRID
      ) {
        setShow(true);
      } else {
        setShow(false);
      }
    }
  }, [state]);
  const colourstyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "transparent",
      border: "1px solid #d7d7d7",
      fontSize: "13px",
    }),
  };

  return (
    <div className="my-5">
      <Whitewrapper className="p-3">
        <form onSubmit={submitHandler}>
          {/* <div className="row">
            <div className="col-sm-4">
              <Selectbar data={data.jobtype} placeholder={" Profile"} />
            </div>
            <div className="col-sm-4">
              <Selectbar data={data.experience} placeholder="Experience" />
            </div>

            <div className="col-sm-4">
              <Selectbar
                data={data.work}
                placeholder="Work Mode"
                onChange={showhandler}
              />
            </div>
            {show ? (
              <div className="col-sm-4 mt-3">
                <Selectbar data={data.location} placeholder="Location" />
              </div>
            ) : (
              <></>
            )}
          </div> */}
          <div className="row">
            <div className="col-sm-4">
              <Input
                type="text"
                placeholder="Search"
                width="100%"
                border="1px solid #d7d7d7"
                bg="transparent"
                padding="5px"
                rounded="5px"
                onChange={inputChangeHandler}
                id="title"
                fs="13px"
              />
            </div>
            <div className="col-sm-4">
              {role === "COMPANY" || role === "COMPANY_STAFF" ? (
                <Select
                  styles={colourstyles}
                  options={data.skillsOptions.map((val) => {
                    return {
                      value: val.value,
                      label: val.label,
                    };
                  })}
                  id="skills"
                  onChange={skillHandler}
                  isMulti={true}
                />
              ) : (
                <select
                  className={styles.job_location}
                  onChange={inputChangeHandler}
                  id="workMode"
                >
                  <option selected hidden>
                    Select Job Location..
                  </option>
                  <option value={WORK_MODE.REMOTE}>Remote</option>
                  <option value={WORK_MODE.ON_SITE}>On Site</option>
                  <option value={WORK_MODE.HIBRID}>Hybrid</option>
                </select>
              )}
            </div>
            {show ? (
              <div className="col-sm-4">
                <Input
                  type="text"
                  placeholder="Location"
                  width="100%"
                  border="1px solid #d7d7d7"
                  bg="transparent"
                  padding="5px"
                  rounded="5px"
                  onChange={inputChangeHandler}
                  id="location"
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="text-end mt-3">
            <Button
              className="custom_btn"
              border="none"
              color="#ffffff"
              width="150px"
              padding="5px"
              rounded="8px"
            >
              {loading ? (
                <Loading
                  type="spin"
                  width={25}
                  height={25}
                  className="m-auto"
                />
              ) : (
                "  Search"
              )}
            </Button>
          </div>
        </form>
      </Whitewrapper>
    </div>
  );
};

export default Filter;
