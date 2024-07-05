import { useEffect, useState } from "react";
import publicApi from "./config";
import securedApi from "./config";

const Authcontrollers = {
  register: (data) => {
    try {
      let result = publicApi.publicApi.post(`/api/user/loginOrRegister`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  verifyotp: (data) => {
    let { otp, referenceId } = data;
    try {
      let result = publicApi.publicApi.post("/api/user/verify", {
        otp: otp,
        referenceId: referenceId,
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  getuserdetails: async () => {
    try {
      let result = await securedApi.securedApi.get(
        "/api/profile/getProfile",
        {}
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getProfileUserDetails: async (role) => {
    console.log(role);
    try {
      let result = await publicApi.publicApi.get(
        `/api/profile/getProfile?group=${role}`,
        {
          headers: {
            accesstoken: localStorage.getItem("verifiedToken"),
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  createprofile: (data) => {
    console.log(data);
    const socialLink = JSON.parse(data.socialLink);
    let {
      salutation,
      fullName,
      avatar,
      coverImage,
      birthDate,
      parentEmail,
      password,
      userRole,
      email,
      phoneNo,
      userName,
    } = data;
    try {
      let result = publicApi.publicApi.post(
        "api/user/updateUserDetail",
        {
          salutation,
          fullName,
          avatar,
          coverImage,
          password,
          userRole,
          email,
          phoneNo,
          userName,
          socialLink,
          birthDate,
          parentEmail,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            accesstoken: localStorage.getItem("verifiedToken"),
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  updatecompanyprofile: (data) => {
    data.socialLink = data.socialLink ? JSON.parse(data.socialLink) : [];

    try {
      let result = publicApi.publicApi.post(
        "api/company/updateDetail",
        {
          fullName: data.fullName,
          salutation: data.salutation,
          userRole: data.userRole,
          email: data.email,
          password: data.password,
          userName: data.userName,
          companyName: data.companyName,
          companyPhoneNo: data.companyPhoneNo,
          companyEmail: data.companyEmail,
          website: data.website,
          startedDate: data.startedDate,
          companyType: data.companyType,
          teamSize: data.teamSize,
          industry: data.industry,
          tagLine: data.tagLine,
          companyLogo: data.companyLogo,
          companyCoverImage: data.companyCoverImage,
          socialLink: data.socialLink,
          address: {
            state: data.state,
            city: data.city,
            address1: data.address1,
            zipCode: data.zipCode,
            address2: data.address2,
          },
          designation: data.designation,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            accesstoken: localStorage.getItem("verifiedToken"),
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  addchild: (data) => {
    let {
      fullName,
      birthDate,
      email,
      salutation,
      userRole,
      roleId,
      designation,
    } = data;
    try {
      let result = securedApi.securedApi.post("/api/member/addMember", {
        salutation: salutation,
        fullName: fullName,
        birthDate: birthDate,
        email: email,
        userRole: userRole,
        roleId: roleId,
        designation: designation,
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  login: (data) => {
    let { email, password } = data;
    try {
      let result = securedApi.securedApi.post("/api/user/login", {
        email: email,
        password: password,
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  logout: () => {
    try {
      let result = securedApi.securedApi.get("/api/logout/currentSession");
      return result;
    } catch (error) {
      throw error;
    }
  },
  googleLogin: () => {
    try {
      let result = publicApi.publicApi.get("api/socialLogin/google");
      return result;
    } catch (error) {
      throw error;
    }
  },
  googleLoginCallback: (value) => {
    try {
      let result = publicApi.publicApi.get(
        `api/socialLogin/google/callback?code=${value}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};

export default Authcontrollers;
