import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { REQUEST_USERNAME } from "../../../graphql/mutation";
import { Spinner } from "reactstrap";
import * as yup from "yup";
import Loader from "react-spinner-loader"
import toast from "react-hot-toast";

// Email validation schema
const emailSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email format."
    )
    .required("Please enter a email!"),
});

export default function ForgotUsername() {
  const [requestUsernameMutation, { loading: requestUsernameLoading }] = useMutation(REQUEST_USERNAME);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(emailSchema),
  });

  const handleRequestUsername = async (data) => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const response = await requestUsernameMutation({
        variables: {
          input: {
            email: data.email,
          },
        },
      });
      console.log("Request Username Response:", response);

      // Check if response exists and has the expected structure
      if (response?.data?.requestUserName) {
        const { statusCode, message } = response.data.requestUserName;

        if (statusCode === 200) {

          toast.success(response?.data?.requestUserName?.message)
          // setSuccessMessage(message || "Username has been sent to your email.");
          setTimeout(() => {
            navigate("/auth/login");
          }, 2000);
        } else {
          // setErrorMessage(message || "Failed to request username. Please try again.");
        }
      } else {
        // setErrorMessage("Invalid response from server. Please try again.");
      }
    } catch (err) {
      console.error("Error requesting username:", err);
      // setErrorMessage(err.message || "Failed to request username. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center h-100 justify-content-center text-white">
      <div className="right-feild text-center">
        <h2 className="login-main-heading">Forgot Username</h2>
        <p className="login-Description py-2">
          Enter your email address to receive your username.
        </p>

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(handleRequestUsername)}>
          <div className="glass-card">
            <div className="field-seperator">
              <Controller
                id="emailField"
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    className="transparent-input-field py-3"
                    type="text"
                    placeholder="Enter your email address"
                    {...field}
                  />
                )}
              />

            </div>
            {errors?.email && (
              <p className="validation-text">{errors?.email?.message}</p>
            )}
          </div>


          <button type="submit" className="w-100 primary-btn px-2 py-3 my-3 d-flex gap-3" disabled={loading || requestUsernameLoading} style={{ opacity: (loading || requestUsernameLoading) && "0.6" }}>
            Send Username
            {
              (loading || requestUsernameLoading) &&
              (<Loader show={true}
                spinnerSize="16px"
                radius="10"

                color="red"
              />)
            }
          </button>
          <button
            type="submit"
            onClick={() => navigate("/auth/login")}
            className="w-100 glass-btn px-2 py-2 my-3 border-0"
          >
            <h3> Back to Login </h3>
          </button>
        </form>
      </div>
    </div>
  );
}