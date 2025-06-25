import React, { useEffect, useRef, useState } from 'react'
import "./index.css"
import { Col, Container, Row, Form, FormGroup, Label, Input, Button, Modal, Accordion, AccordionItem, AccordionHeader, AccordionBody } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { CREATE_TEAM, Update_Team } from '../../../graphql/mutation';
import { IoIosArrowBack } from 'react-icons/io';
import { FaUsers, FaUpload, FaTimesCircle, FaRegUserCircle } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { GET_PLAYERPROFILE_BY_ID, Sport_List } from '../../../graphql/query/query';
import { useMutation, useQuery } from '@apollo/client';
import toast from 'react-hot-toast';
import Loader from "react-spinner-loader"

const EditTeamDetails = ({
    handleToggle,
    isOpen,
    sportData
}) => {

    console.log(sportData)
    const navigate = useNavigate()

    const [preview, setPreview] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)

    const schema = yup.object().shape({
        win: yup
            .number()
            .typeError("Number Required")
            .min(0, "Invalid format") // Allows 0 and positive numbers
            .integer("Invalid format")
            .required("Required"),
        loss: yup
            .number()
            .typeError("Number Required")
            .min(0, "Invalid format") // Allows 0 and positive numbers
            .integer("Invalid format")
            .required("Required"),
        tie: yup
            .number()
            .typeError("Number Required")
            .min(0, "Invalid format") // Allows 0 and positive numbers
            .integer("Invalid format")
            .required("Required"),
        team_url: yup
            .string()
            .nullable()
            .transform((value) => (value === "" ? null : value))
            .url("Enter a valid URL"),
        name: yup.string().required("Team name is required"),
        team_level: yup.string().required("Team level is required"),
        // team_level: yup.string().required("Team Level is required"),
        image: yup
            .mixed()
            .required("Image is required")
            .test("fileType", "Only JPG, PNG, and JPEG are allowed", (value) => {
                return (
                    value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
                );
            })
            .test("fileSize", "File size must be less than 2MB", (value) => {
                return value && value.size <= 2 * 1024 * 1024; // 2MB limit
            }),
    });


    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(
            schema
        ),
        mode: "onChange",
    });

    useEffect(() => {
        if (sportData) {
            setValue("name", sportData?.getTeamDetail?.name)
            setValue("team_level", sportData?.getTeamDetail?.team_level)
            setValue("tie", sportData?.getTeamDetail?.tie)
            setValue("win", sportData?.getTeamDetail?.win)
            setValue("loss", sportData?.getTeamDetail?.loss)
            setValue("team_url", sportData?.getTeamDetail?.website_url)

            if (sportData?.getTeamDetail?.logo) {
                setValue("image", {
                    type: "image/jpeg",  // a valid MIME type from your list
                    size: 1000,          // some number <= 2MB (2 * 1024 * 1024)
                    // you can add other file properties if needed
                });
                setPreview(`${import.meta.env.VITE_BASE_URL_IMAGE}${sportData?.getTeamDetail?.logo}`)
            }

        }
    }, [sportData])

    const [updateTeam, { loading: loading1, error, data }] =
        useMutation(Update_Team);


    console.log(errors)
    const onSubmit = async (data) => {


        const input = {
            id: parseInt(sportData?.getTeamDetail?.id),
            name: data?.name || "",
            team_level: data?.team_level || "",
            win: parseInt(data?.win) || 0,
            loss: parseInt(data?.loss) || 0,
            tie: parseInt(data?.tie) || 0,
            website_url: data?.team_url
        };


        try {
            const response = await updateTeam({
                variables: {
                    input,
                    logo: selectedFile
                }
            });

            console.log("Team created:", response);
            toast.success(response?.data?.updateTeam?.message)
            handleToggle()

        } catch (error) {
            console.error("Error creating team:", error);
        }
    };


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

                    <Row className="justify-content-center px-md-5 px-2">
                        <Col xs={12}>


                            <div className="">
                                <div className="team-image-upload mb-4 text-center">
                                    <div className="team-placeholder">
                                        {preview ? (
                                            <img
                                                src={preview}
                                                alt="Team"
                                                className="uploaded-team-img"
                                            />
                                        ) : (
                                            <FaUsers className="placeholder-icon" />
                                        )}
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.getElementById("openfile").click();
                                        }}
                                        className="uploadbutton"
                                    >
                                        Upload Image
                                        <FaUpload className="upload-icon" />
                                    </button>
                                    <Controller
                                        name="image"
                                        control={control}
                                        render={({ field }) => (
                                            <div>
                                                <input
                                                    id={"openfile"}
                                                    style={{ display: "none" }}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        e.preventDefault();
                                                        const file = e.target.files[0];

                                                        field.onChange(file);

                                                        // Generate preview URL
                                                        if (file) {
                                                            setSelectedFile(file)
                                                            setPreview(URL.createObjectURL(file));
                                                        }
                                                    }}
                                                />
                                                <div className="d-flex justify-content-center">
                                                    {errors.image && (
                                                        <p className="validation-text pt-1">
                                                            {errors.image.message}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    />
                                </div>

                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="teamName" className="form-label">
                                                    Team Name
                                                </Label>
                                                <Controller
                                                    id="name"
                                                    name="name"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input
                                                            className="forminput"
                                                            type="text"
                                                            placeholder="Enter your team name"

                                                            {...field}
                                                        />
                                                    )}
                                                />
                                                {errors?.name && (
                                                    <p className="validation-text">{errors?.name?.message}</p>
                                                )}
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="teamName" className="form-label">
                                                    Team Level
                                                </Label>
                                                <Controller
                                                    id="team_level"
                                                    name="team_level"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input
                                                            className="forminput"
                                                            type="text"
                                                            placeholder="Beginner"

                                                            {...field}
                                                        />
                                                    )}
                                                />
                                                {errors?.team_level && (
                                                    <p className="validation-text">
                                                        {errors?.team_level?.message}
                                                    </p>
                                                )}
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup className="d-flex justify-content-around gap-2">
                                                <div>
                                                    <Label className="form-label">Wins</Label>
                                                    <Controller
                                                        name="win"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Input
                                                                className="forminput"
                                                                type="number"

                                                                placeholder='0'
                                                                {...field}
                                                            />
                                                        )}
                                                    />
                                                    {errors?.win && (
                                                        <p className="validation-text">
                                                            {errors?.win?.message}
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <Label className="form-label">Losses</Label>
                                                    <Controller
                                                        name="loss"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Input
                                                                className="forminput"
                                                                type="number"

                                                                placeholder='0'
                                                                {...field}
                                                            />
                                                        )}
                                                    />
                                                    {errors?.loss && (
                                                        <p className="validation-text">
                                                            {errors?.loss?.message}
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <Label className="form-label">Tie</Label>
                                                    <Controller
                                                        name="tie"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Input
                                                                className="forminput"
                                                                type="number"
                                                                placeholder='0'
                                                                {...field}
                                                            />
                                                        )}
                                                    />
                                                    {errors?.tie && (
                                                        <p className="validation-text">
                                                            {errors?.tie?.message}
                                                        </p>
                                                    )}
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="teamName" className="form-label">
                                                    Team Website URL ( Optional )
                                                </Label>
                                                <Controller
                                                    id="team_url"
                                                    name="team_url"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input
                                                            className="forminput"
                                                            type="text"
                                                            placeholder="Paste your team's external website link"

                                                            {...field}
                                                        />
                                                    )}
                                                />

                                            </FormGroup>
                                        </Col>

                                    </Row>

                                    <div className="containerbutton">
                                        
                                        <button type="submit"className="primary-btn px-4 py-3 mt-4" disabled={loading1} style={{ opacity: loading1 && "0.6" }}>
                                            Update Team
                                            {
                                                loading1 &&
                                                (<Loader show={true}
                                                    spinnerSize="16px"
                                                    radius="10"

                                                    color="red"
                                                />)
                                            }
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        </Col>
                    </Row>

                </div>
            </Modal>
        </>
    );
};

export default EditTeamDetails;
