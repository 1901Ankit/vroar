import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip } from "chart.js";
Chart.register(ArcElement, Tooltip);
const PieChart = (props) => {
  const data = {
    labels: props.label,
    datasets: [
      {
        label: props.score,
        data: props.data,
        backgroundColor: props.backgroundColor,
        borderColor: props.borderColor,
      },
    ],
  };
  return (
    <div className="">
      <Pie
        data={data}
        options={{
          plugins: {
            tooltip: true,
            legend: {
              display: true,
              position: "bottom",
              align: "start",
            },
          },
        }}
      />
    </div>
  );
};

export default PieChart;
