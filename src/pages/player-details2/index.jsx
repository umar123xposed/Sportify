import React, { useEffect, useState } from "react";
import "./index.css"
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Modal, Row } from "reactstrap";
import PlayerCard from "../../components/elements/playerCard";
import TeamCard from "../../components/elements/teamCard";
import { IoIosArrowForward } from "react-icons/io";
//import jr from "./../../assets/jr.png";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { PLAYER_PROFILE_DETAIL } from "../../graphql/query/query";
import { useLazyQuery, useQuery } from "@apollo/client";
import twitter from "./../../assets/twitter.png";
import insta from "./../../assets/instagram.png";
import fg from "./../../assets/fg.png";
import youtube from "./../../assets/youtube.png";
import tiktok from "./../../assets/tiktok.png";
import profile from "./../../assets/profile.png";
import AdvanceImage from "../../components/modules/editAdvanceImage";




// const StyledTabIndicator = styled.div`
//   position: absolute;
//   width: ${(props) => 100 / props.tabCount}%;
//   top: 100%;
//   left: 0;
//   transition: transform ${(props) => props.duration}ms;
//   transform: translate(${(props) => props.offset}, -100%);

//   &::after {
//     content: "";
//     position: absolute;
//     width: 100%;
//     height: 4px; /* Border thickness */
//     bottom: 0;
//     left: 0;
//     background: linear-gradient(
//       90deg,
//       #dda027 0.01%,
//       #ce9b2b 31.98%,
//       #fef48e 68.02%,
//       #ffd046 100%
//     ); /* Adjust colors as needed */
//   }
// `;

// const StyledTab = styled.li`
//   flex: 1;
//   button {
//     cursor: pointer;
//     transition: color 0.3s;
//     color: ${(props) => (props.isFocused ? "#fff" : "#919191")};
//     border: none;
//     width: 100%;
//     font-size:16px;
//     padding:20px auto;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0);
//   }
// `;

// const StyledTabs = styled.div`
//   position: relative;
//   list-style: none;
//   height: 70px;
//   display: flex;
//   align-items: center;
// `;

// const Tabs = ({ value, onChange, duration = 300, tabs }) => {
//   return (
//     <>
//       <StyledTabs>
//         {tabs.map((tab) => (
//           <StyledTab
//             key={tab.id}
//             isFocused={value === tab.id}
//             onClick={() => onChange(tab.id)}
//           >
//             <button>{tab.label}</button>
//           </StyledTab>
//         ))}
//         <StyledTabIndicator
//           duration={duration}
//           tabCount={tabs.length}
//           offset={`${100 * value}%`}
//         />
//       </StyledTabs>

//       <div className="tab-content">
//         {tabs.map((tab, index) =>
//           value === index ? <div key={tab.id}>{tab.content}</div> : null
//         )}
//       </div>
//     </>
//   );
// };


const PlayerDetailssss = () => {
 const navigate = useNavigate()
 const [ editType , setEditType ] = useState(false)
 const [edit , setEdit] = useState(false)
 const [modal, setModal] = useState(false);
 const [detailType , setDetailType ] = useState(null)
 const [ modalPlayerUpdateProfile ,setModalPlayerUpdateProfile ] = useState(false)
 const [currentImage, setCurrentImage] = useState(null);
const [imgModal, setImageModal] = useState(null);


  const location = useLocation();
 const queryParams = new URLSearchParams(location.search);
 const userId = queryParams.get("user_id");
 const profileType = queryParams.get("profile_type");
  const {
    loading: loading1,
    error: error1,
    data: data3,
    refetch: refetch1,
  } = useQuery(PLAYER_PROFILE_DETAIL, {
    variables: {
      input: {
        user_id:  parseInt(userId) ,
        profile_type: profileType,
      },
    },
  });

  useEffect(() => {
   if(data3){
   setEdit(true);
   setEditType(profileType);

   }

}, [data3]);


  const [open, setOpen] = useState("0");

  const toggleAccordion = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };



  // console.log(data3,'asfasasf');
