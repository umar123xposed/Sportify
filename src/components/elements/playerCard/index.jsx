import React from 'react'
import "./index.css"
import forword from "./../../../assets/who-we-are-for.png";
import player1 from "./../../../assets/player1.png"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PlayerCard({title, picture, data ,id , user_id  }) {

  const role = useSelector(state => state?.authSlice?.role)
  const navigate = useNavigate();
  console.log(role,'role')
  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={() => {
        (role === "Coach" || role === "Head" || role === "Assistant") ? navigate(`/coach/player?id=${user_id}` , {state : data}) :
        role === "Recruiter" ? navigate(`/recruiter/player?id=${user_id}` , {state : data}) : null
      }}
    >
      <div style={{ paddingTop: "20px" }} className="player-card1 text-center ">
        <img style={{ objectFit: "cover" }} src={picture ? picture : player1} />
        <div className="w-100 glass-card player-card-action px-2 d-flex align-items-center justify-content-between">
          <div className="text-start">
            <h3 style={{ marginTop: "10px" }}>
              {title ? `${title}` : "Player name"}{" "}
            </h3>
            {/* <label
              className="grdiant-text text-left p-0"
              style={{ fontSize: "13px", marginBottom: "-20px" }}
            >
              {id ? `${id}` : "-----"}
            </label> */}
          </div>

          <img
            style={{ width: "auto", height: "25px", margin: "0" }}
            src={forword}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
