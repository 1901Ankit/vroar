import React from "react";
import styles from "@/styles/companylisting.module.css";
import Whitewrapper from "@/components/whitewrapper";
import ListingControllers from "@/api/listing";
import mail from "@/assessts/images/dashboard/mail.png";
import telephone from "@/assessts/images/dashboard/telephone.png";
import { useEffect } from "react";
import { useState } from "react";
import Placeholder from "@/components/placeholder-loading";
import { useRouter } from "next/router";
import { createArray } from "@/utils/number";
import Paginate from "@/components/paginate";
import Head from "next/head";
import Loading from "@/components/loading";
import Pagination from "@/components/pagination";
const CompanyListing = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [company, setCompany] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const companyListing = (pages) => {
    const value = {
      page: pages,
      pageSize: pageSize,
    };
    ListingControllers.getcompanyListing(value)
      .then((res) => {
        setCompany(res.data.data.docs);
        setTotalPages(res.data.data.totalPages);
        setLoading(false);
        setPage(res.data.data.page);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  };
  const companyDetails = (value) => {
    router.push(`suggestedcompanydetails/${value}`);
  };

  useEffect(() => {
    companyListing();
  }, []);
  return (
    <div className="container">
      <Head>
        <title>Companies</title>
      </Head>
      <h5 className="my-3">Company Listing</h5>
      {loading ? (
        <Loading
          type="bars"
          width={30}
          height={30}
          className="m-auto"
          color="#f15d17"
        />
      ) : (
        <>
          <div className="row">
            {company.map((val, i) => (
              <div
                className="col-sm-4 my-2 pointer"
                key={i}
                onClick={() => companyDetails(val._id)}
              >
                <Whitewrapper className={`${styles.company_list} p-2`}>
                  <div className="d-flex  mb-2">
                    {loading ? (
                      <Placeholder circle={true} width={40} height={40} />
                    ) : (
                      <img className={styles.logo} src={val.logo} />
                    )}
                    {loading ? (
                      <Placeholder count={3} />
                    ) : (
                      <div className="ms-3">
                        <h6 className="f-15 mb-2">{val.companyName}</h6>
                        <div className="d-flex align-items-center mb-1">
                          <img src={mail.src} alt="" />
                          <p className="f-11 ms-2 ">{val.companyEmail}</p>
                        </div>
                        <div className="d-flex align-items-center">
                          <img src={telephone.src} alt="" width={16} />
                          <p className="f-11 ms-2 ">
                            {val.companyPhoneNo.slice(0, 10)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Whitewrapper>
              </div>
            ))}
          </div>
          {/* <div className={styles.pagination_wrapper}>
            <Paginate
              pageCount={totalPages}
              onPageChange={(e) => companyListing(e.selected + 1)}
              className={styles.pagination}
            />
          </div> */}
          <Pagination
            total={totalPages}
            onPageChange={(newPage) => companyListing(newPage)}
            current={page}
          />
        </>
      )}
    </div>
  );
};

export default CompanyListing;
