import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Modal, ModalBody } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { IoIosArrowBack } from 'react-icons/io'; // Back arrow icon
import { useMutation } from "@apollo/client";
// import { COACH_PURCHASE } from "../../graphql/mutation";
import { useSelector, useDispatch } from "react-redux";
import { setClubName, setLocation, setPhoneNumbers, setCountrys, setCitys } from "../../redux/profileSlice";
import { GetCountries, GetState, GetCity } from "react-country-state-city";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


// You might need a library for phone input with country code, e.g., react-phone-input-2
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';

const CreateClubPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const type = useSelector((state) => state.profileSlice.organizationType)
  const User = useSelector((state) => state.authSlice);

  console.log(User.user?.data?.email, "what is type");
  // State for form fields
  const [clubname, setClubname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); // Or use state for the phone input library
  const [role, setRole] = useState('Head'); // Assuming role comes from previous selection
  const [showClubCodeModal, setShowClubCodeModal] = useState(false); // State for the club code modal
  const [clubCode, setClubCode] = useState('CLUBXYZ123'); // State to hold the generated club c
  const [country, setCountry] = useState(null);
  const [currentState, setcurrentState] = useState(null);
  const [city, setCity] = useState(null);
  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [CountryName, setCountryName] = useState();
  const [StateName, setStateName] = useState();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const userRolee = useSelector((state) => state.authSlice?.role)

  const phoneInputRef = useRef(null);
  const iti = useRef(null);

  useEffect(() => {

    GetCountries().then((result) => {
      setCountriesList(result);
    });
  }, []);




  // Fetch states when country changes
  useEffect(() => {
    if (country) {
      GetState(parseInt(country)).then((result) => {
        setStateList(result);
      });
    }
  }, [country]);

  // Fetch cities when state changes
  useEffect(() => {
    if (currentState) {
      GetCity(parseInt(country), parseInt(currentState)).then((result) => {
        setCitiesList(result);
      });
    }
  }, [currentState]);

  useEffect(() => {
    if (phoneInputRef && phoneInputRef.current) {
      iti.current = window?.intlTelInput(phoneInputRef.current, {
        initialCountry: "us",
        utilsScript:
          "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
      });
    }

    return () => {
      if (iti.current) {
        iti.current.destroy();
      }
    };
  }, []);


  // Handlers for country, state, city selection
  const handleCountryChange = (code) => {
    setCountry(code);
    const findname = countriesList.find(obj => obj.id == code);
    const result = findname ? findname.iso2 : findname.name;
    setCountryName(result);
    setErrorAddress(null);
  };

  const handleStateChange = (code) => {
    setcurrentState(code);
    const findname = stateList.find(obj => obj.id == code);
    const result = findname.state_code;
    setStateName(result);
    setErrorAddress(null);
  };

  const handleCityChange = (cityName) => {
    setCity(cityName);
    setErrorAddress(null);
  };

  // const purchaseId = useSelector((state) => state.profileSlice.purchaseId);
  // const paymentMethodId = useSelector((state) => state.profileSlice.paymentMethodId);
  // const organizationType = useSelector((state) => state.profileSlice.organizationType);

  // const [createCoachPurchase, { loading, error, data }] = useMutation(COACH_PURCHASE);

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const createClubSchema = yup.object().shape({
    clubName: yup.string().required("Please enter a club name!"),
    phone: yup.string()
      .required("Please enter your phone number.")
      .matches(/^\d+$/, "Phone number must contain only digits.")
      .max(15, "Phone number must not exceed 15 digits.")
      .test("isValidPhoneNumber", "Enter a valid phone number", function (value) {
        return iti?.current?.isValidNumber() ?? false;
      }),
    city: yup
      .mixed()
      .test(
        "is-state-required",
        "Please select city!",
        function (value) {
          const { cityOptions } = this.options.context || {};
          if (cityOptions && cityOptions.length > 0) {
            return !!value;
          }
          return true;
        }
      ),
    country: yup
      .mixed()
      .required("Please select  country!"),
    state: yup
      .mixed()
      .test(
        "is-state-required",
        "Please select state!",
        function (value) {

          const { stateOptions } = this.options.context || {};

          if (stateOptions && stateOptions.length > 0) {
            return !!value;
          }
          return true;
        }
      ),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createClubSchema),
    mode: "onChange",
    context: {
      countryOptions: countriesList,
      stateOptions: stateList, // ← MUST be defined
      cityOptions: citiesList, // ← MUST be defined
    },
  });


  const submit = (data) => {
    console.log(data)
    if (data.clubName) {
      // Get country name
      const findCountry = countriesList.find(obj => obj.id == country);
      const countryName = findCountry ? findCountry.iso2 : '';
      console.log(countryName)

      // Get state name
      const findState = stateList.find(obj => obj.id == currentState);
      const stateName = findState ? findState.state_code : '';

      // Get city name
      const findCity = citiesList.find(obj => obj.id == selectedCity);
      const cityName = findCity ? findCity.name : '';
      console.log(cityName)

      // Dispatch all values
      dispatch(setClubName(data.clubName));
      dispatch(setCountrys(countryName));
      dispatch(setCitys(cityName));
      dispatch(setPhoneNumbers(data.phone));

      navigate('/coach/checkout-payment');
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Club Details:', { clubname, email, phoneNumber, role });
    navigate("/coach/create-coach-profile")
    // Navigate to the next page (e.g., team creation or dashboard)
    // navigate('/next-page');
  };

  useEffect(() => {
    setValue("email", User.user?.data?.email);
  }, [])

  return (
    <>
      <div className="create-club-container">
        <Container>
          <Row className="pt-md-3 ">
            <Col md={12}>
              <div
                onClick={() => {
                  // dispatch(handleClearProfiles());
                  navigate(-1);
                }}
                className="d-flex back-btn mb-2"
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
              <h3 className="page-main-heading">{`${type} Details`}</h3>
            </Col>
            <Col xs={12} className="d-flex justify-content-center">
              {/* <div className="my-2 d-flex justify-content-center input-transparent-blur1 py-sm-3 py-2 px-sm-3 px-2 mx-sm-0 mx-5 ">
                <svg width="150" height="22" viewBox="0 0 190 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="21" y1="13.5" x2="65" y2="13.5" stroke="white" stroke-width="3" />
                  <line x1="83" y1="13.5" x2="127" y2="13.5" stroke="white" stroke-width="3" />

                  <circle cx="12" cy="12" r="10" stroke="url(#paint0_linear_6349_16208)" stroke-width="4" />
                  <circle cx="75" cy="12" r="10" stroke="white" stroke-width="4" />
                  <circle cx="139" cy="12" r="10" stroke="white" stroke-width="4" />

                  <circle cx="12" cy="12" r="3" fill="url(#paint1_linear_6349_16208)" />
                  <circle cx="75" cy="12" r="3" fill="white" />
                  <circle cx="139" cy="12" r="3" fill="white" />

                  <defs>
                    <linearGradient id="paint0_linear_6349_16208" x1="0.0013628" y1="12.0009" x2="24.0005" y2="12.0009" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#DDA027" />
                      <stop offset="0.3198" stop-color="#CE9B2B" />
                      <stop offset="0.6802" stop-color="#FEF48E" />
                      <stop offset="1" stop-color="#FFD046" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_6349_16208" x1="9.00034" y1="12.0002" x2="15.0001" y2="12.0002" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#DDA027" />
                      <stop offset="0.3198" stop-color="#CE9B2B" />
                      <stop offset="0.6802" stop-color="#FEF48E" />
                      <stop offset="1" stop-color="#FFD046" />
                    </linearGradient>
                  </defs>
                </svg>



              </div> */}
            </Col>
          </Row>
          <Row className="justify-content-center mt-4 mb-5 pb-5">
            <Col xs={12}>


              <div className="create-club-card">
                <Form onSubmit={handleSubmit(submit)}>
                  <Row className=''>
                    <Col md={6}>
                      <FormGroup className='mb-0'>
                        <Label for="clubName" className="form-label">
                          {type} Name
                        </Label>
                        <Controller
                          name="clubName"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              type="text"
                              id="clubName"
                              className="form-input"
                              placeholder={`Enter your ${type} name`}
                            />
                          )}
                        />
                        {errors?.clubName && (
                          <p className="validation-text">
                            {errors?.clubName?.message}
                          </p>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className='mb-0'>
                        <Label for="email" className="form-label">
                          Email
                        </Label>
                        <Input
                          type="email"
                          name="email"
                          id="email"
                          style={{ opacity: "0.8" }}
                          defaultValue={User.user?.data?.email}
                          disabled={true}
                          value={User?.data?.user?.email}
                          // onChange={(e) => setEmail(e.target.value)}
                          className="form-input"
                          placeholder="johndoe12"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className='mb-0'>
                        <Label for="phoneNumber" className="form-label">
                          Phone Number
                        </Label>
                        <div className="w-100">
                          <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                              <input
                                {...field}
                                className="form-input"
                                ref={phoneInputRef}
                                id="phone"
                                type="tel"
                                name="phone"
                              />
                            )}
                          />
                          {errors?.phone && (
                            <p className="validation-text">
                              {errors?.phone?.message}
                            </p>
                          )}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className='mb-0'>
                        <Label for="role" className="form-label">
                          Role
                        </Label>
                        {/* Role input, likely disabled as it's selected previously */}
                        <Input
                          type="text"
                          name="role"
                          id="role"
                          value={`${userRolee} Coach`} // Display the role selected previously
                          className="form-input"
                          disabled // Make it disabled as per design
                        />
                      </FormGroup>
                      {
                        console.log(userRolee)
                      }
                    </Col>
                    <Col md={6}>
                      <FormGroup className='mb-0'>
                        <Label for="country" className="form-label">
                          Country
                        </Label>
                        <Controller
                          name="country"
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="select"
                              name="country"
                              id="country"
                              value={country}
                              onChange={(e) => {
                                setCountry(e.target.value);
                                setSelectedState(""); // Reset state when country changes
                                setSelectedCity(""); // Reset city when country changes
                                field.onChange(e.target.value)
                              }}
                              className="form-input"
                            >
                              <option value="">Select Country</option>
                              {countriesList.map((country) => (
                                <option key={country.id} value={country.id}>
                                  {country.name}
                                </option>
                              ))}
                            </Input>
                          )} />
                        {errors?.country && (
                          <p className="validation-text">{errors?.country?.message}</p>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className='mb-0'>
                        <Label for="state" className="form-label">
                          State
                        </Label>
                        <Controller
                          name="state"
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="select"
                              name="state"
                              id="state"
                              value={currentState}
                              onChange={(e) => {
                                setcurrentState(e.target.value);
                                setSelectedCity(""); // Reset city when state changes
                                field.onChange(e.target.value)
                              }}
                              className="form-input"
                              disabled={!country} // Disable if no country selected
                            >
                              <option value="">Select State</option>
                              {stateList.map((state) => (
                                <option key={state.id} value={state.id}>
                                  {state.name}
                                </option>
                              ))}
                            </Input>
                          )} />
                        {errors?.state && (
                          <p className="validation-text">{errors?.state?.message}</p>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className='mb-0'>
                        <Label for="city" className="form-label">
                          City
                        </Label>
                        <Controller
                          name="city"
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="select"
                              name="city"
                              id="city"
                              value={selectedCity}
                              onChange={(e) => {
                                setSelectedCity(e.target.value)
                                field.onChange(e.target.value)
                              }}
                              className="form-input"
                              disabled={!currentState} // Disable if no state selected
                            >
                              <option value="">Select City</option>
                              {citiesList.map((city) => (
                                <option key={city.id} value={city.id}>
                                  {city.name}
                                </option>
                              ))}
                            </Input>
                          )} />
                        {errors?.city && (
                          <p className="validation-text">{errors?.city?.message}</p>
                        )}
                      </FormGroup>
                    </Col>

                  </Row>

                  <div className="containerbutton">
                    <button type="submit" className="primary-btn mt-4 px-5 py-3">
                      Next
                    </button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Club Code Modal */}
      <Modal
        isOpen={showClubCodeModal}
        toggle={() => setShowClubCodeModal(false)}
        centered
        size="md"
        className="club-code-modal"
      >
        <ModalBody className="club-code-modal-body">
          <div
            className="modal-close-icon"
            onClick={() => setShowClubCodeModal(false)}
          >
            <IoIosArrowBack
              className="back-icon"
              style={{ transform: "rotate(90deg)" }}
            />{" "}
            {/* Using back icon rotated for close */}
          </div>
          <div className="modal-content-wrapper">
            {" "}
            {/* Wrapper for padding and content */}
            <h3 className="modal-title">Club Code</h3>
            <p className="modal-description">
              Use this code to add new teams under your club.
            </p>
            <div className="club-code-input-section">
              <div className="club-code-display">{clubCode}</div>{" "}
              {/* Display the club code */}
              <button
                className="copy-code-button"
                onClick={() => navigator.clipboard.writeText(clubCode)}
              >
                {" "}
                {/* Copy code button */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M4.33333 10H3C2.33333 10 2 9.5 2 9V3C2 2.5 2.33333 2 3 2H9C9.5 2 10 2.33333 10 3V4.33333M12 5.66667V13C12 13.5 11.6667 14 11 14H6C5.5 14 5 13.6667 5 13V5.66667C5 5.16667 5.33333 4.83333 6 4.83333H11C11.6667 4.83333 12 5.16667 12 5.66667Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Copy Code
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CreateClubPage;
