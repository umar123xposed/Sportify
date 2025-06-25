// import React, { useState } from "react";
// import './index.css'
// import { Col, Container, Row } from "reactstrap";

// import about from "./../../assets/about.png";
// const Privacy = () => {


//   return (
//     <>
//       <Container>
//         <Row>
//           <Col md={12}>
//             <h3 className="about-heading">Privacy Policy</h3>
//           </Col>
//           <Col md={12}>
//             <p className="about-decription pe-3">
//             Sport Me ID is a web platform connecting Parents, Athletes, Coaches, and Recruiters to build and share athletic profiles, manage teams, and access athlete data. This Privacy Policy outlines how we collect, use, share, and protect your personal information. By using Sport Me ID, you agree to the terms of this policy. We collect account details such as names, email, and profile info, along with performance stats, financial transaction data (for services such as QR codes and merchandise), and usage data like IP addresses. Payments are processed securely via PCI-compliant third-party providers. Information may be shared with consent, payment providers, shipping partners, recruiters, and for legal reasons. You can update or delete your profile, control visibility, and manage subscriptions. We retain your data as long as necessary for platform use and ensure security via encryption, SSL/TLS, and role-based access controls. Profiles created by Parents for minors are supervised, and we do not collect data from users under 13 without verified parental consent. We may update this policy and notify users of material changes. For questions, contact us via email or visit our website.
//             </p>
            
//           </Col>

//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Privacy;


import React, { useState } from "react";
import './index.css'
import { Col, Container, Row } from "reactstrap";

import about from "./../../assets/about.png";
const Privacy = () => {


  return (
    <>
      <Container>
        <Row className="my-5">
          <Col md={12}>
            <h3 className="text-white1 fw-bold py-2" style={{fontSize: "22px"}}>Privacy Policy</h3>
          </Col>
          <Col md={12}>
            <p className="pe-3">
            Welcome to Sports Me ID! Your privacy is extremely important to us, and we are committed to protecting your personal information and ensuring that you have complete transparency in how your data is collected, stored, used, and shared. This Privacy Policy provides a detailed explanation of the types of information we gather when you use our mobile application and related services, how we process and utilize that information, the security measures we take to safeguard your data, and the rights you have concerning your personal information.
            </p>
            <h3 className="text-white1 fw-bold py-2" style={{fontSize: "22px"}}>INFORMATION WE COLLECT</h3>
            <p className="  pe-3">
            We collect different types of information to enhance your user experience and provide the best possible service. The information we collect includes, but is not limited to:
            </p>
            <ul>
              <li className="  pe-3">Personal details, athletic statistics, and account-related data, which may include your full name, date of birth, email address, phone number, and any other details required for your profile.</li>
              <li className="  pe-3">QR code-linked profile information, allowing seamless access to your profile for identity verification, quick logins, and secure interactions within our platform.</li>
            </ul>
            <h3 className="text-white1 fw-bold py-2" style={{fontSize: "22px"}}>HOW WE USE YOUR INFORMATION</h3>
            <p className="  pe-3">
            We utilize the information collected from you in multiple ways to ensure smooth functionality, improve our services, and provide an enhanced experience. Your data is used for the following purposes:
            </p>
            <ul>
              <li className="  pe-3">Profile sharing and recruitment, allowing you to showcase your skills, achievements, and personal details to potential recruiters, organizations, or other users as per your preferences.</li>
              <li className="  pe-3">Service improvement and security, where we analyze collected data to refine our platform, enhance usability, introduce new features, and strengthen security measures to protect against unauthorized access, breaches, or fraud.</li>
            </ul>
            <h3 className="text-white1 fw-bold py-2" style={{fontSize: "22px"}}>DATA SECURITY</h3>
            <p className="  pe-3">
            We take the protection of your personal information seriously and have implemented strict security measures to ensure that your data remains safe and confidential at all times. These measures include:
            </p>
            <ul>
              <li className="  pe-3">Encrypted storage and secure login, ensuring that your personal details and credentials are protected using advanced encryption technologies to prevent unauthorized access or data leaks.</li>
              <li className="  pe-3">Role-based access control, restricting access to sensitive information based on predefined user roles, ensuring that only authorized personnel or users can access specific data.</li>
            </ul>
            <h3 className="text-white1 fw-bold py-2" style={{fontSize: "22px"}}>USER RIGHTS</h3>
            <p className="  pe-3">
            As a user of Sports Me ID, you have full control over your personal data and the right to manage it as per your preferences. Your rights include:
            </p>
            <ul>
              <li className="  pe-3">Profile updates and privacy controls, allowing you to modify, update, or delete any information in your profile at any time to maintain accuracy and privacy.</li>
              <li className="  pe-3">Data access and deletion requests, where you can request access to your stored data or submit a request to have your information permanently removed from our system if you no longer wish to use our services.</li>
            </ul>
            <p className="  pe-3">
            We are committed to ensuring that your personal information remains protected while giving you full transparency and control over how your data is handled. If you have any concerns or questions regarding our Privacy Policy, feel free to reach out to our support team for further assistance.
            </p>
          </Col>

        </Row>
      </Container>
    </>
  );
};

export default Privacy;