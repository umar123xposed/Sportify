import React, { useState } from "react";
import "./index.css";
import logo from "./../../../assets/sigupLogo.png";
import google from "./../../../assets/google.png";
import facebook from "./../../../assets/facebook.png";
import apple from "./../../../assets/apple.png";
import football from "./../../../assets/menwithFootball.mp4"
import storm from "./../../../assets/storm.mp4";
import background from "./../../../assets/background.png";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { loginOnSubmit } from "../../../graphql/api-callings";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../../graphql/mutation";
import { handleLogin } from "../../../redux/authSlice";
import { loginSchema } from "../../../validation";
import { useDispatch } from "react-redux";
import { Spinner } from "reactstrap";
import Loader from "react-spinner-loader"


export default function Login() {
  const [login, { loading: loading1, error, data }] = useMutation(LOGIN);
  const [loginType, setLoginType] = useState("social")
  const [password, setPassword] = useState(false);
  const navigate = useNavigate()


  const togglePassword = () => setPassword(!password)
  const dispatch = useDispatch()

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });


  const onSubmit = (data) => {

    console.log(data, 'data')
    const payload = {
      // access_key: null,
      access_type: "Web",
      account_type: "Email",
      // email: data?.email,
      user_name: data?.username,
      fcm_token: localStorage.getItem("fcm") || null,
      password: data?.password,
    };

    loginOnSubmit(payload, login, dispatch, handleLogin, navigate);

  }
  return (
    <div className=" d-flex  align-items-center h-100 justify-content-center">
      <div className="right-feild text-center">
        {/* <div
          onClick={() => navigate("/auth/social")}
          className="d-flex back-btn mb-5"
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
        </div> */}
        <h2 className="login-main-heading">SPORTIFY</h2>
        <p className="login-Description py-2">
          Connecting Athletes, Coaches, and Recruiters for Seamless Talent
          Discovery.
        </p>
        <div className="swttabs d-flex justify-content-center">
          <div
            onClick={() => navigate("/auth/login")}
            style={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
            className="primary-btn px-2 py-2 my-3 me-2"
          >
            <h3>Log In </h3>
          </div>
          <div
            onClick={() => navigate("/auth/sign-up")}
            style={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
            className="glass-btn px-2 py-2 my-3 ms-2"
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
                  <input
                    className="transparent-input-field py-3"
                    type="text"
                    placeholder="Unique username (for identification)"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\s/g, ""); // remove all spaces
                      field.onChange(value);
                    }}
                  />
                )}
              />

              {errors?.username && (
                <p className="validation-text">{errors?.username?.message}</p>
              )}
            </div>

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
          <button type="submit" className="w-100 primary-btn px-2 py-3 my-3 d-flex gap-3" disabled={loading1} style={{ opacity: loading1 && "0.6" }}>
            Login
            {
              loading1 &&
              (<Loader show={true}
                spinnerSize="16px"
                radius="10"

                color="red"
              />)
            }
          </button>

          <div class="d-flex justify-content-center"><p onClick={() => navigate("/auth/forgot-username")} className="forgot-password-link">Forgot username?</p>
            <p onClick={() => navigate("/auth/forgot-password")} className="forgot-password-link">Forgot password?</p></div>

        </form>
        <h3 className="already-text">Don't have an account?</h3>
        <h3
          onClick={() => navigate("/auth/sign-up")}
          className="grdiant-text login-text my-3"
        >
          SIGN UP HERE
        </h3>
      </div>
    </div>
  );
}
