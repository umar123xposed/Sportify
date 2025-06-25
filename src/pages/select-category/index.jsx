import "./index.css";
import { Col, Container, Row, Spinner } from "reactstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleProfileType, handleUpgradePrice } from "../../redux/profileSlice";
import CategoryCard from "../../components/elements/CategoryCard";
import { useQuery } from "@apollo/client";
import { GET_ALL_PACKAGES } from "../../graphql/query/query";

export default function SelectCategory() {

  const [searchParams] = useSearchParams()
  const navigate = useNavigate();
  const type = useSelector((state) => state.profileSlice?.profile.type);
  const role = useSelector((state) => state.authSlice.role);
  const [selectedOption, setSelectedOption] = useState(type); //
  const dispatch = useDispatch()

  const { loading, error, data, refetch } = useQuery(GET_ALL_PACKAGES, {
    variables: {
      input: {
        "page_start": 0,
        "limit": 10,
        "type": "Athlete"
      },
    },
  });
  //console.log(role, "role");

  const handleTypeChange = (info1) => {
    setSelectedOption((info1.qr_type).toLowerCase());
    dispatch(handleProfileType({ type: { name: (info1.qr_type).toLowerCase(), id: info1?.id }, price: info1.price }));
  }


  // Define navigation handlers for each button
  const handleBasicClick = (info) => {
    // Perform actions for Basic button click, e.g., set profile type and navigate
    handleTypeChange(info); // Assuming 'basic' is the type value
    const type = info.qr_type?.toLowerCase();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const sport_id = searchParams.get("sport_id");

    console.log(type)

    if (name === "upgrade") {
      dispatch(handleUpgradePrice(data?.getAllPackages?.data?.[0]?.details?.upgrade_price))
      navigate(`/parent/advanced-profile?type=${type}${id ? `&id=${id}` : ""}${sport_id ? `&sport_id=${sport_id}` : ""}${name ? `&name=${name}` : ""}`);
    }
    else {
      if (role == "Parent") {
        navigate(`/parent/select-sport?type=${type}${id ? `&id=${id}` : ""}${sport_id ? `&sport_id=${sport_id}` : ""}${name ? `&name=${name}` : ""}`);
      }
      if (role == "Athlete") {
        navigate(`/athlete/select-sport?type=${type}${id ? `&id=${id}` : ""}${sport_id ? `&sport_id=${sport_id}` : ""}${name ? `&name=${name}` : ""}`);
      }
    }



    // navigate(`/parent/checkout-payment?id=${info?.id}&type=${(info?.qr_type).toLowerCase()}`, { state: info }); // Replace with your actual navigation path for basic
  };

  const handleAdvanceClick = () => {
    // Perform actions for Advance button click, e.g., set profile type and navigate
    handleTypeChange('advanced'); // Assuming 'advanced' is the type value
    navigate('/checkout-payment'); // Replace with your actual navigation path for advance
  };

  return (
    <>
      <div className=" mb-5">
        <Container>
          <Row className="pt-5">
            <Col md={12}>
              <div
                onClick={() => navigate(-1)}
                className="d-flex back-btn mb-4"
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
            <Col md={12}>
              <h2 className="who-we-are-heading text-center">
                Purchase Profile
              </h2>
            </Col>
          </Row>
          {
            loading ? (

              <div className="d-flex justify-content-center align-items-center text-white" style={{ height: "50vh" }}>
                {/* <Spinner color="light"> */}
                Loading...
                {/* </Spinner> */}
              </div>
            ) : (
              <>
                {
                  data?.getAllPackages?.data?.length === 0 ? (
                    <div className="d-flex justify-content-center align-items-center text-white" style={{ height: "50vh" }}>
                      {/* <Spinner color="light"> */}
                      No Package
                      {/* </Spinner> */}
                    </div>
                  ) : (
                    <Row>
                      <Col md={1} />
                      <Col md={10}>
                        <div className="d-flex flex-wrap justify-content-center align-items-center gap-5 mt-3">
                          {
                            data?.getAllPackages?.data
                              ?.filter((item) => {
                                const type = searchParams.get("type");
                                return !type || item.qr_type?.toLowerCase() === type.toLowerCase();
                              })
                              .map((item) => (
                                <CategoryCard
                                  id={item.id}
                                  title={item.name}
                                  price={searchParams.get("type") === "advanced" ? `$${item?.details?.upgrade_price}` : `$${item.price}`}
                                  description={item.description}

                                  // features={[
                                  //   "Display Name, Sport, Position, Team Info",
                                  //   "QR Code with basic player details",
                                  //   "No stats, academic, or recruitment info",
                                  //   "Ideal for friends, family & local teams"
                                  // ]}
                                  headerBgColor="linear-gradient(to right, #D47F1D, #E6474D)
"
                                  buttonBgGradient="linear-gradient(to right, #F7D16A, #F5A623)"
                                  // footerText="*You can upgrade to the Advanced plan at any time, with no disruption to your existing profile*"
                                  buttonText="Get"
                                  onButtonClick={() => handleBasicClick(item)}
                                />
                              ))
                          }
                          {/* <CategoryCard
                title="Basic Profile"
                price="$28.99"
                description="For athletes who want to get started with a clean, simple profile."
                features={[
                  "Display Name, Sport, Position, Team Info",
                  "QR Code with basic player details",
                  "No stats, academic, or recruitment info",
                  "Ideal for friends, family & local teams"
                ]}
                headerBgColor="linear-gradient(to right, #D47F1D, #E6474D)
"
                buttonBgGradient="linear-gradient(to right, #F7D16A, #F5A623)"
                footerText="*You can upgrade to the Advanced plan at any time, with no disruption to your existing profile*"
                buttonText="Get Basic"
                onButtonClick={handleBasicClick}
              />

              <CategoryCard
                title="Advance Profile"
                price="$34.99"
                description="Built for serious athletes looking to get recruited"
                features={[
                  "Everything in Basic, plus:",
                  "Academic Info (GPA, Graduation Year)",
                  "Upcoming Tournaments",
                  "Career Highlights",
                  "Recruitment Preferences",
                  "References & Contact Info",
                  "Social Media & Scouting Reports",
                  "QR Code shows full advanced profile"
                ]}
                headerBgColor="linear-gradient(to right, #6C27DF, #E6474D)"
                buttonBgGradient="linear-gradient(to right, #F7D16A, #F5A623)"
                footerText="*If you purchase this plan in advance, you'll receive an exclusive 10% discount*"
                buttonText="Get Advance"
                onButtonClick={handleAdvanceClick}
              /> */}
                        </div>
                      </Col>

                      <Col md={1} />
                    </Row>
                  )
                }

              </>

            )
          }

        </Container>
      </div>
    </>


  )
}