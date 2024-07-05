import Authcontrollers from "@/api/auth";
import { Baskervville, Roboto_Serif, Roboto_Slab } from "next/font/google";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const baskervville = Baskervville({ subsets: ["latin"], weight: "400" });
const roboto = Roboto_Slab({ subsets: ["latin"] });
const List = (props) => {
  // console.log("first", props);
  return (
    <div>
      <ul className="list-unstyled">
        <li className={`${props.header_className} ${roboto.className}`}>
          {props.header || ""}
        </li>

        {props.data.map((val, i) => {
          return (
            <li
              className={`text-justify mb-0 ${props.className} ${roboto.className}`}
              key={`${i}`}
            >
              {val.name}
            </li>
          );
        })}
      </ul>

      {/* <l>
        <li className={`${props.header_className} ${roboto.className}`}>
          {props.header || ""}
        </li>
        <li>{studentdata.skills}</li>
      </l> */}
    </div>
  );
};

export default List;
