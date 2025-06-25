import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "reactstrap";

import { GET_TRACKSHIPMENT } from "../../graphql/query/query";
import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
const ShipmentTrackingDetails = () => {
     const { state } = useLocation()
   console.log(state,'whats is ');


 const { loading, error, data, refetch } = useQuery(GET_TRACKSHIPMENT, {
   variables: {
     vendorOrderId: state,
   },
 });


console.log(data?.trackShipment,'what is this');




  return (
    <Container>
      <Row className="mb-3">
        <Row>
          <Col md={12}>
            <Card
              style={{ borderRadius: "5px" }}
              className="p-3 px-3 mt-4 solid-card"
            >
              <div className="d-flex justify-content-between">
                <div>
                  <h3
                    className="mb-4"
                    style={{ fontSize: "14px", color: "GRAY" }}
                  >
                    Order No
                  </h3>
                  <h3 className="" style={{ fontSize: "18px", color: "#fff" }}>
                    {data?.trackShipment?.vendor_order?.order_id}
                  </h3>
                </div>
                <div className=" justify-content-end">
                  <h3
                    className="mb-4 text-right p-2"
                    style={{
                      width: "max-content",
                      fontSize: "14px",
                      backgroundColor: "#ccc",
                      borderRadius: "12px",
                    }}
                  >
                    {data?.trackShipment?.shipping_status}
                  </h3>

                  {/* <h3 style={{ fontSize: "14px", color: "GRAY" }}>
                    Apirl 15, 2025 at 2:30 AM
                  </h3> */}
                </div>
              </div>
            </Card>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={12}>
            <Card style={{ borderRadius: "5px" }} className=" p-3 solid-card ">
              <h3
                className=""
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  color: "#fff",
                }}
              >
                Shipment Details
              </h3>

              <div className="mt-5 W-100 d-flex justify-content-between align-items-center">
                <h3 className=" " style={{ fontSize: "16px", color: "gray" }}>
                  Shipping Services
                </h3>
                <h3 className="" style={{ fontSize: "17px", color: "#fff" }}>
                  {data?.trackShipment?.shipping_services}
                </h3>
              </div>

              <hr style={{ color: "#ccc" }} />
              <div className="mt-2 W-100 d-flex justify-content-between align-items-center">
                <h3 className=" " style={{ fontSize: "16px", color: "gray" }}>
                  current_status
                </h3>
                <h3 className="" style={{ fontSize: "17px", color: "#fff" }}>
                  {data?.trackShipment?.current_status}
                </h3>
              </div>

              <hr style={{ color: "#ccc" }} />
              <div className="mt-2 W-100 d-flex justify-content-between align-items-center">
                <h3 className=" " style={{ fontSize: "16px", color: "gray" }}>
                  PacKage Count
                </h3>
                <h3 className="" style={{ fontSize: "17px", color: "#fff" }}>
                  {data?.trackShipment?.estimated_delivery_date}
                </h3>
              </div>

              {/* <hr style={{ color: "#ccc" }} />
              <div className="mt-2 W-100 d-flex justify-content-between align-items-center">
                <h3 className=" " style={{ fontSize: "16px", color: "gray" }}>
                  Weight
                </h3>
                <h3 className="" style={{ fontSize: "17px", color: "#fff" }}>
                  5.2 lbs
                </h3>
              </div> */}

              {/* <hr style={{ color: "#ccc" }} />
              <div className="mt-2 W-100 d-flex justify-content-between align-items-center">
                <h3 className=" " style={{ fontSize: "16px", color: "gray" }}>
                  Dimenssion
                </h3>
                <h3 className="" style={{ fontSize: "17px", color: "#fff" }}>
                  12 x 8 x6
                </h3>
              </div> */}
            </Card>
          </Col>
          {/* <Col md={6}>
            <Card style={{ borderRadius: "5px" }} className="p-3 solid-card ">
              <h3
                className=""
                style={{ fontSize: "18px", fontWeight: "500", color: "#fff" }}
              >
                Shipment Details
              </h3>

              <div className="mt-5 W-100 d-flex justify-content-between align-items-center">
                <h3 className=" " style={{ fontSize: "16px", color: "gray" }}>
                  Dilvered Location
                </h3>
                <h3 className="" style={{ fontSize: "17px", color: "#fff" }}>
                  Ground Ups
                </h3>
              </div>

              <hr style={{ color: "#ccc" }} />
              <div className="mt-2 W-100 d-flex justify-content-between align-items-center">
                <h3 className=" " style={{ fontSize: "16px", color: "gray" }}>
                  Received By
                </h3>
                <h3 className="" style={{ fontSize: "17px", color: "#fff" }}>
                  Ground Ups
                </h3>
              </div>

              <hr style={{ color: "#ccc" }} />
              <div className="mt-2 W-100 d-flex justify-content-between align-items-center">
                <h3 className=" " style={{ fontSize: "16px", color: "gray" }}>
                  Signature
                </h3>
                <h3
                  className=""
                  style={{ fontSize: "17px", color: "#fff" }}
                ></h3>
              </div>

              <hr style={{ color: "#ccc" }} />
              <div className="mt-2 W-100 d-flex justify-content-between align-items-center">
                <h3 className=" " style={{ fontSize: "16px", color: "gray" }}>
                  Dimenssion
                </h3>
                <h3 className="" style={{ fontSize: "17px", color: "#fff" }}>
                  12 x 8 x6
                </h3>
              </div>

              <hr style={{ color: "#ccc" }} />

              <div className="mt-2 W-100 d-flex justify-content-between align-items-center">
                <h3 className=" " style={{ fontSize: "16px", color: "gray" }}>
                  ---
                </h3>
                <h3 className="" style={{ fontSize: "17px" }}>
                  ---
                </h3>
              </div>
            </Card>
          </Col>
        */}
        </Row>
        {/* <Row>
          <Col md={12}>
            <Card
              style={{ borderRadius: "5px" }}
              className="p-3 px-3 mt-4 solid-card"
            >
              <h3
                className=""
                style={{ fontSize: "18px", fontWeight: "500", color: "#fff" }}
              >
                Shipment Details
              </h3>

              <div className="">
                <div className="my-4">
                  <h3
                    className="mt-4"
                    style={{
                      fontWeight: "600",
                      fontSize: "16px",
                      color: "GRAY",
                    }}
                  >
                    Tracking No
                  </h3>
                  <h3
                    className="my-2"
                    style={{ fontSize: "14px", color: "GRAY" }}
                  >
                    Tracking No
                  </h3>
                  <h3 style={{ fontSize: "14px", color: "GRAY" }}>
                    Apirl 15, 2025 at 2:30 AM
                  </h3>
                </div>

                <div>
                  <h3
                    className="mt-4"
                    style={{
                      fontWeight: "600",
                      fontSize: "16px",
                      color: "GRAY",
                    }}
                  >
                    Tracking No
                  </h3>
                  <h3
                    className="my-2"
                    style={{ fontSize: "14px", color: "GRAY" }}
                  >
                    Tracking No
                  </h3>
                  <h3 style={{ fontSize: "14px", color: "GRAY" }}>
                    Apirl 15, 2025 at 2:30 AM
                  </h3>
                </div>

                <div>
                  <h3
                    className="mt-4"
                    style={{
                      fontWeight: "600",
                      fontSize: "16px",
                      color: "GRAY",
                    }}
                  >
                    Tracking No
                  </h3>
                  <h3
                    className="my-2"
                    style={{ fontSize: "14px", color: "GRAY" }}
                  >
                    Tracking No
                  </h3>
                  <h3 style={{ fontSize: "14px", color: "GRAY" }}>
                    Apirl 15, 2025 at 2:30 AM
                  </h3>
                </div>
                <div className=" justify-content-end"></div>
              </div>
            </Card>
          </Col>
        </Row> */}
      </Row>
    </Container>
  );
};

export default ShipmentTrackingDetails;
