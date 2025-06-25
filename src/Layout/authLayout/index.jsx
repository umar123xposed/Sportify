import React, { useState } from "react";
import "./index.css";
import logo from "./../../assets/sigupLogo.png";
import google from "./../../assets/google.png";
import facebook from "./../../assets/facebook.png";
import apple from "./../../assets/apple.png";
import football from "./../../assets/menwithFootball.mp4";
import storm from "./../../assets/storm.mp4";
import background from "./../../assets/background.png";
import { Outlet } from "react-router-dom";



export default function AuthLayout() {

const [ loginType , setLoginType ] = useState("social")

return (
    <div className="login_container">
      <div className="login_left_fields h-100 w-100 d-lg-block d-none">
        <video
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
          loop
          autoPlay
          muted
        >
          <source src={football} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div
          className="left-text-blur"
          style={{
            backgroundSize: "cover",
            width: "100%",
            height: "300px",
            padding: "20px 0 0 0px",
            marginTop: "100px",
            position: "absolute",
            bottom: "230px",
            left: "0",
            zIndex: "9999",
            color: "var(--text-white)",
            display: "flex",
            alignItems: "end",
          }}
        >
          <div className="ps-5">
            <h2 className="logo-text">SPORTIFY</h2>
            <p className="logo-description">
              Connecting Athletes, Coaches, and Recruiters for Seamless Talent
              Discovery.
            </p>
          </div>
        </div>

        <video
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            height: "285px",
            zIndex: "999",
            width: "100%",
            objectFit: "cover",
          }}
          loop
          autoPlay
          muted
        >
          <source src={storm} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="login_right_fields w-100 h-100 ">

        <Outlet />
      </div>
    </div>
  );
}
