import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import * as yup from "yup";
import { Col, Container, Row, Spinner } from "reactstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import Select from "react-select";
import { COMPELETE_PROFILE } from "../../graphql/mutation";
import { CompeleteProfileUpOnSubmit } from "../../graphql/api-callings";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Map from "../../components/modules/map";
import { useSelector } from "react-redux";
import Loader from "react-spinner-loader"

export default function ProfileCreationRecriut() {
  const [searchParams] = useSearchParams();
  const [modal, setModal] = useState(false);
  const [selectPlace, setSelectedPlace] = useState(null);
  const [selectPlaceError, setSelectedPlaceError] = useState(null);
  const userRole = useSelector((state) => state.authSlice?.role);
  const email = useSelector((state) => state.authSlice?.user?.data?.email);

  const toggle = () => setModal(!modal);
  const closeModal = () => {
    setModal(false);
  };
  useEffect(() => {
    // setModal(selectPlace?.show1);
    setSelectedPlaceError(false);
  }, [selectPlace]);

  console.log(selectPlace, "assafasfasf");
  const [completeProfile, { loading, error, data }] =
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
    full_name: yup.string().required("Please Enter a FullName!"),
    phone: yup
      .string()
      .required("Please enter your phone number.")
      .test("isValidPhoneNumber", "Enter a valid phone number", (value) => {
        if (iti?.current && iti?.current?.isValidNumber()) {
          return true;
        } else {
          return false;
        }
      }),
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
    console.log("hassannnnnnnnnnnnnn", selectPlace);

    //console.log(data , 'data')
    if (
      !selectPlace ||
      selectPlace?.addres == null

      // || (selectPlace.addres == null ||  selectPlace.addres == undefined || selectPlace.address == "" )
    ) {
      setSelectedPlaceError(true);
      return;
    }

    const payload = {
      role: "Recruiter",
      Recruiter: {
        preferences: {
          longitude: selectPlace?.lat,
          latitude: selectPlace?.lng,
        },
        phone: data?.phone,
        full_name: data?.full_name,
      },
    };

    console.log(payload, "payload");
    CompeleteProfileUpOnSubmit(payload, completeProfile, navigate);
  };

  const options = [
    { value: "Head", label: "Head" },
    { value: "Assistant", label: "Assistant" },
    { value: "Vanilla", label: "Vanilla" },
    { value: "Executive", label: "Executive" },
    { value: "Others", label: "Others" },
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

  return (
    <>
      <div className="">
        <Container>
          <Row className="pt-5 ">
            <Col md={12}>
              <div
                onClick={() => navigate(-1)}
                className="d-flex back-btn mb-4"
              >
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
          </Row>
          <Row>
            <Col md={12}>
              <h2 className="who-we-are-heading text-center">
                Recruiter Profile Creation
              </h2>
              <p className="who-we-are-Description py-2 text-center">
                Pick the role that best describes you to personalize your
                journey.
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md={1} />

                  <Col md={5}>
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
                  </Col>
                  <Col md={5}>
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
                                placeholder={email}
                                type="text"
                                alt="text"
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
                        <label> Recruitment Area Preferences</label>

                        <div
                          onClick={() => toggle()}
                          style={{ height: "45px", cursor: "pointer" }}
                          className="w-100 d-flex input-transparent-blur justify-content-between align-items-center px-2"
                          title={selectPlace?.addres?.formattedAddress}
                        >
                          <div className="text-truncate flex-grow-1 pe-2" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {selectPlace?.addres?.formattedAddress || "Select location"}
                          </div>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="20"
                            viewBox="0 0 16 20"
                            fill="none"
                          >
                            <path
                              d="M8.00092 9.86525C8.49842 9.86525 8.92375 9.68808 9.27692 9.33375C9.63025 8.97942 9.80692 8.5535 9.80692 8.056C9.80692 7.5585 9.62975 7.13308 9.27542 6.77975C8.92109 6.42658 8.49509 6.25 7.99742 6.25C7.49992 6.25 7.07459 6.42717 6.72142 6.7815C6.36809 7.13583 6.19142 7.56183 6.19142 8.0595C6.19142 8.557 6.36859 8.98233 6.72292 9.3355C7.07726 9.68867 7.50325 9.86525 8.00092 9.86525ZM7.99917 17.5135C9.95551 15.7622 11.4526 14.0823 12.4904 12.474C13.5283 10.8657 14.0472 9.457 14.0472 8.248C14.0472 6.425 13.468 4.92633 12.3097 3.752C11.1513 2.57767 9.71451 1.9905 7.99917 1.9905C6.28384 1.9905 4.847 2.57767 3.68867 3.752C2.53034 4.92633 1.95117 6.425 1.95117 8.248C1.95117 9.457 2.47009 10.8657 3.50792 12.474C4.54576 14.0823 6.04284 15.7622 7.99917 17.5135ZM7.99917 19.5095C5.4825 17.3288 3.59534 15.2994 2.33767 13.4212C1.08 11.5429 0.451172 9.8185 0.451172 8.248C0.451172 5.94033 1.19759 4.07208 2.69042 2.64325C4.18342 1.21442 5.953 0.5 7.99917 0.5C10.0453 0.5 11.8149 1.21442 13.3079 2.64325C14.8008 4.07208 15.5472 5.94033 15.5472 8.248C15.5472 9.8185 14.9183 11.5429 13.6607 13.4212C12.403 15.2994 10.5158 17.3288 7.99917 19.5095Z"
                              fill="white"
                            />
                          </svg>
                        </div>

                        {selectPlaceError && (
                          <p className="validation-text">
                            {"Please Select Location"}
                          </p>
                        )}
                      </div>
                    </div>
                  </Col>

                  <Col md={1} />

                  <Col md={4}></Col>
                  <Col md={4}>
                    <div className="">
                      <div className="w-100 px-5 mt-5">
                        {/* <button
                          style={{ position: "relative" }}
                          type="submit"
                          className="w-100 primary-btn px-2 py-3 my-3"
                        >
                          <h3>{loading ? "Creating..." : "Next"} </h3>
                          {loading && <Spinner size={20} color="black" />}
                        </button> */}
                        <button type="submit" className="w-100 primary-btn d-flex gap-3 px-2 py-3 my-3" disabled={loading} style={{ opacity: loading && "0.6" }}>
                          Next
                          {
                            loading &&
                            (<Loader show={true}
                              spinnerSize="16px"
                              radius="10"

                              color="red"
                            />)
                          }
                        </button>
                      </div>
                    </div>
                  </Col>
                  <Col md={4}></Col>
                </Row>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
      <Modal
        backdrop={"static"}
        centered
        size="lg"
        isOpen={modal}
        toggle={toggle}
      >
        <Map state={setSelectedPlace} setModal={closeModal} />
      </Modal>
    </>
  );
}
