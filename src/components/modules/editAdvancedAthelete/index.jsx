import "./index.css"
import { Col, Container, Modal, Row } from 'reactstrap';

import * as yup from "yup";

import {  useNavigate } from 'react-router-dom';
import React, {  useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { UpdateChildOnSubmit } from "../../../graphql/api-callings";
import { useMutation } from "@apollo/client";
import { UPDATE_CHILD_ACCOUNT } from "../../../graphql/mutation";
//import { handleCreateBasicProfile } from "../../redux/profileSlice";

export default function EditAdvancedAtheleteModal({ setShow, toggle, show, data , refetch   }) {
  const navigate = useNavigate();

  const [updateChildProfile, { loading: loading1, error, data:data1 }] =
      useMutation(UPDATE_CHILD_ACCOUNT);


    const schema = yup.object().shape({
      sports_info: yup.array().of(
        yup.object().shape({
          type: yup
            .string()
            .min(4, "At least 4 Characters required")
            .required("Name is required"),
          positions: yup
            .array()
            .of(yup.string().trim().required("cannot be empty")) // Ensure each tag is a non-empty string
            .min(1, "Please enter some text first, then click the (+) button to add it."),
          team_name: yup
            .string()
            .min(4, "At least 4 Characters required")
            .required("Name is required"),
          experience: yup
            .number()
            .typeError("Number required")
            .integer("Only integers are allowed")
            .min(0, "Minimum allowed is 0")
            .max(99, "Maximum allowed is 99")
            .required("Required"),
          jersey_no: yup
            .number()
            .typeError("Number required") // Ensures the input is a number
            .positive("Invalid format") // Checks for positive numbers
            .integer("Invalid format") // Ensures the number is an integer
            .max(999, "Invalid format") // Limits the number to a maximum of 999
            .required("required"),
          wins: yup
            .number()
            .typeError("Value must be a number") // <-- Custom error for non-numeric input
            .nullable()
            .transform((value, originalValue) =>
              originalValue === "" ? null : value
            )
            .integer("Value must be a whole number") // <-- Custom error for non-integers
            .test(
              "is-non-negative",
              "Value must be zero or positive",
              (value) => value === null || value >= 0
            ),
          match_played: yup
            .number()
            .typeError("Number required")
            .positive("Invalid format")
            .integer("Invalid format")
            .required("required"),
          draws: yup
            .number()
            .typeError("Value must be a number") // <-- Custom error for non-numeric input
            .nullable()
            .transform((value, originalValue) =>
              originalValue === "" ? null : value
            )
            .integer("Value must be a whole number") // <-- Custom error for non-integers
            .test(
              "is-non-negative",
              "Value must be zero or positive",
              (value) => value === null || value >= 0
            ),
          losses: yup
            .number()
            .typeError("Value must be a number") // <-- Custom error for non-numeric input
            .nullable()
            .transform((value, originalValue) =>
              originalValue === "" ? null : value
            )
            .integer("Value must be a whole number") // <-- Custom error for non-integers
            .test(
              "is-non-negative",
              "Value must be zero or positive",
              (value) => value === null || value >= 0
            ),
        })
      ),
      career_stats: yup.object().shape({
        valuable_player: yup
          .array()
          .of(yup.string().trim().required("cannot be empty")) // Ensure each tag is a non-empty string
          .min(1, "Please enter some text first, then click the (+) button to add it."),
        top_scorer: yup
          .array()
          .of(yup.string().trim().required("cannot be empty")) // Ensure each tag is a non-empty string
          .min(1, "Please enter some text first, then click the (+) button to add it."), // Ensure at least one tag exists
      }),
      performance_metrics: yup.object().shape({
        strength: yup
          .number()
          .nullable()
          .transform((value, originalValue) =>
            originalValue === "" ? null : value
          )
          .positive("Invalid format")
          .integer("Invalid format"),
        speed: yup
          .number()
          .nullable()
          .transform((value, originalValue) =>
            originalValue === "" ? null : value
          )
          .positive("Invalid format")
          .integer("Invalid format"),
        injury: yup
          .string()
          .trim()
          .nullable() // Allows null values
          .transform((value) => (value === "" ? null : value)),
        // dominant_hand: yup.string().required("Dominant hand is required"),
        agility: yup
          .number()
          .nullable()
          .transform((value, originalValue) =>
            originalValue === "" ? null : value
          )
          .positive("Invalid format")
          .integer("Invalid format"),
      }),
    });


 const {
    control,
    watch,
    setValue,
    getValues,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      sports_info: [
        {
          team_name: "",
          type: "",
          positions:[],
          losses: "",
          draws: "",
          match_played: "",
          jersey_no: "",
          wins: "",
          experience: "",
        },
      ], // Initial default value
      career_stats: {
        valuable_player: [],
        top_scorer: [],
      },
      performance_metrics: {
        strength: "",
        speed: "",
        injury: null,
        agility: "",
      },
    },
  });

    const { fields, append, remove } = useFieldArray({
     control,
     name: "sports_info",
   });

   useEffect(() => {
           if (data) {
          console.log(data,'hammmmmmad')

         setValue("sports_info", data?.profile_detail?.sports_info);
         setValue("career_stats", data?.profile_detail?.career_stats);
         setValue(
           "performance_metrics",
          data?.profile_detail?.performance_metrics
         );

           }
         }, [data , show]);



   const PositionsInput = ({ control, index, setValue, watch, error , trigger }) => {
     const [positionInput, setPositionInput] = useState("");
     const positions = watch(`sports_info.${index}.positions`) || [];
      console.log(error,'what is thia')

      const handleAddPosition = (e) => {
       if (e.key === "Enter" && positionInput.trim()) {
         e.preventDefault();
         setValue(`sports_info.${index}.positions`, [
           ...positions,
           positionInput.trim(),
         ]);
          trigger(`sports_info.${index}.positions`);

         setPositionInput(""); // Clear input after adding
       }
     };

     const handleOnClick = () => {
       if (positionInput.trim()) {
         setValue(`sports_info.${index}.positions`, [
           ...positions,
           positionInput.trim(),
         ]);
         trigger(`sports_info.${index}.positions`);
         setPositionInput(""); // Clear input after adding
       }
     };

     const handleRemovePosition = (posIndex) => {
       setValue(
         `sports_info.${index}.positions`,
         positions.filter((_, i) => i !== posIndex)
       );
        trigger(`sports_info.${index}.positions`);
     };


     return (
       <div>
         <Controller
           control={control}
           name={`sports_info.${index}.positions`}
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

         {error?.sports_info?.[index]?.positions && (
           <p className="validation-text">
             {error?.sports_info[index].positions.message}
           </p>
         )}
         <div style={{ display: "flex" }} className="mt-2 flex flex-wrap gap-2">
           {positions.map((pos, posIndex) => (
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
     );
   }

     const [valuableInput, setValuableInput] = useState("");
     const [topScorerInput, setTopScorerInput] = useState("");

     const valuablePlayer = watch("career_stats.valuable_player") || [];
     const topScorer = watch("career_stats.top_scorer") || [];


   const addPosition = (fieldName, inputValue, inputStateSetter) => {
     if (inputValue.trim()) {
       setValue(fieldName, [...getValues(fieldName) || [], inputValue.trim()]);
        trigger(fieldName);

       inputStateSetter(""); // Clear input field
     }
   };

   // Handle Enter key press
   const handleKeyPress = (e, fieldName, inputValue, inputStateSetter) => {
     if (e.key === "Enter") {
       e.preventDefault(); // Prevent form submission
       addPosition(fieldName, inputValue, inputStateSetter);
     }
   };

   // Remove position from the list
   const removePosition = (fieldName, index) => {
     setValue(
       fieldName,
       getValues(fieldName).filter((_, i) => i !== index)
     );
     trigger(fieldName);
   };

   const submit = (data2) => {
    console.log(data2,'what hehehe')
    const payload = {
         profile_detail: {
           advanced: {
             ...data2,
           },
         },
         profile_type: "Advanced",
         id: data?.user?.id,
       };

    console.log(payload, "payload");
       UpdateChildOnSubmit(payload, updateChildProfile, setShow, refetch);


   }


  return (
    <>
      <Modal size="xl" centered isOpen={show}>
        <div className="solid-card">
          <div className="d-flex justify-content-end mb-3">
            <svg
              style={{
                cursor: "pointer",
              }}
              onClick={() => setShow(false)}
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
          <form onSubmit={handleSubmit(submit)}>
            <Container>
              <h3
                style={{
                  fontSize: "24px",
                  color: "#fff",
                  marginBottom: "20px",
                }}
              >
                Athletic Performance Metrics
              </h3>
              <Row className="grad-border py-4 mx-1 my-3">
                {fields?.map((field, index) => (
                  <>
                    {index > 0 && (
                      <>
                        <div className="d-flex justify-content-end">
                          <svg
                            style={{ cursor: "pointer" }}
                            onClick={() => remove(index)}
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
                      </>
                    )}
                    <Col md={6}>
                      <div className="basic-inputs input-card">
                        <div className="input-transparent-blur-fields">
                          <label> Sports Type </label>

                          <Controller
                            control={control}
                            name={`sports_info.${index}.type`}
                            render={({ field }) => (
                              <div className="w-100">
                                <input
                                  className="w-100 input-transparent-blur"
                                  type="text"
                                  placeholder="Sports Type"
                                  alt="text"
                                  {...field}
                                />
                              </div>
                            )}
                          />

                          {errors.sports_info?.[index]?.type && (
                            <p className="validation-text">
                              {errors.sports_info[index].type.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="basic-inputs input-card">
                        <div className="input-transparent-blur-fields">
                          <label> Jersey Number </label>
                          <div className="w-100">
                            <Controller
                              control={control}
                              name={`sports_info.${index}.jersey_no`}
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

                            {errors.sports_info?.[index]?.jersey_no && (
                              <p className="validation-text">
                                {errors.sports_info[index].jersey_no.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="basic-inputs input-card">
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
                                {
                                  errors?.sports_info[index]?.match_played
                                    .message
                                }
                              </p>
                            )}
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
                            index={index}
                            setValue={setValue}
                            watch={watch}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="basic-inputs input-card">
                        <div className="input-transparent-blur-fields">
                          <label>Team Name</label>
                          <div className="w-100">
                            <div className="w-100">
                              <Controller
                                control={control}
                                name={`sports_info.${index}.team_name`}
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
                              {errors.sports_info?.[index]?.team_name && (
                                <p className="validation-text">
                                  {errors.sports_info[index].team_name.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="basic-inputs input-card">
                        <div className="input-transparent-blur-fields">
                          <label> Years of experience</label>
                          <div className="w-100">
                            <div className="w-100">
                              <Controller
                                control={control}
                                name={`sports_info.${index}.experience`}
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
                              {errors.sports_info?.[index]?.experience && (
                                <p className="validation-text">
                                  {errors.sports_info[index].experience.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Row>
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
                      </Row>
                    </Col>
                  </>
                ))}
                <div
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
                  className="mx-3 mt-5  mb-3 py-4  addmore  d-flex justify-content-start align-items-center"
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
                </div>
              </Row>

              <Row>
                <Col md={5} className="">
                  <div className="my-4 p-4 grad-border">
                    <div className="d-flex justify-content-center">
                      Career & Stats Highlights
                    </div>
                    <div className="basic-inputs input-card">
                      <div className="input-transparent-blur-fields">
                        <label> Award</label>
                        {/* <p
                          style={{
                            colors: "#fff",
                            fontSize: "13px",
                            opacity: "20%",
                            paddingBottom: "10px",
                          }}
                        >
                          {" "}
                          (Add the events you have been a top scorer in)
                        </p> */}

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
                                    removePosition(
                                      "career_stats.top_scorer",
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

                    <div className="basic-inputs input-card">
                      <div className="input-transparent-blur-fields">
                        <label>Valuable player </label>
                        {/* <p
                          style={{
                            colors: "#fff",
                            fontSize: "13px",
                            opacity: "20%",
                            paddingBottom: "10px",
                          }}
                        >
                          {" "}
                          (Add the tournaments you have been an MVP)
                        </p> */}
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

                    {/* <div className="basic-inputs input-card  ">
                  <label> Dominant Hand </label>
                  <Controller
                    name="performance_metrics.dominant_hand"
                    control={control}
                    validation
                    in
                    schema
                    render={({ field }) => (
                      <>
                        <div className="d-flex">
                          {["Left", "Right", "Ambidextrous"]?.map((option) => (
                            <div
                              key={option}
                              style={{
                                borderRadius: "5px",
                                cursor: "pointer",
                              }}
                              className="input-transparent-blur auto-widt me-3"
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
                                      trigger(
                                        "performance_metrics.dominant_hand"
                                      ); // Revalidate field
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
                  {errors?.performance_metrics?.dominant_hand && (
                    <p className="validation-text">
                      {errors?.performance_metrics.dominant_hand.message}
                    </p>
                  )}
                </div> */}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={4} />

                <Col md={4}>
                  <button
                    type="submit"
                    //onClick={() => navigate("/advance-performance")}
                    className="w-100 primary-btn px-2 py-3 my-3"
                  >
                    <h3> Update </h3>
                  </button>
                </Col>

                <Col md={4} />
              </Row>
            </Container>
          </form>
        </div>
      </Modal>
    </>
  );
}
