import React from "react";
import ReactSpeedometer from "react-d3-speedometer";
import styles from "./index.module.css";
import { useRouter } from "next/router";
const Speedometer = (props) => {
  const { maxValue, valueBeforeInternship, valueAfterInternship } = props;
  const router = useRouter();
  const getNeedleTransition = (value) => {
    const percentage = (value / maxValue) * 100;
    return `all 1s cubic-bezier(.17,.67,.83,.67) ${percentage / 100}s`;
  };
  return (
    <div>
      <div className={styles.wrapper}>
        <div>
          <ReactSpeedometer
            maxValue={maxValue}
            value={valueBeforeInternship}
            needleColor={props.needleColor ? props.needleColor : "red"}
            startColor="#fcb52e"
            segments={10}
            endColor="#f15b65"
            needleTransition={getNeedleTransition(valueBeforeInternship)}
            valueFormat=""
            paddingVertical={props.paddingVertical ? props.paddingvertical : 50}
            height={props.height ? props.height : 200}
            width={props.width}
            ringWidth={props.ringwidth}
          />
        </div>

        <div className={styles.speedometer2}>
          <ReactSpeedometer
            maxValue={maxValue}
            value={valueAfterInternship}
            needleColor={props.needleColor ? props.needleColor : "green"}
            startColor="tranparent"
            segments={10}
            endColor="transparent"
            needleTransition={getNeedleTransition(valueAfterInternship)}
            valueFormat=""
            height={props.height1 ? props.height1 : 200}
            width={props.width1}
            ringWidth={props.ringWidth1}
            paddingVertical={props.paddingVertical ? props.paddingvertical : 50}
          />
        </div>
      </div>
      {router.pathname === "/dashboard/[slug]" ||
      router.pathname === "/student-dashboard" ? (
        <></>
      ) : (
        <div className=" d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center ms-3">
            <div className={styles.beforedot}></div>
            <p className="f-12 fw-semibold ms-1">Before Internship</p>
          </div>
          <div className="d-flex align-items-center me-3">
            <div className={styles.afterdot}></div>
            <p className="f-12 fw-semibold ms-1">After Internship</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Speedometer;
