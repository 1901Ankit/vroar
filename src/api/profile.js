import securedApi from "./config";

const profileControllers = {
  editProfile: async (data) => {
    data.skills = data.skills ? JSON.parse(data.skills) : [];
    data.industry = data.industry ? JSON.parse(data.industry) : [];

    try {
      let result = await securedApi.securedApi.post(
        "/api/profile/editProfile",
        {
          availabilityDays: data.availabilityDays,
          availabilityHoursInWeek: data.availabilityHoursInWeek,
          avatar: data.avatar,

          fullName: data.fullName,
          headline: data.headline,
          industry: data.industry,
          skills: data.skills,

          workMode: data.workMode,

          coverImage: data.coverImage,
          about: data.about,
          locationWeight: data.locationWeight,
          availabilityHoursInWeek: data.availabilityHoursInWeek,
          availability: {
            from: data.from,
            to: data.to,
          },
          workMode: data.workMode,
          address: {
            state: data.state,
            city: data.city,
            zipCode: data.zipCode,
            address1: data.address1,
            address2: data.address2,
          },
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
  addEducation: async (data) => {
    try {
      let result = await securedApi.securedApi.post(
        "/api/profile/addOrUpdateEducation",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getProfile: async (data) => {
    try {
      let result = await securedApi.securedApi.get(
        "/api/profile/getProfile",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getCompanyProfile: async (data) => {
    let {
      companyEmail,
      companyName,
      companyPhoneNo,
      companyType,
      industry,
      startedDate,
      tagLine,
      teamSize,
      website,
      companyLogo,
      companyCoverImage,
      about,
    } = data;
    try {
      let result = await securedApi.securedApi.post(
        "company/api/companyProfile/editProfile",
        {
          companyEmail,
          companyName,
          companyPhoneNo,
          companyType,
          industry,
          startedDate,
          tagLine,
          teamSize,
          website,
          companyLogo,
          companyCoverImage,
          about,
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
  deleteEducation: async (data) => {
    try {
      let result = await securedApi.securedApi.delete(
        `/api/profile/deleteEducation/${data}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  addExperience: async (data) => {
    data.skills = JSON.parse(data.skills);
    try {
      let result = await securedApi.securedApi.post(
        "api/profile/addOrUpdateExperience",
        {
          title: data.title,
          companyName: data.companyName,
          skills: data.skills,
          to: data.to,
          from: data.from,
          current: data.current,
          location: data.location,
          description: data.description,
          employmentType: data.employmentType,
          _id: data._id,
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  addCommunityLead: async (data) => {
    data.skills = JSON.parse(data.skills);
    try {
      let result = await securedApi.securedApi.post(
        "api/profile/addOrUpdateCompunityLead",
        {
          name: data.name,
          skills: data.skills,
          location: data.location,
          from: data.from,
          to: data.to,
          current: data.current,
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getSkillRating: async (data) => {
    try {
      let result = await securedApi.securedApi.get(
        "student/api/profileRating/getProfileRating"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getStudentSkillRating: async () => {
    try {
      let result = await securedApi.securedApi.get(
        "student/api/profileRating/getSkillRating"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  forgotPassword: async (data) => {
    try {
      let result = await securedApi.securedApi.post("api/forgotPassword", {
        email: data,
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  getInternById: async (data) => {
    try {
      let result = await securedApi.securedApi.get(
        `api/profile/getProfileById/${data}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};

export default profileControllers;
