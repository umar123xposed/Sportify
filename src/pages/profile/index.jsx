import React, { useEffect, useRef, useState } from 'react'
import "./index.css"
import { Col, Container, Row } from 'reactstrap';
import forword from "./../../assets/who-we-are-for.png";
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import profile from "./../../assets/profile.png";
import player from "./../../assets/player.png";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { CONTACT_FORM } from '../../graphql/mutation';
import { useMutation, useQuery } from '@apollo/client';
import { ContactFormOnSubmit } from '../../graphql/api-callings';
import { GET_PROFILE } from '../../graphql/query/query';
import EditProfileModal from '../../components/modules/editProfile';
import AdvanceImage from '../../components/modules/editAdvanceImage';
import { useSelector } from 'react-redux';
import Loader from "react-spinner-loader"

export default function Profile() {



  const role = useSelector((state) => state.authSlice?.role);
  const navigate = useNavigate()
  const { loading, error, data, refetch } = useQuery(GET_PROFILE);
  const [currentImage, setCurrentImage] = useState(null)

  const [imgModal, setImageModal] = useState(false);
  const [show, setShow] = useState(false)
  const [profileData, setProfileData] = useState()

  const schema = yup.object().shape({
    full_name: yup
      .string()
      .min(4, "At least 4 Characters required")
      .required("Name is required"),
    subject: yup
      .string()
      .min(4, "At least 4 Characters required")
      .required("Name is required"),
    description: yup
      .string()
      .min(4, "At least 4 Characters required")
      .required("Description is required"),
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      schema
    ),

    mode: "onChange",
  });

  const toggle = () => { 
    // setProfileData()
    refetch()
    setShow(!show) 
  }
  const OnSubmit = (data) => {

    console.log(data, "data");
    // ContactFormOnSubmit(data, contactform, setValue);

  }
  console.log(data, 'dataa')


  useEffect(() => {
      setProfileData(data)
  },[data])


  return (
    <>
      <div className="">
        <Container>
          <Row className="pt-5">
            <Col md={12}>
              <div
                onClick={() => navigate(-1)}
                className="d-flex back-btn mb-4"
              >
                <svg
                  className="me-2 "
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="14"
                  viewBox="0 0 10 18"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.457255 9.94802L7.99992 17.4907L9.88525 15.6054L3.28525 9.00535L9.88525 2.40535L7.99992 0.52002L0.457255 8.06269C0.207294 8.31272 0.0668726 8.6518 0.0668726 9.00535C0.0668726 9.3589 0.207294 9.69798 0.457255 9.94802Z"
                    fill="white"
                  />
                </svg>
                <h4>Back</h4>
              </div>
            </Col>
            <Col xs={12}>
              <h3 className="about-heading text-center mt-0">My Profile</h3>
            </Col>
          </Row>
          {
            loading ? (
<div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
            <Loader show={true}
              spinnerSize="60px"
              radius="10"

              color="red"
            />
          </div>
            ): (
                <Row>
            <Col md = { 2 } />
          <Col md={8}>
            <div className="glass-bg player-profile w-100">
              <div className="w-100 ">
                <div className="d-flex"></div>
                <div
                  style={{ border: "none", cursor: "pointer" }}
                  className="detail-items w-100"
                >
                  <h3 className='fw-bold'>Personal Information</h3>
                  <div
                    onClick={() => {
                      setShow(true);
                      //darkagents
                    }}
                    className="d-flex"
                  >
                    <h4
                      className="me-1"
                      style={{ textDecoration: "underline" }}
                    >
                      Edit
                    </h4>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M4.2207 5.125H3.3457C2.88157 5.125 2.43645 5.30937 2.10827 5.63756C1.78008 5.96575 1.5957 6.41087 1.5957 6.875V14.75C1.5957 15.2141 1.78008 15.6592 2.10827 15.9874C2.43645 16.3156 2.88157 16.5 3.3457 16.5H11.2207C11.6848 16.5 12.13 16.3156 12.4581 15.9874C12.7863 15.6592 12.9707 15.2141 12.9707 14.75V13.875"
                        stroke="white"
                        stroke-width="1.75"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.0959 3.37509L14.7209 6.00009M15.9328 4.76197C16.2774 4.41735 16.471 3.94995 16.471 3.46259C16.471 2.97523 16.2774 2.50783 15.9328 2.16322C15.5882 1.8186 15.1208 1.625 14.6334 1.625C14.1461 1.625 13.6787 1.8186 13.3341 2.16322L5.97095 9.50009V12.1251H8.59595L15.9328 4.76197Z"
                        stroke="white"
                        stroke-width="1.75"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                <div className="detail-items w-100">
                  <h4>Full Name</h4>
                  <h4>{profileData?.profileDetail?.full_name}</h4>
                </div>

                <div className="detail-items w-100">
                  <h4>Username</h4>
                  <h4>{profileData?.profileDetail?.user_name}</h4>
                </div>

                <div className="detail-items w-100">
                  <h4>Email</h4>
                  <h4>{profileData?.profileDetail?.email}</h4>
                </div>

                <div className="detail-items w-100">
                  <h4>Phone</h4>
                  <h4>{profileData?.profileDetail?.phone || "-"}</h4>
                </div>

                {
                  role === "Parent" &&
                  <div className="detail-items w-100">
                    <h4>Relation</h4>
                    <h4>{profileData?.profileDetail?.meta?.relation} </h4>
                  </div>
                }

                {
                  (role === "Coach" ) &&
                  <div className="detail-items w-100">
                    <h4>Organization Name</h4>
                    <h4>{profileData?.profileDetail?.meta?.organization_name} </h4>
                  </div>
                }

                {
                  (role === "Coach") &&
                  <div className="detail-items w-100">
                    <h4>Coach Role</h4>
                    <h4>{profileData?.profileDetail?.meta?.coach_role} </h4>
                  </div>
                }

                {
                  profileData?.profileDetail?.picture &&
                  <div className="detail-items w-100">
                    <h4>Picture</h4>
                    <svg
                      onClick={() => {
                        setImageModal(true);

                        if (profileData?.profileDetail?.picture) {
                          setCurrentImage(
                            `${import.meta.env.VITE_BASE_URL_IMAGE}${profileData?.profileDetail?.picture}`
                          )
                        } else {
                          setCurrentImage(
                            null
                          )
                        }



                      }}
                      style={{ cursor: "pointer" }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="22"
                      viewBox="0 0 32 31"
                      fill="none"
                    >
                      <path
                        d="M16.3338 13.1016C15.3061 13.1016 14.3205 13.5098 13.5938 14.2365C12.8671 14.9632 12.4588 15.9488 12.4588 16.9766C12.4588 18.0043 12.8671 18.9899 13.5938 19.7166C14.3205 20.4433 15.3061 20.8516 16.3338 20.8516C17.3615 20.8516 18.3472 20.4433 19.0739 19.7166C19.8006 18.9899 20.2088 18.0043 20.2088 16.9766C20.2088 15.9488 19.8006 14.9632 19.0739 14.2365C18.3472 13.5098 17.3615 13.1016 16.3338 13.1016ZM16.3338 23.4349C14.621 23.4349 12.9783 22.7545 11.7671 21.5433C10.5559 20.3321 9.87549 18.6894 9.87549 16.9766C9.87549 15.2637 10.5559 13.621 11.7671 12.4098C12.9783 11.1987 14.621 10.5182 16.3338 10.5182C18.0467 10.5182 19.6894 11.1987 20.9006 12.4098C22.1117 13.621 22.7922 15.2637 22.7922 16.9766C22.7922 18.6894 22.1117 20.3321 20.9006 21.5433C19.6894 22.7545 18.0467 23.4349 16.3338 23.4349ZM16.3338 7.28906C9.87549 7.28906 4.36007 11.3061 2.12549 16.9766C4.36007 22.647 9.87549 26.6641 16.3338 26.6641C22.7922 26.6641 28.3076 22.647 30.5422 16.9766C28.3076 11.3061 22.7922 7.28906 16.3338 7.28906Z"
                        fill="#FFEAEA"
                      />
                    </svg>
                  </div>
                }


              </div>
            </div>
          </Col>
          <Col md={2} />
        </Row>
        )
          }


      </Container>
    </div >

      <EditProfileModal
        setShow={setShow}
        toggle={toggle}
        show={show}
        data={profileData?.profileDetail}
        refetch={refetch}
      />
      <AdvanceImage
        setImage={setCurrentImage}
        setShow={setImageModal}
        show={imgModal}
        fr={currentImage}
      />
    </>
  );
}
