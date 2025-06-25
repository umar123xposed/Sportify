import React from 'react'
import { Col, Row } from 'reactstrap';
import team  from "./../../../assets/team.png"
import  "./index.css"
import { useNavigate } from 'react-router-dom';

export default function TeamPlayerCard({id , title , picture , data}) {
  console.log(data ,'asfasfafsafsasf')
  const navigate = useNavigate()
  return (
    <div

      className="glass-card teamCard py-2 px-2 d-flex align-items-center justify-content-between"
    >
      <div className="d-flex  align-items-center justify-content-between">
        <img
          style={{
            objectFit: "cover",
            height: "80px",
            width: "80px",
            borderRadius: "50%",
          }}
          src={picture}
          className="me-2"
          alt=""
        />
        <div>
          <p style={{ fontSize: "14px" }}> {title} </p>
          <p style={{ fontSize: "14px" }}>ID : {id} </p>
        </div>
      </div>
      <div
     onClick={() => navigate("/player-details", { state: data })}

        className="view-details"
      >
        <p>View Details {">"} </p>
      </div>
    </div>
  );
}
