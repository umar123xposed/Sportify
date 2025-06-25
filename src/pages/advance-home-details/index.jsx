import "./index.css"
import { Button, Col, Container, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import dummyprofile from "./../../assets/dummyprofile.png";
import qr from "./../../assets/qr.png";
import right_qr from "./../../assets/right_qr.png";
import QrCode from "../../components/elements/qr-card";
import twitter from "./../../assets/twitter.png";
import insta from "./../../assets/instagram.png";
import fg from "./../../assets/fg.png";
import youtube from "./../../assets/youtube.png";
import tiktok from "./../../assets/tiktok.png";
import profile from "./../../assets/profile.png";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export default function AdvanceHomeDetails() {

const [startDate, setStartDate] = useState(new Date());
const phoneInputRef = useRef(null);
const iti = useRef(null);
useEffect(() => {
  if (phoneInputRef && phoneInputRef.current) {
    // Initialize the intl-tel-input plugin
    // console.log(phoneInputRef.current, window)
    iti.current = window?.intlTelInput(phoneInputRef.current, {
      initialCountry: "uk",
      utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js", // Required script for validation
    });
  }

  return () => {
    if (iti.current) {
      iti.current.destroy(); // Clean up the intl-tel-input instance when the component unmounts
    }
  };
}, []);
const [selectedOption, setSelectedOption] = useState(""); // State for radio selection

const [tags, setTags] = useState([]);
const [inputValue, setInputValue] = useState("");

const handleKeyDown = (event) => {
  if (event.key === "Enter" && inputValue.trim() !== "") {
    event.preventDefault(); // Prevent form submission
    if (!tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
    }
    setInputValue(""); // Clear input field
  }
};

const handleOnclick = (event) => {

  if (inputValue.trim() !== "") {
    event.preventDefault(); // Prevent form submission
    if (!tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
    }
    setInputValue(""); // Clear input field
  }

};

const handleRemoveTag = (index) => {
  setTags(tags.filter((_, i) => i !== index));
};


  const [modal, setModal] = useState(false);
const [ edit , setEdit] =useState(false)
const [editTeamModal , setEditTeamModal ] = useState(false);


const [modalUpdateProfile , setModalUpdateProfile] = useState(false);
const [modalPlayerUpdateProfile, setModalPlayerUpdateProfile] = useState(false);

const toggle = () => setModal(!modal);
const toggleUpdate = () => setModal(!modalUpdateProfile);
const toggleTeam = () => setModal(!editTeamModal);
const togglePlayerInfo = () => setModal(!modalPlayerUpdateProfile);


const navigate = useNavigate()

  return (
    <>
      <div className="who-we-are-bg ">
        <div
          style={{
            overflowY: "auto",
          }}
        >
          <Container>
            <Row className="my-5">
              <Col md={6}>
                <div
                  style={{ padding: "14px 20px" }}
                  className="home_profile_card gray solid-card d-flex align-items-center"
                >
                  <img src={dummyprofile} />
                  <div>
                    <h3>Jr. Cristiano</h3>
                    <h4>ID:2956900</h4>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => setModalUpdateProfile(true)}
                  className="gold_card w-100  pe-3"
                >
                  <Row className="">
                    <Col className=" bg-right " md={6}>
                      <div className="ms-3 h-100 d-flex align-items-center">
                        <img className="me-3" src={qr} />
                        <h3>Generate QR Code </h3>
                      </div>
                    </Col>
                    <Col className=" pe-3" md={6}>
                      <div className="ms-3 h-100 justify-content-end d-flex align-items-center">
                        <img className="me-1" src={right_qr} />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="25"
                          viewBox="0 0 15 25"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M14.0822 13.8801L3.45435 24.5079L0.797852 21.8514L10.0975 12.5518L0.797852 3.2522L3.45435 0.595703L14.0822 11.2236C14.4344 11.5759 14.6323 12.0536 14.6323 12.5518C14.6323 13.05 14.4344 13.5278 14.0822 13.8801Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            <div className="d-flex justify-content-center">
              <h3 style={{ color: "#fff", margin: "20px 20px" }} className="">
                Personal Information{" "}
              </h3>
            </div>
            <>
              <Row>
                <Col md={12}>
                  <div className="glass-bg player-profile">
                    <div className="w-100 ">
                      <div className="d-flex"></div>
                      <div
                        style={{ border: "none", cursor: "pointer" }}
                        className="detail-items w-100"
                      >
                        <h4>All details</h4>
                        <div
                          onClick={() => setModalPlayerUpdateProfile(true)}
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
                        <h4>jackman schanman</h4>
                      </div>

                      <div className="detail-items w-100">
                        <h4>Nickname</h4>
                        <h4>Jackie </h4>
                      </div>

                      <div className="detail-items w-100">
                        <h4>Email Address</h4>
                        <h4>abc@gmail.com </h4>
                      </div>

                      <div className="detail-items w-100">
                        <h4>Phone Number</h4>
                        <h4> +9234355353 </h4>
                      </div>

                      <div className="detail-items w-100">
                        <h4>Gender</h4>
                        <h4>Male </h4>
                      </div>

                      <div
                        onClick={() => setModal(true)}
                        className="detail-items w-100"
                      >
                        <h4>View all Sports</h4>
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
                      <div className="detail-items w-100">
                        <h4>Socials</h4>
                        <h4> 4</h4>
                      </div>
                      <div className="detail-items w-100">
                        <h4>Dominant Hand</h4>
                        <h4> 4 </h4>
                      </div>
                      <div className="detail-items w-100">
                        <h4>Stats</h4>
                        <h4> - </h4>
                      </div>
                    </div>
                    {/*

                  <Tabs
                    value={focusedIdx}
                    onChange={setFocusedIdx}
                    tabs={tabs}
                  />

                  */}
                  </div>
                </Col>
              </Row>
            </>
            <div className="d-flex justify-content-center">
              <h3 style={{ color: "#fff", margin: "20px 20px" }} className="">
                Athletic Information
              </h3>
            </div>
            <>
              <Row>
                <Col md={12}>
                  <div className="glass-bg player-profile">
                    <div className="w-100 ">
                      <div className="d-flex"></div>
                      <div
                        style={{ border: "none", cursor: "pointer" }}
                        className="detail-items w-100"
                      >
                        <h4>All details</h4>
                        <div
                          onClick={() => setModalPlayerUpdateProfile(true)}
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

                      <div
                        onClick={() => setModal(true)}
                        className="detail-items w-100"
                      >
                        <h4>View all Sports</h4>
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
                      <div className="detail-items w-100">
                        <h4>Career Stats & Highlights</h4>
                        <h4> 4</h4>
                      </div>
                    </div>
                    {/*

                  <Tabs
                    value={focusedIdx}
                    onChange={setFocusedIdx}
                    tabs={tabs}
                  />

                  */}
                  </div>
                </Col>
              </Row>
            </>
            <div className="d-flex justify-content-center">
              <h3 style={{ color: "#fff", margin: "20px 20px" }} className="">
                Athletic Performance Metrics
              </h3>
            </div>
            <>
              <Row>
                <Col md={12}>
                  <div className="glass-bg player-profile">
                    <div className="w-100 ">
                      <div className="d-flex"></div>
                      <div
                        style={{ border: "none", cursor: "pointer" }}
                        className="detail-items w-100"
                      >
                        <h4>All details</h4>
                        <div
                          onClick={() => setModalPlayerUpdateProfile(true)}
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
                        <h4>Speed</h4>
                        <h4>13km/hr</h4>
                      </div>

                      <div className="detail-items w-100">
                        <h4>Strength</h4>
                        <h4>20lbs </h4>
                      </div>

                      <div className="detail-items w-100">
                        <h4>Agility Score</h4>
                        <h4>20ms </h4>
                      </div>

                      <div className="detail-items w-100">
                        <h4>Injury History</h4>
                        <h4>- </h4>
                      </div>

                      <div className="detail-items w-100">
                        <h4>Dominant Hand</h4>
                        <h4>Right </h4>
                      </div>

                      <div
                        onClick={() => setModal(true)}
                        className="detail-items w-100"
                      >
                        <h4>MVP Awards</h4>
                        <h4>4</h4>
                      </div>
                      <div className="detail-items w-100">
                        <h4>Socials</h4>
                        <h4> 4</h4>
                      </div>
                      <div className="detail-items w-100">
                        <h4>Dominant Hand</h4>
                        <h4> Left </h4>
                      </div>
                      <div className="detail-items w-100">
                        <h4>Stat</h4>
                        <h4> - </h4>
                      </div>
                    </div>
                    {/*

                  <Tabs
                    value={focusedIdx}
                    onChange={setFocusedIdx}
                    tabs={tabs}
                  />

                  */}
                  </div>
                </Col>
              </Row>
            </>
            <div className="d-flex justify-content-center">
              <h3 style={{ color: "#fff", margin: "20px 20px" }} className="">
                Detailed Game Stats
              </h3>
            </div>
            <>
              <Row>
                <Col md={12}>
                  <div className="glass-bg player-profile">
                    <div className="w-100 ">
                      <div className="d-flex"></div>
                      <div
                        style={{ border: "none", cursor: "pointer" }}
                        className="detail-items w-100"
                      >
                        <h4>All details</h4>
                        <div
                          onClick={() => setModalPlayerUpdateProfile(true)}
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
                        <h4>Matches Played</h4>
                        <h4>4</h4>
                      </div>

                      <div className="detail-items w-100">
                        <h4>Minutes Played</h4>
                        <h4>90 minutes </h4>
                      </div>

                      <div className="detail-items w-100">
                        <h4>Win</h4>
                        <h4>3</h4>
                      </div>

                      <div className="detail-items w-100">
                        <h4>Losses</h4>
                        <h4> 1</h4>
                      </div>

                      <div className="detail-items w-100">
                        <h4>Draw</h4>
                        <h4>Total Points Scored </h4>
                      </div>

                      <div className="detail-items w-100">
                        <h4>Socials</h4>
                        <h4> 4</h4>
                      </div>
                      <div className="detail-items w-100">
                        <h4>Total Points Scored</h4>
                        <h4> 4 </h4>
                      </div>

                      <div className="detail-items w-100">
                        <h4>Assist</h4>
                        <h4> 2 </h4>
                      </div>

                      <div className="detail-items w-100">
                        <h4>Penalty/Fouls</h4>
                        <h4> - </h4>
                      </div>
                    </div>
                    {/*

                  <Tabs
                    value={focusedIdx}
                    onChange={setFocusedIdx}
                    tabs={tabs}
                  />

                  */}
                  </div>
                </Col>
              </Row>
            </>

            <div className="d-flex justify-content-center">
              <h3 style={{ color: "#fff", margin: "20px 20px" }} className="">
                Workout & training logs
              </h3>
            </div>

            <>
              <Row>
                <Col md={12}>
                  <div className="glass-bg player-profile">
                    <div className="w-100 ">
                      <div className="d-flex"></div>
                      <div
                        style={{ border: "none", cursor: "pointer" }}
                        className="detail-items w-100"
                      >
                        <h4>All details</h4>
                        <div
                          onClick={() => setModalPlayerUpdateProfile(true)}
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
                        <h4>Strength</h4>
                        <h4>20lb</h4>
                      </div>

                      <div className="detail-items w-100">
                        <h4>Endurance</h4>
                        <h4>20 minutes </h4>
                      </div>

                      <div className="detail-items w-100">
                        <h4>Recovery Speed</h4>
                        <h4>14 bpm </h4>
                      </div>
                    </div>
                    {/*

                  <Tabs
                    value={focusedIdx}
                    onChange={setFocusedIdx}
                    tabs={tabs}
                  />

                  */}
                  </div>
                </Col>
              </Row>
            </>

            <div className="d-flex justify-content-center">
              <h3 style={{ color: "#fff", margin: "20px 20px" }} className="">
                Academic Information
              </h3>
            </div>
            <>
              <Row>
                <Col md={12}>
                  <div className="glass-bg player-profile">
                    <div className="w-100 ">
                      <div className="d-flex"></div>
                      <div
                        style={{ border: "none", cursor: "pointer" }}
                        className="detail-items w-100"
                      >
                        <h4>All details</h4>
                        <div
                          onClick={() => setModalPlayerUpdateProfile(true)}
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
                        <h4>School name</h4>
                        <h4>4</h4>
                      </div>
                      <div className="detail-items w-100">
                        <h4>School Address</h4>
                        <h4>90 minutes </h4>
                      </div>
                      <div className="detail-items w-100">
                        <h4>GPA</h4>
                        <h4>3 </h4>
                      </div>
                      <div className="detail-items w-100">
                        <h4>Transcript</h4>
                        <h4> eye icon </h4>
                      </div>
                      <div className="detail-items w-100">
                        <h4>Draw</h4>
                        <h4>- </h4>
                      </div>
                      <div className="detail-items w-100">
                        <h4> Total Points Scored</h4>
                        <h4>4 </h4>
                      </div>
                      <div className="detail-items w-100">
                        <h4>Socials</h4>
                        <h4> 4</h4>
                      </div>
                      <div className="detail-items w-100">
                        <h4>Assist</h4>
                        <h4> 4 </h4>
                      </div>
                      <div className="detail-items w-100">
                        <h4>Penalty/Fouls</h4>
                        <h4> - </h4>
                      </div>
                    </div>
                    {/*

                  <Tabs
                    value={focusedIdx}
                    onChange={setFocusedIdx}
                    tabs={tabs}
                  />

                  */}
                  </div>
                </Col>
              </Row>
            </>
            <div className="d-flex justify-content-center">
              <h3 style={{ color: "#fff", margin: "20px 20px" }} className="">
                Recruiting Preferences
              </h3>
            </div>
            <>
              <Row className="mb-5">
                <Col md={12}>
                  <div className="glass-bg player-profile">
                    <div className="w-100 ">
                      <div className="d-flex"></div>
                      <div
                        style={{ border: "none", cursor: "pointer" }}
                        className="detail-items w-100"
                      >
                        <h4>All details</h4>
                        <div
                          onClick={() => setModalPlayerUpdateProfile(true)}
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
                        <h4>College Interested in</h4>
                        <h4>4</h4>
                      </div>

                      <div className="detail-items w-100">
                        <h4>Scholarship</h4>
                        <h4>90 minute </h4>
                      </div>

                      <div className="detail-items w-100">
                        <h4>Coach & Trainer Reference</h4>
                        <h4>3</h4>
                      </div>

                      <div className="detail-items w-100 ">
                        <h4>Scouting Reports & Endurance</h4>
                        <h4> eye icon </h4>
                      </div>
                    </div>

                    {/*

                  <Tabs
                    value={focusedIdx}
                    onChange={setFocusedIdx}
                    tabs={tabs}
                  />

                  */}
                  </div>
                </Col>
              </Row>
            </>
          </Container>
        </div>
      </div>

      <Modal size="xl" centered isOpen={modal} toggle={toggle}>
        <div className="gray-modal team-details">
          <div className="d-flex justify-content-between mb-3">
            <h3>View all sports details </h3>

            <svg
              style={{
                cursor: "pointer",
              }}
              onClick={toggle}
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
              <div className="team-card">
                <div
                  style={{ cursor: "pointer" }}
                  className="team-card-item d-flex justify-content-end"
                  onClick={() => setEditTeamModal(true)}
                >
                  <p className="me-2" style={{ fontSize: "16px" }}>
                    {" "}
                    Edit
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                  >
                    <path
                      d="M4.9375 5.4375H3.875C3.31141 5.4375 2.77091 5.66138 2.3724 6.0599C1.97388 6.45841 1.75 6.99891 1.75 7.5625V17.125C1.75 17.6886 1.97388 18.2291 2.3724 18.6276C2.77091 19.0261 3.31141 19.25 3.875 19.25H13.4375C14.0011 19.25 14.5416 19.0261 14.9401 18.6276C15.3386 18.2291 15.5625 17.6886 15.5625 17.125V16.0625"
                      stroke="white"
                      stroke-width="2.125"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14.5 3.31261L17.6875 6.50011M19.1591 4.99668C19.5775 4.57821 19.8126 4.01066 19.8126 3.41886C19.8126 2.82707 19.5775 2.25951 19.1591 1.84105C18.7406 1.42259 18.173 1.1875 17.5812 1.1875C16.9895 1.1875 16.4219 1.42259 16.0034 1.84105L7.0625 10.7501V13.9376H10.25L19.1591 4.99668Z"
                      stroke="white"
                      stroke-width="2.125"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="team-card-item d-flex justify-content-between">
                  <p> Name</p>
                  <p>Real Madrid</p>
                </div>

                <div className="team-card-item d-flex justify-content-between">
                  <p>Team Name</p>
                  <p>Real Madrid</p>
                </div>

                <div className="team-card-item d-flex justify-content-between">
                  <p>Jersey Number </p>
                  <p>2176516752 </p>
                </div>
                <div className="team-card-item d-flex justify-content-between">
                  <p>Position </p>
                  <p> Center Forword </p>
                </div>
                <div
                  style={{
                    border: "none",
                    paddingBottom: "0",
                    marginBottom: "0",
                  }}
                  className="team-card-item d-flex justify-content-between"
                >
                  <p>Achievement </p>
                  <p>Player of the match </p>
                </div>
              </div>

              <div className="team-card">
                <div
                  style={{ cursor: "pointer" }}
                  className="team-card-item d-flex justify-content-end"
                  onClick={() => setEditTeamModal(true)}
                >
                  <p className="me-2" style={{ fontSize: "16px" }}>
                    {" "}
                    Edit
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                  >
                    <path
                      d="M4.9375 5.4375H3.875C3.31141 5.4375 2.77091 5.66138 2.3724 6.0599C1.97388 6.45841 1.75 6.99891 1.75 7.5625V17.125C1.75 17.6886 1.97388 18.2291 2.3724 18.6276C2.77091 19.0261 3.31141 19.25 3.875 19.25H13.4375C14.0011 19.25 14.5416 19.0261 14.9401 18.6276C15.3386 18.2291 15.5625 17.6886 15.5625 17.125V16.0625"
                      stroke="white"
                      stroke-width="2.125"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14.5 3.31261L17.6875 6.50011M19.1591 4.99668C19.5775 4.57821 19.8126 4.01066 19.8126 3.41886C19.8126 2.82707 19.5775 2.25951 19.1591 1.84105C18.7406 1.42259 18.173 1.1875 17.5812 1.1875C16.9895 1.1875 16.4219 1.42259 16.0034 1.84105L7.0625 10.7501V13.9376H10.25L19.1591 4.99668Z"
                      stroke="white"
                      stroke-width="2.125"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="team-card-item d-flex justify-content-between">
                  <p> Name</p>
                  <p>Real Madrid</p>
                </div>

                <div className="team-card-item d-flex justify-content-between">
                  <p>Team Name</p>
                  <p>Real Madrid</p>
                </div>

                <div className="team-card-item d-flex justify-content-between">
                  <p>Jersey Number </p>
                  <p>2176516752 </p>
                </div>
                <div className="team-card-item d-flex justify-content-between">
                  <p>Position </p>
                  <p> Center Forword </p>
                </div>
                <div
                  style={{
                    border: "none",
                    paddingBottom: "0",
                    marginBottom: "0",
                  }}
                  className="team-card-item d-flex justify-content-between"
                >
                  <p>Achievement </p>
                  <p>Player of the match </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>

      <Modal
        size="xl"
        centered
        isOpen={modalUpdateProfile}
        toggle={toggleUpdate}
      >
        <div className=" ">
          <div className="d-flex justify-content-end mb-3">
            <svg
              style={{
                cursor: "pointer",
              }}
              onClick={() => setModalUpdateProfile(false)}
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
            <Col md={4} />
            <Col md={4}>
              <QrCode title={"Buy QR"} state={setModalUpdateProfile} />
            </Col>
            <Col md={4} />
          </Row>
        </div>
      </Modal>

      <Modal size="xl" centered isOpen={editTeamModal} toggle={toggleTeam}>
        <div className="glass-card">
          <div className="d-flex justify-content-end mb-3">
            <svg
              style={{
                cursor: "pointer",
              }}
              onClick={() => setEditTeamModal(false)}
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

          <Row className="grad-border p-5 mx-5">
            <Col md={6}>
              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label> Name</label>
                  <div className="w-100">
                    <input
                      className="w-100 input-transparent-blur"
                      type="text"
                      alt="text"
                    />
                  </div>
                </div>
              </div>

              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label> Jersey Number</label>
                  <div className="w-100">
                    <input
                      className="w-100 input-transparent-blur"
                      type="text"
                      alt="text"
                    />
                  </div>
                </div>
              </div>

              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label> Positions</label>
                  <div
                    style={{
                      position: "relative",
                    }}
                    className="w-100 relative"
                  >
                    <input
                      className="w-100 input-transparent-blur "
                      type="text"
                      placeholder="Add more Positions"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <svg
                      onClick={(e) => handleOnclick(e)}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        cursor: "pointer",
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 28 28"
                      fill="none"
                    >
                      <circle cx="14" cy="14" r="14" fill="white" />
                      <path
                        d="M20 14.998H15V19.998C15 20.2633 14.8946 20.5176 14.7071 20.7052C14.5196 20.8927 14.2652 20.998 14 20.998C13.7348 20.998 13.4804 20.8927 13.2929 20.7052C13.1054 20.5176 13 20.2633 13 19.998V14.998H8C7.73478 14.998 7.48043 14.8927 7.29289 14.7052C7.10536 14.5176 7 14.2633 7 13.998C7 13.7328 7.10536 13.4785 7.29289 13.2909C7.48043 13.1034 7.73478 12.998 8 12.998H13V7.99805C13 7.73283 13.1054 7.47848 13.2929 7.29094C13.4804 7.1034 13.7348 6.99805 14 6.99805C14.2652 6.99805 14.5196 7.1034 14.7071 7.29094C14.8946 7.47848 15 7.73283 15 7.99805V12.998H20C20.2652 12.998 20.5196 13.1034 20.7071 13.2909C20.8946 13.4785 21 13.7328 21 13.998C21 14.2633 20.8946 14.5176 20.7071 14.7052C20.5196 14.8927 20.2652 14.998 20 14.998Z"
                        fill="url(#paint0_linear_2713_22495)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_2713_22495"
                          x1="7.00079"
                          y1="13.9986"
                          x2="21.0003"
                          y2="13.9986"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#DDA027" />
                          <stop offset="0.3198" stop-color="#CE9B2B" />
                          <stop offset="0.6802" stop-color="#FEF48E" />
                          <stop offset="1" stop-color="#FFD046" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <div
                    style={{ display: "flex" }}
                    className="mt-2 flex flex-wrap gap-2"
                  >
                    {tags.map((tag, index) => (
                      <div className=" grad-border postions py-0">
                        <div
                          key={index}
                          className="  flex items-center bg-gray-200 px-3 pb-1 rounded-full"
                        >
                          <span className="me-3">{tag}</span>

                          <svg
                            style={{ cursor: "pointer" }}
                            onClick={() => handleRemoveTag(index)}
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M1.10645 12.8908L12.8931 1.10742M1.10645 1.10742L12.8931 12.8908"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Col>

            <Col md={6}>
              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label>Team Name</label>
                  <div className="w-100">
                    <input
                      className="w-100 input-transparent-blur"
                      type="text"
                      alt="text"
                    />
                  </div>
                </div>
              </div>

              <Row>
                <div className="basic-inputs input-card">
                  <label>Basic Performance Stats</label>
                </div>
                <Col md={4}>
                  <div className="basic-inputs input-card">
                    <div className="input-transparent-blur-fields">
                      <div className="w-100">
                        <input
                          className="w-100 input-transparent-blur"
                          type="text"
                          alt="text"
                          placeholder="Games played"
                        />
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="basic-inputs input-card">
                    <div className="input-transparent-blur-fields">
                      <div className="w-100">
                        <input
                          className="w-100 input-transparent-blur"
                          type="text"
                          alt="text"
                          placeholder="Goals"
                        />
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="basic-inputs input-card">
                    <div className="input-transparent-blur-fields">
                      <div className="w-100">
                        <input
                          className="w-100 input-transparent-blur"
                          type="text"
                          alt="text"
                          placeholder="Points"
                        />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              <div className="basic-inputs input-card w-100">
                <div className="input-transparent-blur-fields w-100">
                  <label>Coach Contact ( Optional )</label>
                  {/* <PhoneInput placeholder="Enter your number" defaultCountry="PK" {...field} onChange={(data) => field.onChange(data)} /> */}
                  <div className="w-100">
                    <input
                      className="input-transparent-blur"
                      ref={phoneInputRef}
                      id="phone"
                      type="tel"
                      name="phone"
                      // value={field.value} // Use Formik's value
                      onChange={(e) => {
                        const input = e.target.value;
                        // Allow only digits and '+' at the start
                        const sanitizedInput = input.replace(/[^+\d]/g, "");

                        // Manually update e.target.value to the sanitized input
                        e.target.value = sanitizedInput;

                        // field.onChange(e); // Update Formik's state with sanitized value
                      }}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={4} />

            <Col md={4}>
              <div
                onClick={() => navigate("/basic")}
                className="primary-btn px-2 py-3 my-3"
              >
                <h3> Update </h3>
              </div>
            </Col>

            <Col md={4} />
          </Row>
        </div>
      </Modal>

      <Modal
        size="xl"
        centered
        isOpen={modalPlayerUpdateProfile}
        toggle={togglePlayerInfo}
      >
        <div className="glass-card">
          <div className="d-flex justify-content-end mb-3">
            <svg
              style={{
                cursor: "pointer",
              }}
              onClick={() => setModalPlayerUpdateProfile(false)}
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
            <Col md={1} />
            <Col md={11}>
              <div className="profile d-flex  ">
                <div className="profile-image d-flex align-items-center text-center mb-2">
                  <img className=" mb-2 me-2" src={profile} alt="" />

                  <div className="primary-btn-img py-2 px-3">
                    <h3 className="me-2">Upload image</h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 23 23"
                      fill="none"
                    >
                      <path
                        d="M9.90071 16.5499V5.37742L6.33647 8.94166L4.41727 6.95391L11.2716 0.0996094L18.1259 6.95391L16.2067 8.94166L12.6424 5.37742V16.5499H9.90071ZM3.04641 22.0334C2.29244 22.0334 1.64722 21.7652 1.11075 21.2287C0.57429 20.6922 0.305601 20.0466 0.304688 19.2917V15.1791H3.04641V19.2917H19.4967V15.1791H22.2385V19.2917C22.2385 20.0456 21.9702 20.6913 21.4338 21.2287C20.8973 21.7661 20.2516 22.0343 19.4967 22.0334H3.04641Z"
                        fill="#241C19"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={1} />

            <Col md={5}>
              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label> Name</label>
                  <div className="w-100">
                    <input
                      className="w-100 input-transparent-blur"
                      type="text"
                      alt="text"
                    />
                  </div>
                </div>
              </div>

              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label> Date of Birth</label>
                  <div className="w-100">
                    <DatePicker
                      style={{ width: "100%" }}
                      className="w-100 input-transparent-blur"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </div>
                </div>
              </div>

              <div className="basic-inputs input-card w-100">
                <div className="input-transparent-blur-fields w-100">
                  <label>Phone Number</label>
                  {/* <PhoneInput placeholder="Enter your number" defaultCountry="PK" {...field} onChange={(data) => field.onChange(data)} /> */}
                  <div className="w-100">
                    <input
                      className="input-transparent-blur"
                      ref={phoneInputRef}
                      id="phone"
                      type="tel"
                      name="phone"
                      // value={field.value} // Use Formik's value
                      onChange={(e) => {
                        const input = e.target.value;
                        // Allow only digits and '+' at the start
                        const sanitizedInput = input.replace(/[^+\d]/g, "");

                        // Manually update e.target.value to the sanitized input
                        e.target.value = sanitizedInput;

                        // field.onChange(e); // Update Formik's state with sanitized value
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="basic-inputs input-card mt-5">
                <label>Twitter </label>

                <div className="input-transparent-blur p-0">
                  <div className="w-100">
                    <div className="d-flex">
                      <img className="me-3 ms-3" src={twitter} alt="" />
                      <input
                        style={{
                          backgroundColor: "transparent",
                          borderColor: "transparent",
                          outline: "none",
                        }}
                        className="w-100 "
                        type="text"
                        placeholder="Paste your profile URL here"
                        alt="text"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="basic-inputs input-card">
                <label>Instagram </label>

                <div className="input-transparent-blur p-0">
                  <div className="w-100">
                    <div className="d-flex">
                      <img className="me-3 ms-3" src={insta} alt="" />
                      <input
                        style={{
                          backgroundColor: "transparent",
                          borderColor: "transparent",
                          outline: "none",
                        }}
                        className="w-100 "
                        type="text"
                        placeholder="Paste your profile URL here"
                        alt="text"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="basic-inputs input-card">
                <label>IMLCA </label>

                <div className="input-transparent-blur p-0">
                  <div className="w-100">
                    <div className="d-flex">
                      <img className="me-3 ms-3 p-1" src={fg} alt="" />
                      <input
                        style={{
                          backgroundColor: "transparent",
                          borderColor: "transparent",
                          outline: "none",
                        }}
                        className="w-100 "
                        type="text"
                        placeholder="Paste your profile URL here"
                        alt="text"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col md={5}>
              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label>Nickname </label>
                  <div className="w-100">
                    <input
                      className="w-100 input-transparent-blur"
                      type="text"
                      alt="text"
                    />
                  </div>
                </div>
              </div>
              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label>Email Address</label>
                  <div className="w-100">
                    <input
                      className="w-100 input-transparent-blur"
                      type="text"
                      alt="text"
                    />
                  </div>
                </div>
              </div>
              <div className="basic-inputs input-card  ">
                <label> Gender </label>
                <form>
                  {/* Option 1 */}
                  <div className="d-flex">
                    <div
                      onClick={() => setSelectedOption("basic")}
                      style={{
                        borderRadius: "5px",
                        cursor: "pointer",
                        width: "fit-content !important",
                      }}
                      className="input-transparent-blur auto-widt me-3 "
                    >
                      <div className="child-right-select ">
                        <label style={{ marginBottom: "0" }}>
                          <input
                            className="me-3"
                            type="radio"
                            name="profileCategory"
                            value="basic"
                            checked={selectedOption === "basic"}
                            onChange={() => setSelectedOption("basic")}
                          />
                          <span> male </span>
                        </label>
                      </div>
                    </div>

                    {/* Option 2 */}

                    <div
                      onClick={() => setSelectedOption("advanced")}
                      style={{
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      className="input-transparent-blur auto-widt"
                    >
                      <div className="child-right-select ">
                        <label>
                          <input
                            type="radio"
                            name="profileCategory"
                            value="advanced"
                            checked={selectedOption === "advanced"}
                            onChange={() => setSelectedOption("advanced")}
                          />

                          <span>female</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="basic-inputs input-card mt-5">
                <label>Youtube </label>

                <div className="input-transparent-blur p-0">
                  <div className="w-100">
                    <div className="d-flex">
                      <img className="me-3 ms-3" src={youtube} alt="" />
                      <input
                        style={{
                          backgroundColor: "transparent",
                          borderColor: "transparent",
                          outline: "none",
                        }}
                        className="w-100"
                        type="text"
                        placeholder="Paste your profile URL here"
                        alt="text"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="basic-inputs input-card">
                <label>Tiktok </label>
                <div className="input-transparent-blur p-0">
                  <div className="w-100">
                    <div className="d-flex">
                      <img className="me-3 ms-3 p-1" src={tiktok} alt="" />
                      <input
                        style={{
                          backgroundColor: "transparent",
                          borderColor: "transparent",
                          outline: "none",
                        }}
                        className="w-100"
                        type="text"
                        placeholder="Paste your profile URL here"
                        alt="text"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col md={1} />
          </Row>

          <Row>
            <Col md={4} />

            <Col md={4}>
              <div
                onClick={() => navigate("/create-team")}
                className="primary-btn px-2 py-3 my-3"
              >
                <h3> Update </h3>
              </div>
            </Col>

            <Col md={4} />
          </Row>
        </div>
      </Modal>
    </>
  );
}
