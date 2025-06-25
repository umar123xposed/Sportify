import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import './index.css';
import { FaExclamationCircle } from 'react-icons/fa';
import { IoCloseCircleOutline } from "react-icons/io5";

const RolePolicyModal = ({ isOpen, toggle, onContinue }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} centered className="role-policy-modal" size='lg'>
            <ModalBody className="role-policy-modal-body">
                <div className="modal-close-icon" onClick={toggle}>
                    <IoCloseCircleOutline />
                </div>
                <div className="policy-section">
                    <div className="policy-header">
                        <FaExclamationCircle className="info-icon" />
                        <h3>Important Role Policy</h3>
                    </div>
                    <p>
                        Once you select a role (Head Coach or Assistant Coach) during registration, it cannot be changed later.
                        Please choose your role carefully based on your responsibilities and access requirements.
                    </p>
                </div>
                <hr />

                <div className="role-section">
                    <div className="role-title">
                         {/* Placeholder for Head Coach Icon */}
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        <h4>Head Coach</h4>
                    </div>
                    <p>A Head Coach is the primary account holder responsible for team creation, management, and administration.</p>
                    <h5>Head Coach Rights:</h5>
                    <ul>
                        <li>✓ Enter an Organization Code (in case of Multi-Team Plan) to join a school account</li>
                        <li>✓ Purchase and manage subscription plans (Single Team or Multi-Team Plan)</li>
                        <li>✓ Create and manage team(s)</li>
                        <li>✓ Add/remove players & other coaches</li>
                        <li>✓ Invite Assistant Coaches via email</li>
                    </ul>
                </div>
                <hr />

                <div className="role-section">
                    <div className="role-title">
                         {/* Placeholder for Assistant Coach Icon */}
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        <h4>Assistant Coach</h4>
                    </div>
                    <p>An Assistant Coach is a supporting team member, invited by a Head Coach to help manage team operations.</p>
                    <h5>Assistant Coach Rights:</h5>
                    <p>Access invited team(s) only</p>
                    <h6>View and manage:</h6>
                    <ul>
                        <li>✓ Player data</li>
                        <li>✓ Playbooks (as delegated by Head Coach)</li>
                        <li>✓ Fan Club section</li>
                    </ul>
                    <h6>Cannot:</h6>
                     <ul>
                        <li>✕ Create or manage teams</li>
                        <li>✕ Purchase plans</li>
                        <li>✕ Invite other coaches</li>
                    </ul>
                </div>

                <div className="continue-button-container">
                     <button className="continue-button" onClick={onContinue}>
                        Continue
                    </button>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default RolePolicyModal;
