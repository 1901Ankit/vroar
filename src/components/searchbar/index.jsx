import React, { useState } from "react";
import Whitewrapper from "../whitewrapper";
import Input from "../input";
import Button from "../button";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "./index.module.css";
import companyControllers from "@/api/companyJobs";
const Searchbar = (props) => {
  const [state, setState] = useState({
    search: "",
  });
  const inputHandler = (e) => {
    setState({ ...state, search: e.target.value });
  };

  const searchInternship = (e) => {
    e.preventDefault();
    let body = {
      search: state.search,
    };
    companyControllers
      .internshipFilterAndSorting(body)
      .then((res) => {
        props.setData(res.data.data.docs);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form onSubmit={searchInternship}>
        <div className="bordered d-flex align-items-center ">
          <Input
            border="none"
            width="100%"
            padding="5px"
            bg="transparent"
            className={`custom_input ${styles.search_input}`}
            placeholder="Search "
            onChange={inputHandler}
          />
          <Button className={styles.search_bar} border="none">
            <AiOutlineSearch />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
