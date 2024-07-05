import React from "react";
import styles from "./index.module.css";
import Head from "next/head";
import moment from "moment";
const Terms = () => {
  const tableContents = [
    {
      name: "Acceptance of Terms",
    },
    {
      name: "Services",
    },
    {
      name: "Eligibility",
    },
    {
      name: "Account Creation",
    },
    {
      name: "Privacy",
    },
    {
      name: "Intellectual Property",
    },
    {
      name: "Limitation of Liability",
    },
    {
      name: "Modifications and Termination",
    },
    {
      name: "Governing Law and Jurisdiction",
    },
  ];
  const internshipseekers = [
    {
      name: "These Terms constitute a binding agreement between you and VROAR. By accessing or using our platform or services, you acknowledge that you have read, understood, and agreed to these Terms.",
    },
    {
      name: 'If you are accessing our platform and services on behalf of a company or other legal entity, you represent and warrant that you have the authority to bind such entity to these Terms. In this case, "you" or "your" refers to that entity.',
    },
  ];
  const business = [
    {
      name: "VROAR offers internships and courses to internship-seekers and business enrichment programs and interns to companies. These services may include but are not limited to, internship placement, program matching, and related resources.",
    },
    {
      name: "We provide access to our platform for internship-seekers, looking for internships and parents who have legal guardianship over participating internship-seekers.",
    },
    {
      name: "While we strive to offer the best experience possible, we do not guarantee the availability of internships or business enrichment programs.",
    },
  ];
  const parents = [
    {
      name: "If the internship seeker is under the age of 18, they can only access the platform with parental permission and the creation of a parent account. ",
    },
    {
      name: "If the internship seeker is above 18, it is not necessary to have parental approval, and one can access the VROAR platform on their own.",
    },
    {
      name: "To access and use our platform, internship-seekers, and parents must provide accurate and complete information during registration.",
    },
  ];
  const liability = [
    {
      name: "Internship-seekers, companies,  and parents must create an account on our platform to access our services.",
    },
    {
      name: "You are solely responsible for maintaining the confidentiality of any login credentials associated with your account. You agree to notify us immediately if you suspect any unauthorized use of your account.",
    },
    {
      name: "By creating an account, you agree to receive communications from VROAR related to your account, updates, and internship opportunities.",
    },
  ];
  const externalLinks = [
    {
      name: "We value your privacy and handle personal information in accordance with our Privacy Policy. Please review it for more details. For more details related to privacy, kindly read our privacy policy. ",
    },
  ];
  const warranty = [
    {
      name: "All content and materials provided on our platform, including but not limited to text, graphics, logos, images, software, and trademarks, are the intellectual property of VROAR. You may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information or materials obtained from our platform without our prior written consent.",
    },
  ];
  const limitation = [
    {
      name: "VROAR shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages arising out of or in connection with your use of our platform or services.",
    },
    {
      name: "We do not guarantee the accuracy, reliability, or completeness of any information provided on our platform or the results obtained from using our services.",
    },
    {
      name: "You agree to indemnify and hold VROAR harmless from and against any claims, losses, liabilities, damages, costs, or expenses arising out of or in connection with your use of our platform or services.",
    },
  ];
  const modifications = [
    {
      name: "VROAR reserves the right to modify or terminate any aspect of our platform or services without prior notice.",
    },
    {
      name: " We may update these Terms from time to time. Any changes will be posted on our website, and your continued use of our platform or services after such modifications shall constitute your consent to the revised terms.",
    },
  ];
  const governing = [
    {
      name: "These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of [Jurisdiction].",
    },
  ];

  return (
    <div>
      <Head>
        <title>Terms and Conditions</title>
      </Head>
      <div className="container mt-3">
        <div className="text-start mb-4">
          <h1>Terms and Conditions</h1>
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
        <div className="my-2">
          <p className="f-14">
            These terms and conditions govern your use of VROAR’s platform,
            services, and offerings. By accessing and using our website and
            services, you agree to comply with these Terms. Please read them
            carefully.
          </p>
        </div>

        <div className="my-3">
          <h4 className={`${styles.heading_privacy} mb-2`}>
            Acceptance of Terms
          </h4>
          <ul>
            {internshipseekers.map((val, i) => (
              <li key={i}>{val.name}</li>
            ))}
          </ul>
        </div>
        <div className="my-3">
          <h4 className={`${styles.heading_privacy} mb-2`}>Services</h4>
          <ul>
            {business.map((val, i) => (
              <li key={i}>{val.name}</li>
            ))}
          </ul>
        </div>
        <div className="my-3">
          <h4 className={`${styles.heading_privacy} mb-2`}>Eligibility</h4>
          <ul>
            {parents.map((val, i) => (
              <li key={i}>{val.name}</li>
            ))}
          </ul>
        </div>
        <div className="my-3">
          <h4 className={styles.heading_privacy}>Account Creation</h4>
          <ul>
            {liability.map((val, i) => (
              <li key={i}>{val.name}</li>
            ))}
          </ul>
        </div>
        <div className="my-3">
          <h4 className={`${styles.heading_privacy} mb-2`}>Privacy </h4>
          <ul>
            {externalLinks.map((val, i) => (
              <li key={i}>{val.name}</li>
            ))}
          </ul>
        </div>
        <div className="my-3">
          <h4 className={`${styles.heading_privacy} mb-2`}>
            Intellectual Property
          </h4>
          <ul>
            {warranty.map((val, i) => (
              <li key={i}>{val.name}</li>
            ))}
          </ul>
        </div>
        <div className="my-3">
          <h4 className={`${styles.heading_privacy} mb-2`}>
            Limitation of Liability
          </h4>
          <ul>
            {limitation.map((val, i) => (
              <li key={i}>{val.name}</li>
            ))}
          </ul>
        </div>
        <div className="my-3">
          <h4 className={`${styles.heading_privacy} mb-2`}>
            Modifications and Termination
          </h4>
          <ul>
            {modifications.map((val, i) => (
              <li key={i}>{val.name}</li>
            ))}
          </ul>
        </div>
        <div className="my-3">
          <h4 className={`${styles.heading_privacy} mb-2`}>
            Governing Law and Jurisdiction
          </h4>
          <ul>
            {governing.map((val, i) => (
              <li key={i}>{val.name}</li>
            ))}
          </ul>
        </div>

        <div className="my-3">
          <p className="text-justify my-2 f-14">
            To learn about our privacy policy, visit www.vroar.ai.
          </p>
          <p className="text-justify my-2 f-14">
            Thank you for choosing VROAR! If you have any questions or concerns
            regarding these Terms, kindly contact us at{" "}
            <a href="mailto:info@vroar.ai" className={styles.contact}>
              info@vroar.ai
            </a>{" "}
            .
          </p>
          <h6>VROAR </h6>
          <p className="my-2">
            Email :{" "}
            <a href="mailto:info@vroar.ai" className={styles.contact}>
              info@vroar.ai
            </a>
          </p>
          <p>
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

export default Terms;
