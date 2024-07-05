import React, { useState } from "react";
import styles from "./index.module.css";
import filters from "@/assessts/data/filter";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Whitewrapper from "../whitewrapper";
import companyControllers from "@/api/companyJobs";
import { toast } from "react-toastify";
import Button from "../button";
import { useEffect } from "react";

const SideBar = (props) => {
  const [filterVisibility, setFilterVisibility] = useState(
    filters.map(() => false)
  );
  const [selectedFilters, setSelectedFilters] = useState({});

  // Function to toggle filter visibility
  const toggleFilter = (index) => {
    const newFilterVisibility = filterVisibility.map((visibility, i) =>
      i === index ? !visibility : false
    );
    setFilterVisibility(newFilterVisibility);
  };

  // Function to handle filter selection
  const filterhandler = (filter, valName) => {
    const selectedCategoryArray = selectedFilters[valName] || [];
    const filterIndex = selectedCategoryArray.indexOf(filter);
    let updatedSelectedFilters = { ...selectedFilters };

    if (filterIndex === -1) {
      selectedCategoryArray.push(filter);
      updatedSelectedFilters[valName] = selectedCategoryArray;
    } else {
      selectedCategoryArray.splice(filterIndex, 1);
      updatedSelectedFilters[valName] = selectedCategoryArray;
    }

    setSelectedFilters(updatedSelectedFilters);

    // Construct the body to send to the API
    let body = { ...updatedSelectedFilters };

    companyControllers
      .internshipFilterAndSorting(body)
      .then((res) => {
        props.setData(res.data.data.docs);
        props.setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  // Function to reset all filters
  const resetFilters = () => {
    setSelectedFilters({});

    // Optionally, you can also reset the API request here
    // Construct an empty body or the initial state of the filters
    let body = {};

    companyControllers
      .internshipFilterAndSorting(body)
      .then((res) => {
        props.setData(res.data.data.docs);
        props.setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  useEffect(() => {
    const defaultVisibility = filters.map((filter, index) => index === 0);
    setFilterVisibility(defaultVisibility);
  }, []);
  return (
    <div className="">
      <Whitewrapper className={styles.sidebar}>
        <div className="d-flex justify-content-between align-items-center p-1">
          <p className="fw-semibold filter_underline mb-0 f-13">All Filters</p>
          <Button className="btn btn-reset" onClick={resetFilters}>
            Reset
          </Button>
        </div>

        {filters.map((val, i) => (
          <div className="filter_underline p-1" key={i}>
            <span
              className="fw-semibold  mb-1 d-flex align-items-center justify-content-between pointer f-12 "
              onClick={() => toggleFilter(i)}
            >
              {val.name}
              {filterVisibility[i] ? <FaAngleUp /> : <FaAngleDown />}
            </span>
            <div
              style={{
                maxHeight: filterVisibility[i] ? "200px" : "0",
                overflowY: "scroll",
                transition: "max-height 0.5s ease-all",
              }}
            >
              {val.value.map((filter, j) =>
                filterVisibility[i] ? (
                  <div
                    className="d-flex align-items-center "
                    key={j}
                    style={{ display: filterVisibility[i] ? "block" : "none" }}
                  >
                    <input
                      type="checkbox"
                      id={filter}
                      checked={(selectedFilters[val.key] || []).includes(
                        filter
                      )}
                      onChange={() => filterhandler(filter, val.key)}
                    />
                    <label className="ms-2 f-12" htmlFor={filter}>
                      {filter}
                    </label>
                    <br />
                  </div>
                ) : (
                  <></>
                )
              )}
            </div>
          </div>
        ))}
      </Whitewrapper>
    </div>
  );
};

export default SideBar;
