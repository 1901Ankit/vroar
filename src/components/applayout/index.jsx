import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Subfooter from "@/components/subfooter";
import Head from "next/head";
import Header from "../header";
import styles from "./index.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import FooterMobile from "../footer_mobile";
const Applayout = ({ children }) => {
  // const router = useRouter();
  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   const role = localStorage.getItem("group");
  //   if (token) {
  //     if (role === "PARENT") {
  //       router.push("/parent-dashboard");
  //     } else {
  //       router.push(`/dashboard/${role}`);
  //     }
  //   } else {
  //   }
  // }, []);
  return (
    <div>
      <Head>
        <link rel="icon" href="/Vroar_Favicon.png" />
      </Head>
      {/* <Navbar /> */}
      <Header />
      <div>{children}</div>
      <Footer className={styles.footer_desktop} />
      <FooterMobile className={styles.footer_mobile} />
      <Subfooter />
    </div>
  );
};

export default Applayout;
