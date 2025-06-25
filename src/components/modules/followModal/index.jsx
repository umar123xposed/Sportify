
import { Col, Container, Modal, Row } from 'reactstrap';

import * as yup from "yup";

import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { useLazyQuery } from '@apollo/client';
import { Get_All_Following, Get_All_Reacts } from '../../../graphql/query/query';
import UserImg from "../../../assets/coach.webp"
import Loader from "react-spinner-loader"
import { useSelector } from 'react-redux';


export default function FollowModal({ toggle, isOpen, handleOnclick, tags, follow_data }) {

    const [allData, setAllData] = useState([])
    const [cursor, setCursor] = useState()
    const [loader, setLoader] = useState(false)

    const role = useSelector(state => state?.authSlice?.role)

    const navigate = useNavigate();

    const [searchParams] = useSearchParams()

    const [Get_Follower] = useLazyQuery(Get_All_Following)
    const [Get_Reacts] = useLazyQuery(Get_All_Reacts)

    useEffect(() => {

        const fetchData = async () => {
            console.log(follow_data, "follow_data")
            try {
                const { data } = await Get_Follower({
                    variables: {
                        "input": {
                            "type": follow_data === "Followers" ? "follower" : follow_data === "Following" ? "following" : null,
                            "limit": 10,
                            "cursor": null,
                            "status": "Approved",
                            "user_id": parseInt(searchParams.get("user_id")) || null
                        }

                    },
                    fetchPolicy: "no-cache",
                });

                if (data) {
                    setAllData(data?.getAllFollowing?.data)
                    setCursor(data?.getAllFollowing?.nextCursor)

                }
            } catch (e) {
                console.log(e)

            }
        }

        const fetchData1 = async () => {
            console.log(follow_data, "follow_data")
            try {
                const { data } = await Get_Reacts({
                    variables: {
                        "input": {
                            "user_id": searchParams.get("user_id") ? (parseInt(searchParams.get("user_id"))) : (role === "Athlete" ? null : parseInt(searchParams.get("id"))),
                            "limit": 10,
                            "cursor": null
                        }

                    },
                    fetchPolicy: "no-cache",
                });

                if (data) {
                    setAllData(data?.getPlayerReactions?.data)
                    setCursor(data?.getPlayerReactions?.nextCursor)

                }
            } catch (e) {
                console.log(e)

            }
        }

        if (follow_data === "Followers" || follow_data === "Following") {
            isOpen && fetchData()
        }

        if (follow_data === "Reacts") {
            isOpen && fetchData1()
        }


    }, [follow_data, isOpen]);

    const handleShowMore = async () => {
        setLoader(true)
        if (follow_data === "Followers" || follow_data === "Following") {
            if (follow_data === "Followers" || follow_data === "Following") {
                try {
                    const { data } = await Get_Follower({
                        variables: {
                            "input": {
                                "type": follow_data === "Followers" ? "follower" : follow_data === "Following" ? "following" : null,
                                "limit": 10,
                                "cursor": cursor,
                                "status": "Approved"
                            }

                        },
                        fetchPolicy: "no-cache",
                    });

                    if (data) {
                        setAllData((prev) => [...(prev || []), ...(data?.getAllFollowing?.data || [])]);
                        setCursor(data?.getAllFollowing?.nextCursor)
                        setLoader(false)

                    }
                } catch (e) {
                    console.log(e)
                    setLoader(false)

                }
            }
        }

        if (follow_data === "Reacts") {
            try {
                const { data } = await Get_Reacts({
                    variables: {
                        "input": {
                            "user_id": role === "Athlete" ? null : parseInt(searchParams.get("id")),
                            "limit": 10,
                            "cursor": cursor
                        }

                    },
                    fetchPolicy: "no-cache",
                });

                if (data) {
                    setAllData((prev) => [...(prev || []), ...(data?.getPlayerReactions?.data || [])]);
                    setCursor(data?.getPlayerReactions?.nextCursor)
                    setLoader(false)
                }
            } catch (e) {
                console.log(e)
                setLoader(false)

            }
        }
    }

    const handleToggle = () => {
        setAllData()
        toggle()
    }


    return (
        <>
            <Modal backdrop={false} size="sm" centered isOpen={isOpen} toggle={handleToggle}>
                <div className="solid-card">
                    <div className="d-flex justify-content-end mb-3">
                        <svg
                            style={{
                                cursor: "pointer",
                            }}
                            onClick={() => handleToggle()}
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 26 26"
                            fill="none"
                        >
                            <path
                                d="M23.07 25.3183L13 15.2325L2.92997 25.3183L0.681641 23.07L10.7675 13L0.681641 2.92997L2.92997 0.681641L13 10.7675L23.07 0.697474L25.3025 2.92997L15.2325 13L25.3025 23.07L23.07 25.3183Z"
                                fill="white"
                            />
                        </svg>
                    </div>
                    <Row>
                        <h3
                            className="text-center my-3"
                            style={{ color: "#fff", fontSize: "22px", fontWeight: "600" }}
                        >
                            {follow_data}
                        </h3>
                    </Row>
                    <Row>
                        <Col md={1} />
                        <Col md={10}>
                            {
                                allData?.length === 0 ? (
                                    <div className="d-flex justify-content-center align-items-center text-secondary" style={{ height: "50vh", fontSize: "14px" }}>
                                        No Request
                                    </div>
                                ) : (
                                    <div
                                        className="mt-2"
                                        style={{
                                            height: "450px",
                                            overflow: "hidden",
                                            overflowY: "scroll",
                                        }}
                                    >
                                        {allData?.map((item) => {
                                            return (
                                                <>
                                                    <div
                                                        onClick={() => { }}
                                                        className="payCard my-3 py-2 px-2 d-flex align-items-center justify-content-center border border-secondary rounded"
                                                    >
                                                        <div className="d-flex gap-3 align-items-center justify-content-between">
                                                            <img
                                                                style={{
                                                                    objectFit: "cover",
                                                                    height: "60px",
                                                                    width: "60px",
                                                                    borderRadius: "50%",
                                                                }}
                                                                src={item?.user?.picture ? `${import.meta.env.VITE_BASE_URL_IMAGE}${item?.user?.picture}` : UserImg}
                                                                alt=""
                                                                className="me-2 border rounded-circle"
                                                            />

                                                            <div>
                                                                <p style={{ fontSize: "16px" }} className='mb-0 fw-bold'>
                                                                    {item?.user?.full_name}
                                                                </p>
                                                                <p className='mb-0' style={{ fontSize: "14px" }}>
                                                                    ID : {item?.players_profile?.player_id}
                                                                </p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </>
                                            );
                                        })}
                                    </div>
                                )
                            }

                        </Col>
                        <Col md={1} />

                    </Row>
                    <div className="d-flex justify-content-center">
                        {
                            cursor != null && (
                                <button className="primary-btn py-1 px-4 d-flex gap-4" disabled={loader} style={{ opacity: loader && "0.6" }} onClick={handleShowMore}>

                                    Show more
                                    {
                                        loader && (
                                            <Loader show={true}
                                                spinnerSize="16px"
                                                radius="10"

                                                color="red"
                                            />
                                        )
                                    }

                                </button>
                            )
                        }
                    </div>
                </div>
            </Modal>
        </>
    );
}
