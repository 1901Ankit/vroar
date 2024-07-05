import { isEmail, isPhonenumber, isWebsite } from "./number";

export const companyvalidation = (value, formerr, setFormerr, closeLoading) => {
  let {
    fullname,

    password,

    email,
    mobile,
    salutation,
    companyName,
    website,
    companyPhoneNo,
    companyemail,
    companyType,
    teamSize,
    industry,
    tagLine,
    startedDate,
    zipCode,
    state,
    city,
    designation,
  } = value;

  if (
    fullname == "" ||
    password == "" ||
    salutation == "" ||
    email == "" ||
    mobile == "" ||
    companyName == "" ||
    // website == "" ||
    // companyPhoneNo == "" ||
    // companyType == null ||
    // teamSize == "" ||
    // industry == null ||
    // startedDate == "" ||
    industry == "" ||
    zipCode === "" ||
    state === "" ||
    city === "" ||
    designation === ""
  ) {
    setFormerr({
      ...formerr,
      fullname: fullname != "" ? "" : "Please Enter Full Name",
      password: password != "" ? "" : "Please Enter Password",
      email: email != "" ? "" : "Please Enter Email",
      mobile: mobile != "" ? "" : "Please Enter Mobile Number",
      companyName: companyName != "" ? "" : "Please Enter Company Name",
      // website: website != "" ? "" : "Please Enter Website",
      salutation: salutation != "" ? "" : "Please Select Salutation",
      // companyPhoneNo:
      //   companyPhoneNo != "" ? "" : "Please Enter Valid phone number",
      // companyType: companyType != "" ? "" : "Please Select Company Type",
      // teamSize: teamSize != "" ? "" : "Please Select Team Size",
      // startedDate: startedDate != "" ? "" : "Please Enter valid  Date ",
      industry: industry != "" ? "" : "Please Select Industry",
      zipCode: zipCode != "" ? "" : "Please Enter your Zip code ",
      state: state != "" ? "" : "Please Select Your State",
      city: city != "" ? "" : "Please Select your City",
      designation: designation != "" ? "" : "Please Enter Designation",
    });

    closeLoading();
    return false;
  } else {
    return true;
  }
};

export const studentvalidation = (
  value,
  closeLoading,
  formerr,
  setFormerr,
  age,
  role
) => {
  let {
    fullname,
    username,
    password,
    dob,
    email,
    mobile,
    parentEmail,
    salutation,
  } = value;
  if (
    role === "STUDENT"
      ? !age
        ? fullname == "" ||
          username == "" ||
          password == "" ||
          dob == "" ||
          email == "" ||
          mobile == "" ||
          parentEmail == "" ||
          salutation === ""
        : fullname == "" ||
          username == "" ||
          password == "" ||
          dob == "" ||
          email == "" ||
          mobile == "" ||
          salutation === ""
      : fullname === "" ||
        password === "" ||
        email === "" ||
        mobile === "" ||
        salutation === ""
  ) {
    setFormerr(
      role === "STUDENT"
        ? age
          ? {
              ...formerr,
              fullname: fullname != "" ? "" : "Please Enter Full Name",
              username: username != "" ? "" : "Please Enter Username",
              password: password != "" ? "" : "Please Enter Password",
              dob: dob != "" ? "" : "Please Enter Date of Birth ",
              email: email != "" ? "" : "Please Enter Email",
              mobile: mobile != "" ? "" : "Please Enter Mobile Number",
              salutation: salutation != "" ? "" : "Please Select Salutation",
            }
          : {
              ...formerr,
              fullname: fullname != "" ? "" : "Please Enter Full Name",
              parentEmail:
                parentEmail != "" ? "" : "Please Enter Parent's Email",
              username: username != "" ? "" : "Please Enter Username",
              password: password != "" ? "" : "Please Enter Password",
              dob: dob != "" ? "" : "Please Enter Date of Birth ",
              email: email != "" ? "" : "Please Enter Email",
              mobile: mobile != "" ? "" : "Please Enter Mobile Number",
              salutation: salutation != "" ? "" : "Please Select Salutation",
            }
        : {
            ...formerr,
            fullname: fullname != "" ? "" : "Please Enter Full Name",
            parentEmail: parentEmail != "" ? "" : "Please Enter parent's Email",
            password: password != "" ? "" : "Please Enter Password",
            salutation: salutation != "" ? "" : "Please Select Salutation",
            email: email != "" ? "" : "Please Enter Email",
            mobile: mobile != "" ? "" : "Please Enter Mobile Number",
          }
    );
    closeLoading();
    return false;
  } else {
    return true;
  }
};

