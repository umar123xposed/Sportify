import React, { useEffect, useRef, useState } from 'react'
import "./index.css"
import { Col, Container, Row } from 'reactstrap';
import forword from "./../../assets/who-we-are-for.png";
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import profile from "./../../assets/profile.png";
import player from "./../../assets/player.png";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { CONTACT_FORM } from '../../graphql/mutation';
import { useMutation } from '@apollo/client';
import { ContactFormOnSubmit } from '../../graphql/api-callings';
import Loader from "react-spinner-loader"

export default function ContactForm() {
  const navigate = useNavigate()
  const [contactform, { loading, error, data }] =
    useMutation(CONTACT_FORM);

  const schema = yup.object().shape({
    full_name: yup.string()
      .matches(/^[A-Za-z\s]+$/, "Name must only contain letters")
      .min(4, "At least 4 characters required")
      .required("Name is required"),
    subject: yup
      .string()
      .min(4, "At least 4 Characters required")
      .required("Subject is required"),
    description: yup
      .string()
      .max(1000, "Description must be less than 1000 characters")
      .min(4, "At least 4 Characters required")
      .required("Description is required"),
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      schema
    ),

    mode: "onChange",
  });

  const OnSubmit = (data) => {

    console.log(data, "data");
    ContactFormOnSubmit(data, contactform, setValue);

  }

  const handReset = () => {
    setValue();
  }

  return (
    <div className="pt-5">
      <Container>
        <Row >
          <Col md={12}>
            <div onClick={() => navigate(-1)} className="d-flex back-btn mb-4">
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

          <Col md={12}>
            <h3
              style={{ fontSize: "36px" }}
              className="who-we-are-heading text-center mb-3"
            >
              Contact Form
            </h3>
          </Col>
        </Row>

        <Row>
          <Col md={3} />
          <Col md={6}>
            <div className="solid-card">
              <form onSubmit={handleSubmit(OnSubmit)}>
                <Row>
                  <Col md={6}>
                    <div className="basic-inputs input-card">
                      <div className="input-transparent-blur-fields">
                        <label> Name</label>
                        <div className="w-100">
                          <Controller
                            id="loginEmail"
                            name="full_name"
                            control={control}
                            render={({ field }) => (
                              <input
                                className="w-100 input-transparent-blur"
                                type="text"
                                alt="text"
                                placeholder='Name'
                                {...field}
                              />
                            )}
                          />
                          {errors?.full_name && (
                            <p className="validation-text">
                              {errors?.full_name?.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="basic-inputs input-card">
                      <div className="input-transparent-blur-fields">
                        <label> Subject </label>
                        <div className="w-100">
                          <Controller
                            id="subject"
                            name="subject"
                            control={control}
                            render={({ field }) => (
                              <input
                                className="w-100 input-transparent-blur"
                                type="text"
                                placeholder='Subject'
                                alt="text"
                                {...field}
                              />
                            )}
                          />

                          {errors?.subject && (
                            <p className="validation-text">
                              {errors?.subject?.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>



                <Row className="mt-2">
                  <Col md={12}>
                    <div className="basic-inputs input-card">
                      <div className="input-transparent-blur-fields">
                        <label>Message</label>
                        <div className="w-100">
                          <Controller
                            id="loginEmail"
                            name="description"
                            control={control}
                            render={({ field }) => (
                              <textarea
                                className="w-100 input-transparent-blur"
                                // style={{ height: "280px" }}
                                {...field}
                                placeholder='Enter your message here....'
                                rows={4} // Use "rows" instead of "row"
                              />
                            )}
                          />

                          {errors?.description && (
                            <p className="validation-text">
                              {errors?.description?.message}
                              {console.log(error)}
                              {console.log(errors?.description)}
                              {console.log(errors?.description?.message)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md={2} />
                  <Col md={8}>
                    <div className="w-100  mt-2">
                      
                      <button type="submit" className="w-100 primary-btn px-2 py-3 my-3 d-flex gap-3" disabled={loading} style={{ opacity: loading && "0.6" }}>
                        Submit
                        {
                          loading &&
                          (<Loader show={true}
                            spinnerSize="16px"
                            radius="10"

                            color="red"
                          />)
                        }
                      </button>
                    </div>
                  </Col>
                  <Col md={2} />
                </Row>

              </form>
            </div>
          </Col>
          <Col md={3} />
        </Row>
      </Container>
    </div>
  );
}