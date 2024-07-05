import securedApi from "./config";

const companyControllers = {
  addPost: (data) => {
    data.skills = JSON.parse(data.skills);

    try {
      let result = securedApi.securedApi.post(
        "company/api/internshipJobPost/addInternshipJob",
        {
          title: data.job_title,
          description: data.job_description,
          location: data.location,
          noOfJobs: data.noOfJobs,
          qualification: data.qualification,
          experience: data.experience,
          skills: data.skills,
          duration: data.duration,
          stipend: data.stipend,
          isOpen: data.isOpen,
          workMode: data.workMode,
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getJobs: async (data) => {
    try {
      let result = await securedApi.securedApi.post(
        "company/api/internshipJobPost/getInternshipPostList",
        {
          page: 1,
          pageSize: 10,
          companyId: data.companyId,
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getJobsById: (data) => {
    try {
      let result = securedApi.securedApi.get(
        `company/api/internshipJobPost/getPostById/${data}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  editJobs: (data) => {
    try {
      let result = securedApi.securedApi.put(
        "company/api/internshipJobPost/editInternshipJob",
        {
          title: data.title,
          description: data.description,
          location: data.location,
          noOfJobs: data.noOfJobs,
          qualification: data.qualification,
          experience: data.experience,
          _id: data._id,
          skills: JSON.parse(data.skills),
          stipend: data.stipend,
          duration: data.duration,
          workMode: data.workMode,
          isOpen: data.isOpen,
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  appliedJob: async (data) => {
    try {
      let result = await securedApi.securedApi.post(
        "/company/api/internshipApplicant/apply",
        {
          internshipJobId: data,
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getApplicantList: async (data) => {
    try {
      let result = await securedApi.securedApi.post(
        "/company/api/internshipApplication/getInternshipApplicant",
        {
          internshipJobId: data,
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getApplicantListdashboard: async (data) => {
    try {
      let result = await securedApi.securedApi.post(
        "/company/api/internshipApplication/getInternshipApplicant",
        {
          companyId: data.companyId,
          status: data.status,
          page: data.page,
          pageSize: data.pageSize,
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getJobbyJobId: async (data) => {
    try {
      let result = await securedApi.securedApi.get(
        `/company/api/internshipJobPost/getPostById/${data}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  getCompanyById: async (data) => {
    try {
      let result = await securedApi.securedApi.get(
        `/company/api/companyProfile/getCompanyDetail/${data}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  getSuggestedStudents: async (data) => {
    try {
      let result = await securedApi.securedApi.post(
        "/company/api/internsProfile/getMatchingInterns",
        {
          page: 1,
          pageSize: 10,
          internshipJobId: data,
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  selectStudents: async (data) => {
    try {
      let result = await securedApi.securedApi.post(
        "company/api/internshipApplication/updateApplicantStatus",
        {
          applicationId: data.applicant_id,
          status: data.status,
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  savedJobs: async (data) => {
    try {
      let result = await securedApi.securedApi.post(
        "/company/api/internshipApplicant/saveInternship",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getSavedJobs: async (data) => {
    try {
      let result = await securedApi.securedApi.post(
        "company/api/internshipApplicant/getSavedInternship",

        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  internshipFilterAndSorting: async (data) => {
    data.createdAt = data.createdAt != "" ? data.createdAt : "";
    data.location = data.location != "" ? data.location : "";
    try {
      let result = await securedApi.securedApi.post(
        "company/api/internshipJobPost/getMatchingInternship",
        {
          page: 1,
          pageSize: 10,
          search: data.search,
          sortBy: {
            createdAt: data.createdAt,
          },
          workMode: data.workMode,
          industry: data.industry,
          payStatus: data.payStatus,
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  deleteInternshipjobs: async (data) => {
    try {
      let result = await securedApi.securedApi.delete(
        `company/api/internshipJobPost/deleteInternship/${data}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getfiltereApplicant: async (data) => {
    data.skills = JSON.parse(data.skills);
    try {
      let result = await securedApi.securedApi.post(
        "/company/api/internshipApplication/getInternshipApplicant",
        {
          search: data.search,
          skills: data.skills,
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  
  getCompanyreview: async (data) => {
    try {
      let result = await securedApi.securedApi.get(
        `company/api/reviews/getRating/${data}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  addCompanyReview: async (data) => {
    try {
      let result = await securedApi.securedApi.post(
        `company/api/reviews/addReviews`,
        {
          companyId: data.companyId,
          rating: data.rating
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};

export default companyControllers;
