import React, { useEffect, useState, useRef, useImperativeHandle } from "react";
import "./index.css"
import { Col, Container, Modal, Row, Spinner } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { CardCvcElement, CardExpiryElement, CardNumberElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { useMutation } from "@apollo/client";
import { PLACE_ORDER } from "../../graphql/mutation";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { orderPlaceSubmit } from "../../graphql/api-callings";
import PaymentModal from "../../components/elements/payment-modal";
import PaymentModalRec from "../../components/elements/payment-modal-rec";

const CheckoutPaymentRec = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const userRole = useSelector((state) => state.authSlice?.role); // Assuming this is still relevant
  const data = useSelector((state) => state.profileSlice); // Assuming
  const draft = useSelector((state) => state?.profileSlice?.profile); // Assuming this is still relevant

  console.log(data, "what is tis");

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

  const [orderSummaryModalOpen, setOrderSummaryModalOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const paymentLogicRef = useRef(null);

  // Order Summary calculation (Placeholder - replace with your actual logic)
  const calculateOrderSummary = () => {
    const packagePrice = state?.package?.price || 0;
    const selectedQuantity = state?.quantity || 0; // Assuming quantity is passed via state
    const subtotal = packagePrice * selectedQuantity;
    const shippingFee = 6.0; // Example - get from config or API
    const total = subtotal + shippingFee;
    const numItems = selectedQuantity; // Assuming number of items is the quantity of the package

    return {
      subtotal: subtotal,
      shippingFee: shippingFee,
      total: total,
      numItems: numItems,
      // Add other relevant fields like order number, name, date, delivery, shipping address
      // You'll need to get this data from state, props, or API calls passed from the previous page
      orderNumber: "SMID - 000121", // Placeholder - get from order data
      name: "Jack Tyson", // Placeholder - get from user/order data
      date: "27/05/2025", // Placeholder - get from order data
      delivery: "7 Business Days", // Placeholder - get from order/shipping data
      shippingAddress: "423, 12 Street, NY, US", // Placeholder - get from address state/props
      paymentStatus: "Paid", // Placeholder - will be 'Paid' on successful payment
    };
  };

  const orderSummary = calculateOrderSummary();

  // Handler for the "Pay Now" button - calls the exposed method on the ref
  const handlePayNowClick = () => {
    console.log(userRole);
    if (userRole == "Parent") {
      navigate("/paymentsuccessfull");
    }

    if (userRole == "Coach" || userRole == "Head") {
      navigate("/paymentsuccessfull");
    }
    if (userRole == "Athletes") {
      navigate("/paymentsuccessfull");
    }
    if (userRole == "Recruiter") {
      navigate("/recruiter/create-profile");
    }

    if (paymentLogicRef.current) {
      paymentLogicRef.current.triggerPayment(); // Call the method exposed by useImperativeHandle
    } else {
      console.error("Payment logic component not ready.");
    }
  };

  // Toggle function for the new modal
  const toggleOrderSummaryModal = () =>
    setOrderSummaryModalOpen(!orderSummaryModalOpen);

  return (
    <div className="page-wrapper pb-4">
      {/* Existing Header */}
      <div className="profile-header-bg d-flex align-items-end">
        <div className="px-md-5 px-sm-3 px-2">
          <Row className="align-items-center">
            <Col xs="auto">
              <div
                onClick={() => navigate(-1)}
                className="d-flex align-items-center back-btn1"
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
                    d="M0.457255 9.94802L7.99992 17.4907L9.88525 15.6054L3.28525 9.00535L9.88525 2.40535L7.99992 0.52002L0.457255 8.06269C0.207294 8.31272 0.0668726 8.6518 0.0668726 9.3589 0.207294 9.69798 0.457255 9.94802Z"
                    fill="white"
                  />
                </svg>
                <h4>Back</h4>
              </div>
            </Col>
            <Col>
              <h2 className="profile-title text-white mb-0">Payment Details</h2>
            </Col>
          </Row>
        </div>
      </div>
      <Container>
        <Elements stripe={stripePromise}>
          <PaymentModalRec location={draft} />
        </Elements>
      </Container>

      {/* New Order Summary Modal */}
      <Modal
        backdrop={"static"}
        centered
        size="md"
        isOpen={orderSummaryModalOpen}
        toggle={toggleOrderSummaryModal}
      >
        {/* Modal Content based on the image */}
        <div className="order-summary-modal-content">
          {" "}
          {/* Add a class for styling */}
          <div className="modal-header-custom d-flex justify-content-between align-items-center">
            {" "}
            {/* Add a class for header styling */}
            <h2> Order Summary</h2>
            <button
              type="button"
              className="close-button"
              onClick={toggleOrderSummaryModal}
            >
              {" "}
              {/* Add a class for close button */}
              &times; {/* Close icon */}
            </button>
          </div>
          <div className="modal-body-custom">
            {" "}
            {/* Add a class for body styling */}
            {orderData && ( // Render content only if orderData is available
              <>
                <div className="summary-details-section">
                  <div className="summary-line-modal d-flex justify-content-between">
                    <span>Order Number:</span>
                    <span>{orderData.orderNumber}</span>
                  </div>
                  <hr className="modal-separator" />
                  <div className="summary-line-modal d-flex justify-content-between">
                    <span>Name:</span>
                    <span>{orderData.name}</span>
                  </div>
                  <hr className="modal-separator" />
                  <div className="summary-line-modal d-flex justify-content-between">
                    <span>Date:</span>
                    <span>{orderData.date}</span>
                  </div>
                  <hr className="modal-separator" />
                  <div className="summary-line-modal d-flex justify-content-between">
                    <span>Delivery:</span>
                    <span>{orderData.delivery}</span>
                  </div>
                  <hr className="modal-separator" />
                  <div className="summary-line-modal d-flex justify-content-between">
                    <span>Shipping Address:</span>
                    <span>{orderData.shippingAddress}</span>
                  </div>
                </div>
                <div className="summary-details-section">
                  <div className="summary-line-modal d-flex justify-content-between">
                    <span>Subtotal:</span>
                    <span>${orderData.subtotal.toFixed(2)}</span>
                  </div>
                  <hr className="modal-separator" />
                  <div className="summary-line-modal d-flex justify-content-between">
                    <span>Shipping Fee:</span>
                    <span>${orderData.shippingFee.toFixed(2)}</span>
                  </div>
                  <hr className="modal-separator" />
                  <div className="summary-line-modal total-line-modal d-flex justify-content-between">
                    <span>Total:</span>
                    <span>${orderData.total.toFixed(2)}</span>
                  </div>
                  <hr className="modal-separator" />
                  <div className="summary-line-modal d-flex justify-content-between">
                    <span>Payment Status:</span>
                    <span className="payment-status-paid">
                      {orderData.paymentStatus}
                    </span>{" "}
                    {/* Add class for "Paid" status style */}
                  </div>
                </div>
                <hr className="modal-separator" /> {/* Separator line */}
                <div className="package-details-modal">
                  <h3>Package Details</h3>
                  <div className="package-info-modal d-flex align-items-center">
                    <div className="package-images-modal d-flex me-3">
                      {orderData.packageDetails?.items?.map((item, index) => (
                        <img
                          key={index}
                          src={item.imageUrl}
                          alt={`Item ${index + 1}`}
                          className="package-item-image-modal me-1"
                        />
                      ))}
                    </div>
                    <div className="package-text-modal">
                      <div className="package-name-modal">
                        {orderData.packageDetails?.name}
                      </div>
                      <div className="package-qty-price-modal">
                        Qty: {orderData.packageDetails?.qty} | Price: $
                        {orderData.packageDetails?.price?.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="modal-footer-custom d-flex justify-content-end">
            {" "}
            {/* Add a class for footer styling */}
            <button className="download-receipt-button">
              {" "}
              Download Receipt{" "}
            </button>{" "}
            {/* Add a class for button styling */}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CheckoutPaymentRec;
