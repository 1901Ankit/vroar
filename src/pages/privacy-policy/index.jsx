import moment from "moment";
import Head from "next/head";
import React from "react";
import styles from "./index.module.css";
const Privacypolicy = () => {
  const tableContents = [
    {
      name: "Collection and Use of Personal Information",
    },
    {
      name: "Data Security and Storage",
    },
    {
      name: "Data Security and Storage",
    },
    {
      name: "Cookies and Tracking Technologies",
    },
    {
      name: "Third-Party Links",
    },
    {
      name: "Privacy Rights and Choices",
    },
    {
      name: "Changes to this Privacy Policy",
    },
    {
      name: "Contact Us",
    },
  ];
  const internshipseekers = [
    {
      name: "Personal identification details (name, age, gender, contact information, etc.)",
    },
    {
      name: "Educational information (school, major, academic achievements, etc.)",
    },
    {
      name: "Resume, cover letter, and other application materials",
    },
    {
      name: "Communication history with VROAR",
    },
    {
      name: "Feedback and evaluations provided by participating companies",
    },
    {
      name: "Any additional information necessary for internship placement and program participation",
    },
  ];
  const Companies = [
    {
      name: "Business information (company name, address, industry, etc.)",
    },
    {
      name: "Contact details (name, position, email, phone number, etc.)",
    },
    {
      name: "Information regarding internship requirements and job descriptions",
    },
    {
      name: "Communication history with VROAR",
    },
    {
      name: "Feedback on student interns and evaluations of our services",
    },
    {
      name: "Any additional information necessary for successful internship program implementation",
    },
  ];
  const parents = [
    {
      name: "Personal identification details (name, contact information, etc.)",
    },
    {
      name: "Communication history with VROAR concerning their child's internship program",
    },
    {
      name: "Any additional information necessary for parental engagement with VROAR services",
    },
  ];
  const verificationSystem = {
    name: "VROAR will use a third-party tool to verify the personal IDs of the internship-seekers, companies, and parents in Project Purple Star. We collect this information to provide and improve our internship matching services, coordinate business enrichment programs, and ensure the overall success of the internship experience. We may also use personal information for internal research, marketing, and communications purposes, such as notifying you about new opportunities or updates.",
  };
  const dataSecurity =
    "Protecting your personal information is of utmost importance to us. We employ industry-standard security measures to safeguard your data, including secure servers, encrypted communication, and restricted access policies. We store personal information for as long as necessary to fulfill the purposes mentioned in this policy unless a longer retention period is required by law.  ";

  const informationSharing = [
    {
      heading: "With consent",
      content:
        "We may share personal information with your consent, such as when connecting internship-seekers with companies for potential internships.",
    },
    {
      heading: "With service providers",
      content:
        "We may share personal information with trusted third-party service providers who assist us in delivering our services, such as email communication or data analytics. These service providers may have access to your personal information strictly to perform their services and are obligated to maintain your privacy.",
    },
    {
      heading: "With legal authorities",
      content:
        "If required by law, we may disclose personal information to law enforcement agencies, regulatory bodies, or other legal authorities.",
    },
  ];
  return (
    <div>
      <Head>
        <title>Privacy Policy</title>
      </Head>
      <div className="container mt-3">
        <div className="text-start mb-4">
          <h1>PRIVACY POLICY</h1>
          <p>Last Modified -{`[${moment(new Date()).format("L")}]`}</p>
        </div>
        <div>
          <h6 className="mb-3">TABLE OF CONTENTS</h6>
          <ul>
            {tableContents.map((val, i) => (
              <li key={i}>{val.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className={styles.heading_privacy}>
            Collection and Use of Personal Information
          </h4>
          <p className="mt-2">
            We may collect various types of personal information from you,
            including but not limited to :
          </p>
          <div className="my-3">
            <h6 className="mb-3">Internship-seekers :</h6>
            <ul>
              {internshipseekers.map((val, i) => (
                <li key={i}>{val.name}</li>
              ))}
            </ul>
          </div>
          <div className="my-3">
            <h6 className="mb-3"> Companies :</h6>
            <ul>
              {Companies.map((val, i) => (
                <li key={i}>{val.name}</li>
              ))}
            </ul>
          </div>
          <div className="my-3">
            <h6 className="mb-3"> Parents :</h6>
            <ul>
              {parents.map((val, i) => (
                <li key={i}>{val.name}</li>
              ))}
            </ul>
          </div>
          <div className="my-3">
            <h6 className="mb-3"> Personal ID verification system :</h6>
            <p className="text-justify f-14">{verificationSystem.name}</p>
          </div>
        </div>
        <div className="my-3">
          <h4 className={styles.heading_privacy}>Data Security and Storage</h4>
          <p className="my-3 text-justify f-14">{dataSecurity}</p>
        </div>
        <div className="my-3">
          <h4 className={styles.heading_privacy}>Information Sharing</h4>
          <p className="mt-2 f-14 text-justify">
            VROAR respects your privacy and will not sell, rent, or share your
            personal information with third parties, except in the following
            circumstances:
          </p>
          {informationSharing.map((val, i) => (
            <div className="my-2">
              <h6 className="my-1">
                {i + 1}. {val.heading} :
              </h6>
              <p className="f-14 text-justify">{val.content}</p>
            </div>
          ))}
        </div>
        <div className="my-3">
          <h4 className={styles.heading_privacy}>
            Cookies and Tracking Technologies
          </h4>
          <p className="f-14 my-2 text-justify">
            To enhance your experience on our website, we may use cookies and
            similar tracking technologies. Cookies are small pieces of data
            stored on your device that enable certain website features, remember
            preferences, and gather anonymous analytics data. You can adjust
            your browser settings to decline cookies if you prefer. However,
            please note that some features of our website may not function
            properly without cookies.
          </p>
        </div>
        <div className="my-3">
          <h4 className={styles.heading_privacy}>Third-Party Links</h4>
          <p className="f-14 my-2 text-justify">
            Our website may contain links to third-party websites or services.
            We do not control or endorse the privacy practices of these third
            parties. This Privacy Policy applies solely to information collected
            by VROAR. We encourage you to review the privacy policies of any
            third-party websites you visit.
          </p>
        </div>
        <div className="my-3">
          <h4 className={styles.heading_privacy}>Privacy Rights and Choices</h4>
          <p className="f-14 my-2 text-justify">
            If you wish to update, correct, or delete your personal information
            or have any questions about this Privacy Policy, please contact us
            using the details provided below. We will, to the extent possible,
            address your request promptly and in accordance with applicable
            laws.
          </p>
        </div>
        <div className="my-3">
          <h4 className={styles.heading_privacy}>
            Changes to this Privacy Policy
          </h4>
          <p className="f-14 my-2 text-justify">
            We reserve the right to update or modify this Privacy Policy at any
            time. Any changes made will be posted on our website with the
            updated revision date. Your continued use of our services after such
            changes indicates your acknowledgment and consent to the revised
            Privacy Policy.
          </p>
        </div>
        <div className="my-3">
          <h4 className={styles.heading_privacy}>Contact Us</h4>
          <p className="f-14 my-2 text-justify">
            Should you have any questions, concerns, or inquiries regarding this
            Privacy Policy or our data practices, please reach out to us at:
          </p>
          <h5 className="mb-2">VROAR </h5>
          <p>
            Email :{" "}
            <a href="mailto:info@vroar.ai" className={styles.contact}>
              info@vroar.ai
            </a>
          </p>
          <p className="my-2">
            phone :{" "}
            <a href="tel:214-412-8345" className={styles.contact}>
              +1 (214)-412-8345
            </a>
          </p>
          <p>Address : 6275 Corvara Court Frisco, TX 75035, USA</p>
        </div>
      </div>
    </div>
  );
};

export default Privacypolicy;
