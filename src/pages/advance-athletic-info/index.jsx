
import "./index.css";
import { Col, Container, Row } from "reactstrap";

import "react-datepicker/dist/react-datepicker.css";
import * as yup from "yup";

import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { handleAtheleteInfo } from "../../redux/profileSlice";
import { colors } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import profile from "./../../assets/profile.png";


export default function AthleticInformation() {

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <input
      type="text"
      className="w-100 input-transparent-blur"
      onClick={onClick}
      value={value}
      readOnly
      ref={ref}
      placeholder="Event/Tournament Date"
    />
  ));




  const draft = useSelector(
    (state) => state?.profileSlice?.profile?.basicProfile
  );
  const draft1 = useSelector(
    (state) => state?.profileSlice?.profile
  );

  const role = useSelector(
    (state) => state.authSlice.role
  );

  const sportName = useSelector(state => state?.profileSlice?.upgradeSport?.sport)
  console.log(sportName)

  const [preview1, setPreview1] = useState(null)
  const [imageBase64Profile1, setImageBase64Profile1] = useState(draft?.picture1 || null);


  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { state } = useLocation()

  const schema =
    yup.object().shape({
      sport_name: yup
        .string()
        .min(4, "At least 4 Characters required"),
      side: yup.string().required("Dominant Side is required"),
      jersey_no: yup
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
      positions: yup
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
      image1: yup
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

      //     wins: yup
      //       .number()
      //       .typeError("Value must be a number") // <-- Custom error for non-numeric input
      //       .nullable()
      //       .transform((value, originalValue) =>
      //         originalValue === "" ? null : value
      //       )
      //       .integer("Value must be a whole number") // <-- Custom error for non-integers
      //       .test(
      //         "is-non-negative",
      //         "Value must be zero or positive",
      //         (value) => value === null || value >= 0
      //       ),
      //     match_played: yup
      //       .number()
      //       .typeError("Value must be a number") // <-- Custom error for
      //       .nullable()
      //       .transform((value, originalValue) =>
      //         originalValue === "" ? null : value
      //       )
      //       .min(0, "Invalid format")
      //       .integer("Invalid format"),
      //     draws: yup
      //       .number()
      //       .typeError("Value must be a number") // <-- Custom error for non-numeric input
      //       .nullable()
      //       .transform((value, originalValue) =>
      //         originalValue === "" ? null : value
      //       )
      //       .integer("Value must be a whole number") // <-- Custom error for non-integers
      //       .test(
      //         "is-non-negative",
      //         "Value must be zero or positive",
      //         (value) => value === null || value >= 0
      //       ),
      //     losses: yup
      //       .number()
      //       .typeError("Value must be a number") // <-- Custom error for non-numeric input
      //       .nullable()
      //       .transform((value, originalValue) =>
      //         originalValue === "" ? null : value
      //       )
      //       .integer("Value must be a whole number") // <-- Custom error for non-integers
      //       .test(
      //         "is-non-negative",
      //         "Value must be zero or positive",
      //         (value) => value === null || value >= 0
      //       ),
      //   })
      // ),
      // career_stats: yup.object().shape({
      //   valuable_player: yup
      //     .array()
      //     .of(yup.string().trim().required("cannot be empty")) // Ensure each tag is a non-empty string
      //     .min(1, "Please enter some text first, then click the (+) button to add it."),
      //   top_scorer: yup
      //     .array()
      //     .of(yup.string().trim().required("cannot be empty")) // Ensure each tag is a non-empty string
      //     .min(1, "Please enter some text first, then click the (+) button to add it."), // Ensure at least one tag exists
      // }),
      // performance_metrics: yup.object().shape({
      //   strength: yup
      //     .number()
      //     .typeError("Value must be a number") // <-- Custom error for non-numeric input
      //     .nullable()
      //     .transform((value, originalValue) =>
      //       originalValue === "" ? null : value
      //     )
      //     .integer("Value must be a whole number") // <-- Custom error for non-integers
      //     .test(
      //       "is-non-negative",
      //       "Value must be zero or positive",
      //       (value) => value === null || value >= 0
      //     ),
      //   speed: yup
      //     .number()
      //     .typeError("Value must be a number") // <-- Custom error for non-numeric input
      //     .nullable()
      //     .transform((value, originalValue) =>
      //       originalValue === "" ? null : value
      //     )
      //     .integer("Value must be a whole number") // <-- Custom error for non-integers
      //     .test(
      //       "is-non-negative",
      //       "Value must be zero or positive",
      //       (value) => value === null || value >= 0
      //     ),
      //   injury: yup
      //     .string()
      //     .trim()
      //     .nullable() // Allows null values
      //     .transform((value) => (value === "" ? null : value)),
      //   // dominant_hand: yup.string().required("Dominant hand is required"),
      //   agility: yup
      //     .number()
      //     .typeError("Value must be a number") // <-- Custom error for
      //     .nullable()
      //     .transform((value, originalValue) =>
      //       originalValue === "" ? null : value
      //     )
      //     .positive("Invalid format")
      //     .integer("Invalid format"),
      // }),
    })




  const {
    control,
    watch,
    setValue,
    getValues,
    trigger,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),

  });


  useEffect(() => {
    // console.log(draft)
    if (draft?.profile_detail?.advanced?.sports_info) {

      setValue("sport_name", draft?.profile_detail?.advanced?.sports_info?.sport_name)
      setValue("jersey_no", draft?.profile_detail?.advanced?.sports_info?.jersey_no)
      setValue("positions", draft?.profile_detail?.advanced?.sports_info?.positions)
      setValue("team_name", draft?.profile_detail?.advanced?.sports_info?.team_name)
      setValue("tournament", draft?.profile_detail?.advanced?.sports_info?.tournament)
      setValue("experience", draft?.profile_detail?.advanced?.sports_info?.experience)
      setValue("side", draft?.profile_detail?.advanced?.sports_info?.side)

      //   // replace(draft.profile_detail.advanced.sports_info);
      //   reset({
      //     sport_name: draft?.profile_detail?.advanced?.sports_info?.sport_name,
      //     jersey_no: draft?.profile_detail?.advanced?.sports_info?.jersey_no,
      //     positions: draft?.profile_detail?.advanced?.sports_info?.positions,
      //     team_name: draft?.profile_detail?.advanced?.sports_info?.team_name,
      //     tournament: draft?.profile_detail?.advanced?.sports_info?.tournament,
      //     experience: draft?.profile_detail?.advanced?.sports_info?.experience


      //   });
    }


  }, []);


  const PositionsInput = ({ control, index, setValue, watch, error, trigger }) => {
    const [positionInput, setPositionInput] = useState("");
    const positions1 = watch(`positions`) || [];
    console.log(error, 'what is thia')
    const handleAddPosition = (e) => {
      if (e.key === "Enter" && positionInput.trim()) {
        e.preventDefault();
        setValue(`positions`, [
          ...positions1,
          positionInput.trim(),
        ]);
        trigger(`positions`);

        setPositionInput(""); // Clear input after adding
      }
    };

    const handleOnClick = () => {

      if (positionInput.trim()) {
        setValue(`positions`, [
          ...positions1,
          positionInput.trim(),
        ])
        trigger(`positions`);
        setPositionInput(""); // Clear input after adding
      }


    };

    const handleRemovePosition = (posIndex) => {
      setValue(
        `positions`,
        positions1.filter((_, i) => i !== posIndex)
      );
      trigger(`positions`);
    };

    return (

      <div>
        <Controller
          control={control}
          name="positions"
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
        {error.positions && (
          <p className="validation-text">
            {error.positions.message}
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


  const submit = (data) => {
    console.log(data, 'what hehehe')
    // const payload = {
    //   ...data,
    //   performance_metrics: {
    //     ...data?.performance_metrics,
    //     strength: data?.performance_metrics?.strength || null,
    //     speed: data?.performance_metrics?.speed || null,

    //     // dominant_hand: "",
    //     agility: data?.performance_metrics?.agility || null,
    //     injury: data?.performance_metrics?.injury
    //       ? data?.performance_metrics?.injury
    //       : null,
    //   },
    // };


    // console.log(payload, 'Hammmad')
    dispatch(handleAtheleteInfo({ sports_info: data }))

    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const sport_id = searchParams.get("sport_id");
    

    if (role === "Parent") {
      if (state) {
        navigate(`/parent/career-highlights?type=${searchParams.get("type")}${id ? `&id=${id}` : ""}${sport_id ? `&sport_id=${sport_id}` : ""}${name ? `&name=${name}` : ""}`);

      } else {
        navigate(`/parent/career-highlights?type=${searchParams.get("type")}${id ? `&id=${id}` : ""}${sport_id ? `&sport_id=${sport_id}` : ""}${name ? `&name=${name}` : ""}`);
      }
    }
    if (role === "Athlete") {
      if (state) {
        navigate(`/athlete/career-highlights?type=${searchParams.get("type")}${id ? `&id=${id}` : ""}${sport_id ? `&sport_id=${sport_id}` : ""}${name ? `&name=${name}` : ""}`);

      } else {
        navigate(`/athlete/career-highlights?type=${searchParams.get("type")}${id ? `&id=${id}` : ""}${sport_id ? `&sport_id=${sport_id}` : ""}${name ? `&name=${name}` : ""}`);
      }
    }

  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Container>
        <Row className="pt-5">
          <Col md={12}>
            <div onClick={() => navigate(-1)} className="d-flex back-btn mb-4">
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
          <Col md={12}>
            <h3 className="page-main-heading">Athlete Advance Profile Setup</h3>
          </Col>
          <Col xs={12} className="d-flex justify-content-center">
            <div className="my-4 d-flex justify-content-center input-transparent-blur1 py-sm-3 py-2 px-sm-5 px-3 mx-sm-0 mx-5 ">
              <svg width="240" height="22" viewBox="0 0 279 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="21" y1="13.5" x2="65" y2="13.5" stroke="url(#paint0_linear_6349_16633)" stroke-width="3" />
                <line x1="83" y1="13.5" x2="127" y2="13.5" stroke="white" stroke-width="3" />
                <line x1="147" y1="13.5" x2="191" y2="13.5" stroke="white" stroke-width="3" />
                <line x1="215" y1="13.5" x2="259" y2="13.5" stroke="white" stroke-width="3" />
                <circle cx="12" cy="12" r="10" stroke="url(#paint1_linear_6349_16633)" stroke-width="4" />
                <circle cx="75" cy="12" r="10" stroke="url(#paint2_linear_6349_16633)" stroke-width="4" />
                <circle cx="139" cy="12" r="10" stroke="white" stroke-width="4" />
                <circle cx="203" cy="12" r="10" stroke="white" stroke-width="4" />
                <circle cx="267" cy="12" r="10" stroke="white" stroke-width="4" />
                <circle cx="12" cy="12" r="3" fill="url(#paint3_linear_6349_16633)" />
                <circle cx="75" cy="12" r="3" fill="url(#paint4_linear_6349_16633)" />
                <circle cx="139" cy="12" r="3" fill="white" />
                <circle cx="203" cy="12" r="3" fill="white" />
                <circle cx="267" cy="12" r="3" fill="white" />
                <defs>
                  <linearGradient id="paint0_linear_6349_16633" x1="21.0025" y1="15.5" x2="65.001" y2="15.5" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#DDA027" />
                    <stop offset="0.3198" stop-color="#CE9B2B" />
                    <stop offset="0.6802" stop-color="#FEF48E" />
                    <stop offset="1" stop-color="#FFD046" />
                  </linearGradient>
                  <linearGradient id="paint1_linear_6349_16633" x1="0.0013628" y1="12.0009" x2="24.0005" y2="12.0009" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#DDA027" />
                    <stop offset="0.3198" stop-color="#CE9B2B" />
                    <stop offset="0.6802" stop-color="#FEF48E" />
                    <stop offset="1" stop-color="#FFD046" />
                  </linearGradient>
                  <linearGradient id="paint2_linear_6349_16633" x1="63.0014" y1="12.0009" x2="87.0005" y2="12.0009" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#DDA027" />
                    <stop offset="0.3198" stop-color="#CE9B2B" />
                    <stop offset="0.6802" stop-color="#FEF48E" />
                    <stop offset="1" stop-color="#FFD046" />
                  </linearGradient>
                  <linearGradient id="paint3_linear_6349_16633" x1="9.00034" y1="12.0002" x2="15.0001" y2="12.0002" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#DDA027" />
                    <stop offset="0.3198" stop-color="#CE9B2B" />
                    <stop offset="0.6802" stop-color="#FEF48E" />
                    <stop offset="1" stop-color="#FFD046" />
                  </linearGradient>
                  <linearGradient id="paint4_linear_6349_16633" x1="72.0003" y1="12.0002" x2="78.0001" y2="12.0002" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#DDA027" />
                    <stop offset="0.3198" stop-color="#CE9B2B" />
                    <stop offset="0.6802" stop-color="#FEF48E" />
                    <stop offset="1" stop-color="#FFD046" />
                  </linearGradient>
                </defs>
              </svg>

            </div>
          </Col>
        </Row>


        <Row className=" py-4 mx-1 my-3 mb-5 back-color" >
          <Col xs={12}> <h3 style={{ fontSize: "24px", color: "#fff", marginBottom: "20px" }}>
            Sport Details
          </h3></Col>
          <Col md={12}>
            <div className="profile d-flex justify-content-start ">
              <div className="profile-image d-flex flex-sm-nowrap flex-wrap gap-4 align-items-center text-center mb-2">
                <img
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                    height: "90px",
                    width: "90px",
                  }}
                  className=" mb-2"
                  src={preview1 ? preview1 : profile}
                  alt=""
                />

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("openfile1").click();
                  }}
                  style={{ border: "none" }}
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
                  name="image1"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <input
                        id={"openfile1"}
                        style={{ display: "none" }}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          e.preventDefault();
                          const file = e.target.files[0];

                          // Generate preview URL
                          if (file) {

                            field.onChange(file);
                            setPreview1(URL.createObjectURL(file));

                          }

                          if (file) {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => {
                              setImageBase64Profile1(reader.result); // Store Base64 string
                            };
                          }
                        }} // Store the file in form state
                      />

                      {errors.image1 && (
                        <p className="validation-text text-nowrap mt-3">
                          {errors.image1.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="basic-inputs input-card">
              <div className="input-transparent-blur-fields">
                <label> Sports Name </label>

                <div className="w-100">
                  <input
                    className="w-100 input-transparent-blur"
                    type="text"
                    placeholder="Sports Type"
                    alt="text"
                    value={searchParams.get("name") ? sportName?.name : draft1?.sport?.label}
                    disabled
                  />
                </div>

              </div>
            </div>

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

            <div className="basic-inputs input-card">
              <div className="input-transparent-blur-fields">
                <label>Team Name</label>
                <div className="w-100">
                  <div className="w-100">
                    <Controller
                      control={control}
                      name="team_name"
                      render={({ field }) => (
                        <div className="w-100">
                          <input
                            className="w-100 input-transparent-blur"
                            type="text"
                            alt="text"
                            placeholder="Team Name"
                            {...field}
                          />
                        </div>
                      )}
                    />
                    {errors.team_name && (
                      <p className="validation-text">
                        {errors.team_name.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
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
                    <div className="d-flex flex-sm-nowrap flex-wrap">
                      {["Left", "Right", "Ambidextrous"]?.map((option) => (
                        <div
                          key={option}
                          style={{
                            borderRadius: "5px",
                            cursor: "pointer",
                            width: "130px",
                          }}
                          className="input-transparent-blur mb-sm-0 mb-2   me-3"
                        >
                          <div className="child-right-select">
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

            {/* <div className="basic-inputs input-card">
                  <div className="input-transparent-blur-fields">
                    <label> Matches Played</label>
                    <div className="w-100">
                      <Controller
                        control={control}
                        name={`sports_info.${index}.match_played`}
                        render={({ field }) => (
                          <div className="w-100">
                            <input
                              className="w-100 input-transparent-blur"
                              type="text"
                              placeholder="How many match has been played by this user."
                              alt="text"
                              {...field}
                            />
                          </div>
                        )}
                      />
                      {errors?.sports_info?.[index]?.match_played && (
                        <p className="validation-text">
                          {errors?.sports_info[index]?.match_played.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div> */}


          </Col>
          <Col md={6}>

            <div className="basic-inputs input-card">
              <div className="input-transparent-blur-fields">
                <label> Jersey Number </label>
                <div className="w-100">
                  <Controller
                    control={control}
                    name="jersey_no"
                    render={({ field }) => (
                      <div className="w-100">
                        <input
                          className="w-100 input-transparent-blur"
                          type="text"
                          placeholder="Jersey Number"
                          alt="text"
                          {...field}
                        />
                      </div>
                    )}
                  />

                  {errors.jersey_no && (
                    <p className="validation-text">
                      {errors.jersey_no.message}
                    </p>
                  )}
                </div>
              </div>
            </div>


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
            <div className="basic-inputs input-card">
              <div className="input-transparent-blur-fields">
                <label> Positions</label>

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

            {/* <Row>
                  <Col md={4}>
                    <div className="basic-inputs input-card">
                      <div className="input-transparent-blur-fields">
                        <label> Wins ( Optional ) </label>

                        <div className="w-100">
                          <Controller
                            control={control}
                            name={`sports_info.${index}.wins`}
                            render={({ field }) => (
                              <div className="w-100">
                                <input
                                  className="w-100 input-transparent-blur"
                                  type="text"
                                  alt="text"
                                  placeholder="Wins"
                                  {...field}
                                />
                              </div>
                            )}
                          />
                          {errors.sports_info?.[index]?.wins && (
                            <p className="validation-text">
                              {errors.sports_info[index].wins.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="basic-inputs input-card">
                      <div className="input-transparent-blur-fields">
                        <label> Losses ( Optional )</label>
                        <div className="w-100">
                          <Controller
                            control={control}
                            name={`sports_info.${index}.losses`}
                            render={({ field }) => (
                              <div className="w-100">
                                <input
                                  className="w-100 input-transparent-blur"
                                  type="text"
                                  alt="text"
                                  placeholder="Losses"
                                  {...field}
                                />
                              </div>
                            )}
                          />

                          {errors.sports_info?.[index]?.losses && (
                            <p className="validation-text">
                              {errors.sports_info[index].losses.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="basic-inputs input-card">
                      <div className="input-transparent-blur-fields">
                        <label>Draws ( Optional )</label>

                        <div className="w-100">
                          <Controller
                            control={control}
                            name={`sports_info.${index}.draws`}
                            render={({ field }) => (
                              <div className="w-100">
                                <input
                                  className="w-100 input-transparent-blur"
                                  type="text"
                                  alt="text"
                                  placeholder="Draws"
                                  {...field}
                                />
                              </div>
                            )}
                          />

                          {errors.sports_info?.[index]?.draws && (
                            <p className="validation-text">
                              {errors.sports_info[index].draws.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row> */}
          </Col>

          {/* <div
            onClick={() =>
              append({
                team_name: "",
                type: "",
                positions: [],
                losses: "",
                draws: "",
                match_played: "",
                jersey_no: "",
                wins: "",
                experience: "",
              })
            }
            style={{ cursor: "pointer" }}
            className=" mt-5  mb-3 py-4 grad-border addmore  d-flex justify-content-center align-items-center"
          >
            <svg
              className="me-2"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
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
            </svg>
            <span>Add More Teams</span>
          </div> */}
          <Col xs={12}>
            <Row>
              <Col md={4} />

              <Col md={4}>
                <button
                  type="submit"
                  //onClick={() => navigate("/advance-performance")}
                  className="w-100 primary-btn px-2 py-3 my-3"
                >
                  <h3> Next </h3>
                </button>
              </Col>

              <Col md={4} />
            </Row></Col>
        </Row>

        {/* <Row>
          <Col md={5} className="">
            <div className="my-4 p-4 grad-border">
              <div className="d-flex justify-content-center">
                Career & Stats Highlights
              </div>
              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label> Award</label>
                 
                  <div
                    style={{
                      position: "relative",
                    }}
                    className="w-100 relative"
                  >
                    <Controller
                      control={control}
                      name="career_stats.top_scorer"
                      render={({ field }) => (
                        <div className="relative">
                          <input
                            {...field}
                            className="w-100 input-transparent-blur "
                            type="text"
                            value={topScorerInput}
                            placeholder="Add Awards"
                            onChange={(e) => {
                              const regex = /^[A-Za-z0-9\s]+$/;

                              // If the input matches the regex, update the state
                              if (regex.test(e.target.value)) {
                                setTopScorerInput(e.target.value);
                                // setPositionInput(e.target.value);
                              } else {
                                setTopScorerInput("");
                                // setPositionInput("");
                              }
                            }}
                            onKeyDown={(e) =>
                              handleKeyPress(
                                e,
                                "career_stats.top_scorer",
                                topScorerInput,
                                setTopScorerInput
                              )
                            }
                          />
                        </div>
                      )}
                    />

                    {errors?.career_stats?.top_scorer && (
                      <p className="validation-text">
                        {errors.career_stats.top_scorer.message}
                      </p>
                    )}

                    <svg
                      onClick={() =>
                        addPosition(
                          "career_stats.top_scorer",
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
                    </svg>
                  </div>

                  <div
                    style={{ display: "flex" }}
                    className="mt-2 flex flex-wrap gap-2"
                  >
                    {topScorer?.map((tag, index) => (
                      <div className="grad-border postions py-0">
                        <div
                          key={index}
                          className="flex items-center bg-gray-200 px-3 pb-1 rounded-full"
                        >
                          <span className="me-3">{tag}</span>

                          <svg
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              removePosition("career_stats.top_scorer", index)
                            }
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M1.10645 12.8908L12.8931 1.10742M1.10645 1.10742L12.8931 12.8908"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label>Valuable player </label>

                 
                  <div
                    style={{
                      position: "relative",
                    }}
                    className="w-100 relative"
                  >
                    <Controller
                      control={control}
                      name="career_stats.valuable_player"
                      render={({ field }) => (
                        <div className="relative">
                          <input
                            {...field}
                            className="w-100 input-transparent-blur "
                            type="text"
                            value={valuableInput}
                            placeholder="Add Tournaments Name"
                            onChange={(e) => {
                              const regex = /^[A-Za-z0-9\s]+$/;

                              // If the input matches the regex, update the state
                              if (regex.test(e.target.value)) {
                                setValuableInput(e.target.value); // setPositionInput(e.target.value);
                              } else {
                                setValuableInput("");
                                // setPositionInput("");
                              }
                            }}
                            onKeyDown={(e) =>
                              handleKeyPress(
                                e,
                                "career_stats.valuable_player",
                                valuableInput,
                                setValuableInput
                              )
                            }
                          />
                        </div>
                      )}
                    />
                    {errors?.career_stats?.valuable_player && (
                      <p className="validation-text">
                        {errors.career_stats.valuable_player.message}
                      </p>
                    )}

                    <svg
                      onClick={() =>
                        addPosition(
                          "career_stats.valuable_player",
                          valuableInput,
                          setValuableInput
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
                    </svg>
                  </div>

                  <div
                    style={{ display: "flex" }}
                    className="mt-2 flex flex-wrap gap-2"
                  >
                    {valuablePlayer?.map((tag, index) => (
                      <div className=" grad-border postions py-0">
                        <div
                          key={index}
                          className="flex items-center bg-gray-200 px-3 pb-1 rounded-full"
                        >
                          <span className="me-3">{tag}</span>

                          <svg
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              removePosition(
                                "career_stats.valuable_player",
                                index
                              )
                            }
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M1.10645 12.8908L12.8931 1.10742M1.10645 1.10742L12.8931 12.8908"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col md={7} className="">
            <div className="my-4 p-4 grad-border">
              <div className="d-flex justify-content-center">
                Athletic Performance Metrics
              </div>
              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label>Speed ( Optional )</label>
                  <div className="w-100">
                    <Controller
                      control={control}
                      name="performance_metrics.speed"
                      render={({ field }) => (
                        <div className="relative">
                          <input
                            {...field}
                            className="w-100 input-transparent-blur"
                            placeholder=""
                            type="text"
                            alt="text"
                          />
                        </div>
                      )}
                    />
                    {errors?.performance_metrics?.speed && (
                      <p className="validation-text">
                        {errors?.performance_metrics?.speed?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label> Strength ( Optional ) </label>
                  <div className="w-100">
                    <Controller
                      control={control}
                      name="performance_metrics.strength"
                      render={({ field }) => (
                        <div className="relative">
                          <input
                            {...field}
                            className="w-100 input-transparent-blur"
                            placeholder=""
                            type="text"
                            alt="text"
                          />
                        </div>
                      )}
                    />
                    {errors?.performance_metrics?.strength && (
                      <p className="validation-text">
                        {errors?.performance_metrics?.strength?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label> Agility Score ( Optional )</label>
                  <div className="w-100">
                    <Controller
                      control={control}
                      name="performance_metrics.agility"
                      render={({ field }) => (
                        <div className="relative">
                          <input
                            {...field}
                            className="w-100 input-transparent-blur"
                            placeholder=""
                            type="text"
                            alt="text"
                          />
                        </div>
                      )}
                    />
                    {errors?.performance_metrics?.agility && (
                      <p className="validation-text">
                        {errors?.performance_metrics?.agility?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label> Injury History ( Optional )</label>
                  <div className="w-100">
                    <Controller
                      control={control}
                      name="performance_metrics.injury"
                      render={({ field }) => (
                        <div className="relative">
                          <input
                            {...field}
                            className="w-100 input-transparent-blur"
                            placeholder=""
                            type="text"
                            alt="text"
                          />
                        </div>
                      )}
                    />
                    {errors?.performance_metrics?.injury && (
                      <p className="validation-text">
                        {errors?.performance_metrics?.injury?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              
            </div>
          </Col>
        </Row> */}


        {/* <Row>
          <Col md={4} />

          <Col md={4}>
            <button
              type="submit"
              //onClick={() => navigate("/advance-performance")}
              className="w-100 primary-btn px-2 py-3 my-3"
            >
              <h3> Next </h3>
            </button>
          </Col>

          <Col md={4} />
        </Row> */}
      </Container>
    </form>
  );
}
