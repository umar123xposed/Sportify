// import "./index.css";
import { Col, Container, Modal, Row } from "reactstrap";
import forword from "./../../../assets/who-we-are-for.png";
import twitter from "./../../../assets/twitter.png";
import insta from "./../../../assets/instagram.png";
import fg from "./../../../assets/fg.png";
import youtube from "./../../../assets/youtube.png";
import tiktok from "./../../../assets/tiktok.png";
import profile from "./../../../assets/profile.png";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as yup from "yup";

import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, set, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { UPDATE_CHILD_ACCOUNT, UPDATE_CHILD_SPORT } from "../../../graphql/mutation";
import { UpdateChildOnSubmit, UpdateChildSportOnSubmit } from "../../../graphql/api-callings";
import toast from "react-hot-toast";
import Loader from "react-spinner-loader"
//import { handleCreateBasicProfile } from "../../redux/profileSlice";

const EditCareerSportModal = ({
    refetchPlayers,
    setShow,
    toggle,
    toggle1,
    isOpen,
    data,
    refetch,
    sportData,
    setActive,
    active
}) => {

    console.log(sportData)
    const [updateChildProfile] =
        useMutation(UPDATE_CHILD_SPORT);


    const schema =
        yup.object().shape({
            awards: yup
                .string()
                .required("Awards is required"),
            highlights: yup
                .string()

                .required("Highlights is required"),
        });

    const {
        register,
        handleSubmit,
        control,
        setValue,
        trigger,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),

        mode: "onChange",
    });
    const [change, setOnchange] = useState(true)
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        if (sportData) {

            if (sportData?.profile_detail?.career_stats?.awards) {
                setValue("awards", sportData?.profile_detail?.career_stats?.awards);
            }
            if (sportData?.profile_detail?.career_stats?.highlights) {
                setValue("highlights", sportData?.profile_detail?.career_stats?.highlights);
            }


            setOnchange(true)
        }
    }, [data, isOpen]);





    const onSubmit = async (updateData) => {



        const payload = {
            "id": parseInt(sportData?.id),
            "profile_detail": {
                "advanced": {
                    "career_stats": {
                        "awards": updateData?.awards,
                        "highlights": updateData?.highlights,
                    }
                }
            },
            "profile_type": "Advanced"
        }


        console.log(payload, updateData, "updated 12");

        // try {
        //     await UpdateChildSportOnSubmit(payload, updateChildProfile, toggle, refetch, refetchPlayers);

        // } catch (error) {
        //     console.error("Error updating child and refetching players:", error);
        // }
        try {
            setLoader(true)
            const { data } = await updateChildProfile({
                variables: {
                    input: payload
                },
                "fetch-policy": "no-cache"
            })

            if (data) {
                setLoader(false)
                console.log(data, "asdfghj3456")
                toast.success(data?.updateSportsProfile?.message)
                setActive(!active)
                toggle()
                toggle1()
                // dispatch(handleClearProfile())
                // if ((userRole === "Parent")) {
                //     navigate(`/parent/payment-success`)
                // }
                // if ((userRole === "Athlete")) {
                //     navigate(`/athlete/payment-success`)
                // }
                // setLoader(false)
            }

        } catch (e) {
            console.log(e)
            setLoader(false)
        }
    };

    const handleToggle = () => {
        reset()
        toggle()
    }


    return (
        <>
            <Modal size="xl" centered isOpen={isOpen} toggle={handleToggle}>
                <div className="solid-card">
                    <div className="d-flex justify-content-end  mb-3">
                        <svg
                            style={{
                                cursor: "pointer",
                            }}
                            onClick={handleToggle}
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

                    <form onSubmit={handleSubmit(onSubmit)}>



                        <Row>
                            <Col md={1} />
                            <Col md={5}>
                                <div className="detailed-info-section mt-4">
                                    <div className="detailed-info-header d-flex justify-content-between align-items-center">
                                        <h6 className="section-title">Careers & Stats Highlights</h6>

                                    </div>
                                </div>
                            </Col>

                        </Row>

                        <Row>
                            <Col md={1} />
                            <Col md={5}>
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
                            <Col md={5}>
                                <div className="basic-inputs input-card">
                                    <div className="input-transparent-blur-fields">
                                        <label>Awards Highlights</label>
                                        <div className="w-100">
                                            <div className="w-100">
                                                <Controller
                                                    control={control}
                                                    name="highlights"
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
                                                {errors.highlights && (
                                                    <p className="validation-text">
                                                        {errors.highlights.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Col>
                            <Col md={1} />
                        </Row>


                        <Row>
                            <Col md={4} />

                            <Col md={4}>
                                {/* <button
                                    // disabled={change}
                                    // style={{ opacity: change == true ? "0.5" : "1" }}
                                    //  onClick={()=>trigger("email")}
                                    className="primary-btn w-100 px-2 py-3 my-4"
                                    type="submit"
                                >
                                    <h3> Update </h3>
                                </button> */}
                                <button className="w-100 primary-btn px-2 py-3 my-3 d-flex gap-3" disabled={loader} style={{ opacity: loader && "0.6" }}>
                                    Update
                                    {
                                        loader &&
                                        (<Loader show={true}
                                            spinnerSize="16px"
                                            radius="10"

                                            color="red"
                                        />)
                                    }
                                </button>
                            </Col>

                            <Col md={4} />
                        </Row>

                    </form>
                </div>
            </Modal>
        </>
    );
};

export default EditCareerSportModal;
