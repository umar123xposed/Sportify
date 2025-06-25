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
//import { handleCreateBasicProfile } from "../../redux/profileSlice";
import Select from "react-select";
import Loader from "react-spinner-loader"

const EditRecruitSportModal = ({
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

    const customStyles = {
        control: (provided) => ({
            ...provided,
            background: "rgba(255, 255, 255, 0.2)", // Semi-transparent background
            borderRadius: "5px", // Rounded corners
            backdropFilter: "blur(20px)", // Glassmorphism blur effect
            WebkitBackdropFilter: "blur(20px)", // Safari compatibility
            padding: "4px 5px",
            border: "1px solid rgba(157, 157, 157, 0.3)", // Subtle border
            color: "var(--text-white)", // Text color (use a variable or set manually)
            fontSize: "14px",
            boxShadow: "none", // No extra shadow
            "&:hover": {
                border: "1px solid rgba(255, 255, 255, 0.5)", // Slight border change on hover
            },
            zIndex: 5,
        }),
        menuPortal: (base) => ({ ...base, zIndex: 1 }),

        menu: (provided) => ({
            ...provided,

            background: "rgba(255, 255, 255, 0.2)", // Dropdown background
            borderRadius: "5px",
            position: "absolute",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(157, 157, 157, 0.3)",
            fontSize: "14px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 10,
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused
                ? "rgba(255, 255, 255, 0.3)" // Highlighted option background
                : "transparent",
            color: "var(--text-white)", // Text color
            padding: 10,
            cursor: "pointer",
            zIndex: 1,
        }),
        placeholder: (provided) => ({
            ...provided,
            color: "rgba(255, 255, 255, 0.7)", // Placeholder color
            fontStyle: "italic",
            zIndex: 1,
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "var(--text-white)",
            zIndex: 1,
            // Selected value color
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: "var(--text-white)",
            zIndex: 1,
            // Dropdown arrow color
        }),
        indicatorSeparator: () => ({
            display: "none",
            zIndex: 1,
            // Remove the separator
        }),
    };

    const options = [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
    ]

    console.log(sportData)
    const [updateChildProfile] =
        useMutation(UPDATE_CHILD_SPORT);


    const schema =
        yup.object().shape({
            scholarship_offers: yup
                .string(),
            interested_in: yup
                .string(),
            // .required("College is required"),
            direct_contact: yup
                .string()
                .required("Please enter your contact number.")
                .matches(/^\d+$/, "Phone number must contain only digits.")
                .max(15, "Phone number must not exceed 15 digits.")
                .test("isValidPhoneNumber", "Enter a valid phone number", function (value) {
                    return iti1?.current?.isValidNumber() ?? false;
                }),
            coach_contact: yup
                .string()
                .nullable()
                .test(
                    "isValidPhoneNumber",
                    "Enter a valid phone number",
                    function (value) {
                        // If value is empty or null, skip validation
                        if (!value) return true;

                        // Otherwise, run the test
                        return iti2?.current?.isValidNumber() ?? false;
                    }
                ),
            coach_trainer: yup
                .string()
                .trim()
                .nullable() // Allows null values
                .transform((value) => (value === "" ? null : value)),
            reports_endorsements: yup.mixed().nullable(),
            endorsements: yup.mixed().nullable(),
            college_committed: yup.object().nullable(),
            coach_email: yup
                .string()
                .matches(
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    "Invalid email"
                )

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
    const [filename, setFileName] = useState(null)
    const [active1, setActive1] = useState(false)
    const [loader, setLoader] = useState(false)

    const phoneInputRef1 = useRef(null);
    const phoneInputRef2 = useRef(null);
    const iti1 = useRef(null);
    const iti2 = useRef(null);

    console.log(isOpen, "asdfghj65432")

    useEffect(() => {
        setActive1(!active1)
    }, [isOpen])

    useEffect(() => {
        if (phoneInputRef1 && phoneInputRef1.current) {
            // Initialize the intl-tel-input plugin
            // console.log(phoneInputRef1.current, window)
            iti1.current = window?.intlTelInput(phoneInputRef1.current, {
                initialCountry: "us",
                utilsScript:
                    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js", // Required script for validation
            });
        }

        return () => {
            if (iti1.current) {
                iti1.current.destroy(); // Clean up the intl-tel-input instance when the component unmounts
            }
        };

    }, [active1]);

    useEffect(() => {
        if (phoneInputRef2 && phoneInputRef2.current) {
            // Initialize the intl-tel-input plugin
            // console.log(phoneInputRef2.current, window)
            iti2.current = window?.intlTelInput(phoneInputRef2.current, {
                initialCountry: "us",
                utilsScript:
                    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js", // Required script for validation
            });
        }

        return () => {
            if (iti2.current) {
                iti2.current.destroy(); // Clean up the intl-tel-input instance when the component unmounts
            }
        };

    }, [active1]);

    useEffect(() => {
        console.log(sportData?.profile_detail?.recruiting_preferences)
        if (sportData) {

            if (sportData?.profile_detail?.recruiting_preferences?.scholarship_offers) {
                setValue("scholarship_offers", sportData?.profile_detail?.recruiting_preferences?.scholarship_offers);
            }
            if (sportData?.profile_detail?.recruiting_preferences?.preferred_college) {
                setValue("interested_in", sportData?.profile_detail?.recruiting_preferences?.preferred_college);
            }
            if (sportData?.profile_detail?.recruiting_preferences?.direct_phone) {
                setValue("direct_contact", sportData?.profile_detail?.recruiting_preferences?.direct_phone);
            }
            if (sportData?.profile_detail?.recruiting_preferences?.coach_phone) {
                setValue("coach_contact", sportData?.profile_detail?.recruiting_preferences?.coach_phone);
            }
            if (sportData?.profile_detail?.recruiting_preferences?.coach_trainer) {
                setValue("coach_trainer", sportData?.profile_detail?.recruiting_preferences?.coach_trainer);
            }
            if (sportData?.profile_detail?.recruiting_preferences?.highlights) {
                setValue("highlights", sportData?.profile_detail?.recruiting_preferences?.highlights);
            }
            if (sportData?.profile_detail?.recruiting_preferences?.scouting_report) {
                setFileName(sportData?.profile_detail?.recruiting_preferences?.scouting_report)
                setValue("reports_endorsements", null);
            }
            if (sportData?.profile_detail?.recruiting_preferences?.endorsement) {
                setValue("endorsements", sportData?.profile_detail?.recruiting_preferences?.endorsement);
            }
            if (sportData?.profile_detail?.recruiting_preferences?.coach_email) {
                setValue("coach_email", sportData?.profile_detail?.recruiting_preferences?.coach_email);
            }
            if (sportData?.profile_detail?.recruiting_preferences?.college_committed) {
                const selectedOption = sportData?.profile_detail?.recruiting_preferences?.college_committed
                    ? options.find(opt => opt.value === "yes")
                    : options.find(opt => opt.value === "no");

                if (selectedOption) {
                    setValue("college_committed", selectedOption);
                }
            }


            setOnchange(true)
        }
    }, [data, isOpen]);





    const onSubmit = async (updateData) => {



        const payload = {
            "id": parseInt(sportData?.id),
            "profile_detail": {
                "advanced": {
                    "recruiting_preferences": {
                        "coach_phone": updateData?.coach_contact,
                        "coach_trainer": updateData?.coach_trainer,
                        "direct_phone": updateData?.direct_contact,
                        "endorsement": updateData?.endorsements || null,
                        "preferred_college": updateData?.interested_in,
                        "scholarship_offers": updateData?.scholarship_offers,
                        "scouting_report": updateData?.reports_endorsements,
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
                                        <h6 className="section-title">Recruitment Information</h6>

                                    </div>
                                </div>
                            </Col>

                        </Row>

                        <Row>
                            <Col md={1} />
                            <Col md={5}>
                                <div className="basic-inputs input-card">
                                    <div className="input-transparent-blur-fields">
                                        <label> Preferred College (optional)</label>
                                        <div
                                            style={{
                                                position: "relative",
                                            }}
                                            className="w-100 relative"
                                        >
                                            <Controller
                                                control={control}
                                                name="interested_in"
                                                render={({ field }) => (
                                                    <div className="relative">
                                                        <input
                                                            {...field}
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            alt="text"
                                                            placeholder="Interested in"
                                                        />
                                                    </div>
                                                )}
                                            />
                                            {errors?.interested_in && (
                                                <p className="validation-text">
                                                    {
                                                        errors?.interested_in
                                                            ?.message
                                                    }
                                                </p>
                                            )}

                                            {/* <svg
                      onClick={() =>
                        addPosition(
                          `interested_in`,
                          topScorerInput,
                          setTopScorerInput
                        )
                      }
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
                    </svg> */}
                                        </div>

                                    </div>
                                </div>
                            </Col>
                            <Col md={5}>
                                <div className="basic-inputs input-card">
                                    <div className="input-transparent-blur-fields">
                                        <label>Scholarship Offers (optional)</label>
                                        <div className="w-100">
                                            <Controller
                                                name="scholarship_offers"
                                                control={control}
                                                render={({ field }) => (
                                                    <div>
                                                        <input
                                                            {...field}
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            alt="text"
                                                            placeholder="Scholarship Offers"
                                                        />

                                                        {errors
                                                            ?.scholarship_offers && (
                                                                <p className="validation-text">
                                                                    {
                                                                        errors
                                                                            ?.scholarship_offers.message
                                                                    }
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
                                        <label> Committed to College (optional)</label>
                                        <div
                                            style={{
                                                position: "relative",
                                            }}
                                            className="w-100 relative"
                                        >
                                            <Controller
                                                control={control}
                                                name="college_committed"

                                                render={({ field }) => (
                                                    <div >
                                                        <div>
                                                            <Select
                                                                {...field} // Spread field props for React Hook Form integration
                                                                styles={customStyles}
                                                                menuPortalTarget={document.body}
                                                                options={options}
                                                                placeholder={"Select Commitment"}
                                                                onChange={(selectedOption) =>
                                                                    field.onChange(selectedOption)
                                                                } // Update form state
                                                            />

                                                        </div>
                                                    </div>
                                                )}
                                            />
                                            {errors?.college_committed && (
                                                <p className="validation-text">
                                                    {
                                                        errors?.college_committed
                                                            ?.message
                                                    }
                                                </p>
                                            )}

                                            {/* <svg
                                                  onClick={() =>
                                                    addPosition(
                                                      `interested_in`,
                                                      topScorerInput,
                                                      setTopScorerInput
                                                    )
                                                  }
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
                                                </svg> */}
                                        </div>

                                    </div>
                                </div>
                            </Col>
                            <Col md={5}>
                                <div className="basic-inputs input-card">
                                    <div className="input-transparent-blur-fields">
                                        <label>
                                            {" "}
                                            Coach Phone No. (optional)
                                        </label>
                                        <div className="w-100">
                                            <Controller
                                                id="coach_contact"
                                                name="coach_contact"
                                                control={control}
                                                render={({ field }) => (
                                                    <input
                                                        {...field}
                                                        className=" input-transparent-blur"
                                                        ref={phoneInputRef2}
                                                        id="phone"
                                                        type="tel"
                                                        name="phone"
                                                    // value={field.value} // Use Formik's value
                                                    />
                                                )}
                                            />
                                            {errors?.coach_contact && (
                                                <p className="validation-text">
                                                    {errors?.coach_contact?.message}
                                                </p>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            </Col>
                            <Col md={1} />

                            <Col md={1} />
                            <Col md={5}>
                                <div className="basic-inputs input-card">
                                    <div className="input-transparent-blur-fields">
                                        <label> Coach Email (optional)</label>
                                        <div
                                            style={{
                                                position: "relative",
                                            }}
                                            className="w-100 relative"
                                        >
                                            <Controller
                                                control={control}
                                                name="coach_email"
                                                render={({ field }) => (
                                                    <input
                                                        // disabled={state ? true : false}
                                                        className="w-100 input-transparent-blur"
                                                        type="text"
                                                        alt="text"
                                                        // disabled={userData?.email}
                                                        // style={{ opacity: userData?.email && "0.6" }}
                                                        placeholder="abc@gmail.com"
                                                        {...field}
                                                    />
                                                )}
                                            />
                                            {errors?.coach_email && (
                                                <p className="validation-text">
                                                    {
                                                        errors?.coach_email
                                                            ?.message
                                                    }
                                                </p>
                                            )}

                                            {/* <svg
                                                  onClick={() =>
                                                    addPosition(
                                                      `interested_in`,
                                                      topScorerInput,
                                                      setTopScorerInput
                                                    )
                                                  }
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
                                                </svg> */}
                                        </div>

                                    </div>
                                </div>
                            </Col>
                            <Col md={5}>
                                <div className="basic-inputs input-card w-100">
                                    <div className="input-transparent-blur-fields w-100">
                                        <label>Endorsement by coaches/colleges (optional)</label>
                                        {/* <PhoneInput placeholder="Enter your number" defaultCountry="PK" {...field} onChange={(data) => field.onChange(data)} /> */}
                                        <div className="w-100">
                                            <Controller
                                                name="endorsements"
                                                control={control}
                                                render={({ field }) => (
                                                    <div>
                                                        <input
                                                            {...field}
                                                            className="w-100 input-transparent-blur"
                                                            type="text"
                                                            alt="text"
                                                            placeholder="Endorsements"
                                                        />

                                                        {errors
                                                            ?.endorsements && (
                                                                <p className="validation-text">
                                                                    {
                                                                        errors
                                                                            ?.endorsements.message
                                                                    }
                                                                </p>
                                                            )}
                                                    </div>
                                                )}
                                            />
                                        </div>
                                        {/* {errors?.endorsements && (
                                                <p className="validation-text">
                                                  {
                                                    errors?.endorsements
                                                      .message
                                                  }
                                                </p>
                                              )} */}
                                    </div>
                                </div>
                            </Col>
                            <Col md={1} />

                            <Col md={1} />
                            <Col md={5}>
                                <div className="basic-inputs input-card">
                                    <div className="input-transparent-blur-fields">
                                        <label> Coach & Trainer References (optional) </label>
                                        <div className="w-100">
                                            <Controller
                                                name="coach_trainer"
                                                control={control}
                                                render={({ field }) => (
                                                    <input
                                                        {...field}
                                                        className="w-100 input-transparent-blur"
                                                        type="text"
                                                        alt="text"
                                                        placeholder="Coach & Trainer References"
                                                    />
                                                )}
                                            />

                                            {errors.recruiting_preferences?.coach_trainer && (
                                                <p className="validation-text">
                                                    {errors.recruiting_preferences?.coach_trainer.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={5}>
                                <div className="basic-inputs input-card">
                                    <div className="input-transparent-blur-fields">
                                        <label>
                                            {" "}
                                            Athlete Direct Contact Info
                                        </label>
                                        <div className="w-100">
                                            <Controller
                                                id="direct_contact"
                                                name="direct_contact"
                                                control={control}
                                                render={({ field }) => (
                                                    <input
                                                        {...field}
                                                        className=" input-transparent-blur"
                                                        ref={phoneInputRef1}
                                                        id="phone"
                                                        type="tel"
                                                        name="phone"
                                                    // value={field.value} // Use Formik's value
                                                    />
                                                )}
                                            />
                                            {errors?.direct_contact && (
                                                <p className="validation-text">
                                                    {errors?.direct_contact?.message}
                                                </p>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            </Col>
                            <Col md={1} />

                            <Col md={1} />
                            <Col md={5}>
                                <div className="basic-inputs input-card w-100">
                                    <div className="input-transparent-blur-fields w-100">
                                        <label>Scouting Report (optional)</label>
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
                                                {filename ? filename : "Upload"}{" "}
                                            </label>
                                            <Controller
                                                name="reports_endorsements"
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
                                                                    setFileName(file.name);
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
                                        {errors?.reports_endorsements && (
                                            <p className="validation-text">
                                                {
                                                    errors?.reports_endorsements
                                                        .message
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Col>
                            <Col md={5}>
                            </Col>
                            <Col md={1} />
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

export default EditRecruitSportModal;
