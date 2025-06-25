import React, { useEffect, useState } from "react";
import "./index.css"
import { Col, Row } from "reactstrap";
import PlayerCard from "../../components/elements/playerCard";
import InviteCard from "../../components/elements/InviteCard";
import { useNavigate } from "react-router-dom";
import { ListPlayer } from "../../graphql/query/query";
import { useMutation, useQuery } from "@apollo/client";
import { SEND_INVITE } from "../../graphql/mutation";
import { SendinviteOnSubmit } from "../../graphql/api-callings";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import Button from "../../components/elements/button/index"



const ParentChildKey = () => {
  const navigate = useNavigate()

  const [page, setPage] = useState(1);
  const [data1, setData1] = useState(null);
  const [fullName, setFullName] = useState("");
  const [totalPages, setTotalPages] = useState(0);


  const [debouncedFullName, setDebouncedFullName] = useState("");
  const { loading, error, data, refetch } = useQuery(ListPlayer, {
    variables: {
      input: {
        limit: 1,
        page_start: page - 1,
        full_name: debouncedFullName || null,
      },
    },
    fetchPolicy: 'no-cache' // Ensure a fresh request every time

  });

  const [sendInvite, { loading: loading2, error: error2, data: data2 }] =
    useMutation(SEND_INVITE);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFullName(fullName);
      setPage(1); // Reset to first page on search
    }, 500);

    return () => clearTimeout(handler);
  }, [fullName]);


  useEffect(() => {

    if (data?.listPlayer?.data) {
      console.log(data?.listPlayer?.data, "HAMMAD");
      setData1(data?.listPlayer?.data);
      setTotalPages(Math.ceil(data?.listPlayer?.total / 1))
    }

  }, [data])

  useEffect(() => {

    if (data?.listPlayer?.data) {
      refetch({
        variables: {
          input: {
            limit: 10,
            page_start: page - 1,
            full_name: debouncedFullName || null,
          },
        },
      });
      setTotalPages(Math.ceil(data?.listPlayer?.total / 12));

    }

  }, [page, debouncedFullName])

  const handleSendInvite = (info) => {
    console.log(info?.user?.id, "im hit")
    SendinviteOnSubmit(info?.user?.id, sendInvite, refetch)
  }

  return (
    <>
      <div className="page-wrapper  pb-4">
        <div className="slider">
          <div className="CustomeConatiner">
            <Row className="mx-0">
              <Col md={12}>
                <div
                  onClick={() => navigate(-1)}
                  className="d-flex back-btn my-4"
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
              <h3 className="main-heading_key text-center">
                Enter Athlete Player ID
              </h3>
              <p className="main-heading_key_para text-center">
                Pick the role that best describes you to personalize your journey.
              </p>
            </Row>
            <div className="glass-card mt-4 mx-3">
              <Row className="mx-0">
                <Col md={12}>
                  <div className="Search" >
                    <h4>Search Player Name </h4>
                    <div className="d-flex w-100 justify-content-between">
                      <input
                        style={{ color: "#fff", width: "80%" }}
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          setPage(1); // Reset to first page on search
                        }}
                        type="text"
                        placeholder="Search by Name or Id"
                      />
                      <div className="d-flex align-items-end justify-content-center" style={{ width: "20%" }}>
                        <button className="primary-btn w-75 py-2">Search</button>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <Row className="mt-5 mx-0">
              <Col md={12}>
                <div className="key-list d-flex align-items-center justify-content-between">
                  <h3>Players List</h3>
                  <div></div>
                  <div className="d-flex">
                    <div
                      onClick={() => navigate("/parent/select-type")}
                      style={{ padding: "10px 20px", cursor: "pointer" }}
                      className="glass-btn me-3  d-flex align-items-center "
                    >
                      <svg
                        className="me-1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 30 30"
                        fill="none"
                      >
                        <path
                          d="M26.9497 3.12013C26.8641 3.02606 26.7603 2.95032 26.6445 2.89749C26.5288 2.84466 26.4036 2.81584 26.2764 2.81277C26.1493 2.80971 26.0228 2.83245 25.9047 2.87964C25.7865 2.92683 25.6792 2.99748 25.5891 3.08732L24.8643 3.80861C24.7765 3.89651 24.7271 4.01569 24.7271 4.13996C24.7271 4.26423 24.7765 4.38341 24.8643 4.47131L25.5288 5.13459C25.5723 5.17835 25.6241 5.21307 25.6811 5.23676C25.7381 5.26046 25.7993 5.27265 25.861 5.27265C25.9227 5.27265 25.9839 5.26046 26.0409 5.23676C26.0979 5.21307 26.1497 5.17835 26.1932 5.13459L26.8999 4.43146C27.2573 4.07463 27.2907 3.49338 26.9497 3.12013ZM23.3989 5.27345L12.8216 15.832C12.7574 15.8959 12.7108 15.9752 12.6862 16.0623L12.1969 17.5195C12.1852 17.5591 12.1844 17.6011 12.1945 17.641C12.2047 17.681 12.2254 17.7175 12.2546 17.7467C12.2838 17.7758 12.3203 17.7966 12.3602 17.8067C12.4002 17.8169 12.4422 17.816 12.4817 17.8043L13.9378 17.3151C14.0249 17.2904 14.1042 17.2438 14.168 17.1797L24.7266 6.60119C24.8243 6.50246 24.8791 6.36918 24.8791 6.23029C24.8791 6.0914 24.8243 5.95812 24.7266 5.85939L24.1436 5.27345C24.0448 5.17488 23.9109 5.11952 23.7713 5.11952C23.6317 5.11952 23.4978 5.17488 23.3989 5.27345Z"
                          fill="url(#paint0_linear_3365_32260)"
                        />
                        <path
                          d="M22.6371 11.3473L15.4951 18.5033C15.2191 18.78 14.8798 18.9853 14.5066 19.1016L12.9891 19.6096C12.6289 19.7113 12.2481 19.7151 11.886 19.6207C11.5239 19.5263 11.1935 19.337 10.9288 19.0723C10.6642 18.8077 10.4749 18.4773 10.3805 18.1152C10.2861 17.753 10.2899 17.3723 10.3916 17.0121L10.8996 15.4945C11.0155 15.1215 11.2204 14.7822 11.4967 14.5061L18.6527 7.36289C18.7183 7.29737 18.763 7.21387 18.7812 7.12294C18.7993 7.03202 18.7901 6.93776 18.7546 6.85209C18.7192 6.76641 18.6591 6.69317 18.5821 6.64163C18.505 6.59008 18.4144 6.56254 18.3217 6.5625H6.09375C5.22351 6.5625 4.38891 6.9082 3.77356 7.52356C3.1582 8.13891 2.8125 8.97351 2.8125 9.84375V23.9062C2.8125 24.7765 3.1582 25.6111 3.77356 26.2264C4.38891 26.8418 5.22351 27.1875 6.09375 27.1875H20.1562C21.0265 27.1875 21.8611 26.8418 22.4764 26.2264C23.0918 25.6111 23.4375 24.7765 23.4375 23.9062V11.6783C23.4375 11.5856 23.4099 11.495 23.3584 11.4179C23.3068 11.3409 23.2336 11.2808 23.1479 11.2454C23.0622 11.2099 22.968 11.2007 22.8771 11.2188C22.7861 11.237 22.7026 11.2817 22.6371 11.3473Z"
                          fill="url(#paint1_linear_3365_32260)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_3365_32260"
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
                            id="paint1_linear_3365_32260"
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
                      <label
                        style={{
                          color: "#fff",
                          fontSize: "14px",
                          cursor: "pointer",
                        }}
                      >
                        Create New Account
                      </label>
                    </div>

                    <div
                      onClick={() => navigate("/parent/child-invites")}
                      className="btn-white d-flex align-items-center "
                      style={{ cursor: "pointer" }}
                    >
                      <svg
                        className="me-1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="15"
                        viewBox="0 0 22 17"
                        fill="none"
                      >
                        <path
                          d="M12.159 7.27746C12.8171 6.35799 13.1709 5.25565 13.1709 4.12496C13.1709 2.99427 12.8171 1.89192 12.159 0.972459C12.7752 0.552701 13.5043 0.329824 14.2498 0.333292C15.2554 0.333292 16.2199 0.73277 16.931 1.44385C17.642 2.15492 18.0415 3.11935 18.0415 4.12496C18.0415 5.13057 17.642 6.095 16.931 6.80607C16.2199 7.51715 15.2554 7.91663 14.2498 7.91663C13.5043 7.92009 12.7752 7.69722 12.159 7.27746ZM3.95817 4.12496C3.95817 3.37504 4.18055 2.64196 4.59718 2.01842C5.01381 1.39489 5.60599 0.908898 6.29883 0.621915C6.99166 0.334933 7.75404 0.259846 8.48955 0.406148C9.22507 0.55245 9.90068 0.913571 10.4309 1.44385C10.9612 1.97412 11.3223 2.64973 11.4686 3.38524C11.615 4.12075 11.5399 4.88313 11.2529 5.57597C10.9659 6.2688 10.4799 6.86098 9.85637 7.27761C9.23284 7.69425 8.49976 7.91663 7.74984 7.91663C6.74422 7.91663 5.7798 7.51715 5.06872 6.80607C4.35765 6.095 3.95817 5.13057 3.95817 4.12496ZM6.12484 4.12496C6.12484 4.44635 6.22014 4.76053 6.3987 5.02776C6.57726 5.29499 6.83105 5.50327 7.12798 5.62626C7.42491 5.74926 7.75164 5.78144 8.06686 5.71873C8.38208 5.65603 8.67163 5.50127 8.89889 5.27401C9.12615 5.04675 9.28091 4.7572 9.34361 4.44198C9.40631 4.12676 9.37413 3.80003 9.25114 3.5031C9.12815 3.20617 8.91987 2.95238 8.65264 2.77382C8.38541 2.59526 8.07123 2.49996 7.74984 2.49996C7.31886 2.49996 6.90553 2.67116 6.60079 2.97591C6.29604 3.28066 6.12484 3.69398 6.12484 4.12496ZM15.3332 14.4166V16.5833H0.166504V14.4166C0.166504 14.4166 0.166504 10.0833 7.74984 10.0833C15.3332 10.0833 15.3332 14.4166 15.3332 14.4166ZM13.1665 14.4166C13.0148 13.5716 11.7257 12.25 7.74984 12.25C3.774 12.25 2.409 13.6691 2.33317 14.4166M15.279 10.0833C15.943 10.5998 16.4859 11.2553 16.8695 12.0039C17.2532 12.7525 17.4683 13.576 17.4998 14.4166V16.5833H21.8332V14.4166C21.8332 14.4166 21.8332 10.4841 15.2682 10.0833H15.279Z"
                          fill="black"
                        />
                      </svg>
                      <label style={{ cursor: "pointer" }}>Your Invites</label>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="mt-3 mx-0">
              {data1?.map((item) => {
                return (
                  <>
                    <Col xl={3} md={4} className="my-2">
                      <div style={{ width: "100%" }} className={` w-100`}>
                        <InviteCard
                          image={`${import.meta.env.VITE_BASE_URL_IMAGE}${item?.user?.picture}`}
                          handleSend={() => handleSendInvite(item)}
                          title={item?.user?.full_name}
                          id={item?.player_id}
                          sendid={item?.user_id}
                          data={item}
                        />
                      </div>
                    </Col>
                  </>
                );
              })}

              {!data1?.length && (
                <h3 className="text-center my-5" style={{ color: "#fff" }}>
                  No Record Found
                </h3>
              )}

              {/* Pagination Controls */}
              {data1?.length && (
                <div className="d-flex justify-content-center align-items-center mt-3">
                  <Button disabled={page == 1} onClick={() => page > 1 && setPage(page - 1)}>
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
                    onClick={() => (page != totalPages) && setPage(page + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParentChildKey;

