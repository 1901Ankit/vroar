import React from "react";
import styles from "./index.module.css";

const StudentInternship = () => {
  return (
    <div>
      <div className="container my-4">
        <div className="row">
          <div className="col-sm-8">
            <div className="my-3 d-flex align-items-center justify-content-end">
              <h6 className="mb-0 p-0">Send me jobs like these :</h6>
              <select className={`${styles.selectbar_items} ms-2`}>
                <option selected hidden>
                  Select...
                </option>
                <option value="Relevance">Relevance</option>
                <option value="Date">Date</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row my-2">
          <div className="col-sm-8">
            <div className={`${styles.intenship_data}`}>
              <div>
                <h5>Internship Title</h5>
              </div>
              <div className="my-1">
                <h6>Skills :</h6>
              </div>
              <div className="d-flex mb-2">
                <h6>Leadership |</h6>
                <h6 className="ms-2">Sales |</h6>
                <h6 className="ms-2">IT</h6>
              </div>

              <div>
                <div className="d-flex align-items-center justify-content-end">
                  <h6>Apply</h6>
                  <h6 className="mx-3">Save</h6>
                  <h6>Share</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">dcfvgbh</div>
        </div>
        <div className="row my-5">
          <div className="col-sm-8">
            <div className={`${styles.intenship_data}`}>
              <div>
                <h5>Internship Title</h5>
              </div>
              <div className="my-1">
                <h6>Skills :</h6>
              </div>
              <div className="d-flex mb-2">
                <h6>Leadership |</h6>
                <h6 className="ms-2">Sales |</h6>
                <h6 className="ms-2">IT</h6>
              </div>

              <div>
                <div className="d-flex align-items-center justify-content-end">
                  <h6>Apply</h6>
                  <h6 className="mx-3">Save</h6>
                  <h6>Share</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">dcfvgbh</div>
        </div>
        <div className="row my-5">
          <div className="col-sm-8">
            <div className={`${styles.intenship_data}`}>
              <div>
                <h5>Internship Title</h5>
              </div>
              <div className="my-1">
                <h6>Skills :</h6>
              </div>
              <div className="d-flex mb-2">
                <h6>Leadership |</h6>
                <h6 className="ms-2">Sales |</h6>
                <h6 className="ms-2">IT</h6>
              </div>

              <div>
                <div className="d-flex align-items-center justify-content-end">
                  <h6>Apply</h6>
                  <h6 className="mx-3">Save</h6>
                  <h6>Share</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">dcfvgbh</div>
        </div>
      </div>
    </div>
  );
};

export default StudentInternship;
