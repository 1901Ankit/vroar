import React from "react";

import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import styles from "./index.module.css";
import { Accordion } from "react-bootstrap";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });
const FAQ = (props) => {
  return (
    <div>
      <Accordion defaultActiveKey="0">
        {props.data.map((val, i) => {
          return (
            <Accordion.Item eventKey={i} className="mb-3">
              <Accordion.Header className={`${styles.accordion_header}`}>
                <h6 className="fw-500">{val.question}</h6>
              </Accordion.Header>
              <Accordion.Body>
                <p className="f-13">{val.answer}</p>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
};

export default FAQ;
