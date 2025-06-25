import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { IoIosArrowBack } from 'react-icons/io'; // Back arrow icon
import { FaRegUserCircle, FaUpload } from 'react-icons/fa'; // Profile placeholder and upload icons
import { useMutation } from "@apollo/client";
import { COMPELETE_PROFILE } from "../../graphql/mutation";
import { useDispatch, useSelector } from 'react-redux';
import { CompeleteProfileUpOnSubmit } from "../../graphql/api-callings"; // Optional, for consistent handling
import { handleClearProfiles } from '../../redux/profileSlice';
import { setFullName, setPhone } from "../../redux/profileSlice";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import profile from "./../../assets/profile.png";


// You might need a library for phone input with country code, e.g., react-phone-input-2
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';


const CoachProfileDetailPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userRole = useSelector((state) => state.authSlice?.role)
     const userRole1 = useSelector(state => state?.authSlice?.user?.data?.meta?.meta?.coach_role)
    const userEmail = useSelector((state) => state.authSlice);

    console.log(userEmail?.user?.data?.email, 'email')
    // State for form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState(userEmail?.user?.data?.email);
    const [phoneNumber, setPhoneNumber] = useState(''); // Or use state for the phone input library
    const [role, setRole] = useState('Head'); // This should likely come from Redux/state based on previous selection
    const [profileImage, setProfileImage] = useState(null); // State for handling file upload
    const [completeProfile] = useMutation(COMPELETE_PROFILE);

    const phoneInputRef = useRef(null);
    const iti = useRef(null);

    useEffect(() => {
        if (phoneInputRef && phoneInputRef.current) {
            iti.current = window?.intlTelInput(phoneInputRef.current, {
                initialCountry: "us",
                utilsScript:
                    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
            });
        }

        return () => {
            if (iti.current) {
                iti.current.destroy();
            }
        };
    }, []);

    const createProfileSchema = yup.object().shape({
        name: yup.string().required("Please enter a name!"),
        phone: yup.string()
            .required("Please enter your phone number.")
            .matches(/^\d+$/, "Phone number must contain only digits.")
            .max(15, "Phone number must not exceed 15 digits.")
            .test("isValidPhoneNumber", "Enter a valid phone number", function (value) {
                return iti?.current?.isValidNumber() ?? false;
            })
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createProfileSchema),
    });

    const handleBack = () => {
        navigate(-1);
    };

    const handleImageUpload = (event) => {
        // Handle file upload logic here
        const file = event.target.files[0];
        if (file) {
            // You would typically upload this file to a server or process it
            console.log('Uploaded file:', file.name);
            setProfileImage(file); // Store the file object or a preview URL
        }
    };

    const handleNext = (data) => {
        console.log(userRole)
        if(userRole1){
            dispatch(setFullName(data.name));
            dispatch(setPhone(data.phone));
            navigate("/coach/create-team-coach");
        }
        else if (userRole === "Assistant" || userRole === "Coach") {
            const payload = {
                role: "Coach",
                Coach: {
                    coach_role: "Assistant",
                    full_name: data.name,
                    phone: data.phone
                },
            };

            CompeleteProfileUpOnSubmit(
                payload,
                completeProfile,
                navigate,
                handleClearProfiles,
                dispatch
            );
        } else {
            dispatch(setFullName(data.name));
            dispatch(setPhone(data.phone));
            navigate("/coach/create-team-coach");
        }
    };

    return (
        <div className="coach-profile-container">
            <Container>
                <Row className="pt-md-5 ">

                    <Col md={12}>
                        <h3 className="page-main-heading">Profile Creation</h3>
                    </Col>
                    <Col xs={12} className="d-flex justify-content-center">
                        {
                            userRole !== "Assistant" && (
                                <div className="my-4 d-flex justify-content-center input-transparent-blur1 py-sm-2 py-2 px-sm-4 px-3 mx-sm-0 mx-5 ">
                                    <svg width="100" height="22" viewBox="0 0 90 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                                        <line x1="21" y1="13.5" x2="65" y2="13.5" stroke="white" stroke-width="3" />


                                        <circle cx="12" cy="12" r="10" stroke="url(#paint0_linear)" stroke-width="4" />
                                        <circle cx="75" cy="12" r="10" stroke="white" stroke-width="4" />


                                        <circle cx="12" cy="12" r="3" fill="url(#paint1_linear)" />
                                        <circle cx="75" cy="12" r="3" fill="white" />
                                        <defs>
                                            <linearGradient id="paint0_linear" x1="0.001" y1="12" x2="24" y2="12" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#DDA027" />
                                                <stop offset="0.3198" stop-color="#CE9B2B" />
                                                <stop offset="0.6802" stop-color="#FEF48E" />
                                                <stop offset="1" stop-color="#FFD046" />
                                            </linearGradient>
                                            <linearGradient id="paint1_linear" x1="9" y1="12" x2="15" y2="12" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#DDA027" />
                                                <stop offset="0.3198" stop-color="#CE9B2B" />
                                                <stop offset="0.6802" stop-color="#FEF48E" />
                                                <stop offset="1" stop-color="#FFD046" />
                                            </linearGradient>
                                        </defs>
                                    </svg>


                                </div>
                            )
                        }

                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={12}>


                        <div className="coach-profile-card">
                            <div className="profile-image-upload mb-4">
                                <div className="profile-placeholder">
                                    {/* Display uploaded image or placeholder icon */}
                                    {profileImage ? (
                                        <img src={URL.createObjectURL(profileImage)} alt="Profile" className="uploaded-profile-img" />
                                    ) : (
                                        <FaRegUserCircle className="placeholder-icon" />
                                    )}
                                </div>
                                <Label htmlFor="upload-input" className="upload-button" style={{ color: "black", fontSize: "0.8rem" }}>
                                    <span className="pe-2">Upload Image</span>
                                    <FaUpload className="upload-icon" />
                                    <Input
                                        type="file"
                                        id="upload-input"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        hidden
                                    />
                                </Label>
                            </div>

                            <Form onSubmit={handleSubmit(handleNext)}>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="name" className="form-label">Name</Label>
                                            <Controller
                                                name="name"
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        id="name"
                                                        className="form-input"
                                                        placeholder="John Doe"
                                                    />
                                                )}
                                            />
                                            {errors?.name && (
                                                <p className="validation-text">{errors.name.message}</p>
                                            )}

                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="email" className="form-label">Email</Label>
                                            <Input
                                                type="email"
                                                name="email"
                                                id="email"
                                                disabled={true}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="form-input"
                                                placeholder="johndoe12@gmail.com"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="phoneNumber" className="form-label">Phone Number</Label>
                                            <div className="w-100">
                                                <Controller
                                                    name="phone"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            className="form-input"
                                                            ref={phoneInputRef}
                                                            id="phone"
                                                            type="tel"
                                                            name="phone"
                                                        />
                                                    )}
                                                />
                                                {errors?.phone && (
                                                    <p className="validation-text">
                                                        {errors?.phone?.message}
                                                    </p>
                                                )}
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="role" className="form-label">Role</Label>
                                            {/* Role input, likely disabled as it's selected previously */}
                                            
                                            <Input
                                                type="text"
                                                name="role"
                                                id="role"
                                                value={`${userRole1 || userRole} Coach`} // Display the role selected previously (Head Coach/Assistant Coach)
                                                className="form-input"
                                                disabled // Make it disabled as per design
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <div className='containerbutton'>
                                    <button type="submit" className="primary-btn mt-4 px-5 py-3">
                                        Next
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CoachProfileDetailPage;
