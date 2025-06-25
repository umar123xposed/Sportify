import React, { useState } from "react";
import "./index.css";

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { sigupSchema } from "./../.././../validation/index.js";
import { useMutation } from "@apollo/client";
import { SignUpOnSubmit } from "../../../graphql/api-callings/index.js";
import { useDispatch } from "react-redux";
import { SIGNUP } from "../../../graphql/mutation/index.js";
import { handleLogin } from "../../../redux/authSlice.js";
import { Spinner } from "reactstrap";
import { useLazyQuery } from "@apollo/client";
import { CHECK_USERNAME } from "../../../graphql/query/query.js";
import Loader from "react-spinner-loader"


export default function Signup() {

  const [checkUsername, { data: usernameData, loading: usernameLoading }] = useLazyQuery(CHECK_USERNAME);

  const [signup, { loading: loading1, error, data }] = useMutation(SIGNUP);
  const [loginType, setLoginType] = useState("social")
  const [password, setPassword] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const togglePassword = () => setPassword(!password)
  const toggleConfirm = () => setConfirm(!confirm);

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(sigupSchema),
  });

  const onSubmit = (data) => {

    console.log(data, 'data')
    const payload = {
      user_name: data?.username,
      email: data?.email,
      fcm_token: localStorage.getItem("fcm") || null,
      password: data?.password,
      terms_accepted: true
    };


    SignUpOnSubmit(payload, signup, dispatch, handleLogin, navigate);


  }

  return (
    <div className=" d-flex  align-items-center h-100 justify-content-center">
      <div className="right-feild text-center">
        {/* <div
        onClick={() => navigate("/auth/social")}
        className="d-flex back-btn mb-5"
      >
        <svg
          className="me-2"
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
      </div> */}
        <h2 className="login-main-heading">SPORTIFY</h2>

        <p className="login-Description py-2">
          Connecting Athletes, Coaches, and Recruiters for Seamless Talent Discovery.
          For more about, please <span  style={{color: "rgb(194, 165, 1)", textDecoration: "underline", cursor: "pointer"}} onClick={() => navigate("/about")}>visit</span>.
        </p>
        <div className="swttabs d-flex justify-content-center">
          <div
            onClick={() => navigate("/auth/login")}
            style={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
            className="glass-btn  px-2 py-2 my-3 me-2"
          >
            <h3>Log In </h3>
          </div>
          <div
            onClick={() => navigate("/auth/sign-up")}
            style={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
            className="primary-btn px-2 py-2 my-3 ms-2"
          >
            <h3>Sign Up </h3>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="glass-card">
            <div className="field-seperator">
              <Controller
                id="loginEmail"
                name="username"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      className="transparent-input-field py-3"
                      type="text"
                      placeholder="Unique username (for identification)"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, "");
                        field.onChange(value);

                        // Call checkUsername when input length is >= 5
                        if (value.length >= 5) {
                          // checkUsername({ variables: { input:{
                          //   user_name: value
                          // } } });
                          setTimeout(() => {
                            checkUsername({
                              variables: {
                                input: {
                                  user_name: value
                                }
                              }
                            })
                          }, 1400)
                        }
                      }}
                    />
                    {usernameLoading && <p className="text-secondary" style={{
                      fontSize: "12px",
                      textAlign: "left"
                    }}>Checking...</p>}
                    {usernameData?.checkUsername?.statusCode === 200 && (
                      <p className="text-success" style={{
                        fontSize: "12px",
                        textAlign: "left"
                      }}>{usernameData.checkUsername.message}</p>
                    )}
                    {usernameData?.checkUsername?.statusCode === 400 && (
                      <p className="validation-text">{usernameData.checkUsername.message}</p>
                    )}
                  </>
                )}
              />

              {errors?.username && (
                <p className="validation-text">{errors?.username?.message}</p>
              )}
            </div>
            <div className="field-seperator">
              <Controller
                id="loginEmail"
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    className="transparent-input-field py-3"
                    type="text"
                    placeholder="Email"
                    {...field}
                  />
                )}
              />
              {errors?.email && (
                <p className="validation-text">{errors?.email?.message}</p>
              )}
            </div>

            <div className="field-seperator ">
              <div style={{ position: "relative" }} className="relative">
                <Controller
                  id="loginEmail"
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input
                      className="transparent-input-field py-3"
                      type={password ? "text" : "password"}
                      placeholder="Password"
                      {...field}
                    />
                  )}
                />
                {errors?.password && (
                  <p className="validation-text ">{errors?.password?.message}</p>
                )}

                {password ? (
                  <FaRegEye
                    onClick={togglePassword}
                    style={{
                      cursor: "poniter",
                      position: "absolute",
                      right: "0",
                      top: "18px",
                    }}
                    className="password-eye"
                    size={20}
                    color="white"
                  />
                ) : (
                  <FaRegEyeSlash
                    onClick={togglePassword}
                    style={{
                      cursor: "poniter",
                      position: "absolute",
                      right: "0",
                      top: "18px",
                    }}
                    className="password-eye"
                    size={20}
                    color="white"
                  />
                )}
              </div>
            </div>

            <div style={{ position: "relative" }} className="relative">
              <Controller
                id="loginEmail"
                name="confirm"
                control={control}
                render={({ field }) => (
                  <input
                    className="transparent-input-field py-3"
                    type={confirm ? "text" : "password"}
                    placeholder="Confirm Password"
                    {...field}
                  />
                )}
              />

              {errors?.confirm && (
                <p className="validation-text ">{errors?.confirm?.message}</p>
              )}

              {confirm ? (
                <FaRegEye
                  onClick={toggleConfirm}
                  style={{
                    cursor: "poniter",
                    position: "absolute",
                    right: "0",
                    top: "18px",
                  }}
                  className="password-eye"
                  size={20}
                  color="white"
                />
              ) : (
                <FaRegEyeSlash
                  onClick={toggleConfirm}
                  style={{
                    cursor: "poniter",
                    position: "absolute",
                    right: "0",
                    top: "18px",
                  }}
                  className="password-eye"
                  size={20}
                  color="white"
                />
              )}
            </div>
          </div>
          <button type="submit" className="w-100 primary-btn px-2 py-3 my-3 d-flex gap-3" disabled={loading1} style={{ opacity: loading1 && "0.6" }}>
            Sign Up with Email
            {
              loading1 &&
              (<Loader show={true}
                spinnerSize="16px"
                radius="10"

                color="red"
              />)
            }
          </button>

          {/* <button type="submit" className="w-100 primary-btn px-2 py-3 my-3">
            <h3></h3>
            {loading1 && <Spinner size={20} color="black" />}
          </button> */}
        </form>

        <h3 className="already-text">Already have an account?</h3>
        <h3
          onClick={() => navigate("/auth/login")}
          className="grdiant-text login-text my-3"
        >
          LOG IN HERE
        </h3>

      </div>
    </div>
  );
}
