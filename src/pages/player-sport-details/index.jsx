import React, { useEffect, useState } from "react";
import "./index.css"
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Modal, Row, Container, ModalBody } from "reactstrap";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { All_Highlights, Get_Sport_Details, Player_Profile, PLAYER_PROFILE_DETAIL, Sport_List } from "../../graphql/query/query";
import { useLazyQuery } from "@apollo/client";
import AdvanceImage from "../../components/modules/editAdvanceImage";
import BasicProfileDetailModal from '../../components/modules/BasicProfileDetailModal';
import CategoryCard from "../../components/elements/CategoryCard";
import AddHighlightModal from "../../components/elements/add-highlight";
import Slider from "react-slick";
import ViewHighlightModal from "../../components/elements/view-highlight";
import Loader from "react-spinner-loader"
import AdvanceProfileDetailModal from "../../components/modules/AdvanceProfileDetailModal";
import toast from "react-hot-toast";
import {
    FaXTwitter,
    FaInstagram,
    FaYoutube,
    FaTiktok,

} from 'react-icons/fa6'; // Fa6 includes FaXTwitter (the new Twitter logo)
import FollowModal from "../../components/modules/followModal";

const settings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 10,
    slidesToScroll: 10,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 8,
                slidesToScroll: 8,

            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 6,

            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ]
}

