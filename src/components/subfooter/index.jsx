import Link from "next/link";
import React from "react";

const Subfooter = () => {
  let usefullinks = [
    {
      name: "Terms & Conditions |",
      url: "/terms-conditions",
    },
    {
      name: "Privacy Policy | ",
      url: "/privacy-policy",
    },
    {
      name: "Terms of Service |",
      url: "/terms-service",
    },
    {
      name: "Disclaimer |",
      url: "/disclaimer",
    },

    {
      name: "Website Terms of Use",
      url: "/terms-of-use",
    },
  ];
  return (
    <div className={`bg-dark text-white p-1`}>
      <div className="d-flex align-items-center justify-content-center">
        {/* {usefullinks.map((val, index) => (
          <Link href={`${val.url}`} className="link" key={`${index}`}>
            <p className={`f-13 mx-1`}>{val.name}</p>
          </Link>
        ))} */}

        <div className="">
          <p className="f-12">
            2023 Everbody Wins LLC
            <span className="f-12"> &nbsp;&#169;</span>All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Subfooter;
