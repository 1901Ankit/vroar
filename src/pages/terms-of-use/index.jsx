import React from "react";
import styles from "./index.module.css";
import Head from "next/head";
import moment from "moment";
const TermsofUse = () => {
  const tableContents = [
    {
      name: "Acceptance of Terms",
    },
    {
      name: "Description of Services",
    },
    {
      name: "User Conduct",
    },
    {
      name: " Privacy Policy",
    },
    {
      name: "Third-Party Links",
    },

    {
      name: "Parental Access",
    },
    {
      name: "Limitation of Liability",
    },
    {
      name: "Intellectual Property",
    },
    {
      name: "Disclaimer of Warranty",
    },

    {
      name: "Modifications to the Terms",
    },
    {
      name: "Termination",
    },
    {
      name: "Governing Law",
    },
    {
      name: "Contact Information",
    },
  ];
  const internshipseekers = [
    {
      name: "By accessing or using the VROAR website, you acknowledge that you have read, understood, and agree to comply with these Terms. If you do not agree with any part of these Terms, you may not use our Website.",
    },
  ];
  const business = [
    {
      name: "VROAR provides unparalleled internships to internship-seekers and business enrichment programs and interns to companies. We facilitate the connection between internship-seekers, looking for seeking internships and companies offering internships. Additionally, we provide a platform where parents of internship-seekers can access information and updates regarding their child's internship.",
    },
  ];
  const parents = [
    {
      name: "You will use the Website only for lawful purposes and in compliance with all applicable laws and regulations. ",
    },
    {
      name: "You will not engage in any activity that disrupts or interferes with the functioning of the Website or its servers and networks.",
    },
    {
      name: "You will not attempt to gain unauthorized access to any portion or feature of the Website.",
    },
    {
      name: "You will not upload, post, or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.",
    },
  ];
  const liability = [
    {
      name: "Your privacy is important to us. Please refer to our Privacy Policy for information on how we collect, use, and disclose personal information.",
    },
  ];
  const externalLinks = [
    {
      name: "The VROAR website may contain links to third-party websites or resources. These links are provided for your convenience and do not imply endorsement or responsibility for the content, products, or services provided by third parties. VROAR is not liable for any damages or losses incurred as a result of your interactions with third-party websites or resources. ",
    },
  ];
  const warranty = [
    {
      name: "VROAR may also offer companies business enrichment programs, including workshops, training sessions, or other educational activities. The details and availability of these programs may vary and are subject to the agreement between VROAR and the participating companies.",
    },
  ];
  const limitation = [
    {
      name: "VROAR provides parents of participating internship-seekers to access the VROAR platform and review their child’s profile. Parents may view information related to their child's internship, such as their internships, scoreboard, ranking, and progress among other information. Parents who access the VROAR platform agree to use and maintain the decorum of the platform and the confidentiality of any information they access through the platform.",
    },
  ];
  const modifications = [
    {
      name: "Violating any applicable laws or regulations.",
    },
    {
      name: " Interfering with or disrupting the Services or the servers and networks connected to the Services.",
    },
    {
      name: " Impersonating any person or entity or falsely stating or otherwise misrepresenting your affiliation with a person or entity.",
    },
    {
      name: " Uploading, posting, or transmitting any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable. ",
    },
    {
      name: " Attempting to gain unauthorized access to any portion or feature of the Services. ",
    },
  ];
  const governing = [
    {
      name: "The VROAR website and its content, including but not limited to text, graphics, logos, images, software, and any other materials, are owned by VROAR or its licensors and are protected by intellectual property laws. You agree not to modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information, software, products, or services obtained from or through the Website.",
    },
  ];
  const disclaimer = [
    {
      name: 'The VROAR website and its content are provided on an "as is" and "as available" basis. VROAR makes no warranties or representations, whether express or implied, regarding the accuracy, completeness, reliability, or availability of the Website. Your use of the Website is at your own risk',
    },
  ];
  const limitaionOfLiability = [
    {
      name: "To the extent permitted by applicable law, VROAR shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising out of or in connection with your use of the Website or these Terms.",
    },
  ];
  const ModificationstotheTerms = [
    {
      name: "VROAR reserves the right to modify these Terms at any time. The updated Terms will be posted on the VROAR website, and your continued use of the Services after the posting of any modifications constitutes your acceptance of the updated Terms.",
    },
  ];
  const termination = [
    {
      name: "VROAR may, at its sole discretion, terminate or suspend your access to the Website, without prior notice or liability, for any reason, including but not limited to a breach of these Terms.",
    },
  ];
  const governingLaw = [
    {
      name: "These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of laws principles.",
    },
  ];

  return (
    <div>
      <Head>
        <title>Website Terms of Use </title>
      </Head>
      <div className="container mt-3">
        <div className="text-start mb-4">
          <h1>Website Terms of Use </h1>
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
        <p className="f-14">
          These Terms of Use ("Terms") govern your use of the VROAR website and
          any content, features, or services provided by VROAR (collectively
          referred to as the "Website"). By accessing or using the Website, you
          agree to be bound by these Terms. Please read them carefully.
        </p>

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
          <h4 className={`${styles.heading_privacy} mb-2`}>
            Description of Services
          </h4>
          <ul>
            {business.map((val, i) => (
              <li key={i}>{val.name}</li>
            ))}
          </ul>
        </div>
        <div className="my-3">
          <h4 className={`${styles.heading_privacy} mb-2`}> User Conduct</h4>
          <p>
            When using the VROAR website, you agree to adhere to the following
            guidelines:
          </p>
          <ul>
            {parents.map((val, i) => (
              <li key={i}>{val.name}</li>
            ))}
          </ul>
        </div>
        <div className="my-3">
          <h4 className={styles.heading_privacy}>Privacy Policy</h4>
          <ul>
            {liability.map((val, i) => (
              <li key={i}>{val.name}</li>
            ))}
          </ul>
        </div>
        <div className="my-3">
          <h4 className={`${styles.heading_privacy} mb-2`}>
            Third-Party Links{" "}
          </h4>
          <ul>
            {externalLinks.map((val, i) => (
              <li key={i}>{val.name}</li>
            ))}
          </ul>
        </div>

        <div className="my-3">
          <h4 className={`${styles.heading_privacy} mb-2`}>Parental Access</h4>
          <ul>
            {limitation.map((val, i) => (
              <li key={i}>{val.name}</li>
            ))}
          </ul>
        </div>
        <div className="my-3">
          <h4 className={`${styles.heading_privacy} mb-2`}>
            Limitation of Liability
          </h4>
          <ul>
            {limitaionOfLiability.map((val, i) => (
              <li key={i}>{val.name}</li>
            ))}
          </ul>
        </div>
        <div className="my-3">
          <h4 className={`${styles.heading_privacy} mb-2`}>
            Intellectual Property
          </h4>
          <ul>
            {governing.map((val, i) => (
              <li key={i}>{val.name}</li>
            ))}
          </ul>
        </div>
        <div className="my-3">
          <h4 className={`${styles.heading_privacy} mb-2`}>
            Disclaimer of Warranty
          </h4>
          <ul>
            {disclaimer.map((val, i) => (
              <li key={i}>{val.name}</li>
            ))}
          </ul>
        </div>
        <div className="my-3">
          <h4 className={`${styles.heading_privacy} mb-2`}>
            Modifications to the Terms
          </h4>
          <ul>
            {ModificationstotheTerms.map((val, i) => (
              <li key={i}>{val.name}</li>
            ))}
          </ul>
        </div>
        <div className="my-3">
          <h4 className={`${styles.heading_privacy} mb-2`}>Termination</h4>
          <ul>
            {termination.map((val, i) => (
              <li key={i}>{val.name}</li>
            ))}
          </ul>
        </div>

        <div className="my-3">
          <h4 className={`${styles.heading_privacy} mb-2`}>Governing Law</h4>
          <ul>
            {governingLaw.map((val, i) => (
              <li key={i}>{val.name}</li>
            ))}
          </ul>
        </div>

        <div className="my-3">
          <h4 className={`${styles.heading_privacy} mb-2`}>
            Contact Information
          </h4>

          <p className="text-justify my-2 f-14">
            If you have any questions or concerns regarding these Terms or the
            Services provided by VROAR, please contact us at
            <a href="mailto:info@vroar.ai" className={styles.contact}>
              {" "}
              info@vroar.ai
            </a>{" "}
            .
          </p>
          <p className="f-14 mb-2">
            By using the VROAR platform and Services, you agree to these Terms
            of Service.
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

export default TermsofUse;
