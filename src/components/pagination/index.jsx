import React from "react";
import styles from "./index.module.css";

const Pagination = ({ total, current, onPageChange }) => {
  console.log(current)
  const goToPreviousPage = () => {
    if (current > 1) {
      onPageChange(current - 1);
    }
  };

  const goToNextPage = () => {
    if (current < total) {
      onPageChange(current + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationButton}
        onClick={goToPreviousPage}
        disabled={current === 1}
      >
        Previous
      </button>
      <span className={styles.paginationText}>
        Page {current} of {total}
      </span>
      <button
        className={styles.paginationButton}
        onClick={goToNextPage}
        disabled={current === total}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
