import React from 'react'
import "./index.css"
import gif from "../../assets/suuces.gif"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SuccessScreen = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const userRole = useSelector((state) => state.authSlice?.role);

  const handleContinue = () => {
    if (userRole === 'Coach' || userRole === 'Head' || userRole === 'Assistant') {
      navigate('/coach/create-coach-profile')
    } else if (userRole === 'Parent') {
      if (searchParams.get("id")) {
        navigate(`/parent/player-details?type=${searchParams.get("type")}&id=${searchParams.get("id")}`)
      }
      else {
        navigate(`/parent`)
      }



    } else if (userRole === 'Athlete') {
      navigate(`/athlete`)
    } else if (userRole === 'Recruiter') {
    
      navigate('/recruiter')
    }
  }

  return (
    <div className="success-main container">
      <div className="d-flex justify-content-center align-items-center flex-column h-100">

        <img src={gif} alt="successgif" />

        <h1 className='text-white text-center py-4' style={{fontSize: "24px"}}>Your payment is successfull</h1>
        <button className="primary-btn py-2 my-3 px-md-5 px-3" onClick={handleContinue}>Continue</button>
      </div>
    </div>
  )
}

export default SuccessScreen;
