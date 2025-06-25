import React from 'react'
import {Col, Row, Container} from "reactstrap"
import { useNavigate } from 'react-router-dom'
import './index.css'
import { MdArrowForwardIos } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { setOrganizationType } from '../../redux/profileSlice'

import schoolImage from './../../assets/school.png'
import clubImage from './../../assets/club.png'

const Organization = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleCardClick = (type) => {
        dispatch(setOrganizationType(type))
        console.log(`${type} card clicked`)
        navigate(`/coach/organization-category`)
    }

    return (
        <div className="organization-container">
            <Container>
                <h1 className="text-center organization-title"> Select your organization</h1>
                <Row className="justify-content-center gap-0">
                    <Col  className="d-flex justify-content-end">
                        <div className="organization-card school" onClick={() => handleCardClick('School')}>
                            {/* If using img tags instead of CSS background images, place them here */}
                            <img src={schoolImage} alt="School" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}/>
                            <div className="card-overlay">
                                <p className="card-text">School</p>
                                <MdArrowForwardIos className="arrow-icon" />
                            </div>
                        </div>
                    </Col>

                    <Col  className="d-flex justify-content-start">
                        <div className="organization-card club" onClick={() => handleCardClick('Club')}>
                            {/* If using img tags instead of CSS background images, place them here */}
                            <img src={clubImage} alt="Club" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}/>
                            <div className="card-overlay">
                                <p className="card-text">Club</p>
                                <MdArrowForwardIos className="arrow-icon" />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Organization
