import React from "react";
import footerdescription from "@/assessts/data/constant";
import footerLogo from "@/assessts/images/logo/Vroar_LineArt.svg";
import { FaFacebookF, FaLinkedinIn, FaPhone } from "react-icons/fa";
import { BsFillBuildingFill, BsInstagram } from "react-icons/bs";
import { AiOutlineTwitter } from "react-icons/ai";
import styles from "./index.module.css";
import Link from "next/link";
import { MdEmail, MdLocationOn } from "react-icons/md";
const FooterMobile = (props) => {
  let sociallinks = [
    {
      icon: <FaFacebookF />,
      url: "https://www.facebook.com/vroarai",
    },

    {
      icon: <FaLinkedinIn />,
      url: "https://www.linkedin.com/company/vroarai/",
    },
    {
      icon: <BsInstagram />,
      url: "https://www.instagram.com/vroar.ai/",
    },
    {
      icon: <AiOutlineTwitter />,
      url: "https://twitter.com/Vroar_ai",
    },
  ];
  const quicklinks = [
    {
      name: "Student",
      url: "/student",
    },
    {
      name: " Privacy Policy",
      url: "/privacy-policy",
    },
    {
      name: "Company",
      url: "/company",
    },
    {
      name: "Terms of Use",
      url: "/terms-of-use",
    },
    {
      name: "Parent",
      url: "/parent",
    },
    {
      name: "Disclaimer",
      url: "/disclaimer",
    },
  ];
  return (
    <div className={`${props.className}  `}>
      <div className={`${styles.footer_shadow} `}></div>
      <div className="container  pt-3 pb-3">
        <div className="row ">
          <div className="col-sm-8 m-auto ">
            <p className="footer-intro  text-justify f-13">
              {footerdescription.footerdescription.message1}
            </p>
            <div className="text-center ">
              <img src={footerLogo.src} className="my-2" />
              <p className="f-15 mb-2 fw-500 text-uppercase">Future is Now</p>
            </div>
            <div className="d-flex align-items-center justify-content-center my-3">
              {sociallinks.map((val, i) => (
                <a href={val.url} className="link me-2">
                  <div className={`${styles.footer_social_icons}`} key={`${i}`}>
                    <span className={styles.social_accounts}>{val.icon}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border_dashed"></div>

        {/* <div className="d-flex align-items-center justify-content-between p-2">
          <div style={{ width: "45%" }}>
            <h5>Quick Links</h5>
            
            <div className="d-flex align-items-center justify-content-between mt-3">
              <div>
                <Link href={"/student"} className={styles.footer_mobile_link}>
                  Student
                </Link>
                <Link href={"/parent"} className={styles.footer_mobile_link}>
                  Parent
                </Link>
                <Link href={"/company"} className={styles.footer_mobile_link}>
                  Company
                </Link>
              </div>
              <div className="ms-3">
                <Link
                  href={"/privacy-policy"}
                  className={styles.footer_mobile_link}
                >
                  Privacy Policy
                </Link>
                <Link
                  href={"/terms-of-use"}
                  className={styles.footer_mobile_link}
                >
                  Terms of Use
                </Link>
                <Link
                  href={"/disclaimer"}
                  className={styles.footer_mobile_link}
                >
                  Disclaimer
                </Link>
              </div>
            </div>
          </div>
          <div style={{ width: "10%" }}></div>
          <div style={{ width: "45%" }}>
            <h5 className="text-start mb-3 mt-2">Contact Us</h5>
            <div className="">
              <a
                href="tel:+1(214)412-8345"
                className={`${styles.footer_mobile_link}`}
              >
                <span>
                  <FaPhone className="me-2" />
                  +1(214)412-8345
                </span>
              </a>
              <a className={`${styles.footer_mobile_link} mt-2`}>
                <span>
                  <BsFillBuildingFill className="me-2" />
                  EveryBody Wins LLC
                </span>
              </a>
              <a
                className={`${styles.footer_mobile_link} mt-2`}
                href="mailto:info@vroar.ai"
              >
                <span>
                  <MdEmail className="me-2" />
                  info@vroar.ai
                </span>
              </a>
              <a
                className={`${styles.footer_mobile_link} mt-2`}
                href="mailto:info@vroar.ai"
              >
                <span>
                  <MdLocationOn className="me-2" />
                  Texas,USA
                </span>
              </a>
            </div>
          </div>
        </div> */}
        <div className="row mt-3">
          <div className="col-6 border_dashed_right ">
            <h5 className="mb-3">Quick Links</h5>
            <div className={styles.inline__block}>
              {quicklinks.map((val, i) => (
                <Link
                  href={val.url}
                  key={i}
                  className={styles.footer_mobile_link}
                >
                  {val.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="col-6 ps-4">
            <h5 className="mb-3">Contact Us</h5>

            <a className={`${styles.footer_mobile_link} mb-3`}>
              <span>
                <BsFillBuildingFill className="me-2" />
                EveryBody Wins LLC
              </span>
            </a>
            <a
              href="tel:+1(214)412-8345"
              className={`${styles.footer_mobile_link} mb-3`}
            >
              <span>
                <FaPhone className="me-2" />
                +1(214)412-8345
              </span>
            </a>
            <a
              className={`${styles.footer_mobile_link} mb-3`}
              href="mailto:info@vroar.ai"
            >
              <span>
                <MdEmail className="me-2" />
                info@vroar.ai
              </span>
            </a>
            {/* <a
              className={`${styles.footer_mobile_link} mb-3`}
              href="mailto:info@vroar.ai"
            >
              <span>
                <MdLocationOn className="me-2" />
                Texas,USA
              </span>
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterMobile;
