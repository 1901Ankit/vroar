import React from "react";
// import ContentLoader from "react-content-loader";
import styles from "./index.module.css";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const Placeholder = (props) => {
  return (
    <div>
      {/* <ContentLoader className={`${styles.loader} ${props.className}`}>
        {props.rect ? (
          <rect x="80" y="17" rx="4" ry="4" width="100" height="13" />
        ) : (
          <circle cx="30" cy="30" r="30" />
        )}
      </ContentLoader> */}
      <Skeleton
        count={props.count}
        width={props.width}
        height={props.height}
        circle={props.circle}
        className={props.className}
      />
    </div>
  );
};

export default Placeholder;
