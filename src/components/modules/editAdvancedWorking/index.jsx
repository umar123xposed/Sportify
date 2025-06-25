import "./index.css"
import { Col, Container, Modal, Row } from 'reactstrap';

import * as yup from "yup";

import {  useNavigate } from 'react-router-dom';
import React, {  useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller,  useForm } from "react-hook-form";
import { UpdateChildOnSubmit } from "../../../graphql/api-callings";
import { useMutation } from "@apollo/client";
import { UPDATE_CHILD_ACCOUNT } from "../../../graphql/mutation";
//import { handleCreateBasicProfile } from "../../redux/profileSlice";

export default function EditAdvancedWorkingModal ({ setShow, toggle, show, data , refetch   }) {
  const navigate = useNavigate();

  const [updateChildProfile, { loading: loading1, error, data:data1 }] =
      useMutation(UPDATE_CHILD_ACCOUNT);


 const schema = yup.object().shape({
    workout_traning: yup.object().shape({
      strength: yup
        .number()
        .typeError("Number Required")
        .positive("Invalid format")
        .integer("Invalid format")
        .required("Required"),
      recovery_speed: yup
        .number()
        .typeError("Number Required")
        .positive("Invalid format")
        .integer("Invalid format")
        .required("Required"),
      edurance: yup
        .number()
        .typeError("Number Required")
        .positive("Invalid format")
        .integer("Invalid format")
        .required("Required"),
    }),
  });


 const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
     });



   useEffect(() => {
           if (data) {
         console.log(data,'asfsaf')
        setValue("workout_traning", data?.profile_detail?.workout_traning);

           }
         }, [data]);




   const submit = (data2) => {
    console.log(data,'what hehehe')
    const payload = {
         profile_detail: {
           advanced: {
             ...data2,
           },
         },
         profile_type: "Advanced",
         id: data?.user?.id,
       };

    console.log(payload, "payload");
       UpdateChildOnSubmit(payload, updateChildProfile, setShow, refetch);


   }


  return (
    <>
      <Modal size="xl" centered isOpen={show}>
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
          <form onSubmit={handleSubmit(submit)}>
            <Container>

              <div className=" mx-5 ps-2 pb-3">
                <h3 style={{ color: "#fff" }}>Performance Metrics</h3>
              </div>

              <Row className="mt-4  grad-border p-5 mx-5">
                <div className="d-flex pb-3 justify-content-center">
                  Workout and Training Logs
                </div>
                <Col md={6}>
                  <div className="basic-inputs input-card">
                    <div className="input-transparent-blur-fields">
                      <label> Strength</label>
                      <div className="w-100">
                        <Controller
                          control={control}
                          name="workout_traning.strength"
                          render={({ field }) => (
                            <div className="relative">
                              <input
                                {...field}
                                className="w-100 input-transparent-blur "
                                type="text"
                                placeholder="Strength"
                              />
                            </div>
                          )}
                        />
                        {errors?.workout_traning?.strength && (
                          <p className="validation-text">
                            {errors?.workout_traning?.strength.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="basic-inputs input-card">
                    <div className="input-transparent-blur-fields">
                      <label>Recovery Speed </label>
                      <div className="w-100">
                        <Controller
                          control={control}
                          name="workout_traning.recovery_speed"
                          render={({ field }) => (
                            <div className="relative">
                              <input
                                {...field}
                                className="w-100 input-transparent-blur "
                                type="text"
                                placeholder="Recovery Speed"
                              />
                            </div>
                          )}
                        />
                        {errors?.workout_traning?.recovery_speed && (
                          <p className="validation-text">
                            {errors?.workout_traning?.recovery_speed?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="basic-inputs input-card">
                    <div className="input-transparent-blur-fields">
                      <label>Endurance</label>
                      <div className="w-100">
                        <Controller
                          control={control}
                          name="workout_traning.edurance"
                          render={({ field }) => (
                            <div className="relative">
                              <input
                                {...field}
                                className="w-100 input-transparent-blur "
                                type="text"
                                placeholder="Recovery Speed"
                              />
                            </div>
                          )}
                        />
                        {errors?.workout_traning?.edurance && (
                          <p className="validation-text">
                            {errors?.workout_traning?.edurance?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md={4} />

                <Col md={4}>
                  <button
                    type="submit"
                    className="w-100 primary-btn px-2 py-3 my-3"
                  >
                    <h3> Update </h3>
                  </button>
                </Col>

                <Col md={4} />
              </Row>
            </Container>
          </form>
        </div>
      </Modal>
    </>
  );
}
