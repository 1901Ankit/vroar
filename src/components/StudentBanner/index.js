import Link from "next/link";
import React from "react";
import Aos from "aos";
import Tilt from "react-parallax-tilt";
import Button from "@/components/button";


const about_content = {
  
    title: <>FUELING GROWTH,  <br />  <span> IGNITING SUCCESS.</span></>,
    service_title: "Service",
    service_1: <>Fashion Photography <br /> Wedding Photography <br /> Commercial Shooting <br /> Photo Studio</>,
    service_2: <>Geographic Photo Contest 2022 <br /> <a href="#">Sony World Photography 2018</a> <br /> Monovisions Photography 2017</>,
    btn: "get in touch"

}


const { about, title, service_title, service_1, service_2, btn } =
  about_content;
  
const AboutArea = () => {
  return (
    <>
      <div className="ptg-about dark-bg pt-120 pb-90 p-relative">
        <div className="container">
          <div className="row">
            <div className="col-xl-7 col-lg-6">
            <div className="">
                <h1 className={`f-45 text-left text-uppercase fw-700 `}>
                  Fueling Growth, Igniting Success
                </h1>
                <p className={`text-justify my-4   f-13  `}>
                  {studentPageContent.text}
                </p>

                <div className="grey_overlay">
                  
                </div>
                <Link href="/login">
                  <Button
                    className={`custom_btn`}
                    border="none"
                    padding="8px"
                    width="150px"
                    fw="500"
                    rounded="5px"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </div>
            <div className="col-xl-5 col-lg-6">
              <div className="ptg-about-img-wrapper p-relative wow tpfadeUp">
                <Tilt
                  className="tilt-img"
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  perspective={900}
                  scale={1}
                  transitionSpeed={1000}
                  gyroscope={true}
                >
                  <div
                    className="ptg-about-img"
                    data-tilt
                    data-tilt-perspective="2000"
                  >
                    <img
                      src="https://gencio-next-js.vercel.app/assets/img/about/pta-about-img.jpg"
                      alt="about"
                    />
                  </div>
                </Tilt>
                <div className="pta-about-circle">
                  <img src="https://gencio-next-js.vercel.app/assets/img/about/ptg-ab-circle.png" alt="circe" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutArea;
