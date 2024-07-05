import publicApi from "./config";
import securedApi from "./config";
const verifyControllers = {
  verifyPhone: (data) => {
    try {
      let result = securedApi.securedApi.post("api/updatePhone/addNewPhone", {
        phoneNo: data.phoneNo,
        countryCode: data.countryCode,
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  // getunverifieduser: (data) => {
  //   try {
  //     let result = publicApi.publicApi.get("/api/user/getUserDetail", {
  //       headers: {
  //         accesstoken: data,
  //       },
  //     });
  //     return result;
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  getmemberverification: (data) => {
    try {
      let result = publicApi.publicApi.get("/api/member/verify", {
        headers: {
          accesstoken: data,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  addmember: (data) => {
    try {
      let result = securedApi.securedApi.post(
        "/api/member/updateProfile",
        {
          avatar: data.avatar,
          countryCode: data.countryCode,
          coverImage: data.coverImage,
          password: data.password,
          userName: data.userName,
          fullName: data.fullName,
          birthDate: data.birthDate,
          companyEmail: data.companyEmail,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getStaff: () => {
    try {
      let result = securedApi.securedApi.get(
        "/api/company/getRoles?page=1&pageSize=50"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  getOtpverification: (data) => {
    try {
      let result = securedApi.securedApi.post(
        "api/updatePhone/phoneNoVerification",
        {
          referenceId: data.referenceId,
          otp: data.otp,
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  getEmailVerification: (data) => {
    // console.log("dat", data);
    try {
      let result = securedApi.securedApi.post("api/updateEmail/addNewEmail", {
        email: data.email,
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  getEmailOtpVerification: async (data) => {
    try {
      let result = await securedApi.securedApi.post(
        "api/updateEmail/emailVerification",
        {
          referenceId: data.referenceId,
          otp: data.otp,
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  verifyOtpForgotPassword: async (data) => {
    try {
      let result = await securedApi.securedApi.post(
        "api/forgotPassword/verify",
        {
          referenceId: data.referenceId,
          otp: data.otp,
          password: data.password,
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};

export default verifyControllers;
