import React from "react";
import casestudy from "../../assessts/images/homepage/casestudy.png";
import Image from "next/image";
import Head from "next/head";
const Case = () => {
  return (
    <div>
      <Head>
        <title>Case</title>
      </Head>
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-8 m-auto text-center">
            <h3 className="text-orange">
              Lorem ipsum dolor sit amet, sitelit.
            </h3>
          </div>
        </div>
        <div className="row my-3">
          <div className="col-sm-7">
            <p className="text-justify mb-3">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum. It is a long established fact that a reader will be
              distracted by the readable content of a page when looking at its
              layout. The point of using Lorem Ipsum is that it has a
              more-or-less normal distribution of letters, as opposed to using
              &apos;Content here, content here&apos;, making it look like
              readable English. Many desktop publishing packages and web page
              editors now use Lorem Ipsum as their default model text, and a
              search for &apos;lorem ipsum&apos; will uncover many web sites
              still in their infancy. Various versions have evolved over the
              years, sometimes by accident, sometimes on purpose (injected
              humour and the like).
            </p>
          </div>
          <div className="col-sm-5">
            <img
              src={
                "https://vroar.s3.eu-north-1.amazonaws.com/vroar_images/homepage/902.jpeg"
              }
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Case;
