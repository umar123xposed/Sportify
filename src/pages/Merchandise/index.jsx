import React, { useState } from "react";
import "./index.css"
import { Col, Row ,Container} from "reactstrap";
import PlayerCard from "../../components/elements/playerCard";
import NearByCard from "../../components/elements/NearByCard";
import product1 from "./../../assets/product1.png"
import cat1 from "./../../assets/cat1.png";
import cat2 from "./../../assets/cat2.png";
import cat3 from "./../../assets/cat3.png";
import cat4 from "./../../assets/cat4.png";
import MerchandiseCard from "../../components/elements/mercandiseCard";
import QrCode from "../../components/elements/qr-card";
import { useQuery } from "@apollo/client";
import { GET_ALL_VENDOR_PACKAGES } from "../../graphql/query/query";
import { useLocation } from "react-router-dom";
import MarchandQrCode from "../../components/elements/qr-card-merchand";
import { useSelector } from "react-redux";





const Merchandise = () => {

   const [page, setPage] = useState(1);
 const [totalPages, setTotalPages] = useState(0);
const location = useLocation()
const qrDraft =  useSelector((state)=> state.profileSlice.qr)
const { state } = location
console.log(qrDraft, "whasfsa2222f");

const {
  loading,
  error: error1,
  data: vendorPackages,
  refetch: refetch1,
} = useQuery(GET_ALL_VENDOR_PACKAGES, {
  variables: {
    input: {
      business_id: null,
      limit: 10,
      is_active: true,
      name: null,
      page_start: page -1,
    },
  },
});

  return (
    <>
    <div className="profile-header-bg d-flex align-items-start">
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
                <h2 className="profile-title text-white mb-0">Merchandise</h2>
                <span className="text-white" style={{fontSize:"0.7rem"}}>Embed your QR code on various merchandise choose a package below to get started today!</span>
              </Col>
            </Row>
          </div>
        </div>
      <div className="page-wrapper  pb-4">
        <div className="slider">
          <div className="CustomeConatiner">
            <Row className="py-4">
              <Col md={8}>
                {vendorPackages?.getAllVendorPackages?.data?.map(
                  (packageItem) => {
                    return (
                      <>
                        <MerchandiseCard
                          id={packageItem?.id}
                          packageData={packageItem}
                        />

                      </>
                    );
                  }
                )}
              </Col>

              <Col md={4} className="mt-4">
                <MarchandQrCode
                  qr={qrDraft}
                  title={"Download"}
                  //  state={setModalUpdateProfile}
                />
              </Col>

            </Row>

            {/* <Row>
              <h3 className="slider_main-heading">Find Best Players</h3>
            </Row>
            <div className="glass-card mt-4">
              <Row>
                <Col md={10}>
                  <div className="Search">
                    <h4>Search Player Name & ID</h4>
                    <input type="text" placeholder="Search" />
                  </div>
                </Col>
                <Col md={2} className="h-100  ">
                  <div
                    onClick={() => navigate("/auth/sign-up")}
                    className="mt-5 primary-btn px-2 py-3 my-3"
                  >
                    <h3> Seach </h3>
                  </div>
                </Col>
              </Row>
            </div>
            <Row>
              <div className="grid-container categories ">
                <div className="single-category selected-cat ">All </div>
                <div className="single-category ">
                  <img className="me-2" src={cat1} alt="" />
                  Jacket
                </div>

                <div className="single-category ">
                  <img className="me-2" src={cat2} alt="" />
                   Shirt
                </div>

                <div className="single-category ">
                  <img className="me-2" src={cat2} alt="" />
                  Jacket
                </div>

                <div className="single-category ">
                  <img className="me-2" src={cat3} alt="" />
                  Jeans
                </div>

              </div>
            </Row>
            <Row>
              <div className="grid-container w-100">
                <NearByCard
                  image={product1}
                  title={"Black And Charcoal Zipper Style Jacket For Men's"}
                  price={"$40.00"}
                />
                <NearByCard
                  image={product1}
                  title={"Blue Denim Jacket"}
                  price={"$50.00"}
                />
                <NearByCard
                  image={product1}
                  title={"Winter Leather Coat"}
                  price={"$70.00"}
                />
                <NearByCard
                  image={product1}
                  title={"Casual Hoodie"}
                  price={"$30.00"}
                />
                <NearByCard
                  image={product1}
                  title={"Casual Hoodie"}
                  price={"$30.00"}
                />
                <NearByCard
                  image={product1}
                  title={"Casual Hoodie"}
                  price={"$30.00"}
                />
                <NearByCard
                  image={product1}
                  title={"Casual Hoodie"}
                  price={"$30.00"}
                />
                <NearByCard
                  image={product1}
                  title={"Casual Hoodie"}
                  price={"$30.00"}
                />
                <NearByCard
                  image={product1}
                  title={"Casual Hoodie"}
                  price={"$30.00"}
                />
                <NearByCard
                  image={product1}
                  title={"Casual Hoodie"}
                  price={"$30.00"}
                />
                <NearByCard
                  image={product1}
                  title={"Casual Hoodie"}
                  price={"$30.00"}
                />
                <NearByCard
                  image={product1}
                  title={"Casual Hoodie"}
                  price={"$30.00"}
                />
              </div>
            </Row>
           */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Merchandise;
