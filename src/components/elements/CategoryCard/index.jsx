import React from 'react'
import "./index.css"

const CategoryCard = ({
  id,
  title,
  price,
  description,
  features,
  footerText,
  buttonText,
  headerBgColor,
  buttonBgGradient,
  onButtonClick, item
}) => {
  return (
    <div
      className="category-card d-flex flex-column justify-content-between"
      style={{
        borderRadius: "25px",
        overflow: "hidden",
        backgroundColor: "#222",
        color: "white",
        width: "100%",
        maxWidth: "400px",
        height: "auto",
        border: "1.2px solid grey",
      }}
    >
      <div
        style={{ background: headerBgColor, color: "white", padding: "20px" }}
        className="card-header d-flex justify-content-between align-items-center"
      >
        <h1
          className="pe-4"
          style={{
            fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
            margin: 0,
            fontWeight: "bold",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </h1>
        <h1
          className="ps-4"
          style={{
            fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
            margin: 0,
            fontWeight: "bold",
            whiteSpace: "nowrap",
          }}
        >
          {price}
        </h1>
      </div>

      <div
        className="card-content mt-2"
        style={{
          padding: "10px 20px",
          flex: 1,
          overflowY: "auto",
        }}
      >
        <p
          style={{
            fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
            marginBottom: "15px",
          }}
        >
          {description?.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>


        {/* <ul
          style={{
            listStyle: "disc",
            paddingLeft: "20px",
            marginBottom: "15px",
          }}
        >
          {features &&
            features.map((feature, index) => (
              <li
                key={index}
                style={{
                  fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
                  marginBottom: "8px",
                }}
              >
                {feature}
              </li>
            ))}
        </ul> */}

        {/* {footerText && (
          <p
            style={{
              fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
              marginTop: "15px",
            }}
          >
            {footerText}
          </p>
        )} */}
      </div>

      <div className="card-footer" style={{ padding: "20px" }}>
        <button
          className="primary-btn w-100 py-2"
          onClick={() => onButtonClick(item)}
          style={{
            background:
              buttonBgGradient ||
              "linear-gradient(90deg, #DDA027 0.01%, #CE9B2B 31.98%, #FEF48E 68.02%, #FFD046 100%)",
            border: "none",
            borderRadius: "8px",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default CategoryCard
