import "./index.css"
import { Col, Container, Modal, Row } from 'reactstrap';

import * as yup from "yup";

import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { UpdateChildOnSubmit, UpdateParentOnSubmit } from "../../../graphql/api-callings";
import { useMutation } from "@apollo/client";
import { UPDATE_CHILD_ACCOUNT, UPDATE_PROFILE } from "../../../graphql/mutation";
import Select from "react-select";
import profile from "./../../../assets/profile.png";
import AdvanceImage from "../editAdvanceImage";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
//import { handleCreateBasicProfile } from "../../redux/profileSlice";
import Loader from "react-spinner-loader"

export default function EditProfileModal({ setShow, toggle, show, data, refetch }) {

  const options1 = [
    { value: "Head", label: "Head Coach" },
    { value: "Assistant", label: "Assistant Coach" },
    { value: "Performance", label: "Performance Coach" },
    { value: "Executive", label: "Executive Coach" },
  ];

  const navigate = useNavigate();

  const role = useSelector((state) => state.authSlice?.role);

  const [preview, setPreview] = useState(null)
  const [active, setActive] = useState(false)
  const [loader, setLoader] = useState(false)

  const createProfileSchema = yup.object().shape({

    full_name: yup.string().required("Please enter a full name!"),
    phone: yup.string()
      .required("Please enter your phone number.")
      .matches(/^\d+$/, "Phone number must contain only digits.")
      .max(15, "Phone number must not exceed 15 digits.")
      .test("isValidPhoneNumber", "Enter a valid phone number", function (value) {
        return iti?.current?.isValidNumber() ?? false;
      }),
    image: yup
      .mixed()
      .nullable(),
    relation: yup.object().nullable().required("This field is required"),

  });





  const phoneInputRef = useRef(null);
  const iti = useRef(null);

  useEffect(() => {
    setActive(!active)
  }, [show])

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
  }, [active]);

  const [updateProfile, { loading: loading1, error, data: data1 }] =
    useMutation(UPDATE_PROFILE);


  const options = [
    { value: "Mother", label: "Mother" },
    { value: "Father", label: "Father" },
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


  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createProfileSchema),
  });

  console.log(data, "data");

  useEffect(() => {
    if (data) {

      console.log(data, 'asfsaf')
      setValue("full_name", data?.full_name);
      setValue("phone", data?.phone);
      setValue("relation", {
        value: data?.meta?.relation,
        label: data?.meta?.relation,
      });
      if (data?.picture) {

        setPreview(`${import.meta.env.VITE_BASE_URL_IMAGE}${data?.picture}`);

      }

    }
  }, [data]);

  const submit = async (data2) => {
    console.log(data, 'what hehehe')

    const payload = {
      full_name: data2?.full_name,
      phone: data2?.phone,
      meta: {
        relation: data2?.relation?.value,
      },
      picture: data2?.image
    }

    // console.log(payload, "payload");
    try {
      setLoader(true)

      const { data } = await updateProfile({
        variables: {
          input: payload
        },
        "fetch-policy": "no-cache"
      })

      if (data) {
        setLoader(false)
        toast.success(data?.updateProfile?.message)
        setActive(!active)
        toggle()


      }

    } catch (e) {
      console.log(e)
      setLoader(false)
    }

    // UpdateParentOnSubmit(payload, updateProfile, setShow, refetch, setPreview);

  }


  return (
    <>
      <Modal size="md" centered isOpen={show}>
        <div className="solid-card">
          <div className="d-flex justify-content-end mb-3">
            <svg
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                reset()
                setShow(false)
              }}
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
            <div className="">
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
                                //   setOnchange(false);
                                const file = e.target.files[0];
                                // Generate preview URL
                                if (file) {
                                  field.onChange(file);
                                  setPreview(URL.createObjectURL(file));
                                }
                              }} // Store the file in form state
                            />

                            {errors?.image && (
                              <p className="validation-text">
                                {errors?.image?.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </Col>
              </Row>

              <div className="input-card">
                <div className="input-transparent-blur-fields">
                  <label> Full Name</label>
                  <div className="w-100">
                    <Controller
                      id="loginEmail"
                      name="full_name"
                      control={control}
                      render={({ field }) => (
                        <input
                          className="w-100 input-transparent-blur"
                          placeholder="Full Name"
                          type="text"
                          alt="text"
                          {...field}
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

              <div className="input-card w-100">
                <div className="input-transparent-blur-fields w-100">
                  <label> Phone</label>
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

              {
                role === "Parent" &&
                <div className="input-card w-100">
                  <div className="input-transparent-blur-fields w-100">
                    <label> Relation </label>

                    {/* <PhoneInput placeholder="Enter your number" defaultCountry="PK" {...field} onChange={(data) => field.onChange(data)} /> */}
                    <div className="w-100">
                      <Controller
                        name="relation"
                        control={control}
                        //  defaultValue={null} // Default to null for controlled behavior
                        rules={{ required: "This field is required" }} // Validation rules
                        render={({ field, fieldState: { error } }) => (
                          <div>
                            <Select
                              {...field} // Spread field props for React Hook Form integration
                              styles={customStyles}
                              //   menuPortalTarget={document.body}
                              options={[
                                { value: "Mother", label: "Mother" },
                                { value: "Father", label: "Father" },
                              ]}
                              placeholder={"Select Relation"}
                              onChange={(selectedOption) =>
                                field.onChange(selectedOption)
                              } // Update form state
                            />
                            {errors?.relation && (
                              <p className="validation-text">
                                {errors?.relation?.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>
              }



              <div className="w-100 px-5 mt-5">
                {/* <button
                  type="submit"
                  className="w-100 primary-btn px-2 py-3 my-3"
                >
                  <h3>{"Update Profile"} </h3>
                </button> */}
                <button type="submit" className="w-100 primary-btn px-2 py-3 my-3" disabled={loader} style={{ opacity: loader && "0.6" }}>
                  Update Profile
                  {
                    loader &&
                    (<Loader show={true}
                      spinnerSize="16px"
                      radius="10"

                      color="red"
                    />)
                  }
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>


    </>
  );
}
