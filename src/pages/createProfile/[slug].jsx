import Profiledashboard from "@/components/profile_Dashboard";
import React from "react";
import user from "@/assessts/images/profile/user.png";
import companyLogo from "@/assessts/images/profile/companyLogo.jpg";
import student from "@/assessts/images/profile/avatar.jpg";
import parent from "@/assessts/images/profile/family.jpg";
import Head from "next/head";
import coverImageStudent from "@/assessts/images/profile/Cover_Banner.jpg";
import coverImageCompany from "@/assessts/images/profile/image03.jpg";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { USER_ROLES } from "@/utils/enum";
const UpdateProfile = () => {
  const router = useRouter();

  const role = router.query.slug;
  useEffect(() => {
    if (localStorage.getItem("accesstoken")) {
      router.push("/");
      toast.warn("You are already logged in");
    }
  }, []);
  return (
    <div>
      <Head>
        <title>Create Profile</title>
      </Head>
      <Profiledashboard
        img={
          role === USER_ROLES.STUDENT
            ? "https://vroar-prod.s3.us-west-1.amazonaws.com/images/profile/student_profileAvatar.jpeg"
            : role === USER_ROLES.PARENT
            ? "https://vroar-prod.s3.us-west-1.amazonaws.com/images/profile/family.jpg"
            : companyLogo.src
        }
        // name="Kunal Sharma"
        // username="@kunal"
        cover={
          role === USER_ROLES.STUDENT || role === USER_ROLES.COMPANY
            ? coverImageStudent
            : coverImageCompany
        }
      />
    </div>
  );
};

export default UpdateProfile;
