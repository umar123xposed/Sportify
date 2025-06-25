import React, { useEffect, useRef, useState } from 'react'
import "./index.css"
import { Button, Col, Container, Row } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { GET__ALL_ORDERS, GET_ORDERS_DRTAILS_BY_ID } from '../../graphql/query/query';

export default function PurchaseHistory() {
const navigate = useNavigate()

      const [page, setPage] = useState(1);
    const [data1, setData1] = useState(null);
     const [fullName, setFullName] = useState("");
   const [totalPages, setTotalPages] = useState(0);
   const [edit , setEdit] = useState(false)
   const [status , setStatus] = useState(null)
const [selected, setSelected] = useState(null);

      const { loading, error, data, refetch } = useQuery(GET__ALL_ORDERS, {
        variables: {
          input: {
            limit: 8,
            page_start: page - 1,
            business_id: null,
            status: selected,
          },
        },
      });

       const [getVendorOrderDetail, { loading2, error1, data:data2, refetch2 }] =
         useLazyQuery(GET_ORDERS_DRTAILS_BY_ID);


      useEffect(() => {

       if (data?.getAllVendorOrders?.data) {
         console.log(data?.getAllVendorOrders?.data, "HAMMAD");
         setData1(data?.getAllVendorOrders?.data);
         setTotalPages(Math.ceil(data?.getAllVendorOrders?.total / 8));
       }

      }, [data ])




      const handleStatusChange = (stat) =>{

        refetch({
              variables: {
                input: {
                  limit: 8,
                  page_start: page - 1,
                  business_id: null,
                  status: stat,
                },
              },
            });


      }

useEffect(() => {
  if (data2) {
    console.log("Fetched order details:", data2);
  }
}, [data2]);
useEffect(() => {
  if (error1) {
    console.error("❌ Error fetching order details:", error1);
  }
}, [error1]);

  return (
    <div>
      <Container>
        <Row className="pt-5 ">
          <Col md={12}>
            <div
              onClick={() => (edit ? setEdit(false) : navigate(-1))}
              className="d-flex back-btn mb-4"
            >
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
          </Col>
        </Row>

        {edit ? (
          <>
            <Row className="py-5">
              <Col md={8}>
                <div
                  style={{ borderRadius: "8px" }}
                  className="mb-2 solid-card d-flex justify-content-between align-items-center"
                >
                  <h3 style={{ color: "#fff", fontSize: "16px" }}>
                    {data2?.getVendorOrderDetail?.vendor_package?.name}{" "}
                  </h3>
                  <h3 style={{ color: "#fff", fontSize: "16px" }}>
                    {`$${data2?.getVendorOrderDetail?.vendor_package?.price}`}
                  </h3>
                </div>
                {data2?.getVendorOrderDetail?.vendor_order_items?.map(
                  (currentItem, outerIndex) => {
                    return (
                      <>
                        <div className="solid-card quantity-card  d-flex mb-3">
                          <div className="quantity-left">
                            <img
                              style={{ height: "150px", objectFit: "contain" }}
                              src={`${import.meta.env.VITE_BASE_URL_IMAGE}${
                                currentItem?.vendor_package_item?.image
                              }`}
                              alt="white-product"
                            />
                          </div>

                          <div className="quantity-right ms-4">
                            <h3 className="product-titleq">
                              {currentItem?.vendor_package_item?.name}
                            </h3>

                            <div className="d-flex mt-2">
                              <h3
                                style={{ fontSize: "15px" }}
                                className="product-titleq"
                              >
                                Quantity :
                              </h3>
                              <h3
                                style={{ fontSize: "15px" }}
                                className=" ms-2 product-titleq"
                              >
                                {currentItem?.vendor_package_item?.quantity}
                              </h3>
                            </div>

                            <div className="d-flex mt-2">
                              <h3
                                style={{ fontSize: "15px" }}
                                className="product-titleq"
                              >
                                Size :
                              </h3>
                              <h3
                                style={{ fontSize: "15px" }}
                                className=" ms-2 product-titleq"
                              >
                                {currentItem?.selected_size}
                              </h3>
                            </div>

                            <div className="d-flex mt-2">
                              <h3
                                style={{ fontSize: "15px" }}
                                className="product-titleq"
                              >
                                Color :
                              </h3>
                              <div
                                style={{
                                  backgroundColor:
                                    currentItem?.selected_color?.toLowerCase(),
                                }}
                                className="color-selection ms-2"
                              ></div>
                            </div>

                            <div className="d-flex align-items-center">
                              <div className="d-flex align-items-center">
                                {currentItem?.color?.map((color, index) => (
                                  <div
                                    key={index}
                                    className="me-2 selected-color"
                                  >
                                    <div
                                      style={{
                                        backgroundColor: color?.toLowerCase(),
                                      }}
                                      className="color-selection"
                                    ></div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* {`Color : ${
                                    selected && selectedColors[currentItem?.id]
                                      ? selectedColors[currentItem?.id]
                                      : ""
                                  }`} */}

                            <div className="grid-containerq categories ">
                              {currentItem?.size?.map((size, index) => {
                                return (
                                  <div
                                    key={index}
                                    className={`single-categoryq`}
                                  >
                                    {size}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  }
                )}
              </Col>

              <Col md={4}>
                <div className="solid-card summary">
                  <h3 className="mb-4">Address Details </h3>

                  {/* Street Address */}

                  <div className="mt-3 mb-1 d-flex justify-content-between align-items-center">
                    <h3 style={{ fontSize: "14px", fontWeight: "300" }}>
                      Street Address :
                    </h3>
                    <h3
                      style={{ fontSize: "14px", fontWeight: "300" }}
                    >{`${data2?.getVendorOrderDetail?.address?.address_line}`}</h3>
                  </div>

                  <div className="mt-3 mb-1 d-flex justify-content-between align-items-center">
                    <h3 style={{ fontSize: "14px", fontWeight: "300" }}>
                      Country :
                    </h3>
                    <h3 style={{ fontSize: "14px", fontWeight: "300" }}>
                    {data2?.getVendorOrderDetail?.address?.country}
                    </h3>
                  </div>
                  <div className="mt-3 mb-1 d-flex justify-content-between align-items-center">
                    <h3 style={{ fontSize: "14px", fontWeight: "300" }}>
                      City :
                    </h3>
                    <h3
                      style={{ fontSize: "14px", fontWeight: "300" }}
                    >{`${data2?.getVendorOrderDetail?.address?.city}`}</h3>
                  </div>
                  <div className="mt-3 mb-1 d-flex justify-content-between align-items-center">
                    <h3 style={{ fontSize: "14px", fontWeight: "300" }}>
                      State :
                    </h3>
                    <h3 style={{ fontSize: "14px", fontWeight: "300" }}>{
                      data2?.getVendorOrderDetail?.address?.province_code}</h3>
                  </div>

                  <div className="mt-3 mb-1 d-flex justify-content-between align-items-center">
                    <h3 style={{ fontSize: "14px", fontWeight: "300" }}>
                      Postal Code :
                    </h3>
                    <h3 style={{ fontSize: "14px", fontWeight: "300" }}>
                      {`${data2?.getVendorOrderDetail?.address?.zip_code}`}{" "}
                    </h3>
                  </div>

                  <div className="mt-5 mb-3 d-flex justify-content-between align-items-center">
                    <h3 style={{ fontWeight: "600" }}>Merchandise Subtotal</h3>
                    <h3 style={{ fontWeight: "600" }}>
                      {`$${data2?.getVendorOrderDetail?.total_price}`}
                    </h3>
                  </div>
                  <div className="mt-1 mb-1 d-flex justify-content-between align-items-center">
                    <h3 style={{ fontWeight: "600" }}>Quantity</h3>
                    <h3
                      style={{ fontWeight: "600" }}
                    >{`${data2?.getVendorOrderDetail?.quantity}`}</h3>
                  </div>
                  <div className="">
                    <div className="mt-5 mb-3 d-flex justify-content-between align-items-center">
                      <h3 style={{ fontWeight: "600" }}>Order Status</h3>
                      <h3
                        style={{
                          fontWeight: "600",
                          backgroundColor: "green",
                          padding: "5px 15px",
                          borderRadius: "12px",
                        }}
                      >{`${data2?.getVendorOrderDetail?.status}`}</h3>
                    </div>
                  </div>

                  {/* <div className="mt-4 mb-5 d-flex justify-content-between align-items-center">
                               <h3 className="">Shipping Fee Subtotal</h3>
                               <h3 style={{ fontWeight: "600" }}>$3.00</h3>
                             </div> */}
                </div>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row>
              <div className="d-flex gap-2 mb-3 pb-3" style={{overflow: "auto"}}>
                <div
                  onClick={() => {
                    setSelected(null);
                    handleStatusChange(null);
                  }}
                  className={`role-button glass ${
                    selected == null && "solid"
                  } `}
                >
                  <label>All</label>
                </div>
                
                <div
                  onClick={() => {
                    setSelected("pending");
                    handleStatusChange("pending");
                  }}
                  className={`role-button glass ${
                    selected == "pending" && "solid"
                  } `}
                >
                  <label>Pending</label>
                </div>
                <div
                  onClick={() => {
                    setSelected("processing");
                    handleStatusChange("processing");
                  }}
                  className={`role-button glass ${
                    selected == "processing" && "solid"
                  } `}
                >
                  <label>Processing</label>
                </div>
                <div
                  onClick={() => {
                    setSelected("shipped");
                    handleStatusChange("shipped");
                  }}
                  className={`role-button glass ${
                    selected == "shipped" && "solid"
                  } `}
                >
                  <label>Shipped</label>
                </div>
                <div
                  onClick={() => {
                    setSelected("delivered");
                    handleStatusChange("delivered");
                  }}
                  className={`role-button glass ${
                    selected == "delivered" && "solid"
                  } `}
                >
                  <label>Delieverd</label>
                </div>
                <div
                  onClick={() => {
                    setSelected("cancelled");
                    handleStatusChange("cancelled");
                  }}
                  className={`role-button glass ${
                    selected == "cancelled" && "solid"
                  } `}
                >
                  <label>Cancelled</label>
                </div>
                <div
                  onClick={() => {
                    setSelected("failed");
                    handleStatusChange("failed");
                  }}
                  className={`role-button glass ${
                    selected == "failed" && "solid"
                  } `}
                >
                  <label>Failed</label>
                </div>
              </div>
            </Row>
            <Row>
              {data1?.map((item) => {
                console.log(item, "whastfsaf");
                return (
                  <>
                    <Col md={12} className="my-2">
                      <div
                        style={{ borderRadius: "4px" }}
                        className="history-card solid-card "
                      >
                        <Row>
                          <Col md={10}>
                            <div className="d-flex align-items-center">
                              <img
                                style={{ height: "95px", objectFit: "contain" }}
                                src={`${import.meta.env.VITE_BASE_URL_IMAGE}${
                                  item?.qr_code
                                }`}
                                className="me-3"
                                alt=""
                              />
                              <div className="">
                                <div className="order_detail">
                                  <h4>{item?.vendor_package?.name}</h4>
                                  <h4 className="my-2">
                                    ${item?.vendor_package?.price}
                                  </h4>
                                  <div className=" d-flex align-items-center">
                                    <h5> Status : </h5>
                                    <h6 className=" ms-1 pending">
                                      {" "}
                                      {item?.status}{" "}
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col md={2} className="d-flex align-items-center ">
                            <div className="w-100">
                              <div
                                style={{ cursor: "pointer", fontSize: "14px" }}
                                onClick={() => {
                                  setEdit(true);
                                  getVendorOrderDetail({
                                    variables: {
                                      getVendorOrderDetailId: item?.id,
                                    },
                                  });
                                }}
                                className={
                                  "justify-content-center see-details d-flex  align-items-center"
                                }
                              >
                                View Order Details
                                <svg
                                  className="ms-2"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12"
                                  height="15"
                                  viewBox="0 0 12 20"
                                  fill="none"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M11.5229 11.1109L2.30425 20L0 17.7781L8.0665 10L0 2.22187L2.30425 0L11.5229 8.88906C11.8284 9.18373 12 9.58334 12 10C12 10.4167 11.8284 10.8163 11.5229 11.1109Z"
                                    fill="white"
                                  />
                                </svg>
                              </div>

                              {item?.status == "shipped" && (
                                <div
                                  style={{
                                    cursor: "pointer",
                                    color: "white",
                                    backgroundColor: "green",
                                    borderRadius: "12px",
                                    fontSize: "14px",
                                  }}
                                  onClick={() => {
                                    navigate("/shipment-details", {
                                      state: item?.id,
                                    });

                                    // setEdit(true);
                                    //       getVendorOrderDetail({
                                    //     variables: {
                                    //      getVendorOrderDetailId: item?.id,
                                    //      },
                                    //</Col>  }
                                    //   );
                                  }}
                                  className={
                                    "mt-3 justify-content-center see-details d-flex  align-items-center py-2"
                                  }
                                >
                                  Shippment Details
                                  <svg
                                    className="ms-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10"
                                    height="12"
                                    viewBox="0 0 12 20"
                                    fill="none"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M11.5229 11.1109L2.30425 20L0 17.7781L8.0665 10L0 2.22187L2.30425 0L11.5229 8.88906C11.8284 9.18373 12 9.58334 12 10C12 10.4167 11.8284 10.8163 11.5229 11.1109Z"
                                      fill="white"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </>
                );
              })}
            </Row>

            <Row>
              <div className="d-flex justify-content-center align-items-center my-3">
                <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
                  Previous
                </Button>
                <span
                  style={{ color: "#fff", fontSize: "14px" }}
                  className="mx-3 d-flex align"
                >
                  Page {!data1?.length ? "0" : page} of {totalPages}
                </span>
                <Button
                  disabled={page === totalPages || !data1?.length}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </div>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}
