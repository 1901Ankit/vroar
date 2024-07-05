import React from "react";
import styles from "./index.module.css";
import Image from "next/image";
import wave from "../../assessts/images/homepage/wave.svg";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
const Loginbg = (props) => {
  const router = useRouter();
  return (
    <div className={`${props.className}`}>
      <div className="my-5">
        <div className={`${styles.bg_circle} `}>
          <div
            className={`container-fluid ${styles.login_bg} shadow ${props.className_bg} `}
          >
            <div className={styles.close}>
              <AiOutlineClose
                className={styles.close_button}
                onClick={() => router.back()}
              />
            </div>
            <div className="row">
              <div className="col-sm-12 m-auto">{props.children}</div>
            </div>

            <div className="row  ">
              <div className="col-sm-8">
                <img
                  src={wave.src}
                  className={` ${styles.wave} img-fluid `}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginbg;
