import React, { useState } from 'react'
import "./index.css"
import { Col, Container, Row } from 'reactstrap';
import forword from "./../../assets/who-we-are-for.png";
import WhoWeAreImage from "./../../assets/who-we-are1.png";
import WhoWeAreImage2 from "./../../assets/who-we-are2.png";
import WhoWeAreImage3 from "./../../assets/who-we-are3.png";
import WhoWeAreImage4 from "./../../assets/recImg.jpg";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleRole } from '../../redux/authSlice';
import RolePolicyModal from '../../components/elements/RolePolicyModal/index.jsx';
import { useMutation } from '@apollo/client';
import { COMPELETE_PROFILE } from '../../graphql/mutation/index.js';
import { CompeleteProfileUpOnSubmit } from '../../graphql/api-callings/index.js';
import { handleClearProfiles } from '../../redux/profileSlice.js';
import Swal from 'sweetalert2';


export default function WhoWeAre() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [completeProfile, { loading: loading1, error, data }] =
    useMutation(COMPELETE_PROFILE);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleCoachClick = () => {
    // dispatch(handleRole("Coach"));
    // setIsModalOpen(true);
    Swal.fire({
      title: '🚀 Coming Soon!',
      text: 'We are working hard to launch something amazing. Stay tuned!',
      icon: 'info',
      confirmButtonText: 'Got it!',
      background: '#1e1e2f',
      color: '#fff',
      confirmButtonColor: '#4f46e5',
      backdrop: `
    rgba(20, 20, 20, 0.78)
    url("https://media.tenor.com/Jg1b9ALpxH0AAAAi/loading-bar-loader.gif")
    left top
    no-repeat
  `,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  }

  const handleContinue = () => {
    setIsModalOpen(false);
    navigate("/coach/select-coach-position");
  }

  const handleAthlete = async () => {

    const payload = {
      role: "Athlete",
    };

    console.log(payload, "payload");

    CompeleteProfileUpOnSubmit(
      payload,
      completeProfile,
      navigate,
      handleClearProfiles,
      dispatch
    );


  }

  return (
    <div style={{ height: "100vh" }} className="mb-5">
      <Container>
        <Row className="pt-4">
          <Col md={12}>
            <h2 className="who-we-are-heading text-center">Who We Are</h2>
            <p className="who-we-are-Description py-2 text-center">
              Pick the role that best describes you to personalize your journey.
            </p>
          </Col>
        </Row>
        <Row className="pb-3 mt-4 ">
          <Col md={6} sm={12} xs={12} className="mt-3 ">
            <div
              onClick={() => {
                dispatch(handleRole("Parent"));
                navigate("/parent/create-profile");
              }}
              style={{
                background: `url(${WhoWeAreImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              className="who-we-are-card d-flex align-items-end"
            >
              <div className="glass-card who-action px-3 d-flex align-items-center justify-content-between">
                <h3>Parents </h3>

                <img src={forword} alt="" />
              </div>
            </div>
          </Col>
          <Col md={6} sm={12} xs={12} className="mt-3">
            <div
              onClick={handleAthlete}
              style={{
                background: `url(${WhoWeAreImage2})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              className="who-we-are-card d-flex align-items-end"
            >
              <div className="glass-card who-action px-3 d-flex align-items-center justify-content-between">
                <h3>Athletes </h3>

                <img src={forword} alt="" />
              </div>
            </div>
          </Col>
          <Col md={6} sm={12} xs={12} className="mt-4">
            <div
              onClick={handleCoachClick}
              style={{
                background: `url(${WhoWeAreImage3})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              className="who-we-are-card d-flex align-items-end"
            >
              <div className="glass-card who-action px-3 d-flex align-items-center justify-content-between">
                <h3>Coaches </h3>

                <img src={forword} alt="" />
              </div>
            </div>
          </Col>
          <Col md={6} sm={12} xs={12} className="mt-4">
            <div
              onClick={() => {
                Swal.fire({
                  title: '🚀 Coming Soon!',
                  text: 'We are working hard to launch something amazing. Stay tuned!',
                  icon: 'info',
                  confirmButtonText: 'Got it!',
                  background: '#1e1e2f',
                  color: '#fff',
                  confirmButtonColor: '#4f46e5',
                  backdrop: `
    rgba(20, 20, 20, 0.78)
    url("https://media.tenor.com/Jg1b9ALpxH0AAAAi/loading-bar-loader.gif")
    left top
    no-repeat
  `,
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  }
                });
                // dispatch(handleRole("Recruiter"));
                // navigate("/recruiter/create-profile");
              }}
              style={{
                background: `url(${WhoWeAreImage4})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              className="who-we-are-card d-flex align-items-end"
            >
              <div className="glass-card who-action px-3 d-flex align-items-center justify-content-between">
                <h3>Recruiters </h3>

                <img src={forword} alt="" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <RolePolicyModal
        isOpen={isModalOpen}
        toggle={toggleModal}
        onContinue={handleContinue}
      />
    </div>
  );
}
