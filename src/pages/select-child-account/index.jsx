import "./index.css"
import { Col, Container, Row } from 'reactstrap';
import forword from "./../../assets/who-we-are-for.png";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function SelectChildScreen() {


  const navigate = useNavigate()

  return (
    <div className="d-flex align-items-center" >
      <Container>
        <Row className="mt-5 pt-5">
          {/* <Col md={12}>
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
          </Col> */}
          <Col md={12}>
            <h2 className="who-we-are-heading text-center">
              Select Your Athlete Account
            </h2>
            <p className="who-we-are-Description py-2 text-center">
              Pick the role that best describes you to personalize your journey.
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={4} sm={3} />

          <Col md={4} sm={12}>

            <div
              onClick={() => navigate("/parent/players")}
              style={{ borderRadius: "8px", cursor: "pointer" }}
              className="glass-card w-100 py-3 my-4 d-flex justify-content-between"
            >
              <div className="child-left d-flex align-items-center">
                <svg
                  className="me-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="25"
                  viewBox="0 0 20 30"
                  fill="none"
                >
                  <path
                    d="M10.1184 0C6.73407 0 3.99017 2.75793 3.99017 6.16073C3.99017 9.56357 6.7343 12.3225 10.1185 12.3225C13.5028 12.3225 16.2457 9.56375 16.2457 6.16073C16.2457 2.75785 13.5028 0 10.1184 0ZM6.6091 7.18505H13.5932C13.5932 9.11368 12.0292 10.6776 10.1006 10.6776C8.17205 10.6776 6.6091 9.11368 6.6091 7.18505ZM5.30225 13.2934C2.11072 13.359 0.0113236 15.4322 0.130299 19.1863L0.124023 30H3.79765V20.2839C3.82942 19.4333 5.07867 19.1353 5.23947 20.2839V30H14.8928V20.2839C14.9246 19.4333 16.1738 19.1353 16.3346 20.2839V30H19.8764V19.1863C19.855 16.2183 18.6371 13.2659 14.7369 13.2934H5.30225Z"
                    fill="url(#paint0_linear_1632_5583)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1632_5583"
                      x1="0.125145"
                      y1="15.0011"
                      x2="19.8769"
                      y2="15.0011"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#DDA027" />
                      <stop offset="0.3198" stop-color="#CE9B2B" />
                      <stop offset="0.6802" stop-color="#FEF48E" />
                      <stop offset="1" stop-color="#FFD046" />
                    </linearGradient>
                  </defs>
                </svg>

                <h4>Link your athlete account</h4>
              </div>

              <div className="child-right d-flex align-items-center">
                <img src={forword} />
              </div>
            </div>

            <div
              onClick={() => navigate("/parent/select-type")}
              style={{ borderRadius: "8px", cursor: "pointer" }}
              className="glass-card w-100 py-3 d-flex my-2 justify-content-between"
            >
              <div className="child-left d-flex align-items-center">
                <svg
                  className="me-2"
                  style={{ marginLeft: "-3px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <path
                    d="M26.9497 3.12013C26.8641 3.02606 26.7603 2.95032 26.6445 2.89749C26.5288 2.84466 26.4036 2.81584 26.2764 2.81277C26.1493 2.80971 26.0228 2.83245 25.9047 2.87964C25.7865 2.92683 25.6792 2.99748 25.5891 3.08732L24.8643 3.80861C24.7765 3.89651 24.7271 4.01569 24.7271 4.13996C24.7271 4.26423 24.7765 4.38341 24.8643 4.47131L25.5288 5.13459C25.5723 5.17835 25.6241 5.21307 25.6811 5.23676C25.7381 5.26046 25.7993 5.27265 25.861 5.27265C25.9227 5.27265 25.9839 5.26046 26.0409 5.23676C26.0979 5.21307 26.1497 5.17835 26.1932 5.13459L26.8999 4.43146C27.2573 4.07463 27.2907 3.49338 26.9497 3.12013ZM23.3989 5.27345L12.8216 15.832C12.7574 15.8959 12.7108 15.9752 12.6862 16.0623L12.1969 17.5195C12.1852 17.5591 12.1844 17.6011 12.1945 17.641C12.2047 17.681 12.2254 17.7175 12.2546 17.7467C12.2838 17.7758 12.3203 17.7966 12.3602 17.8067C12.4002 17.8169 12.4422 17.816 12.4817 17.8043L13.9378 17.3151C14.0249 17.2904 14.1042 17.2438 14.168 17.1797L24.7266 6.60119C24.8243 6.50246 24.8791 6.36918 24.8791 6.23029C24.8791 6.0914 24.8243 5.95812 24.7266 5.85939L24.1436 5.27345C24.0448 5.17488 23.9109 5.11952 23.7713 5.11952C23.6317 5.11952 23.4978 5.17488 23.3989 5.27345Z"
                    fill="url(#paint0_linear_1632_5611)"
                  />
                  <path
                    d="M22.6371 11.3473L15.4951 18.5033C15.2191 18.78 14.8798 18.9853 14.5066 19.1016L12.9891 19.6096C12.6289 19.7113 12.2481 19.7151 11.886 19.6207C11.5239 19.5263 11.1935 19.337 10.9288 19.0723C10.6642 18.8077 10.4749 18.4773 10.3805 18.1152C10.2861 17.753 10.2899 17.3723 10.3916 17.0121L10.8996 15.4945C11.0155 15.1215 11.2204 14.7822 11.4967 14.5061L18.6527 7.36289C18.7183 7.29737 18.763 7.21387 18.7812 7.12294C18.7993 7.03202 18.7901 6.93776 18.7546 6.85209C18.7192 6.76641 18.6591 6.69317 18.5821 6.64163C18.505 6.59008 18.4144 6.56254 18.3217 6.5625H6.09375C5.22351 6.5625 4.38891 6.9082 3.77356 7.52356C3.1582 8.13891 2.8125 8.97351 2.8125 9.84375V23.9062C2.8125 24.7765 3.1582 25.6111 3.77356 26.2264C4.38891 26.8418 5.22351 27.1875 6.09375 27.1875H20.1562C21.0265 27.1875 21.8611 26.8418 22.4764 26.2264C23.0918 25.6111 23.4375 24.7765 23.4375 23.9062V11.6783C23.4375 11.5856 23.4099 11.495 23.3584 11.4179C23.3068 11.3409 23.2336 11.2808 23.1479 11.2454C23.0622 11.2099 22.968 11.2007 22.8771 11.2188C22.7861 11.237 22.7026 11.2817 22.6371 11.3473Z"
                    fill="url(#paint1_linear_1632_5611)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1632_5611"
                      x1="12.1884"
                      y1="10.3137"
                      x2="27.1879"
                      y2="10.3137"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#DDA027" />
                      <stop offset="0.3198" stop-color="#CE9B2B" />
                      <stop offset="0.6802" stop-color="#FEF48E" />
                      <stop offset="1" stop-color="#FFD046" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_1632_5611"
                      x1="2.81367"
                      y1="16.8758"
                      x2="23.438"
                      y2="16.8758"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#DDA027" />
                      <stop offset="0.3198" stop-color="#CE9B2B" />
                      <stop offset="0.6802" stop-color="#FEF48E" />
                      <stop offset="1" stop-color="#FFD046" />
                    </linearGradient>
                  </defs>
                </svg>

                <h4>Create New One</h4>
              </div>

              <div className="child-right d-flex align-items-center">
                <img src={forword} />
              </div>
            </div>

          </Col>

          <Col md={4} sm={3} />

        </Row>
      </Container>
    </div>
  );
}
