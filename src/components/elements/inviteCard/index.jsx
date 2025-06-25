import React from 'react'
import { Col, Row } from 'reactstrap';
import team  from "./../../../assets/team.png"
import  "./index.css"
import { useNavigate } from 'react-router-dom';


export default function InviteCard(props) {

 const navigate = useNavigate()

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
       props?.status == "Approved" &&  navigate(`/parent?id=${props?.id1}`)}}
      className="glass-card InviteCard py-2 px-2 d-flex align-items-center justify-content-between"
    >
      <div className="d-flex  align-items-center flex-start ">
        <img
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            height: "90px",
            width: "90px",
          }}
          src={props?.image || team}
          className="me-2"
          alt=""
        />
        <div>
          <p className='mb-1'>Name: {props?.title} </p>
          <p className='mb-1'>ID: {props?.id} </p>
          {props?.status == "Approved" ? (
            <div
              style={{ backgroundColor: "#00BF00" }}
              className="invite-status mt-1"
            >
              <label>Accepted</label>
            </div>
          ) : props?.status == "Pending" ? (
            <div
              style={{ backgroundColor: "gray" }}
              className="invite-status mt-1"
            >
              <label>Pending</label>
            </div>
          ) : (
            <div className="mt-1">
              <div
                onClick={(e) =>  {
                  e.stopPropagation()
                  props?.handleSend(props?.sendid)}}
                className="view-details"
              >
                <p>Send Invite </p>
              </div>
            </div>
          )}

          
        </div>
        
      </div>
      
    </div>
  );
}
