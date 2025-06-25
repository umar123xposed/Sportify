import React, { useState } from 'react'
import "./index.css"
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import logo from "./../../assets/logo.svg"
import {
    Offcanvas,
    OffcanvasHeader,
    OffcanvasBody,
} from "reactstrap";
import { LOGOUT } from '../../graphql/mutation'
import { useMutation } from '@apollo/client'
import { logoutOnSubmit } from '../../graphql/api-callings'
import { useDispatch, useSelector } from 'react-redux'
import { handleLogout } from '../../redux/authSlice'
import { handleClearProfile } from '../../redux/profileSlice'

export default function UserLayout() {

    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen2, setDropdownOpen2] = useState(false);

    const [Logout, { loading: loading1, error, data }] = useMutation(LOGOUT);


    const toggle1 = () => setIsOpen(!isOpen);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(
        (state) => state.authSlice
    );

    const userRole = useSelector(
        (state) => state.authSlice?.role
    );

    const location = useLocation()

    const handleSubmit = () => {

        const payload = {
            fcm: localStorage.getItem("fcm") || null,
        }

        logoutOnSubmit(
            payload,
            Logout,
            dispatch,
            handleLogout,
            navigate,
            handleClearProfile
        );


    }

    return (
        <>
            <div className="header-main w-100 d-lg-block d-none">
                <div className="outer-grad">
                    <div className="inner-grad">
                        <div className="final-black">
                            <div className="CustomeConatiner">
                                <div className="header-inner h-100 ">
                                    <div
                                        // onClick={() => {
                                        //     (userRole == "Coach" && navigate("/coach/")) ||
                                        //         (userRole == "Recruiter" &&
                                        //             navigate("/recruiter/")) ||
                                        //         (userRole == "Parent" && navigate("/parent/")) ||
                                        //         (userRole == "Athlete" && navigate("/athletes/"));
                                        // }}
                                        style={{ cursor: "pointer" }}
                                        className=" logo d-flex align-items-center"
                                    >
                                        <img src={logo} alt="" />
                                        <h3>SPORTIFY</h3>
                                    </div>
                                    <div></div>

                                    <div className="menu">
                                        <div
                                            className="menu-item"
                                        >
                                            <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15 8.93262C15 9.99348 14.5786 11.0109 13.8284 11.761C13.0783 12.5112 12.0609 12.9326 11 12.9326C9.93913 12.9326 8.92172 12.5112 8.17157 11.761C7.42143 11.0109 7 9.99348 7 8.93262C7 7.87175 7.42143 6.85434 8.17157 6.10419C8.92172 5.35404 9.93913 4.93262 11 4.93262C12.0609 4.93262 13.0783 5.35404 13.8284 6.10419C14.5786 6.85434 15 7.87175 15 8.93262ZM13 8.93262C13 9.46305 12.7893 9.97176 12.4142 10.3468C12.0391 10.7219 11.5304 10.9326 11 10.9326C10.4696 10.9326 9.96086 10.7219 9.58579 10.3468C9.21071 9.97176 9 9.46305 9 8.93262C9 8.40218 9.21071 7.89348 9.58579 7.5184C9.96086 7.14333 10.4696 6.93262 11 6.93262C11.5304 6.93262 12.0391 7.14333 12.4142 7.5184C12.7893 7.89348 13 8.40218 13 8.93262Z" fill="white" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11 0.932617C4.925 0.932617 0 5.85762 0 11.9326C0 18.0076 4.925 22.9326 11 22.9326C17.075 22.9326 22 18.0076 22 11.9326C22 5.85762 17.075 0.932617 11 0.932617ZM2 11.9326C2 14.0226 2.713 15.9466 3.908 17.4746C4.74744 16.3727 5.83015 15.4798 7.07164 14.8653C8.31312 14.2509 9.6798 13.9317 11.065 13.9326C12.4324 13.931 13.7821 14.2417 15.0111 14.841C16.2402 15.4403 17.3162 16.3123 18.157 17.3906C19.0234 16.2542 19.6068 14.9278 19.8589 13.5212C20.111 12.1146 20.0244 10.6682 19.6065 9.3016C19.1886 7.93505 18.4512 6.68766 17.4555 5.66265C16.4598 4.63764 15.2343 3.86448 13.8804 3.40713C12.5265 2.94978 11.0832 2.82139 9.66986 3.03259C8.25652 3.24379 6.91379 3.78851 5.75277 4.62167C4.59175 5.45483 3.64581 6.55249 2.99323 7.82381C2.34065 9.09514 2.00018 10.5036 2 11.9326ZM11 20.9326C8.93391 20.936 6.93014 20.2252 5.328 18.9206C5.97281 17.9972 6.83119 17.2433 7.83008 16.7231C8.82896 16.2028 9.93876 15.9316 11.065 15.9326C12.1772 15.9316 13.2735 16.1961 14.263 16.7039C15.2524 17.2118 16.1064 17.9484 16.754 18.8526C15.1395 20.1996 13.1026 20.9359 11 20.9326Z" fill="white" />
                                            </svg>
                                            <p>
                                                {user?.user?.data?.email}
                                            </p>
                                        </div>

                                        {/* <div
                                            onClick={() => navigate("/about-us")}
                                            className="menu-item"
                                        >
                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.99998 0.932617C4.47717 0.932617 0 5.40974 0 10.9326C0 16.4554 4.47717 20.9326 9.99998 20.9326C15.5229 20.9326 20 16.4555 20 10.9326C20 5.40974 15.5229 0.932617 9.99998 0.932617ZM9.99998 18.9326C5.58881 18.9326 2.00002 15.3438 2.00002 10.9326C2.00002 6.52138 5.58877 2.93263 9.99998 2.93263C14.4113 2.93263 18 6.52138 18 10.9326C18 15.3438 14.4113 18.9326 9.99998 18.9326ZM11.2522 6.93262C11.2522 7.65768 10.7243 8.18263 10.0102 8.18263C9.26714 8.18263 8.75217 7.65763 8.75217 6.91874C8.75217 6.20859 9.28106 5.68265 10.0102 5.68265C10.7243 5.68265 11.2522 6.20859 11.2522 6.93262ZM9.0022 9.93262H11.0022V15.9326H9.0022V9.93262Z" fill="white" />
                                            </svg>

                                            <p
                                                className={
                                                    location.pathname == "/about-us" && "grdiant-text"
                                                }
                                            >
                                                About
                                            </p>
                                        </div> */}

                                        <div
                                            onClick={() => loading1 ? {} : handleSubmit()}
                                            className="menu-item"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13 15.5578C12.926 17.4098 11.383 18.9818 9.316 18.9318C8.835 18.9198 8.24 18.7518 7.051 18.4168C4.19 17.6098 1.706 16.2528 1.11 13.2138C1 12.6568 1 12.0278 1 10.7698V9.09578C1 7.83878 1 7.20978 1.11 6.65078C1.706 3.61278 4.19 2.25578 7.051 1.44878C8.241 1.11378 8.835 0.945778 9.316 0.933778C11.383 0.883778 12.926 2.45578 13 4.30778M19 9.93278H8M19 9.93278C19 9.23278 17.006 7.92478 16.5 7.43278M19 9.93278C19 10.6328 17.006 11.9408 16.5 12.4328" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>

                                            <p
                                                className={
                                                    location.pathname == "/faqs" && "grdiant-text"
                                                }
                                            >
                                                Logout
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header-main w-100 d-lg-none d-block">
                <div className="outer-grad">
                    <div className="inner-grad">
                        <div className="final-black">
                            <div className="CustomeConatiner">
                                <div className="header-inner h-100 ">
                                    <div
                                        onClick={() => {
                                            (userRole == "Coach" && navigate("/coach/")) ||
                                                (userRole == "Recruiter" &&
                                                    navigate("/recruiter/")) ||
                                                (userRole == "Parent" && navigate("/parent/")) ||
                                                (userRole == "Athlete" && navigate("/athletes/"));
                                        }}
                                        style={{ cursor: "pointer" }}
                                        className=" logo d-flex align-items-center"
                                    >
                                        <img src={logo} alt="" />
                                        <h3>Sport  ID</h3>
                                    </div>
                                    <div></div>

                                    <div className="menu">


                                        <div className="menu-item hammad">
                                            <div
                                                onClick={() => toggle1()}
                                                className="d-flex align-items-center"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="21"
                                                    height="16"
                                                    viewBox="0 0 21 16"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M4.41244 0.620199C3.9637 0.620199 3.59994 0.983967 3.59994 1.4327C3.59994 1.88143 3.9637 2.2452 4.41244 2.2452H19.5791C20.0278 2.2452 20.3916 1.88143 20.3916 1.4327C20.3916 0.983967 20.0278 0.620199 19.5791 0.620199H4.41244Z"
                                                        fill={
                                                            dropdownOpen2
                                                                ? "url(#paint1_linear_2634_1362)"
                                                                : "#fff"
                                                        }
                                                    />
                                                    <path
                                                        d="M4.41244 7.1202C3.9637 7.1202 3.59994 7.48397 3.59994 7.9327C3.59994 8.38143 3.9637 8.7452 4.41244 8.7452H19.5791C20.0278 8.7452 20.3916 8.38143 20.3916 7.9327C20.3916 7.48397 20.0278 7.1202 19.5791 7.1202H4.41244Z"
                                                        fill={
                                                            dropdownOpen2
                                                                ? "url(#paint1_linear_2634_1362)"
                                                                : "#fff"
                                                        }
                                                    />
                                                    <path
                                                        d="M4.41244 13.6202C3.9637 13.6202 3.59994 13.984 3.59994 14.4327C3.59994 14.8814 3.9637 15.2452 4.41244 15.2452H19.5791C20.0278 15.2452 20.3916 14.8814 20.3916 14.4327C20.3916 13.984 20.0278 13.6202 19.5791 13.6202H4.41244Z"
                                                        fill={
                                                            dropdownOpen2
                                                                ? "url(#paint1_linear_2634_1362)"
                                                                : "#fff"
                                                        }
                                                    />
                                                    <path
                                                        d="M2.24577 7.9327C2.24577 8.53101 1.76074 9.01603 1.16243 9.01603C0.564126 9.01603 0.0791016 8.53101 0.0791016 7.9327C0.0791016 7.33439 0.564126 6.84937 1.16243 6.84937C1.76074 6.84937 2.24577 7.33439 2.24577 7.9327Z"
                                                        fill={
                                                            dropdownOpen2
                                                                ? "url(#paint1_linear_2634_1362)"
                                                                : "#fff"
                                                        }
                                                    />
                                                    <path
                                                        d="M2.24577 1.4327C2.24577 2.03101 1.76074 2.51603 1.16243 2.51603C0.564126 2.51603 0.0791016 2.03101 0.0791016 1.4327C0.0791016 0.83439 0.564126 0.349365 1.16243 0.349365C1.76074 0.349365 2.24577 0.83439 2.24577 1.4327Z"
                                                        fill={
                                                            dropdownOpen2
                                                                ? "url(#paint1_linear_2634_1362)"
                                                                : "#fff"
                                                        }
                                                    />
                                                    <path
                                                        d="M2.24577 14.4327C2.24577 15.031 1.76074 15.516 1.16243 15.516C0.564126 15.516 0.0791016 15.031 0.0791016 14.4327C0.0791016 13.8344 0.564126 13.3494 1.16243 13.3494C1.76074 13.3494 2.24577 13.8344 2.24577 14.4327Z"
                                                        fill={
                                                            dropdownOpen2
                                                                ? "url(#paint1_linear_2634_1362)"
                                                                : "#fff"
                                                        }
                                                    />
                                                </svg>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Offcanvas isOpen={isOpen} toggle={toggle1} style={{ backgroundColor: "#3C3C3C", color: "white" }}>
                <OffcanvasHeader toggle={toggle1} className='fw-bold'>
                    SPORTIFY
                </OffcanvasHeader>
                <OffcanvasBody>
                    <div className="menu d-flex flex-column gap-2">


                        <div
                            onClick={() => {
                                toggle1()
                                navigate("/about-us")
                            }}
                            className="more-item d-flex  align-items-center justify-content-between">
                            <div className="d-flex align-items-center ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 25 25"
                                    fill="none"
                                    className='me-3'
                                >
                                    <path
                                        d="M9.71973 14.6816C7.37973 14.6816 2.71973 15.8516 2.71973 18.1816V19.9316H16.7197V18.1816C16.7197 15.8516 12.0597 14.6816 9.71973 14.6816ZM5.05973 17.9316C5.89973 17.3516 7.92973 16.6816 9.71973 16.6816C11.5097 16.6816 13.5397 17.3516 14.3797 17.9316H5.05973ZM9.71973 12.9316C11.6497 12.9316 13.2197 11.3616 13.2197 9.43164C13.2197 7.50164 11.6497 5.93164 9.71973 5.93164C7.78973 5.93164 6.21973 7.50164 6.21973 9.43164C6.21973 11.3616 7.78973 12.9316 9.71973 12.9316ZM9.71973 7.93164C10.5497 7.93164 11.2197 8.60164 11.2197 9.43164C11.2197 10.2616 10.5497 10.9316 9.71973 10.9316C8.88973 10.9316 8.21973 10.2616 8.21973 9.43164C8.21973 8.60164 8.88973 7.93164 9.71973 7.93164ZM16.7597 14.7416C17.9197 15.5816 18.7197 16.7016 18.7197 18.1816V19.9316H22.7197V18.1816C22.7197 16.1616 19.2197 15.0116 16.7597 14.7416ZM15.7197 12.9316C17.6497 12.9316 19.2197 11.3616 19.2197 9.43164C19.2197 7.50164 17.6497 5.93164 15.7197 5.93164C15.1797 5.93164 14.6797 6.06164 14.2197 6.28164C14.8497 7.17164 15.2197 8.26164 15.2197 9.43164C15.2197 10.6016 14.8497 11.6916 14.2197 12.5816C14.6797 12.8016 15.1797 12.9316 15.7197 12.9316Z"
                                        fill="#fff"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear_4972_27598"
                                            x1="2.72086"
                                            y1="12.9322"
                                            x2="22.7202"
                                            y2="12.9322"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stop-color="#DDA027" />
                                            <stop offset="0.3198" stop-color="#CE9B2B" />
                                            <stop offset="0.6802" stop-color="#FEF48E" />
                                            <stop offset="1" stop-color="#FFD046" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <label>
                                    About
                                </label>
                            </div>
                        </div>

                        <div
                            onClick={() => loading1 ? {} : handleSubmit()}
                            className="more-item d-flex  align-items-center justify-content-between"
                        >
                            <div className="d-flex align-items-center ">
                                <svg
                                    className="me-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M11.5934 23.1248H5.33366C3.63247 23.1248 2.25217 21.7394 2.25217 20.0433V4.95671C2.25217 3.25552 3.63756 1.87521 5.33366 1.87521H11.6953C12.0773 1.87521 12.3829 1.56961 12.3829 1.18761C12.3829 0.805603 12.0773 0.5 11.6953 0.5H5.33366C2.87356 0.5 0.876953 2.5017 0.876953 4.95671V20.0433C0.876953 22.5034 2.87865 24.5 5.33366 24.5H11.5934C11.9754 24.5 12.281 24.1944 12.281 23.8124C12.281 23.4304 11.9703 23.1248 11.5934 23.1248Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M22.9214 12.0159L18.5512 7.64582C18.2813 7.37587 17.8483 7.37587 17.5784 7.64582C17.3085 7.91577 17.3085 8.34871 17.5784 8.61866L20.777 11.8173H6.82628C6.44427 11.8173 6.13867 12.1229 6.13867 12.5049C6.13867 12.8869 6.44427 13.1925 6.82628 13.1925H20.777L17.5784 16.3912C17.3085 16.6611 17.3085 17.094 17.5784 17.364C17.7108 17.4964 17.8891 17.5677 18.0623 17.5677C18.2354 17.5677 18.4137 17.5015 18.5461 17.364L22.9163 12.9939C23.1913 12.7188 23.1913 12.2808 22.9214 12.0159Z"
                                        fill="white"
                                    />
                                </svg>
                                <label> Logout </label>
                            </div>
                        </div>
                    </div>
                </OffcanvasBody>
            </Offcanvas>

            <Outlet />
        </>
    );
}
