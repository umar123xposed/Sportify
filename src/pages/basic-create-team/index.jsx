import "./index.css"
import { Button, Col, Container, Row } from 'reactstrap';
import forword from "./../../assets/who-we-are-for.png";
import twitter from "./../../assets/twitter.png";
import insta from "./../../assets/instagram.png";
import fg from "./../../assets/fg.png";
import youtube from "./../../assets/youtube.png";
import tiktok from "./../../assets/tiktok.png";
import profile from "./../../assets/profile.png";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { CompeleteProfileUpOnSubmit, CreatechildOnSubmit, UpdatechildOnSubmit } from "../../graphql/api-callings";
import { useMutation } from "@apollo/client";
import { COMPELETE_PROFILE, CREATE_CHILD, UPDATE_CHILD } from "../../graphql/mutation";
import { handleClearProfiles } from "../../redux/profileSlice";
import PreviewBasicgModal from "../../components/modules/previewBasicDetails";

export default function BasicCreateTeam() {
  const dispatch = useDispatch()
  const [startDate, setStartDate] = useState(new Date());
  const [modal2, setModal2] = useState(false);
  const { state } = useLocation()
   const phoneInputRefs = useRef({});
  const iti = useRef(null);
  const navigate = useNavigate();
  const [ modal , setModal ] = useState(false)
   const profile = useSelector(state => state.profileSlice.profile.basicProfile)

  const userRole = useSelector(
     (state) => state.authSlice.role
   );

   console.log(state,'oausyfuiasfiasf')
  const schema = yup.object().shape({
    sports_info: yup.array().of(
      yup.object().shape({
        type: yup.string().required("Name is required"),
        positions: yup
          .array()
          .min(1, "Please enter some text first, then click the (+) button to add it.")
          .required("Please enter some text first, then click the (+) button to add it."),
        team_name: yup
          .string()
          .min(4, "At least 4 Characters required")
          .required("Team Name is required"),
        jersey_no: yup
          .number()
          .typeError("Number Required") // Ensures the input is a number
          .positive("Invalid format") // Checks for positive numbers
          .integer("Invalid format") // Ensures the number is an integer
          .max(999, "Invalid format") // Limits the number to a maximum of 999
          .required("Required"),
        points: yup
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
        goals: yup
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
        coach_contact: yup
          .string()
          .trim()
          .nullable()
          .transform((value) => (value === "" ? null : value))

      })
    ),
  });


 console.log(userRole, "zzzzzz");
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
          positions: [],
          points: "",
          match_played: "",
          jersey_no: "",
          goals: "",
          coach_contact: "",
        },
      ], // Initial default value
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sports_info",
  });


  const PositionsInput = ({ control, index, setValue, watch, error , trigger }) => {
  const [ positionInput, setPositionInput] = useState("");
  const positions = watch(`sports_info.${index}.positions`) || [];

const handlePositionInputChange = (e) => {
  // Regular expression to match only alphanumeric characters and spaces
  const regex = /^[a-zA-Z0-9\s]*$/;

  // If the input matches the regex, update the state
  if (regex.test(e.target.value)) {
    setPositionInput(e.target.value);
  }
};

const handleAddPosition = (e) => {
  if (e.key === "Enter" && positionInput.trim()) {
    e.preventDefault();

    // Add the position to the list
    setValue(`sports_info.${index}.positions`, [
      ...positions,
      positionInput.trim(),
    ]);

    // Trigger validation
    trigger(`sports_info.${index}.positions`);

    // Clear the input field
    setPositionInput("");
  }
};

  const handleOnClick = () => {
    if (positionInput.trim()) {
      // Create a new array by spreading the existing positions and adding the new position
      const updatedPositions = [...positions, positionInput.trim()];

      // Update the state with the new positions array
      setValue(`sports_info.${index}.positions`, updatedPositions);

      // Trigger validation for the positions field
      trigger(`sports_info.${index}.positions`);

      // Clear the input field after adding
      setPositionInput("");
    }
  };

  const handleRemovePosition = (posIndex) => {
    setValue(
      `sports_info.${index}.positions`,
      positions.filter((_, i) => i !== posIndex)
    );
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
              placeholder="Add Positions"
              onChange={(e) => {

                const regex = /^[A-Za-z0-9\s]+$/;

  // If the input matches the regex, update the state
  if (regex.test(e.target.value)) {
    setPositionInput(e.target.value);
  }else{
    setPositionInput("");
  }

              } }
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
      <div
        style={{ display: "flex" }}
        className="mt-2 flex flex-wrap gap-2"
      >
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

  // useEffect(() => {
  //   fields.forEach((field, index) => {
  //     if (!phoneInputRefs.current[index] && window.intlTelInput) {
  //       const inputElement = document.getElementById(`coach_contact_${index}`);
  //       if (inputElement) {
  //         phoneInputRefs.current[index] = window.intlTelInput(inputElement, {
  //           initialCountry: "pk",
  //           utilsScript:
  //             "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  //         });
  //       }
  //     }
  //   });

  //   return () => {
  //     Object.values(phoneInputRefs.current).forEach((iti) => iti?.destroy());
  //   };
  // }, [fields]);

  // Re-run when fields change
  const [selectedOption, setSelectedOption] = useState(""); // State for radio selection

  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

const [ completeProfile , {  loading:loading1, error, data }] =
     useMutation( COMPELETE_PROFILE);

const [createChildAccount , { loading: loading2, error: error2, data: data2 }] =
  useMutation( CREATE_CHILD );

const [updateChildAccount, { loading: loading3, error: error3, data: data3 }] =
  useMutation(UPDATE_CHILD);



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




const convertToUTCDate = (dateInput) => {
  const date = new Date(dateInput);
  return date.toISOString().split("T")[0]; // Extracts only the date part
};

  const onSubmit = async (data) => {

    let updateDate = await convertToUTCDate(profile?.dob);

const profileImage = base64ToFile(
  profile?.picture, // Corrected field
  `${profile?.nick_name}_profile.png`
);
  console.log("Submitted Data:", data);
   if( userRole == "Parent"){

const payload = {

    ...profile,
    picture: profileImage,
    dob: updateDate,
    profile_detail: {
      basic: {
        ...data,
      },

  },
};

console.log(payload, "final");

if(state){


    UpdatechildOnSubmit(
      payload,
      updateChildAccount,
      navigate,
      userRole,
      handleClearProfiles,
      dispatch
    );

}else{
console.log("here");
   CreatechildOnSubmit(
     payload,
     createChildAccount,
     navigate,
     userRole,
     handleClearProfiles,
     dispatch
   );

}

   }else{
const payload = {
  role: "Athlete",
  Athlete: {
    ...profile,
    picture: profileImage,
    dob: updateDate,
    profile_detail: {
      basic: {
        ...data,
      },
    },
  },
};

console.log(payload, "final");

CompeleteProfileUpOnSubmit(
  payload,
  completeProfile,
  navigate,
  handleClearProfiles,
  dispatch
);

}


  };

  return (
    <>
      <div className="who-we-are-bg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <Row className="pt-5">
              <Col md={12}>
                <div className="d-flex justify-content-between  mb-4">
                  <div onClick={() => navigate(-1)} className="d-flex back-btn">
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

                  <h6
                    className="py-2 px-3"
                    onClick={() => setModal2(true)}
                    style={{
                      background: "var(--primary-grad-color1)",
                      borderRadius: "12px",
                      color: "#000",
                      fontSize: "15px",
                    }}
                  >
                    Preview Details
                  </h6>
                </div>
              </Col>
              <Col md={12}></Col>
            </Row>

            {fields.map((field, index) => (
              <>
                <Row className="grad-border px-5 py-4 mx-5 my-3">
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
                        <label> Sport Type</label>
                        <Controller
                          control={control}
                          name={`sports_info.${index}.type`}
                          render={({ field }) => (
                            <div className="w-100">
                              <input
                                className="w-100 input-transparent-blur"
                                type="text"
                                alt="text"
                                placeholder="Sport"
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
                        <label> Jersey Number</label>
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

                    <Row>
                      <div className="basic-inputs input-card">
                        <label>Performance Stats ( Optional )</label>
                      </div>
                      <Col md={4}>
                        <div className="basic-inputs input-card">
                          <div className="input-transparent-blur-fields">
                            <div className="w-100">
                              <Controller
                                control={control}
                                name={`sports_info.${index}.match_played`}
                                render={({ field }) => (
                                  <div className="w-100">
                                    <input
                                      className="w-100 input-transparent-blur"
                                      type="text"
                                      alt="text"
                                      placeholder="Games played"
                                      {...field}
                                    />
                                  </div>
                                )}
                              />
                              {errors.sports_info?.[index]?.match_played && (
                                <p className="validation-text">
                                  {
                                    errors.sports_info[index].match_played
                                      .message
                                  }
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="basic-inputs input-card">
                          <div className="input-transparent-blur-fields">
                            <div className="w-100">
                              <Controller
                                control={control}
                                name={`sports_info.${index}.goals`}
                                render={({ field }) => (
                                  <div className="w-100">
                                    <input
                                      className="w-100 input-transparent-blur"
                                      type="text"
                                      alt="text"
                                      placeholder="Goals"
                                      {...field}
                                    />
                                  </div>
                                )}
                              />
                              {errors.sports_info?.[index]?.goals && (
                                <p className="validation-text">
                                  {errors.sports_info[index].goals.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="basic-inputs input-card">
                          <div className="input-transparent-blur-fields">
                            <div className="w-100">
                              <Controller
                                control={control}
                                name={`sports_info.${index}.points`}
                                render={({ field }) => (
                                  <div className="w-100">
                                    <input
                                      className="w-100 input-transparent-blur"
                                      type="text"
                                      alt="text"
                                      placeholder="Assists"
                                      {...field}
                                    />
                                  </div>
                                )}
                              />
                              {errors.sports_info?.[index]?.points && (
                                <p className="validation-text">
                                  {errors.sports_info[index].points.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <div className="basic-inputs input-card w-100">
                      <div className="input-transparent-blur-fields w-100">
                        <label>Coach Contact ( Optional ) </label>
                        {/* <PhoneInput placeholder="Enter your number" defaultCountry="PK" {...field} onChange={(data) => field.onChange(data)} /> */}
                        <div key={field.id} className="w-100">
                          <Controller
                            control={control}
                            name={`sports_info.${index}.coach_contact`}
                            render={({ field }) => (
                              <div>
                                <input
                                  {...field}
                                  placeholder="Phone / Email"
                                  className="input-transparent-blur"
                                  // Unique ID for each input
                                  type="text"
                                />
                              </div>
                            )}
                          />
                          {errors.sports_info?.[index]?.coach_contact && (
                            <p className="validation-text">
                              {errors.sports_info[index].coach_contact.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </>
            ))}

            <Row>
              <Col md={1} />
              <Col md={10}>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    append({
                      team_name: "",
                      type: "",
                      positions: [],
                      points: "",
                      match_played: "",
                      jersey_no: "",
                      goals: "",
                      coach_contact: "",
                    })
                  }
                  className="mx-3 mt-5  mb-3 py-4 grad-border addmore  d-flex justify-content-center align-items-center"
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
              </Col>
              <Col md={1} />
            </Row>

            <Row>
              <Col md={4} />

              <Col md={4}>
                <button
                  disabled={loading1 || loading2}
                  type="submit"
                  className="w-100 primary-btn px-2 py-3 my-3"
                >
                  <h3>
                    {loading1 || loading2 ? "Creating..." : "Create Profile"}{" "}
                  </h3>
                </button>
              </Col>

              <Col md={4} />
            </Row>
          </Container>
        </form>
      </div>

      <PreviewBasicgModal
        setShow={setModal2}
        show={modal2}
        data={[]}
        getValues={getValues}
      />
    </>
  );
}
