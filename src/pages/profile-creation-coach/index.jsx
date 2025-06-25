import React, { useEffect, useRef } from 'react'
import "./index.css"
import * as yup from "yup";
import { Col, Container, Row, Spinner } from 'reactstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Select from "react-select";
import { COMPELETE_PROFILE } from '../../graphql/mutation';
import { CompeleteProfileUpOnSubmit } from '../../graphql/api-callings';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';


export default function ProfileCreationCoach() {
  const [searchParams] = useSearchParams();
  const ParamRole = searchParams.get("role"); // "recruiters"
  const userRole= useSelector((state)=> state.authSlice?.role)

    const userEmail=useSelector((state)=> state.authSlice?.user?.data?.email)

  const [completeProfile, { loading: loading1, error, data }] =
    useMutation(COMPELETE_PROFILE);



  const phoneInputRef = useRef(null);
  const iti = useRef(null);
  const navigate = useNavigate();

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
  }, []);

  const createProfileSchema = yup.object().shape({
    coach_role: yup.string().nullable().required("This field is required"),
    full_name: yup.string().required("Please enter a name!"),
    // organization_name: yup.string().required("Please enter an organization name!"),
    phone: yup
      .string()

      .required('Please enter your phone number.')
      .test(
        "isValidPhoneNumber",
        "Enter a valid phone number",
        (value) => {

          if (iti?.current && iti?.current?.isValidNumber()) {

            return true
          } else {
            return false
          }
        }
      )
  });

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createProfileSchema),
  });

  const onSubmit = (data) => {
    //console.log(data , 'data')


    const payload = {
      role: 'Coach',
      Coach: {
        coach_role: userRole,
        full_name: data?.full_name,
        phone: data?.phone
      },
    };






    console.log(payload, "payload");

    CompeleteProfileUpOnSubmit(
      payload,
      completeProfile,
      navigate
    );
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



  return (
    <div className="who-we-are-bg">
      <Container>
        <Row className="pt-5 ">
          <Col md={12}>

            <div onClick={() => navigate(-1)} className="d-flex back-btn mb-4">
              <svg
                className="me-2 "
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="14"
                viewBox="0 0 10 18"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.457255 9.94802L7.99992 17.4907L9.88525 15.6054L3.28525 9.00535L9.88525 2.40535L7.99992 0.52002L0.457255 8.06269C0.207294 8.31272 0.0668726 8.6518 0.0668726 9.00535C0.0668726 9.3589 0.207294 9.69798 0.457255 9.94802Z"
                  fill="white"
                />
              </svg>
              <h4>Back</h4>
            </div>

          </Col>
          <Col md={12}>
            <h2 className="who-we-are-heading text-center">Profile Creation </h2>

            <p className="who-we-are-Description py-2 text-center">
              Pick the role that best describes you to personalize your journey.
            </p>

            <Row>
              <Col md={4} />
              <Col md={4}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="">
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

                    <div className="input-card">
                      <div className="input-transparent-blur-fields">
                        <label>Email</label>
                        <div className="w-100">
                          <Controller
                            id="organization_name"
                            name="organization_name"
                            control={control}
                            render={({ field }) => (
                              <input
                                className="w-100 input-transparent-blur"
                                type="text"
                                alt="text"
                                placeholder={userEmail}
                                disabled
                                {...field}
                              />
                            )}
                          />
                          {errors?.organization_name && (
                            <p className="validation-text">
                              {errors?.organization_name?.message}
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

                    <div className="input-card w-100">
                      <div className="input-transparent-blur-fields w-100">
                        <label> Role </label>

                        {/* <PhoneInput placeholder="Enter your number" defaultCountry="PK" {...field} onChange={(data) => field.onChange(data)} /> */}
                        <div className="w-100">
                          <Controller
                            name="coach_role"
                            control={control}
                            defaultValue={userRole} // Default to null for controlled behavior
                            rules={{ required: "This field is required" }} // Validation rules
                            render={({ field}) => (
                              <div>
                                <input
                                  {...field} // Spread field props for React Hook Form integration
                                  className=" input-transparent-blur"
                                  styles={customStyles}
                                  placeholder={userRole}
                                  type='text'
                                  alt='text'
                                  disabled
                                 // Update form state
                                />
                                {errors?.coach_role && (
                                  <p className="validation-text">
                                    {errors?.coach_role?.message}
                                  </p>
                                )}
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-100 px-5 mt-5">
                      <button
                        type="submit"
                        className="w-100 primary-btn px-2 py-3 my-3"
                      >
                        <h3>{loading1 ? "Creating..." : "Next"} </h3>

                      </button>
                    </div>
                  </div>
                </form>
              </Col>
              <Col md={4} />
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