//   const [focusedIdx, setFocusedIdx] = React.useState(0);
//  const tabs = [
//    {
//      id: 0,
//      label: "Profile",
//      content: (
//        <div>
//          <p>Tab 1</p>
//        </div>
//      ),
//    },
//    {
//      id: 1,
//      label: "Achievement",
//      content: (
//        <div>
//          <p>Tab 2</p>
//        </div>
//      ),
//    },
//  ];


  return (
    <>
      <div className="page-wrapper pb-4">
        <div className="slider">
          <div className="px-md-5 px-3">
            <Row className="pt-5">
              <Col md={12}>
                <div
                  onClick={() => navigate(-1)}
                  className="d-flex back-btn mb-4"
                >
                  <svg
                    className="me-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="14"
                    viewBox="0 0 10 18"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.457255 9.94802L7.99992 17.4907L9.88525 15.6054L3.28525 9.00535L9.88525 2.40535L7.99992 0.52002L0.457255 8.06269C0.207294 8.31272 0.0668726 8.6518 0.0668726 9.00535C0.0668726 9.3589 0.207294 9.69798 0.457255 9.94802Z"
                      fill="white"
                    />
                  </svg>
                  <h4>Back</h4>
                </div>
              </Col>
            </Row>{" "}
            <Row>
              <div className="mt-3 profile-details text-center">
                <h3>{data3?.playerProfileDetail?.nick_name} </h3>

                <img
                  style={{
                    marginTop: "20px",
                    marginBottom: "20px",
                    height: "150px",
                    width: "150px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                  src={`${import.meta.env.VITE_BASE_URL_IMAGE}${
                    data3?.playerProfileDetail?.user?.picture
                  }`}
                  alt="jr"
                />
              </div>
            </Row>
            {edit && editType == "Basic" ? (
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
                        </div>

                        <div className="detail-items w-100">
                          <h4>Full Name</h4>
                          <h4>{data3?.playerProfileDetail?.user?.full_name}</h4>
                        </div>

                        <div className="detail-items w-100">
                          <h4>Nickname</h4>
                          <h4>
                            {data3?.playerProfileDetail?.nick_name || "-----"}{" "}
                          </h4>
                        </div>

                        {/* <div className="detail-items w-100">
                          <h4>Email Address</h4>
                          <h4>
                            {data3?.playerProfileDetail?.user?.email || "-----"}{" "}
                          </h4>
                        </div> */}

                        {/* <div className="detail-items w-100">
                          <h4>Phone Number</h4>
                          <h4>
                            {" "}
                            {data3?.playerProfileDetail?.user?.phone ||
                              "-----"}{" "}
                          </h4>
                        </div> */}

                        <div className="detail-items w-100">
                          <h4> Gender </h4>
                          <h4>
                            {" "}
                            {data3?.playerProfileDetail?.gender || "-----"}{" "}
                          </h4>
                        </div>

                        <div
                          onClick={() => {
                            setDetailType("sport_type");
                            setModal(true);
                          }}
                          className="detail-items w-100"
                        >
                          <h4> View all Sports </h4>
                          <h4>
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
                          <h4>Date of Birth </h4>
                          <h4> {data3?.playerProfileDetail?.dob} </h4>
                        </div>
                        <div className="detail-items w-100">
                          <h4 className="mt-2"> Socials </h4>
                          <div className="d-flex flex-wrap align-items-center">
                            {data3?.playerProfileDetail?.social?.map(
                              (items, index) => {
                                const parsedItem = JSON.parse(items);
                                if (parsedItem?.type == "Tiktok") {
                                  return (
                                    <>
                                      <a
                                        href={parsedItem?.link}
                                        target="_blank"
                                      >
                                        <img
                                          style={{
                                            height: "30px",
                                            objectFit: "contain",
                                          }}
                                          key={index} // Add a unique key
                                          className="mx-2 p-1"
                                          src={tiktok}
                                          alt="Tiktok Icon"
                                        />
                                      </a>
                                    </>
                                  );
                                } else if (parsedItem?.type == "Instagram") {
                                  return (
                                    <>
                                      <a
                                        href={parsedItem?.link}
                                        target="_blank"
                                      >
                                        <img
                                          style={{
                                            height: "30px",
                                            objectFit: "contain",
                                          }}
                                          key={index} // Add a unique key
                                          className="mx-2 p-1"
                                          src={insta}
                                          alt="Insta Icon"
                                        />
                                      </a>
                                    </>
                                  );
                                } else if (parsedItem?.type == "Youtube") {
                                  return (
                                    <>
                                      <a
                                        href={parsedItem?.link}
                                        target="_blank"
                                      >
                                        <img
                                          style={{
                                            height: "30px",
                                            objectFit: "contain",
                                          }}
                                          key={index} // Add a unique key
                                          className="mx-2 p-1"
                                          src={youtube}
                                          alt="Youtube Icon"
                                        />
                                      </a>
                                    </>
                                  );
                                } else if (parsedItem?.type == "Twitter") {
                                  return (
                                    <>
                                      <a
                                        href={parsedItem?.link}
                                        target="_blank"
                                      >
                                        <img
                                          style={{
                                            height: "30px",
                                            objectFit: "contain",
                                          }}
                                          key={index} // Add a unique key
                                          className="mx-2 p-1"
                                          src={twitter}
                                          alt="Twitter Icon"
                                        />
                                      </a>
                                    </>
                                  );
                                } else if (parsedItem?.type == "IMLCA") {
                                  return (
                                    <>
                                      <a
                                        href={parsedItem?.link}
                                        target="_blank"
                                      >
                                        <img
                                          style={{
                                            height: "30px",
                                            objectFit: "contain",
                                          }}
                                          key={index} // Add a unique key
                                          className="mx-2 p-1"
                                          src={fg}
                                          alt="fg Icon"
                                        />
                                      </a>
                                    </>
                                  );
                                } else {
                                }
                              }
                            )}
                          </div>
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
            ) : edit && editType == "Advanced" ? (
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
                          <h4>All details </h4>
                        </div>

                        <div className="detail-items w-100">
                          <h4>Full Name</h4>
                          <h4>{data3?.playerProfileDetail?.user?.full_name}</h4>
                        </div>

                        <div className="detail-items w-100">
                          <h4>Nickname</h4>
                          <h4>{data3?.playerProfileDetail?.nick_name} </h4>
                        </div>

                        {/* <div className="detail-items w-100">
                          <h4>Email Address</h4>
                          <h4>{data3?.playerProfileDetail?.user?.email} </h4>
                        </div> */}

                        {/* <div className="detail-items w-100">
                          <h4>Phone Number</h4>
                          <h4>{data3?.playerProfileDetail?.user?.phone}</h4>
                        </div> */}

                        <div className="detail-items w-100">
                          <h4>Gender</h4>
                          <h4> {data3?.playerProfileDetail?.gender} </h4>
                        </div>

                        <div className="detail-items w-100">
                          <h4> Height </h4>
                          <h4>
                            {
                              data3?.playerProfileDetail?.profile_detail?.height
                                ?.feet
                            }
                            '
                            {
                              data3?.playerProfileDetail?.profile_detail?.height
                                ?.inches
                            }
                          </h4>
                        </div>
                        <div className="detail-items w-100">
                          <h4>Weight</h4>
                          <h4>
                            {data3?.playerProfileDetail?.profile_detail?.weight}
                          </h4>
                        </div>

                        <div className="detail-items w-100">
                          <h4>Date of Birth </h4>
                          <h4>{data3?.playerProfileDetail?.dob}</h4>
                        </div>
                        <div className="detail-items w-100">
                          <h4> Socials </h4>
                          <div className="d-flex">
                            {data3?.playerProfileDetail?.social?.map(
                              (items, index) => {
                                const parsedItem = JSON.parse(items);

                                if (parsedItem?.type == "Tiktok") {
                                  return (
                                    <>
                                      <a
                                        href={parsedItem?.link}
                                        target="_blank"
                                      >
                                        <img
                                          style={{
                                            height: "30px",
                                            objectFit: "contain",
                                          }}
                                          key={index} // Add a unique key
                                          className="me-3 ms-3 p-1"
                                          src={tiktok}
                                          alt="Tiktok Icon"
                                        />
                                      </a>
                                    </>
                                  );
                                } else if (parsedItem?.type == "Instagram") {
                                  return (
                                    <>
                                      <a
                                        href={parsedItem?.link}
                                        target="_blank"
                                      >
                                        <img
                                          style={{
                                            height: "30px",
                                            objectFit: "contain",
                                          }}
                                          key={index} // Add a unique key
                                          className="me-3 ms-3 p-1"
                                          src={insta}
                                          alt="Insta Icon"
                                        />
                                      </a>
                                    </>
                                  );
                                } else if (parsedItem?.type == "Youtube") {
                                  return (
                                    <>
                                      <a
                                        href={parsedItem?.link}
                                        target="_blank"
                                      >
                                        <img
                                          style={{
                                            height: "30px",
                                            objectFit: "contain",
                                          }}
                                          key={index} // Add a unique key
                                          className="me-3 ms-3 p-1"
                                          src={youtube}
                                          alt="Youtube Icon"
                                        />
                                      </a>
                                    </>
                                  );
                                } else if (parsedItem?.type == "Twitter") {
                                  return (
                                    <>
                                      <a
                                        href={parsedItem?.link}
                                        target="_blank"
                                      >
                                        <img
                                          style={{
                                            height: "30px",
                                            objectFit: "contain",
                                          }}
                                          key={index} // Add a unique key
                                          className="me-3 ms-3 p-1"
                                          src={twitter}
                                          alt="Twitter Icon"
                                        />
                                      </a>
                                    </>
                                  );
                                } else if (parsedItem?.type == "IMLCA") {
                                  return (
                                    <>
                                      <a
                                        href={parsedItem?.link}
                                        target="_blank"
                                      >
                                        <img
                                          style={{
                                            height: "30px",
                                            objectFit: "contain",
                                          }}
                                          key={index} // Add a unique key
                                          className="me-3 ms-3 p-1"
                                          src={fg}
                                          alt="fg Icon"
                                        />
                                      </a>
                                    </>
                                  );
                                } else {
                                }
                              }
                            )}
                          </div>
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

                <Row>
                  <Col md={12}>
                    <h3
                      className={"d-flex justify-content-center my-4"}
                      style={{ color: "#fff" }}
                    >
                      Athletic Information
                    </h3>
                    <div className="glass-bg player-profile">
                      <div className="w-100 ">
                        <div className="d-flex"></div>
                        <div
                          style={{ border: "none", cursor: "pointer" }}
                          className="detail-items w-100"
                        >
                          <h4>All details</h4>
                        </div>

                        <div
                          onClick={() => {
                            setDetailType("sport_type");
                            setModal(true);
                          }}
                          className="detail-items w-100"
                        >
                          <h4>View all sports type</h4>
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
                          <h4>Career Stats & Highlights </h4>
                          <h4>
                            {" "}
                            <svg
                              onClick={() => {
                                setDetailType("Career_and_stats");
                                setModal(true);
                              }}
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
                              data3?.playerProfileDetail?.profile_detail
                                ?.performance_metrics?.agility
                            }
                          </h4>
                        </div>

                        <div className="detail-items w-100">
                          <h4>Dominant Hand</h4>
                          <h4>
                            {
                              data3?.playerProfileDetail?.profile_detail
                                ?.dominant_hand
                            }
                          </h4>
                        </div>

                        <div className="detail-items w-100">
                          <h4>Injury</h4>
                          <h4>
                            {
                              data3?.playerProfileDetail?.profile_detail
                                ?.performance_metrics?.injury
                            }
                          </h4>
                        </div>

                        <div className="detail-items w-100">
                          <h4>Speed</h4>
                          <h4>
                            {
                              data3?.playerProfileDetail?.profile_detail
                                ?.performance_metrics?.speed
                            }
                          </h4>
                        </div>

                        <div className="detail-items w-100">
                          <h4>Strength</h4>
                          <h4>
                            {
                              data3?.playerProfileDetail?.profile_detail
                                ?.performance_metrics?.strength
                            }
                          </h4>
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

                {/* <Row>
                  <Col md={12}>
                    <h3
                      className={"d-flex justify-content-center my-4"}
                      style={{ color: "#fff" }}
                    >
                      Workout & training logs
                    </h3>
                    <div className="glass-bg player-profile">
                      <div className="w-100 ">
                        <div className="d-flex"></div>
                        <div
                          style={{ border: "none", cursor: "pointer" }}
                          className="detail-items w-100"
                        >
                          <h4>All details</h4>
                        </div>
                        <div className="detail-items w-100">
                          <h4>Workout Strength</h4>
                          <h4>
                            {
                              data3?.playerProfileDetail?.profile_detail
                                ?.workout_traning?.strength
                            }
                          </h4>
                        </div>
                        <div className="detail-items w-100">
                          <h4>Endurance</h4>
                          <h4>
                            {
                              data3?.playerProfileDetail?.profile_detail
                                ?.workout_traning?.edurance
                            }
                          </h4>
                        </div>
                        <div className="detail-items w-100">
                          <h4>Recovery Speed</h4>
                          <h4>
                            {
                              data3?.playerProfileDetail?.profile_detail
                                ?.workout_traning?.recovery_speed
                            }
                          </h4>
                        </div>
                      </div>
                     </div>
                  </Col>
                </Row> */}

                <Row>
                  <Col md={12}>
                    <h3
                      className={"d-flex justify-content-center my-4"}
                      style={{ color: "#fff" }}
                    >
                      Academic Information
                    </h3>
                    <div className="glass-bg player-profile">
                      <div className="w-100 ">
                        <div className="d-flex"></div>
                        <div
                          style={{ border: "none", cursor: "pointer" }}
                          className="detail-items w-100"
                        >
                          <h4>All details</h4>
                        </div>
                        <div className="detail-items w-100">
                          <h4>School name</h4>
                          <h4>
                            {
                              data3?.playerProfileDetail?.profile_detail
                                ?.academic_info?.highschool
                            }
                          </h4>
                        </div>
                        <div className="detail-items w-100">
                          <h4>School Address</h4>
                          <h4>
                            {
                              data3?.playerProfileDetail?.profile_detail
                                ?.academic_info?.address
                            }
                          </h4>
                        </div>
                        <div className="detail-items w-100">
                          <h4>GPA</h4>
                          <h4>
                            {
                              data3?.playerProfileDetail?.profile_detail
                                ?.academic_info?.gpa
                            }
                          </h4>
                        </div>
                        <div className="detail-items w-100">
                          <h4>Year</h4>
                          <h4>
                            {
                              data3?.playerProfileDetail?.profile_detail
                                ?.academic_info?.year
                            }
                          </h4>
                        </div>
                        <div className="detail-items w-100">
                          <h4>Scores</h4>
                          <h4>
                            {
                              data3?.playerProfileDetail?.profile_detail
                                ?.academic_info?.scores
                            }
                          </h4>
                        </div>

                        {/* <div className="detail-items w-100">
                          <h4>Award</h4>
                          <svg
                            onClick={() => {
                              setImageModal(true);
                              setCurrentImage(
                                data3?.playerProfileDetail?.profile_detail
                                  ?.academic_info?.award
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
                        </div> */}


                        {/* <div className="detail-items w-100">ou
                                    <h4>Reports</h4>
                                    <svg
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
                                  </div> */}
                        {/*
                        <div className="detail-items w-100">
                          <h4>Transcript</h4>
                          <svg
                            onClick={() => {
                              setImageModal(true);
                              setCurrentImage(
                                data3?.playerProfileDetail?.profile_detail
                                  ?.academic_info?.transcript
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
                        </div> */}
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
                <Row>
                  <Col md={12}>
                    <h3
                      className={"d-flex justify-content-center my-4"}
                      style={{ color: "#fff" }}
                    >
                      Recruiting Preferences
                    </h3>
                    <div className="glass-bg player-profile">
                      <div className="w-100 ">
                        <div className="d-flex"></div>
                        <div
                          style={{ border: "none", cursor: "pointer" }}
                          className="detail-items w-100"
                        >
                          <h4>All details</h4>
                        </div>
<div className="detail-items w-100">
  <h4>Preferred Colleges for Athletics</h4>
  <h4>
    {
      data3?.playerProfileDetail?.profile_detail?.recruiting_preferences?.interested_in
        ?.map((e, index) => <span key={index}>{e}, </span>)
    }
  </h4>
</div>


                        <div className="detail-items w-100">
                          <h4>Scholarship Offers</h4>
                          <h4>
                            {
                              data3?.playerProfileDetail?.profile_detail
                                ?.recruiting_preferences?.scholarship_offers
                            }
                          </h4>
                        </div>

                        <div className="detail-items w-100">
                          <h4>Coach & Trainer Reference </h4>
                          <h4>
                            {
                              data3?.playerProfileDetail?.profile_detail
                                ?.recruiting_preferences?.coach_trainer
                            }
                          </h4>
                        </div>

                        {/* <div className="detail-items w-100">
                          <h4>Direct Contact for Recruiters </h4>
                          <h4>
                            {
                              data3?.playerProfileDetail?.profile_detail
                                ?.recruiting_preferences?.direct_contact
                            }
                          </h4>
                        </div> */}

                        <div className="detail-items w-100">
                          <h4>Scouting Reports & Endurance </h4>
                          <svg
                            onClick={() => {
                              setImageModal(true);
                              setCurrentImage(
                                data3?.playerProfileDetail?.profile_detail
                                  ?.recruiting_preferences?.reports_endorsements
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
            ) : (
              <>
                <Row>
                  {data3?.profile_type?.includes("Basic") && (
                    <Col md={data3?.profile_type?.length == 1 ? 12 : 6}>
                      <div className="basic-card gray solid-card d-flex align-items-center">
                        <div className="w-100">
                          <h3>Basic Profile</h3>

                          <p>
                            Good for friends, family and coaches to view your
                            player
                          </p>

                          {data3?.profile_type?.includes("Basic") && (
                            <>
                              <svg
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setEdit(true);
                                  handleGetPlayerDetails(
                                    data3?.user_id,
                                    "Basic"
                                  );
                                  setEditType("Basic");
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                width="36"
                                height="36"
                                viewBox="0 0 36 36"
                                fill="none"
                              >
                                <circle
                                  cx="18"
                                  cy="18"
                                  r="17.5714"
                                  stroke="white"
                                  strokeWidth="0.857143"
                                />
                                <mask
                                  id="mask0_2923_4925"
                                  style={{ maskType: "alpha" }}
                                  maskUnits="userSpaceOnUse"
                                  x="9"
                                  y="9"
                                  width="18"
                                  height="18"
                                >
                                  <rect
                                    width="18"
                                    height="18"
                                    transform="matrix(-1 0 0 1 27 9)"
                                    fill="white"
                                  />
                                </mask>
                                <g mask="url(#mask0_2923_4925)">
                                  <path
                                    d="M16.0588 25.9409L24 17.9998L16.0588 10.0586L14.8478 11.2829L21.5646 17.9998L14.8478 24.7166L16.0588 25.9409Z"
                                    fill="white"
                                  />
                                </g>
                              </svg>
                            </>
                          )}

                          {!data3?.profile_type?.includes("Basic") && (
                            <>
                              <svg
                                onClick={() => handleBasicFlow()}
                                xmlns="http://www.w3.org/2000/svg"
                                width="36"
                                height="36"
                                viewBox="0 0 36 36"
                                fill="none"
                              >
                                <mask
                                  id="mask0_2923_4926"
                                  style={{ maskType: "alpha" }}
                                  maskUnits="userSpaceOnUse"
                                  x="7"
                                  y="7"
                                  width="22"
                                  height="22"
                                >
                                  <rect
                                    x="7"
                                    y="7"
                                    width="22"
                                    height="22"
                                    fill="#D9D9D9"
                                  />
                                </mask>
                                <g mask="url(#mask0_2923_4926)">
                                  <path
                                    d="M17.2359 18.7664H11.583V17.2388H17.2359V11.5859H18.7635V17.2388H24.4163V18.7664H18.7635V24.4193H17.2359V18.7664Z"
                                    fill="white"
                                  />
                                </g>
                                <circle
                                  cx="18"
                                  cy="18"
                                  r="17.5714"
                                  stroke="white"
                                  strokeWidth="0.857143"
                                />
                              </svg>
                            </>
                          )}
                        </div>
                      </div>
                    </Col>
                  )}

                  {data3?.profile_type?.includes("Advanced") && (
                    <Col md={data3?.profile_type?.length == 1 ? 12 : 6}>
                      <div
                        style={{ cursor: "pointer" }}
                        className="basic-card gray solid-card d-flex align-items-center"
                      >
                        <div className="w-100">
                          <h3>Advanced Profile</h3>
                          <p>Add profile details to make Advanced QR Code</p>
                          {data3?.profile_type?.includes("Advanced") && (
                            <>
                              <svg
                                onClick={() => {
                                  setEdit(true);
                                  handleGetPlayerDetails(
                                    data3?.user_id,
                                    "Advanced"
                                  );
                                  setEditType("Advanced");
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                width="36"
                                height="36"
                                viewBox="0 0 36 36"
                                fill="none"
                              >
                                <circle
                                  cx="18"
                                  cy="18"
                                  r="17.5714"
                                  stroke="white"
                                  strokeWidth="0.857143"
                                />
                                <mask
                                  id="mask0_2923_4925"
                                  style={{ maskType: "alpha" }}
                                  maskUnits="userSpaceOnUse"
                                  x="9"
                                  y="9"
                                  width="18"
                                  height="18"
                                >
                                  <rect
                                    width="18"
                                    height="18"
                                    transform="matrix(-1 0 0 1 27 9)"
                                    fill="white"
                                  />
                                </mask>
                                <g mask="url(#mask0_2923_4925)">
                                  <path
                                    d="M16.0588 25.9409L24 17.9998L16.0588 10.0586L14.8478 11.2829L21.5646 17.9998L14.8478 24.7166L16.0588 25.9409Z"
                                    fill="white"
                                  />
                                </g>
                              </svg>
                            </>
                          )}

                          {!data3?.profile_type?.includes("Advanced") && (
                            <>
                              <svg
                                onClick={() => handleAdvanceFlow()}
                                xmlns="http://www.w3.org/2000/svg"
                                width="36"
                                height="36"
                                viewBox="0 0 36 36"
                                fill="none"
                              >
                                <mask
                                  id="mask0_2923_4926"
                                  style={{ maskType: "alpha" }}
                                  maskUnits="userSpaceOnUse"
                                  x="7"
                                  y="7"
                                  width="22"
                                  height="22"
                                >
                                  <rect
                                    x="7"
                                    y="7"
                                    width="22"
                                    height="22"
                                    fill="#D9D9D9"
                                  />
                                </mask>
                                <g mask="url(#mask0_2923_4926)">
                                  <path
                                    d="M17.2359 18.7664H11.583V17.2388H17.2359V11.5859H18.7635V17.2388H24.4163V18.7664H18.7635V24.4193H17.2359V18.7664Z"
                                    fill="white"
                                  />
                                </g>
                                <circle
                                  cx="18"
                                  cy="18"
                                  r="17.5714"
                                  stroke="white"
                                  strokeWidth="0.857143"
                                />
                              </svg>
                            </>
                          )}
                        </div>
                      </div>
                    </Col>
                  )}
                </Row>
              </>
            )}
          </div>
        </div>
      </div>

      <Modal backdrop={false} size="xl" centered isOpen={modal}>
        {detailType == "sport_type" && (
          <div className="gray-modal team-details">
            <div className="d-flex justify-content-between mb-3">
              <h3>View all sports details </h3>
              <svg
                style={{
                  cursor: "pointer",
                }}
                onClick={() => setModal(false)}
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
                  open={open}
                  toggle={toggleAccordion}
                >
                  {data3?.playerProfileDetail?.profile_detail?.sports_info?.map(
                    (sport, index) => {
                      console.log(sport, "awhat is");
                      return (
                        <>
                          <AccordionItem className="py-2">
                            <AccordionHeader
                              targetId={index}
                              toggleIcon={<IoIosArrowForward color="#fff" /> }
                            >
                              {sport?.type}
                            </AccordionHeader>
                            <AccordionBody accordionId={index}>
                              <div className="team-card">
                                <div className="team-card-item d-flex justify-content-between">
                                  <p>Sport Type</p>
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
                                  <p>Games Played </p>
                                  <p>{sport?.match_played || "-----"} </p>
                                </div>

                                <div className="team-card-item d-flex justify-content-between">
                                  <p>Losses </p>
                                  <p>{sport?.losses} </p>
                                </div>

                                <div className="team-card-item d-flex justify-content-between">
                                  <p>Draws </p>
                                  <p>{sport?.draws} </p>
                                </div>

                                {sport?.experience && (
                                  <div className="team-card-item d-flex justify-content-between">
                                    <p>Experience</p>
                                    <p>{sport?.experience + " Year"} </p>
                                  </div>
                                )}

                                {/* {sport?.goals && ( */}
                                <div className="team-card-item d-flex justify-content-between">
                                  <p>Goals</p>
                                  <p>{sport?.goals || "-----"} </p>
                                </div>
                                {/* )} */}

                                <div className="team-card-item d-flex justify-content-between">
                                  <p>Assists </p>
                                  <p>{sport?.points || "-----"} </p>
                                </div>

                                <div className="team-card-item d-flex justify-content-between">
                                  <p>Positions </p>
                                  <p>
                                    {sport?.positions.join(", ") || "-----"}
                                  </p>
                                </div>

                                {/* <div className="team-card-item d-flex justify-content-between">
                                  <p>Coach Contacts</p>
                                  <p>{sport?.coach_contact} </p>
                                </div> */}

                                {sport?.wins && (
                                  <div className="team-card-item d-flex justify-content-between">
                                    <p>Wins</p>
                                    <p>{sport?.wins || "-----"} </p>
                                  </div>
                                )}
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

        {detailType == "Career_and_stats" && (
          <>
            <div className="gray-modal team-details">
              <div className="d-flex justify-content-between mb-3">
                <h3>Career Stats & Highlights </h3>

                <svg
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={()=>setModal(false)}
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
                      {data3?.playerProfileDetail?.profile_detail?.career_stats
                        ?.top_scorer + ","}
                    </p>
                  </div>

                  <div className="team-card-item d-flex justify-content-between">
                    <p> Valuable Player </p>
                    <p>
                      {data3?.playerProfileDetail?.profile_detail?.career_stats
                        ?.valuable_player + ","}
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
        data={currentImage}
      />
    </>
  );
};

export default PlayerDetailssss;

