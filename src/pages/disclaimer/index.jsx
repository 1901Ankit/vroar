import React from "react";
import styles from "./index.module.css";
import Head from "next/head";
import moment from "moment";
const Disclaimer = () => {
  const tableContents = [
    {
      name: "Internship Placement",
    },
    {
      name: "Business Enrichment Programs",
    },
    {
      name: "Parental Access",
    },
    {
      name: "Limitation of Liability",
    },
    {
      name: "External Link",
    },
    {
      name: "Disclaimer of Warranty",
    },
  ];
  const internshipseekers = [
    {
      name: "VROAR acts as a facilitator, connecting internship-seekers with internship opportunities. We do not guarantee the availability or suitability of any specific internship position or company.",
    },
    {
      name: "VROAR is not responsible for the accuracy, legality, or quality of the internship programs offered by partnering companies. Internship-seekers are advised to independently research and assess the credibility of participating organizations before accepting any placement.",
    },
    {
      name: "VROAR  makes efforts to provide equitable internships, but we do not guarantee equal opportunities for all applicants due to factors beyond our control, such as market demand and specific program requirements.",
    },
    {
      name: "VROAR offers courses for internship-seekers help them to enhance their skills and professional development. However, VROAR does not guarantee the outcomes, employability, or career advancements resulting from participation in such courses.",
    },
  ];
  const business = [
    {
      name: "VROAR offers courses for business enrichment programs to companies for professional development. However, VROAR does not guarantee the outcomes, employability, or career advancements resulting from participation in such programs.",
    },
    {
      name: "VROAR reserves the right to modify or cancel any program, workshop, or event at any time, without prior notice. We will make reasonable efforts to inform affected participants promptly.",
    },
  ];
  const parents = [
    {
      name: "Parents or legal guardians are granted access to VROAR's platform solely for the purpose of reviewing and supervising their child's application, progress, and overall participation in the internship program.",
    },
    {
      name: "VROAR does not assume any liability towards parents for decisions made by internship-seekers during the internship program or any consequences arising from those decisions.",
    },
  ];
  const liability = [
    {
      name: "VROAR only plays the role of a medium between internship-seekers, companies, and parents.",
    },
    {
      name: "VROAR is not liable for any direct, indirect, incidental, consequential, or special damages arising from or related to the use of our services, including but not limited to internship placements, business enrichment programs, or access to our platform.",
    },
    {
      name: "VROAR is not responsible for any loss, injury, or harm resulting from the actions, behaviors, or misconduct of participating companies during the internship period.",
    },
    {
      name: "VROAR shall not be liable for any interruptions, delays, or technical issues related to the platform, including but not limited to system failures, data loss, or unauthorized access.",
    },
  ];
  const externalLinks = [
    {
      name: "VROAR’s platform may contain links to third-party websites. These links are provided for convenience and informational purposes only. VROAR  does not endorse or have control over the content, accuracy, or safety of these external websites. Therefore, we are not responsible for any damages or losses incurred from accessing or using external links.",
    },
  ];
  const warranty = [
    {
      name: 'The Services provided by VROAR are on an "as is" and "as available" basis. VROAR makes no warranties or representations, whether express or implied, regarding the accuracy, completeness, reliability, or availability of the Services. Your use of the Services is at your own risk.',
    },
  ];

  return (
    <div>
      <Head>
        <title>Disclaimer</title>
      </Head>
      <div className="container mt-3">
        <div className="text-start mb-4">
          <h1>Disclaimer</h1>
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
            By accessing and utilizing the services provided by VROAR, you
            hereby acknowledge and agree to the following disclaimer:
          </p>
        </div>

        <div className="my-3">
          <h4 className={`${styles.heading_privacy} mb-2`}>
            Internship Placement :
          </h4>
          <ul>
            {internshipseekers.map((val, i) => (
              <li key={i}>{val.name}</li>
            ))}
          </ul>
        </div>
        <div className="my-3">
          <h4 className={`${styles.heading_privacy} mb-2`}>
            Business Enrichment Programs
          </h4>
          <ul>
            {business.map((val, i) => (
              <li key={i}>{val.name}</li>
            ))}
          </ul>
        </div>
        <div className="my-3">
          <h4 className={`${styles.heading_privacy} mb-2`}>
            Parental Access :
          </h4>
          <ul>
            {parents.map((val, i) => (
              <li key={i}>{val.name}</li>
            ))}
          </ul>
        </div>
        <div className="my-3">
          <h4 className={styles.heading_privacy}>Limitation of Liability</h4>
          <ul>
            {liability.map((val, i) => (
              <li key={i}>{val.name}</li>
            ))}
          </ul>
        </div>
        <div className="my-3">
          <h4 className={`${styles.heading_privacy} mb-2`}>External Links </h4>
          <ul>
            {externalLinks.map((val, i) => (
              <li key={i}>{val.name}</li>
            ))}
          </ul>
        </div>
        <div className="my-3">
          <h4 className={`${styles.heading_privacy} mb-2`}>
            Disclaimer of Warranty
          </h4>
          <ul>
            {warranty.map((val, i) => (
              <li key={i}>{val.name}</li>
            ))}
          </ul>
        </div>

        <div className="my-3">
          {/* <h4 className={`${styles.heading_privacy} mb-2`}>Contact Us</h4>
          <p className="f-14 my-2 text-justify">
            Should you have any questions, concerns, or inquiries regarding this
            Privacy Policy or our data practices, please reach out to us at:
          </p> */}
          <p className="text-justify my-2 f-14">
            Please review this disclaimer carefully. Your continued use of
            VROAR's services signifies your acceptance of all the terms and
            conditions stated herein. VROAR reserves the right to update or
            modify this disclaimer without prior notice.
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

export default Disclaimer;
