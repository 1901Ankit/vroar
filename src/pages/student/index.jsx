import Whitewrapper from "@/components/whitewrapper";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Carousel from "react-multi-carousel";
import data from "@/assessts/data/data";
import Button from "@/components/button";
import { AiOutlineArrowRight, AiOutlineRight } from "react-icons/ai";
import { FaAngleRight, FaArrowLeft, FaCaretRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/autoplay";
import { Autoplay, Pagination, Mousewheel, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/mousewheel";
import Link from "next/link";
import FAQ from "@/components/accordion";
import studentPageContent from "@/assessts/data/studentPage";
import Journey from "@/components/journey";
import url from "@/assessts/data/url";
import Aos from "aos";
import ListingControllers from "@/api/listing";
import moment from "moment";
import WhyVroar from "@/components/StudentMain/whyvroar";
import InternshipProvider from "@/components/StudentMain/InternshipProvider";
import { useRouter } from "next/router";
import { USER_ROLES } from "@/utils/enum";
const UserStudent = () => {
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
  const [internships, setInternships] = useState([]);

  const getLatestInternships = () => {
    ListingControllers.getIntershipListingpublic()
      .then((res) => {
        setInternships(res.data.data.docs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
  const jobsresponsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
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

  const [value, setValue] = useState({
    img: `${s3url}/homepage/07.png`,
    name: "Melissa Martin    ",
    designation: "Frontend Developer",
    testimonial:
      "VROAR's tailored courses and internship were exactly what I needed to bridge the gap between academic knowledge and practical skills. All thanks to VROAR, I had the chance to work alongside industry experts during my internship. The skills and network I gained through this experience have been invaluable in progressing my career.",
  });
  const showHandler = (val) => {
    setValue(val);
  };
  const [show, setShow] = useState(true);
  const [role, setRole] = useState("");
  const router = useRouter();
  useEffect(() => {
    Aos.init();
    const loginToken = localStorage.getItem("accesstoken");
    if (loginToken) {
      setShow(false);
      setRole(localStorage.getItem("group"));
    } else {
      setShow(true);
    }
    topInternshipPorviders();
    getLatestInternships();
  }, []);
  return (
    <div>
      <Head>
        <title>Student</title>
      </Head>
      {/* <div className="grey_overlay_strip strip1"></div> */}

      <div>
        <div className={`container  ${styles.para_bg} `}>
          <div className="row align-items-center  ">
            <div className="col-sm-7  py-5">
              <div className="">
                <div className="text-left mb-4 ">
                  {" "}
                  <span class="tp-section__subtitle white-bg mb-15 text-center">
                    <i class="before-border"></i>Roar With VROAR{" "}
                  </span>
                </div>
                <h1 className={styles.page__head_title}>
                  Fueling Growth,<br></br> Igniting Success
                </h1>
                <p className={`text-justify mt-4   slab_para  `}>
                  {studentPageContent.text}
                </p>

                <Link
                  href={
                    show
                      ? "/signup"
                      : role === USER_ROLES.PARENT
                      ? "/parent-dashboard"
                      : `/dashboard/${role}`
                  }
                >
                  <Button
                    className={`custom_btn ${styles.login_btn_spcr} ${styles.custom__btn}`}
                    padding="13px"
                    width="150px"
                  >
                    {show ? "Register Now" : "Dashboard"}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="col-sm-5">
              <div className={` ${styles.image_bg}`}>
                <img
                  className={`mt-3  ${styles.image_student}`}
                  src={`${s3url}/profile/Student-Page.jpg`}
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* <div className="Why_vroar">
            <div className="container">
              <div className="row">
                <div className="col-3">
                <h1 className={` page_title`}>WHY VROAR?</h1>
                </div>

                <div className="col-9">

                <Carousel responsive={responsive}>
                <div className="slides">
                <img
                        src="https://cdn-icons-png.flaticon.com/128/814/814587.png"
                        alt=""
                        className={`${styles.image_advantage} m-auto`}
                      />
                <p className="title"> Real-World Experience</p>
                <p className="description"> Neque porro quisquam est qui dolorem</p>
                </div>
                <div className="slides">
                <img
                        src="https://cdn-icons-png.flaticon.com/128/814/814587.png"
                        alt=""
                        className={`${styles.image_advantage} m-auto`}
                      />
                <p className="title"> Real-World Experience</p>
                <p className="description"> Neque porro quisquam est qui dolorem</p>
                </div>

                <div className="slides">
                <img
                        src="https://cdn-icons-png.flaticon.com/128/814/814587.png"
                        alt=""
                        className={`${styles.image_advantage} m-auto`}
                      />
                <p className="title"> Real-World Experience</p>
                <p className="description"> Neque porro quisquam est qui dolorem</p>
                </div>

                <div className="slides">
                <img
                        src="https://cdn-icons-png.flaticon.com/128/814/814587.png"
                        alt=""
                        className={`${styles.image_advantage} m-auto`}
                      />
                <p className="title"> Real-World Experience</p>
                <p className="description"> Neque porro quisquam est qui dolorem</p>
                </div>
            
                
                </Carousel>

                </div>
              </div>
            </div>
          </div> */}
          <div className="top"></div>
          <WhyVroar />
          <div className="top"></div>

          {/* <div className="my-5">
            <h1 className={` fw-700 `}>WHY VROAR?</h1>
          </div> */}

          {/* <div className="row my-4">
            {data.studentAdvantage.map((val, i) => (
              <div
                className="col-sm-3"
                key={i}
                data-aos="fade-up"
                data-aos-offset="20"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="true"
                data-aos-anchor-placement="top"
              >
                <Whitewrapper className={`${styles.advantage_wrapper}`}>
                  <div>
                    <div className="text-center mb-3">
                      <img
                        src={val.img}
                        alt=""
                        className={`${styles.image_advantage} m-auto`}
                      />
                    </div>
                    <h6 className="f-13 fw-500">{val.title}</h6>
                  </div>
                </Whitewrapper>
              </div>
            ))}
          </div> */}

          <div className=" section_spcr_60">
            <div className="row align-items-center">
              <div className="col-sm-6 circls ">
                <Journey
                  className={styles.journey_desktop}
                  process1="Login to account"
                  process2="Build your
                Profile"
                  process3="Kick-start your career"
                  process4="Explore internships"
                  process5="Apply for internships"
                  process6="Search for Companies"
                />
              </div>

              <div className="col-sm-5">
                <div className="text-left mb-4 ">
                  {" "}
                  <span class="tp-section__subtitle white-bg mb-15 text-center">
                    <i class="before-border"></i>Roar With VROAR{" "}
                  </span>
                </div>
                <h1 className="mb-3 text-uppercase page_title">
                  Student Journey
                </h1>
                <p className="f-13 text-justify">
                  To get your hands on an internship that parallels your
                  requirements and interests, first, log in to the VROAR
                  platform. Then share your interests and skills and build a
                  student profile on the website. You’ll be suggested
                  internships that best suits your skills and interests. Connect
                  with different companies and select the company that fits your
                  requirements the best. If you feel you lack skills, then opt
                  for a tailored course that will level up your knowledge and
                  skills. Apply to the top companies and kick-start your
                  career with VROAR
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className={` our_top_courses  ${styles.section_spcr} `}>
              <div className="text-left mb-4">
                {" "}
                <span class="tp-section__subtitle white-bg mb-15 text-center">
                  <i class="before-border"></i>Roar With VROAR{" "}
                </span>
              </div>
              <h1 className={styles.page__head_title}>
                top internship programs
              </h1>

              <div>
                <Carousel
                  responsive={responsive}
                  className=""
                  infinite={true}
                  arrows={false}
                  // customLeftArrow={<FaArrowLeft />}
                  showDots={false}
                  autoPlay={true}
                  autoPlaySpeed={6000}
                  pauseOnHover={true}
                >
                  {internships.map((val, i) => {
                    return (
                      <Link href="/signup" className="link">
                        <div
                          key={i}
                          className={`${styles.internships_providers}  my-4  `}
                        >
                          <div className="d-flex align-items-center">
                            <img
                              src={val.company.logo}
                              className={styles.logo}
                            />
                            <div className="ms-2">
                              <h5 className="text-capitalize f-13 fw-semibold">
                                {val.title}
                              </h5>
                              <p className="f-12">{val.company.companyName}</p>
                            </div>
                          </div>
                          {/* <div className="row">
                            <div className="col-sm-3">
                              <img
                                src={val.company.logo}
                                width="100%"
                                className={styles.courses_image}
                              />
                            </div>
                            <div className="col-sm-9">
                              <h5
                                className={`text-start text-capitalize mb-2  f-18`}
                              >
                                {val.title}
                              </h5>
                              <p>{val.company.companyName}</p>
                            </div>
                          </div> */}
                        </div>
                      </Link>
                    );
                  })}
                </Carousel>
              </div>
            </div>{" "}
          </div>
          <div>
            <div className="">
              <div className="text-left mb-4">
                {" "}
                <span class="tp-section__subtitle white-bg mb-15 text-center">
                  <i class="before-border"></i>Roar With VROAR{" "}
                </span>
              </div>
              <h1 className={styles.page__head_title}>
                OUR TOP INTERNSHIP PROVIDERS
              </h1>
            </div>

            <div>
              <div className="marquee-carousel-container">
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
              <div className="marquee-carousel-container">
                <Carousel
                  className=""
                  responsive={responsive}
                  direction="right"
                  infinite={true}
                  arrows={false}
                  showDots={false}
                  rtl={false}
                  autoPlay={true}
                  autoPlaySpeed={2000}
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
                        {/* <div className="row align-items-center">
                          <div className="col-sm-3 text-center">
                            <img src={val.logo} className={styles.logo} />
                          </div>
                          <div className="col-sm-9 ">
                            <h5 className="text-capitalize f-18">
                              {val.companyName}
                            </h5>
                            <span className="f-12">{val.industry}</span>
                          </div>
                        </div> */}
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
                        {/* <img src={val.logo} width="100%" className="" />
                    <h4>{val.companyName}</h4> */}
                      </div>
                    </Link>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
          <div>
            <div className="section_spcr_60">
              <div className="text-left mb-4">
                {" "}
                <span class="tp-section__subtitle white-bg mb-15 text-center">
                  <i class="before-border"></i>Roar With VROAR{" "}
                </span>
              </div>
              <h1 className={styles.page__head_title}>LATEST INTERNSHIPS </h1>
            </div>
            <div className={` mt-5   `}>
              <Swiper
                // slidesPerView={5}
                modules={[Autoplay, Navigation]}
                autoplay={{
                  delay: "2000",
                }}
                navigation={true}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 5,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 5,
                  },
                }}
                loop={true}
              >
                {internships.map((val, i) => (
                  <SwiperSlide key={i}>
                    <div
                      className={`${styles.jobs}  pointer  fw-normal latest_internship`}
                      onClick={() => router.push("/signup")}
                    >
                      <h6 className={`mb-1 text-capitalize `}>{val.title}</h6>
                      <p className={` f-12 fw-semibold `}>
                        {`${val.noOfJobs} Openings`} <FaAngleRight />
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div>
            <div className="section_spcr student_testimonial">
              <div className="text-left mb-4">
                {" "}
                <span class="tp-section__subtitle white-bg mb-15 text-center">
                  <i class="before-border"></i>Roar With VROAR{" "}
                </span>
              </div>
              <h1 className={styles.page__head_title}> TESTIMONIALS</h1>
            </div>
            <div className={styles.desktop_testimonial_slider}>
              <div className="row">
                <div className="col-sm-12 ">
                  <div className="row">
                    <div className="col-sm-4">
                      <Swiper
                        direction="vertical"
                        slidesPerView={3}
                        className={styles.swiper__slider}
                        spaceBetween={2}
                        modules={[Pagination, Mousewheel]}
                        pagination={{ clickable: true }}
                        mousewheel={true}
                      >
                        {data.studentTestimonail.map((val, i) => (
                          <SwiperSlide key={i}>
                            <div
                              className={styles.testimonial_wrapper}
                              onClick={() => showHandler(val)}
                            >
                              <img src={val.img} alt="" />
                              <div>
                                <p className={`f-15 fw-semibold `}>
                                  {val.name}
                                </p>
                                <p className={`f-13 lh-base  `}>
                                  {val.designation}
                                </p>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                    <div className="col-sm-8 d-flex">
                      <div className="row">
                        <div className="col-sm-10 m-auto">
                          <div className={styles.testimonial}>
                            <div className={styles.profile_img}>
                              <img src={value.img} className="mb-3" />
                            </div>
                            <div className="my-3">
                              <h4 className={`f-20  text-center `}>
                                {value.name}
                              </h4>
                              <p className={`f-12 text-center fw-semibold `}>
                                {value.designation}
                              </p>
                            </div>

                            <img
                              src="https://cdn-icons-png.flaticon.com/128/10276/10276414.png"
                              className={styles.apostrophe_symbol}
                            />
                            <p className={`text-justify f-18 `}>
                              {value.testimonial}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles.mobile_testimonial_slider} `}>
              <Carousel
                responsive={responsive}
                direction="right"
                infinite={true}
                arrows={false}
                showDots={false}
                rtl={false}
                autoPlay={true}
                autoPlaySpeed={2000}
                pauseOnHover={true}
              >
                {data.studentTestimonail.map((val, i) => (
                  <div className={`${styles.testimonial}`} key={i}>
                    <div className={styles.profile_img}>
                      <img src={val.img} className="mb-3" />
                    </div>
                    <div className="my-3">
                      <h4 className={`f-20  text-center `}>{val.name}</h4>
                      <p className={`f-12 text-center fw-semibold `}>
                        {val.designation}
                      </p>
                    </div>

                    <img
                      src="https://cdn-icons-png.flaticon.com/128/10276/10276414.png"
                      className={styles.apostrophe_symbol}
                    />
                    <p className={`text-justify f-13 `}>{val.testimonial}</p>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
          <div className={`${styles.section_spcr} mb-3`}>
            <div className="text-align-center  mb-4">
              {" "}
              <span class="tp-section__subtitle white-bg mb-15 text-center">
                <i class="before-border"></i>Roar With VROAR{" "}
              </span>
            </div>
            <h1 className={` ${styles.page__title} text-center mb-5 `}>
              Frequently Asked Questions<br></br>We have Answers!
            </h1>
            <div className="row align-items-center">
              {/* <div
                className="col-sm-6"
                data-aos="fade-up"
                data-aos-offset="20"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="true"
                data-aos-anchor-placement="top"
              >
                <img src="https://i.ibb.co/LQKXhnj/png-transparent-male-person-and-blue-question-mark-illustration-question-mark-faq-export-male-blue-c.png" />
              </div> */}
              <div
                className="col-md-8 offset-md-4 m-auto"
                data-aos="fade-down"
                data-aos-offset="20"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="true"
                data-aos-anchor-placement="top"
              >
                <FAQ data={data.studentFaq} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStudent;
