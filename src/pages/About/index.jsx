import React, { useState } from "react";
import './index.css'
import { Col, Container, Row } from "reactstrap";

import about from "./../../assets/about.png";
const About = () => {


  return (
    <>
      <Container>
        <Row className="mx-0">
          <Col md={12}>
            <h3 className="about-heading">Our Story</h3>
          </Col>
          <Col md={6}>
            <p className="about-decription pe-3 ">
            Sport Me ID is more than just a sports website — it is a comprehensive digital ecosystem designed to connect Athletes, Parents, Coaches, and Recruiters on one unified platform. Born from the vision of simplifying and professionalizing the athletic journey, Sport Me ID offers tools that enable athletes to create detailed profiles, track performance, and gain visibility; allows parents to manage and support their child’s sports development; equips coaches with team management and evaluation tools; and empowers recruiters with streamlined access to credible athlete data. Our features include customizable athlete profiles, QR code integration for instant identity sharing, parent-child linking, real-time notifications, secure Visa-enabled transactions, and merchandise ordering. We are committed to fostering transparency, accessibility, and innovation in sports by offering a platform that bridges the gap between talent and opportunity. With our mission to empower every athlete with a professional digital identity and our vision of being the standard in digital sports connectivity, we invite you to join a movement that celebrates growth, performance, and passion — all in one place. 
            </p>
           
          </Col>
          <Col md={6} className="pt-5">
            <img
            className="img-fluid p-2"
              style={{ height: "300px", width:"auto", objectFit: "cover" }}
              src={about}
              alt=""
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;