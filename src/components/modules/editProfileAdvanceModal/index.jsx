import "./index.css";
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

import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, set, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { UPDATE_CHILD_ACCOUNT } from "../../../graphql/mutation";
import { UpdateChildOnSubmit } from "../../../graphql/api-callings";
import Select from "react-select";

//import { handleCreateBasicProfile } from "../../redux/profileSlice";

const EditProfileAdvancedModal = ({ setShow, toggle, show, data , refetch }) => {
console.log(data,'asfsafsafasf')

  const [updateChildProfile, { loading: loading1, error, data:data1 }] =
    useMutation(UPDATE_CHILD_ACCOUNT);
const today = new Date();
const minAllowedDate = new Date();
minAllowedDate.setFullYear(today.getFullYear() - 18);
  const phoneInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const iti = useRef(null);
  const [render , setRendor] = useState(false)
  const navigate = useNavigate();

  const floatOrPositiveIntegerValidation = (value) => {
    if (value === undefined || value === null) return true; // Allow empty values for required to handle
    if (typeof value !== "number" || value <= 0) return false; // Must be a positive number
    return /^\d+(\.\d+)?$/.test(value.toString()); // Allows integers and float values (e.g., 1, 1.0, 2.5)
  };

  const schema = yup.object().shape({
    full_name: yup.string().required("Name is required"),
    nick: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? "" : value)),
    // guardian_name: yup.string().required("Guardian name is required"),
    feet: yup.object().nullable().required("required."),
    inches: yup.object().nullable().required("required"),
    weight: yup
      .number()
      .typeError("Please enter a valid number")
      .test(
        "float-or-integer",
        "Please enter a positive integer or float value",
        (value) => floatOrPositiveIntegerValidation(value)
      )
      .max(999, "Maximum allowed value is 999")
      .required("Weight is required"),

    email: yup
      .string()
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Invalid email"
      )
      .required("Email is required"),
    phone: yup
      .string()
      .required("Please enter your phone number.")
      .matches(/^\d+$/, "Phone number must contain only digits.")
      .max(15, "Phone number must not exceed 15 digits.")
,
    insta: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .url("Enter a valid URL"),
    twi: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .url("Enter a valid URL"),
    iml: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .url("Enter a valid URL"),
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
    dob: yup
      .date()
      .nullable()
      .required("Date of Birth is required")
      .max(minAllowedDate, "You must be at least 18 years old"),
    gender: yup.string().required("Gender is required"),
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
      .nullable()

  });


  const options = [
    { value: 1, label: "1 ft" },
    { value: 2, label: "2 ft" },
    { value: 3, label: "3 ft" },
    { value: 4, label: "4 ft" },
    { value: 5, label: "5 ft" },
    { value: 6, label: "6 ft" },
    { value: 7, label: "7 ft" },
    { value: 8, label: "8 ft" },
    { value: 9, label: "9 ft" },
    { value: 10, label: "10 ft" },
    { value: 11, label: "11 ft" },
    { value: 12, label: "12 ft" },
  ];

  const options2 = [
    { value: 0, label: "0 inch" },
    { value: 1, label: "1 inch" },
    { value: 2, label: "2 inch" },
    { value: 3, label: "3 inch" },
    { value: 4, label: "4 inch" },
    { value: 5, label: "5 inch" },
    { value: 6, label: "6 inch" },
    { value: 7, label: "7 inch" },
    { value: 8, label: "8 inch" },
    { value: 9, label: "9 inch" },
    { value: 10, label: "10 inch" },
    { value: 11, label: "11 inch" },
    { value: 12, label: "12 inch" },
  ];

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
    }),
    menu: (provided) => ({
      ...provided,
      background: "rgba(255, 255, 255, 0.2)", // Dropdown background
      borderRadius: "5px",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(157, 157, 157, 0.3)",
      fontSize: "14px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for the dropdown
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "rgba(255, 255, 255, 0.3)" // Highlighted option background
        : "transparent",
      color: "var(--text-white)", // Text color
      padding: 10,
      cursor: "pointer",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "rgba(255, 255, 255, 0.7)", // Placeholder color
      fontStyle: "italic",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "var(--text-white)", // Selected value color
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "var(--text-white)", // Dropdown arrow color
    }),
    indicatorSeparator: () => ({
      display: "none", // Remove the separator
    }),
  };


  useEffect(() => {

    if (phoneInputRef && phoneInputRef.current) {
      // Initialize the intl-tel-input plugin
      // console.log(phoneInputRef.current, window)
      iti.current = window?.intlTelInput(phoneInputRef.current, {
        initialCountry: "us",
        utilsScript:
          "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js", // Required script for validation
      });
    }

    return () => {
      if (iti.current) {
        iti.current.destroy(); // Clean up the intl-tel-input instance when the component unmounts
      }
    };
  }, [show ]);

  const [selectedOption, setSelectedOption] = useState(""); // State for  radio
  const [imageBase64Profile, setImageBase64Profile] = useState("");
  const [ onChange , setOnchange ] = useState(true)

  const role = useSelector((state) => state.authSlice?.role);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });


  useEffect(() => {
    if (data) {
      setValue("nick", data?.nick_name);
      setValue("full_name", data?.user?.full_name);
      setPreview(
        `${import.meta.env.VITE_BASE_URL_IMAGE}${data?.user?.picture}`
      );
      setSelectedOption(data?.gender);
      setValue("gender", data?.gender);
       // setValue("guardian_name", data?.profile_detail?.guardian_name);

       setValue("dominant_hand", data?.profile_detail?.dominant_hand);

      setValue("phone", data?.user?.phone);
      setValue("feet", {
        value: data?.profile_detail?.height?.feet,
        label: `${data?.profile_detail?.height?.feet} ft`,
      });
      setValue("inches", {
        value: data?.profile_detail?.height?.inches,
        label: `${data?.profile_detail?.height?.inches} inches`,
      });
      setValue("weight", data?.profile_detail?.weight);

      // setRendor(!render)
      data?.social?.map((socalitem) => {
        const parsedItem = JSON.parse(socalitem);

        if (parsedItem?.type == "Twitter") {
          setValue("twi", parsedItem?.link);
          return;
        }

        if (parsedItem?.type == "Instagram") {
          setValue("insta", parsedItem?.link);
          return;
        }

        if (parsedItem?.type == "Tiktok") {
           setValue("tik", parsedItem?.link);
           return;
         }

         if (parsedItem?.type == "IMLCA") {
            setValue("iml", parsedItem?.link);
            return;
          }

          if (parsedItem?.type == "Youtube") {
            setValue("you", parsedItem?.link);
            return;
          }

      });

    setValue("email" , data?.user?.email)
    let defaultDate = new Date(data?.dob);
    setValue("dob", defaultDate);
        setOnchange(true);

    }
  }, [data , show]);

