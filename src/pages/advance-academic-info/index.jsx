
import "./index.css";
import { Col, Container, Row } from "reactstrap";
import * as yup from "yup";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { handleAtheleteInfo } from "../../redux/profileSlice";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function AdvanceAcademic() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation()
  const [imageBase64, setImageBase64] = useState("");
  const [imageBase64Transcript, setImageBase64Transcript] = useState("");
  const [awardfile, setawardfile] = useState(null);
  const [transcriptFile, setTrancriptfile] = useState(null);


  const [searchParams] = useSearchParams()
  const draft = useSelector(
    (state) => state?.profileSlice?.profile?.basicProfile
  );

  const profile = useSelector(
    (state) => state.profileSlice.profile.basicProfile
  );

   const role = useSelector(
      (state) => state.authSlice.role
    );

  const floatOrPositiveIntegerValidation = (value) => {
    if (value === undefined || value === null) return true; // Allow empty values for required to handle
    if (typeof value !== "number" || value <= 0) return false; // Must be a positive number
    return /^\d+(\.\d+)?$/.test(value.toString()); // Allows integers and float values (e.g., 1, 1.0, 2.5)
  };


  console.log(state, 'what is state')
  const schema = yup.object().shape({
    academic_info: yup.object().shape({
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
      academic_info: {
        year: null,
        transcript: null,
        scores: null,
        highschool: null,
        gpa: null,
        award: null,
        address: null,
      },
    },
  });

  const handleFileChange = (file) => {

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        return reader.result // Store Base64 string

      };
    }
  };

  const submit = (data) => {

    const updated = {
      academic_info: {
        ...data?.academic_info,
        transcript: imageBase64Transcript || null,
        transcriptFile: data?.academic_info?.transcript,
        award: imageBase64 || null
      },
    };
    console.log(updated, "what oyeee");

    dispatch(handleAtheleteInfo(updated));

    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const sport_id = searchParams.get("sport_id");

    if(role === "Parent"){
      if (state) {
       navigate(`/parent/recruiting-info?type=${searchParams.get("type")}${id ? `&id=${id}` : ""}${sport_id ? `&sport_id=${sport_id}` : ""}${name ? `&name=${name}` : ""}`);

    } else {
       navigate(`/parent/recruiting-info?type=${searchParams.get("type")}${id ? `&id=${id}` : ""}${sport_id ? `&sport_id=${sport_id}` : ""}${name ? `&name=${name}` : ""}`);

    }
    }
    if(role === "Athlete"){
      if (state) {
       navigate(`/athlete/recruiting-info?type=${searchParams.get("type")}${id ? `&id=${id}` : ""}${sport_id ? `&sport_id=${sport_id}` : ""}${name ? `&name=${name}` : ""}`);

    } else {
       navigate(`/athlete/recruiting-info?type=${searchParams.get("type")}${id ? `&id=${id}` : ""}${sport_id ? `&sport_id=${sport_id}` : ""}${name ? `&name=${name}` : ""}`);

    }
    }

  }

  useEffect(() => {

    if (draft?.profile_detail) {
      // const defaultDate = new Date(draft?.dob);
      setValue(
        "academic_info.highschool",
        draft?.profile_detail?.advanced?.academic_info?.highschool
      );

      setValue(
        "academic_info.year",
        draft?.profile_detail?.advanced?.academic_info?.year
      );

      setValue(
        "academic_info.gpa",
        draft?.profile_detail?.advanced?.academic_info?.gpa
      );

      setValue(
        "academic_info.scores",
        draft?.profile_detail?.advanced?.academic_info?.scores
      );

      setValue(
        "academic_info.address",
        draft?.profile_detail?.advanced?.academic_info?.address
      );

      if (draft?.profile_detail?.advanced?.academic_info?.transcript) {
        setTrancriptfile("transcript File");
      }

      if (draft?.profile_detail?.advanced?.academic_info?.award) {
        setTrancriptfile("Award File");
      }

      //setSelectedOption(draft?.gender);
    }





  }, [])

  return (
    <div className=" py-4 pb-4">
      <form onSubmit={handleSubmit(submit)}>
        <Container>
          <Row className="pt-5">
            <Col md={12}>
              <div
                onClick={() => navigate(-1)}
                className="d-flex back-btn mb-4"
              >
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
                  <line x1="21" y1="13.5" x2="65" y2="13.5" stroke="url(#paint0_linear_6349_17139)" stroke-width="3" />
                  <line x1="83" y1="13.5" x2="127" y2="13.5" stroke="url(#paint1_linear_6349_17139)" stroke-width="3" />
                  <line x1="147" y1="13.5" x2="191" y2="13.5" stroke="url(#paint2_linear_6349_17139)" stroke-width="3" />
                  <line x1="215" y1="13.5" x2="259" y2="13.5" stroke="white" stroke-width="3" />
                  <circle cx="12" cy="12" r="10" stroke="url(#paint3_linear_6349_17139)" stroke-width="4" />
                  <circle cx="75" cy="12" r="10" stroke="url(#paint4_linear_6349_17139)" stroke-width="4" />
                  <circle cx="139" cy="12" r="10" stroke="url(#paint5_linear_6349_17139)" stroke-width="4" />
                  <circle cx="203" cy="12" r="10" stroke="url(#paint6_linear_6349_17139)" stroke-width="4" />
                  <circle cx="267" cy="12" r="10" stroke="white" stroke-width="4" />
                  <circle cx="12" cy="12" r="3" fill="url(#paint7_linear_6349_17139)" />
                  <circle cx="75" cy="12" r="3" fill="url(#paint8_linear_6349_17139)" />
                  <circle cx="139" cy="12" r="3" fill="white" />
                  <circle cx="203" cy="12" r="3" fill="white" />
                  <circle cx="267" cy="12" r="3" fill="white" />
                  <defs>
                    <linearGradient id="paint0_linear_6349_17139" x1="21.0025" y1="15.5" x2="65.001" y2="15.5" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#DDA027" />
                      <stop offset="0.3198" stop-color="#CE9B2B" />
                      <stop offset="0.6802" stop-color="#FEF48E" />
                      <stop offset="1" stop-color="#FFD046" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_6349_17139" x1="83.0025" y1="15.5" x2="127.001" y2="15.5" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#DDA027" />
                      <stop offset="0.3198" stop-color="#CE9B2B" />
                      <stop offset="0.6802" stop-color="#FEF48E" />
                      <stop offset="1" stop-color="#FFD046" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_6349_17139" x1="147.002" y1="15.5" x2="191.001" y2="15.5" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#DDA027" />
                      <stop offset="0.3198" stop-color="#CE9B2B" />
                      <stop offset="0.6802" stop-color="#FEF48E" />
                      <stop offset="1" stop-color="#FFD046" />
                    </linearGradient>
                    <linearGradient id="paint3_linear_6349_17139" x1="0.0013628" y1="12.0009" x2="24.0005" y2="12.0009" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#DDA027" />
                      <stop offset="0.3198" stop-color="#CE9B2B" />
                      <stop offset="0.6802" stop-color="#FEF48E" />
                      <stop offset="1" stop-color="#FFD046" />
                    </linearGradient>
                    <linearGradient id="paint4_linear_6349_17139" x1="63.0014" y1="12.0009" x2="87.0005" y2="12.0009" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#DDA027" />
                      <stop offset="0.3198" stop-color="#CE9B2B" />
                      <stop offset="0.6802" stop-color="#FEF48E" />
                      <stop offset="1" stop-color="#FFD046" />
                    </linearGradient>
                    <linearGradient id="paint5_linear_6349_17139" x1="127.001" y1="12.0009" x2="151.001" y2="12.0009" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#DDA027" />
                      <stop offset="0.3198" stop-color="#CE9B2B" />
                      <stop offset="0.6802" stop-color="#FEF48E" />
                      <stop offset="1" stop-color="#FFD046" />
                    </linearGradient>
                    <linearGradient id="paint6_linear_6349_17139" x1="191.001" y1="12.0009" x2="215.001" y2="12.0009" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#DDA027" />
                      <stop offset="0.3198" stop-color="#CE9B2B" />
                      <stop offset="0.6802" stop-color="#FEF48E" />
                      <stop offset="1" stop-color="#FFD046" />
                    </linearGradient>
                    <linearGradient id="paint7_linear_6349_17139" x1="9.00034" y1="12.0002" x2="15.0001" y2="12.0002" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#DDA027" />
                      <stop offset="0.3198" stop-color="#CE9B2B" />
                      <stop offset="0.6802" stop-color="#FEF48E" />
                      <stop offset="1" stop-color="#FFD046" />
                    </linearGradient>
                    <linearGradient id="paint8_linear_6349_17139" x1="72.0003" y1="12.0002" x2="78.0001" y2="12.0002" gradientUnits="userSpaceOnUse">
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
            <Col xs={12}>
              <h3 style={{ fontSize: "24px", color: "#fff", marginBottom: "20px" }}>
                Academic Info
              </h3>
            </Col>
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

              {/* <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label> SAT, ACT or Equivalent Scores ( Optional ) </label>
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
              </div> */}
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
                  <label>CGPA ( Optional )</label>
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


            </Col>
            <Col xs={12}>
              <Row className="mt-4">
                <Col md={4} />

                <Col md={4}>
                  <button
                    type="submit"
                    // onClick={() => navigate("/basic")}
                    className="w-100 primary-btn px-2 py-3 mb-3 mt-3"
                  >
                    <h3> Next </h3>
                  </button>
                </Col>

                <Col md={4} />
              </Row>
              </Col>
          </Row>




        </Container>
      </form>
    </div>
  );
}
