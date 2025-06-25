import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Modal, ModalBody } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleRole } from '../../redux/authSlice'; // Assuming you want to update the specific coach role in Redux
import { setCoachAction, setCode } from '../../redux/profileSlice';
import './index.css';
import { FaUsers, FaUser } from 'react-icons/fa'; // Icons for Head Coach and Assistant Coach
import { FaExclamationCircle } from 'react-icons/fa';
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoIosArrowBack } from 'react-icons/io';
import { useMutation } from "@apollo/client";
import { COMPELETE_PROFILE } from "../../graphql/mutation";
import { CompeleteProfileUpOnSubmit } from "../../graphql/api-callings"; // Optional, for consistent handling
import { handleClearProfiles } from "../../redux/profileSlice"; // If you want to clear profile after
import toast from 'react-hot-toast';
import Loader from "react-spinner-loader"



const SelectCoachPositionPage = () => {

    const role = useSelector(state => state?.authSlice?.role)
    console.log(role)

    const [selectedPosition, setSelectedPosition] = useState(null);
    const [isOpen, setIsOpen] = useState(false)
    const [isClubOpen, SetIsClubOpen] = useState(false)
    const [codename, setCodename] = useState("")
    const [loader, setLoader] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [completeProfile] = useMutation(COMPELETE_PROFILE);

    useEffect(() => {
        if (role == "Head" || role == "Assistant" ) {
            navigate("/coach/join-organization")
        }
    }, [role])

    const toggle = () => {
        if (isOpen) {
            setIsOpen(!isOpen)
        }
        setIsOpen(!isOpen)

    }

    const handlePositionSelect = (position) => {
        setSelectedPosition(position);
    };



    const handleNextClick = () => {

        if (selectedPosition) {
            toggle()
        } else {
            // Optionally show a message to the user to select a position
            alert("Please select a position to continue.");
        }
    };

    const onContinue = async () => {

        if (selectedPosition === "Assistant") {
            dispatch(handleRole(selectedPosition));
            navigate("/coach/create-coach-profile")
        }
        else if (selectedPosition === "Head") {
            try {
                setLoader(true)
                const { data } = await completeProfile({
                    variables: {
                        input: {
                            role: "Coach",
                            Coach: {
                                coach_role: selectedPosition,
                            },
                        }
                    }
                })

                if (data) {
                    dispatch(handleRole(selectedPosition));
                    console.log("is assistant?", selectedPosition)
                    setLoader(false)

                    navigate("/coach/join-organization")

                    // if (isClubOpen) {
                    //     SetIsClubOpen(!isClubOpen)
                    // }
                    // SetIsClubOpen(!isClubOpen)

                    toast.success(data?.completeProfile?.message)

                }

            } catch (e) {
                console.log(e)
                setLoader(false)
            }
        }




    }

    const handleCreateNew = () => {
        dispatch(setCoachAction("Create"));
        navigate("/coach/select-organization"); // Replace with actual path
    };
    const handleExisting = () => {
        dispatch(setCoachAction("Join"))
        dispatch(setCode(codename))
        navigate("/coach/create-coach-profile");
    }

    return (
        <>

            <Container className='main'>


                <h2 className="text-center mb-4">Choose Your Role</h2>
                <div className="select-coach-position-card">
                    <div
                        className={`position-option`}
                        onClick={() => handlePositionSelect('Head')}
                    >
                        <div className="option-content">
                            <FaUsers className="position-icon" />
                            <span className='px-1'>I am a Head Coach</span>
                        </div>
                        <div className="radio-button">
                            {selectedPosition === 'Head' && <div className="radio-inner"></div>}
                        </div>
                    </div>
                    <div
                        className={`position-option`}
                        onClick={() => handlePositionSelect('Assistant')}
                    >
                        <div className="option-content">
                            <FaUser className="position-icon" />
                            <span className='px-1'>I am an Assistant Coach or Team Support Role</span>
                        </div>
                        <div>
                            <div className="radio-button">
                                {selectedPosition === 'Assistant' && <div className="radio-inner"></div>}
                            </div>
                        </div>
                    </div>
                    <div className='w-100 d-flex justify-content-center'>
                        <Button
                            className="next-button"
                            onClick={handleNextClick}
                            disabled={!selectedPosition} // Disable button until a position is selected
                        >
                            Next
                        </Button>
                    </div>
                </div>


            </Container>
            <Modal isOpen={isOpen} toggle={toggle} centered className="role-policy-modal" size='md'>
                <ModalBody className="role-policy-modal-body">
                    <div className="modal-close-icon" onClick={toggle}>
                        <IoCloseCircleOutline />
                    </div>
                    <div className="policy-section">
                        <div className="policy-header">
                            <FaExclamationCircle className="info-icon" />
                            <h3>Important Role Policy</h3>
                        </div>
                    </div>


                    <div className="role-section">

                        <p>You have chosen the role of <strong>{selectedPosition == "Head" ? "Head Coach" : "Assistant Coach/Team Support Role"}</strong>.</p>
                        <p>Are you sure you wish to continue? This selection cannot be changed later.</p>
                    </div>



                    <div className="continue-button-container">
                        <button className='back-button' onClick={toggle}>Change Role</button>

                        <button type="submit" className="continue-button d-flex gap-2 align-items-center justify-content-center" disabled={loader} style={{ opacity: loader && "0.6" }} onClick={onContinue}>
                            Yes! I'm sure
                            {
                                loader &&
                                (<Loader show={true}
                                    spinnerSize="16px"
                                    radius="10"

                                    color="red"
                                />)
                            }
                        </button>
                    </div>
                </ModalBody>
            </Modal>


            <Modal isOpen={isClubOpen} toggle={() => SetIsClubOpen(false)} centered className="folder-modal">
                <div className="folder-modal-content">

                    <div className="folder-modal-label">Enter Club Code</div>
                    <input
                        className="folder-modal-input"
                        type="text"
                        value={codename}
                        onChange={e => setCodename(e.target.value)}
                        placeholder="Enter Code to Join Existing Organization"
                    />
                    <div className="folder-modal-actions">
                        <button className="folder-modal-cancel" onClick={handleCreateNew}>Create New</button>
                        <button className="folder-modal-create" disabled={!codename} onClick={handleExisting}>Join Existing</button>
                    </div>
                </div>
            </Modal>
        </>


    );
};

export default SelectCoachPositionPage;
