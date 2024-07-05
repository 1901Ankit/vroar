import securedApi from "./config";

export const parentController = {
  getChild: async () => {
    try {
      let result = await securedApi.securedApi.get("/api/parent/getChildList");
      return result;
    } catch (error) {
      throw error;
    }
  },
  getChildDescription: async (data) => {
    try {
      let result = await securedApi.securedApi.get(
        `/api/parent/getChildDetails/${data}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getChildMatchingInternship: async (data) => {
    try {
      let result = await securedApi.securedApi.post(
        "company/api/internshipJobPost/getChildsMatchingInternship",
        {
          childId: data,
          page: 1,
          pageSize: 10,
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getChildAppliedInternship: async (data) => {
    try {
      let result = await securedApi.securedApi.post(
        "/company/api/internshipApplicant/getChildAppliedInternship",
        {
          childId: data,
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getChildInternshipdetails: async (data) => {
    try {
      let result = await securedApi.securedApi.post(
        "company/api/internshipJobPost/getJobByStudentId",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getChildTopInternship: async (data) => {
    try {
      let result = await securedApi.securedApi.post(
        "company/api/internshipJobPost/getTopMatchingInternship",
        {
          childId: data,
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getMemberRequest: async () => {
    try {
      let result = await securedApi.securedApi.get(
        "/api/member/getMemberRequest"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  approvedChild: async (data) => {
    try {
      let result = await securedApi.securedApi.post(
        "/api/member/requestApproval",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  parentRequest: async () => {
    try {
      let result = await securedApi.securedApi.get(
        "api/member/getMemberRequest"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};
