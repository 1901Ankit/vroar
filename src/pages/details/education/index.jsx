import profileControllers from "@/api/profile";
import Button from "@/components/button";
import Education from "@/components/education";
import Input from "@/components/input";
import Label from "@/components/label";
import Loading from "@/components/loading";
import { hideModal, showModal } from "@/redux/reducers/modal";
import moment from "moment";
import styles from "./index.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DatePicker from "react-date-picker";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Educationdetails = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const getUserDetails = () => {
    profileControllers
      .getProfile()
      .then((res) => {
        setData(res.data.data.education);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(true);
        console.log(err);
      });
  };
  const EditEducation = ({ value }) => {
    const [state, setState] = useState({
      institution: value.institution,
      current: value.current,
      degree: value.degree,
      description: value.description,
      fieldofstudy: value.fieldofstudy,
      from: moment(value.from).format("L"),
      grade: value.grade,
      to: moment(value.to).format("L"),
    });
    const inputHandler = (e) => {
      let { id, value } = e.target;
      setState({ ...state, [id]: value });
    };
    const checkHandler = (e) => {
      setState({ ...state, current: e.target.checked });
    };
    let fromDate = value.from ? value.from : "";
    const fromDateHandler = (e) => {
      setState({ ...state, from: moment(e).format("YYYY-MM-DD") });
      fromDate = e;
    };
    let toDate = value.to ? value.to : "";
    const toDateHandler = (e) => {
      setState({ ...state, to: moment(e).format("YYYY-MM-DD") });
      toDate = e;
    };
    const [loading, setLoading] = useState(false);
    const editEducation = () => {
      setLoading(true);
      let body =
        state.current == true
          ? {
              current: state.current,
              degree: state.degree,
              description: state.description,
              fieldofstudy: state.fieldofstudy,
              from: state.from,
              grade: state.grade,
              institution: state.institution,
              _id: value._id,
            }
          : {
              current: state.current,
              degree: state.degree,
              description: state.description,
              fieldofstudy: state.fieldofstudy,
              from: state.from,
              grade: state.grade,
              institution: state.institution,
              to: state.to,
              _id: value._id,
            };
      profileControllers
        .addEducation(body)
        .then((res) => {
          setLoading(false);
          toast.success(res.data.message);
          getUserDetails();
          dispatch(hideModal());
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    };
    const SubmitHandler = (e) => {
      e.preventDefault();
      editEducation();
    };

    return (
      <div>
        <div className="border-bottom mb-2">
          <h4>Edit Education</h4>
        </div>
        <p className="f-12 text-danger">* indicates Required</p>

        <form onSubmit={SubmitHandler}>
          <div className="row mb-2">
            <div className="col-sm-6">
              <Label className="fw-semibold f-13 mb-2">Institute Name*</Label>
              <Input
                type="text"
                border="1px solid #000"
                className="custom_input"
                rounded="8px"
                width="100%"
                padding="10px"
                bg="transparent"
                id="institution"
                value={state.institution}
                onChange={inputHandler}
              />
            </div>
            <div className="col-sm-6">
              <Label className="fw-semibold f-13 mb-2">Field of Study*</Label>
              <Input
                type="text"
                border="1px solid #000"
                className="custom_input"
                rounded="8px"
                bg="transparent"
                width="100%"
                padding="10px"
                id="fieldofstudy"
                onChange={inputHandler}
                value={state.fieldofstudy}
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-6">
              <Label className="fw-semibold f-13 mb-2">Grade*</Label>
              <Input
                type="text"
                border="1px solid #000"
                className="custom_input"
                bg="transparent"
                rounded="8px"
                width="100%"
                padding="10px"
                onChange={inputHandler}
                id="grade"
                value={state.grade}
              />
            </div>
            <div className="col-sm-6">
              <Label className="fw-semibold f-13 mb-2">Degree*</Label>
              <Input
                type="text"
                border="1px solid #000"
                bg="transparent"
                className="custom_input"
                rounded="8px"
                width="100%"
                padding="10px"
                id="degree"
                onChange={inputHandler}
                value={state.degree}
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-6">
              <Label className="fw-semibold f-13 mb-2">Start Date*</Label>
              <DatePicker
                name="from"
                value={fromDate}
                onChange={fromDateHandler}
                className={styles.date_picker}
                calendarClassName={styles.dob_calendar}
              />
            </div>
            <div className="col-sm-6">
              <Label className="fw-semibold f-13 mb-2">End Date*</Label>
              <DatePicker
                name="from"
                value={toDate}
                onChange={toDateHandler}
                className={styles.date_picker}
                calendarClassName={styles.dob_calendar}
              />
            </div>
            <div className="d-flex align-items-center mb-2 mt-2">
              <input
                className="custom_input me-2"
                id="current"
                type="checkbox"
                bg="transparent"
                border="1px solid #000"
                onChange={checkHandler}
                checked={state.current}
              />
              <Label for="current"> Currently Studying </Label>
            </div>
            <div className="row mb-2">
              <div className="col-sm-12">
                <Label>Description</Label>
                <textarea
                  id="description"
                  value={state.description}
                  className="textArea"
                />
              </div>
            </div>
            <div className="text-center">
              <Button
                className="custom_btn shadow"
                width="150px"
                padding="8px"
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
                  "Submit"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  };
  const editEducation = (value) => {
    dispatch(showModal(<EditEducation value={value} />));
  };
  const DeleteEducation = ({ value }) => {
    const [loading, setLoading] = useState(false);
    const deleteEducation = (value) => {
      setLoading(true);
      profileControllers
        .deleteEducation(value)
        .then((res) => {
          toast.success(res.data.message);
          setLoading(false);
          dispatch(hideModal());
          getUserDetails();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return (
      <div>
        <div className="border-bottom mb-2">
          {/* <h4>Delete Education</h4> */}
        </div>

        <h5 className="my-2">You Want to delete this Education?</h5>
        <div className="d-flex align-items-center justify-content-evenly my-2">
          <Button
            bg="green"
            color="#ffffff"
            border="none"
            rounded="8px"
            width="150px"
            padding="5px"
            onClick={() => deleteEducation(value)}
          >
            {loading ? (
              <Loading type="spin" width={25} height={25} className="m-auto" />
            ) : (
              "Yes"
            )}
          </Button>
          <Button
            bg="red"
            color="#ffffff"
            border="none"
            rounded="8px"
            width="150px"
            padding="5px"
            onClick={() => dispatch(hideModal())}
          >
            No
          </Button>
        </div>
      </div>
    );
  };
  const deleteEducation = (value) => {
    dispatch(showModal(<DeleteEducation value={value._id} />));
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Education</title>
      </Head>
      <div className="border-bottom p-2">
        <FaArrowLeft onClick={() => router.back()} className="pointer" />
      </div>
      <div className="p-2">
        <Education
          data={data}
          loading={loading}
          onEdit={editEducation}
          onDelete={deleteEducation}
        />
      </div>
    </div>
  );
};

export default Educationdetails;
