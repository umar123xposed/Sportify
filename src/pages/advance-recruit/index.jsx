import "./index.css";
import { Col, Container, Row, Spinner } from "reactstrap";
import * as yup from "yup";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { handleAtheleteInfo, handleClearProfiles } from "../../redux/profileSlice";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { COMPELETE_PROFILE, CREATE_CHILD, UPDATE_CHILD } from "../../graphql/mutation";
import { useMutation } from "@apollo/client";
import { CompeleteProfileUpOnSubmit, CreatechildOnSubmit, UpdatechildOnSubmit } from "../../graphql/api-callings";
import PreviewAdvancedgModal from "../../components/modules/previewAdvancedDetails";
import Select from "react-select";

export default function AdvanceRecruit() {

  const [searchParams] = useSearchParams()

  const draft = useSelector(
    (state) => state?.profileSlice?.profile?.basicProfile
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [imageBase64, setImageBase64] = useState("");
  const [imageBase64Transcript, setImageBase64Transcript] = useState("");
  const [filename, setFileName] = useState(null)
  const [modal, setModal] = useState(false)
  const toggle = () => { }

  const phoneInputRef1 = useRef(null);
  const phoneInputRef2 = useRef(null);
  const iti1 = useRef(null);
  const iti2 = useRef(null);

  const options = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" }
  ]

  const profile = useSelector(
    (state) => state.profileSlice.profile.basicProfile
  );
  const userRole = useSelector(
    (state) => state.authSlice.role
  );

  console.log(state, 'what is state')

  const schema = yup.object().shape({
    recruiting_preferences: yup.object().shape({
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
    mode: "onChange",
    defaultValues: {
      recruiting_preferences: {
        scholarship_offers: '',
        reports_endorsements: null,
        interested_in: "",
        direct_contact: null,
        // coach_contact: null,
        coach_trainer: null,
      },
    },
  });

  const [valuableInput, setValuableInput] = useState("");
  const [topScorerInput, setTopScorerInput] = useState("");

  const valuablePlayer = watch("recruiting_preferences.interested_in") || [];
  const topScorer = watch("recruiting_preferences.interested_in") || [];

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

  }, []);

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

  }, []);

  const addPosition = (fieldName, inputValue, inputStateSetter) => {
    if (inputValue.trim()) {
      console.log("herer", getValues(fieldName));
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

  const base64ToFile = (base64String, fileName) => {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  };


  const [completeProfile, { loading: loading1, error, data }] =
    useMutation(COMPELETE_PROFILE);

  const [createChildAccount, { loading: loading2, error: error2, data: data2 }] =
    useMutation(CREATE_CHILD);

  const [updateChildAccount, { loading: loading3, error: error3, data: data3 }] =
    useMutation(UPDATE_CHILD);

  const convertToUTCDate = (dateInput) => {
    const date = new Date(dateInput);
    return date.toISOString().split("T")[0]; // Extracts only the date part
  };


  const stringToFloat = (str) => {
    const floatValue = parseFloat(str);
    return isNaN(floatValue) ? null : floatValue;
  };

  useEffect(() => {
    console.log(draft?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences)
    if (draft?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences) {

      setValue("recruiting_preferences.scholarship_offers", draft?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.scholarship_offers)
      setValue("recruiting_preferences.interested_in", draft?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.interested_in)
      setValue("recruiting_preferences.direct_contact", draft?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.direct_contact)
      setValue("recruiting_preferences.coach_contact", draft?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.coach_contact)
      setValue("recruiting_preferences.coach_trainer", draft?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.coach_trainer)
      setValue("recruiting_preferences.reports_endorsements", draft?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.reports_endorsements)
      setValue("recruiting_preferences.endorsements", draft?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.endorsements)

    }


  }, []);


  const submit = async (data) => {

    console.log(data)

    dispatch(handleAtheleteInfo({ reqruit_info: data }))

    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const sport_id = searchParams.get("sport_id");

    if (userRole === "Parent") {
      navigate(`/parent/checkout-payment?type=${searchParams.get("type")}${id ? `&id=${id}` : ""}${sport_id ? `&sport_id=${sport_id}` : ""}${name ? `&name=${name}` : ""}`);
    }

    if (userRole === "Athlete") {
      navigate(`/athlete/checkout-payment?type=${searchParams.get("type")}${id ? `&id=${id}` : ""}${sport_id ? `&sport_id=${sport_id}` : ""}${name ? `&name=${name}` : ""}`);
    }



    // navigate("/parent")
    // trigger("recruiting_preferences.coach_trainer");
    // trigger("recruiting_preferences.coach_trainer");

    // let updateDate = await convertToUTCDate(profile?.dob);

    // let heig = stringToFloat(profile?.height);
    // let weig = stringToFloat(profile?.weight);
    // Convert Base64 images to File objects

    // console.log(data, "Form Data");

    // let transcriptImage
    // if (profile?.profile_detail?.advanced?.academic_info?.transcript) {
    //   transcriptImage = base64ToFile(
    //     profile?.profile_detail?.advanced?.academic_info?.transcript, // Ensure this is a valid Base64 string
    //     `${profile?.nick_name}_transcript.png`
    //   );
    // }
    // let awardImage
    // if (profile?.profile_detail?.advanced?.academic_info?.award) {

    //   awardImage = base64ToFile(
    //     profile?.profile_detail?.advanced?.academic_info?.award, // Corrected field
    //     `${profile?.nick_name}_award.png`
    //   );

    // }
    // let profileImage;

    // if (profile?.picture) {
    //   profileImage = base64ToFile(
    //     profile?.picture, // Corrected field
    //     `${profile?.nick_name}_profile.png`
    //   );
    // }


    // if (userRole == "Parent") {

    //   const finalpayload = {
    //     ...profile,
    //     dob: updateDate,
    //     picture: profileImage || null,

    //     profile_detail: {
    //       advanced: {
    //         ...profile?.profile_detail?.advanced,
    //         performance_metrics:
    //           profile?.profile_detail?.advanced?.performance_metrics,
    //         ...data,
    //         academic_info: {
    //           ...profile.profile_detail?.advanced?.academic_info,
    //           transcript: transcriptImage || null,
    //           award: awardImage || null,
    //         },
    //       },
    //     },
    //   };

    //   console.log(finalpayload, 'what is this')

    //   if (state) {

    //     UpdatechildOnSubmit(finalpayload, updateChildAccount, navigate, userRole);


    //   } else {

    //     CreatechildOnSubmit(finalpayload, createChildAccount, navigate, userRole, handleClearProfiles,
    //       dispatch);

    //   }


    // } else {


    //   if (state) {
    //     const { user_name, ...rest } = profile;
    //     console.log(rest, "what is this")

    //     const finalpayload = {
    //       ...rest,
    //       dob: updateDate,
    //       picture: profileImage || null,

    //       profile_detail: {
    //         advanced: {
    //           ...profile?.profile_detail?.advanced,
    //           performance_metrics:
    //             profile?.profile_detail?.advanced?.performance_metrics,
    //           ...data,
    //           academic_info: {
    //             ...profile.profile_detail?.advanced?.academic_info,
    //             transcript: transcriptImage || null,
    //             award: awardImage || null,
    //           },
    //         },
    //       },
    //     };


    //     UpdatechildOnSubmit(finalpayload, updateChildAccount, navigate, userRole);
    //   } else {

    //     const finalpayload = {
    //       role: "Athlete",
    //       Athlete: {
    //         ...profile,
    //         dob: updateDate,
    //         picture: profileImage || null,

    //         profile_detail: {
    //           advanced: {
    //             ...profile?.profile_detail?.advanced,
    //             performance_metrics:
    //               profile?.profile_detail?.advanced?.performance_metrics,
    //             ...data,
    //             academic_info: {
    //               ...profile.profile_detail?.advanced?.academic_info,
    //               transcript: transcriptImage || null,
    //               award: awardImage || null,
    //             },
    //           },
    //         },
    //       },
    //     };

    //     CompeleteProfileUpOnSubmit(finalpayload, completeProfile, navigate);

    //   }

    //   console.log(finalpayload, "Final Payload");
    // }

    // Create final payload
    // Dispatch or navigate if needed
    // dispatch(handleAtheleteInfo(finalpayload));
    // navigate("/athletes/recruiting-information");
  };



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




  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <Container>
          <Row className="pt-5">
            <Col md={12}>
              <div className="d-flex justify-content-between w-100">
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
                {/* <h6

                  className="py-2 px-3"
                  onClick={() => setModal(true)}
                  style={{
                    cursor: "pointer",
                    background: "var(--primary-grad-color1)",
                    borderRadius: "12px",
                    color: "#000",
                    fontSize: "15px",
                  }}
                >
                  Preview Details
                </h6> */}
              </div>
            </Col>
            <Col md={12}>
              <h3 className="page-main-heading">Athlete Advance Profile Setup</h3>
            </Col>
            <Col xs={12} className="d-flex justify-content-center">
              <div className="my-4 d-flex justify-content-center input-transparent-blur1 py-sm-3 py-2 px-sm-5 px-3 mx-sm-0 mx-5 ">
                <svg width="240" height="22" viewBox="0 0 279 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="21" y1="13.5" x2="65" y2="13.5" stroke="url(#paint0_linear_6349_17756)" stroke-width="3" />
                  <line x1="83" y1="13.5" x2="127" y2="13.5" stroke="url(#paint1_linear_6349_17756)" stroke-width="3" />
                  <line x1="147" y1="13.5" x2="191" y2="13.5" stroke="url(#paint2_linear_6349_17756)" stroke-width="3" />
                  <line x1="215" y1="13.5" x2="259" y2="13.5" stroke="url(#paint3_linear_6349_17756)" stroke-width="3" />
                  <circle cx="12" cy="12" r="10" stroke="url(#paint4_linear_6349_17756)" stroke-width="4" />
                  <circle cx="75" cy="12" r="10" stroke="url(#paint5_linear_6349_17756)" stroke-width="4" />
                  <circle cx="139" cy="12" r="10" stroke="url(#paint6_linear_6349_17756)" stroke-width="4" />
                  <circle cx="203" cy="12" r="10" stroke="url(#paint7_linear_6349_17756)" stroke-width="4" />
                  <circle cx="267" cy="12" r="10" stroke="url(#paint8_linear_6349_17756)" stroke-width="4" />
                  <circle cx="12" cy="12" r="3" fill="url(#paint9_linear_6349_17756)" />
                  <circle cx="75" cy="12" r="3" fill="url(#paint10_linear_6349_17756)" />
                  <circle cx="139" cy="12" r="3" fill="url(#paint11_linear_6349_17756)" />
                  <circle cx="203" cy="12" r="3" fill="url(#paint12_linear_6349_17756)" />
                  <circle cx="267" cy="12" r="3" fill="url(#paint13_linear_6349_17756)" />
                  <defs>
                    <linearGradient id="paint0_linear_6349_17756" x1="21.0025" y1="15.5" x2="65.001" y2="15.5" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#DDA027" />
                      <stop offset="0.3198" stop-color="#CE9B2B" />
                      <stop offset="0.6802" stop-color="#FEF48E" />
                      <stop offset="1" stop-color="#FFD046" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_6349_17756" x1="83.0025" y1="15.5" x2="127.001" y2="15.5" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#DDA027" />
                      <stop offset="0.3198" stop-color="#CE9B2B" />
                      <stop offset="0.6802" stop-color="#FEF48E" />
                      <stop offset="1" stop-color="#FFD046" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_6349_17756" x1="147.002" y1="15.5" x2="191.001" y2="15.5" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#DDA027" />
                      <stop offset="0.3198" stop-color="#CE9B2B" />
                      <stop offset="0.6802" stop-color="#FEF48E" />
                      <stop offset="1" stop-color="#FFD046" />
                    </linearGradient>
                    <linearGradient id="paint3_linear_6349_17756" x1="215.002" y1="15.5" x2="259.001" y2="15.5" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#DDA027" />
                      <stop offset="0.3198" stop-color="#CE9B2B" />
                      <stop offset="0.6802" stop-color="#FEF48E" />
                      <stop offset="1" stop-color="#FFD046" />
                    </linearGradient>
                    <linearGradient id="paint4_linear_6349_17756" x1="0.0013628" y1="12.0009" x2="24.0005" y2="12.0009" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#DDA027" />
                      <stop offset="0.3198" stop-color="#CE9B2B" />
                      <stop offset="0.6802" stop-color="#FEF48E" />
                      <stop offset="1" stop-color="#FFD046" />
                    </linearGradient>
                    <linearGradient id="paint5_linear_6349_17756" x1="63.0014" y1="12.0009" x2="87.0005" y2="12.0009" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#DDA027" />
                      <stop offset="0.3198" stop-color="#CE9B2B" />
                      <stop offset="0.6802" stop-color="#FEF48E" />
                      <stop offset="1" stop-color="#FFD046" />
                    </linearGradient>
                    <linearGradient id="paint6_linear_6349_17756" x1="127.001" y1="12.0009" x2="151.001" y2="12.0009" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#DDA027" />
                      <stop offset="0.3198" stop-color="#CE9B2B" />
                      <stop offset="0.6802" stop-color="#FEF48E" />
                      <stop offset="1" stop-color="#FFD046" />
                    </linearGradient>
                    <linearGradient id="paint7_linear_6349_17756" x1="191.001" y1="12.0009" x2="215.001" y2="12.0009" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#DDA027" />
                      <stop offset="0.3198" stop-color="#CE9B2B" />
                      <stop offset="0.6802" stop-color="#FEF48E" />
                      <stop offset="1" stop-color="#FFD046" />
                    </linearGradient>
                    <linearGradient id="paint8_linear_6349_17756" x1="255.001" y1="12.0009" x2="279.001" y2="12.0009" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#DDA027" />
                      <stop offset="0.3198" stop-color="#CE9B2B" />
                      <stop offset="0.6802" stop-color="#FEF48E" />
                      <stop offset="1" stop-color="#FFD046" />
                    </linearGradient>
                    <linearGradient id="paint9_linear_6349_17756" x1="9.00034" y1="12.0002" x2="15.0001" y2="12.0002" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#DDA027" />
                      <stop offset="0.3198" stop-color="#CE9B2B" />
                      <stop offset="0.6802" stop-color="#FEF48E" />
                      <stop offset="1" stop-color="#FFD046" />
                    </linearGradient>
                    <linearGradient id="paint10_linear_6349_17756" x1="72.0003" y1="12.0002" x2="78.0001" y2="12.0002" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#DDA027" />
                      <stop offset="0.3198" stop-color="#CE9B2B" />
                      <stop offset="0.6802" stop-color="#FEF48E" />
                      <stop offset="1" stop-color="#FFD046" />
                    </linearGradient>
                    <linearGradient id="paint11_linear_6349_17756" x1="136" y1="12.0002" x2="142" y2="12.0002" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#DDA027" />
                      <stop offset="0.3198" stop-color="#CE9B2B" />
                      <stop offset="0.6802" stop-color="#FEF48E" />
                      <stop offset="1" stop-color="#FFD046" />
                    </linearGradient>
                    <linearGradient id="paint12_linear_6349_17756" x1="200" y1="12.0002" x2="206" y2="12.0002" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#DDA027" />
                      <stop offset="0.3198" stop-color="#CE9B2B" />
                      <stop offset="0.6802" stop-color="#FEF48E" />
                      <stop offset="1" stop-color="#FFD046" />
                    </linearGradient>
                    <linearGradient id="paint13_linear_6349_17756" x1="264" y1="12.0002" x2="270" y2="12.0002" gradientUnits="userSpaceOnUse">
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
                Recruitment Info
              </h3>
            </Col>

            <Col md={6}>
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
                      name="recruiting_preferences.interested_in"
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
                    {errors?.recruiting_preferences?.interested_in && (
                      <p className="validation-text">
                        {
                          errors?.recruiting_preferences?.interested_in
                            ?.message
                        }
                      </p>
                    )}

                    {/* <svg
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
                    </svg> */}
                  </div>

                </div>
              </div>

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
                      name="recruiting_preferences.college_committed"
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
                    {errors?.recruiting_preferences?.college_committed && (
                      <p className="validation-text">
                        {
                          errors?.recruiting_preferences?.college_committed
                            ?.message
                        }
                      </p>
                    )}

                    {/* <svg
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
                    </svg> */}
                  </div>

                </div>
              </div>

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
                      name="recruiting_preferences.coach_email"
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
                    {errors?.recruiting_preferences?.coach_email && (
                      <p className="validation-text">
                        {
                          errors?.recruiting_preferences?.coach_email
                            ?.message
                        }
                      </p>
                    )}

                    {/* <svg
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
                    </svg> */}
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
                  <label> Coach & Trainer References (optional) </label>
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
                        {errors.recruiting_preferences?.coach_trainer.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

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


            <Col md={6}>
              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label>Scholarship Offers (optional)</label>
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

              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label>
                    {" "}
                    Coach Phone No. (optional)
                  </label>
                  <div className="w-100">
                    <Controller
                      id="recruiting_preferences.coach_contact"
                      name="recruiting_preferences.coach_contact"
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
                    {errors?.recruiting_preferences?.coach_contact && (
                      <p className="validation-text">
                        {errors?.recruiting_preferences?.coach_contact?.message}
                      </p>
                    )}
                  </div>

                </div>
              </div>

              <div className="basic-inputs input-card w-100">
                <div className="input-transparent-blur-fields w-100">
                  <label>Endorsement by coaches/colleges (optional)</label>
                  {/* <PhoneInput placeholder="Enter your number" defaultCountry="PK" {...field} onChange={(data) => field.onChange(data)} /> */}
                  <div className="w-100">
                    <Controller
                      name="recruiting_preferences.endorsements"
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

                          {errors?.recruiting_preferences
                            ?.endorsements && (
                              <p className="validation-text">
                                {
                                  errors?.recruiting_preferences
                                    ?.endorsements.message
                                }
                              </p>
                            )}
                        </div>
                      )}
                    />
                  </div>
                  {/* {errors?.recruiting_preferences?.endorsements && (
                    <p className="validation-text">
                      {
                        errors?.recruiting_preferences?.endorsements
                          .message
                      }
                    </p>
                  )} */}
                </div>
              </div>

              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label>
                    {" "}
                    Athlete Direct Contact Info
                  </label>
                  <div className="w-100">
                    <Controller
                      id="recruiting_preferences.direct_contact"
                      name="recruiting_preferences.direct_contact"
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
                    {errors?.recruiting_preferences?.direct_contact && (
                      <p className="validation-text">
                        {errors?.recruiting_preferences?.direct_contact?.message}
                      </p>
                    )}
                  </div>

                </div>
              </div>
            </Col>
            <Col xs={12}>
              <Row className="mt-4">
                <Col md={4} />

                <Col md={4}>
                  <button
                    style={{ position: "relative" }}
                    type="submit"
                    // onClick={() => navigate("/basic")}
                    className="w-100 primary-btn px-2 py-3 mb-3 mt-3"
                  >
                    <h3> {loading1 ? "Creating..." : "Submit"} </h3>
                    {loading1 && <Spinner size={20} color="black" />}
                  </button>
                </Col>

                <Col md={4} />
              </Row>
            </Col>
          </Row>



        </Container>
      </form>


      <PreviewAdvancedgModal
        setShow={setModal}
        show={modal}
        data={[]}
        getValues={getValues}
      />
    </>
  );
}
