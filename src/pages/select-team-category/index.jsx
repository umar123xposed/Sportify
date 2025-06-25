import "./index.css";
import { Col, Container, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleProfileType, setPurchaseId, setPrice, setPackageName } from "../../redux/profileSlice";
import CategoryCard from "../../components/elements/CategoryCard";
import { GET_ALL_PACKAGES } from "../../graphql/query/query";
import { useQuery } from "@apollo/client";
import Loader from "react-spinner-loader"

export default function SelectTeamCategory() {
  const navigate = useNavigate();
  const type = useSelector((state) => state.profileSlice?.profile.type);
  const role = useSelector((state) => state.authSlice.role);
  const [selectedOption, setSelectedOption] = useState(type);
  const dispatch = useDispatch();

  const { data: packagesData, loading } = useQuery(GET_ALL_PACKAGES, {
    variables: {
      input: {
        limit: 10,
        page_start: 0,
        type: "Coach"
      }
    }
  });

  console.log(packagesData)

  const handleTypeChange = (selected) => {
    setSelectedOption(selected);
    dispatch(handleProfileType(selected));
  };

  const handleBasicClick = (currentItem) => {
    console.log(currentItem, "currentItem");
    handleTypeChange(currentItem?.name);
    dispatch(setPurchaseId(currentItem?.id));
    dispatch(setPrice(currentItem?.price));
    dispatch(setPackageName(currentItem?.qr_type));
    navigate('/coach/create-club-coach');
  };

  return (
    <>
      <div className=" mb-5">
        <Container>
          <Row className="category-cards-container">
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
            <Col md={12} className="mb-4">
              <h2 className="who-we-are-heading text-center">
                Choose Your Team Plan
              </h2>
            </Col>
            {
              loading && (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "40vh" }}>
                  <Loader show={true}
                    spinnerSize="60px"
                    radius="10"

                    color="red"
                  />
                </div>
              )
            }
            {packagesData?.getAllPackages?.data?.map((item, index) => {
              return (
                <Col
                  key={item.id}
                  xs={12}
                  lg={4}
                  md={6}
                  className={!index == 0 ? "mainn" : `mb-4 mb-md-0 mainn`}
                >
                  <CategoryCard
                    item={item}
                    title={item?.name}
                    description={item?.description}
                    price={`$${item?.price}`}
                    headerBgColor={
                      !index == 0
                        ? "linear-gradient(to right, #6C27DF, #E6474D)"
                        : "linear-gradient(to right, #D47F1D, #E6474D)"
                    }
                    buttonBgGradient={
                      !index == 0
                        ? "linear-gradient(90deg, #DDA027 0.01%, #CE9B2B 31.98%, #FEF48E 68.02%, #FFD046 100%)"
                        : "linear-gradient(90deg, #DDA027 0.01%, #CE9B2B 31.98%, #FEF48E 68.02%, #FFD046 100%)"
                    }
                    footerText="*You can upgrade to the Multi plan at any time, with no disruption to your existing profile*"
                    buttonText={`Get ${item?.qr_type}`}
                    onButtonClick={handleBasicClick}
                  />
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </>
  );
}