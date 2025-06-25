import "./index.css";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

import { useNavigate } from "react-router-dom";
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
import blrQr from "./../../assets/blrQr.png";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { handleProfileType } from "../../redux/profileSlice";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  GET_ALL_PACKAGES,
  GET_MY_PROFILE,
  MY_INVITES,
  PLAYER_PROFILE_DETAIL,
  PLAYER_QR_CODE,
} from "../../graphql/query/query";
import QrCodePurchase from "../../components/elements/qr-card-purchase";
import EditProfileBasicModal from "../../components/modules/editProfileBasicModal";
import EditBasicCreateTeamModal from "../../components/modules/editBasicCreateTeam";
import EditProfileAdvancedModal from "../../components/modules/editProfileAdvanceModal";
import EditAdvancedAtheleteModal from "../../components/modules/editAdvancedAthelete";
import EditAdvancedAcademicModal from "../../components/modules/editAdvancedAcademic";
import EditAdvancedWorkingModal from "../../components/modules/editAdvancedWorking";
import EditAdvancedRecruitModal from "../../components/modules/editAdvancedRecruit";
import { useLayoutEffect } from "react";
import AdvanceImage from "../../components/modules/editAdvanceImage";

export default function AtheleteHome() {
  const [startDate, setStartDate] = useState(new Date());
  const phoneInputRef = useRef(null);
  const [currentChild, setCurrentChild] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  const iti = useRef(null);
  const dispatch = useDispatch();
  const [open, setOpen] = useState("0");

  const toggleAccordion = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const handleAdvanceFlow = () => {
    dispatch(handleProfileType("Advanced"));
    navigate("/advance/advanced-profile", { state: currentChild });
  };

  const handleBasicFlow = () => {
    dispatch(handleProfileType("Basic"));
    navigate("/basic/basic-profile", { state: currentChild });
  };

  const [selectedOption, setSelectedOption] = useState(""); // State for radio selection

  const [showQr, setShowQr] = useState(false);
  const [qrType, setQrType] = useState(null);
  const [page, setPage] = useState(1);
  const [detailType, setDetailType] = useState(null);

  const [data1, setData1] = useState(null);
  const [imgModal, setImageModal] = useState(null);

  const { loading, error, data, refetch } = useQuery(GET_MY_PROFILE);

  const [
    playerProfileDetail,
    { loading: loading1, error: error1, data: data3, refetch: refetch1 },
  ] = useLazyQuery(PLAYER_PROFILE_DETAIL);

  const [
    getAllPackages,
    {
      loading: loading4,
      error: error4,
      data: package_data,
      refetch: refetch_package_data,
    },
  ] = useLazyQuery(GET_ALL_PACKAGES);

  const [
    playerQRCode,
    { loading: qr_loading, error: error2, data: qr_data, refetch: qr_refetch },
  ] = useLazyQuery(PLAYER_QR_CODE);
  const [editType, setEditType] = useState(null);
  const handleGetPlayerDetails = (id, type) => {
    playerProfileDetail({
      variables: {
        input: {
          user_id: id,
          profile_type: type,
        },
      },
    });
  };

  const handleGetAllPackages = (type) => {
    getAllPackages({
      variables: {
        input: {
          qr_type: type,
          page_start: 0,
          name: null,
          limit: 10,
          duration: null,
        },
      },
    });
  };

  console.log(qr_data, "datailsasf");
  let countRef = useRef(1);

  useEffect(() => {
    console.log("I'm running");

    if (data?.myPlayerProfile) {
      console.log(data, "HAMMAD");
      setCurrentChild(data?.myPlayerProfile);
    }
  }, [data]);

  useEffect(() => {
    if (editType && currentChild) {
      handleGetPlayerDetails(currentChild?.user_id, editType);
    }
  }, [editType, currentChild?.user_id]);

  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);

  const [editTeamModal, setEditTeamModal] = useState(false);

  const [modalUpdateProfile, setModalUpdateProfile] = useState(false);
  const [modalPlayerUpdateProfile, setModalPlayerUpdateProfile] =
    useState(false);
  const [modalAcadmic, setModalAcadmic] = useState(false);
  const [modalRecruit, setModalRecruit] = useState(false);
  const [modalBasicPlayerCreateTeam, setModalBasicPlayerCreateTeam] =
    useState(false);

  const [modalAdvanceProfile, setModalAdvanceProfile] = useState(false);
  const [modalAthelete, setModalAthelete] = useState(false);
  const [modalWorking, setModalWorking] = useState(false);

  const toggle = () => setModal(!modal);
  const toggleUpdate = () => setModal(!modalUpdateProfile);
  const toggleTeam = () =>
    setModalBasicPlayerCreateTeam(!modalBasicPlayerCreateTeam);
  const togglePlayerInfo = () => setModal(!modalPlayerUpdateProfile);

  console.log(
    qr_data?.playerQRCode.map((itr) => itr.package.qr_type.includes("Basic")),
    "saf"
  );

  const packageQrType = package_data?.getAllPackages?.data[0]?.qr_type;
  const playerQrTypes =
    qr_data?.playerQRCode?.flatMap((itr) => itr?.package?.qr_type) || [];

  const basicPackage = qr_data?.playerQRCode?.find((itr) =>
    itr?.package?.qr_type.includes("Basic")
  );
  const advancedPackage = qr_data?.playerQRCode?.find((itr) =>
    itr?.package?.qr_type.includes("Advanced")
  );

  // Determine the correct QR package based on packageQrType
  const selectedQrPackage =
    packageQrType === "Basic"
      ? basicPackage
      : packageQrType === "Advanced"
      ? advancedPackage
      : qr_data?.playerQRCode[0]; // console.log(currentChild,"console");
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <div
          style={{
            height: "auto",
          }}
          className=""
        >
          <div
            style={{
              padding: "20px",
              overflowY: "auto",
            }}
          >
            <div className="home_profile_card gray solid-card d-flex align-items-center">
              <img
                style={{
                  height: "70px",
                  width: "70px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src={
                  currentChild
                    ? `${import.meta.env.VITE_BASE_URL_IMAGE}${
                        currentChild?.user?.picture
                      }`
                    : dummyprofile
                }
              />
              <div>
                <h3>
                  {data3?.playerProfileDetail
                    ? data3?.playerProfileDetail?.user?.full_name
                    : currentChild?.user?.full_name
                    ? currentChild?.user?.full_name
                    : "Player Name"}
                </h3>
                <h4>
                  ID:
                  {data3?.playerProfileDetail
                    ? data3?.playerProfileDetail?.player_id
                    : currentChild?.player_id
                    ? currentChild?.player_id
                    : "-----"}
                </h4>
              </div>
            </div>

            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                console.log(currentChild?.user?.id)
                playerQRCode({
                  variables: {
                    input: {
                      user_id: currentChild?.user?.id,
                    },
                  },
                });
                setModalUpdateProfile(true);
              }}
              className="gold_card w-100 my-3 pe-3"
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

            {edit && editType == "Basic" ? (
              <>
                <div
                  onClick={() => {
                    setEdit(false);
                    setEditType(null);
                  }}
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
                          <h4>{data3?.playerProfileDetail?.user?.full_name}</h4>
                        </div>

                        <div className="detail-items w-100">
                          <h4>Nickname</h4>
                          <h4>{data3?.playerProfileDetail?.nick_name} </h4>
                        </div>

                        <div className="detail-items w-100">
                          <h4>Email Address</h4>
                          <h4>{data3?.playerProfileDetail?.user?.email} </h4>
                        </div>

                        <div className="detail-items w-100">
                          <h4>Phone Number</h4>
                          <h4>{data3?.playerProfileDetail?.user?.phone}</h4>
                        </div>

                        <div className="detail-items w-100">
                          <h4>Gender</h4>
                          <h4> {data3?.playerProfileDetail?.gender} </h4>
                        </div>

                        <div
                          onClick={() => {
                            setDetailType("sport_type");
                            setModal(true);
                          }}
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
              </>
            ) : edit && editType == "Advanced" ? (
              <>
                <div
                  onClick={() => {
                    setEdit(false);
                    setEditType(null);
                  }}
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
                            onClick={() => {
                              setModalAdvanceProfile(true);
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
                          <h4>{data3?.playerProfileDetail?.user?.full_name}</h4>
                        </div>
                        <div className="detail-items w-100">
                          <h4>Nickname</h4>
                          <h4>{data3?.playerProfileDetail?.nick_name} </h4>
                        </div>
                        <div className="detail-items w-100">
                          <h4>Email Address</h4>
                          <h4>{data3?.playerProfileDetail?.user?.email} </h4>
                        </div>
                        <div className="detail-items w-100">
                          <h4>Phone Number</h4>
                          <h4>{data3?.playerProfileDetail?.user?.phone}</h4>
                        </div>
                        <div className="detail-items w-100">
                          <h4>Gender</h4>
                          <h4> {data3?.playerProfileDetail?.gender} </h4>
                        </div>
                        <div className="detail-items w-100">
                          <h4>Height</h4>
                          <h4>
                            {" "}
                            {`${data3?.playerProfileDetail?.profile_detail?.height?.feet}.${data3?.playerProfileDetail?.profile_detail?.height?.inches}`}
                          </h4>
                        </div>
                        <div className="detail-items w-100">
                          <h4>Weight</h4>
                          <h4>
                            {" "}
                            {Number.isInteger(
                              data3?.playerProfileDetail?.profile_detail?.weight
                            )
                              ? `${data3?.playerProfileDetail?.profile_detail?.weight}.0`
                              : data3?.playerProfileDetail?.profile_detail
                                  ?.weight}
                          </h4>
                        </div>
                        <div className="detail-items w-100">
                          <h4>Dominant Hand </h4>
                          <h4>
                            {
                              data3?.playerProfileDetail?.profile_detail
                                ?.dominant_hand
                            }
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
                          <div
                            onClick={() => setModalAthelete(true)}
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

                        <div
                          onClick={() => {
                            setDetailType("Career_and_stats");
                            setModal(true);
                          }}
                          className="detail-items w-100"
                        >
                          <h4>Career Stats & Highlights </h4>
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
                          <h4>Agility</h4>
                          <h4>
                            {
                              data3?.playerProfileDetail?.profile_detail
                                ?.performance_metrics?.agility
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
                               <div
                                 onClick={() => setModalWorking(true)}
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
                          <div
                            onClick={() => setModalAcadmic(true)}
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

                        <div className="detail-items w-100">
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
                        </div>
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
                          <div
                            onClick={() => setModalRecruit(true)}
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
                          <h4>Preferred Colleges for Athletics </h4>
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

                        <div className="detail-items w-100">
                          <h4>Direct Contact for Recruiters </h4>
                          <h4>
                            {
                              data3?.playerProfileDetail?.profile_detail
                                ?.recruiting_preferences?.direct_contact
                            }
                          </h4>
                        </div>

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
                  <Col md={6}>
                    <div className="basic-card gray solid-card d-flex align-items-center">
                      <div className="w-100">
                        <h3>Basic Profile</h3>

                        <p>
                          Good for friends, family and coaches to view your
                          player
                        </p>

                        {currentChild?.profile_type?.includes("Basic") && (
                          <>
                            <svg
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setEdit(true);
                                handleGetPlayerDetails(
                                  currentChild?.user_id,
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

                        {!currentChild?.profile_type?.includes("Basic") && (
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
                  <Col md={6}>
                    <div
                      style={{ cursor: "pointer" }}
                      className="basic-card gray solid-card d-flex align-items-center"
                    >
                      <div className="w-100">
                        <h3>Advanced Profile</h3>
                        <p>Add profile details to make Advanced QR Code</p>
                        {currentChild &&
                          currentChild?.profile_type?.includes("Advanced") && (
                            <>
                              <svg
                                onClick={() => {
                                  setEdit(true);
                                  console.log("im clicked");
                                  handleGetPlayerDetails(
                                    currentChild?.user_id,
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

                        {!currentChild?.profile_type?.includes("Advanced") && (
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
                </Row>
              </>
            )}
          </div>
        </div>
      </Container>
      {
        //detail modal
      }
      <Modal backdrop={false} size="xl" centered isOpen={modal} toggle={toggle}>
        {detailType == "sport_type" && (
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
                            <AccordionHeader targetId={index}>
                              {sport?.type}
                            </AccordionHeader>
                            <AccordionBody accordionId={index}>
                              <div className="team-card">
                                {editType == "Basic" && (
                                  <div
                                    style={{ cursor: "pointer" }}
                                    className="team-card-item d-flex justify-content-end"
                                    onClick={() =>
                                      setModalBasicPlayerCreateTeam(true)
                                    }
                                  >
                                    <p
                                      className="me-2"
                                      style={{ fontSize: "16px" }}
                                    >
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
                                )}

                                <div className="team-card-item d-flex justify-content-between">
                                  <p>Sport</p>
                                  <p>{sport?.type}</p>
                                </div>
                                <div className="team-card-item d-flex justify-content-between">
                                  <p>Team Name</p>
                                  <p>{sport?.team_name}</p>
                                </div>
                                <div className="team-card-item d-flex justify-content-between">
                                  <p>Jersey Number </p>
                                  <p>{sport?.jersey_no} </p>
                                </div>
                                <div className="team-card-item d-flex justify-content-between">
                                  <p>Games Played </p>
                                  <p>{sport?.match_played || "-"} </p>
                                </div>
                                {sport?.losses && (
                                  <div className="team-card-item d-flex justify-content-between">
                                    <p>Losses </p>
                                    <p>{sport?.losses} </p>
                                  </div>
                                )}
                                {sport?.draws && (
                                  <div className="team-card-item d-flex justify-content-between">
                                    <p>Draws </p>
                                    <p>{sport?.draws} </p>
                                  </div>
                                )}

                                {sport?.experience && (
                                  <div className="team-card-item d-flex justify-content-between">
                                    <p>Experience</p>
                                    <p>{sport?.experience + " Year"} </p>
                                  </div>
                                )}

                                {/* {sport?.goals && ( */}
                                  <div className="team-card-item d-flex justify-content-between">
                                    <p>Goals</p>
                                    <p>{sport?.goals || "-"} </p>
                                  </div>
                                {/* )} */}

                                <div className="team-card-item d-flex justify-content-between">
                                    <p>Points</p>
                                    <p>{sport?.points || "-"} </p>
                                  </div>

                                {sport?.wins && (
                                  <div className="team-card-item d-flex justify-content-between">
                                    <p>Wins</p>
                                    <p>{sport?.wins} </p>
                                  </div>
                                )}

                                <div className="team-card-item d-flex justify-content-between">
                                  <p>Position </p>
                                  <p>
                                    {sport?.positions?.map((ite) => {
                                      return ite + ",";
                                    })}
                                  </p>
                                </div>
                                <div className="team-card-item d-flex justify-content-between">
                                    <p>Coach Contact</p>
                                    <p>{sport?.coach_contact || "-"} </p>
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

        {detailType == "Career_and_stats" && (
          <>
            <div className="gray-modal team-details">
              <div className="d-flex justify-content-between mb-3">
                <h3>Career Stats & Highlights </h3>

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
                <div className="team-card p-3">
                  <div className="team-card-item d-flex justify-content-between">
                    <p>Top Scorer</p>
                    <p>
                      {data3?.playerProfileDetail?.profile_detail?.career_stats
                        ?.top_scorer + ","}
                    </p>
                  </div>

                  <div className="team-card-item d-flex justify-content-between">
                    <p>Valuable Player</p>
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
      <Modal
        size="xl"
        centered
        isOpen={modalUpdateProfile}
        toggle={toggleUpdate}
        backdrop={false}
      >
        <div className="">
          <Row>
            <Col md={4} />
            <Col md={4}>
              <div className="d-flex justify-content-end mb-3">
                <svg
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setModalUpdateProfile(false);
                    setShowQr(false);
                  }}
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
            </Col>
            <Col md={4} />
          </Row>

          <Row>
            <Col md={4} />
            <Col md={4}>
              {showQr ? (
                playerQrTypes.includes(packageQrType) ? (
                  <QrCodePurchase
                    purchase={true}
                    userId={currentChild && currentChild?.user?.id}
                    heading={package_data?.getAllPackages?.data[0]}
                    qr={selectedQrPackage}
                    title={"Download"}
                    state={setModalUpdateProfile}
                  />
                ) : (
                  <QrCode
                    userId={currentChild && currentChild?.user?.id}
                    heading={package_data?.getAllPackages?.data[0] || []}
                    qr={false}
                    title={"Buy QR"}
                    state={setModalUpdateProfile}
                  />
                )
              ) : (
                <>
                  <>
                    <div className="glass-card">
                      <div className="inner-profile text-center w-100">
                        <img
                          style={{
                            height: "100px",
                            width: "100px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                          src={
                            currentChild
                              ? `${import.meta.env.VITE_BASE_URL_IMAGE}${
                                  currentChild?.user?.picture
                                }`
                              : profile
                          }
                          alt="drop-img"
                        />
                        <h3 style={{ color: "#000" }}>
                          {currentChild?.user?.full_name}{" "}
                        </h3>
                        <label style={{ color: "#000", fontWeight: "600" }}>
                          ID :{currentChild?.player_id}{" "}
                        </label>
                      </div>
                      <div
                        onClick={() => setDetails(true)}
                        className="profile-card-drop d-flex justify-content-between"
                      >
                        <div className="drop-left d-flex align-items-center ">
                          <img src={qr} alt="drop-img" />
                          <div className=" ms-2">
                            <h3>Basic QR Code </h3>
                            <label
                              style={{
                                opacity: "50%",
                                width: "80%",
                              }}
                            >
                              Scan with Your Smartphone for Quick Access to
                              Player Info{" "}
                            </label>
                          </div>
                        </div>

                        <div className="drop-right d-flex align-items-center ">
                          {currentChild?.profile_type?.includes("Basic") && (
                            <>
                              <svg
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  // setEdit(true);
                                  setShowQr(true);
                                  // handleGetPlayerDetails(
                                  //   currentChild?.user_id,
                                  //</>   "Basic"
                                  // );
                                  setQrType("Basic");
                                  handleGetAllPackages("Basic");
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                width="23"
                                height="22"
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

                          {!currentChild?.profile_type?.includes("Basic") && (
                            <>
                              <svg
                                onClick={() => handleBasicFlow()}
                                xmlns="http://www.w3.org/2000/svg"
                                width="23"
                                height="22"
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

                      <div
                        onClick={() => setDetails(true)}
                        className="profile-card-drop d-flex justify-content-between"
                      >
                        <div className="drop-left d-flex align-items-center ">
                          <img src={qr} alt="drop-img" />
                          <div className=" ms-2">
                            <h3> Advanced QR Code </h3>
                            <label
                              style={{
                                opacity: "50%",
                                width: "80%",
                              }}
                            >
                              Scan with Your Smartphone for Quick Access to
                              Player Info{" "}
                            </label>
                          </div>
                        </div>
                        <div className="drop-right d-flex align-items-center ">
                          {currentChild &&
                            currentChild?.profile_type?.includes(
                              "Advanced"
                            ) && (
                              <>
                                <svg
                                  onClick={() => {
                                    // setEdit(true);
                                    //   handleGetPlayerDetails(
                                    //    currentChild?.user_id,
                                    //</>   "Advanced"
                                    //  );
                                    //  setEditType("Advanced");
                                    setShowQr(true);
                                    setQrType("Advanced");
                                    handleGetAllPackages("Advanced");
                                  }}
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="23"
                                  height="22"
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

                          {!currentChild?.profile_type?.includes(
                            "Advanced"
                          ) && (
                            <>
                              <svg
                                onClick={() => handleAdvanceFlow()}
                                xmlns="http://www.w3.org/2000/svg"
                                width="23"
                                height="22"
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
                    </div>
                  </>
                </>
              )}
            </Col>
            <Col md={4} />
          </Row>
        </div>
      </Modal>

      <EditProfileBasicModal
        setShow={setModalPlayerUpdateProfile}
        show={modalPlayerUpdateProfile}
        toggle={togglePlayerInfo}
        data={data3?.playerProfileDetail}
        refetch={refetch1}
      />
      <EditBasicCreateTeamModal
        setShow={setModalBasicPlayerCreateTeam}
        show={modalBasicPlayerCreateTeam}
        toggle={toggleTeam}
        data={data3?.playerProfileDetail}
        refetch={refetch1}
      />
      <EditProfileAdvancedModal
        setShow={setModalAdvanceProfile}
        show={modalAdvanceProfile}
        toggle={toggleTeam}
        data={data3?.playerProfileDetail}
        refetch={refetch1}
      />
      <EditAdvancedAtheleteModal
        setShow={setModalAthelete}
        show={modalAthelete}
        toggle={toggleTeam}
        data={data3?.playerProfileDetail}
        refetch={refetch1}
      />
      <EditAdvancedWorkingModal
        setShow={setModalWorking}
        show={modalWorking}
        toggle={toggleTeam}
        data={data3?.playerProfileDetail}
        refetch={refetch1}
      />
      <EditAdvancedAcademicModal
        setShow={setModalAcadmic}
        show={modalAcadmic}
        toggle={toggleTeam}
        data={data3?.playerProfileDetail}
        refetch={refetch1}
      />
      <EditAdvancedRecruitModal
        setShow={setModalRecruit}
        show={modalRecruit}
        toggle={toggleTeam}
        data={data3?.playerProfileDetail}
        refetch={refetch1}
      />
      <AdvanceImage
        setImage={setCurrentImage}
        setShow={setImageModal}
        show={imgModal}
        data={currentImage}
      />
    </>
  );
}
