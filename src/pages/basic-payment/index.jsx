import "./index.css";
import { Col, Container, Row, Spinner } from "reactstrap";
import pay1 from "./../../assets/pay1.png";
import pay2 from "./../../assets/pay2.png";
import pay3 from "./../../assets/pay3.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js"; // Added missing import
import QrCode from "../../components/elements/qr-card";
import { CardCvcElement, CardExpiryElement, CardNumberElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { CODE_PURCHASE } from "../../graphql/mutation";
import { useMutation } from "@apollo/client";
import { PurchaseQrCodeOnSubmit } from "../../graphql/api-callings";
import { useSelector } from "react-redux";
import QrCodePurchase from "../../components/elements/qr-card-purchase";

export default function BasicPayment() {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const userRole = useSelector((state) => state.authSlice?.role);

  const navigate = useNavigate();
  const { state } = useLocation();

  console.log(state, "state");

  const [count, setCount] = useState(2);
  const [cardType , setCardType] = useState(null)

  const PaymentCard = ({ setCount , type }) => {
     const stripe = useStripe();
     const elements = useElements();

     const [createCodePurchase, { loading: loading1, error, data }] =
       useMutation(CODE_PURCHASE);

       const [cardBrand, setCardBrand] = useState("");
     const [errorMessage, setErrorMessage] = useState();
     const [isProcessing, setIsProcessing] = useState(false);
    const [postalCode, setPostalCode] = useState("");

     const CARD_OPTIONS1 = {
       placeholder: "CVV",

       showIcon: true, // Ensure icon is enabled
       style: {

         base: {
           color:"#fff",
           display: "flex",
           alignItems: "center",
           iconColor: "black",
           fontWeight: 500,
           fontSize: "16px",
           height: "44px", // Set height for all fields
           "::placeholder": { color: "#D3D3D3" },
         },
         invalid: {
           iconColor: "red",
           color: "red",
           border: "1px solid red",
         },
       },
     };

     const CARD_OPTIONS = {
       showIcon: true, // Ensure icon is enabled
       style: {
         base: {
             color:"#fff",
             display: "flex",
             alignItems: "center",
             iconColor: "black",
             fontWeight: 500,
             fontSize: "16px",
             height: "44px", // Set height for all fields
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

       // Create payment method using card details
       const cardElement = elements.getElement(CardNumberElement);
       console.log(cardElement, "cardElementcardElement");

       const { error, paymentMethod } = await stripe.createPaymentMethod({
         type: "card",
         card: cardElement,
         billing_details: {
           address: {
             postal_code: postalCode, // ✅ Send Postal Code
           },
         },
       });

       if (error) {
         setErrorMessage(error.message);
         setIsProcessing(false);
         setTimeout(() => {
           setErrorMessage();
         }, 3000);
         return;
       }

      // props.setPayment(paymentMethod);
       console.log(state,paymentMethod, "paymentMethodpaymentMethod");
         setIsProcessing(false);
         const payload = {
           user_id: state?.userId,
           payment_method_id: paymentMethod?.id,
           package_id: state?.qr?.id,
         };
         console.log( payload ,'what is asfas')
        PurchaseQrCodeOnSubmit( payload, createCodePurchase , navigate , userRole , setCount  );
       // props?.toggle();

       // console.log(user)
     };
const handleCardChange = (event) => {
  if (event.brand) {
    setCardBrand(event.brand);
  }
};

    return (
      <form onSubmit={handleSubmit1}>
        <div className="mt-2 gray-modal payment-details">
          {/* <div className="payment-methods d-flex align-items-center">
            <img
              src={
                 pay2
              }
              alt="Card"
            />
            <p>
              Visa Card
            </p>
          </div> */}
          <Row>
            <Col md={12}>
              <label>Card Number</label>
              <br />
              <div className="cutom-input">
                <CardNumberElement
                  options={  CARD_OPTIONS  }
                  onChange={ handleCardChange }
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <label>Expiry</label>
              <br />
              <div className="cutom-input">
                <CardExpiryElement options={CARD_OPTIONS} />
              </div>
            </Col>
            <Col md={6}>
              <label>CVV</label>
              <br />
              <div className="cutom-input">
                <CardCvcElement options={CARD_OPTIONS1} />
              </div>
            </Col>
            </Row>
            <Row>
            <Col md={12}>
              <label>PostCode</label>
              <br />
              <input
              
                className="w-100"
                type="text"
                maxLength={5}
                placeholder="Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)} // ✅ Capture input
                required
              />
            </Col>
            
            {errorMessage && (
              <p style={{ marginTop: "5px", color: "red", fontSize: "14px" }}>
                {errorMessage}
              </p>
            )}
            <Col md={12}>
              <button
                //() => setCount(3)
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
    <div className="who-we-are-bg">
      <Container>
        <Row className="pt-5">
          <Col md={12}>
            <div onClick={() => navigate("/parent/")} className="d-flex back-btn mb-4">
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
        </Row>
        <Row>
          <Col md={4} />
          <Col md={4}>
            {count === 1 ? (
              <div className="mt-3 gray-modal payment-select-method">
                <h3 className="mb-3">Payment Method</h3>

                <div
                  onClick={() => {
                    setCardType("Master");
                    setCount(2);
                  }}
                  className="payment-items"
                >
                  <div className="payment-methods d-flex align-items-center">
                    <img src={pay1} alt="MasterCard" />
                    <p>Master</p>
                  </div>
                </div>

                <div
                  onClick={() => {
                    setCardType("Visa");
                    setCount(2);
                  }}
                  className="payment-items"
                >
                  <div className="payment-methods d-flex align-items-center">
                    <img src={pay2} alt="Visa" />
                    <p>Visa</p>
                  </div>
                </div>

                <div
                  onClick={() => {
                    setCardType("Paypal");
                    setCount(2);
                  }}
                  className="payment-items"
                >
                  <div className="payment-methods d-flex align-items-center">
                    <img src={pay3} alt="Paypal" />
                    <p>Paypal</p>
                  </div>
                </div>
              </div>
            ) : count === 2 ? (
              <Elements stripe={stripePromise}>
                <PaymentCard setCount={setCount} type={cardType} />
              </Elements>
            ) : (
              <>
                <QrCodePurchase
                  purchase={true}
                  qr={state}
                  heading={state}
                  title={count === 3 && "Download" }
                />
                <div
                  onClick={() => navigate("/parent/")}
                  className="primary-btn px-2 py-3 my-3"
                >
                  <h3>Back to Home</h3>
                </div>
              </>
            )}
          </Col>
          <Col md={4} />
        </Row>
      </Container>
    </div>
  );
}
