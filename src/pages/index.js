import Head from "next/head";
import Image from "next/image";
import { Inter, Roboto_Slab } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Courses from "@/components/courses";
import data from "@/assessts/data/data";
import homepagedescription from "@/assessts/data/constant";
import Button from "@/components/button";
import { BsArrowRight } from "react-icons/bs";
import Imagegrid from "@/components/image_grid";
import gridimage1 from "/public/images/homepage/menwalking.png";
import gridimage2 from "/src/assessts/images/homepage/02.png";
import gridimage3 from "/src/assessts/images/homepage/03.png";
import Imageflow from "@/components/imageflow";
import menImage from "@/assessts/images/profile/landing_pageImage.png";
import Aos from "aos";
import { useEffect } from "react";
import Overflow from "@/components/overflow_wrapper";
import { FaArrowUp } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import student from "@/assessts/images/homepage/student.jpg";
import parent from "@/assessts/images/homepage/parent.jpg";
import company from "@/assessts/images/homepage/company.jpg";
import MainSlider from "@/components/MainSlider";
import home_testimonial from "@/components/home_testimonial";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper";

import leftmenu from "@/assessts/images/logo/leftmenu.png";
import logo from "@/assessts/images/logo/Vroar_Logo_White.svg";
import ceo from "/src/assessts/images/homepage/04.png";
import menimage from "/src/assessts/images/homepage/05.png";
import student1 from "@/assessts/images/homepage/student1.jpg";
import student2 from "@/assessts/images/homepage/student2.jpg";
import student3 from "@/assessts/images/homepage/student3.jpg";
import student4 from "@/assessts/images/homepage/girl.jpg";
import student5 from "@/assessts/images/homepage/student5.jpg";
import student7 from "@/assessts/images/homepage/student_boy.jpg";
import student10 from "@/assessts/images/homepage/student11.jpg";
import wave from "/src/assessts/images/homepage/wave.svg";
import halfface from "../assessts/images/homepage/Vroar_LineArt_Half.svg";
import roar from "/src/assessts/images/logo/Vroar_Icon.svg";
import Multicarousel from "@/components/multicarousel";
import url from "@/assessts/data/url";
import Link from "next/link";
import { Colors } from "chart.js";
import { AiOutlineLine } from "react-icons/ai";
import { useRouter } from "next/router";
import { USER_ROLES } from "@/utils/enum";
const roboto = Roboto_Slab({ subsets: ["latin"], weight: "500" });
const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const s3url = url.s3url;

  useEffect(() => {
    Aos.init();
  }, []);

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
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    const role = localStorage.getItem("group");

    console.log(token);
    if (token) {
      if (role === USER_ROLES.PARENT) {
        router.push("/parent-dashboard");
      } else {
        router.push(`/dashboard/${role}`);
      }
    } else {
    }
  }, []);

  return (
    <div>
      <Head>
        <title>
          Find Internships | AI-Powered Internships | Kickstart Your Career -
          VROAR
        </title>
        <meta
          name="description"
          content="   Discover exciting internship opportunities with VROAR. Connect
          students with top companies and launch your career. Explore
          internships today! Apply and register for free now."
        />
      </Head>

      <div className="">
        <div className="hero-fullscreen-FIX">
          <div className="hero-bg">
            {/* hero slider wrapper start */}
            <Swiper
              loop={true}
              init={true}
              speed={1200}
              grabCursor={true}
              mousewheel={true}
              keyboard={true}
              simulateTouch={true}
              parallax={true}
              navigation={true}
              spaceBetween={0}
              centeredSlides={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              pagination={{
                el: ".swiper-slide-pagination",
                clickable: true,
              }}
              // navigation={{
              //   nextEl: ".slide-next",
              //   prevEl: ".slide-prev",
              // }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 0,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 0,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 0,
                },
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className="swiper-container-wrapper mySwiper"
            >
              <SwiperSlide className="swiper-slide">
                <div className="swiper-slide-inner">
                  {/* swiper slider item IMG start */}
                  <div className="swiper-slide-inner-bg-2 bg-img-1 overlay overlay-dark" />
                  {/* swiper slider item IMG end */}
                  {/* swiper slider item txt start */}
                  <div className="swiper-slide-inner-txt-2">
                    {/* section title start */}
                    <h1 className="main-title fadeIn-element f-110">
                      <span>Student</span>{" "}
                    </h1>
                    <br />
                    <p>
                      Find Your path defining internship<br></br> opportunities
                      here !
                    </p>

                    {/* section title end */}
                    {/* divider start */}
                    <div className="inner-divider-ultra-half" />
                    {/* divider end */}
                    {/* button start */}
                    <div className="button-the-wrapper button-the-wrapper-light fadeIn-element">
                      <a
                        className={`${styles.internship_programs} button-the button-the-light `}
                        href="/student"
                      >
                        <span className="me-1">
                          <AiOutlineLine size={20} />
                        </span>
                        View Internship Programs
                        <span className="ms-1">
                          <AiOutlineLine size={20} />
                        </span>
                      </a>
                    </div>
                    {/* button end */}
                  </div>
                  {/* swiper slider item txt end */}
                </div>
              </SwiperSlide>

              {/* swiper slider item end */}
              {/* swiper slider item start */}
              <SwiperSlide className="swiper-slide">
                <div className="swiper-slide-inner">
                  {/* swiper slider item IMG start */}
                  <div
                    className={`swiper-slide-inner-bg-2 bg-img-2 overlay overlay-dark`}
                  />
                  {/* swiper slider item IMG end */}
                  {/* swiper slider item txt start */}
                  <div className="swiper-slide-inner-txt-2">
                    {/* section title start */}
                    <h1 className="main-title fadeIn-element f-110">
                      <span>Parent</span>{" "}
                    </h1>
                    <br />
                    <p>
                      Your Ward Career can <br></br>roar in no time !
                    </p>

                    {/* section title end */}
                    {/* divider start */}
                    <div className="inner-divider-ultra-half" />
                    {/* divider end */}
                    {/* button start */}
                    <div className="button-the-wrapper button-the-wrapper-light fadeIn-element">
                      <a
                        className="button-the button-the-light text-orange"
                        href="/parent"
                      >
                        <span className="me-1">
                          <AiOutlineLine size={20} />
                        </span>
                        See How
                        <span className="ms-1">
                          <AiOutlineLine size={20} />
                        </span>
                      </a>
                    </div>
                    {/* button end */}
                  </div>
                  {/* swiper slider item txt end */}
                </div>
              </SwiperSlide>

              {/* swiper slider item end */}
              {/* swiper slider item start */}
              <SwiperSlide className="swiper-slide">
                <div className="swiper-slide-inner">
                  {/* swiper slider item IMG start */}
                  <div className="swiper-slide-inner-bg-2 bg-img-3 overlay overlay-dark" />
                  {/* swiper slider item IMG end */}
                  {/* swiper slider item txt start */}
                  <div className="swiper-slide-inner-txt-2">
                    {/* section title start */}
                    <h1 className="main-title fadeIn-element f-110">
                      <span>Company</span>{" "}
                    </h1>
                    <br />
                    <p>
                      Looking for talents,<br></br> start posting job for free !
                    </p>

                    {/* section title end */}
                    {/* divider start */}
                    <div className="inner-divider-ultra-half" />
                    {/* divider end */}
                    {/* button start */}
                    <div className="button-the-wrapper button-the-wrapper-light fadeIn-element">
                      <a
                        className="button-the button-the-light text-orange"
                        href="/company"
                      >
                        <span className="me-1">
                          <AiOutlineLine size={20} />
                        </span>
                        Post Internships
                        <span className="ms-1">
                          <AiOutlineLine size={20} />
                        </span>
                      </a>
                    </div>
                    {/* button end */}
                  </div>
                  {/* swiper slider item txt end */}
                </div>
              </SwiperSlide>

              <SwiperSlide className="swiper-slide">
                <div className="swiper-slide-inner">
                  {/* swiper slider item IMG start */}
                  <div className="swiper-slide-inner-bg-2 bg-img-1 overlay overlay-dark" />
                  {/* swiper slider item IMG end */}
                  {/* swiper slider item txt start */}
                  <div className="swiper-slide-inner-txt-2">
                    {/* section title start */}
                    <h1 className="main-title fadeIn-element f-110">
                      <span>Student</span>{" "}
                    </h1>
                    <br />
                    <p>
                      Find Your path defining internship<br></br> opportunities
                      here !
                    </p>

                    {/* section title end */}
                    {/* divider start */}
                    <div className="inner-divider-ultra-half" />
                    {/* divider end */}
                    {/* button start */}
                    <div className="button-the-wrapper button-the-wrapper-light fadeIn-element">
                      <a
                        className="button-the button-the-light text-orange"
                        href="/student"
                      >
                        <span className="me-1">
                          <AiOutlineLine size={20} />
                        </span>
                        View Internship Programs
                        <span className="ms-1">
                          <AiOutlineLine size={20} />
                        </span>
                      </a>
                    </div>
                    {/* button end */}
                  </div>
                  {/* swiper slider item txt end */}
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="swiper-slide-inner">
                  {/* swiper slider item IMG start */}
                  <div className="swiper-slide-inner-bg-2 bg-img-2 overlay overlay-dark" />
                  {/* swiper slider item IMG end */}
                  {/* swiper slider item txt start */}
                  <div className="swiper-slide-inner-txt-2">
                    {/* section title start */}
                    <h1 className="main-title fadeIn-element f-110">
                      <span>Parent</span>{" "}
                    </h1>
                    <br />
                    <p>
                      Your Ward Career can <br></br>roar in no time !
                    </p>

                    {/* section title end */}
                    {/* divider start */}
                    <div className="inner-divider-ultra-half" />
                    {/* divider end */}
                    {/* button start */}
                    <div className="button-the-wrapper button-the-wrapper-light fadeIn-element">
                      <a
                        className="button-the button-the-light text-orange"
                        href="/parent"
                      >
                        <span className="me-1">
                          <AiOutlineLine size={20} />
                        </span>
                        See How
                        {/* View Internship Programs */}
                        <span className="ms-1">
                          <AiOutlineLine size={20} />
                        </span>
                      </a>
                    </div>
                    {/* button end */}
                  </div>
                  {/* swiper slider item txt end */}
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="swiper-slide-inner">
                  {/* swiper slider item IMG start */}
                  <div className="swiper-slide-inner-bg-2 bg-img-3 overlay overlay-dark" />
                  {/* swiper slider item IMG end */}
                  {/* swiper slider item txt start */}
                  <div className="swiper-slide-inner-txt-2">
                    {/* section title start */}
                    <h1 className="main-title fadeIn-element f-110">
                      <span>Company</span>{" "}
                    </h1>
                    <br />
                    <p>
                      Looking for talents,<br></br> start posting job for free !
                    </p>

                    {/* section title end */}
                    {/* divider start */}
                    <div className="inner-divider-ultra-half" />
                    {/* divider end */}
                    {/* button start */}
                    <div className="button-the-wrapper button-the-wrapper-light fadeIn-element">
                      <a
                        className="button-the button-the-light text-orange"
                        href="/company"
                      >
                        <span className="me-1">
                          <AiOutlineLine size={20} />
                        </span>
                        Post Internship
                        <span className="ms-1">
                          <AiOutlineLine size={20} />
                        </span>
                      </a>
                    </div>
                    {/* button end */}
                  </div>
                  {/* swiper slider item txt end */}
                </div>
              </SwiperSlide>

              {/* swiper slider item end */}
              {/* swiper slider item start */}
              {/* swiper slider item end */}

              {/* swiper container end */}
            </Swiper>
            {/* hero slider wrapper end */}
            {/* social icons start */}
            <div className="social-icons-home">
              <ul>
                <li className={`fadeIn-element ${styles.bannerIcons}`}>
                  <a
                    className="ion-social-twitter"
                    href="https://twitter.com/Vroar_ai"
                  >
                    <span>Twitter</span>
                  </a>
                </li>
                <li className={`fadeIn-element ${styles.bannerIcons}`}>
                  <a
                    className="ion-social-facebook"
                    href="https://www.facebook.com/vroarai"
                  >
                    <span>Facebook</span>
                  </a>
                </li>
                <li className={`fadeIn-element ${styles.bannerIcons}`}>
                  <a
                    className="ion-social-instagram"
                    href="https://www.instagram.com/vroar.ai/"
                  >
                    <span>Instagram</span>
                  </a>
                </li>
              </ul>
            </div>
            {/* social icons end */}
            {/* bottom credits start */}
            <div className="bottom-credits">
              <div className="fadeIn-element">© All Rights Reserved</div>
            </div>
            {/* bottom credits end */}
            {/* swiper slider controls start */}

            {/* swiper slider controls end */}
            {/* swiper slider pagination start */}
            <div className="swiper-slide-pagination fadeIn-element" />
            {/* swiper slider pagination end */}
            {/* swiper slider play-pause start */}

            {/* swiper slider play-pause end */}
          </div>
        </div>
      </div>

      {/* <div className="main_wrapper">
      <div className={`${styles.wave_wrapper}` }>
        <img
          src={`${s3url}/homepage/wave.svg`}
          className={`${styles.wave_image}`}
        />
      </div></div> */}

      <div className={`${styles.who_we_are} container`}>
        <div className="row align-items-center">
          <div className="col-sm-6 col-md-6 col-lg-6">
            {/* <div className={`${styles.image_wrapper}`}>
              <img
                src={`${s3url}/homepage/05.png`}
                className={`${styles.img_men} `}
              />
            </div> */}
            <img src={menImage.src} alt="" width="100%" />
          </div>
          {/* <div className="col-sm-2 col-md-3 col-lg-2"></div> */}

          <div className="col-sm-6 col-md-6 col-lg-6">
            <div className="text-left my-4">
              {" "}
              <span class="tp-section__subtitle white-bg mb-15 text-center">
                <i class="before-border"></i>Roar With VROAR{" "}
              </span>
            </div>
            <h1 className="page_title">How We Roar</h1>
            <div className="text-justify">
              {/* <span class="descript-dash">&nbsp;</span>{" "} */}
              <span className="f-20 fw-semibold "> VROAR</span>{" "}
              <span className={`slab_para  fw-normal `}>
                is built upon the belief that every student, regardless of their
                background or socio-economic status, deserves the opportunity to
                hone their skills and discover their potential. We leverage the
                power of Artificial Intelligence to offer internship programs
                specifically designed based on a student&apos;s interests &
                skills.
              </span>
            </div>
            <div className="row mt-4">
              <div className="col-sm-6">
                <p
                  className={`${inter.className} text-justify para_style1 f-13`}
                >
                  {homepagedescription.homepagedescription.message4}
                </p>
              </div>
              <div className="col-sm-6">
                <p className={`${inter.className} text-justify  f-13`}>
                  {homepagedescription.homepagedescription.message5}
                </p>
              </div>
            </div>
            <div className="mt-5">
              <Link href={"/about-us"}>
                <Button
                  className="custom_btn"
                  padding="15px"
                  width="150px"
                  rounded="8px"
                >
                  Read More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
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
                  <p className={`${roboto.className} text-uppercase`}>
                    {val.tech}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`container section_mtop`}>
        <div className="row">
          <div
            className={`col-sm-12 col-md-12 col-lg-12 m-auto ${styles.border_bottom}`}
          >
            <div className="row align-items-end">
              <div className="col-sm-6 ">
                <div className="text-left mb-4">
                  {" "}
                  <span class="tp-section__subtitle white-bg mb-15 text-center">
                    <i class="before-border"></i>Roar With VROAR{" "}
                  </span>
                </div>
                <h1 className="page_title">
                  What <strong>VROAR</strong> Do
                </h1>
                <p className={` slab_para text-justify mb-3`}>
                  {homepagedescription.homepagedescription.message1}
                </p>
              </div>
              <div className="col-sm-4 ">
                <p className={`para_style1 text-justify f-13 mb-3`}>
                  {homepagedescription.homepagedescription.message2}
                </p>
              </div>
              <div className="col-sm-2">
                <Link href={"/signup"}>
                  <Button
                    className={`${roboto.className} custom_btn mb-3`}
                    padding="13px"
                    width={150}
                    rounded="8px"
                  >
                    Go
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
      </div>
      {/* <MainSlider/> */}
      <div className="container  my-5">
        <div className="row">
          <div className="col-sm-12 m-auto">
            <div className={`${styles.image_overlay}`}>
              <div>
                <img
                  src={`${s3url}/logo/Vroar_Icon.svg`}
                  className={`${styles.roar_image}`}
                />
                {/* <img src={roar.src} className={styles.roar_image} /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="  m-auto text-center">
            <div className={` ${styles.heading_roar_wrapper}`}>
              <h4 className={` ${styles.heading_roar} fw-semibold`}>
                FIND THE <br></br>FUTURE OF YOUR WORKFORCE<br></br> TODAY
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* <Multicarousel data={data.studentdata} /> */}

      <>
        {" "}
        <home_testimonial />
      </>
      <section id="team" className="section mod--team">
        <div className="sticky mod--team">
          <div className="content mod--team">
            <div data-swiper="team" className="swiper mod--team mod--even">
              <Swiper
                loop={true}
                init={true}
                speed={800}
                grabCursor={true}
                mousewheel={true}
                keyboard={true}
                simulateTouch={true}
                parallax={true}
                // spaceBetween={0}
                centeredSlides={true}
                // slidesPerView={5}
                onAutoplay={false}
                autoplay={{
                  delay: 4500,
                  disableOnInteraction: false,
                  reverseDirection: true,
                }}
                navigation={true}
                onSlideChange={() => {}}
                loopAdditionalSlides={2}
                modules={[Autoplay, Pagination, Navigation]}
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
                className="swiper-wrapper mySwiper"
              >
                {data.talent.map((val, i) => (
                  <SwiperSlide className="swiper-slide mod--team" key={i}>
                    <div className="team__slide">
                      <div
                        data-remodal-target="form"
                        className="overflow-hidden mod--team"
                      >
                        <img
                          src={val.image.src}
                          alt=""
                          className="img mod--team"
                        />
                      </div>
                      <div>
                        <div className="team_title text-uppercase">
                          {val.name}
                        </div>
                        <div className="team_designation">
                          {val.designation}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      <Courses data={data.courses} className="mb-5  " />
      {/* <MainSlider/> */}
    </div>
  );
}
