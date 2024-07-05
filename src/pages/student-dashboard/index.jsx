import Authcontrollers from "@/api/auth";
import { parentController } from "@/api/parent";
import SideBar from "@/components/sidebar";
import Head from "next/head";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Offcanvas, Pagination } from "react-bootstrap";
import styles from "@/styles/studentDashboard.module.css";
import { useDispatch } from "react-redux";
import { user } from "@/redux/reducers/userDetails";
import Searchbar from "@/components/searchbar";
import JobPost from "@/components/jobPost";
import ListingControllers from "@/api/listing";
import Paginate from "@/components/paginate";
import Loading from "@/components/loading";
import companyControllers from "@/api/companyJobs";
import { useRouter } from "next/router";

const StudentDashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [details, setDetails] = useState({});
  const [show, setShow] = useState(false);
  const [parentVerified, setParentVerified] = useState(false);
  // const getMember = () => {
  //   parentController
  //     .getMemberRequest()
  //     .then((res) => {
  //       console.log("res", res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const searchInternship = (e) => {
    setSearch(e.target.value);
  };
  const recommendedIntern = () => {
    let value = {
      pageSize: pageSize,
      page: page,
    };
    ListingControllers.getIntenshipList(value)
      .then((res) => {
        setData(res.data.data.docs);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  };
  const SortingData = (e) => {
    let value = {
      createdAt: e.target.value,
    };

    companyControllers
      .internshipFilterAndSorting(value)
      .then((res) => {
        setData(res.data.data.docs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    recommendedIntern();

    if (localStorage.getItem("group") != "STUDENT") {
      router.push("/");
    }
  }, []);
  return (
    <div>
      <Head>
        <title>Student Dashboard</title>
      </Head>

      <div className="container my-3">
        <div className="row">
          <div className="col-sm-3">
            <SideBar
              setData={setData}
              setLoading={setLoading}
              search={search}
            />
          </div>
          <div className="col-sm-9">
            <Searchbar setData={setData} />
            <div className="text-end mt-2">
              <div className="d-flex align-items-center justify-content-end">
                <p className="f-12 fw-semibold">Sort by :</p>
                <select className={styles.sorting} onChange={SortingData}>
                  {/* <option selected disabled hidden>
                    Sort By
                  </option> */}
                  <option value={"ASC"}>Relevance</option>
                  <option value={"DESC"}>Date</option>
                  {/* <option value={""}>Recommended</option> */}
                </select>
              </div>
            </div>
            {loading ? (
              <Loading
                type="bars"
                width={50}
                height={50}
                className="m-auto"
                color="#f15d17"
              />
            ) : (
              <JobPost data={data} recommendedIntern={recommendedIntern} />
            )}

            {/* <Paginate /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
