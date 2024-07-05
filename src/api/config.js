import Axios from "axios";
import jwt from "jsonwebtoken";
import moment from "moment";
import { useRouter } from "next/router";

// const ServerUrl = "https://dev.api.vroar.ai/";
const ServerUrl = "https://api.vroar.ai/";

const securedApi = Axios.create({
  baseURL: `${ServerUrl}`,
});

const decodeJwt = (token) => {
  try {
    const decoded = jwt.decode(token);
    return decoded;
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
};

securedApi.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("accesstoken");
  config.headers.accesstoken = `${token}`;
  const refreshToken = localStorage.getItem("refreshtoken");
  const decodedToken = decodeJwt(token);
  if (decodedToken && decodedToken.exp < moment().unix()) {
    try {
      const response = await Axios.post(
        `${ServerUrl}api/user/renewAccessToken`,
        {
          accessToken: token,
          refreshToken: refreshToken,
        }
      );

      if (response.status === 200) {
        const newAccessToken = response.data.data.accessToken;
        const newRefreshToken = response.data.data.refreshToken;
        localStorage.setItem("accesstoken", newAccessToken);
        localStorage.setItem("refreshtoken", newRefreshToken);
        config.headers.accesstoken = newAccessToken;
      }
    } catch (error) {
      console.error("Refresh token failed:", error);
      localStorage.clear();
      const router = useRouter();
      router.push("/");
    }
  }
  return config;
});

const publicApi = Axios.create({
  baseURL: `${ServerUrl}`,
});

const expiredToken = (error) => {
  if (error.response) {
    if (error.response.status === 401) {
      return true;
    }
  }
  return false;
};

const forbiddenError = (error) => {
  if (error.response) {
    if (error.response.status === 403) {
      return true;
    }
  }
  return false;
};

export default { securedApi, publicApi, expiredToken, forbiddenError };
