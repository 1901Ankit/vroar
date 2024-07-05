import React from "react";
import Carousel from "react-multi-carousel";
import styles from "./index.module.css";
import Image from "next/image";
import { Roboto_Slab } from "next/font/google";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Mousewheel, Navigation } from "swiper";
import "swiper/css/bundle";
import Loading from "../loading";
import Whitewrapper from "../whitewrapper";
import moment from "moment";

const roboto = Roboto_Slab({ subsets: ["latin"], weight: "500" });
const Multicarousel = (props) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
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

  if (props.data.length === 0) {
    return <p>No Internship Found</p>;
  }

  if (props.loading) {
    return <Loading type="spin" width={25} height={25} className="m-auto" />;
  } else {
    return (
      <div>
        {/* <Carousel
          responsive={responsive}
          centerMode={true}
          infinite={true}
          autoPlay={false}
          autoPlaySpeed={2000}
        >
          {props.data.map((val, i) => (
            <Whitewrapper key={i}>
              <div className="container">
                <div className="row">
                  <div className="col-sm-3">
                    <img src={val.company.logo} alt="" width="100%" />
                  </div>
                  <div className="col-sm-9">
                    <p className="fw-semibold">{val.title}</p>
                  </div>
                </div>
              </div>
            </Whitewrapper>
          ))}
        </Carousel> */}
        <Swiper
          direction="horizontal"
          slidesPerView={4}
          spaceBetween={10}
          grabCursor={true}
          className="my-3 "
        >
          {props.data.map((val, i) => {
            return (
              <SwiperSlide style={{ width: "269.667px",height:"100px" }} className="my-auto" >
                <Whitewrapper key={i} height="100px">
                  <div className="container">
                    <div className="row">
                      <div className="col-sm-3">
                        <img src={val.company.logo} alt="" width="100%" />
                      </div>
                      <div className="col-sm-9">
                        <p className="fw-semibold">{val.title}</p>
                        <p className="f-13">{val.company.companyName}</p>
                        <p className="f-13">
                          Experience :{" "}
                          {val.experience === "0" ? "Fresher" : val.experience}
                        </p>
                        {/* <p className="f-13">
                          From : {moment(val.duration.from).format("L")}
                        </p> */}
                        <p className="f-13">
                          Vacancies : <span>{val.noOfJobs}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Whitewrapper>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  }
};

export default Multicarousel;
