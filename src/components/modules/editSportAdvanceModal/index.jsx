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

const EditSportModal = ({
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

    const [searchParams] = useSearchParams()

    console.log(sportData)

    const [preview, setPreview] = useState(null);

    const [render, setRendor] = useState(false);
    const [preview1, setPreview1] = useState(null)
    const [loader, setLoader] = useState(false)

    const navigate = useNavigate();

    const draft1 = useSelector(
        (state) => state?.profileSlice?.profile
    );

    const schema = yup.object().shape({
        bio: yup
            .string()
            .required("Bio is required"),
        email: yup
            .string()
            .matches(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Invalid email"
            )
            .required("Email is required"),

        tik: yup
            .string()
            .nullable()
            .transform((value) => (value === "" ? null : value))
            .url("Enter a valid URL"),
        you: yup
            .string()
            .nullable()
            .transform((value) => (value === "" ? null : value))
            .url("Enter a valid URL"),
        twitter: yup
            .string()
            .nullable()
            .transform((value) => (value === "" ? null : value))
            .url("Enter a valid URL"),
        instagram: yup
            .string()
            .nullable()
            .transform((value) => (value === "" ? null : value))
            .url("Enter a valid URL"),
        imlca: yup
            .string()
            .nullable()
            .transform((value) => (value === "" ? null : value))
            .url("Enter a valid URL"),
        image: yup
            .mixed()
            .required("Image is required")
            .test("fileType", "Only JPG, PNG, and JPEG are allowed", (value) => {
                return (
                    value &&
                    ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
                        value.type
                    )
                );
            })
            .test("fileSize", "File size must be less than 2MB", (value) => {
                return value && value.size <= 2 * 1024 * 1024; // 2MB limit
            }),
        sport_name: yup
            .string()
            .min(4, "At least 4 Characters required"),
        side: yup.string().required("Dominant Side is required"),
        jersey_number: yup
            .number()
            .typeError("Number required") // Ensures the input is a number
            .positive("Invalid format") // Checks for positive numbers
            .integer("Invalid format") // Ensures the number is an integer
            .max(999, "Invalid format") // Limits the number to a maximum of 999
            .required("Jersey number is required"),
        tournament: yup
            .string()
            .required("Tournament/Events is required")
            .min(4, "At least 4 Characters required"),
        position: yup
            .array()
            .of(yup.string().trim().required("cannot be empty")) // Ensure each tag is a non-empty string
            .min(1, "Please enter some text first, then click the (+) button to add it.")
            .required("Please enter some text first, then click the (+) button to add it."),
        team_name: yup
            .string()
            .min(4, "At least 4 Characters required")
            .required("team name is required"),
        experience: yup
            .number()
            .typeError("Number required")
            .integer("Only integers are allowed")
            .min(0, "Minimum allowed is 0")
            .max(99, "Maximum allowed is 99")
            .required("Experience isRequired"),
        image: yup
            .mixed()
            .required("Sport Image is required")
            .test("fileType", "Only JPG, PNG, and JPEG are allowed", (value) => {
                return (
                    value &&
                    ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
                        value.type
                    )
                );
            })
            .test("fileSize", "File size must be less than 2MB", (value) => {
                return value && value.size <= 2 * 1024 * 1024; // 2MB limit
            }),
    });



    const [selectedOption, setSelectedOption] = useState(""); // State for  radio
    const [imageBase64Profile, setImageBase64Profile] = useState("");

    const newData = useSelector(
        (state) => state.profileSlice?.profile.basicProfile
    );
    const role = useSelector((state) => state.authSlice?.role);

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

    useEffect(() => {
        if (sportData) {
            if (sportData?.profile_detail?.sports_info?.sport_picture) {
                setValue("image", {
                    type: "image/jpeg",  // a valid MIME type from your list
                    size: 1000,          // some number <= 2MB (2 * 1024 * 1024)
                    // you can add other file properties if needed
                });
                setPreview(
                    `${import.meta.env.VITE_BASE_URL_IMAGE}${sportData?.profile_detail?.sports_info?.sport_picture}`
                );
            }

            if (sportData?.profile_detail?.sports_info?.team_name) {
                setValue("team_name", sportData?.profile_detail?.sports_info?.team_name);
            }
            if (sportData?.profile_detail?.sports_info?.positions) {
                setValue("position", sportData?.profile_detail?.sports_info?.positions);
            }
            if (sportData?.profile_detail?.sports_info?.jersey_no) {
                setValue("jersey_number", sportData?.profile_detail?.sports_info?.jersey_no);
            }
            if (sportData?.profile_detail?.sports_info?.dominant_hand) {
                //setValue("full_name", sportData?.profile_detail?.sports_info?.full_name);
                setValue("side", sportData?.profile_detail?.sports_info?.dominant_hand);
            }
            if (sportData?.profile_detail?.sports_info?.experience) {
                //setValue("full_name", sportData?.profile_detail?.sports_info?.full_name);
                setValue("experience", sportData?.profile_detail?.sports_info?.experience);
            }
            if (sportData?.profile_detail?.sports_info?.upcomming_events) {
                //setValue("full_name", sportData?.profile_detail?.sports_info?.full_name);
                setValue("tournament", sportData?.profile_detail?.sports_info?.upcomming_events);
            }
            if (sportData?.profile_detail?.email) {
                //setValue("full_name", sportData?.profile_detail?.sports_info?.full_name);
                setValue("email", sportData?.profile_detail?.email);
            }
            if (sportData?.profile_detail?.bio) {
                //setValue("full_name", sportData?.profile_detail?.sports_info?.full_name);
                setValue("bio", sportData?.profile_detail?.bio);
            }



            setOnchange(true)
        }
    }, [data, isOpen]);





    const onSubmit = async (updateData) => {

        const social = [
            { type: "Twitter", link: updateData?.twi },
            { type: "Instagram", link: updateData?.insta },
            { type: "Youtube", link: updateData?.you },
            { type: "Tiktok", link: updateData?.tik },
            { type: "IMLCA", link: updateData?.iml }, // Explicit null
        ].filter(item => item.link !== undefined); // keep null if set explicitly

        const payload = {
            "id": parseInt(sportData?.id),
            "profile_detail": {
                "advanced": {
                    "bio": updateData?.bio,
                    "email": updateData?.email,
                    "social": social,
                    "sports_info": {
                        "dominant_hand": updateData?.side,
                        "experience": updateData?.experience,
                        "jersey_no": parseInt(updateData?.jersey_number),
                        "positions": updateData?.position,
                        "sport_picture": preview1,
                        "team_name": updateData?.team_name,
                        "upcomming_events": updateData?.tournament
                    }
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

    const PositionsInput = ({ control, index, setValue, watch, error, trigger }) => {
        const [positionInput, setPositionInput] = useState("");
        const positions1 = watch(`position`) || [];
        console.log(error, 'what is thia')
        const handleAddPosition = (e) => {
            if (e.key === "Enter" && positionInput.trim()) {
                e.preventDefault();
                setValue(`position`, [
                    ...positions1,
                    positionInput.trim(),
                ]);
                trigger(`position`);

                setPositionInput(""); // Clear input after adding
            }
        };

        const handleOnClick = () => {

            if (positionInput.trim()) {
                setValue(`position`, [
                    ...positions1,
                    positionInput.trim(),
                ])
                trigger(`position`);
                setPositionInput(""); // Clear input after adding
            }


        };

        const handleRemovePosition = (posIndex) => {
            setValue(
                `position`,
                positions1.filter((_, i) => i !== posIndex)
            );
            trigger(`position`);
        };

        return (

            <div>
                <Controller
                    control={control}
                    name="position"
                    render={({ field }) => (
                        <div className="w-100 relative" style={{ position: "relative" }}>
                            <input
                                className="w-100 input-transparent-blur"
                                type="text"
                                {...field}
                                value={positionInput}
                                placeholder="Add more Positions"
                                onChange={(e) => {
                                    const regex = /^[A-Za-z0-9\s]+$/;

                                    // If the input matches the regex, update the state
                                    if (regex.test(e.target.value)) {
                                        setPositionInput(e.target.value);
                                    } else {
                                        setPositionInput("");
                                    }
                                    // setPositionInput(e.target.value)
                                }}
                                onKeyDown={handleAddPosition} // Listen for Enter key
                            />
                            <svg
                                onClick={handleOnClick}
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
                                        <stop stopColor="#DDA027" />
                                        <stop offset="0.3198" stopColor="#CE9B2B" />
                                        <stop offset="0.6802" stopColor="#FEF48E" />
                                        <stop offset="1" stopColor="#FFD046" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    )}
                />
                {
                    console.log(error)
                }
                {error.position && (
                    <p className="validation-text">
                        {error.position.message}
                    </p>
                )}
                <div style={{ display: "flex" }} className="mt-2 flex flex-wrap gap-2">
                    {positions1.map((pos, posIndex) => (
                        <div key={posIndex} className="grad-border postions py-0">
                            <div className="flex items-center bg-gray-200 px-3 pb-1 rounded-full">
                                <span className="me-3">{pos}</span>
                                <svg
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleRemovePosition(posIndex)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="11"
                                    height="11"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                >
                                    <path
                                        d="M1.10645 12.8908L12.8931 1.10742M1.10645 1.10742L12.8931 12.8908"
                                        stroke="white"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        )
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
                            <Col md={10}>
                                <div className="profile d-flex justify-content-start ">
                                    <div className="profile-image d-flex flex-sm-nowrap flex-wrap text-center align-items-center gap-3 mb-2">
                                        <img
                                            style={{
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                                height: "90px",
                                                width: "90px",
                                            }}
                                            className=" mb-2"
                                            src={preview ? preview : profile}
                                            alt=""
                                        />

                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document.getElementById("openfile").click();
                                            }}
                                            style={{ border: "none", height: "fit-content" }}
                                            className="primary-btn-img w-100 py-2 px-3"
                                        >
                                            <h3 className="me-2">Upload Sport Image</h3>
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
                                        </button>
                                        <Controller
                                            name="image"
                                            control={control}
                                            render={({ field }) => (
                                                <div>
                                                    <input
                                                        id={"openfile"}
                                                        style={{ display: "none" }}
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            e.preventDefault();
                                                            setOnchange(false);
                                                            const file = e.target.files[0];
                                                            field.onChange(file);

                                                            // Generate preview URL
                                                            if (file) {
                                                                setPreview(URL.createObjectURL(file));
                                                                setPreview1(file);
                                                            }

                                                            if (file) {
                                                                const reader = new FileReader();
                                                                reader.readAsDataURL(file);
                                                                reader.onload = () => {
                                                                    setImageBase64Profile(reader.result); // Store Base64 string
                                                                };
                                                            }
                                                        }} // Store the file in form state
                                                    />

                                                    {errors.image && (
                                                        <p className="validation-text">
                                                            {errors.image.message}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col md={1} />
                        </Row>

                        <Row>
                            <Col md={1} />
                            <Col md={5}>
                                <div className="detailed-info-section mt-4">
                                    <div className="detailed-info-header d-flex justify-content-between align-items-center">
                                        <h6 className="section-title">Sport Details</h6>

                                    </div>
                                </div>
                            </Col>

                        </Row>

                        <Row>

                            <Col md={1} />
                            <Col md={5}>
                                <div className="basic-inputs input-card">
                                    <div className="input-transparent-blur-fields">
                                        <label>Sport Name</label>
                                        <div className="w-100">

                                            <input
                                                className="w-100 input-transparent-blur"
                                                type="text"
                                                alt="text"
                                                placeholder="Jersey Number"
                                                value={sportData?.sport?.name}
                                                disabled
                                            />

                                        </div>
                                    </div>
                                </div>


                            </Col>
                            <Col md={5}>

                                <div className="basic-inputs input-card">
                                    <div className="input-transparent-blur-fields">
                                        <label>Team Name</label>
                                        <div className="w-100">
                                            <Controller
                                                id="team_name"
                                                name="team_name"
                                                control={control}
                                                render={({ field }) => (
                                                    <input
                                                        className="w-100 input-transparent-blur"
                                                        type="text"
                                                        alt="text"
                                                        placeholder="Team Name"
                                                        {...field}
                                                    />
                                                )}
                                            />
                                            {errors?.team_name && (
                                                <p className="validation-text">
                                                    {errors?.team_name?.message}
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
                                        <label>Jersey Number</label>
                                        <div className="w-100">
                                            <Controller
                                                id="jersey_number"
                                                name="jersey_number"
                                                control={control}
                                                render={({ field }) => (
                                                    <input
                                                        className="w-100 input-transparent-blur"
                                                        type="text"
                                                        alt="text"
                                                        placeholder="Jersey Number"
                                                        {...field}
                                                    />
                                                )}
                                            />
                                            {errors?.jersey_number && (
                                                <p className="validation-text">
                                                    {errors?.jersey_number?.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={5}>
                                <div className="basic-inputs input-card  ">
                                    <label> Dominant Hand </label>
                                    <Controller
                                        name="side"
                                        control={control}
                                        validation
                                        in
                                        schema
                                        render={({ field }) => (
                                            <>
                                                <div className="d-flex flex-lg-nowrap flex-wrap">
                                                    {["Left", "Right", "Ambidextrous"]?.map((option) => (
                                                        <div
                                                            key={option}
                                                            style={{
                                                                borderRadius: "5px",
                                                                cursor: "pointer",
                                                                width: "fit-content",
                                                            }}
                                                            className="input-transparent-blur mb-lg-0 mb-2  me-3 "
                                                        >
                                                            <div className="child-right-select ">
                                                                <label style={{ marginBottom: "0" }}>
                                                                    <input
                                                                        type="radio"
                                                                        name={field.name} // Ensure name is consistent
                                                                        value={option}
                                                                        checked={field.value === option} // Use field.value
                                                                        onChange={() => {
                                                                            field.onChange(option);
                                                                            //  trigger(
                                                                            //    "performance_metrics.side"
                                                                            //  ); // Revalidate field
                                                                        }}
                                                                    />
                                                                    <span> {option} </span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    />
                                    {errors?.side && (
                                        <p className="validation-text">
                                            {errors?.side?.message}
                                        </p>
                                    )}
                                </div>


                            </Col>
                            <Col md={1} />
                            <Col md={1} />
                            <Col md={5}>

                                <div className="basic-inputs input-card">
                                    <div className="input-transparent-blur-fields">
                                        <label> Positions</label>

                                        {/* <div className="w-100">
                                            <Controller
                                              id="position"
                                              name="position"
                                              control={control}
                                              render={({ field }) => (
                                                <input
                                                  className="w-100 input-transparent-blur"
                                                  type="text"
                                                  alt="text"
                                                  placeholder="positions"
                                                  {...field}
                                                />
                                              )}
                                            />
                                            {errors?.position && (
                                              <p className="validation-text">
                                                {errors?.position?.message}
                                              </p>
                                            )}
                                          </div> */}

                                        <PositionsInput
                                            trigger={trigger}
                                            error={errors}
                                            control={control}
                                            index={0}
                                            setValue={setValue}
                                            watch={watch}
                                        />

                                    </div>
                                </div>

                            </Col>
                            <Col md={5}>
                                <div className="basic-inputs input-card">
                                    <div className="input-transparent-blur-fields">
                                        <label>Upcoming Tournament/Events</label>
                                        <div className="w-100">
                                            <div className="w-100">
                                                <Controller
                                                    control={control}
                                                    name="tournament"
                                                    render={({ field }) => (
                                                        <div className="w-100">
                                                            <textarea
                                                                rows={1}
                                                                className="w-100 input-transparent-blur"
                                                                type="text"
                                                                alt="text"
                                                                placeholder="Tournament/Events"
                                                                {...field}
                                                            />
                                                        </div>
                                                    )}
                                                />
                                                {errors.tournament && (
                                                    <p className="validation-text">
                                                        {errors.tournament.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={1} />
                            <Col md={1} />
                            <Col md={5}>
                                <div className="basic-inputs input-card">
                                    <div className="input-transparent-blur-fields">
                                        <label> Years of Experience</label>
                                        <div className="w-100">
                                            <div className="w-100">
                                                <Controller
                                                    control={control}
                                                    name="experience"
                                                    render={({ field }) => (
                                                        <div className="w-100">
                                                            <input
                                                                className="w-100 input-transparent-blur"
                                                                type="text"
                                                                placeholder="Years of experience"
                                                                alt="text"
                                                                {...field}
                                                            />
                                                        </div>
                                                    )}
                                                />
                                                {errors.experience && (
                                                    <p className="validation-text">
                                                        {errors.experience.message}
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
                                        <label>Email Address</label>
                                        <div className="w-100">
                                            <Controller
                                                id="email"
                                                name="email"
                                                control={control}
                                                render={({ field }) => (
                                                    <input
                                                        // disabled={state ? true : false}
                                                        className="w-100 input-transparent-blur"
                                                        type="text"
                                                        alt="text"

                                                        placeholder="abc@gmail.com"
                                                        {...field}
                                                    />
                                                )}
                                            />
                                            {errors?.email && (
                                                <p className="validation-text">
                                                    {errors?.email?.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={1} />
                            <Col md={1}>
                            </Col>
                            <Col md={10}>
                                <div className="basic-inputs input-card">
                                    <div className="input-transparent-blur-fields">
                                        <label>Add Bio</label>
                                        <div className="w-100">
                                            <Controller
                                                id="bio"
                                                name="bio"
                                                control={control}
                                                render={({ field }) => (
                                                    <textarea
                                                        className="w-100 input-transparent-blur"
                                                        rows={3}
                                                        type="text"
                                                        alt="text"
                                                        placeholder="Write something about yourself..."
                                                        {...field}
                                                        style={{ resize: "none" }}
                                                    />
                                                )}
                                            />
                                            {errors?.bio && (
                                                <p className="validation-text">
                                                    {errors?.bio?.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {
                                        console.log(errors)
                                    }
                                </div>
                            </Col>
                            <Col md={1}>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={1}></Col>
                            <Col md={5}>
                                <div className="basic-inputs my-2 ">
                                    <label style={{ fontWeight: "600" }}>
                                        Connect Your Socials{" "}
                                    </label>
                                </div>
                            </Col>
                            <Col md={5}></Col>

                            <Col md={1}></Col>
                        </Row>

                        <Row>
                            <Col md={1} />
                            <Col md={5}>
                                <div className="basic-inputs input-card ">
                                    <label>Twitter ( Optional ) </label>

                                    <div className="input-transparent-blur p-0">
                                        <div className="w-100">
                                            <div className="d-flex align-items-center">
                                                <img className="me-3 ms-3" src={twitter} alt="" />
                                                <Controller
                                                    name="twi"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <div className="w-100">
                                                            <input
                                                                {...field}
                                                                style={{
                                                                    backgroundColor: "transparent",
                                                                    borderColor: "transparent",
                                                                    outline: "none",
                                                                    color: "#fff",
                                                                    width: "100%",
                                                                }}
                                                                className="w-100 "
                                                                type="text"
                                                                placeholder="Paste your profile URL here"
                                                                alt="text"
                                                            />
                                                        </div>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {errors.twi && (
                                        <p className="validation-text">{errors.twi.message}</p>
                                    )}
                                </div>
                            </Col>
                            <Col md={5}>
                                <div className="basic-inputs input-card ">
                                    <label>YouTube ( Optional ) </label>

                                    <div className="input-transparent-blur p-0">
                                        <div className="w-100">
                                            <div className="d-flex align-items-center">
                                                <img className="me-3 ms-3" src={youtube} alt="" />
                                                <Controller
                                                    name="you"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <div className="w-100">
                                                            <input
                                                                {...field}
                                                                style={{
                                                                    backgroundColor: "transparent",
                                                                    borderColor: "transparent",
                                                                    outline: "none",
                                                                    color: "#fff",
                                                                    width: "100%",
                                                                }}
                                                                className="w-100 "
                                                                type="text"
                                                                placeholder="Paste your profile URL here"
                                                                alt="text"
                                                            />
                                                        </div>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {errors.you && (
                                        <p className="validation-text">{errors.you.message}</p>
                                    )}
                                </div>
                            </Col>

                            <Col md={1} />
                        </Row>
                        <Row>
                            <Col md={1} />
                            <Col md={5}>
                                <div className="basic-inputs input-card">
                                    <label>Instagram ( Optional ) </label>

                                    <div className="input-transparent-blur p-0">
                                        <div className="w-100">
                                            <div className="d-flex  align-items-center">
                                                <img className="me-3 ms-3" src={insta} alt="" />
                                                <Controller
                                                    name="insta"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <div className="w-100">
                                                            <input
                                                                {...field}
                                                                style={{
                                                                    backgroundColor: "transparent",
                                                                    borderColor: "transparent",
                                                                    outline: "none",
                                                                    color: "#fff",
                                                                    width: "100%",
                                                                }}
                                                                className="w-100 "
                                                                type="text"
                                                                placeholder="Paste your profile URL here"
                                                                alt="text"
                                                            />
                                                        </div>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {errors.insta && (
                                        <p className="validation-text">{errors.insta.message}</p>
                                    )}
                                </div>
                            </Col>
                            <Col md={5}>
                                <div className="basic-inputs input-card">
                                    <label>TikTok ( Optional ) </label>
                                    <div className="input-transparent-blur p-0">
                                        <div className="w-100">
                                            <div className="d-flex align-items-center">
                                                <img className="me-3 ms-3 p-1" src={tiktok} alt="" />
                                                <Controller
                                                    name="tik"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <div className="w-100">
                                                            <input
                                                                {...field}
                                                                style={{
                                                                    backgroundColor: "transparent",
                                                                    borderColor: "transparent",
                                                                    outline: "none",
                                                                    color: "#fff",
                                                                    width: "100%",
                                                                }}
                                                                className="w-100 "
                                                                type="text"
                                                                placeholder="Paste your profile URL here"
                                                                alt="text"
                                                            />
                                                        </div>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {errors.tik && (
                                        <p className="validation-text">{errors.tik.message}</p>
                                    )}
                                </div>
                            </Col>

                            <Col md={1} />
                        </Row>

                        <Row>
                            <Col md={1} />
                            <Col md={5}></Col>
                            <Col md={5}></Col>

                            <Col md={1} />
                        </Row>

                        <Row>
                            <Col md={1} />
                            <Col md={5}>
                                <div className="basic-inputs input-card">
                                    <label>IMLCA ( Optional ) </label>

                                    <div className="input-transparent-blur p-0">
                                        <div className="w-100">
                                            <div className="d-flex align-items-center">
                                                <img className="me-3 ms-3 p-1" src={fg} alt="" />
                                                <Controller
                                                    name="iml"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <div className="w-100">
                                                            <input
                                                                {...field}
                                                                style={{
                                                                    backgroundColor: "transparent",
                                                                    borderColor: "transparent",
                                                                    outline: "none",
                                                                    color: "#fff",
                                                                    width: "100%",
                                                                }}
                                                                className="w-100 "
                                                                type="text"
                                                                placeholder="Paste your profile URL here"
                                                                alt="text"
                                                            />
                                                        </div>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {errors.iml && (
                                    <p className="validation-text">{errors.iml.message}</p>
                                )}
                            </Col>
                            <Col md={5}></Col>

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

export default EditSportModal;