export const addchildvalidation = (value, setError, error, setLoading) => {
  let { fullName, birthDate, email, salutation } = value;
  if (fullName === "" || birthDate === "" || email === "") {
    setError({
      ...error,
      fullName: fullName != "" ? "" : "Please Enter Full Name",
      birthDate: birthDate != "" ? "" : "Please Enter Valid Date",
      email: email != "" ? "" : "Please Enter Valid email",
    });
    setLoading(false);
    return false;
  } else {
    return true;
  }
};

export const loginvalidation = (value, setFormerr, formerr) => {
  let { email, password } = value;

  if (!email === isEmail(email) || email === "" || password === "") {
    setFormerr({
      ...formerr,
      email: email != "" ? "" : "Please Enter valid Email",
      password: password != "" ? "" : "Please Enter Your Password",
    });
  } else {
    return true;
  }
};

export const Parentvalidation = (value, setError, error, setLoading) => {
  let { fullName, email, birthDate } = value;

  if (fullName === "" || email === "") {
    setError({
      ...error,
      fullName: fullName != "" ? "" : "Please Enter Full Name",
      email: email != "" ? "" : "Please Enter valid Email",
      birthDate: birthDate != "" ? "" : "Please Enter valid date ",
    });
    setLoading(false);
    return false;
  } else {
    return true;
  }
};

export const comapnystaffvalidation = (value, setError, error, setLoading) => {
  let { fullName, email, roleId, designation } = value;

  if (fullName === "" || designation === "" || email === "") {
    setError({
      ...error,
      fullName: fullName != "" ? "" : "Please Enter full Name",
      email: email != "" ? "" : "Please Enter valid email",
      // roleId: roleId != "" ? "" : "Please select your role",
      designation: designation != "" ? "" : "Please Enter Designation",
    });
    setLoading(false);
    return false;
  } else {
    return true;
  }
};

export const UpdateProfilevalidation = (
  value,
  setError,
  error,
  setLoading,
  role
) => {
  let {
    fullName,
    emailAddress,
    mobile,
    password,
    salutation,
    userName,
    countryCode,
    birthDate,
  } = value;

  if (
    role === "PARENT" || role === "COMPANY_STAFF"
      ? fullName === "" || emailAddress === "" || password === ""
      : fullName == "" ||
        userName == "" ||
        emailAddress == "" ||
        password == "" ||
        birthDate == ""
  ) {
    setError({
      ...error,
      fullName: fullName != "" ? "" : "Please Enter Your full Name",
      emailAddress: emailAddress != "" ? "" : "Please Enter valid email",
      birthDate: birthDate != "" ? "" : "Please Enter Valid Date",

      password: password != "" ? "" : "Please Enter Password",
      userName: userName != "" ? "" : "Please Enter Username",
    });
    return false;
  } else {
    return true;
  }
};

export const addJobValidation = (value, setError, error) => {
  let {
    job_title,
    experience,
    job_description,
    qualification,
    noOfJobs,
    skills,
    amount,
    from,
    to,
    workMode,
  } = value;

  if (
    job_title === "" ||
    experience === "" ||
    job_description === "" ||
    qualification === "" ||
    noOfJobs === "" ||
    skills === "" ||
    amount === "" ||
    from === "" ||
    to === "" ||
    workMode === ""
  ) {
    setError({
      ...error,
      job_title: job_title != "" ? "" : "Please Enter Job Title",
      experience: experience != "" ? "" : "Please Enter  Experience",
      job_description: job_description != "" ? "" : "Please Enter  Description",
      qualification: qualification != "" ? "" : "Please Enter  Qualification",
      noOfJobs: noOfJobs != "" ? "" : "Please Enter No of Jobs",
      // location: location != "" ? "" : "Please Enter Job Location",
      skills: skills != "" ? "" : "Please Enter Skills",
      amount: amount != "" ? "" : "Please Enter Stipend",
      from: from != "" ? "" : "Please Enter Starting Date of Internship",
      to: to != "" ? "" : "Please Enter End date of Internship",
      workMode: workMode != "" ? "" : "Please Select workMode",
    });
    return false;
  } else {
    return true;
  }
};

