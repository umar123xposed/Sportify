import React, { useState } from "react";
import "./index.css";
import logo from "./../../../assets/logo.svg";
import google from "./../../../assets/google.png";
import facebook from "./../../../assets/facebook.png";
import apple from "./../../../assets/apple.png";
import football from "./../../../assets/menwithFootball.mp4"
import storm from "./../../../assets/storm.mp4";
import background from "./../../../assets/background.png";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import AppleSignin from "react-apple-signin-auth";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../../graphql/mutation";
import { loginOnSubmit } from "../../../graphql/api-callings";
import { handleLogin } from "../../../redux/authSlice";
import { useDispatch } from "react-redux";




export default function SignUpSocial() {

const [ login , { loading: loading1, error, data }] = useMutation(LOGIN);
const [ loginType , setLoginType ] = useState("social")

const navigate = useNavigate()
const dispatch = useDispatch()
const [Loader , setLoader ] = useState( false )


  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // const fcm = await requestFCMToken();

      console.log(tokenResponse,'WHAT IS THIS');

      const payload = {
        access_key: tokenResponse.code,
        access_type: "Web",
        account_type: "Google",
        email: data?.email,
        fcm_token: localStorage.getItem("fcm") || null,
        password: null,
      };


      setLoader(true);

      try {


          loginOnSubmit( payload, login, dispatch, handleLogin, navigate );

        // const { data } = await createUser({
        //   variables: new_data,
        //   fetchPolicy: "no-cache", // Ensure a fresh request every time
        // });


      } catch (e) {
        //        setUserMsg(e?.networkError?.result?.errors[0]?.message);

        setLoader(false);
      }
      // setTimeout(() => {

      //   setUserMsg();

      // }, 5000);
    },
    flow: "auth-code",
  });

  const handleAppleResponse = async (responseCome) => {
    console.log(responseCome,'whatsfsafas')
        const payload = {
          access_key: responseCome?.authorization?.id_token,
          access_type: "Web",
          account_type: "Apple",
          email: data?.email,
          fcm_token: localStorage.getItem("fcm") || null,
          password: null,
        };


      setLoader(true);


          loginOnSubmit( payload, login, dispatch, handleLogin, navigate );





  }

return (
  <div className=" d-flex  align-items-center h-100 justify-content-center">
    <div className="right-feild text-center">
      <div>
        <img
          className="main-logo-white "
          src={logo}
          alt="logo"
          loading="lazy"
        />

        <AppleSignin
          authOptions={{
            clientId: import.meta.env.VITE_APPLE_CLIENT_SECRET, // Your Service ID
            redirectURI: "https://sportmeid.com/auth/social", // Callback URL
            scope: "email name", // Request user information
            responseMode: "form_post", // or 'query'
            responseType: "code", // Get access code for server-side verification
            usePopup: true, // Default is false
          }}
          onSuccess={handleAppleResponse} // Handle the successful response
          onError={(error) => console.error("Apple Sign In error:", error)} // Handle error
          render={(props) => (
            <div
              {...props}
              // onClick={() => navigate("/who-we-are")}
              className="socail-btn px-2 py-3 my-3"
            >
              <img src={apple} height={10}/>
              <h3>Continue with Apple</h3>
            </div>
          )}
        />
        <div onClick={googleLogin} className="socail-btn px-2 py-3 my-3">
          <img src={google} />
          <h3>Continue with Google</h3>
        </div>

        <div
          onClick={() => navigate("/who-we-are")}
          className="primary-btn px-2 py-4 my-3"
        >
          <h3>Continue with Email</h3>
        </div>
      </div>
      <h3 className="already-text">Already have an account?</h3>
      <h3
        onClick={() => navigate("/auth/login")}
        className="grdiant-text login-text my-3"
      >
        LOG IN HERE
      </h3>

      <h4 className="terms-service-text  ">
        By using this app, you agree to SportMeID's
        <span className="grdiant-text"> Terms of Service</span> and{" "}
        <span className="grdiant-text"> Privacy Statement.</span>
      </h4>
    </div>
  </div>
);
}
