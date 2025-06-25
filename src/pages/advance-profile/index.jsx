import "./index.css"
import { Col, Container, Row } from 'reactstrap';
import forword from "./../../assets/who-we-are-for.png";
import twitter from "./../../assets/twitter.png";
import insta from "./../../assets/instagram.png";
import fg from "./../../assets/fg.png";
import youtube from "./../../assets/youtube.png";
import tiktok from "./../../assets/tiktok.png";
import profile from "./../../assets/profile.png";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";

export default function AdvanceProfile() {
 const [startDate, setStartDate] = useState(new Date());
    const phoneInputRef = useRef(null);
    const iti = useRef(null);
    const navigate = useNavigate()
  useEffect(() => {
    if (phoneInputRef && phoneInputRef.current) {
      // Initialize the intl-tel-input plugin
      // console.log(phoneInputRef.current, window)
      iti.current = window?.intlTelInput(phoneInputRef.current, {
        initialCountry: "uk",
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
  const [selectedOption, setSelectedOption] = useState(""); // State for radio selection

  return (
    <div className="who-we-are-bg">
      <Container>
        <Row className="pt-5">
          <Col md={12}>
            <div onClick={() => navigate(-1)} className="d-flex back-btn mb-4">
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
          <Col md={12}></Col>
        </Row>

        <Row>
          <Col md={12}>
            <div className="profile d-flex justify-content-center ">
              <div className="profile-image text-center mb-2">
                <img className=" mb-2" src={profile} alt="" />

                <div className="primary-btn-img py-2 px-3">
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
                </div>
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
                  <input
                    className="w-100 input-transparent-blur"
                    type="text"
                    alt="text"
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col md={5}>
            <div className="basic-inputs input-card">
              <div className="input-transparent-blur-fields">
                <label>Nickname</label>
                <div className="w-100">
                  <input
                    className="w-100 input-transparent-blur"
                    type="text"
                    alt="text"
                  />
                </div>
              </div>
            </div>
          </Col>

          <Col md={1} />
        </Row>

        <Row>
          <Col md={1} />
          <Col md={5}>
            <div className="basic-inputs input-card">
              <div className="input-transparent-blur-fields">
                <label> Date of Birth</label>
                <div className="w-100">
                  <DatePicker
                    style={{ width: "100%" }}
                    className="w-100 input-transparent-blur"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col md={5}>
            <div className="basic-inputs input-card">
              <div className="input-transparent-blur-fields">
                <label>Email Address</label>
                <div className="w-100">
                  <input
                    className="w-100 input-transparent-blur"
                    type="text"
                    alt="text"
                  />
                </div>
              </div>
            </div>
          </Col>

          <Col md={1} />
        </Row>

        <Row>
          <Col md={1} />
          <Col md={5}>
            <div className="basic-inputs input-card w-100">
              <div className="input-transparent-blur-fields w-100">
                <label>Phone Number</label>
                {/* <PhoneInput placeholder="Enter your number" defaultCountry="PK" {...field} onChange={(data) => field.onChange(data)} /> */}
                <div className="w-100">
                  <input
                    className="input-transparent-blur"
                    ref={phoneInputRef}
                    id="phone"
                    type="tel"
                    name="phone"
                    // value={field.value} // Use Formik's value
                    onChange={(e) => {
                      const input = e.target.value;
                      // Allow only digits and '+' at the start
                      const sanitizedInput = input.replace(/[^+\d]/g, "");

                      // Manually update e.target.value to the sanitized input
                      e.target.value = sanitizedInput;

                      // field.onChange(e); // Update Formik's state with sanitized value
                    }}
                  />
                </div>
              </div>
            </div>
          </Col>

          <Col md={5}>
            <div className="basic-inputs input-card  ">
              <label> Gender </label>
              <form>
                {/* Option 1 */}
                <div className="d-flex">
                  <div
                    onClick={() => setSelectedOption("basic")}
                    style={{
                      borderRadius: "5px",
                      cursor: "pointer",
                      width: "fit-content !important",
                    }}
                    className="input-transparent-blur auto-widt me-3 "
                  >
                    <div className="child-right-select ">
                      <label style={{ marginBottom: "0" }}>
                        <input
                          className="me-3"
                          type="radio"
                          name="profileCategory"
                          value="basic"
                          checked={selectedOption === "basic"}
                          onChange={() => setSelectedOption("basic")}
                        />
                        <span> male </span>
                      </label>
                    </div>
                  </div>

                  {/* Option 2 */}

                  <div
                    onClick={() => setSelectedOption("advanced")}
                    style={{
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    className="input-transparent-blur auto-widt"
                  >
                    <div className="child-right-select ">
                      <label>
                        <input
                          type="radio"
                          name="profileCategory"
                          value="advanced"
                          checked={selectedOption === "advanced"}
                          onChange={() => setSelectedOption("advanced")}
                        />

                        <span>female</span>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </Col>

          <Col md={1} />
        </Row>

        <Row>
          <Col md={1} />
          <Col md={5}>
            <Row>
              <Col md={4}>
                <div className="basic-inputs input-card">
                  <div className="input-transparent-blur-fields">
                    <label> Weight / Height</label>
                    <div className="w -100">
                      <input
                        className="w-100 input-transparent-blur"
                        type="text"
                        placeholder="Height"
                        alt="text"
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="basic-inputs input-card">
                  <div className="input-transparent-blur-fields">
                    <label> </label>
                    <div className="w-100">
                      <input
                        className="w-100 input-transparent-blur"
                        type="text"
                        placeholder="Weight"
                        alt="text"
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>

          <Col md={5} />

          <Col md={1} />
        </Row>

        <Row>
          <Col md={1} />
          <Col md={5}>
            <div className="basic-inputs input-card mt-5">
              <label>Twitter </label>

              <div className="input-transparent-blur p-0">
                <div className="w-100">
                  <div className="d-flex">
                    <img className="me-3 ms-3" src={twitter} alt="" />
                    <input
                      style={{
                        backgroundColor: "transparent",
                        borderColor: "transparent",
                        outline: "none",
                      }}
                      className="w-100 "
                      type="text"
                      placeholder="Paste your profile URL here"
                      alt="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col md={5}>
            <div className="basic-inputs input-card mt-5">
              <label>Youtube </label>

              <div className="input-transparent-blur p-0">
                <div className="w-100">
                  <div className="d-flex">
                    <img className="me-3 ms-3" src={youtube} alt="" />
                    <input
                      style={{
                        backgroundColor: "transparent",
                        borderColor: "transparent",
                        outline: "none",
                      }}
                      className="w-100"
                      type="text"
                      placeholder="Paste your profile URL here"
                      alt="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col md={1} />
        </Row>

        <Row>
          <Col md={1} />
          <Col md={5}>
            <div className="basic-inputs input-card">
              <label>Instagram </label>

              <div className="input-transparent-blur p-0">
                <div className="w-100">
                  <div className="d-flex">
                    <img className="me-3 ms-3" src={insta} alt="" />
                    <input
                      style={{
                        backgroundColor: "transparent",
                        borderColor: "transparent",
                        outline: "none",
                      }}
                      className="w-100 "
                      type="text"
                      placeholder="Paste your profile URL here"
                      alt="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col md={5}>
            <div className="basic-inputs input-card">
              <label>Tiktok </label>
              <div className="input-transparent-blur p-0">
                <div className="w-100">
                  <div className="d-flex">
                    <img className="me-3 ms-3 p-1" src={tiktok} alt="" />
                    <input
                      style={{
                        backgroundColor: "transparent",
                        borderColor: "transparent",
                        outline: "none",
                      }}
                      className="w-100"
                      type="text"
                      placeholder="Paste your profile URL here"
                      alt="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col md={1} />
        </Row>

        <Row>
          <Col md={1} />
          <Col md={5}>
            <div className="basic-inputs input-card">
              <label>IMLCA </label>

              <div className="input-transparent-blur p-0">
                <div className="w-100">
                  <div className="d-flex">
                    <img className="me-3 ms-3 p-1" src={fg} alt="" />
                    <input
                      style={{
                        backgroundColor: "transparent",
                        borderColor: "transparent",
                        outline: "none",
                      }}
                      className="w-100 "
                      type="text"
                      placeholder="Paste your profile URL here"
                      alt="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col md={5} />

          <Col md={1} />
        </Row>

        <Row>
          <Col md={4} />

          <Col md={4}>
            <div
              onClick={() => navigate("/athletic-information")}
              className="primary-btn px-2 py-3 my-3"
            >
              <h3> Next </h3>
            </div>
          </Col>

          <Col md={4} />
        </Row>
      </Container>
    </div>
  );
}
