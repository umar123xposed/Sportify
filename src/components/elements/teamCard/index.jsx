import React from 'react'
import { Col, Row } from 'reactstrap';
import team  from "./../../../assets/team.png"
import forword from "./../../../assets/who-we-are-for.png";

import  "./index.css"
import { createSearchParams, useNavigate } from 'react-router-dom';

export default function TeamCard({title , picture , data}) {
  console.log(data ,'asfasfafsafsasf')
  const navigate = useNavigate()
  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={() => navigate("/team-details" , {state : data})}
    >
      <div style={{ paddingTop: "15px" }} className="team-cards text-center ">
        <img style={{ objectFit: "cover", marginBottom:"15px" }} src={picture ? picture : team} />
        <div className="w-100 team-card-action px-2 d-flex align-items-center justify-content-between">
          <div className="text-start">
            <h3 >
              {title ? `${title}` : "Player name"}{" "}
            </h3>
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
