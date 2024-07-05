import React from "react";

const Tabs = ({
  firstTabActive,
  secondTabActive,
  thirdTabActive,
  onFirstTabClick,
  onSecondTabClick,
  onThirdTabClick,
  firstTab,
  secondTab,
  thirdTab,
}) => {
  const styles = {
    Status: {
      borderBottom: "1px solid #d7d7d7",
    },
  };
  return (
    <div>
      <div style={styles.Status}>
        <div className="d-flex align-items-center justify-content-between">
          <p
            style={{
              borderBottom: `${firstTabActive ? "2px solid #f15d17" : ""}`,
            }}
            className="fw-semibold f-12 pointer"
            onClick={onFirstTabClick}
          >
            {firstTab}
          </p>
          <p
            onClick={onSecondTabClick}
            style={{
              borderBottom: `${secondTabActive ? "2px solid #f15d17" : ""}`,
            }}
            className="fw-semibold f-12 pointer mx-3"
          >
            {secondTab}
          </p>
          <p
            onClick={onThirdTabClick}
            className="fw-semibold f-12 pointer"
            style={{
              borderBottom: `${thirdTabActive ? "2px solid #f15d17" : ""}`,
            }}
          >
            {thirdTab}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
