import Button from "@/components/button";
import Whitewrapper from "@/components/whitewrapper";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "./index.module.css";
import data from "@/assessts/data/data";
import Carousel from "react-multi-carousel";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper";
import "swiper/css/pagination";
import FAQ from "@/components/accordion";
import studentPageContent from "@/assessts/data/studentPage";
import url from "@/assessts/data/url";
import { useEffect } from "react";
import Aos from "aos";
import WhyVroar from "@/components/StudentMain/whyvroar";
import ListingControllers from "@/api/listing";
import { useState } from "react";
import { useSelector } from "react-redux";
import { USER_ROLES } from "@/utils/enum";
const Parent = () => {
  const s3url = url.s3url;

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
  const [show, setShow] = useState(false);
  const role = useSelector((state) => state.userdetails.group);
  useEffect(() => {
    Aos.init();
    topInternshipPorviders();
    const token = localStorage.getItem("accesstoken");

    if (token) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, []);
  return (
    <div>
      <Head>
        <title>Parent</title>
      </Head>
      {/* <div className="grey_overlay_strip strip2"></div> */}
      <div className="container mt-3">
        <div className="row align-items-center  ">
          <div className="col-sm-7  py-5">
            <div className="">
              <div className="text-left mb-4 ">
                {" "}
                <span class="tp-section__subtitle white-bg mb-15 text-center">
                  <i class="before-border"></i>Roar With VROAR{" "}
                </span>
              </div>

              <h1 className={`${styles.page__head_title} mb-4 `}>
                Elevating Your <br></br> Child's Career
              </h1>
              <p className={`text-justify   slab_para `}>
                At VROAR, we understand that as a parent, your child's future is
                of paramount importance. That's why we are fully committed to
                elevating your child's career to new heights. Our platform is
                more than just an internship hub; it's a springboard to success,
                a launchpad for dreams, and a nurturing ground for talent. With
                VROAR, you can rest assured that your child is in the capable
                hands of a platform that prioritizes excellence above all else.
                We offer a holistic and empowering experience that not only
                connects your child with valuable internship opportunities but
                also provides the guidance and resources they need to thrive.
                Together, let's embark on this transformative journey with
                VROAR, where excellence is not just a goal; it's a promise we're
                determined to keep.
              </p>
              <Link
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
          <div className="col-sm-5" style={{ zIndex: "-1" }}>
            <div className={` ${styles.imagebgs}`}>
              <img
                src={`${s3url}/profile/Parents-Page.jpg`}
                width={400}
                height={500}
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
        </div>

        {/* <div className="section_spcr">
        <div className="row ">
        <div className="text-left mb-4 ">   <span class="tp-section__subtitle white-bg mb-15 text-center"><i class="before-border"></i>Roar With VROAR </span></div>
          <h1 className="page_title">Why VROAR?</h1>
          <div className="row">
            {data.advantageParent.map((val, i) => (
              <div className="col-sm-4 my-3" key={i}>
                <Whitewrapper className={styles.advantage_wrapper_company}>
                  <div className="text-center p-3">
                    <img src={val.img.src} width={30} />
                  </div>
                  <h6 className="text-center">{val.title}</h6>
                </Whitewrapper>
              </div>
            ))}
            <div className="col-sm-4"></div>
          </div>
        </div>
</div> */}
        <div className="top"></div>
        <WhyVroar />
        <div className="top"></div>
        <div className={styles.section_spcr}>
          <div className="">
            <div className="text-left mb-4">
              {" "}
              <span class="tp-section__subtitle white-bg mb-15 text-center">
                <i class="before-border"></i>Roar With VROAR{" "}
              </span>
            </div>
            <h1 className={` page_title`}>OUR TOP INTERNSHIP PROVIDERS</h1>
          </div>
          {/* <Carousel
            responsive={responsive}
            infinite={true}
            arrows={false}
            showDots={true}
            autoPlay={true}
            autoPlaySpeed={2000}
            pauseOnHover={true}
            className="my-4"
          >
            {data.company.map((val, i) => (
              <div className="text-center">
                <h3 className={styles.company_logo}>{val.title}</h3>
              </div>
            ))}
          </Carousel> */}
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
                <Link href={"/signup"} className="link ">
                  <div
                    key={i}
                    height={100}
                    width="90%"
                    className={`my-2  ${styles.internships_providers}`}
                  >
                    {/* <div className="row align-items-center">
                      <div className="col-sm-3 text-center">
                        <img src={val.logo} className={styles.logo} />
                      </div>
                      <div className="col-sm-9 ">
                        <h5 className="f-18 text-capitalize">
                          {val.companyName}
                        </h5>
                        <span className="f-12">{val.industry}</span>
                      </div>
                    </div> */}
                    <div className="d-flex align-items-center">
                      <img src={val.logo} className={styles.logo} />
                      <div className="ms-3">
                        <h5 className="f-18">{val.companyName}</h5>
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
                      <img src={val.logo} className={styles.logo} />
                      <div className="ms-3">
                        <h5 className="f-18">{val.companyName}</h5>
                        <p className="f-12">{val.industry}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </Carousel>
          </div>
        </div>
        <div className="row  ">
          <div className="text-left mb-4">
            {" "}
            <span class="tp-section__subtitle white-bg mb-15 text-center">
              <i class="before-border"></i>Roar With VROAR{" "}
            </span>
          </div>
          <h1 className=" page_title">Testimonials</h1>
          <div className="col-sm-12 my-3 ">
            <div className={`${styles.desktop_carousel} border_testimonial`}>
              <Swiper
                modules={[Pagination, Autoplay]}
                grabCursor={true}
                loop={true}
                autoplay={{
                  delay: "2000",
                }}
              >
                {data.parentTestimonial.map((val, i) => (
                  <SwiperSlide key={i}>
                    <div className={styles.parent_testimonialWrapper}>
                      <div className="row">
                        <div className="col-sm-4 image_circle">
                          <img src={val.img} width="100%" height="100%" />
                        </div>
                        <div className="col-sm-8 p-2">
                          <h1 className="mb-3">{val.name}</h1>

                          <p className={`f-13 testimonial_para  text-justify `}>
                            {val.testimonial}
                          </p>
                          <div className="d-flex align-items-center justify-content-end"></div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className={styles.mobile_carousel}>
              <Carousel
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
                {data.parentTestimonial.map((val, i) => (
                  <div className={styles.testimonial_wrapper} key={i}>
                    <div className="row p-2 border_bottom align-items-center">
                      <div className="col-6">
                        <img src={val.img} className={styles.image} />
                      </div>
                      <div className="col-6">
                        <h1>{val.name}</h1>
                      </div>
                    </div>
                    <p className="f-12 text-justify p-2">{val.testimonial}</p>
                    {/* <div className="row">
                      <div className="col-sm-4 image_circle">
                        <img src={val.img} width="100%" height="100%" />
                      </div>
                      <div className="col-sm-8 p-2">
                        <h1 className="mb-3">{val.name}</h1>

                        <p className={`f-13 testimonial_para  text-justify `}>
                          {val.testimonial}
                        </p>
                        <div className="d-flex align-items-center justify-content-end"></div>
                      </div>
                    </div> */}
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>

        <div className={styles.section_spcr}>
          <div className="row   align-items-center">
            <div className="text-align-center mb-4">
              {" "}
              <span class="tp-section__subtitle white-bg mb-15 text-center">
                <i class="before-border"></i>Roar With VROAR{" "}
              </span>
            </div>
            <h1 className={` ${styles.page__title} text-center mb-2`}>
              Frequently Asked Questions<br></br>We have Answers!
            </h1>

            <div className="col-md-8 offset-md-4 m-auto">
              <FAQ data={data.parentFaq} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parent;
