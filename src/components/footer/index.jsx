import React, { useEffect, useState } from "react";
import { Baskervville, Fjalla_One, Roboto_Slab } from "next/font/google";
import styles from "./index.module.css";
import Input from "../input";
import Button from "../button";
import footerdescription from "@/assessts/data/constant";
import halflogo from "../../assessts/images/logo/Vroar_Half_Face.svg";
import Image from "next/image";
import logo from "../../assessts/images/logo/Vroar_LineArt.svg";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import {
  AiOutlineBehance,
  AiOutlineTwitter,
  AiOutlineYoutube,
} from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";
import Link from "next/link";
import url from "@/assessts/data/url";
import { useSelector } from "react-redux";

const Footer = (props) => {
  const s3url = url.s3url;
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
  const [role, setRole] = useState("");
  const [show, setShow] = useState(true);
  useEffect(() => {
    localStorage.getItem("accesstoken") ? setShow(false) : setShow(true);
    setRole(localStorage.getItem("group"));
  }, []);
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
    <div className={`container ${styles.footer} ${props.className} py-5`}>
      <div className="row">
        <div className={`col-sm-4 footer_left ${styles.border_right}  `}>
          <div className="">
            <h5 className={`f-15`}>Quick Links</h5>
          </div>

          <div className="inline_block">
            {quicklinks.map((val, i) => (
              <Link href={val.url} key={i} className={styles.footer_link}>
                {val.name}
              </Link>
            ))}
            {/* <Link href={"/student"} className={styles.footer_link}>
              Student
            </Link>

            <Link href={"/privacy-policy"} className={styles.footer_link}>
              Privacy Policy
            </Link>

            <Link href={"/company"} className={styles.footer_link}>
              Company
            </Link>

            <Link href={"/terms-of-use"} className={styles.footer_link}>
              Terms of Use
            </Link>

            <Link href={"/parent"} className={styles.footer_link}>
              Parent
            </Link>

            <Link href={"/disclaimer"} className={styles.footer_link}>
              Disclaimer
            </Link> */}

            {/* <Link href={"/terms-service"} className={styles.footer_link}>
              Terms Of Service
            </Link> */}

            {/* <Link href={"/disclaimer"} className="link">
              Disclaimer
            </Link> */}
            {/* 
            <Link href={"/terms-of-use"} className="link">
              Website Terms of Use
            </Link> */}
          </div>

          {/* <div className="row my-3">
            <div className="col-sm-6 f-12 fw-semibold">
              <Link href={"/"} className="link">
                Cases
              </Link>
            </div>
            <div className="col-sm-6 f-12 fw-semibold">
              <Link href={"/"} className="link">
                Support
              </Link>
            </div>
          </div> */}

          {/* <div className="">
            <h5 className={``}>Our Newsletter </h5>
            <div className="row mt-5 align-items-center">
              <div className="col-sm-9 ">
                <Input
                  type="text"
                
                  className={`${styles.footer_input}`}
                  width="100%"
                  placeholder="Email Address"
                />
              </div>
              <div className="col-sm-3">
                <Button
                  className={` ${styles.custom_btn} `}
                
                >
                  Go
                </Button>
              </div>
            </div>
          </div> */}
        </div>
        <div className={`col-sm-4  text-center px-5 ${styles.border_right}`}>
          <p className={`   footer_intro `}>
            {footerdescription.footerdescription.message1}
          </p>
          <div className="my-2">
            <img src={`${s3url}/logo/Vroar_LineArt.svg`} alt="" />
          </div>
          <h5 className={`f-12 text-uppercase  `}>Future is Now</h5>
        </div>
        <div className="col-sm-4 px-5 footer_right">
          <h5 className={` `}>Contact Us</h5>

          <div className="row my-3">
            <div className="col-sm-6 ">
              {" "}
              <a>+1(214)412-8345</a>
            </div>
            <div className="col-sm-6 ">
              {" "}
              <a>Everybody Wins LLC</a>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-sm-6 ">
              {" "}
              <a>info@vroar.ai</a>
            </div>
            <div className="col-sm-6 ">
              {" "}
              <a>Texas, USA</a>
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-start footer_social_icons">
            {sociallinks.map((val, i) => (
              <a href={val.url} className="link me-4">
                <div className={`${styles.footer_social_icons}`} key={`${i}`}>
                  <span className={styles.social_accounts}>{val.icon}</span>
                </div>
              </a>
            ))}
          </div>

          <div className="d-flex align-items-center justify-content-start   ">
            {/* <Image
              src={`${s3url}/logo/Vroar_Half_Face.svg`}
              alt=""
              width={30}
              height={30}
            /> */}
            {/* <div className={` ${roboto.className}`}>
              <p>2023 vroar.ai</p>
              <p>
                <span>&#169;</span>All rights reserved
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
