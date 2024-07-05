const { default: url } = require("./url");

const s3url = url.s3url;
const studentInterest = {
  company1: {
    companyLogo: `${s3url}/logo/Vroar_Icon.svg`,
    companyName: "Vroar",
    followers: "42,378",
    btn: "Following",
  },
  company2: {
    companyLogo: `${s3url}/logo/Vroar_Icon.svg`,
    companyName: "Vroar",
    followers: "42,378",
    btn: "Following",
  },
};

export default studentInterest
