// import "./index.css";
import { Col, Container, Modal, Row } from "reactstrap";
import forword from "./../../../assets/who-we-are-for.png";
import twitter from "./../../../assets/twitter.png";
import insta from "./../../../assets/instagram.png";
import fg from "./../../../assets/fg.png";
import youtube from "./../../../assets/youtube.png";
import tiktok from "./../../../assets/tiktok.png";
import profile from "./../../../assets/profile.png";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as yup from "yup";

import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, set, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { UPDATE_CHILD_ACCOUNT, UPDATE_CHILD_SPORT } from "../../../graphql/mutation";
import { UpdateChildOnSubmit, UpdateChildSportOnSubmit } from "../../../graphql/api-callings";
import toast from "react-hot-toast";
import Loader from "react-spinner-loader"
//import { handleCreateBasicProfile } from "../../redux/profileSlice";

const EditAcademicSportModal = ({
    refetchPlayers,
    setShow,
    toggle,
    toggle1,
    isOpen,
    data,
    refetch,
    sportData,
    setActive,
    active
}) => {

    console.log(sportData)
    const [updateChildProfile] =
        useMutation(UPDATE_CHILD_SPORT);


    const schema =
        yup.object().shape({
            year: yup
                .string()
                .matches(/^\d{4}$/, "Year must be 4 digits")
                .required("Year is required"),
            highschool: yup
                .string()
                .min(4, "At least 4 Characters required")
                .required("Required"),
            address: yup
                .string()
                .min(4, "At least 4 Characters required")
                .required("Required"),
            gpa: yup
                .number()
                .typeError("Please enter a valid number")
                .nullable()
                .transform((value, originalValue) => {
                    // Convert empty string to null
                    return originalValue === "" ? null : value;
                })
                ,
            transcript: yup
                .mixed()
                .nullable()
                .test(
                    "fileType",
                    "Only JPG, PNG, and JPEG formats are allowed",
                    (value) => {
                        if (!value) return true; // Field is optional
                        return ["image/jpeg", "image/png", "image/jpg"].includes(
                            value.type
                        );
                    }
                )
                .test("fileSize", "File size must be less than 2MB", (value) => {
                    if (!value) return true; // Field is optional
                    return value.size <= 2 * 1024 * 1024; // 2MB limit
                }),
        })

    const {
        register,
        handleSubmit,
        control,
        setValue,
        trigger,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),

        mode: "onChange",
    });
    const [change, setOnchange] = useState(true)
    const [transcriptFile, setTrancriptfile] = useState(null);
    const [loader, setLoader] = useState(false)


    useEffect(() => {
        if (sportData) {

            if (sportData?.profile_detail?.academic_info?.year) {
                setValue("year", sportData?.profile_detail?.academic_info?.year);
            }
            if (sportData?.profile_detail?.academic_info?.highschool) {
                setValue("highschool", sportData?.profile_detail?.academic_info?.highschool);
            }
            if (sportData?.profile_detail?.academic_info?.address) {
                setValue("address", sportData?.profile_detail?.academic_info?.address);
            }
            if (sportData?.profile_detail?.academic_info?.cgpa) {
                setValue("gpa", sportData?.profile_detail?.academic_info?.cgpa);
            }
            
            if (sportData?.profile_detail?.academic_info?.transcript) {
                setTrancriptfile(sportData?.profile_detail?.academic_info?.transcript)
               console.log("trans",sportData?.profile_detail?.academic_info?.transcript)
                setValue("transcript", null);
            }


            setOnchange(true)
        }
    }, [data, isOpen]);

 



    const onSubmit = async (updateData) => {



        const payload = {
            "id": parseInt(sportData?.id),
            "profile_detail": {
                "advanced": {
                    "academic_info": {
                        "address": updateData?.address,
                        "cgpa": updateData?.gpa,
                        "highschool": updateData?.highschool,
                        "year": updateData?.year,
                        "transcript" : updateData?.transcript ? updateData?.transcript : null
                    },
                }
            },
            "profile_type": "Advanced"
        }


        console.log(payload, updateData, "updated 12");

        // try {
        //     await UpdateChildSportOnSubmit(payload, updateChildProfile, toggle, refetch, refetchPlayers);

        // } catch (error) {
        //     console.error("Error updating child and refetching players:", error);
        // }
        
        try {
setLoader(true)
            const { data } = await updateChildProfile({
                variables: {
                    input: payload
                },
                "fetch-policy": "no-cache"
            })

            if (data) {
                setLoader(false)
                console.log(data, "asdfghj3456")
                toast.success(data?.updateSportsProfile?.message)
                setActive(!active)
                toggle()
                toggle1()
                // dispatch(handleClearProfile())
                // if ((userRole === "Parent")) {
                //     navigate(`/parent/payment-success`)
                // }
                // if ((userRole === "Athlete")) {
                //     navigate(`/athlete/payment-success`)
                // }
                // setLoader(false)
            }

        } catch (e) {
            console.log(e)
            setLoader(false)
        }
    };

    const handleToggle = () => {
        reset()
        toggle()
    }


    return (
        <>
            <Modal size="xl" centered isOpen={isOpen} toggle={handleToggle}>
                <div className="solid-card">
                    <div className="d-flex justify-content-end  mb-3">
                        <svg
                            style={{
                                cursor: "pointer",
                            }}
                            onClick={handleToggle}
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

                    <form onSubmit={handleSubmit(onSubmit)}>



                        <Row>
                            <Col md={1} />
                            <Col md={5}>
                                <div className="detailed-info-section mt-4">
                                    <div className="detailed-info-header d-flex justify-content-between align-items-center">
                                        <h6 className="section-title">Academic Info</h6>

                                    </div>
                                </div>
                            </Col>

                        </Row>

                        <Row>
                            <Col md={1} />
                            <Col md={5}>
                                <div className="basic-inputs input-card">
                                    <div className="input-transparent-blur-fields">
                                        <label> School Name </label>
                                        <div className="w-100">
                                            <div>
                                                <Controller
                                                    name="highschool"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            alt="text"
                                                            placeholder="School Name"
                                                        />
                                                    )}
                                                />

                                                {errors?.highschool && (
                                                    <p className="validation-text">
                                                        {errors?.highschool.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={5}>
                                <div className="basic-inputs input-card">
                                    <div className="input-transparent-blur-fields">
                                        <label>School Address</label>
                                        <div className="w-100">
                                            <Controller
                                                name="address"
                                                control={control}
                                                render={({ field }) => (
                                                    <div>
                                                        <input
                                                            {...field}
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            alt="text"
                                                            placeholder="Address"
                                                        />

                                                        {errors?.address && (
                                                            <p className="validation-text">
                                                                {errors?.address.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </Col>
                            <Col md={1} />
                            <Col md={1} />
                            <Col md={5}>
                                <div className="basic-inputs input-card">
                                    <div className="input-transparent-blur-fields">
                                        <label> Graduation Year </label>
                                        <div className="w-100">
                                            <Controller
                                                name="year"
                                                control={control}
                                                render={({ field }) => (
                                                    <input
                                                        {...field}
                                                        className="w-100 input-transparent-blur"
                                                        type="text"
                                                        alt="text"
                                                        placeholder="Graduation Year"
                                                    />
                                                )}
                                            />

                                            {errors?.year && (
                                                <p className="validation-text">
                                                    {errors?.year.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={5}>
                                <div className="basic-inputs input-card w-100">
                                    <div className="input-transparent-blur-fields w-100">
                                        <label>CGPA ( Optional )</label>
                                        {/* <PhoneInput placeholder="Enter your number" defaultCountry="PK" {...field} onChange={(data) => field.onChange(data)} /> */}
                                        <div className="w-100">
                                            <Controller
                                                name="gpa"
                                                control={control}
                                                render={({ field }) => (
                                                    <div>
                                                        <input
                                                            {...field}
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            alt="text"
                                                            placeholder="GPA"
                                                        />

                                                        {errors?.gpa && (
                                                            <p className="validation-text">
                                                                {errors?.gpa.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={1} />
                            <Col md={1} />
                            <Col md={5}>
                                <div className="basic-inputs input-card w-100">
                                    <div className="input-transparent-blur-fields w-100">
                                        <label>Transcript ( Optional )</label>
                                        {/* <PhoneInput placeholder="Enter your number" defaultCountry="PK" {...field} onChange={(data) => field.onChange(data)} /> */}
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                document.getElementById("transcript").click();
                                            }}
                                            style={{ height: "45", cursor: "pointer" }}
                                            className="w-100 input-transparent-blur d-flex justify-content-between align-items-center"
                                        >
                                            <label style={{ opacity: "30%" }}>
                                                {transcriptFile ? transcriptFile : "Upload"}{" "}
                                            </label>
                                            <Controller
                                                name="transcript"
                                                control={control}
                                                render={({ field }) => (
                                                    <div>
                                                        <input
                                                            id="transcript"
                                                            style={{ display: "none" }}
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                const file = e.target.files[0];

                                                                field.onChange(file);
                                                                if (file) {
                                                                    setTrancriptfile(file.name);
                                                                    const reader = new FileReader();
                                                                    reader.readAsDataURL(file);
                                                                    reader.onload = () => {
                                                                        setImageBase64Transcript(reader.result); // Store Base64 string
                                                                    };
                                                                }

                                                                // Generate preview URL
                                                            }} // Store the file in form state
                                                        />
                                                    </div>
                                                )}
                                            />
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 35 35"
                                                fill="none"
                                            >
                                                <g opacity="0.4">
                                                    <mask
                                                        id="mask0_3365_12159"
                                                        style={{ maskType: "alpha" }}
                                                        maskUnits="userSpaceOnUse"
                                                        x="0"
                                                        y="0"
                                                        width="35"
                                                        height="35"
                                                    >
                                                        <rect width="35" height="35" fill="#D9D9D9" />
                                                    </mask>
                                                    <g mask="url(#mask0_3365_12159)">
                                                        <path
                                                            d="M16.4062 23.0249V10.7749L12.8111 14.3701L11.274 12.7885L17.5 6.5625L23.726 12.7885L22.1889 14.3701L18.5938 10.7749V23.0249H16.4062ZM9.1988 28.4375C8.4621 28.4375 7.83854 28.1823 7.32813 27.6719C6.81771 27.1615 6.5625 26.5379 6.5625 25.8012V21.8469H8.75V25.8012C8.75 25.9135 8.79679 26.0163 8.89036 26.1096C8.9837 26.2032 9.08651 26.25 9.1988 26.25H25.8012C25.9135 26.25 26.0163 26.2032 26.1096 26.1096C26.2032 26.0163 26.25 25.9135 26.25 25.8012V21.8469H28.4375V25.8012C28.4375 26.5379 28.1823 27.1615 27.6719 27.6719C27.1615 28.1823 26.5379 28.4375 25.8012 28.4375H9.1988Z"
                                                            fill="white"
                                                        />
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                        {errors?.transcript && (
                                            <p className="validation-text">
                                                {errors?.transcript.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Col>
                        </Row>


                        <Row>
                            <Col md={4} />

                            <Col md={4}>
                                {/* <button
                                    // disabled={change}
                                    // style={{ opacity: change == true ? "0.5" : "1" }}
                                    //  onClick={()=>trigger("email")}
                                    className="primary-btn w-100 px-2 py-3 my-4"
                                    type="submit"
                                >
                                    <h3> Update </h3>
                                </button> */}
                                 <button className="w-100 primary-btn px-2 py-3 my-3 d-flex gap-3" disabled={loader} style={{ opacity: loader && "0.6" }}>
                                                                    Update
                                                                    {
                                                                        loader &&
                                                                        (<Loader show={true}
                                                                            spinnerSize="16px"
                                                                            radius="10"
                                
                                                                            color="red"
                                                                        />)
                                                                    }
                                                                </button>
                            </Col>

                            <Col md={4} />
                        </Row>

                    </form>
                </div>
            </Modal>
        </>
    );
};

export default EditAcademicSportModal;