const convertToUTCDate = (dateInput) => {
  const date = new Date(dateInput);
  return date.toISOString().split("T")[0]; // Extracts only the date part
};


  const onSubmit = (updateData) => {
    console.log(updateData,'oyeeee')
   let dateofB = convertToUTCDate(updateData?.dob)
    const payload = {
      social: [
        {
          type: "Twitter",
          link: updateData?.twi,
        },
        {
          type: "Instagram",
          link: updateData?.insta,
        },
        {
          type: "Youtube",
          link: updateData?.you,
        },
        {
          type: "Tiktok",
          link: updateData?.tik,
        },
        {
          type: "IMLCA",
          link: updateData?.iml,
        },
      ],
      id: data?.user?.id,
      //  picture: imageBase64Profile,
      phone: updateData?.phone,
      nick_name: updateData?.nick,
      gender: updateData?.gender,
      full_name: updateData?.full_name,
      dob: dateofB,
      profile_detail: {
        advanced: {
          height: {
            feet: updateData?.feet?.value,
            inches: updateData?.inches?.value,
          },
          dominant_hand: updateData?.dominant_hand,
          weight: updateData?.weight,
          //  guardian_name: updateData?.guardian_name,
        },
      },

      profile_type: "Advanced",
      picture: updateData?.image ? updateData?.image : null,
    };
   console.log(payload, "updated 12");

    UpdateChildOnSubmit(payload, updateChildProfile, setShow, refetch);

  };
  return (
    <>
      <Modal backdrop={true} size="xl" centered isOpen={show}>
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

          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={12}>
                <div className="profile d-flex justify-content-center ">
                  <div
                    style={{ overflow: "hidden" }}
                    className="profile-image text-center mb-2"
                  >
                    <img
                      style={{
                        objectFit: "cover",

                        borderRadius: "50%",
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
                      style={{ border: "none" }}
                      className="primary-btn-img w-100 py-2 px-3"
                    >
                      <h3 className="me-2">Upload image</h3>
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
                              const file = e.target.files[0];
                              field.onChange(file);
                              setOnchange(false);

                              // Generate preview URL
                              if (file) {
                                setPreview(URL.createObjectURL(file));
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
            </Row>

            <Row>
              <Col md={1} />
              <Col md={5}>
                <div className="basic-inputs input-card">
                  <div className="input-transparent-blur-fields">
                    <label> Name</label>
                    <div className="w-100">
                      <Controller
                        id="loginEmail"
                        name="full_name"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            onChange={(e) => {
                              field.onChange(e); // preserve form functionality
                              setOnchange(false); // custom logic
                            }}
                            className="w-100 input-transparent-blur"
                            type="text"
                            alt="text"
                            placeholder="Full Name"
                          />
                        )}
                      />
                      {errors?.full_name && (
                        <p className="validation-text">
                          {errors?.full_name?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={5}>
                <div className="basic-inputs input-card">
                  <div className="input-transparent-blur-fields">
                    <label>Nickname ( Optional )</label>
                    <div className="w-100">
                      <Controller
                        id="loginEmail"
                        name="nick"
                        control={control}
                        render={({ field }) => (
                          <input
                            className="w-100 input-transparent-blur"
                            type="text"
                            alt="text"
                            placeholder="Nickname"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e); // preserve form functionality
                              setOnchange(false); // custom logic
                            }}
                          />
                        )}
                      />
                      {errors?.nick && (
                        <p className="validation-text">
                          {errors?.nick?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={1} />
            </Row>
            <Row>
              <Col md={1} />
              <Col md={5}>
                <div className="basic-inputs input-card">
                  <div className="input-transparent-blur-fields">
                    <label> Date of Birth</label>
                    <div className="w-100">
                      <Controller
                        name="dob"
                        control={control}
                        render={({ field }) => (
                          <div>

                            <DatePicker
                                                          {...field}
                                                          selected={
                                                            field.value ? new Date(field.value) : null
                                                          }
                                                          placeholderText="Date of Birth"
                                                          onChange={(date) => {
                                                            if (date) {
                                                              const fixedDate = new Date(date.setHours(12));
                                                              field.onChange(fixedDate);
                                                            } else {
                                                              field.onChange(null);
                                                            }
                                                            setOnchange(false);
                                                          }}
                                                          className="w-100 input-transparent-blur"
                                                          style={{ width: "100%" }}
                                                          dateFormat="MM/dd/yyyy" // You can set format too if needed
                                                        />

                            {errors.dob && (
                              <p className="validation-text">
                                {errors.dob.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={5}>
                {role == "Parent" && (
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
                              disabled={true}
                              className="w-100 input-transparent-blur"
                              type="text"
                              alt="text"
                              placeholder="abc@gmail.com"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e); // preserve form functionality
                                setOnchange(false); // custom logic
                              }}
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
                )}
              </Col>
              <Col md={1} />
            </Row>

            <Row>
              <Col md={1} />
              <Col md={5}>
                <div className="basic-inputs input-card w-100">
                  <div className="input-transparent-blur-fields w-100">
                    <label>Phone Number</label>
                    {/* <PhoneInput placeholder="Enter your number" defaultCountry="PK" {...field} onChange={(data) => field.onChange(data)} /> */}
                    <div className="w-100">
                      <Controller
                        id="phone"
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            className=" input-transparent-blur"
                            ref={phoneInputRef}
                            id="phone"
                            type="tel"
                            name="phone"
                            onChange={(e) => {
                              field.onChange(e); // preserve form functionality
                              setOnchange(false); // custom logic
                            }}

                            // value={field.value} // Use Formik's value
                          />
                        )}
                      />
                      {errors?.phone && (
                        <p className="validation-text">
                          {errors?.phone?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={5}>
                <div className="basic-inputs input-card  ">
                  <label> Gender </label>

                  {/* Option 1 */}
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <div className="d-flex">
                        <div
                          style={{
                            borderRadius: "5px",
                            cursor: "pointer",
                            width: "fit-content !important",
                          }}
                          className="input-transparent-blur auto-widt me-3 "
                        >
                          <div className="child-right-select ">
                            <label style={{ marginBottom: "0" }}>
                              <input
                                className="me-3"
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={field?.value === "Male"}
                                onChange={() => {
                                  field.onChange("Male");
                                  setSelectedOption("Male");
                                  setOnchange(false);
                                }}
                              />
                              <span> Male </span>
                            </label>
                          </div>
                        </div>

                        <div
                          //onClick={() => setSelectedOption("Female")}
                          style={{
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                          className="input-transparent-blur auto-widt"
                        >
                          <div className="child-right-select ">
                            <label>
                              <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={field?.value === "Female"}
                                onChange={() => {
                                  field.onChange("Female");

                                  setSelectedOption("Female");
                                  setOnchange(false);
                                }}
                              />

                              <span>Female</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                  {errors.gender && (
                    <p className="validation-text">{errors.gender.message}</p>
                  )}
                </div>
              </Col>
              <Col md={1} />
            </Row>
            <Row>
              <Col md={1}></Col>
              <Col md={5}>
                <Row>
                  {/* <Col md={3}>
                  <div className="basic-inputs input-card">
                    <div className="input-transparent-blur-fields">
                      <label> Height</label>
                      <div className="w-100">
                        <Controller
                          id="height"
                          name="height"
                          control={control}
                          render={({ field }) => (
                            <input
                              className="w-100 input-transparent-blur"
                              type="text"
                              alt="text"
                              placeholder="Height"
                              {...field}
                            />
                          )}
                        />
                        {errors?.height && (
                          <p className="validation-text">
                            {errors?.height?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Col> */}

                  <Col md={6}>
                    <div className="input-card w-100">
                      <div className="input-transparent-blur-fields w-100">
                        <label> Height </label>

                        {/* <PhoneInput placeholder="Enter your number" defaultCountry="PK" {...field} onChange={(data) => field.onChange(data)} /> */}
                        <Row>
                          <Col md={6}>
                            <div className="w-100">
                              <Controller
                                name="feet"
                                control={control}
                                defaultValue={{ value: 1, label: "1 ft" }} // Default to null for controlled behavior
                                rules={{ required: "This field is required" }} // Validation rules
                                render={({ field, fieldState: { error } }) => (
                                  <div>
                                    <Select
                                      {...field} // Spread field props for React Hook Form integration
                                      styles={customStyles}
                                      options={options}
                                      onChange={(selectedOption) => {
                                        field.onChange(selectedOption);
                                        setOnchange(false);
                                      }} // Update form state
                                    />
                                    {errors?.feet && (
                                      <p className="validation-text">
                                        {errors?.feet?.message}
                                      </p>
                                    )}
                                  </div>
                                )}
                              />
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="w-100">
                              <Controller
                                name="inches"
                                control={control}
                                defaultValue={{ value: 0, label: "0 inch" }} // Default to null for controlled behavior
                                rules={{ required: "This field is required" }} // Validation rules
                                render={({ field, fieldState: { error } }) => (
                                  <div>
                                    <Select
                                      {...field} // Spread field props for React Hook Form integration
                                      styles={customStyles}
                                      options={options2}
                                      onChange={(selectedOption) => {
                                        field.onChange(selectedOption);
                                        setOnchange(false);
                                      }} // Update form state
                                    />
                                    {errors?.inches && (
                                      <p className="validation-text">
                                        {errors?.inches?.message}
                                      </p>
                                    )}
                                  </div>
                                )}
                              />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="basic-inputs input-card">
                      <div className="input-transparent-blur-fields">
                        <label> Weight / lbs</label>
                        <div className="w-100">
                          <Controller
                            id="weight"
                            name="weight"
                            control={control}
                            render={({ field }) => (
                              <input
                                className="w-100 input-transparent-blur"
                                type="text"
                                alt="text"
                                placeholder="Weight"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e); // preserve form functionality
                                  setOnchange(false); // custom logic
                                }}
                              />
                            )}
                          />
                          {errors?.weight && (
                            <p className="validation-text">
                              {errors?.weight?.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>

              <Col md={5}>
                <div className="basic-inputs input-card  ">
                  <label> Dominant Hand </label>
                  <Controller
                    name="dominant_hand"
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
                                width: "130px",
                              }}
                              className="input-transparent-blur  me-3"
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
                                      setOnchange(false);
                                      //  trigger(
                                      //    "performance_metrics.dominant_hand"
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
                  {errors?.dominant_hand && (
                    <p className="validation-text">
                      {errors?.dominant_hand?.message}
                    </p>
                  )}
                </div>
              </Col>
              {/* <Col md={5}>
              <div className="basic-inputs input-card">
                <div className="input-transparent-blur-fields">
                  <label>Guardian name</label>
                  <div className="w-100">
                    <Controller
                      id="guardian_name"
                      name="guardian_name"
                      control={control}
                      render={({ field }) => (
                        <input
                          className="w-100 input-transparent-blur"
                          type="text"
                          alt="text"
                          placeholder="Guardian name"
                          {...field}
                        />
                      )}
                    />
                    {errors?.guardian_name && (
                      <p className="validation-text">
                        {errors?.guardian_name?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Col> */}
              <Col md={1}></Col>
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
                                onChange={(e) => {
                                  field.onChange(e); // preserve form functionality
                                  setOnchange(false); // custom logic
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
                                onChange={(e) => {
                                  field.onChange(e); // preserve form functionality
                                  setOnchange(false); // custom logic
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
                                onChange={(e) => {
                                  field.onChange(e); // preserve form functionality
                                  setOnchange(false); // custom logic
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
                                onChange={(e) => {
                                  field.onChange(e); // preserve form functionality
                                  setOnchange(false); // custom logic
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
                                onChange={(e) => {
                                  field.onChange(e); // preserve form functionality
                                  setOnchange(false); // custom logic
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
                <button
                  disabled={onChange}
                  style={{ opacity: onChange == true ? "0.5" : "1" }}
                  className="primary-btn w-100 px-2 py-3 my-3"
                  type="submit"
                >
                  <h3> Update </h3>
                </button>
              </Col>

              <Col md={4} />
            </Row>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default EditProfileAdvancedModal;
