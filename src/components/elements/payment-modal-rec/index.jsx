import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { handleClearProfile, handlePackageType, setPaymentMethodId } from "../../../redux/profileSlice";
import { useMutation } from "@apollo/client";
import { Create_Child, Create_Sport, COACH_PURCHASE, RECRUITER_PURCHASE, COMPELETE_PROFILE } from "../../../graphql/mutation";
import toast from "react-hot-toast";



const PaymentModalRec = ({ location }) => {
    const purchaseDetails = useSelector(
      (state) => state.profileSlice
    );
    const pagename = useSelector((state) => state.profileSlice.PackageName); //


 console.log(purchaseDetails, "purchaseDetails");
    const [createRecruiterPurchase, { loading:LoadingPurchase, error1, data1 }] = useMutation(RECRUITER_PURCHASE);



    const [isProcessing, setIsProcessing] = useState(false)
    const [errorMessage, setErrorMessage] = useState()
    const [loader, setLoader] = useState(false)


    const [Child_Create] = useMutation(Create_Child)
    const [Athlete_Create] = useMutation(COMPELETE_PROFILE)
    const [Sport_Create] = useMutation(Create_Sport)

    const [searchParams] = useSearchParams()

    const navigate = useNavigate()

    const stripe = useStripe();
    const elements = useElements();

    const dispatch = useDispatch();

    useEffect(() => {
        setLoader(false)
    },[])

    const handlePayNowClick = async (event) => {
        event.preventDefault();

        setIsProcessing(false)
        if (!stripe || !elements) {
            setErrorMessage("Stripe.js has not loaded yet.")
            setIsProcessing(false)

            return;
        }
        // Create payment method using card details
        const cardElement = elements.getElement(CardNumberElement);
        console.log(cardElement, "cardElementcardElement")


        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });


        if (error) {

            setErrorMessage(error.message);
            setIsProcessing(false);
            setTimeout(() => {
                setErrorMessage()
            }, 3000)
            return;
        }

        if (paymentMethod.id) {

            console.log(paymentMethod?.id,"asdfgh");


            dispatch(setPaymentMethodId(paymentMethod.id));
            if (true) {
                await createRecruiterPurchase({
                  variables: {
                    input: {
                      package_id: purchaseDetails?.purchaseId,
                      payment_method_id: paymentMethod.id,
                    },
                  },
                })
                  .then((response) => {
                    console.log("Purchase successful:", response);


                    navigate(
                      `/recruiter/payment-success?type=${searchParams.get(
                        "type"
                      )}`
                    );
                    dispatch(handlePackageType(pagename));
                    onClose();
                  })
                  .catch((error) => {
                    console.error("Purchase failed:", error);
                  });
            }

            // if (userRole === "Recruiter") {
            //     await createRecruiterPurchase({
            //         variables: {
            //             input: {

            //                 package_id: purchaseId,
            //                 payment_method_id: paymentMethod.id,

            //             }
            //         }
            //     })
            //         .then(response => {
            //             console.log("Purchase successful:", response);
            //             onClose();
            //         })
            //         .catch(error => {
            //             console.error("Purchase failed:", error);
            //         });
            // }


        }
        console.log(paymentMethod, error)
    }


    return (
      <form onSubmit={handlePayNowClick}>
        <Row className="py-5">
          {/* Left Column - Payment Form wrapped in Elements */}
          <Col md={8}>
            <div className="solidcard summary mb-3">
              <h3 className="mb-3">Card Details</h3>

              <div className="mb-2">
                <label>Card Number *</label>
              </div>
              <div
                className="d-flex align-items-center inputfields summary"
                style={{ height: "50px" }}
              >
                <CardNumberElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#fff",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                  className="transparent-input-field w-100"
                />
              </div>

              <Row className="mb-2">
                <Col md={6}>
                  <div className="mb-2">
                    <label>Expiry *</label>
                  </div>
                  <div
                    className="d-flex align-items-center inputfields summary py-0 my-0"
                    style={{ height: "50px" }}
                  >
                    <CardExpiryElement
                      options={{
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#fff",
                            "::placeholder": {
                              color: "#aab7c4",
                            },
                          },
                          invalid: {
                            color: "#9e2146",
                          },
                        },
                      }}
                      className="transparent-input-field w-100"
                    />
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-2">
                    <label>CVV *</label>
                  </div>
                  <div
                    className="d-flex align-items-center inputfields summary"
                    style={{ height: "50px" }}
                  >
                    <CardCvcElement
                      options={{
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#fff",
                            "::placeholder": {
                              color: "#aab7c4",
                            },
                          },
                          invalid: {
                            color: "#9e2146",
                          },
                        },
                      }}
                      className="transparent-input-field w-100"
                    />
                  </div>
                </Col>
              </Row>
              {/* The Purchase button is in the parent component */}
            </div>
            {errorMessage && (
              <small
                className="text-danger text-sm"
                style={{ fontSize: "14px" }}
              >
                {errorMessage}
              </small>
            )}
          </Col>
          <Col md={4} className="order-summary-col mb-3">
            <div className="order-summary-card">
              {/* Order Summary Details */}
              <div className="order-summary-details">
                <h1>Order Summary</h1>
                <div className="summary-line d-flex justify-content-between">
                  <span>{purchaseDetails?.PackageName}</span>{" "}
                  {/* Use calculated number of items */}
                  <span>${purchaseDetails?.Price}</span>
                </div>
                {/* <div className="summary-line d-flex justify-content-between">
                                    <span>Shipping Fee</span>
                                    <span>${orderSummary.shippingFee.toFixed(2)}</span>
                                </div> */}
                {/* Separator line */}
                <hr className="summary-separator" /> {/* Example separator */}
                <div className="summary-line total-line d-flex justify-content-between">
                  <span>Total</span>
                  <span>${purchaseDetails?.Price}</span>
                </div>
              </div>

              {/* Pay Now Button - Calls the handler that triggers payment logic */}
              <button
                type="submit"
                className="primary-btn py-2 my-2 w-100"
                disabled={LoadingPurchase}
                style={{ opacity: LoadingPurchase ? "0.6" : "1" }}
              >
                Pay Now
              </button>
            </div>
          </Col>
        </Row>
      </form>
    );
}

export default PaymentModalRec;