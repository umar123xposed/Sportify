import "./index.css";
import { Col, Container, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleProfileType, setPurchaseId, setPrice, setPackageName } from "../../redux/profileSlice";
import CategoryCard from "../../components/elements/CategoryCard";
import { GET_ALL_PACKAGES } from "../../graphql/query/query";
import { useQuery } from "@apollo/client";

export default function SelectCategoryRecruit() {
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
        type: "Recruiter"
      }
    }
  });


  console.log(packagesData?.getAllPackages?.data, "what is this data");

  const handleTypeChange = (selected) => {
    setSelectedOption(selected);
    dispatch(handleProfileType(selected));
  }

  const handleBasicClick = (currentItem) => {

    console.log(currentItem, "currentItem");
    handleTypeChange(currentItem?.name);
    dispatch(setPurchaseId(currentItem?.id));
    dispatch(setPrice(currentItem?.price));
    dispatch(setPackageName(currentItem?.qr_type));
    navigate('/recruiter/checkout-payment');
  };

  const handleAdvanceClick = () => {
    handleTypeChange(packagesData?.getAllPackages?.data?.[1]?.name);
    dispatch(setPurchaseId(packagesData?.getAllPackages?.data?.[1]?.id));
    dispatch(setPrice(packagesData?.getAllPackages?.data?.[1]?.price));
    dispatch(setPackageName("Elite"));
    navigate('/recruiter/checkout-payment');
  };

  return (
    <>
      <div className="">
        <Container>
          <Row className="category-cards-container pt-5">
            <Col md={12} className="mb-4">
              <h2 className="who-we-are-heading text-center">
                Purchase Profile
              </h2>
            </Col>
            {packagesData?.getAllPackages?.data?.map((item, index) => {
              return (
                <>
                  <Col
                    xs={12}
                    md={4}
                    className={!index == 0 ? "mainn" : `mb-4 mb-md-0 mainn`}
                  >
                    <CategoryCard
                      item={item}
                      title={item?.name}
                      description={item?.description}
                      price={`$${item?.price}`}
                      headerBgColor={
                        !index == 0
                          ? "linear-gradient(to right, #6C27DF, #E6474D"
                          : "linear-gradient(to right, #D47F1D, #E6474D)"
                      }
                      buttonBgGradient={
                        !index == 0
                          ? "  linear-gradient(90deg, #DDA027 0.01%, #CE9B2B 31.98%, #FEF48E 68.02%, #FFD046 100%)"
                          : "linear-gradient(90deg, #DDA027 0.01%, #CE9B2B 31.98%, #FEF48E 68.02%, #FFD046 100%)"
                      }
                      footerText="*You can upgrade to the Elite plan at any time, with no disruption to your existing profile*"
                      buttonText={`Get ${item?.qr_type}`}
                      onButtonClick={handleBasicClick}
                    />
                  </Col>
                </>
              );
            })}


          </Row>
        </Container>
      </div>
    </>
  );
}