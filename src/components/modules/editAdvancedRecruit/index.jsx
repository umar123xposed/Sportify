import "./index.css"
import { Col, Container, Modal, Row, Spinner } from 'reactstrap';

import * as yup from "yup";

import {  useNavigate } from 'react-router-dom';
import React, {  useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller,  useForm } from "react-hook-form";
import { UpdateChildOnSubmit } from "../../../graphql/api-callings";
import { useMutation } from "@apollo/client";
import { UPDATE_CHILD_ACCOUNT } from "../../../graphql/mutation";
//import { handleCreateBasicProfile } from "../../redux/profileSlice";

export default function EditAdvancedRecruitModal({ setShow, toggle, show, data, refetch }) {
  const navigate = useNavigate();

  const [updateChildProfile, { loading: loading1, error, data: data1 }] =
    useMutation(UPDATE_CHILD_ACCOUNT);

 const [filename, setFileName] = useState(null);

 const schema = yup.object().shape({
    recruiting_preferences: yup.object().shape({
      scholarship_offers: yup
        .string(),
      interested_in: yup
              .array()
              .of( yup.string().trim().required("cannot be empty")) // Ensure each tag is a non-empty string
              .min(1,"Please enter some text first, then click the (+) button to add it."),
      direct_contact: yup
        .string()
        .trim()
        .nullable() // Allows null values
        .transform((value) => (value === "" ? null : value)),
      coach_trainer: yup
        .string()
        .trim()
        .nullable() // Allows null values
        .transform((value) => (value === "" ? null : value)),
      reports_endorsements: yup.mixed().nullable(),
    }),
  });


  const {
    control,
    setValue,
    watch,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (data) {
      console.log(data, "asfsaf");

      setValue(
         "recruiting_preferences.scholarship_offers",
        data?.profile_detail?.recruiting_preferences?.scholarship_offers
      );

       setValue(
         "recruiting_preferences.interested_in",
         data?.profile_detail?.recruiting_preferences?.interested_in
       );
       setValue(
         "recruiting_preferences.direct_contact",
         data?.profile_detail?.recruiting_preferences?.direct_contact
       );
        setValue(
          "recruiting_preferences.coach_trainer",
          data?.profile_detail?.recruiting_preferences?.coach_trainer
        );

   }
  }, [data]);

   const [valuableInput, setValuableInput] = useState("");
    const [topScorerInput, setTopScorerInput] = useState("");

    const valuablePlayer = watch("recruiting_preferences.interested_in") || [];
    const topScorer = watch("recruiting_preferences.interested_in") || [];


    const addPosition = (fieldName, inputValue, inputStateSetter) => {
      if (inputValue.trim()) {
         console.log("herer", getValues(fieldName));
        setValue(fieldName, [...getValues(fieldName) || [], inputValue.trim()]);
           inputStateSetter("");
        trigger(fieldName);

        // Clear input field
      }
    };

    // Handle Enter key press
    const handleKeyPress = (e, fieldName, inputValue, inputStateSetter) => {
      if (e.key === "Enter" ) {

        e.preventDefault(); // Prevent form submission
        addPosition( fieldName, inputValue, inputStateSetter);


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

  const submit = ( data2 ) => {
    console.log(data, "what hehehe");

    const payload = {
      profile_detail: {
        advanced: {
          recruiting_preferences: {
            scholarship_offers:
              data2?.recruiting_preferences?.scholarship_offers,
            interested_in: data2?.recruiting_preferences?.interested_in,
            direct_contact: data2?.recruiting_preferences?.direct_contact,
            coach_trainer: data2?.recruiting_preferences?.coach_trainer || null,
            reports_endorsements:
              data2?.recruiting_preferences?.reports_endorsements || null,
          },
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
              <div className="">
                <h3 style={{ color: "#fff" }}>Recruiting Information</h3>
              </div>
              <Row className=" ">
                <div className="d-flex pb-3 justify-content-center"></div>

                <Col md={6}>
                  <div className="basic-inputs input-card">
                    <div className="input-transparent-blur-fields">
                      <label> Preferred Colleges for Athletics </label>
                      <div
                        style={{
                          position: "relative",
                        }}
                        className="w-100 relative"
                      >
                        <Controller
                          control={control}
                          name="recruiting_preferences.interested_in"
                          render={({ field }) => (
                            <div className="relative">
                              <input
                                {...field}
                                className="w-100 input-transparent-blur "
                                type="text"
                                value={topScorerInput}
                                placeholder="Preferred Colleges for Athletics"
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
                                    "recruiting_preferences.interested_in",
                                    topScorerInput,
                                    setTopScorerInput
                                  )
                                }
                              />
                            </div>
                          )}
                        />

                        {errors?.recruiting_preferences?.interested_in && (
                          <p className="validation-text">
                            {
                              errors?.recruiting_preferences?.interested_in
                                ?.message
                            }
                          </p>
                        )}

                        <svg
                          onClick={() =>
                            addPosition(
                              `recruiting_preferences.interested_in`,
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
                                    "recruiting_preferences.interested_in",
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

                  {/* <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label> College Interested in</label>
                  <div className="w-100">
                    <div>
                      <Controller
                        name="recruiting_preferences.interested_in"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            className="w-100 input-transparent-blur"
                            type="text"
                            alt="text"
                            placeholder="College Interested in"
                          />
                        )}
                      />
                      {errors.recruiting_preferences?.interested_in && (
                        <p className="validation-text">
                          {errors.recruiting_preferences?.interested_in.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div> */}

                  <div className="basic-inputs input-card">
                    <div className="input-transparent-blur-fields">
                      <label> Coach & Trainer References (Optional) </label>
                      <div className="w-100">
                        <Controller
                          name="recruiting_preferences.coach_trainer"
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
                            {
                              errors.recruiting_preferences?.coach_trainer
                                .message
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="basic-inputs input-card">
                    <div className="input-transparent-blur-fields">
                      <label> Direct Contact for Recruiters (Optional)</label>
                      <div className="w-100">
                        <Controller
                          name="recruiting_preferences.direct_contact"
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              className="w-100 input-transparent-blur"
                              type="text"
                              alt="text"
                              placeholder="Phone / Email"
                            />
                          )}
                        />

                        {errors?.recruiting_preferences?.direct_contact && (
                          <p className="validation-text">
                            {
                              errors?.recruiting_preferences?.direct_contact
                                .message
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="basic-inputs input-card">
                    <div className="input-transparent-blur-fields">
                      <label>Scholarship Offers</label>
                      <div className="w-100">
                        <Controller
                          name="recruiting_preferences.scholarship_offers"
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

                              {errors?.recruiting_preferences
                                ?.scholarship_offers && (
                                <p className="validation-text">
                                  {
                                    errors?.recruiting_preferences
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

                  <div className="basic-inputs input-card w-100">
                    <div className="input-transparent-blur-fields w-100">
                      <label>Scouting Reports & Endorsement (Optional)</label>
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
                          name="recruiting_preferences.reports_endorsements"
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
                      {errors?.recruiting_preferences?.reports_endorsements && (
                        <p className="validation-text">
                          {
                            errors?.recruiting_preferences?.reports_endorsements
                              .message
                          }
                        </p>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md={4} />

                <Col md={4}>
                  <button
                    style={{ position: "relative" }}
                    type="submit"
                    // onClick={() => navigate("/basic")}
                    className="w-100 primary-btn px-2 py-3 my-3 mt-5"
                  >
                    <h3> {loading1 ? "Updating..." : "Update"} </h3>
                    {loading1 && <Spinner size={20} color="black" />}
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
