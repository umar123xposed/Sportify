import "./index.css"
import { Col, Container, Modal, Row } from 'reactstrap';

import * as yup from "yup";

import {  useNavigate } from 'react-router-dom';
import React, {  useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
//import { handleCreateBasicProfile } from "../../redux/profileSlice";

export default function AdvanceImage({ setShow, show, data, setImage ,fr }) {
  const navigate = useNavigate();
  console.log(fr, "whashfahsf")
  return (
    <>
      <Modal size="md" backdrop={true} centered isOpen={show}>
        <div className="d-flex justify-content-end mb-3">
          <svg
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              setShow(false);
              setImage(null);
            }}
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

        {fr && <img src={fr} />}

        {data && <img src={`${import.meta.env.VITE_BASE_URL_IMAGE}${data}`} />}

        {fr || data ? (
          <></>
        ) : (
          <>
            <div className="d-flex justify-content-center my-5">
              <h3 style={{ color: "#fff" }}>No Image</h3>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
