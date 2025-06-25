
// import "./index.css";
import { Col, Container, Row } from "reactstrap";

import "react-datepicker/dist/react-datepicker.css";
import * as yup from "yup";

import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { handleAtheleteInfo } from "../../redux/profileSlice";
import { colors } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export default function CareerHighlights() {

    const [searchParams] = useSearchParams()


    const draft = useSelector(
        (state) => state?.profileSlice?.profile?.basicProfile
    );
    const role = useSelector(
        (state) => state.authSlice.role
    );

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { state } = useLocation()
    const profile = useSelector(
        (state) => state.profileSlice.profile.basicProfile
    );

    const schema =
        yup.object().shape({
            awards: yup
                .string()
                .required("Awards is required"),
            valuable_player: yup
                .string()

                .required("Highlights is required"),
        })




    const {
        control,
        watch,
        setValue,
        getValues,
        trigger,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),

    });

    console.log(errors, "zzzzzz");


    useEffect(() => {
        if (draft?.profile_detail?.advanced?.sports_info?.length > 0) {
            console.log(
                "img run",
                draft?.profile_detail?.advanced?.sports_info?.length
            );

            // replace(draft.profile_detail.advanced.sports_info);
            reset({
                sports_info: draft?.profile_detail?.advanced?.sports_info,
                performance_metrics: draft?.profile_detail?.advanced?.performance_metrics,
                career_stats: draft?.profile_detail?.advanced?.career_stats,
            });
        }


    }, [draft, reset]);



    const submit = (data) => {
        console.log(data, 'what hehehe')
        // const payload = {
        //   ...data,
        //   performance_metrics: {
        //     ...data?.performance_metrics,
        //     strength: data?.performance_metrics?.strength || null,
        //     speed: data?.performance_metrics?.speed || null,

        //     // dominant_hand: "",
        //     agility: data?.performance_metrics?.agility || null,
        //     injury: data?.performance_metrics?.injury
        //       ? data?.performance_metrics?.injury
        //       : null,
        //   },
        // };


        // console.log(payload, 'Hammmad')
        dispatch(handleAtheleteInfo({ career_stats: data }))

        const id = searchParams.get("id");
        const name = searchParams.get("name");
        const sport_id = searchParams.get("sport_id");

        if (role === "Parent") {
            if (state) {
                navigate(`/parent/academic-information?type=${searchParams.get("type")}${id ? `&id=${id}` : ""}${sport_id ? `&sport_id=${sport_id}` : ""}${name ? `&name=${name}` : ""}`);
            } else {
                navigate(`/parent/academic-information?type=${searchParams.get("type")}${id ? `&id=${id}` : ""}${sport_id ? `&sport_id=${sport_id}` : ""}${name ? `&name=${name}` : ""}`);
            }
        }
        if (role === "Athlete") {
            if (state) {
                navigate(`/athlete/academic-information?type=${searchParams.get("type")}${id ? `&id=${id}` : ""}${sport_id ? `&sport_id=${sport_id}` : ""}${name ? `&name=${name}` : ""}`);
            } else {
                navigate(`/athlete/academic-information?type=${searchParams.get("type")}${id ? `&id=${id}` : ""}${sport_id ? `&sport_id=${sport_id}` : ""}${name ? `&name=${name}` : ""}`);
            }
        }

    }

    useEffect(() => {
        console.log(draft?.profile_detail?.advanced?.career_stats)
        if (draft?.profile_detail?.advanced?.career_stats) {
            reset({
                awards: draft?.profile_detail?.advanced?.career_stats?.awards,
                valuable_player: draft?.profile_detail?.advanced?.career_stats?.valuable_player
            })
        }


    }, [])

    return (
        <form onSubmit={handleSubmit(submit)}>
            <Container>
                <Row className="pt-5">
                    <Col md={12}>
                        <div onClick={() => navigate(-1)} className="d-flex back-btn mb-4">
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
                                    d="M0.457255 9.94802L7.99992 17.4907L9.88525 15.6054L3.28525 9.00535L9.88525 2.40535L7.99992 0.52002L0.457255 8.06269C0.207294 8.31272 0.0668726 8.6518 0.0668726 9.00535C0.0668726 9.3589 0.207294 9.69798 0.457255 9.94802Z"
                                    fill="white"
                                />
                            </svg>
                            <h4>Back</h4>
                        </div>
                    </Col>
                    <Col md={12}>
                        <h3 className="page-main-heading">Athlete Advance Profile Setup</h3>
                    </Col>
                    <Col xs={12} className="d-flex justify-content-center">
                        <div className="my-4 d-flex justify-content-center input-transparent-blur1 py-sm-3 py-2 px-sm-5 px-3 mx-sm-0 mx-5 ">
                            <svg width="240" height="22" viewBox="0 0 279 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="21" y1="13.5" x2="65" y2="13.5" stroke="url(#paint0_linear_6349_16769)" stroke-width="3" />
                                <line x1="83" y1="13.5" x2="127" y2="13.5" stroke="url(#paint1_linear_6349_16769)" stroke-width="3" />
                                <line x1="147" y1="13.5" x2="191" y2="13.5" stroke="white" stroke-width="3" />
                                <line x1="215" y1="13.5" x2="259" y2="13.5" stroke="white" stroke-width="3" />
                                <circle cx="12" cy="12" r="10" stroke="url(#paint2_linear_6349_16769)" stroke-width="4" />
                                <circle cx="75" cy="12" r="10" stroke="url(#paint3_linear_6349_16769)" stroke-width="4" />
                                <circle cx="139" cy="12" r="10" stroke="url(#paint4_linear_6349_16769)" stroke-width="4" />
                                <circle cx="203" cy="12" r="10" stroke="white" stroke-width="4" />
                                <circle cx="267" cy="12" r="10" stroke="white" stroke-width="4" />
                                <circle cx="12" cy="12" r="3" fill="url(#paint5_linear_6349_16769)" />
                                <circle cx="75" cy="12" r="3" fill="url(#paint6_linear_6349_16769)" />
                                <circle cx="139" cy="12" r="3" fill="white" />
                                <circle cx="203" cy="12" r="3" fill="white" />
                                <circle cx="267" cy="12" r="3" fill="white" />
                                <defs>
                                    <linearGradient id="paint0_linear_6349_16769" x1="21.0025" y1="15.5" x2="65.001" y2="15.5" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#DDA027" />
                                        <stop offset="0.3198" stop-color="#CE9B2B" />
                                        <stop offset="0.6802" stop-color="#FEF48E" />
                                        <stop offset="1" stop-color="#FFD046" />
                                    </linearGradient>
                                    <linearGradient id="paint1_linear_6349_16769" x1="83.0025" y1="15.5" x2="127.001" y2="15.5" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#DDA027" />
                                        <stop offset="0.3198" stop-color="#CE9B2B" />
                                        <stop offset="0.6802" stop-color="#FEF48E" />
                                        <stop offset="1" stop-color="#FFD046" />
                                    </linearGradient>
                                    <linearGradient id="paint2_linear_6349_16769" x1="0.0013628" y1="12.0009" x2="24.0005" y2="12.0009" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#DDA027" />
                                        <stop offset="0.3198" stop-color="#CE9B2B" />
                                        <stop offset="0.6802" stop-color="#FEF48E" />
                                        <stop offset="1" stop-color="#FFD046" />
                                    </linearGradient>
                                    <linearGradient id="paint3_linear_6349_16769" x1="63.0014" y1="12.0009" x2="87.0005" y2="12.0009" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#DDA027" />
                                        <stop offset="0.3198" stop-color="#CE9B2B" />
                                        <stop offset="0.6802" stop-color="#FEF48E" />
                                        <stop offset="1" stop-color="#FFD046" />
                                    </linearGradient>
                                    <linearGradient id="paint4_linear_6349_16769" x1="127.001" y1="12.0009" x2="151.001" y2="12.0009" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#DDA027" />
                                        <stop offset="0.3198" stop-color="#CE9B2B" />
                                        <stop offset="0.6802" stop-color="#FEF48E" />
                                        <stop offset="1" stop-color="#FFD046" />
                                    </linearGradient>
                                    <linearGradient id="paint5_linear_6349_16769" x1="9.00034" y1="12.0002" x2="15.0001" y2="12.0002" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#DDA027" />
                                        <stop offset="0.3198" stop-color="#CE9B2B" />
                                        <stop offset="0.6802" stop-color="#FEF48E" />
                                        <stop offset="1" stop-color="#FFD046" />
                                    </linearGradient>
                                    <linearGradient id="paint6_linear_6349_16769" x1="72.0003" y1="12.0002" x2="78.0001" y2="12.0002" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#DDA027" />
                                        <stop offset="0.3198" stop-color="#CE9B2B" />
                                        <stop offset="0.6802" stop-color="#FEF48E" />
                                        <stop offset="1" stop-color="#FFD046" />
                                    </linearGradient>
                                </defs>
                            </svg>


                        </div>
                    </Col>
                </Row>



                <Row className=" py-4 mx-1 my-3 mb-5 back-color" >
                    <Col xs={12}>
                        <h3 style={{ fontSize: "24px", color: "#fff", marginBottom: "20px" }}>
                            Careers & Stats Highlights
                        </h3>
                    </Col>
                    <Col md={6}>
                        <div className="basic-inputs input-card">
                            <div className="input-transparent-blur-fields">
                                <label> Awards </label>

                                <Controller
                                    control={control}
                                    name="awards"
                                    render={({ field }) => (
                                        <div className="w-100">
                                            <textarea
                                                rows={3}
                                                className="w-100 input-transparent-blur"
                                                type="text"
                                                placeholder="e.g., MVP, Gold Medal, Player of the Match"
                                                alt="text"
                                                {...field}
                                            />
                                        </div>
                                    )}
                                />

                                {errors.awards && (
                                    <p className="validation-text">
                                        {errors.awards.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="basic-inputs input-card">
                            <div className="input-transparent-blur-fields">
                                <label>Awards Highlights</label>
                                <div className="w-100">
                                    <div className="w-100">
                                        <Controller
                                            control={control}
                                            name="valuable_player"
                                            render={({ field }) => (
                                                <div className="w-100">
                                                    <textarea
                                                        rows={3}
                                                        className="w-100 input-transparent-blur"
                                                        type="text"
                                                        alt="text"
                                                        placeholder="e.g., Contributed 3 goals in the final match; led team to victory"
                                                        {...field}
                                                    />
                                                </div>
                                            )}
                                        />
                                        {errors.valuable_player && (
                                            <p className="validation-text">
                                                {errors.valuable_player.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Col>

                    <Col xs={12} className="mt-4">
                        <Row>
                            <Col md={4} />

                            <Col md={4}>
                                <button
                                    type="submit"
                                    //onClick={() => navigate("/advance-performance")}
                                    className="w-100 primary-btn px-2 py-3 my-3"
                                >
                                    <h3> Next </h3>
                                </button>
                            </Col>

                            <Col md={4} />
                        </Row></Col>
                </Row>

            </Container>
        </form>
    );
}
