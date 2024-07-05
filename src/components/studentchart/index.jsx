import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import student from "../../assessts/images/homepage/08.png";
import Image from "next/image";
import styles from "./index.module.css";
ChartJS.register(ArcElement, Tooltip, Legend);
const StudentChart = (props) => {
  return (
    <div className={`${styles.image_student_wrapper} py-3`}>
      <Doughnut
        data={{
          labels: props.label,
          datasets: [
            {
              label: "Score",
              data: props.data,
              backgroundColor: props.backgroundColor,
              borderColor: props.borderColor,
              borderWidth: 0,
            },
          ],
        }}
        options={{
          cutout: 50,
          responsive: true,
          maintainAspectRatio: true,

          plugins: {
            legend: {
              display: false,
              position: "bottom",
            },
            tooltip: {
              yAlign: "center",
              xAlign: "center",
              titleAlign: "center",
              position: "average",
            },
          },
        }}
      />

      <img
        src={props.img}
        className={`${styles.image_student}`}
        alt=""
        width={50}
        height={50}
      />
    </div>
  );
};

export default StudentChart;
