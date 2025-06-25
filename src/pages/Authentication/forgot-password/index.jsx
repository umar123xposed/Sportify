
import OtpInput from 'react-otp-input';
import React, { useState } from "react";
import "./index.css";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { REQUEST_PASSWORD, VERIFY_REQUEST, RESET_PASSWORD } from "../../../graphql/mutation";
import { forgotPasswordSchema, otpSchema, newPasswordSchema } from "../../../validation";
import { Spinner } from "reactstrap";
import Loader from "react-spinner-loader"
import toast from 'react-hot-toast';


export default function ForgotPassword() {
  const [otpValue, setOtpValue] = useState('');

  const [requestPasswordMutation, { loading: requestPasswordLoading }] = useMutation(REQUEST_PASSWORD);
  const [verifyRequestMutation, { loading: verifyRequestLoading }] = useMutation(VERIFY_REQUEST);
  const [resetPasswordMutation, { loading: resetPasswordLoading }] = useMutation(RESET_PASSWORD);

  const [password, setPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Start at step 1 for forgot password flow
  const [forgotUsername, setForgotUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const togglePassword = () => setPassword(!password);

  const { // For forgot password - username
    control: forgotControl,
    setError: setForgotError,
    handleSubmit: handleForgotSubmit,
    reset: resetForgotForm,
    formState: { errors: forgotErrors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const { // For OTP
    control: otpControl,
    setError: setOtpError,
    handleSubmit: handleOtpSubmit,
    reset: resetOtpForm,
    formState: { errors: otpErrors },
  } = useForm({
    resolver: yupResolver(otpSchema),
  });

  const { // For new password
    control: newPasswordControl,
    setError: setNewPasswordError,
    handleSubmit: handleNewPasswordSubmit,
    reset: resetNewPasswordForm,
    formState: { errors: newPasswordErrors },
  } = useForm({
    resolver: yupResolver(newPasswordSchema),
  });

  const handleSendOtp = async (data) => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const response = await requestPasswordMutation({
        variables: {
          input: {
            user_name: data.username,
          },
        },
      });
      console.log("Request Password Response:", response);
      if (response.data.requestPassowrd.statusCode === 200) {
        setForgotUsername(data.username);
        setCurrentStep(2); // Move to OTP step
        resetForgotForm();
        setSuccessMessage(response.data.requestPassowrd.message);
      } else {
        setErrorMessage(response.data.requestPassowrd.message);
      }
    } catch (err) {
      console.error("Error requesting password:", err);
      setErrorMessage("Failed to request password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (data) => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const response = await verifyRequestMutation({
        variables: {
          input: {
            otp: parseInt(data.otp),
            user_name: forgotUsername,
          },
        },
      });
      console.log("Verify OTP Response:", response);
      if (response.data.requestVerify.statusCode === 200) {
        setCurrentStep(3); // Move to new password step
        resetOtpForm();
        setSuccessMessage(response.data.requestVerify.message);
      } else {
        setOtpError("otp", { type: "manual", message: response.data.requestVerify.message });
        setErrorMessage(response.data.requestVerify.message);
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      setErrorMessage("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (data) => {
    console.log(data)
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const response = await resetPasswordMutation({
        variables: {
          input: {
            password: data.confirm_password,
            user_name: forgotUsername,
          },
        },
      });
      console.log("Reset Password Response:", response);
      toast.success(response.data.resestPassword?.message)
      if (response.data.resestPassword.statusCode === 200) {
        // setSuccessMessage(response.data.resestPassword.message);
        setTimeout(() => {
          navigate("/auth/login");
        }, 2000); // Give user time to read success message before redirecting
      } else {
        // setErrorMessage(response.data.resestPassword.message);
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      // setErrorMessage("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" d-flex  align-items-center h-100 justify-content-center">
      <div className="right-feild text-center">
        <h2 className="login-main-heading">Forgot Password</h2>
        <p className="login-Description py-2">
          Please follow the steps to reset your password.
        </p>


        {currentStep === 1 && (
          <form onSubmit={handleForgotSubmit(handleSendOtp)}>
            <div className="glass-card">
              <div className="field-seperator">
                <Controller
                  id="forgotUsername"
                  name="username"
                  control={forgotControl}
                  render={({ field }) => (
                    <input
                      className="transparent-input-field py-3"
                      type="text"
                      placeholder="Enter your username"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, "");
                        field.onChange(value);
                      }}
                    />
                  )}
                />

              </div>
              {forgotErrors?.username && (
                <p className="validation-text">{forgotErrors?.username?.message}</p>
              )}
            </div>

            <button className="w-100 primary-btn px-2 py-3 my-3 d-flex gap-3" disabled={loading || requestPasswordLoading} style={{ opacity: (loading || requestPasswordLoading) && "0.6" }}>
              Next
              {
                loading || requestPasswordLoading &&
                (<Loader show={true}
                  spinnerSize="16px"
                  radius="10"

                  color="red"
                />)
              }
            </button>
            <button
              type="button"
              onClick={() => navigate("/auth/login")}
              className="w-100 glass-btn border-0 px-2 py-2 my-3"
            >
              <h3> Back to Login </h3>
            </button>
          </form>
        )}

        {currentStep === 2 && (
          <form onSubmit={handleOtpSubmit(handleVerifyOtp)}>
            <div>
              <div className="field-seperator glass-card d-flex justify-content-center">
                <Controller
                  name="otp"
                  control={otpControl}
                  defaultValue=""
                  className="justify-content-center"
                  render={({ field }) => (
                    <OtpInput
                      value={field.value}
                      onChange={(otp) => {
                        field.onChange(otp);
                        setOtpValue(otp);
                      }}
                      inputType='tel'
                      numInputs={4}
                      inputStyle="otp"
                      renderSeparator={<span className="text-white"> - </span>}
                      renderInput={(props) => <input {...props} />}
                    />
                  )}
                />
                {otpErrors?.otp && (
                  <p className="validation-text">{otpErrors?.otp?.message}</p>
                )}
              </div>
            </div>


            <button className="w-100 primary-btn px-2 py-3 my-3 d-flex gap-3" disabled={loading || verifyRequestLoading} style={{ opacity: (loading || verifyRequestLoading) && "0.6" }}>
              Verify OTP
              {
                loading || verifyRequestLoading &&
                (<Loader show={true}
                  spinnerSize="16px"
                  radius="10"

                  color="red"
                />)
              }
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="w-100 glass-btn border-0 px-2 py-2 my-3"
            >
              <h3> Back </h3>
            </button>
          </form>
        )}




        {currentStep === 3 && (
  <form onSubmit={handleNewPasswordSubmit(handlePasswordReset)}>
    <div className="glass-card">
      <div className="field-seperator position-relative">
        <Controller
          name="new_password"
          control={newPasswordControl}
          render={({ field }) => (
            <div className="position-relative">
              <input
                className="transparent-input-field py-3"
                type={password ? "text" : "password"}
                placeholder="New Password"
                {...field}
              />
              <span
                className="password-toggle-icon"
                onClick={togglePassword}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {password ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>
          )}
        />
        {newPasswordErrors?.new_password && (
          <p className="validation-text">{newPasswordErrors.new_password.message}</p>
        )}
      </div>

      <div className="field-seperator position-relative">
        <Controller
          name="confirm_password"
          control={newPasswordControl}
          render={({ field }) => (
            <input
              className="transparent-input-field py-3"
              type={password ? "text" : "password"}
              placeholder="Confirm New Password"
              {...field}
            />
          )}
        />
        {newPasswordErrors?.confirm_password && (
          <p className="validation-text">{newPasswordErrors.confirm_password.message}</p>
        )}
      </div>
    </div>

    <button
      disabled={loading || resetPasswordLoading}
      type="submit"
      className="w-100 primary-btn px-2 py-3 my-3 d-flex gap-3 justify-content-center align-items-center"
      style={{ opacity: (loading || resetPasswordLoading) && "0.6" }}
    >
      Reset Password
      {(loading || resetPasswordLoading) && (
        <Spinner size={20} color="black" />
      )}
    </button>

    <button
      type="button"
      onClick={() => setCurrentStep(2)}
      className="w-100 glass-btn px-2 py-2 border-0 my-3"
    >
      <h3>Back</h3>
    </button>
  </form>
)}


      </div>
    </div>
  );
}