const PlayerSportDetails = () => {

    const socialIconMap = {
        Twitter: <FaXTwitter />,
        Instagram: <FaInstagram />,
        Youtube: <FaYoutube />,
        Tiktok: <FaTiktok />,

    };

    const [searchParams] = useSearchParams()

    const [states, setStates] = useState({
        detail: null,
        detail1: null,
        detail2: null,
        loader: true,
        loader1: true,
        loader2: true,
        imageType: null,
        imageSelect: null,
        active: false,
        isBasicProfileDetailModalOpen: false,
        isAdvanceProfileDetailModalOpen: false,
        isAddHighlightModalOpen: false,
        isViewHighlightModalOpen: false,
        selectedBasicSportDataForModal: null,
        selectedAdvanceSportDataForModal: null,
        editType: false,
        edit: false,
        modal: false,
        detailType: null,
        currentImage: null,
        imgModal: null,
        modal5: false,
        follow_data: null
    })


    const [Profile_Detail] = useLazyQuery(Get_Sport_Details)
    const [Get_Highlights] = useLazyQuery(All_Highlights)

    const navigate = useNavigate()


    const { s } = useLocation()



    useEffect(() => {
        setStates((prev) => ({
            ...prev,
            loader: true,
        }))
        const fetchData = async () => {
            try {
                const { data } = await Profile_Detail({
                    variables: {
                        "input": {
                            "sport_id": parseInt(searchParams.get("sport_id")),
                            "user_id": parseInt(searchParams.get("user_id"))
                        }
                    },
                    fetchPolicy: "no-cache",
                });

                if (data) {

                    setStates((prev) => ({
                        ...prev,
                        loader: false,
                        detail: data?.sportsProfileById,
                    }))
                }
            } catch (e) {
                console.log(e)
                setStates((prev) => ({
                    ...prev,
                    loader: false,
                }))
            }
        }



        fetchData()

    }, [])

    useEffect(() => {
        setStates((prev) => ({
            ...prev,
            loader1: true,
        }))
        const fetchData1 = async () => {
            try {
                const { data } = await Get_Highlights({
                    variables: {
                        "input": {
                            "user_id": parseInt(searchParams.get("user_id")),
                            "limit": 10,
                            "cursor": null
                        }
                    },
                    fetchPolicy: "no-cache",
                });

                if (data) {

                    setStates((prev) => ({
                        ...prev,
                        detail1: data?.allHighlights,
                        loader1: false
                    }))
                }
            } catch (e) {
                console.log(e)
                setStates((prev) => ({
                    ...prev,
                    loader1: false,
                }))
            }
        }

        fetchData1()

    }, [states?.active])


    const toggleViewHighlightModal = (img) => {
        console.log(img)
        if (!states?.isViewHighlightModalOpen) {
            setStates((prev) => ({
                ...prev,
                isViewHighlightModalOpen: !states?.isViewHighlightModalOpen,
                imageType: img.type,
                imageSelect: `${import.meta.env.VITE_BASE_URL_IMAGE}${img.media}`,

            }))
        }
        else {
            setStates((prev) => ({
                ...prev,
                isViewHighlightModalOpen: !states?.isViewHighlightModalOpen,

                active: !states?.active,

            }))
            setTimeout(() => {
                setStates((prev) => ({
                    ...prev,
                    imageSelect: null,

                }))
            }, 300)
        }
    }

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log('Copied:', text);
                toast.success("Text copied..")
                // Optional: Show a toast or feedback here
            })
            .catch((err) => {
                console.error('Copy failed:', err);
            });
    };

    const toggleFollow = (name) => {
        if (name) {
            setStates((prev) => ({
                ...prev,
                follow_data: name,
                modal5: !states.modal5,
            }))
        }
        else {
            setStates((prev) => ({
                ...prev,
                modal5: !states.modal5,
            }))
        }
    }

    return (
        <>
            {(states?.loader) ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                    <Loader show={true}
                        spinnerSize="60px"
                        radius="10"

                        color="red"
                    />
                </div>
            ) : (
                <div className="player-details-container position-relative w-100 ">
                    <div className={`d-flex align-items-start ${states?.detail?.profile_type === "Basic" ? "profile-header-basic" : "profile-header-advance "}`}>
                        <div className="px-md-3 px-2 container">
                            <Row className="align-items-center">

                                <Col>
                                    <h2 className="profile-title text-white mb-0">{states?.detail?.profile_type === "Basic" ? "Basic" : "Advance"} Sports Profile</h2>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    <Container className="container-post position-absolute start-50 translate-middle-x z-3">
                        <div className="profile-info-card">
                            <Row className="align-items-center justify-content-center">

                                <Col xs="auto" xl={2} lg={2} md={2} sm={2}>
                                    <img
                                        className="profile-lg-image"
                                        src={`${import.meta.env.VITE_BASE_URL_IMAGE}${states?.detail?.players_profile?.user?.picture}`}
                                        alt={`${states?.detail?.players_profile?.user?.full_name}'s profile`}
                                    />
                                </Col>
                                <Col xl={10} lg={10} md={10} sm={10} className="ps-5">
                                    <Row className="align-items-center ">
                                        <Col>
                                            <h3 className="player-name mb-0">{states?.detail?.players_profile?.user?.full_name} <small style={{ opacity: "0.6" }}>({states?.detail?.players_profile?.nick_name || ''})</small></h3>
                                            <div className="player-id d-flex gap-3 align-items-center mt-1">
                                                ID: {states?.detail?.players_profile?.player_id}
                                                <svg width="16" height="16" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: "pointer" }} onClick={() => handleCopy(states?.detail?.players_profile?.player_id)}>
                                                    <path d="M5.42569 18.025H4.58469C2.72048 18.025 1.2207 16.5252 1.2207 14.661V4.56907C1.2207 2.70486 2.72048 1.20508 4.58469 1.20508H14.6767C16.5409 1.20508 18.0406 2.70486 18.0406 4.56907V5.41006M12.9947 9.61505H23.0866C23.9788 9.61505 24.8345 9.96947 25.4653 10.6003C26.0962 11.2312 26.4506 12.0869 26.4506 12.979V23.071C26.4506 23.9632 26.0962 24.8188 25.4653 25.4497C24.8345 26.0806 23.9788 26.435 23.0866 26.435H12.9947C12.1025 26.435 11.2468 26.0806 10.616 25.4497C9.9851 24.8188 9.63068 23.9632 9.63068 23.071V12.979C9.63068 12.5373 9.71769 12.0998 9.88674 11.6917C10.0558 11.2836 10.3036 10.9127 10.616 10.6003C10.9283 10.288 11.2992 10.0402 11.7073 9.87112C12.1155 9.70206 12.5529 9.61505 12.9947 9.61505Z" stroke="white" stroke-width="2.10249" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>                                            </div>
                                        </Col>

                                    </Row>
                                    <div className="mt-3 stats-row d-flex flex-row">
                                        <div className="me-3 d-flex align-items-center gap-2" style={{ cursor: "pointer" }} onClick={() => toggleFollow("Reacts")} >
                                            <div className="stat-value">{states?.detail?.players_profile?.reaction}</div>
                                            <div className="stat-label">Reacts</div>
                                        </div>
                                        <div className="me-3 d-flex align-items-center gap-2" style={{ cursor: "pointer" }} onClick={() => toggleFollow("Followers")}>
                                            <div className="stat-value">{states?.detail?.players_profile?.followers}</div>
                                            <div className="stat-label">Followers</div>
                                        </div>
                                        <div className="me-3 d-flex align-items-center gap-2" style={{ cursor: "pointer" }} onClick={() => toggleFollow("Following")}>
                                            <div className="stat-value">{states?.detail?.players_profile?.following}</div>
                                            <div className="stat-label">Following</div>
                                        </div>
                                    </div>
                                    <Row className="mt-4 circular-icons-row mx-0" style={{ gap: '2px' }}>
                                        <Col xs={12} className="px-0">
                                            <Slider {...settings} className="align-left">

                                                {
                                                    states?.detail1?.data?.map((item) => (
                                                        <div>
                                                            <div className="d-flex flex-column align-items-center" onClick={() => toggleViewHighlightModal(item.media)}>
                                                                <div className="circular-icon" >
                                                                    {item.media.type === "image" ? (
                                                                        <img
                                                                            src={`${import.meta.env.VITE_BASE_URL_IMAGE}${item.media.media}`}
                                                                            alt="img"
                                                                            className="rounded-circle border"
                                                                            height={50}
                                                                            width={50}
                                                                        />
                                                                    ) : (
                                                                        <video
                                                                            src={`${import.meta.env.VITE_BASE_URL_IMAGE}${item.media.media}`}
                                                                            className="rounded-circle border"
                                                                            height={50}
                                                                            width={50}
                                                                        />
                                                                    )}
                                                                </div>
                                                                <div className="icon-label mt-1 text-center" style={{ fontSize: "12px" }}>{item.title}</div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </Slider>
                                        </Col>
                                    </Row>


                                </Col>
                            </Row>

                        </div>

                        {
                            states?.detail?.profile_type === "Basic" && (
                                <Row className="mt-5 align-items-center mx-0 mb-5">
                                    <Col xs={12}>
                                        <div
                                            style={{ cursor: "pointer" }}
                                            className=" d-flex align-items-center flex-row"

                                        >
                                            <div className="mb-3 me-3">
                                                <img src={`${import.meta.env.VITE_BASE_URL_IMAGE}${states?.detail?.profile_detail?.sport_picture}`} alt="qr" height={60} width={60} className=" rounded-circle" />
                                            </div>


                                            <div className="w-100 mb-3">
                                                <span>{states?.detail?.players_profile?.user?.full_name}</span>
                                                <span> - {states?.detail?.sport?.name}</span>
                                            </div>

                                        </div>
                                    </Col>
                                    <Col xs={12} className="back-color">
                                        {/* Detailed Information Section */}
                                        <div className="detailed-info-section mt-4">
                                            <div className="detailed-info-header d-flex justify-content-between align-items-center mb-2">
                                                <h6 className="section-title">Personal Information</h6>

                                            </div>
                                        </div>

                                        {/* Information Items */}
                                        <div className=" pb-3 " >
                                            <Row>
                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label className="pt-0">Name</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.players_profile?.user?.full_name || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label>Nickname</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.players_profile?.nick_name || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
<Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label className="pt-0">Player Id</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.players_profile?.player_id || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label>Gender</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.players_profile?.gender || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>

                                        </div>

                                        <div className="detailed-info-section mt-4">
                                            <div className="detailed-info-header d-flex justify-content-between align-items-center mb-2">
                                                <h6 className="section-title">Sport Information</h6>

                                            </div>
                                        </div>

                                        <div className="mt-2 mb-3">
                                            <Row>
                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label className="pt-0">Sport Name</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.sport?.name || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label className="pt-0">Team Name</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.profile_detail?.team_name || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label className="pt-0">Dominant Hand</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.profile_detail?.dominant_hand || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label className="pt-0">Position</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.profile_detail?.positions || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label className="pt-0">Jersey Number</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.profile_detail?.jersey_no || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>

                                        </div>


                                    </Col>

                                </Row>
                            )
                        }

                        {
                            states?.detail?.profile_type === "Advanced" && (
                                <Row className="mt-5 align-items-center mx-0 mb-5">
                                    <Col xs={12}>
                                        <div
                                            style={{ cursor: "pointer" }}
                                            className=" d-flex align-items-center flex-row"

                                        >
                                            <div className="mb-3 me-3">
                                                <img src={`${import.meta.env.VITE_BASE_URL_IMAGE}${states?.detail?.profile_detail?.sports_info?.sport_picture}`} alt="qr" height={60} width={60} className=" rounded-circle" />
                                            </div>


                                            <div className="w-100 mb-3">
                                                <span>{states?.detail?.players_profile?.user?.full_name}</span>
                                                <span> - {states?.detail?.sport?.name}</span>
                                            </div>

                                        </div>
                                    </Col>
                                    <Col xs={12} className="back-color">
                                        {/* Detailed Information Section */}
                                        <div className="detailed-info-section mt-4">
                                            <div className="detailed-info-header d-flex justify-content-between align-items-center mb-2">
                                                <h6 className="section-title">Personal Information</h6>

                                            </div>
                                        </div>

                                        {/* Information Items */}
                                        <div className=" pb-3 " >
                                            <Row>
                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label className="pt-0">Name</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.players_profile?.user?.full_name || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label>Nickname</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.players_profile?.nick_name || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label className="pt-0">Player Id</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.players_profile?.player_id || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label>Gender</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.players_profile?.gender || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={3}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label>Height</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.players_profile?.height?.feet || '-'}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={3}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label style={{ visibility: "hidden" }}>Nickname</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.players_profile?.height?.inches || '-'}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label>Weight</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.players_profile?.weight || '-'}
                                                        />
                                                    </div>
                                                </Col>
                                                {
                                                    states?.detail?.profile_detail?.social && (
                                                        <Col md={6}>
                                                            <div className="input-transparent-blur-fields">
                                                                <label>Socials</label>
                                                                <div>
                                                                    {states?.detail?.profile_detail?.social?.length ? (
                                                                        states?.detail?.profile_detail?.social.map((item, index) =>
                                                                            item.link && socialIconMap[item.type] ? (
                                                                                <a
                                                                                    key={index}
                                                                                    href={item.link}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                    className="text-white pe-2"
                                                                                    style={{ fontSize: '24px', stroke: "white" }}
                                                                                    title={item.type}
                                                                                >
                                                                                    {socialIconMap[item.type]}
                                                                                </a>
                                                                            ) : null
                                                                        )
                                                                    ) : (
                                                                        '-'
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    )
                                                }

                                            </Row>

                                        </div>

                                        <div className="detailed-info-section mt-4">
                                            <div className="detailed-info-header d-flex justify-content-between align-items-center mb-2">
                                                <h6 className="section-title">Sport Information</h6>

                                            </div>
                                        </div>

                                        <div className="mt-2 mb-3">
                                            <Row>
                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label className="pt-0">Sport Name</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.sport?.name || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label className="pt-0">Team Name</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.profile_detail?.sports_info?.team_name || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label className="pt-0">Dominant Hand</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.profile_detail?.sports_info?.dominant_hand || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label className="pt-0">Position</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.profile_detail?.sports_info?.positions || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label className="pt-0">Jersey Number</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.profile_detail?.sports_info?.jersey_no || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label className="pt-0">Email</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.profile_detail?.email || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label className="pt-0">Experience</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.profile_detail?.sports_info?.experience || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label className="pt-0">Upcoming Tournament/Events</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.profile_detail?.sports_info?.upcomming_events || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={12}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label className="pt-0">Bio</label>
                                                        <textarea
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.profile_detail?.bio || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>

                                        </div>

                                        <div className="detailed-info-section mt-4">
                                            <div className="detailed-info-header d-flex justify-content-between align-items-center mb-2">
                                                <h6 className="section-title">Career Stats</h6>

                                            </div>
                                        </div>
                                        <div className="mt-2 mb-3">
                                            <Row>
                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label className="pt-0">Awards</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.profile_detail?.career_stats?.awards || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label className="pt-0">Awards Highlights</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.profile_detail?.career_stats?.highlights || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>

                                        <div className="detailed-info-section mt-4">
                                            <div className="detailed-info-header d-flex justify-content-between align-items-center mb-2">
                                                <h6 className="section-title">Academic Information</h6>

                                            </div>
                                        </div>
                                        <div className="mt-2 mb-3">
                                            <Row>
                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label className="pt-0">School Name</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.profile_detail?.academic_info?.highschool || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label className="pt-0">Address</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.profile_detail?.academic_info?.address || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
                                                {
                                                    states?.detail?.profile_detail?.academic_info?.cgpa &&
                                                    <Col md={6}>
                                                        <div className="input-transparent-blur-fields">
                                                            <label className="pt-0">CGPA</label>
                                                            <input
                                                                className="w-100 input-transparent-blur"
                                                                type="text"
                                                                disabled
                                                                value={states?.detail?.profile_detail?.academic_info?.cgpa || 'N/A'}
                                                            />
                                                        </div>
                                                    </Col>
                                                }

                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label className="pt-0">Graduation Year</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.profile_detail?.academic_info?.year || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
                                                {
                                                    states?.detail?.profile_detail?.academic_info?.transcript &&
                                                    <Col md={6}>
                                                        <div className="input-transparent-blur-fields">
                                                            <label className="pt-0">Transcript </label>
                                                            <div

                                                                style={{ height: "45", cursor: "pointer" }}
                                                                className="w-100 input-transparent-blur d-flex justify-content-between align-items-center"
                                                            >
                                                                <label style={{ opacity: "30%" }}>
                                                                    {states?.detail?.profile_detail?.academic_info?.transcript}

                                                                </label>

                                                                <svg height={16} width={16} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style={{ cursor: "pointer" }} onClick={() => toggleViewHighlightModal({ type: "image", media: states?.detail?.profile_detail?.academic_info?.transcript })} >
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                }
                                            </Row>
                                        </div>

                                        <div className="detailed-info-section mt-4">
                                            <div className="detailed-info-header d-flex justify-content-between align-items-center mb-2">
                                                <h6 className="section-title">Recruitment Information</h6>

                                            </div>
                                        </div>
                                        <div className="mt-2 mb-3">
                                            <Row>
                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label className="pt-0">Preferred College</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.profile_detail?.recruiting_preferences?.preferred_college || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
                                                {
                                                    states?.detail?.profile_detail?.recruiting_preferences?.scholarship_offers &&
                                                    <Col md={6}>
                                                        <div className="input-transparent-blur-fields">
                                                            <label className="pt-0">Scholarship Offers</label>
                                                            <input
                                                                className="w-100 input-transparent-blur"
                                                                type="text"
                                                                disabled
                                                                value={states?.detail?.profile_detail?.recruiting_preferences?.scholarship_offers || 'N/A'}
                                                            />
                                                        </div>
                                                    </Col>
                                                }
                                                {
                                                    states?.detail?.profile_detail?.recruiting_preferences?.coach_trainer &&
                                                    <Col md={6}>
                                                        <div className="input-transparent-blur-fields">
                                                            <label className="pt-0">Coach & Trainer References</label>
                                                            <input
                                                                className="w-100 input-transparent-blur"
                                                                type="text"
                                                                disabled
                                                                value={states?.detail?.profile_detail?.recruiting_preferences?.coach_trainer || 'N/A'}
                                                            />
                                                        </div>
                                                    </Col>
                                                }
                                                {
                                                    states?.detail?.profile_detail?.recruiting_preferences?.coach_phone &&
                                                    <Col md={6}>
                                                        <div className="input-transparent-blur-fields">
                                                            <label className="pt-0">Coach Phone No.</label>
                                                            <input
                                                                className="w-100 input-transparent-blur"
                                                                type="text"
                                                                disabled
                                                                value={states?.detail?.profile_detail?.recruiting_preferences?.coach_phone || 'N/A'}
                                                            />
                                                        </div>
                                                    </Col>
                                                }

                                                {
                                                    states?.detail?.profile_detail?.recruiting_preferences?.coach_email &&
                                                    <Col md={6}>
                                                        <div className="input-transparent-blur-fields">
                                                            <label className="pt-0">Coach Email</label>
                                                            <input
                                                                className="w-100 input-transparent-blur"
                                                                type="text"
                                                                disabled
                                                                value={states?.detail?.profile_detail?.recruiting_preferences?.coach_email || 'N/A'}
                                                            />
                                                        </div>
                                                    </Col>
                                                }
                                                {
                                                    states?.detail?.profile_detail?.recruiting_preferences?.endorsement &&
                                                    <Col md={6}>
                                                        <div className="input-transparent-blur-fields">
                                                            <label className="pt-0">Endorsement by coaches/colleges</label>
                                                            <input
                                                                className="w-100 input-transparent-blur"
                                                                type="text"
                                                                disabled
                                                                value={states?.detail?.profile_detail?.recruiting_preferences?.endorsement || 'N/A'}
                                                            />
                                                        </div>
                                                    </Col>
                                                }

                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label className="pt-0">Athlete Direct Contact Info</label>
                                                        <input
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            disabled
                                                            value={states?.detail?.profile_detail?.recruiting_preferences?.direct_phone || 'N/A'}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="input-transparent-blur-fields">
                                                        <label className="pt-0">Scouting Report </label>
                                                        <div

                                                            style={{ height: "45", cursor: "pointer" }}
                                                            className="w-100 input-transparent-blur d-flex justify-content-between align-items-center"
                                                        >
                                                            <label style={{ opacity: "30%" }}>
                                                                {states?.detail?.profile_detail?.recruiting_preferences?.scouting_report}

                                                            </label>

                                                            <svg height={16} width={16} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style={{ cursor: "pointer" }} onClick={() => toggleViewHighlightModal({ type: "image", media: states?.detail?.profile_detail?.recruiting_preferences?.scouting_report })} >
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>

                                    </Col>

                                </Row>
                            )
                        }



                    </Container>


                </div>
            )}
            <ViewHighlightModal
                id={parseInt(searchParams.get("id"))}
                isOpen={states?.isViewHighlightModalOpen}
                toggle={toggleViewHighlightModal}
                image={states?.imageSelect}
                type={states?.imageType}
            />

            <FollowModal
                toggle={toggleFollow}
                isOpen={states?.modal5}
                follow_data={states?.follow_data}
            />
        </>
    )
}

export default PlayerSportDetails;

