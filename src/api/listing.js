import securedApi from "./config";
import publicApi from "./config";
const ListingControllers = {
  getcompanyListing: (data) => {
    try {
      let result = securedApi.securedApi.post(
        "api/company/getCompanyList",
        data
          ? data
          : {
              page: 1,
              pageSize: 9,
            }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getStudentList: () => {
    try {
      let result = securedApi.securedApi.post("/api/student/getStudentList", {
        page: 1,
        pageSize: 10,
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  getIntenshipList: async (data) => {
    try {
      let result = await securedApi.securedApi.post(
        "company/api/internshipJobPost/getMatchingInternship",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getAppliedJobs: async (data) => {
    try {
      let result = await securedApi.securedApi.post(
        "company/api/internshipApplicant/getAppliedInternship",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getCompanyStaff: async (data) => {
    try {
      let result = await securedApi.securedApi.post(
        "company/api/company/getCompanyStaff",
        {
          page: 1,
          pageSize: 10,
          companyId: data,
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getTopCompanyListing: async () => {
    try {
      let result = await publicApi.publicApi.post(
        "/company/api/company/getTopCompanies",
        {}
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getIntershipListingpublic: async () => {
    try {
      let result = await publicApi.publicApi.post(
        "/company/api/internshipJobPost/public/getLatestInternship",
        {
          page: 1,
          pageSize: 5,
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};

export default ListingControllers;