export const educationValidation = (
  value,
  setEducationError,
  educationError
) => {
  let { institution, degree, fieldofstudy, from, to, current } = value;
  if (institution == "" || degree == "" || fieldofstudy == "" || from == "") {
    setEducationError(
      current
        ? {
            ...educationError,
            institution: institution != "" ? "" : "Please Enter Institution",
            degree: degree != "" ? "" : "Please Enter Degree",
            from: from != "" ? "" : "Please Enter Starting Date",

            fieldofstudy:
              fieldofstudy != "" ? "" : "Please Enter Field of Study",
          }
        : {
            ...educationError,
            institution: institution != "" ? "" : "Please Enter Institution",
            degree: degree != "" ? "" : "Please Enter Degree",
            from: from != "" ? "" : "Please Enter Starting Date",
            to: to != "" ? "" : "Please Enter End Date",
            fieldofstudy:
              fieldofstudy != "" ? "" : "Please Enter Field of Study",
          }
    );
    return false;
  } else {
    return true;
  }
};

export const editProfilevalidation = (value, error, setError) => {
  const { fullName, headline, state, city, country, zipCode } = value;
  if (
    fullName == "" ||
    headline == "" ||
    state == "" ||
    city == "" ||
    country == "" ||
    zipCode == ""
  ) {
    setError({
      ...error,
      fullName: fullName != "" ? "" : "Please Enter Full Name",
      headline: headline != "" ? "" : "Please Enter Your Profile",
      state: state != "" ? "" : "Please Enter Your State",
      city: city != "" ? "" : "Please Enter Your City",
      country: country != "" ? "" : "Please Enter Your Country ",
      zipCode: zipCode != "" ? "" : "Please Enter Your Zipcode",
    });
    return false;
  } else {
    return true;
  }
};
export const skillValidation = (value, setError) => {
  if (value.skills == "") {
    setError("Please Select  your skills");
    return false;
  } else {
    return true;
  }
};

export const studentAddExperience = (value, setError, error) => {
  const { title, companyName, employmentType, location, from, skills } = value;

  if (
    title === "" ||
    companyName === "" ||
    employmentType === "" ||
    location === "" ||
    from === "" ||
    skills === ""
  ) {
    setError({
      ...error,
      title: title != "" ? "" : "Please Enter Title ",
      companyName: companyName != "" ? "" : "Please Enter Company Name",
      employmentType:
        employmentType != "" ? "" : "Please Enter Employment Type",
      location: location != "" ? "" : "Please Enter Location ",
      from: from != "" ? "" : "Please Enter From Date",
      skills: skills != "" ? "" : "Please Enter skills",
    });
    return false;
  } else {
    return true;
  }
};
export const communityLead = (value, setError, error) => {
  let { name, to, skills, location } = value;
  if (name === "" || to === "" || skills === "" || location === "") {
    setError({
      ...error,
      name: name != "" ? "" : "Please Enter name",
      to: to != "" ? "" : "Please Enter Valid Date",
      skills: skills != "" ? "" : "Please Enter Skills",
      location: location != "" ? "" : "Please Enter Location",
    });
    return false;
  } else {
    return true;
  }
};
export const parentsprofileValidation = (value, setError, error) => {
  const { fullName, state, city, zipCode } = value;
  if (fullName === "" || state === "" || city === "" || zipCode === "") {
    setError({
      ...error,
      fullName: fullName != "" ? "" : "Please Enter Full name",
      state: state != "" ? "" : "Please Select State*",
      city: city != "" ? "" : "Please Select City*",
      zipCode: zipCode != "" ? "" : "Please Enter ZipCode",
    });
    return false;
  } else {
    return true;
  }
};
