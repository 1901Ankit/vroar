import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Button from "../button";
import styles from "./index.module.css";
const Paginate = (props) => {
  const [pageCount, setPageCount] = useState(0);
  return (
    <div className={props.className}>
      <ReactPaginate
        breakLabel="..."
        nextClassName={styles.nextButton}
        previousClassName={styles.previousButton}
        previousLinkClassName={styles.previousLinkClassName}
        nextLinkClassName={styles.previousLinkClassName}
        nextLabel={"Next"}
        previousLabel={"Previous"}
        containerClassName={styles.react_paginate}
        pageCount={props.pageCount && props.pageCount}
        activeClassName={styles.activeClassName}
        onPageChange={props.onPageChange}
        onClick={props.onClick}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Paginate;
