import React, { useState } from 'react'
import { Col, Row } from 'reactstrap';
import team  from "./../../../assets/team.png"
import  "./index.css"
import { useLocation, useNavigate } from 'react-router-dom';
import product from "./../../../assets/product1.png";
import { useDispatch } from 'react-redux';
import { handleAddQuantity } from '../../../redux/profileSlice';

export default function MerchandiseCard({ packageData , id }) {
  const navigate = useNavigate();

  console.log(packageData,'what ais af')

  const location = useLocation()
    const {state} = location;
  const dispatch = useDispatch()

  console.log(state,"what is stat")
const downloadBase64Image = (
  base64String,
  fileName = "image.png",
  mimeType = "image/png"
) => {
  // Check if base64String already contains a data URL prefix.
  const dataUrl = base64String.startsWith("data:")
    ? base64String
    : `data:${mimeType};base64,${base64String}`;

  // Create an anchor element
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = fileName;

  // Append the link to the document, trigger click, then remove it
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  return (
    <div className="merchandise-card solid-card mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4 ">
        <h3>{packageData?.name}</h3>
        <div className="d-flex align-items-center">
          <div
            className="solid-btn-circle d-flex justify-content-center align-items-center"
            onClick={handleDecrement}
            style={{ cursor: "pointer" }}
          >
            -
          </div>
          <input
            //disabled={true}
            className="ps-3 quantity-count"
            type="text"
            value={quantity}
            onChange={handleChange}
          />
          <div
            className="solid-btn-circle d-flex justify-content-center align-items-center"
            onClick={handleIncrement}
            style={{ cursor: "pointer" }}
          >
            +
          </div>
        </div>{" "}
        <h2>$ {packageData?.price}</h2>
      </div>

      <Row>
        {packageData?.items?.map((itemTeam) => {
          return (
            <>
              <Col md={3}>
                <div className="product-img">
                  <img
                    src={`${import.meta.env.VITE_BASE_URL_IMAGE}${
                      itemTeam?.image
                    }`}
                    alt="product1"
                  />
                  <p className="mt-3">{itemTeam?.name}</p>
                </div>
              </Col>
            </>
          );
        })}
      </Row>

      <Row>
        <Col md={4} />
        <Col md={4}>
          <button
            onClick={(e) =>
      {
              e.stopPropagation()
              dispatch(handleAddQuantity(quantity));

              navigate("/checkout", {
                state: {
                  quantity: quantity,
                  package: packageData,
                },
              })
            }
            }
            className="w-100  primary-btn px-2 py-3 my-3 "
          >
            <h3
              style={{ fontWeight: "300", fontSize: "16px" }}
              onClick={(e) => {
                //  navigate("/checkout")

            }}
            >
              Select Package
            </h3>
          </button>
        </Col>
        <Col md={4} />
      </Row>
    </div>
  );
}
