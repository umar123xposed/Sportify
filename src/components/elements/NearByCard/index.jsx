import React from 'react';
import { Card } from 'reactstrap';
import "./index.css";
import backap from "./../../../assets/forword.png";
import { Navigate, useNavigate } from 'react-router-dom';
const NearByCard = ({ image, title, price }) => {
  const navigate = useNavigate()
  return (
    <Card
      onClick={() => navigate("/product-details")}
      className="buy-store-card"
    >
      <img
        src={image}
        alt="store"
        style={{
          borderRadius: "10px",
          width: "180px",
          objectFit: "contain",
        }}
      />

      <div className="buy-store-content">
        <p className="buyHead">{title}</p>
        <div className="w-100 d-flex justify-content-between align-items-end">
          <span className="buyPrice mb-0 ">{price}</span>
          <img className="pe-2" src={backap} alt="backup" />
        </div>
      </div>
    </Card>
  );
}

export default NearByCard;
