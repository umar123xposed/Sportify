import React from 'react'
import "./index.css"
import forword from "./../../../assets/who-we-are-for.png";
import player1 from "./../../../assets/player1.png"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PlayerCard1({ title, picture, data, type, onClick1 }) {

  const userRole = useSelector(state => state?.authSlice?.role)

  const navigate = useNavigate();
  console.log(data, 'heheeh')
  return (
    <div
      style={{ cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center" }} className='col-md-2 col-sm-4 col-xs-6'
      
    >
      <div style={{ paddingTop: "20px" }} className="player-card1 text-center "
      onClick={() => {

        if (type !== "coach") {
           console.log(userRole,"click")
          if (data?.team_id) {
            navigate(`/coach/team-details?id=${data.id}`);
          } else if (userRole === "Recruiter") {
            navigate(`/recruiter/player?id=${data.user.id}`);
          } else if (userRole === "Athlete") {
            navigate(`/athlete/player-details?id=${data.user.id}`);
          } else if (userRole === "Coach" || userRole === "Assistant" || userRole === "Head") {
            navigate(`/player?id=${data?.player_profile_detail?.players_profile?.user?.id ?? data.id}`);
          }
        } else {

          onClick1()
        }
      }
      }
      >
        <img style={{ objectFit: "cover" }} src={picture ? picture : player1} />
        <div className="w-100 glass-card player-card1-action px-2 d-flex align-items-center justify-content-between">
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
