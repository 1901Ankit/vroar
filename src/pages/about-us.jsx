import Roar from "@/components/roar";
import React from "react";
import styles from "@/styles/About.module.css";
import homepagedesccription from "@/assessts/data/constant";
import Head from "next/head";
import companyImage from "@/assessts/images/profile/about_us.jpg";
import Button from "@/components/button";
import Link from "next/link";
import WhyVroar from "@/components/StudentMain/whyvroar";
import { BsArrowRight } from "react-icons/bs";
import Imageflow from "@/components/imageflow";
import data from "@/assessts/data/data";
const About = () => {
  let deployingdata = [
    {
      numbers: "50+",
      tech: "node developers",
    },
    {
      numbers: "20+",
      tech: "analysts",
    },
    {
      numbers: "100+",
      tech: "programmers",
    },
    {
      numbers: "15+",
      tech: "ai/ml experts",
    },
  ];
  return (
    <div className=" mt-5">
      <Head>
        <title>About Us</title>
      </Head>
      <div className="container mb-5">
        <div className="row">
          <div className="col-sm-6 mb-5">
            <Roar className="mb-3" />
            <h1 className={`${styles.page__title} text-uppercase`}>
              How We ROAR?
            </h1>
            <p className="text-justify">
              <span className="f-20 fw-semibold "> VROAR</span>{" "}
              <span className={`${styles.para} text-justify  fw-normal `}>
                is built upon the belief that every student, regardless of their
                background or socio-economic status, deserves the opportunity to
                hone their skills and discover their potential. We leverage the
                power of Artificial Intelligence to offer internship programs
                specifically designed based on a student&apos;s interests &
                skills.
              </span>
            </p>
            <div className=" row mt-5">
              <div className="col-sm-6">
                <p className="f-13 text-justify">
                  {homepagedesccription.homepagedescription.message4}
                </p>
              </div>
              <div className="col-sm-6">
                <p className="f-13 text-justify">
                  {homepagedesccription.homepagedescription.message4}
                </p>
              </div>
            </div>
            <Link href="/signup">
              <Button
                className="custom_btn"
                mt="50px"
                padding="15px"
                width="150px"
              >
                Register Now
              </Button>
            </Link>
          </div>
          <div className="col-sm-6 text-end mb-5">
            <img
              src={companyImage.src}
              className={`${styles.banner_image} img-fluid`}
            />
          </div>
        </div>
      </div>
      <div className="container mb-5 ">
        <WhyVroar />
      </div>
      <div className="section_spcr"></div>
      <div className="container mb-5 mt-5">
        <div className="row align-items-end">
          <div className="col-sm-5">
            <Roar className="mb-3" />
            <h1 className={styles.page__title}>
              What <strong> VROAR</strong> DO?
            </h1>
            <p className={`${styles.para} mb-3`}>
              {homepagedesccription.homepagedescription.message1}
            </p>
          </div>
          <div className="col-sm-5">
            <p className="f-13 mb-3 text-justify">
              {homepagedesccription.homepagedescription.message2}
            </p>
          </div>
          <div className="col-sm-1">
            <div className="col-sm-2">
              <Link href={"/signup"}>
                <Button
                  className={` custom_btn mb-3`}
                  padding="12px"
                  width={160}
                  rounded="18px"
                >
                  Register Now
                  <BsArrowRight
                    fontWeight={300}
                    className={`${styles.arrow_icon}  ms-2`}
                  />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="section_spcr"></div>
      <div className="container mb-5">
        <div className="row">
          <div className={`col-sm-4  p-1`}>
            <div className={`${styles.border_top}  `}>
              <div className={`${styles.left_column_widget}  mb-2 `}>
                <Imageflow
                  data={data.currentlydeploying}
                  desc="VROAR Talent Pool"
                />
              </div>
            </div>
          </div>
          {deployingdata.map((val, id) => (
            <div
              className={`${styles.indiv_column} p-1 col-sm-2`}
              key={`${id}`}
            >
              <div className={`${styles.border_top}  `}>
                <div className={`${styles.right_column_widget}`}>
                  <p className=" fw-bold ">{val.numbers}</p>
                  <p className={` text-uppercase`}>{val.tech}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="section_spcr"></div> */}
    </div>
  );
};

export default About;
