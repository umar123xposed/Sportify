import React from "react";
import "./index.css"
import { Col, Container, Row } from "reactstrap";

import prowhite from "./../../assets/white.png";
import { useNavigate } from "react-router-dom";
import location from "./../../assets/location.png"




const createTeam = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="page-wrapper  pb-4">
        <Container>
          <Row className="py-5">
            <Col md={8}>
              <div className="solid-card quantity-card  d-flex">
                <div className="quantity-left">
                  <img src={prowhite} alt="white-product" />
                </div>
                <div className="quantity-right ms-4">
                  <h3 className="product-titleq">
                    Bold, vibrant 100% cotton beach towels—perfect for any
                    setting!
                  </h3>

                  <div className="d-flex align-items-center">
                    <h4 className="product-colorq">Color: </h4>
                    <div className="ms-2">
                      <div
                        style={{ backgroundColor: "white" }}
                        className="color-selection "
                      ></div>
                    </div>{" "}
                  </div>
                  <div className="d-flex align-items-center">
                    <h4 className="product-colorq">size :</h4>
                    <div className="single-categoryq ms-2 ">XL</div>
                  </div>
                  <div className="d-flex align-items-center ">
                    <div className="solid-btn-circle d-flex justify-content-center align-items-center">
                      -
                    </div>
                    <input className="quantity-count" type="text" />
                    <div className="solid-btn-circle d-flex justify-content-center align-items-center">
                      +
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="solid-card summary ">
                <h3 className="mb-4">Order Summary</h3>
                <div className="mb-2">
                  <label> Address </label>
                </div>
                <div className="location d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <img className="me-2" src={location} alt="" />
                    <h4>12348 street,LA</h4>
                  </div>
                  <div className="d-flex align-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="7"
                      height="12"
                      viewBox="0 0 7 12"
                      fill="none"
                    >
                      <path
                        d="M4.63058 6.00024L0.557327 1.92724C0.418994 1.78874 0.348161 1.61466 0.344827 1.40499C0.341661 1.19549 0.412493 1.01824 0.557327 0.873242C0.702327 0.728408 0.877994 0.655992 1.08433 0.655992C1.29066 0.655992 1.46633 0.728408 1.61133 0.873242L6.10558 5.36749C6.19908 5.46116 6.26508 5.55991 6.30358 5.66374C6.34208 5.76757 6.36133 5.87974 6.36133 6.00024C6.36133 6.12074 6.34208 6.23291 6.30358 6.33674C6.26508 6.44057 6.19908 6.53932 6.10558 6.63299L1.61133 11.1272C1.47283 11.2656 1.29875 11.3364 1.08908 11.3397C0.879579 11.3429 0.702328 11.2721 0.557328 11.1272C0.412494 10.9822 0.340078 10.8066 0.340078 10.6002C0.340078 10.3939 0.412494 10.2182 0.557328 10.0732L4.63058 6.00024Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
                <div className="my-3 d-flex align-items-center justify-content-between">
                  <label>Payment Method</label>
                  <label>Edit</label>
                </div>
                <div className="px-2 card-info d-flex align-items-center">
                  + Mastercard ****8-89090
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                  >
                    <path
                      d="M16.5142 19.3166H9.4834V6.68164H16.5142V19.3166Z"
                      fill="#FF5F00"
                    />
                    <path
                      d="M9.93092 13.0002C9.92985 11.7835 10.2056 10.5824 10.7373 9.48801C11.2691 8.39359 12.0428 7.43448 13 6.6833C11.8147 5.75177 10.3912 5.17249 8.89223 5.01167C7.39327 4.85085 5.8793 5.11498 4.52334 5.77386C3.16738 6.43274 2.02414 7.4598 1.22426 8.73767C0.424376 10.0155 0.000129643 11.4927 0 13.0002C0.000289299 14.5076 0.424586 15.9845 1.22441 17.2622C2.02424 18.5398 3.16734 19.5668 4.5231 20.2256C5.87887 20.8845 7.39262 21.1486 8.89141 20.988C10.3902 20.8274 11.8136 20.2483 12.9989 19.3171C12.0421 18.5657 11.2686 17.6066 10.7371 16.5122C10.2056 15.4178 9.92989 14.2169 9.93092 13.0002Z"
                      fill="#EB001B"
                    />
                    <path
                      d="M26 13.0002C25.9999 14.5078 25.5756 15.9849 24.7757 17.2628C23.9759 18.5406 22.8326 19.5677 21.4767 20.2266C20.1207 20.8855 18.6067 21.1496 17.1078 20.9888C15.6088 20.8279 14.1853 20.2487 13 19.3171C14.8688 17.846 16.0691 15.5634 16.0691 13.0002C16.0691 10.4371 14.8688 8.15447 13 6.6833C14.1853 5.75177 15.6088 5.17249 17.1078 5.01167C18.6067 4.85085 20.1207 5.11498 21.4767 5.77386C22.8326 6.43274 23.9759 7.4598 24.7757 8.73767C25.5756 10.0155 25.9999 11.4927 26 13.0002Z"
                      fill="#F79E1B"
                    />
                  </svg>
                </div>
                <div className="mt-5 d-flex justify-content-between align-items-center">
                  <h3 style={{ fontWeight: "600" }}>
                    Merchandise Subtotal (item 1)
                  </h3>
                  <h3 style={{ fontWeight: "600" }}>$40.00</h3>
                </div>
                <div className="mt-4   mb-5 d-flex justify-content-between align-items-center">
                  <h3 style={{ fontWeight: "600" }}> Shipping Fee Subtotal </h3>
                  <h3 style={{ fontWeight: "600" }}>$3.00</h3>
                </div>
                <div
                  onClick={() => navigate("/who-we-are")}
                  className="primary-btn px-2 py-3 my-3  w-80"
                >
                  <h3 style={{ color: "#232323" }}> Purchase </h3>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default createTeam;
