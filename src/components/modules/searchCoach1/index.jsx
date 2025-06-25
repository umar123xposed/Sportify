import "./index.css"
import { Button, Col, Container, Modal, Row } from 'reactstrap';

import * as yup from "yup";

import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import team from "./../../../assets/team.png"
import coach from "./../../../assets/coach.png";

import { SEND_INVITE, Update_Team_Members } from "../../../graphql/mutation";
import { All_AllCoachUsers, GET_USER_ROLL, ListPlayer } from "../../../graphql/query/query";
import { useMutation, useQuery } from "@apollo/client";
import Loader from "react-spinner-loader"

export default function SearchCoachModal1({ id, setShow, show, handleCoachOnClick, coaches, setCoaches }) {
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [data1, setData1] = useState(null);
    const [fullName, setFullName] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [loader, setLoader] = useState(false)

    const [debouncedFullName, setDebouncedFullName] = useState("");

    const { loading, error, data, refetch } = useQuery(All_AllCoachUsers, {
        variables: {
            input: {
                cursor: null,
                full_name: debouncedFullName || null,
                limit: 20,
                team_id: parseInt(id)
            },
        },
    });
    const [sendInvite, { loading: loading2, error: error2, data: data2 }] =
        useMutation(SEND_INVITE);

    const [Add_Member] = useMutation(Update_Team_Members)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFullName(fullName);
            setPage(1); // Reset to first page on search
        }, 500);

        return () => clearTimeout(handler);
    }, [fullName]);

    useEffect(() => {
        if (data?.allCoachUsers?.data) {
            console.log(data?.allUserByRole, "HAMMAD");
            setData1(data?.allCoachUsers?.data);
            setTotalPages(Math.ceil(data?.allCoachUsers?.total / 20));
            //  setTotalPages(Math.ceil(data?.allUserByRole?.total / 6));
        }
    }, [data]);

    useEffect(() => {
        if (data?.allCoachUsers?.data) {
            refetch({
                variables: {
                    input: {
                        cursor: null,
                        full_name: debouncedFullName || null,
                        limit: 20,
                    },
                },
            });
            //    setTotalPages(Math.ceil(data?.allUserByRole?.total / 10));
        }
    }, [page, debouncedFullName]);

    const handleAddPlayer = async () => {

        const tagId = coaches.map(item => item.id);
        console.log(tagId)


        try {
            setLoader(true)
            const response = await Add_Member({
                variables: {
                    "input": {
                        "is_add": true,
                        "memberIds": tagId || [],
                        "teamId": parseInt(id),
                        "type": "Coach"
                    }
                }
            });

            if (response) {
                setLoader(false)
                console.log("Team created:", response);
                setCoaches([])
                setShow(false)
                // navigate(`/coach/team-details?id=${response?.data?.createTeam?.data?.id}`);
            }

        } catch (error) {
            console.error("Error creating team:", error);
            setLoader(false)
        }
    }

     const handleRemovePlayer = (id) => {
        console.log(coaches)
        const updatedTags = coaches.filter(
            (item) => item?.id !== id
        );
        setCoaches(updatedTags);
    };


    return (
        <>
            <Modal backdrop={false} size="lg" centered isOpen={show}>
                <div className="solid-card">
                    <div className="d-flex justify-content-end mb-3">
                        <svg
                            style={{
                                cursor: "pointer",
                            }}
                            onClick={() => setShow(false)}
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
                            Add Coaches
                        </h3>
                    </Row>
                    <Row>
                        <Col md={1} />
                        <Col md={10}>
                            <div className="search ">
                                <div className="search-bar">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 25 25"
                                        fill="none"
                                    >
                                        <path
                                            d="M17.6127 17.3526L20.6927 20.4326M19.7197 11.9326C19.7197 13.9217 18.9296 15.8294 17.523 17.2359C16.1165 18.6424 14.2089 19.4326 12.2197 19.4326C10.2306 19.4326 8.32295 18.6424 6.91643 17.2359C5.5099 15.8294 4.71973 13.9217 4.71973 11.9326C4.71973 9.94349 5.5099 8.03584 6.91643 6.62932C8.32295 5.22279 10.2306 4.43262 12.2197 4.43262C14.2089 4.43262 16.1165 5.22279 17.523 6.62932C18.9296 8.03584 19.7197 9.94349 19.7197 11.9326Z"
                                            stroke="white"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    <input
                                        style={{ background: "transparent" }}
                                        onChange={(e) => setFullName(e.target.value)}
                                        type="text"
                                        value={fullName}
                                        placeholder="Search by Full Name & ID"
                                    />
                                </div>
                            </div>
                            <div
                                className="mt-2"
                                style={{
                                    height: "450px",
                                    overflow: "hidden",
                                    overflowY: "scroll",
                                }}
                            >
                                {data1?.map((item) => {
                                    return (
                                        <>
                                            <div
                                                onClick={() => { }}
                                                className="payCard my-3 py-2 px-5 d-flex align-items-center justify-content-between"
                                            >
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <img
                                                        style={{
                                                            objectFit: "cover",
                                                            height: "60px",
                                                            width: "60px",
                                                            borderRadius: "50%",
                                                        }}
                                                        src={coach}
                                                        alt=""
                                                        className="me-2"
                                                    />

                                                    <div>
                                                        <p style={{ fontSize: "14px" }}>
                                                            {item?.full_name}
                                                        </p>
                                                        <p style={{ fontSize: "13px" }}>{item?.email}</p>
                                                    </div>
                                                </div>
                                                {coaches?.some(
                                                    (inner) => inner?.id === item?.id
                                                ) ? (
                                                    <p
                                                        style={{
                                                            fontSize: "13px",
                                                            background: "var(--primary-grad-color1)",
                                                            padding: "5px 15px 5px 20px",
                                                            borderRadius: "25px",
                                                            color: "black",
                                                            display: "inline-flex",
                                                            alignItems: "center",
                                                            gap: "8px",
                                                        }}
                                                    >
                                                        Added
                                                        <span
                                                            onClick={(e) => {
                                                                e.stopPropagation(); // Prevent parent click
                                                                handleRemovePlayer(item?.id); // Add your remove logic here
                                                            }}
                                                            style={{
                                                                backgroundColor: "#232323",
                                                                color: "white",
                                                                borderRadius: "50%",
                                                                width: "20px",
                                                                height: "20px",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                fontSize: "12px",
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            ✖
                                                        </span>
                                                    </p>

                                                ) : (
                                                    <div
                                                        onClick={(e) =>
                                                            handleCoachOnClick(e, {

                                                                id: item?.id,
                                                                email: item?.player_id,
                                                                nick_name: item?.full_name,
                                                                picture: `${coach}`, // Fallback value to  avoid undefined errors
                                                            })
                                                        }
                                                        className="view-details"
                                                    >
                                                        <p style={{ fontSize: "13px" }}>+ Add Coach</p>
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    );
                                })}
                            </div>
                        </Col>
                        <Col md={1} />
                    </Row>
                    {/* {data1?.length && (
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
                    )} */}
                    <div className="d-flex justify-content-center">
                        <button className="primary-btn py-3 gap-2 px-4" disabled={(coaches.length === 0 || loader)} style={{ opacity: (coaches.length == 0 || loader) && "0.6" }} onClick={handleAddPlayer}>
                            {`Add Coach (${coaches.length})`}
                            {
                                loader &&
                                (<Loader show={true}
                                    spinnerSize="16px"
                                    radius="10"

                                    color="red"
                                />)
                            }
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
