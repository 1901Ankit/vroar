import React, { useRef, useState } from "react";
import {
  PolarArea,
  getDatasetAtEvent,
  getElementAtEvent,
} from "react-chartjs-2";
import styles from "./index.module.css";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import profileControllers from "@/api/profile";
import { useEffect } from "react";
import Button from "../button";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
const PolarChart = () => {
  const [skillData, setSkillData] = useState([]);
  const getSkillRating = () => {
    profileControllers
      .getStudentSkillRating()
      .then((res) => {
        setSkillData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [show, setShow] = useState(false);
  const ref = useRef();
  const data = {
    labels: skillData.map((val) => val.skill),
    datasets: [
      {
        label: "Skill Rating",
        data: skillData.map((val) => val.rating),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const [recommended, setRecommended] = useState([]);
  const userInfo = (event, elements) => {
    if (elements.length === 0) {
    } else {
      const selectedIndex = elements[0].index;
      const selectedLabel = data.labels[selectedIndex];
      const selectedValue = data.datasets[0].data[selectedIndex];
      setRecommended(
        skillData.filter((label) => label.skill === selectedLabel)
      );
      setShow(true);
    }
  };
  const CheckChangehandler = (e) => {
    // console.log(e.target.value);
  };

  useEffect(() => {
    getSkillRating();
  }, []);
  return (
    <div className={styles.chart}>
      <PolarArea
        ref={ref}
        data={data}
        options={{
          plugins: {
            tooltip: {
              position: "average",
              xAlign: "center",
            },
            legend: {
              display: true,
              position: "bottom",
              align: "start",
            },
          },
          onClick: userInfo,
        }}
      />

      <div className="text-center">
        {show ? (
          <div className={styles.unacquired_skills_wrapper}>
            {recommended.map((val) => {
              return (
                <div className={styles.unacquired_skills}>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center">
                      <Button
                        height="10px"
                        width="10px"
                        className="custom_btn me-2"
                        rounded="0px"
                      ></Button>
                      <h6 className="f-13  text-start">{val.skill}</h6>
                    </div>
                    <span
                      onClick={() => setShow(false)}
                      className="me-2 pointer"
                    >
                      X
                    </span>
                  </div>
                  {val.recommendation.map((val) => (
                    <div className="d-flex align-items-center">
                      <input
                        type="checkbox"
                        id={val}
                        className="me-2"
                        onChange={CheckChangehandler}
                      />
                      <p className="f-12 text-justify">{val}</p>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default PolarChart;
