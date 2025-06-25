import "./index.css"
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Container, Modal, Row } from 'reactstrap';

import * as yup from "yup";

import {  useNavigate } from 'react-router-dom';
import React, {  useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdvanceImage from "../editAdvanceImage";

//import { handleCreateBasicProfile } from "../../redux/profileSlice";


export default function PreviewAdvancedgModal({ setShow, show, data, getValues }) {
  const draft = useSelector((state) => state.profileSlice.profile.basicProfile);
  console.log(draft, "draft");
  const [open, setOpen] = useState(false);
  const [accord, setAccordian] = useState("0");
  const [detailTupe, setDetailType] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [imgModal, setImageModal] = useState(false);

  const toggleAccordion = (id) => {
    if (accord === id) {
      setAccordian();
    } else {
      setAccordian(id);
    }
  };

  console.log(getValues("recruiting_preferences.scholarship_offers") , 'whastf');


  const formateDate = (dat) => {
  const isoDate = dat
  const readableDate = new Date(isoDate).toLocaleDateString("en-US");
    return readableDate
  }
  return (
    <>
      <Modal size="xl" centered isOpen={show}>
        <div className="solid-card">
          <div className="d-flex justify-content-end mb-3">
            <svg
              style={{
                cursor: "pointer",
              }}
              onClick={() => setShow(false)}
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 26 26"
              fill="none"
            >
              <path
                d="M23.07 25.3183L13 15.2325L2.92997 25.3183L0.681641 23.07L10.7675 13L0.681641 2.92997L2.92997 0.681641L13 10.7675L23.07 0.697474L25.3025 2.92997L15.2325 13L25.3025 23.07L23.07 25.3183Z"
                fill="white"
              />
            </svg>
          </div>
          <Row>
            <Col md={12}>
              <div
                style={{ border: "none", cursor: "pointer" }}
                className="detail-items w-100"
              >
                <h4 style={{ fontSize: "20px" }}> Profile details</h4>
                <div
                  // onClick={() => setModalPlayerUpdateProfile(true)}
                  className="d-flex"
                ></div>
              </div>
              <div className="glass-bg player-profile">
                <div className="w-100 ">
                  <div className="d-flex"></div>

                  <div className="detail-items w-100">
                    <h4>Full Name</h4>
                    <h4>{draft?.full_name}</h4>
                  </div>

                  <div className="detail-items w-100">
                    <h4>Picture</h4>
                    <svg
                      onClick={() => {
                        setImageModal(true);
                        setCurrentImage(draft?.picture);
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

                  <div className="detail-items w-100">
                    <h4> Nickname </h4>
                    <h4>{draft?.nick_name || "-----"} </h4>
                  </div>

                  <div className="detail-items w-100">
                    <h4> Date of Birth </h4>
                    <h4>{formateDate(draft?.dob) || "-----"} </h4>
                  </div>

                  {/* <div className="detail-items w-100">
                    <h4> Email </h4>
                    <h4>{draft?.previewEmail || "-----"} </h4>
                  </div>
                  */}

                  {/*
                  <div className="detail-items w-100">
                    <h4>Email Address</h4>
                    <h4>{draft?.email} </h4>
                  </div> */}

                  <div className="detail-items w-100">
                    <h4> Phone Number </h4>
                    <h4>{draft?.phone}</h4>
                  </div>

                  <div className="detail-items w-100">
                    <h4> Gender </h4>
                    <h4> {draft?.gender || "-----"} </h4>
                  </div>

                  <div className="detail-items w-100">
                    <h4> Weight </h4>
                    <h4>
                      {draft?.profile_detail?.advanced?.weight || "-----"}{" "}
                    </h4>
                  </div>

                  <div className="detail-items w-100">
                    <h4> Height </h4>
                    <h4>
                      {draft?.profile_detail?.advanced?.height?.feet +
                        "." +
                        draft?.profile_detail?.advanced?.height?.inches ||
                        "-----"}
                    </h4>
                  </div>

                  <div className="detail-items w-100">
                    <h4>Dominatent Hand</h4>
                    <h4>
                      {draft?.profile_detail?.advanced?.dominant_hand ||
                        "-----"}
                    </h4>
                  </div>

                  {/* <div className="detail-items w-100">
                    <h4> Instagram </h4>
                  </div> */}
                  <div className="detail-items w-100">
                    <h4> Twitter</h4>
                    <h4> {draft?.social[0]?.link || "-----"}</h4>
                  </div>

                  <div className="detail-items w-100">
                    <h4> Instagram</h4>
                    <h4> {draft?.social[1]?.link || "-----"}</h4>
                  </div>
                  <div className="detail-items w-100">
                    <h4> Youtube</h4>
                    <h4> {draft?.social[2]?.link || "-----"}</h4>
                  </div>
                  <div className="detail-items w-100">
                    <h4> Tiktok</h4>
                    <h4> {draft?.social[3]?.link || "-----"}</h4>
                  </div>
                  <div className="detail-items w-100">
                    <h4> IMLCA</h4>
                    <h4> {draft?.social[4]?.link || "-----"}</h4>
                  </div>
                </div>
              </div>

              <div
                style={{ border: "none", cursor: "pointer" }}
                className="detail-items w-100"
              >
                <h4 style={{ fontSize: "20px" }}>Athletic Information</h4>
                <div
                  // onClick={() => setModalPlayerUpdateProfile(true)}
                  className="d-flex"
                ></div>
              </div>

              <div className="glass-bg player-profile">
                <div className="w-100 ">
                  <div className="d-flex"></div>

                  <div
                    onClick={() => {
                      setDetailType("sport_type");
                      setOpen(true);
                    }}
                    className="detail-items w-100"
                  >
                    <h4> View all sports type</h4>
                    <h4>
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        viewBox="0 0 13 22"
                        fill="none"
                      >
                        <path
                          d="M1.82968 21.8616L12.6904 11.0011L1.82968 0.140625L0.442273 1.54687L9.89677 11.0011L0.442273 20.4553L1.82968 21.8616Z"
                          fill="white"
                        />
                      </svg>
                    </h4>
                  </div>
                  <div
                    onClick={() => {
                      setDetailType("car");
                      setOpen(true);
                    }}
                    className="detail-items w-100"
                  >
                    <h4>Career Stats & Highlights</h4>
                    <h4>
                      <svg
                        onClick={() => setShow(true)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        viewBox="0 0 13 22"
                        fill="none"
                      >
                        <path
                          d="M1.82968 21.8616L12.6904 11.0011L1.82968 0.140625L0.442273 1.54687L9.89677 11.0011L0.442273 20.4553L1.82968 21.8616Z"
                          fill="white"
                        />
                      </svg>
                    </h4>
                  </div>
                  <div className="detail-items w-100">
                    <h4>Agility</h4>
                    <h4>
                      {
                        draft?.profile_detail?.advanced?.performance_metrics
                          ?.agility
                      }
                    </h4>
                  </div>
                  <div className="detail-items w-100">
                    <h4>Injury</h4>
                    <h4>
                      {draft?.profile_detail?.advanced?.performance_metrics
                        ?.agility || "-----"}{" "}
                    </h4>
                  </div>
                  {/*
                  <div className="detail-items w-100">
                    <h4>Email Address</h4>
                    <h4>{draft?.email} </h4>
                  </div> */}
                  <div className="detail-items w-100">
                    <h4>Speed</h4>
                    <h4>
                      {draft?.profile_detail?.advanced?.performance_metrics
                        ?.speed || "-----"}
                    </h4>
                  </div>
                  <div className="detail-items w-100">
                    <h4>Strength</h4>
                    <h4>
                      {draft?.profile_detail?.advanced?.performance_metrics
                        ?.strength || "-----"}
                    </h4>
                  </div>
                </div>
              </div>

              <div
                style={{ border: "none", cursor: "pointer" }}
                className="detail-items w-100"
              >
                <h4 style={{ fontSize: "20px" }}>Academic Information</h4>
                <div
                  // onClick={() => setModalPlayerUpdateProfile(true)}
                  className="d-flex"
                ></div>
              </div>

              <div className="glass-bg player-profile">
                <div className="w-100 ">
                  <div className="d-flex"></div>

                  <div className="detail-items w-100">
                    <h4>School Name</h4>
                    <h4>
                      {draft?.profile_detail?.advanced?.academic_info
                        ?.highschool || "-----"}
                    </h4>
                  </div>
                  <div className="detail-items w-100">
                    <h4>School Address</h4>
                    <h4>
                      {draft?.profile_detail?.advanced?.academic_info
                        ?.address || "-----"}{" "}
                    </h4>
                  </div>
                  <div className="detail-items w-100">
                    <h4>Scores</h4>
                    <h4>
                      {draft?.profile_detail?.advanced?.academic_info?.scores ||
                        "-----"}
                    </h4>
                  </div>

                  {/*
                  <div className="detail-items w-100">
                    <h4>Email Address</h4>
                    <h4>{draft?.email} </h4>
                  </div> */}
                  <div className="detail-items w-100">
                    <h4>GPA</h4>
                    <h4>
                      {draft?.profile_detail?.advanced?.academic_info?.gpa ||
                        "-----"}
                    </h4>
                  </div>
                  <div className="detail-items w-100">
                    <h4>Graduation Year</h4>
                    <h4>
                      {draft?.profile_detail?.advanced?.academic_info?.year}
                    </h4>
                  </div>
                  <div className="detail-items w-100">
                    <h4>Award</h4>
                    <svg
                      onClick={() => {
                        setImageModal(true);
                        setCurrentImage(
                          draft?.profile_detail?.advanced?.academic_info?.award
                        );
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
                  <div className="detail-items w-100">
                    <h4> Transcript </h4>
                    <svg
                      onClick={() => {
                        setImageModal(true);
                        setCurrentImage(
                          draft?.profile_detail?.advanced?.academic_info
                            ?.transcript
                        );
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
                </div>
              </div>

              <div
                style={{ border: "none", cursor: "pointer" }}
                className="detail-items w-100"
              >
                <h4 style={{ fontSize: "20px" }}>Recruiting Information</h4>
                <div
                  // onClick={() => setModalPlayerUpdateProfile(true)}
                  className="d-flex"
                ></div>
              </div>

              <div className="glass-bg player-profile">
                <div className="w-100 ">
                  <div className="d-flex"></div>
                  <div className="detail-items w-100">
                    <h4>Scholarship Offers</h4>
                    <h4>
                      {getValues("recruiting_preferences.scholarship_offers") ||
                        "-----"}
                    </h4>
                  </div>
                  <div className="detail-items w-100">
                    <h4> Direct Contact for Recruiters</h4>
                    <h4>
                      {getValues("recruiting_preferences.direct_contact") ||
                        "-----"}
                    </h4>
                  </div>
                  <div className="detail-items w-100">
                    <h4> Coach & Trainer References</h4>
                    <h4>
                      {getValues("recruiting_preferences.coach_trainer") ||
                        "-----"}
                    </h4>
                  </div>
                  <div className="detail-items w-100">
                    <h4>Preferred Colleges for Athletics</h4>
                    <h4>
                      {/* {getValues("recruiting_preferences.interested_in").join(
                        ", "
                      ) || "-----"} */}
                    </h4>
                  </div>

                  <div className="detail-items w-100">
                    <h4> Scouting Reports & Endorsement </h4>
                    <svg
                      onClick={() => {
                        const file = getValues(
                          "recruiting_preferences.reports_endorsements"
                        );

                        if (file) {
                          const selectedFile = Array.isArray(file)
                            ? file[0]
                            : file;
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setCurrentImage(reader.result); // base64 image string
                            setImageModal(true);
                          };
                          reader.readAsDataURL(selectedFile);
                        } else {
                          setCurrentImage(null);
                          setImageModal(true);
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
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
      <Modal backdrop={false} size="xl" centered isOpen={open}>
        {detailTupe == "sport_type" && (
          <div className="gray-modal team-details">
            <div className="d-flex justify-content-between mb-3">
              <h3>View all sports details </h3>

              <svg
                style={{
                  cursor: "pointer",
                }}
                onClick={() => setOpen(false)}
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 26 26"
                fill="none"
              >
                <path
                  d="M23.07 25.3183L13 15.2325L2.92997 25.3183L0.681641 23.07L10.7675 13L0.681641 2.92997L2.92997 0.681641L13 10.7675L23.07 0.697474L25.3025 2.92997L15.2325 13L25.3025 23.07L23.07 25.3183Z"
                  fill="white"
                />
              </svg>
            </div>
            <Row>
              <Col md={12}>
                <Accordion
                  className="py-2"
                  open={accord}
                  toggle={toggleAccordion}
                >
                  {draft?.profile_detail?.advanced?.sports_info?.map(
                    (sport, index) => {
                      // console.log(sport, "awhat is");
                      return (
                        <>
                          <AccordionItem className="py-2">
                            <AccordionHeader targetId={index}>
                              {sport?.type}
                            </AccordionHeader>

                            <AccordionBody accordionId={index}>
                              <div className="team-card">
                                <div className="team-card-item d-flex justify-content-between">
                                  <p>Sports</p>
                                  <p>{sport?.type || "-----"}</p>
                                </div>

                                <div className="team-card-item d-flex justify-content-between">
                                  <p>Team Name</p>
                                  <p>{sport?.team_name || "-----"}</p>
                                </div>

                                <div className="team-card-item d-flex justify-content-between">
                                  <p>Jersey Number </p>
                                  <p>{sport?.jersey_no || "-----"} </p>
                                </div>

                                <div className="team-card-item d-flex justify-content-between">
                                  <p>Played Matches </p>
                                  <p>{sport?.match_played || "-----"} </p>
                                </div>

                                <div className="team-card-item d-flex justify-content-between">
                                  <p> Losses </p>
                                  <p>{sport?.losses || "-----"} </p>
                                </div>

                                <div className="team-card-item d-flex justify-content-between">
                                  <p> Draws </p>
                                  <p> {sport?.draws || "-----"} </p>
                                </div>

                                <div className="team-card-item d-flex justify-content-between">
                                  <p> Experience</p>
                                  <p>
                                    {sport?.experience + " Year" || "-----"}{" "}
                                  </p>
                                </div>

                                <div className="team-card-item d-flex justify-content-between">
                                  <p> Wins </p>
                                  <p>{sport?.wins || "-----"} </p>
                                </div>

                                <div className="team-card-item d-flex justify-content-between">
                                  <p> Position </p>
                                  <p>
                                    {sport?.positions?.join(", ") || "-----"}
                                  </p>
                                </div>
                              </div>
                            </AccordionBody>
                          </AccordionItem>
                        </>
                      );
                    }
                  )}
                </Accordion>
              </Col>
            </Row>
          </div>
        )}

        {detailTupe == "car" && (
          <>
            <div className="gray-modal team-details">
              <div className="d-flex justify-content-between mb-3">
                <h3>Career Stats & Highlights </h3>

                <svg
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => setOpen(false)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 26 26"
                  fill="none"
                >
                  <path
                    d="M23.07 25.3183L13 15.2325L2.92997 25.3183L0.681641 23.07L10.7675 13L0.681641 2.92997L2.92997 0.681641L13 10.7675L23.07 0.697474L25.3025 2.92997L15.2325 13L25.3025 23.07L23.07 25.3183Z"
                    fill="white"
                  />
                </svg>
              </div>

              <Row>
                <div className="team-card p-3">
                  <div className="team-card-item d-flex justify-content-between">
                    <p>Top Scorer</p>
                    <p>
                      {draft?.profile_detail?.advanced?.career_stats?.top_scorer?.join(
                        ", "
                      ) || "-----"}
                    </p>
                  </div>

                  <div className="team-card-item d-flex justify-content-between">
                    <p>Valuable Player</p>
                    <p>
                      {draft?.profile_detail?.advanced?.career_stats?.valuable_player?.join(
                        ", "
                      ) || "-----"}
                    </p>
                  </div>
                </div>
              </Row>
            </div>
          </>
        )}
      </Modal>

      <AdvanceImage
        setImage={setCurrentImage}
        setShow={setImageModal}
        show={imgModal}
        fr={currentImage}
      />
    </>
  );
}



