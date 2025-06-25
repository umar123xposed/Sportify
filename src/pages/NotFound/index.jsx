import React from "react";
import "./index.css"
import ErrorImg from "../../assets/error-1.webp"

const NotFound = () => {
  return (
    <div className=" error-image" >

      <div>
        <img src={ErrorImg} alt="error" className="img-fluid" height={200} width={200}/>
        <p>404 Error</p>
        <span>Page Not Found</span>
      </div>
    </div>

  );
};

export default NotFound;