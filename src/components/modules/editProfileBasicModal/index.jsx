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

import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, set, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { UPDATE_CHILD_ACCOUNT } from "../../../graphql/mutation";
import { UpdateChildOnSubmit } from "../../../graphql/api-callings";
//import { handleCreateBasicProfile } from "../../redux/profileSlice";
import Select from "react-select"
import toast from "react-hot-toast";
import Loader from "react-spinner-loader"

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

const EditProfileBasicModal = ({
  refetchPlayers,
  setShow,
  toggle,
  show,
  data,
  refetch,
  profile_type,
  active,
  setActive
}) => {
  const [updateChildProfile, { loading: loading1, error, data: data1 }] =
    useMutation(UPDATE_CHILD_ACCOUNT);

  const phoneInputRef = useRef(null);


  const [preview, setPreview] = useState(null);
  const [preview1, setPreview1] = useState(null);
  const [loader, setLoader] = useState(false)


  const iti = useRef(null);
  const [render, setRendor] = useState(false);
  const navigate = useNavigate();

  const schemaAdvance = yup.object().shape({
    full_name: yup.string().required("Name is required"),
    nick: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value)),
    feet: yup.object().nullable().required("required."),
    inches: yup.object().nullable().required("required"),
    weight: yup
      .number()
      .typeError("Please enter a valid number")

      .max(999, "Maximum allowed value is 999")
      .required("Weight is required"),

    phone: yup
      .string()
      .required("Please enter your phone number.")
      .matches(/^\d+$/, "Phone number must contain only digits.")
      .max(15, "Phone number must not exceed 15 digits.")
      .test("isValidPhoneNumber", "Enter a valid phone number", function (value) {
        return iti?.current?.isValidNumber() ?? false;
      }),
    dob: yup
      .date()
      .nullable()
      .required("Date of Birth is required"),
    // .max(minAllowedDate, "You must be at least 18 years old"),
    gender: yup.string().required("Gender is required"),
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
  });

  const schemaBasic = yup.object().shape({
    full_name: yup.string().required("Name is required"),
    nick: yup
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value)),

    gender: yup.string().required("Gender is required"),
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
  });

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

  }, [render]);

  useEffect(() => {
    setRendor(!render)
  }, [show])

  const [selectedOption, setSelectedOption] = useState(""); // State for  radio
  const [imageBase64Profile, setImageBase64Profile] = useState("");

  const newData = useSelector(
    (state) => state.profileSlice?.profile.basicProfile
  );
  const role = useSelector((state) => state.authSlice?.role);

  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver((profile_type && searchParams.get("type") === "advanced" && searchParams.get("type") === "advanced") ? schemaAdvance : schemaBasic),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });
  const [change, setOnchange] = useState(true)

  useEffect(() => {
    console.log(data?.height?.feet)
    if (data) {
      if (data?.user?.picture) {
        setValue("image", {
          type: "image/jpeg",  // a valid MIME type from your list
          size: 1000,          // some number <= 2MB (2 * 1024 * 1024)
          // you can add other file properties if needed
        });
        setPreview(
          `${import.meta.env.VITE_BASE_URL_IMAGE}${data?.user?.picture}`
        );
      }
      console.log("im here run");
      setValue("nick", data?.nick_name);
      setValue("full_name", data?.user?.full_name);

      setSelectedOption(data?.gender);
      setValue("gender", data?.gender);

      setValue("phone", data?.user?.phone);
      // setRendor(!render)
      setValue("email", data?.user?.email);
      let defaultDate = new Date(data?.dob);
      setValue("dob", defaultDate);

      if (data?.height?.feet) {
        setValue("feet", { label: data?.height?.feet, value: data?.height?.feet });
      }

      if (data?.height?.inches) {
        setValue("inches", { label: data?.height?.inches, value: data?.height?.inches });
      }

      if (data?.weight) {
        setValue("weight", data?.weight);
      }


    }
  }, [data, show]);




  const convertToUTCDate = (dateInput) => {
    const date = new Date(dateInput);
    return date.toISOString().split("T")[0]; // Extracts only the date part
  };

  const onSubmit = async (updateData) => {
    let dateofB = convertToUTCDate(updateData?.dob);
    console.log(updateData, 'updated')

    let payload

    if (profile_type && searchParams.get("type") === "advanced") {
      payload = {
        "user_id": parseInt(data?.user?.id),
        "picture": preview1,
        "nick_name": updateData?.nick,
        "gender": updateData?.gender,
        "full_name": updateData?.full_name,
        "advanced": {
          "dob": (updateData?.dob).toISOString().split("T")[0],
          "height": {
            "feet": updateData?.feet?.value,
            "inches": updateData?.inches?.value
          },
          "phone": updateData?.phone,
          "weight": updateData?.weight
        }
      }

    } else {
      payload = {
        "user_id": parseInt(data?.user?.id),
        "picture": preview1,
        "nick_name": updateData?.nick,
        "gender": updateData?.gender,
        "full_name": updateData?.full_name
      }
    }



    console.log(payload, updateData, "updated 12");



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
        toast.success(data?.updatePlayerProfile?.message)
        setActive(!active)
        toggle()


      }

    } catch (e) {
      console.log(e)
      setLoader(false)
    }
  };
  return (
    <>
      <Modal backdrop={true} size="xl" centered isOpen={show} toggle={toggle}>
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
                  <div className="profile-image text-center mb-2">
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
                            className="w-100 input-transparent-blur"
                            type="text"
                            alt="text"
                            onChange={(e) => {
                              field.onChange(e); // preserve form functionality
                              setOnchange(false); // custom logic
                            }}
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
                            {...field}
                            className="w-100 input-transparent-blur"
                            type="text"
                            alt="text"
                            onChange={(e) => {
                              field.onChange(e); // preserve form functionality
                              setOnchange(false); // custom logic
                            }}
                            placeholder="Nickname"
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
                {/* {role == "Parent" && ( */}
                <div className="basic-inputs input-card">
                  <div className="input-transparent-blur-fields">
                    <label>Username</label>
                    <div className="w-100">
                      <Controller
                        id="email"
                        name="email"
                        disabled={true}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            className="w-100 input-transparent-blur"
                            type="text"
                            alt="text"
                            disabled
                            placeholder="username"
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
                {/* )} */}
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
                        {/* Male Option */}
                        <div
                          className="input-transparent-blur auto-widt me-3"
                          style={{
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          <div className="child-right-select">
                            <label style={{ marginBottom: 0 }}>
                              <input
                                type="radio"
                                name={field.name}
                                value="Male"
                                checked={field.value === "Male"}
                                onChange={() => {
                                  field.onChange("Male");
                                  setSelectedOption("Male");
                                  setOnchange(false);
                                }}
                                className="me-3"
                              />
                              <span>Male</span>
                            </label>
                          </div>
                        </div>

                        {/* Female Option */}
                        <div
                          className="input-transparent-blur auto-widt"
                          style={{
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          <div className="child-right-select">
                            <label style={{ marginBottom: 0 }}>
                              <input
                                type="radio"
                                name={field.name}
                                value="Female"
                                checked={field.value === "Female"}
                                onChange={() => {
                                  field.onChange("Female");
                                  setSelectedOption("Female");
                                  setOnchange(false);
                                }}
                                className="me-3"
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
            {
              (profile_type && searchParams.get("type") === "advanced") && (
                <Row>
                  <Col md={1} />

                  <Col md={5}>
                    <div className="basic-inputs input-card w-100">
                      <div className="input-transparent-blur-fields w-100">
                        <label> Phone Number </label>
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
                                onChange={(e) => {
                                  field.onChange(e); // preserve form functionality
                                  setOnchange(false); // custom logic
                                }}
                                placeholder=""
                                type="tel"
                                name="phone"
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
                                  placeholder={"Date of Birth"}
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

                  <Col md={1} />
                  <Col md={1} />
                  <Col md={5}>
                    {role == "Parent" && (
                      <div className="basic-inputs input-card">
                        <div className="input-transparent-blur-fields">
                          <label>Email Address</label>
                          <div className="w-100">
                            <Controller
                              id="email"
                              name="email"
                              disabled={true}
                              control={control}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  className="w-100 input-transparent-blur"
                                  type="text"
                                  alt="text"
                                  onChange={(e) => {
                                    field.onChange(e); // preserve form functionality
                                    setOnchange(false); // custom logic
                                  }}
                                  placeholder="abc@gmail.com"
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
                  <Col md={5}>
                    <Row>


                      <Col md={8}>
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
                                    // defaultValue={{ value: 1, label: "1 ft" }} // Default to null for controlled behavior
                                    rules={{ required: "This field is required" }} // Validation rules
                                    render={({ field, fieldState: { error } }) => (
                                      <div>

                                        <Select
                                          {...field} // Spread field props for React Hook Form integration
                                          styles={customStyles}
                                          options={options}
                                          onChange={(selectedOption) =>
                                            field.onChange(selectedOption)
                                          } // Update form state
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
                                    // defaultValue={{ value: 0, label: "0 inch" }} // Default to null for controlled behavior
                                    rules={{ required: "This field is required" }} // Validation rules
                                    render={({ field, fieldState: { error } }) => (
                                      <div>

                                        <Select
                                          {...field} // Spread field props for React Hook Form integration
                                          styles={customStyles}
                                          options={options2}
                                          onChange={(selectedOption) =>
                                            field.onChange(selectedOption)
                                          } // Update form state
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

                      <Col md={4}>
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
                </Row>
              )
            }




            <Row>
              <Col md={4} />

              <Col md={4}>
                <button type="submit" className="w-100 primary-btn px-2 py-3 my-3 d-flex gap-3" disabled={loader} style={{ opacity: loader && "0.6" }}>
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
                {/* <button
                  className="primary-btn w-100 px-2 py-3 my-4"
                  type="submit"
                >
                  <h3> Update </h3>
                </button> */}
              </Col>

              <Col md={4} />
            </Row>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default EditProfileBasicModal;
