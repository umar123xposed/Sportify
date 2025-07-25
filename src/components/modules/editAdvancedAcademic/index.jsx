import "./index.css"
import { Col, Container, Modal, Row } from 'reactstrap';

import * as yup from "yup";

import {  useNavigate } from 'react-router-dom';
import React, {  useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller,  useForm } from "react-hook-form";
import { UpdateChildOnSubmit } from "../../../graphql/api-callings";
import { useMutation } from "@apollo/client";
import { UPDATE_CHILD_ACCOUNT } from "../../../graphql/mutation";
//import { handleCreateBasicProfile } from "../../redux/profileSlice";

export default function EditAdvancedAcademicModal({ setShow, toggle, show, data, refetch }) {
  const navigate = useNavigate();

  const [updateChildProfile, { loading: loading1, error, data: data1 }] =
    useMutation(UPDATE_CHILD_ACCOUNT);

   const [change , setChange] = useState(true)
    const [imageBase64, setImageBase64] = useState("");
 const [imageBase64Transcript, setImageBase64Transcript] = useState("");
  const [awardfile, setawardfile] = useState(null);
const [transcriptFile, setTrancriptfile] = useState(null);

const floatOrPositiveIntegerValidation = (value) => {
  if (value === undefined || value === null) return true; // Allow empty values for required to handle
  if (typeof value !== "number" || value <= 0) return false; // Must be a positive number
  return /^\d+(\.\d+)?$/.test(value.toString()); // Allows integers and float values (e.g., 1, 1.0, 2.5)
};
  const schema = yup.object().shape({
    academic_info: yup.object().shape({
      year: yup
        .string()
        .matches(/^\d{4}$/, "Year must be 4 digits")
        .required("Year is required"),
      scores: yup
        .string()
        .nullable()
        .transform((value) => (value === "" ? null : value))
        .min(4, "At least 4 characters required"),
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
        .test(
          "float-or-integer",
          "Please enter a positive integer or float value",
          (value) => value == null || floatOrPositiveIntegerValidation(value)
        ),
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
      award: yup
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
    }),
  });

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (data) {
      console.log(data, "asfsaf");

      setValue("academic_info.highschool", data?.profile_detail?.academic_info?.highschool)

       setValue("academic_info.address", data?.profile_detail?.academic_info?.address);
       setValue("academic_info.year", data?.profile_detail?.academic_info?.year);
       setValue("academic_info.gpa", data?.profile_detail?.academic_info?.gpa);
       setValue("academic_info.scores", data?.profile_detail?.academic_info?.scores);
     setChange(true)
   }
  }, [data]);

  const submit = (data2) => {
    console.log(data, "what hehehe");
    const { reports } = data2?.academic_info;
    const payload = {
      profile_detail: {
        advanced: {
          academic_info: {
            highschool: data2?.academic_info?.highschool,
            address: data2?.academic_info?.address,
            year: data2?.academic_info?.year,
            gpa: data2?.academic_info?.gpa,
            scores: data2?.academic_info?.scores,
            transcript: data2?.academic_info?.transcript || null,
            award: data2?.academic_info?.award || null,
          },
        },
      },
      profile_type: "Advanced",
      id: data?.user?.id,
    };

    console.log(payload, "payload");
    UpdateChildOnSubmit(payload, updateChildProfile, setShow, refetch);
  };

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
                <h3 style={{ color: "#fff" }}>Academic Information</h3>
              </div>
              <Row className="">
                <div className="d-flex pb-3 justify-content-center"></div>
                <Col md={6}>
                  <div className="basic-inputs input-card">
                    <div className="input-transparent-blur-fields">
                      <label> School Name </label>
                      <div className="w-100">
                        <div>
                          <Controller
                            name="academic_info.highschool"
                            control={control}
                            render={({ field }) => (
                              <input
                                {...field}
                                className="w-100 input-transparent-blur"
                                type="text"
                                onChange={(e) => {
                                  field.onChange(e);
                                  setChange(false);
                                }}
                                alt="text"
                                placeholder="School Name"
                              />
                            )}
                          />

                          {errors.academic_info?.highschool && (
                            <p className="validation-text">
                              {errors.academic_info?.highschool.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="basic-inputs input-card">
                    <div className="input-transparent-blur-fields">
                      <label> Graduation Year </label>
                      <div className="w-100">
                        <Controller
                          name="academic_info.year"
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              className="w-100 input-transparent-blur"
                              type="text"
                              alt="text"
                              onChange={(e) => {
                                field.onChange(e);
                                setChange(false);
                              }}
                              placeholder="Graduation Year"
                            />
                          )}
                        />

                        {errors.academic_info?.year && (
                          <p className="validation-text">
                            {errors.academic_info?.year.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="basic-inputs input-card">
                    <div className="input-transparent-blur-fields">
                      <label>
                        {" "}
                        SAT, ACT or Equivalent Scores ( Optional ){" "}
                      </label>
                      <div className="w-100">
                        <Controller
                          name="academic_info.scores"
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              className="w-100 input-transparent-blur"
                              type="text"
                              alt="text"
                              onChange={(e) => {
                                field.onChange(e);
                                setChange(false);
                              }}
                              placeholder="SAT, ACT or Equivalent Scores"
                            />
                          )}
                        />

                        {errors.academic_info?.scores && (
                          <p className="validation-text">
                            {errors.academic_info?.scores.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="basic-inputs input-card">
                    <div className="input-transparent-blur-fields">
                      <label> Honors & Awards (Academic) ( Optional ) </label>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          document.getElementById("Honors").click();
                        }}
                        style={{ height: "45", cursor: "pointer" }}
                        className="w-100 input-transparent-blur d-flex justify-content-between align-items-center"
                      >
                        <label style={{ opacity: "30%" }}>
                          {awardfile ? awardfile : "Upload"}{" "}
                        </label>
                        <Controller
                          name="academic_info.award"
                          control={control}
                          render={({ field }) => (
                            <div>
                              <input
                                id="Honors"
                                style={{ display: "none" }}
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  field.onChange(file);
                                  setChange(false);
                                  if (file) {
                                    setawardfile(file.name);

                                    const reader = new FileReader();
                                    reader.readAsDataURL(file);
                                    reader.onload = () => {
                                      setImageBase64(reader.result); // Store Base64 string
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
                      {errors?.academic_info?.award && (
                        <p className="validation-text">
                          {errors?.academic_info?.award.message}
                        </p>
                      )}
                    </div>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="basic-inputs input-card">
                    <div className="input-transparent-blur-fields">
                      <label>School Address</label>
                      <div className="w-100">
                        <Controller
                          name="academic_info.address"
                          control={control}
                          render={({ field }) => (
                            <div>
                              <input
                                {...field}
                                className="w-100 input-transparent-blur"
                                type="text"
                                alt="text"
                                onChange={(e) => {
                                  field.onChange(e);
                                  setChange(false);
                                }}
                                placeholder="Address"
                              />

                              {errors?.academic_info?.address && (
                                <p className="validation-text">
                                  {errors?.academic_info?.address.message}
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
                      <label>GPA ( Optional )</label>
                      {/* <PhoneInput placeholder="Enter your number" defaultCountry="PK" {...field} onChange={(data) => field.onChange(data)} /> */}
                      <div className="w-100">
                        <Controller
                          name="academic_info.gpa"
                          control={control}
                          render={({ field }) => (
                            <div>
                              <input
                                {...field}
                                className="w-100 input-transparent-blur"
                                type="text"
                                alt="text"
                                placeholder="GPA"
                                onChange={(e) => {
                                  field.onChange(e);
                                  setChange(false);
                                }}
                              />

                              {errors?.academic_info?.gpa && (
                                <p className="validation-text">
                                  {errors?.academic_info?.gpa.message}
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
                          name="academic_info.transcript"
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
                                  setChange(false);
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
                      {errors?.academic_info?.transcript && (
                        <p className="validation-text">
                          {errors?.academic_info?.transcript.message}
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
                    type="submit"
                    disabled={change}
                    style={{ opacity: change == true ? "0.5" : "1" }}
                    // onClick={() => navigate("/basic")}
                    className="w-100 primary-btn px-2 py-3 my-3 mt-5"
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
