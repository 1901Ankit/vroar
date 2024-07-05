import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-circular-progressbar/dist/styles.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-multi-carousel/lib/styles.css";
import "react-toastify/dist/ReactToastify.css";
import Applayout from "../components/applayout";
import "animate.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "@/redux/store";
import Modal from "@/components/modal";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { USER_ROLES } from "@/utils/enum";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  // useEffect(() => {
  //   const token = localStorage.getItem("accesstoken");
  //   const role = localStorage.getItem("group");
  //   if (token) {
  //     if (role === USER_ROLES.PARENT) {
  //       router.push("/parent-dashboard");
  //     } else {
  //       router.push(`/dashboard/${role}`);
  //     }
  //   } else {
  //   }
  // }, []);
  return (
    <Provider store={store}>
      <Applayout>
        <ToastContainer autoClose={2000} />
        <Modal />
        <Component {...pageProps} />
      </Applayout>
    </Provider>
  );
}
