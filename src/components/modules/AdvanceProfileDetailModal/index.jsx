import React, { useState } from 'react';
import { Modal, ModalBody, Row, Col } from 'reactstrap';
import './index.css'; // We will create this CSS file next
import qr from "./../../../assets/qr.png";
import right_qr from "./../../../assets/right_qr.png";
import QrCode from '../../elements/qr-card';
import ViewHighlightModal from '../../elements/view-highlight';
import {
    FaXTwitter,
    FaInstagram,
    FaYoutube,
    FaTiktok,

} from 'react-icons/fa6'; // Fa6 includes FaXTwitter (the new Twitter logo)
import { useSelector } from 'react-redux';

const socialIconMap = {
    Twitter: <FaXTwitter />,
    Instagram: <FaInstagram />,
    Youtube: <FaYoutube />,
    Tiktok: <FaTiktok />,

};

const AdvanceProfileDetailModal = ({
    isOpen,
    toggle,
    playerData, // Data for the player
    basicSportData, // Data for the specific basic sport displayed
    onUpgradeClick,
    onGenerateQrClick,
    onEditDetailedInfoClick,
    onEditDetailedInfoClick1,
    onEditDetailedInfoClick2,
    onEditDetailedInfoClick3,
    onEditData
}) => {

    console.log(playerData)

    const role = useSelector(state => state?.authSlice?.role)

    const [modal, setModal] = useState(false)
    const [modalUpdateProfile, setModalUpdateProfile] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false)
    const [image, setImage] = useState()

    const toggle1 = (img) => {
        if (isOpen1) {
            setImage()
        }
        else {
            setImage(img)
        }
        setIsOpen1(!isOpen1)
    }

    // Placeholder for the right arrow SVG
    const RightArrowIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
        </svg>
    );

    // Placeholder for the Edit Icon SVG
    const EditIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.68l-2.754-2.754L13.793.146a.5.5 0 0 1 .707 0z" />
            <path fillRule="evenodd" d="M1.5 13.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1H2v-4a.5.5 0 0 0-1 0v4a1.5 1.5 0 0 0 1.5 1.5m11-11a.5.5 0 0 0 0-1h-4a.5.5 0 0 0 0 1z" />
            <path d="m13.498 8.62 2.755-2.755L10.941 3.12 8.186 5.876z" />
            <path fillRule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h6.5v1H2a1.5 1.5 0 0 1-1.5-1.5V7h1v6.5z" />
        </svg>
    );

    const toggleUpdate = () => setModal(!modalUpdateProfile);

    const handleEdit = (info) => {
        onEditData({ ...info, id: basicSportData?.id })
        onEditDetailedInfoClick()

    }

    const handleEdit1 = (info) => {
        onEditData({ ...info, id: basicSportData?.id })
        onEditDetailedInfoClick1()

    }

    const handleEdit2 = (info) => {
        onEditData({ ...info, id: basicSportData?.id })
        onEditDetailedInfoClick2()

    }

    const handleEdit3 = (info) => {
        onEditData({ ...info, id: basicSportData?.id })
        onEditDetailedInfoClick3()

    }


    return (
        <>
            <Modal isOpen={isOpen} toggle={toggle} centered className="basic-profile-modal">
                <ModalBody className="modal-body-content" style={{ backgroundColor: "#5353538f" }}> {/* Use class for styling */}
                    {/* Close Button */}
                    <button className="close-button d-flex justify-content-center align-items-center" onClick={toggle}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                        </svg>
                    </button>

                    {/* Modal Title and Upgrade Button */}
                    <div className="modal-header-content d-flex justify-content-between align-items-center">
                        <h5 className="modal-title">QR Code</h5>
                        {/* <button className="upgrade-button" onClick={onUpgradeClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5" />
            </svg>
            Upgrade
          </button> */}
                    </div>

                    {/* Generate QR Code Section */}
                    <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            // console.log(currentChild?.user?.id)
                            // playerQRCode({
                            //   variables: {
                            //     input: {
                            //       user_id: currentChild?.user?.id,
                            //     },
                            //   },
                            // });
                            setModalUpdateProfile(true);
                        }}
                        className="gold_card w-100 my-3 pe-3"
                    >
                        <Row className="">
                            <Col className=" bg-right " md={6}>
                                <div className="ms-3 h-100 d-flex align-items-center">
                                    <img className="me-3" src={qr} />
                                    <h3>View QR Code </h3>
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

                    {/* Detailed Information Section */}
                    <div className="detailed-info-section mt-4">
                        <div className="detailed-info-header d-flex justify-content-between align-items-center mb-2">
                            <h6 className="section-title">Personal Information</h6>

                        </div>
                    </div>

                    {/* Information Items */}
                    <div className="mt-2" style={{ backgroundColor: "white", borderRadius: "8px", overflow: "hidden" }}>
                        <div className="info-item d-flex justify-content-between">
                            <span className="item-label">Name</span>
                            <span className="item-value">{playerData?.user?.full_name || 'N/A'}</span>
                        </div>
                        <div className="info-item d-flex justify-content-between">
                            <span className="item-label">Nickname</span>
                            <span className="item-value">{playerData?.nick_name || 'N/A'}</span>
                        </div>
                    </div>

                    <div className="detailed-info-section mt-4">
                        <div className="detailed-info-header d-flex justify-content-between align-items-center mb-2">
                            <h6 className="section-title">Sport Details</h6>
                            {
                                (role === "Parent" || role === "Athlete") && (
                                    <button className="edit-button" onClick={() => handleEdit(basicSportData)}>
                                        <svg height={16} width={16} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                        Edit
                                    </button>
                                )
                            }

                        </div>

                    </div>

                    <div className="mt-2 mb-3" style={{ backgroundColor: "white", borderRadius: "8px", overflow: "hidden" }}>
                        <div className="info-item d-flex justify-content-between">
                            <span className="item-label">Sport Name</span>
                            {/* Display basicSportData?.type if available, otherwise N/A */}
                            <span className="item-value">{basicSportData?.sport?.name || 'N/A'}</span>
                        </div>
                        {/* <div className="info-item d-flex justify-content-between no-border"> 
                            <span className="item-label">Image</span>
                            <span className="item-value">{basicSportData?.profile_detail?.sports_info?.team_name || 'N/A'}</span>
                        </div> */}
                        <div className="info-item d-flex justify-content-between">
                            <span className="item-label">Dominant Hand</span>
                            <span className="item-value">{basicSportData?.profile_detail?.sports_info?.dominant_hand || 'N/A'}</span> {/* Adjust field name if needed */}
                        </div>
                        <div className="info-item d-flex justify-content-between">
                            <span className="item-label">Position</span>
                            {/* Join positions if it's an array */}
                            <span className="item-value">{basicSportData?.profile_detail?.sports_info?.positions?.join(', ') || 'N/A'}</span>
                        </div>
                        <div className="info-item d-flex justify-content-between">
                            <span className="item-label">Jersey Number</span>
                            <span className="item-value">{basicSportData?.profile_detail?.sports_info?.jersey_no || 'N/A'}</span>
                        </div>
                        <div className="info-item d-flex justify-content-between no-border"> {/* Add no-border class to the last item */}
                            <span className="item-label">Team Name</span>
                            <span className="item-value">{basicSportData?.profile_detail?.sports_info?.team_name || 'N/A'}</span>
                        </div>
                        <div className="info-item d-flex justify-content-between no-border"> {/* Add no-border class to the last item */}
                            <span className="item-label">Experience</span>
                            <span className="item-value">{basicSportData?.profile_detail?.sports_info?.experience || 'N/A'}</span>
                        </div>
                        <div className="info-item d-flex justify-content-between no-border"> {/* Add no-border class to the last item */}
                            <span className="item-label">Email</span>
                            <span className="item-value">{basicSportData?.profile_detail?.email || 'N/A'}</span>
                        </div>
                        <div className="info-item d-flex justify-content-between no-border"> {/* Add no-border class to the last item */}
                            <span className="item-label">Bio</span>
                            <span className="item-value">{basicSportData?.profile_detail?.bio || 'N/A'}</span>
                        </div>
                        <div className="info-item d-flex justify-content-between no-border"> {/* Add no-border class to the last item */}
                            <span className="item-label">Socials</span>
                            <span className="item-value d-flex gap-2 align-items-center">
                                {basicSportData?.profile_detail?.social?.length ? (
                                    basicSportData.profile_detail.social.map((item, index) =>
                                        item.link && socialIconMap[item.type] ? (
                                            <a
                                                key={index}
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-white"
                                                style={{ fontSize: '24px', stroke: "white" }}
                                                title={item.type}
                                            >
                                                {socialIconMap[item.type]}
                                            </a>
                                        ) : null
                                    )
                                ) : (
                                    'N/A'
                                )}
                            </span>
                        </div>
                        <div className="info-item d-flex justify-content-between no-border"> {/* Add no-border class to the last item */}
                            <span className="item-label">Upcoming Tournament/Events</span>
                            <span className="item-value">
                                {(basicSportData?.profile_detail?.sports_info?.upcomming_events || 'N/A')
                                    .split('\n')
                                    .map((line, index) => (
                                        <React.Fragment key={index}>
                                            {line}
                                            <br />
                                        </React.Fragment>
                                    ))}
                            </span>
                        </div>

                    </div>

                    <div className="detailed-info-section mt-4">
                        <div className="detailed-info-header d-flex justify-content-between align-items-center mb-2">
                            <h6 className="section-title">Career Stats</h6>
                            {
                                (role === "Parent" || role === "Athlete") && (
                                    <button className="edit-button" onClick={() => handleEdit1(basicSportData)}>
                                        <svg height={16} width={16} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                        Edit
                                    </button>
                                )
                            }

                        </div>
                    </div>

                    <div className="mt-2 mb-3" style={{ backgroundColor: "white", borderRadius: "8px", overflow: "hidden" }}>
                        <div className="info-item d-flex justify-content-between">
                            <span className="item-label">Awards</span>
                            {/* Display basicSportData?.type if available, otherwise N/A */}
                            <span className="item-value">
                                {(basicSportData?.profile_detail?.career_stats?.awards || 'N/A')
                                    .split('\n')
                                    .map((line, index) => (
                                        <React.Fragment key={index}>
                                            {line}
                                            <br />
                                        </React.Fragment>
                                    ))}
                            </span>
                        </div>
                        <div className="info-item d-flex justify-content-between no-border"> {/* Add no-border class to the last item */}
                            <span className="item-label">Awards Highlights</span>
                            <span className="item-value">
                                {(basicSportData?.profile_detail?.career_stats?.highlights || 'N/A')
                                    .split('\n')
                                    .map((line, index) => (
                                        <React.Fragment key={index}>
                                            {line}
                                            <br />
                                        </React.Fragment>
                                    ))}
                            </span>

                        </div>
                    </div>

                    <div className="detailed-info-section mt-4">
                        <div className="detailed-info-header d-flex justify-content-between align-items-center mb-2">
                            <h6 className="section-title">Academic Information</h6>
                            {
                                (role === "Parent" || role === "Athlete") && (
                                    <button className="edit-button" onClick={() => handleEdit2(basicSportData)}>
                                        <svg height={16} width={16} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                        Edit
                                    </button>
                                )
                            }

                        </div>
                    </div>


                    <div className="mt-2 mb-3" style={{ backgroundColor: "white", borderRadius: "8px", overflow: "hidden" }}>
                        <div className="info-item d-flex justify-content-between">
                            <span className="item-label">School name</span>
                            {/* Display basicSportData?.type if available, otherwise N/A */}
                            <span className="item-value">{basicSportData?.profile_detail?.academic_info?.highschool || 'N/A'}</span>
                        </div>
                        <div className="info-item d-flex justify-content-between no-border"> {/* Add no-border class to the last item */}
                            <span className="item-label">Address</span>
                            <span className="item-value">{basicSportData?.profile_detail?.academic_info?.address || 'N/A'}</span>
                        </div>
                        <div className="info-item d-flex justify-content-between no-border"> {/* Add no-border class to the last item */}
                            <span className="item-label">CGPA</span>
                            <span className="item-value">{basicSportData?.profile_detail?.academic_info?.cgpa || 'N/A'}</span>
                        </div>
                        <div className="info-item d-flex justify-content-between no-border"> {/* Add no-border class to the last item */}
                            <span className="item-label">Graduation Year</span>
                            <span className="item-value">{basicSportData?.profile_detail?.academic_info?.year || 'N/A'}</span>
                        </div>
                        <div className="info-item d-flex justify-content-between no-border"> {/* Add no-border class to the last item */}
                            <span className="item-label">Transcript</span>
                            <span className="item-value">
                                {
                                    basicSportData?.profile_detail?.academic_info?.transcript ? (
                                        <svg height={16} width={16} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style={{ cursor: "pointer" }} onClick={() => toggle1(basicSportData?.profile_detail?.academic_info?.transcript)}>
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    ) : (
                                        "-"
                                    )
                                }

                            </span>
                            {/* <span className="item-value">{basicSportData?.profile_detail?.academic_info?.transcript || 'N/A'}</span> */}
                        </div>
                    </div>

                    <div className="detailed-info-section mt-4">
                        <div className="detailed-info-header d-flex justify-content-between align-items-center mb-2">
                            <h6 className="section-title">Recruitment Information</h6>
                            {
                                (role === "Parent" || role === "Athlete") && (
                                    <button className="edit-button" onClick={() => handleEdit3(basicSportData)}>
                                        <svg height={16} width={16} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                        Edit
                                    </button>
                                )
                            }

                        </div>
                    </div>

                    <div className="mt-2 mb-3" style={{ backgroundColor: "white", borderRadius: "8px", overflow: "hidden" }}>
                        <div className="info-item d-flex justify-content-between">
                            <span className="item-label">Preferred College</span>
                            {/* Display basicSportData?.type if available, otherwise N/A */}
                            <span className="item-value">{basicSportData?.profile_detail?.recruiting_preferences?.preferred_college || 'N/A'}</span>
                        </div>
                        <div className="info-item d-flex justify-content-between">
                            <span className="item-label">College Committed</span>
                            {/* Display basicSportData?.type if available, otherwise N/A */}
                            <span className="item-value">{basicSportData?.profile_detail?.recruiting_preferences?.college_committed ? "Yes" : "No" || 'N/A'}</span>
                        </div>
                        <div className="info-item d-flex justify-content-between no-border"> {/* Add no-border class to the last item */}
                            <span className="item-label">Scholarship Offers</span>
                            <span className="item-value">{basicSportData?.profile_detail?.recruiting_preferences?.scholarship_offers || 'N/A'}</span>
                        </div>
                        <div className="info-item d-flex justify-content-between no-border"> {/* Add no-border class to the last item */}
                            <span className="item-label">Coach Trainer References</span>
                            <span className="item-value">{basicSportData?.profile_detail?.recruiting_preferences?.coach_trainer || 'N/A'}</span>
                        </div>
                        <div className="info-item d-flex justify-content-between no-border"> {/* Add no-border class to the last item */}
                            <span className="item-label">Coach Email</span>
                            <span className="item-value">{basicSportData?.profile_detail?.recruiting_preferences?.coach_email || 'N/A'}</span>
                        </div>
                        <div className="info-item d-flex justify-content-between no-border"> {/* Add no-border class to the last item */}
                            <span className="item-label">Coach Phone No.</span>
                            <span className="item-value">{basicSportData?.profile_detail?.recruiting_preferences?.coach_phone || 'N/A'}</span>
                        </div>
                        <div className="info-item d-flex justify-content-between no-border"> {/* Add no-border class to the last item */}
                            <span className="item-label">Endorsement by coaches/colleges</span>
                            <span className="item-value">{basicSportData?.profile_detail?.recruiting_preferences?.endorsement || 'N/A'}</span>
                        </div>
                        <div className="info-item d-flex justify-content-between no-border"> {/* Add no-border class to the last item */}
                            <span className="item-label">Athlete Direct Contact Info</span>
                            <span className="item-value">{basicSportData?.profile_detail?.recruiting_preferences?.direct_phone || 'N/A'}</span>
                        </div>
                        <div className="info-item d-flex justify-content-between no-border"> {/* Add no-border class to the last item */}
                            <span className="item-label">Scouting Report</span>
                            <span className="item-value">
                                {
                                    basicSportData?.profile_detail?.recruiting_preferences?.scouting_report ? (
                                        <svg height={16} width={16} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style={{ cursor: "pointer" }} onClick={() => toggle1(basicSportData?.profile_detail?.recruiting_preferences?.scouting_report)}>
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    ) : (
                                        "-"
                                    )
                                }

                            </span>
                            {/* <span className="item-value">{basicSportData?.profile_detail?.recruiting_preferences?.scouting_report || 'N/A'}</span> */}
                        </div>

                    </div>


                </ModalBody>
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
                        <Col xl={4} lg={3} sm={2} xs={1} />
                        <Col xl={4} lg={6} sm={8} xs={10}>
                            <QrCode title={"Buy QR"} state={setModalUpdateProfile} qr={basicSportData} user={playerData?.user} />
                        </Col>
                        <Col xl={4} lg={3} sm={2} xs={1} />
                    </Row>
                </div>
            </Modal>
            <ViewHighlightModal
                isOpen={isOpen1}
                toggle={toggle1}
                image={`${import.meta.env.VITE_BASE_URL_IMAGE}${image}`}
                type="image"
            />
        </>
    );
};

export default AdvanceProfileDetailModal;
