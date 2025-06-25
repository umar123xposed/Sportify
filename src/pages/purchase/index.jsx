import React, { useEffect, useState } from "react";
import "./index.css"
import { Col, Container, Modal, Row, Spinner } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { Elements, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { useMutation } from "@apollo/client";
import { PLACE_ORDER } from "../../graphql/mutation";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { orderPlaceSubmit } from "../../graphql/api-callings";
import { GetCountries, GetState, GetCity } from "react-country-state-city";

const Purchase = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { state } = location
  const qrId = useSelector((state) => state?.profileSlice?.qr?.id)
  const quantity = useSelector((state) => state?.profileSlice?.quantity);
  const userRole = useSelector((state) => state.authSlice?.role);

  // State management
 const [selectedSizes, setSelectedSizes] = useState({});
 const [selectedColors, setSelectedColors] = useState({});
  const [modal, setModal] = useState(false);
  const [addressLine, setAddressLine] = useState("");
  const [errorAddress, setErrorAddress] = useState(null);

  // Country, State, City management
  const [country, setCountry] = useState(null);
  const [currentState, setcurrentState] = useState(null);
  const [city, setCity] = useState(null);
  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [CountryName, setCountryName] = useState();
  const [StateName, setStateName] = useState();
  const [zips, setZips] = useState([]);

  // Payment related state
  const [count, setCount] = useState(1);
  const [cardType, setCardType] = useState(null);
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

  // Initialize default sizes and colors
useEffect(() => {
  if (state?.package?.items) {
    const defaultSizes = {};
    const defaultColors = {};

    state.package.items.forEach((item) => {
      if (item.size && item.size.length > 0) {
        defaultSizes[item.id] = item.size[0];
      }
      if (item.color && item.color.length > 0) {
        defaultColors[item.id] = item.color[0];
      }
    });

    setSelectedSizes(defaultSizes);
    setSelectedColors(defaultColors);
  }
}, [state?.package?.items]);

  // Fetch countries on component mount
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

  // Address validation and submission
  const handleAddress = async () => {
    if (!zips || !city || !CountryName || !StateName) {
      setErrorAddress("⚠️ Please fill in all required address fields.");
      return;
    }

    const isValidZip = await validateZipCode(zips, city, CountryName, StateName);
    if (isValidZip) {
      setErrorAddress("❌ The ZIP code does not match the selected city/state/country.");
      return;
    }

    setModal(true);
  };

  // Generate selected items for order submission
const generateSelectedItems = (items) => {
  return items.map((item) => ({
    vendor_package_item_id: item.id,
    selected_size: selectedSizes[item.id] || item.size?.[0] || null,
    selected_color: selectedColors[item.id] || item.color?.[0] || null,
  }));
};

  // Payment Card Component
  const PaymentCard = ({ setCount, type }) => {
     const stripe = useStripe();
     const elements = useElements();
    const [createVendorOrder] = useMutation(PLACE_ORDER);
    const [cardBrand, setCardBrand] = useState("");
    const [errorMessage, setErrorMessage] = useState();
    const [isProcessing, setIsProcessing] = useState(false);

     const CARD_OPTIONS = {
      showIcon: true,
       style: {
         base: {
          color: "#fff",
             display: "flex",
             alignItems: "center",
             iconColor: "black",
             fontWeight: 500,
             fontSize: "16px",
          height: "44px",
             "::placeholder": { color: "#D3D3D3" },
         },
         invalid: {
           iconColor: "red",
           color: "red",
         },
       },
     };

     const handleSubmit1 = async (event) => {
       event.preventDefault();
       setIsProcessing(true);

       if (!stripe || !elements) {
         setErrorMessage("Stripe.js has not loaded yet.");
         setIsProcessing(false);
         return;
       }

       const cardElement = elements.getElement(CardNumberElement);
       const { error, paymentMethod } = await stripe.createPaymentMethod({
         type: "card",
         card: cardElement,
       });

       if (error) {
         setErrorMessage(error.message);
         setIsProcessing(false);
         setTimeout(() => {
           setErrorMessage();
         }, 3000);
         return;
       }

         setIsProcessing(false);

         const payload = {
           address: {
          address_line: addressLine?.trim() || "",
             city: city,
             province_code: StateName,
             zip_code: zips,
             country: CountryName,
           },
           code_id: qrId,
           items: generateSelectedItems(state?.package?.items),
           payment_method_id: paymentMethod?.id,
           quantity: quantity,
           vendor_package_id: state?.package?.id,
         };

      orderPlaceSubmit(payload, createVendorOrder, navigate, setModal, userRole);
     };

const handleCardChange = (event) => {
  if (event.brand) {
        setCardBrand(event.brand);
  }
};

    return (
      <form onSubmit={handleSubmit1}>
        <div className="mt-2 gray-modal payment-details">
          <Row>
            <Col md={12}>
              <label>Card Number</label>
              <br />
              <div className="m custom_elements">
                <CardNumberElement
                  options={CARD_OPTIONS}
                  onChange={handleCardChange}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <label>Expiry</label>
              <br />
              <div className="custom_elements">
                <CardExpiryElement options={CARD_OPTIONS} />
              </div>
            </Col>
            <Col md={4}>
              <label>CVV</label>
              <br />
              <div className="custom_elements">
                <CardCvcElement options={CARD_OPTIONS} />
              </div>
            </Col>
            <Col md={12}>
              <button
                className="w-100 primary-btn px-2 py-3 mt-3"
                type="submit"
                disabled={isProcessing}
                style={{ opacity: isProcessing ? 0.5 : 1 }}
              >
                <h3>
                  Proceed & Pay
                  {isProcessing ? <Spinner color="#000" size={"20"} /> : <></>}
                </h3>
              </button>
            </Col>
          </Row>
        </div>
      </form>
    );
  };

return (
    <div className="page-wrapper pb-4">
      <div className="profile-header-bg d-flex align-items-end">
          <div className="px-5">
            <Row className="align-items-center">
              <Col xs="auto">
                <div onClick={() => navigate(-1)} className="d-flex align-items-center back-btn1">
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
                        d="M0.457255 9.94802L7.99992 17.4907L9.88525 15.6054L3.28525 9.00535L9.88525 2.40535L7.99992 0.52002L0.457255 8.06269C0.207294 8.31272 0.0668726 8.6518 0.0668726 9.3589 0.207294 9.69798 0.457255 9.94802Z"
                        fill="white"
                      />
                    </svg>
                  <h4>Back</h4>
                </div>
              </Col>
              <Col>
                <h2 className="profile-title text-white mb-0">Select Package Item</h2>
              </Col>
            </Row>
          </div>
        </div>
      <Container>
        
        <Row className="py-5">
          {/* Left Column - Package Items and Address */}
          <Col md={8}>
            {/* Package Items */}
            {state?.package?.items?.map((currentItem, outerIndex) => (
              <div key={outerIndex} className="solid-card quantity-card d-flex mb-3">
                    <div className="quantity-left">
                      <img
                        style={{ height: "200px", objectFit: "contain" }}
                    src={`${import.meta.env.VITE_BASE_URL_IMAGE}${currentItem?.image}`}
                    alt="product"
                      />
                    </div>
                    <div className="quantity-right ms-4">
                      <h3 className="product-titleq">{currentItem?.name}</h3>

                  {/* Color Selection */}
                      <h4 className="product-colorq">
                    {`Color : ${selectedColors && selectedColors[currentItem?.id] ? selectedColors[currentItem?.id] : ""}`}
                      </h4>
                      <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center">
                          {currentItem.color?.map((color, index) => (
                            <div
                              key={index}
                              className="me-2 selected-color"
                              onClick={() =>
                                setSelectedColors((prev) => ({
                                  ...prev,
                                  [currentItem.id]: color,
                                }))
                              }
                            >
                              <div
                                style={{
                                  backgroundColor: color.toLowerCase(),
                              border: selectedColors[currentItem.id] === color
                                      ? "3px solid #000"
                                      : "0 solid #ccc",
                                }}
                                className="color-selection"
                              ></div>
                            </div>
                          ))}
                        </div>
                      </div>

                  {/* Size Selection */}
                      <h4 className="product-colorq">
                    {`Size : ${selectedSizes && selectedSizes[currentItem?.id] ? selectedSizes[currentItem?.id].toUpperCase() : ""}`}
                      </h4>
                  <div className="grid-containerq categories">
                    {currentItem?.size?.map((size, index) => (
                            <div
                              key={index}
                              onClick={() =>
                                setSelectedSizes((prev) => ({
                                  ...prev,
                                  [currentItem.id]: size,
                                }))
                              }
                              className={`single-categoryq ${
                          selectedSizes[currentItem.id] === size ? "selected-cat" : ""
                              }`}
                            >
                              {size?.toUpperCase()}
                            </div>
                    ))}
                      </div>
                    </div>
                  </div>
            ))}

            {/* Address Form */}
            <form className="solidcard summary">
              <h3 className="mb-3">Address Details</h3>

              {/* Street Address */}
              <div className="mb-2">
                <label>Street Address *</label>
              </div>
              <div className="d-flex align-items-center inputfields summary" style={{ height: "50px"}}>
                <input
                  type="text"
                   required={true}
                  placeholder="Address"
                  className="transparent-input-field"
                  value={addressLine}
                  onChange={(e) => {
                    setAddressLine(e.target.value);
                    setErrorAddress(null);
                  }}
                />
              </div>

              {/* Country, State, City, Zip */}
              <Row className="mb-2">
                <Col md={6}>
                  <div className="mb-2">
                    <label>Country *</label>
                  </div>
                  <div className="d-flex align-items-center inputfields summary py-0 my-0" style={{ height: "50px" }}>
                    <select
                      value={country}
                      onChange={(e) => handleCountryChange(e.target.value)}
                      className="input-transparent-blur-fields custom-section-box w-100"
                    >
                      <option className="custom-options" value="">Select Country</option>
                      {countriesList?.map((country) => (
                        <option className="custom-options" key={country.id} value={country.id}>
                          {country?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-2">
                    <label>State *</label>
                  </div>
                  <div className="d-flex align-items-center inputfields summary" style={{ height: "50px" }}>
                    <select
                      value={currentState}
                      onChange={(e) => handleStateChange(e.target.value)}
                      className="input-transparent-blur-fields custom-section-box w-100"
                      disabled={!stateList.length}
                    >
                      <option className="custom-options" value="">Select State / Province</option>
                      {stateList.map((state) => (
                        <option className="custom-options" key={state.id} value={state.id}>
                          {state?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-2">
                    <label>City *</label>
                  </div>
                  <div className="d-flex align-items-center inputfields summary" style={{ height: "50px" }}>
                    <select
                      value={city}
                      onChange={(e) => handleCityChange(e.target.value)}
                      className="input-transparent-blur-fields custom-section-box w-100"
                      disabled={!citiesList.length}
                    >
                      <option value="">Select City</option>
                      {citiesList?.map((city) => (
                        <option className="custom-options" key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-2">
                    <label>Postal Code / Zip Code *</label>
                  </div>
                  <div className="d-flex align-items-center inputfields summary" style={{ height: "50px" }}>
                    <input
                      className="transparent-input-field"
                      placeholder="xxxxx"
                      value={zips}
                      onChange={(e) => {
                        setZips(e.target.value);
                        setErrorAddress(null);
                      }}
                      disabled={!city}
                    />
                  </div>
                </Col>
              </Row>
              <p className="validation-text">{errorAddress || ""}</p>

            </form>
          </Col>

          {/* Right Column - Order Summary */}
          <Col md={4} className="order-summary-col">
                <div className="order-summary-card">
                    

                    {/* Order Summary Details */}
                    <div className="order-summary-details">
                        <h1>Order Summary</h1>
                        <div className="summary-line d-flex justify-content-between">
                            <span>Subtotal (2 items)</span> {/* Display number of selected items */}
                            <span>$210</span>
                        </div>
                        <div className="summary-line d-flex justify-content-between">
                            <span>Shipping Fee</span>
                            <span>$25</span>
                        </div>
                        {/* Separator line */}
                         
                        <div className="summary-line total-line d-flex justify-content-between">
                            <span>Total</span>
                            <span>$235</span>
                        </div>
                    </div>

                    {/* Purchase Button */}
                    <button className="purchase-button mt-4" onClick={handleAddress}>
                         Purchase
                    </button>
                </div>
          </Col>
        </Row>
      </Container>

      {/* Payment Modal */}
      <Modal backdrop={"static"} centered size="md" isOpen={modal} toggle={() => setModal(false)}>
        <Elements stripe={stripePromise}>
          <PaymentCard setCount={setCount} type={cardType} />
        </Elements>
      </Modal>
    </div>
);
};

export default Purchase;
