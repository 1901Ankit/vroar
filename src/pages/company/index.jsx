import Head from "next/head";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./index.module.css";
import Carousel from "react-multi-carousel";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards, Autoplay } from "swiper";
import Button from "@/components/button";
import { AiOutlineGlobal } from "react-icons/ai";
import { FcCollaboration } from "react-icons/fc";
import { MdOutlineCorporateFare, MdOutlineDiversity1 } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import company from "../../assessts/images/background/company.png";
import socialresponsibility from "../../assessts/images/background/csr.png";
import collaboration from "../../assessts/images/background/support.png";
import brand1 from "@/assessts/images/gallery/brand1.png";
import brand2 from "@/assessts/images/gallery/brand2.png";
import brand3 from "@/assessts/images/gallery/brand3.png";
import brand4 from "@/assessts/images/gallery/brand4.png";
import brand5 from "@/assessts/images/gallery/brand5.png";
import brand6 from "@/assessts/images/gallery/brand6.png";
import FAQ from "@/components/accordion";
import data from "@/assessts/data/data";
import Link from "next/link";
import studentPageContent from "@/assessts/data/studentPage";
import Journey from "@/components/journey";
import url from "@/assessts/data/url";
import { useEffect } from "react";
import Aos from "aos";
import WhyVroar from "@/components/StudentMain/whyvroar";
import ListingControllers from "@/api/listing";
import { useSelector } from "react-redux";
import { USER_ROLES } from "@/utils/enum";
const Company = () => {
  const s3url = url.s3url;
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const sliderImage = [
    {
      img: brand1,
      companyName: "Company Name",
    },
    {
      img: brand2,
      companyName: "Company Name",
    },
    {
      img: brand3,
      companyName: "Company Name",
    },
    {
      img: brand4,
      companyName: "Company Name",
    },
    {
      img: brand5,
      companyName: "Company Name",
    },

    {
      img: brand6,
      companyName: "Company Name",
    },
  ];

  const [register, setRegister] = useState(true);
  // const [show, setShow] = useState(false);
  const [shown, setShown] = useState(false);

  // const showHandler = (value) => {
  //   if (value == "REGISTER") {
  //     setRegister(true);
  //     setShow(false);
  //     setShown(false);
  //   } else if (value == "2ndSTEP") {
  //     setShow(true);
  //     setRegister(false);
  //     setShown(false);
  //   } else {
  //     setShown(true);
  //     setRegister(false);
  //     setShow(false);
  //   }
  // };
  const [providers, setProviders] = useState([]);
  const topInternshipPorviders = () => {
    ListingControllers.getTopCompanyListing()
      .then((res) => {
        setProviders(res.data.data.docs);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [show, setShow] = useState(false);
  const role = useSelector((state) => state.userdetails.group);

  useEffect(() => {
    Aos.init();
    topInternshipPorviders();

    const loginToken = localStorage.getItem("accesstoken");

    if (loginToken) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, []);
  return (
    <div>
      <Head>
        <title>Company</title>
      </Head>

      {/* <div className="grey_overlay_strip strip3"></div> */}
      <div className={`${styles.company_bg}`}>
        <div className="container my-3">
          <div className="row align-items-center  ">
            <div className="col-sm-7  py-5">
              <div className="">
                <div className="text-left mb-4">
                  {" "}
                  <span class="tp-section__subtitle white-bg mb-15 text-center">
                    <i class="before-border"></i>Roar With VROAR{" "}
                  </span>
                </div>
                <h1 className={styles.page__head_title}>
                  Empowering Businesses<br></br> with Young Minds
                </h1>
                <p className={`text-justify my-3   f-13     slab_para `}>
                  {studentPageContent.companyPagebannerDescription}
                </p>
                <Link
                  className="link"
                  href={
                    show
                      ? role === USER_ROLES.PARENT
                        ? "/parent-dashboard"
                        : `/dashboard/${role}`
                      : "/signup"
                  }
                >
                  <Button
                    className={`custom_btn login_btn_spcr`}
                    padding="13px"
                    width="150px"
                  >
                    {show ? "Dashboard" : "Register Now"}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="col-sm-5">
              <div className={` ${styles.imagebg}`}>
                <img
                  className="mt-3 imgsc img-fluid"
                  src={`${s3url}/profile/Company-Page.jpg`}
                  alt=""
                  width={400}
                  height={500}
                />
              </div>
            </div>
          </div>
          {/* <div className="row align-items-center">
            <div
              className="col-sm-7 p-5"
              data-aos="fade-right"
              data-aos-offset="10"
              data-aos-delay="20"
              data-aos-duration="800"
              data-aos-easing="ease-in-out"
              data-aos-mirror="false"
              data-aos-once="true"
              data-aos-anchor-placement="top-center"
            >
              <h1 className={` text-left text-uppercase fw-700 mb-3`}>
                Empowering Businesses with Young Minds
              </h1>
              <p className={`text-justify   mb-2 f-13  `}>
                {studentPageContent.companyPagebannerDescription}
              </p>
              <Link className="link" href="/login">
                <Button
                  className="custom_btn mt-3"
                  border="none"
                  fw="500"
                  width="150px"
                  padding="8px"
                  rounded="5px"
                >
                  Login
                </Button>
              </Link>
            </div>
            <div
              className="col-sm-5"
              data-aos="fade-left"
              data-aos-offset="10"
              data-aos-delay="20"
              data-aos-duration="800"
              data-aos-easing="ease-in-out"
              data-aos-mirror="false"
              data-aos-once="true"
              data-aos-anchor-placement="top-center"
            >
              <img
                src={`${s3url}/profile/Company-Page.jpg`}
                alt=""
                width={400}
                height={500}
              />
            </div>
          </div> */}
        </div>
        {/* <div className="container section_spcr">
          <div>
          <div className="text-left mb-4 ">   <span class="tp-section__subtitle white-bg mb-15 text-center"><i class="before-border"></i>Roar With VROAR </span></div>
            <h1 className="page_title">WHY VROAR?</h1>
          </div>

          <div className="row ">
            <div
              className="col-sm-6 my-3"
              data-aos="fade-right"
              data-aos-offset="10"
              data-aos-delay="20"
              data-aos-duration="800"
              data-aos-easing="ease-in-out"
              data-aos-mirror="false"
              data-aos-once="true"
              data-aos-anchor-placement="top-center"
            >
              <div className=" mb-3 d-flex align-items-center ">
                <AiOutlineGlobal className="me-2" />
                <p className="mb-0 f-13">Access to global fresh talent</p>
              </div>
              <div className="f-18 mb-3 d-flex align-items-center ">
                <Image
                  src={collaboration}
                  className={`${styles.img__wrapper} me-2`}
                />
                <p className="mb-0 f-13 fw-500">Collaboration opportunities</p>
              </div>
              <div className="f-18 mb-3 d-flex align-items-center ">
                <Image
                  src={socialresponsibility}
                  className={`${styles.img__wrapper} me-2`}
                />
                <p className="mb-0 f-13">
                  Fulfills corporate social responsibility
                </p>
              </div>
            </div>
            <div
              className="col-sm-6"
              data-aos="fade-left"
              data-aos-offset="10"
              data-aos-delay="20"
              data-aos-duration="800"
              data-aos-easing="ease-in-out"
              data-aos-mirror="false"
              data-aos-once="true"
              data-aos-anchor-placement="top-center"
            >
              <div className=" mb-3 d-flex align-items-center">
                <MdOutlineDiversity1
                  className={`${styles.img__wrapper} me-2`}
                />
                <p className="f-13 mb-0">Improved diversity and inclusion</p>
              </div>
              <div className="mb-3 d-flex align-items-center ">
                <FaUserShield className={`${styles.img__wrapper} me-2`} />
                <p className="f-13 mb-0 ">Potential future employee</p>
              </div>
              <div className="d-flex align-items-center">
                <Image
                  src={company}
                  className={`${styles.img__wrapper} me-2`}
                />

                <p className="f-13 mb-0 ">Enhanced company reputation</p>
              </div>
            </div>
          </div>
        </div> */}
        <div className="top"></div>
        {/* <div className="p-15"> */}
        <div className="container">
          <WhyVroar />
        </div>
        {/* </div> */}
        <div className="top"></div>
        {/* <div className="container my-4">
          <h3>WHY VROAR?</h3>
          <p>
            {" "}
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>

          <div className="row rounded shadow">
            {data.map((val, i) => {
              return (
                <div className="col-sm-3 p-3">
                  <div className={`${val.className} p-4`}>
                    <h2 className="text-orange">{val.counting}</h2>
                    <p className="text-justify">{val.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div> */}

        <div className={`container ${styles.section_spcr} `}>
          <div className="">
            <div className="text-left mb-4 ">
              {" "}
              <span class="tp-section__subtitle white-bg mb-15 text-center">
                <i class="before-border"></i>Roar With VROAR{" "}
              </span>
            </div>
            <h1 className="page_title">VROAR is trusted by</h1>
          </div>
          {/* <Carousel
            responsive={responsive}
            infinite={true}
            arrows={false}
            autoPlay={true}
            speed={4000}
            slidesToShow={6}
          >
            {sliderImage.map((val, i) => {
              return (
                <div className={`p-3 ${styles.company_image} `} key={i}>
                  <img src={val.img.src} width="90%" className="m-auto" />
                </div>
              );
            })}
          </Carousel> */}
          <Carousel
            className=" my-4"
            responsive={responsive}
            direction="left"
            infinite={true}
            arrows={false}
            showDots={false}
            autoPlay={true}
            rtl={false}
            autoPlaySpeed={50000}
            pauseOnHover={true}
          >
            {providers.map((val, i) => (
              <Link href={"/signup"} className="link">
                <div
                  key={i}
                  height={100}
                  width="90%"
                  className={`my-2 ${styles.internships_providers}`}
                >
                  <div className="d-flex align-items-center">
                    <div>
                      <img src={val.logo} className={styles.logo} />
                    </div>
                    <div className="ms-2">
                      <h5 className="text-capitalize f-18">
                        {val.companyName}
                      </h5>
                      <p className="f-12">{val.industry}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Carousel>
        </div>
        <div className="container ">
          <div className="row align-items-center">
            <div className="col-sm-6 text-center">
              <Journey
                className={styles.company_journey}
                process1="Login to account"
                process2="Create a profile"
                process3="Search for talent"
                process4="Connect with students"
                process5="Hire skilled interns"
                process6="Empower & thrive"
              />
            </div>
            <div className="col-sm-6 my-5">
              <div className="text-left mb-4 ">
                {" "}
                <span class="tp-section__subtitle white-bg mb-15 text-center">
                  <i class="before-border"></i>Roar With VROAR{" "}
                </span>
              </div>
              <h1 className="page_title">COMPANY Journey</h1>
              <p className="f-13 text-justify ">
                To gain access to a diverse pool of fresh and skilled talent,
                log in to the VROAR platform. Then share your company details
                and intern requirements and build a company profile on the
                website. You’ll be suggested interns that best suit your
                requirements and are eligible for the intern position. Connect
                with different interns and hire the ones that share a common
                interest with your company. In addition, if you feel that your
                team is lacking somewhere and you want to grow as a company,
                then go for our business enrichment programs and level up your
                company’s performance. Roar with VROAR!
              </p>
            </div>
          </div>
        </div>

        <div className="container my-5">
          <div className="row">
            <div className="col-sm-5">
              <div className={styles.center}>
                <div>
                  <div className="text-left mb-4 ">
                    {" "}
                    <span class="tp-section__subtitle white-bg mb-15 text-center">
                      <i class="before-border"></i>Roar With VROAR{" "}
                    </span>
                  </div>
                  <h1 className="page_title ">What Our Users Say About Us</h1>
                  <p className="text-justify f-13">
                    VROAR is trusted by thousands of entrepreneurs all across
                    the world. With its extensive network and proven track
                    record, VROAR has established itself as a reliable partner
                    for entrepreneurs seeking guidance and support.
                    Entrepreneurs who have partnered with VROAR have experienced
                    significant growth and success in their ventures. With a
                    strong commitment to fostering innovation and a thriving
                    entrepreneurial community, VROAR continues to be the go-to
                    resource for entrepreneurs looking to take their businesses
                    to the next level.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-7">
              <div className={styles.desktop_swiper}>
                <Swiper
                  effect={"cards"}
                  grabCursor={true}
                  modules={[EffectCards, Autoplay]}
                  autoplay={false}
                  className={`${styles.mySwiper} m-auto`}
                  loop={false}
                >
                  {data.testimonial.map((val, i) => (
                    <SwiperSlide key={`${i}`}>
                      <div className={`${styles.testimonial_wrapper} p-4`}>
                        <h5 className="text-center fw-700 mb-4">
                          {val.heading}
                        </h5>

                        <p className="text-justify lh-base f-13">
                          {val.testimonials}
                        </p>
                        <hr />
                        <div className="d-flex align-items-center justify-content-start">
                          <img src={val.img} />
                          <div className="ms-2">
                            <p className="m-0">{val.name}</p>
                            <p className="m-0">{val.designation}</p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className={`${styles.mobile_carousel} mt-5`}>
                <Carousel
                  responsive={responsive}
                  infinite={true}
                  arrows={false}
                  autoPlay={true}
                  speed={4000}
                  slidesToShow={6}
                >
                  {data.testimonial.map((val, i) => (
                    <div className={`${styles.mobile_testimonial} p-4`} key={i}>
                      <h5 className="text-center fw-700 mb-4">{val.heading}</h5>

                      <p className="text-justify lh-base f-13">
                        {val.testimonials}
                      </p>
                      <hr />
                      <div className="d-flex align-items-center justify-content-start">
                        <img src={val.img} />
                        <div className="ms-2">
                          <p className="m-0">{val.name}</p>
                          <p className="m-0">{val.designation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>

        <div className="container my-5">
          <div className="text-align-center mb-4">
            {" "}
            <span class="tp-section__subtitle white-bg mb-15 text-center">
              <i class="before-border"></i>Roar With VROAR{" "}
            </span>
          </div>
          <h1
            className={` ${styles.page__title} mb-3 ${styles.text_align_center}`}
          >
            Frequently Asked Questions<br></br>We have Answers!
          </h1>
          <div className="row align-items-center">
            <div className="col-md-8 offset-md-4 m-auto">
              <FAQ data={data.faq} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;
