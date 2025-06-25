import React, { useEffect, useRef, useState } from 'react'
import "./index.css"
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import logo from "./../../assets/logo.svg"
import bell from "./../../assets/bell.png"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
} from "reactstrap";
import profile from "./../../assets/dummyprofile.png"
import qr from "./../../assets/qr.png";
import { CHANGE_NOTIFICATION_STATUS, LOGOUT, READ_NOTIFICATIONS } from '../../graphql/mutation'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { FiBell } from "react-icons/fi";
import { logoutOnSubmit, UpdateStatusNotificationOnSubmit } from '../../graphql/api-callings'
import { useDispatch, useSelector } from 'react-redux'
import { handleLogin, handleLogout } from '../../redux/authSlice'
import { handleClearProfile, handleProfileType } from '../../redux/profileSlice'
import { GET_ALL_NOTIFICATIONS } from '../../graphql/query/query'

export default function MainLayout() {
  const authinfo = useSelector((state) => state.authSlice)
  const userRole1 = useSelector(state => state?.authSlice?.user?.data?.meta?.meta?.coach_role)

  console.log("info", authinfo)


  const navigate = useNavigate()
  const dropdownRef2 = useRef(null);

  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [details, setDetails] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const toggle2 = () => setDropdownOpen2((prevState) => !prevState);
  const [Logout, { loading: loading1, error, data }] = useMutation(LOGOUT);

  const [readNotifications, { loading: loading3, error3, data3 }] =
    useMutation(READ_NOTIFICATIONS);

  const toggle1 = () => setIsOpen(!isOpen);

  const dispatch = useDispatch()
  const userRole = useSelector(
    (state) => state.authSlice?.role
  );
  const [nav, setNav] = useState("")
  const location = useLocation()
  console.log(userRole, "location");
  const handleHomeClick = () => {
    switch (userRole) {
      case "Parent":
        navigate("/parent");
        break;
      case "Coach":
        navigate("/coach");
        break;
      case "Head":
        navigate("/coach");
        break;
      case "Assistant":
        navigate("/coach");
        break;
      case "Athlete":
        navigate("/athlete");
        break;
      case "Recruiter":
        navigate("/recruiter");
        break;
      case "Admin":
        navigate("/");
        break;
      default:
        navigate("/"); // or some default route
    }
  };

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

  // const { loading, error: error1, data: allNotifications, refetch: refetch1 }
  //   = useQuery(GET_ALL_NOTIFICATIONS, {

  //     variables: {
  //       input: {
  //         page_start: 0,
  //         limit: 10,
  //       },
  //     },

  //   });

  const [
    acceptRejectInvite,
    { loading: loading2, error: error2, data: changeStatus },
  ] = useMutation(CHANGE_NOTIFICATION_STATUS);

  const handleAcceptOrReject = (status, id) => {
    const payload = {
      status: status,
      id: id,
    };

    UpdateStatusNotificationOnSubmit(payload, acceptRejectInvite);

  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen2(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  // useEffect(() => {

  //   if (dropdownOpen) {
  //     console.log('im here')

  //     let Unread = allNotifications?.getAllNotifications?.data?.some(
  //       (item) => item.is_read === false
  //     );

  //     if (Unread) {

  //       readNotifications();

  //     }

  //   }

  // }, [dropdownOpen])

  // const hasUnread = allNotifications?.getAllNotifications?.data?.some(
  //   (item) => item.is_read === false
  // );

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
                    //   (userRole == "Coach" && navigate("/coach/")) ||
                    //     (userRole == "Recruiter" &&
                    //       navigate("/recruiter/")) ||
                    //     (userRole == "Parent" && navigate("/parent/")) ||
                    //     (userRole == "Athlete" && navigate("/athlete"));
                    // }}
                    style={{ cursor: "pointer" }}
                    className=" logo d-flex align-items-center"
                  >
                    <img src={logo} alt="" />
                    <h3>Sport me ID</h3>
                  </div>
                  <div></div>
                  {/* <div className="search ">
                      <div className="search-bar">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 25 25"
                          fill="none"
                        >
                          <path
                            d="M17.6127 17.3526L20.6927 20.4326M19.7197 11.9326C19.7197 13.9217 18.9296 15.8294 17.523 17.2359C16.1165 18.6424 14.2089 19.4326 12.2197 19.4326C10.2306 19.4326 8.32295 18.6424 6.91643 17.2359C5.5099 15.8294 4.71973 13.9217 4.71973 11.9326C4.71973 9.94349 5.5099 8.03584 6.91643 6.62932C8.32295 5.22279 10.2306 4.43262 12.2197 4.43262C14.2089 4.43262 16.1165 5.22279 17.523 6.62932C18.9296 8.03584 19.7197 9.94349 19.7197 11.9326Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <input
                          className="w-100"
                          type="text"
                          placeholder="Search"
                        />
                      </div>
                    </div> */}

                  <div className="menu">
                    <div
                      onClick={() => handleHomeClick()}
                      className="menu-item"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="23"
                        viewBox="0 0 24 23"
                        fill="none"
                      >
                        <path
                          d="M5.81777 3.31205C2.92872 5.41107 1.4842 6.46058 0.916849 8.01085C0.871337 8.13521 0.8304 8.2612 0.794123 8.38857C0.34189 9.97624 0.893649 11.6744 1.99717 15.0707C3.10069 18.4669 3.65245 20.1651 4.95152 21.1837C5.05573 21.2654 5.16291 21.3433 5.27283 21.4172C5.73503 21.7277 6.24449 21.9336 6.8538 22.0699V17.2373C6.8538 14.3954 9.15767 12.0915 11.9996 12.0915C14.8416 12.0915 17.1455 14.3954 17.1455 17.2373V22.07C17.7548 21.9336 18.2642 21.7277 18.7265 21.4172C18.8364 21.3433 18.9435 21.2654 19.0478 21.1837C20.3468 20.1651 20.8986 18.4669 22.0021 15.0707C23.1056 11.6744 23.6574 9.97624 23.2052 8.38857C23.1689 8.2612 23.1279 8.13521 23.0824 8.01085C22.5151 6.46058 21.0706 5.41108 18.1815 3.31206C15.2925 1.21305 13.8479 0.163526 12.1982 0.103006C12.0659 0.0981515 11.9334 0.0981515 11.8011 0.103006C10.1513 0.163526 8.70682 1.21304 5.81777 3.31205Z"
                          fill={
                            location.pathname == "/parent" ||
                              location.pathname == "/athletes" ||
                              location.pathname == "/coach" ||
                              location.pathname == "/recruiter/"
                              ? "url(#paint1_linear_2634_1362)"
                              : "#fff"
                          }
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M15.5205 22.2787V17.2373C15.5205 15.2928 13.9441 13.7165 11.9996 13.7165C10.0551 13.7165 8.4788 15.2928 8.4788 17.2373V22.2787C9.4245 22.3379 10.5687 22.3379 11.9996 22.3379C13.4305 22.3379 14.5748 22.3379 15.5205 22.2787ZM12.8121 17.2373C12.8121 16.7886 12.4484 16.4248 11.9996 16.4248C11.5509 16.4248 11.1871 16.7886 11.1871 17.2373V19.404C11.1871 19.8527 11.5509 20.2165 11.9996 20.2165C12.4484 20.2165 12.8121 19.8527 12.8121 19.404V17.2373Z"
                          fill={
                            location.pathname == "/parent" ||
                              location.pathname == "/athletes" ||
                              location.pathname == "/coach" ||
                              location.pathname == "/recruiter/"
                              ? "url(#paint1_linear_2634_1362)"
                              : "#fff"
                          }
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_2634_1362"
                            x1="0.637033"
                            y1="11.2195"
                            x2="23.364"
                            y2="11.2195"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#DDA027" />
                            <stop offset="0.3198" stop-color="#CE9B2B" />
                            <stop offset="0.6802" stop-color="#FEF48E" />
                            <stop offset="1" stop-color="#FFD046" />
                          </linearGradient>
                          <linearGradient
                            id="paint1_linear_2634_1362"
                            x1="0.637033"
                            y1="11.2195"
                            x2="23.364"
                            y2="11.2195"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#DDA027" />
                            <stop offset="0.3198" stop-color="#CE9B2B" />
                            <stop offset="0.6802" stop-color="#FEF48E" />
                            <stop offset="1" stop-color="#FFD046" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <p
                        className={
                          location.pathname === "/parent" ||
                            location.pathname === "/athletes" ||
                            location.pathname == "/coach" ||
                            location.pathname == "/recruiter/"
                            ? "grdiant-text"
                            : ""
                        }
                      >
                        Home
                      </p>
                    </div>

                    {/* {(authinfo?.role === "Head" || authinfo?.user?.data?.meta?.meta?.coach_role === "Head") && (
                      <div
                        onClick={() => navigate("/coach/my-organization")}
                        className="menu-item"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 7.79 14.21 6 12 6ZM12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12ZM12 16C9.33 16 4 17.34 4 20V22H20V20C20 17.34 14.67 16 12 16Z"
                            fill={location.pathname === "/coach/my-organization" ? "url(#paint1_linear_2634_1362)" : "#fff"}
                          />
                        </svg>
                        <p
                          className={
                            location.pathname === "/coach/my-organization" ? "grdiant-text" : ""
                          }
                        >
                          Organization
                        </p>
                      </div>
                    )} */}
                    {
                      console.log(userRole1, userRole)
                    }
                    {(
                      (userRole1 && userRole1 === "Head") ||
                      (!userRole1 && ["Head", "Coach"].includes(userRole))
                    ) && (
                        <div
                          onClick={() => navigate("/coach/my-organization")}
                          className="menu-item"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 7.79 14.21 6 12 6ZM12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12ZM12 16C9.33 16 4 17.34 4 20V22H20V20C20 17.34 14.67 16 12 16Z"
                              fill={(location.pathname === "/coach/my-organization" || location.pathname === "/coach/team-details") ? "url(#paint1_linear_2634_1362)" : "#fff"}
                            />
                          </svg>
                          <p
                            className={
                              (location.pathname === "/coach/my-organization" || location.pathname === "/coach/team-details") ? "grdiant-text" : ""
                            }
                          >
                            Organization
                          </p>
                        </div>
                      )}


                    {userRole == "Parent" && (
                      <div
                        onClick={() => navigate("/parent/players")}
                        className="menu-item"
                      >
                        <svg width="26" height="19" viewBox="0 0 26 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0007 0.265625C10.757 0.265625 8.93815 2.08447 8.93815 4.32812C8.93815 6.57178 10.757 8.39062 13.0007 8.39062C15.2443 8.39062 17.0632 6.57178 17.0632 4.32812C17.0632 2.08447 15.2443 0.265625 13.0007 0.265625ZM10.5632 4.32812C10.5632 2.98193 11.6545 1.89062 13.0007 1.89062C14.3468 1.89062 15.4382 2.98193 15.4382 4.32812C15.4382 5.67432 14.3468 6.76562 13.0007 6.76562C11.6545 6.76562 10.5632 5.67432 10.5632 4.32812Z" fill={location.pathname == "/parent/players" ? "url(#paint1_linear_2634_1362)" : "#fff"} />
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.75065 10.0156C7.50699 10.0156 5.68815 11.8345 5.68815 14.0781C5.68815 16.3218 7.50699 18.1406 9.75065 18.1406H16.2506C18.4943 18.1406 20.3132 16.3218 20.3132 14.0781C20.3132 11.8345 18.4943 10.0156 16.2506 10.0156H9.75065ZM7.31315 14.0781C7.31315 12.7319 8.40446 11.6406 9.75065 11.6406H16.2506C17.5968 11.6406 18.6882 12.7319 18.6882 14.0781C18.6882 15.4243 17.5968 16.5156 16.2506 16.5156H9.75065C8.40446 16.5156 7.31315 15.4243 7.31315 14.0781Z" fill={location.pathname == "/parent/players" ? "url(#paint1_linear_2634_1362)" : "#fff"} />
                          <path d="M8.3988 7.18667C8.22793 6.91217 7.90732 6.76562 7.58398 6.76562C6.23779 6.76562 5.14648 5.67432 5.14648 4.32812C5.14648 2.98193 6.23779 1.89062 7.58398 1.89062C7.90732 1.89062 8.22793 1.74408 8.3988 1.46958C8.40636 1.45744 8.41396 1.44534 8.42161 1.43326C8.7061 0.984208 8.56196 0.348392 8.03357 0.29022C7.88594 0.273968 7.73594 0.265625 7.58398 0.265625C5.34033 0.265625 3.52148 2.08447 3.52148 4.32812C3.52148 6.57178 5.34033 8.39062 7.58398 8.39062C7.73594 8.39062 7.88594 8.38228 8.03357 8.36603C8.56196 8.30786 8.7061 7.67204 8.42161 7.22299C8.41396 7.21092 8.40636 7.19881 8.3988 7.18667Z" fill={location.pathname == "/parent/players" ? "url(#paint1_linear_2634_1362)" : "#fff"} />
                          <path d="M5.1013 15.7756C4.97832 15.5704 4.76124 15.4323 4.52204 15.4323H4.33398C2.98779 15.4323 1.89648 14.341 1.89648 12.9948C1.89648 11.6486 2.98779 10.5573 4.33398 10.5573H4.52204C4.76124 10.5573 4.97832 10.4192 5.1013 10.214C5.40149 9.71318 5.07573 8.93229 4.49182 8.93229H4.33398C2.09033 8.93229 0.271484 10.7511 0.271484 12.9948C0.271484 15.2384 2.09033 17.0573 4.33398 17.0573H4.49182C5.07573 17.0573 5.40149 16.2764 5.1013 15.7756Z" fill={location.pathname == "/parent/players" ? "url(#paint1_linear_2634_1362)" : "#fff"} />
                          <path d="M17.5797 7.22299C17.2952 7.67204 17.4393 8.30786 17.9677 8.36603C18.1154 8.38228 18.2654 8.39062 18.4173 8.39062C20.661 8.39062 22.4798 6.57178 22.4798 4.32812C22.4798 2.08447 20.661 0.265625 18.4173 0.265625C18.2654 0.265625 18.1154 0.273968 17.9677 0.29022C17.4393 0.348393 17.2952 0.984208 17.5797 1.43326C17.5873 1.44533 17.5949 1.45744 17.6025 1.46958C17.7734 1.74408 18.094 1.89062 18.4173 1.89062C19.7635 1.89062 20.8548 2.98193 20.8548 4.32812C20.8548 5.67432 19.7635 6.76562 18.4173 6.76562C18.094 6.76562 17.7734 6.91217 17.6025 7.18667C17.5949 7.19881 17.5873 7.21092 17.5797 7.22299Z" fill={location.pathname == "/parent/players" ? "url(#paint1_linear_2634_1362)" : "#fff"} />
                          <path d="M20.9 15.7756C20.5998 16.2764 20.9256 17.0573 21.5095 17.0573H21.6673C23.911 17.0573 25.7298 15.2384 25.7298 12.9948C25.7298 10.7511 23.911 8.93229 21.6673 8.93229H21.5095C20.9256 8.93229 20.5998 9.71318 20.9 10.214C21.023 10.4192 21.2401 10.5573 21.4793 10.5573H21.6673C23.0135 10.5573 24.1048 11.6486 24.1048 12.9948C24.1048 14.341 23.0135 15.4323 21.6673 15.4323H21.4793C21.2401 15.4323 21.023 15.5704 20.9 15.7756Z" fill={location.pathname == "/parent/players" ? "url(#paint1_linear_2634_1362)" : "#fff"} />
                        </svg>

                        <p
                          className={
                            location.pathname == "/parent/players" && "grdiant-text"
                          }
                        >
                          Athlete
                        </p>
                      </div>
                    )
                    }

                    {/* {(userRole == "Athlete" || userRole == "Athletes") && (
                      <div
                        onClick={() => navigate("/athletes/requests")}
                        className="menu-item"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="19"
                          viewBox="0 0 26 19"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12.9997 0.265869C10.756 0.265869 8.93717 2.08471 8.93717 4.32837C8.93717 6.57203 10.756 8.39087 12.9997 8.39087C15.2433 8.39087 17.0622 6.57203 17.0622 4.32837C17.0622 2.08471 15.2433 0.265869 12.9997 0.265869ZM10.5622 4.32837C10.5622 2.98218 11.6535 1.89087 12.9997 1.89087C14.3459 1.89087 15.4372 2.98218 15.4372 4.32837C15.4372 5.67456 14.3459 6.76587 12.9997 6.76587C11.6535 6.76587 10.5622 5.67456 10.5622 4.32837Z"
                            fill={
                              location.pathname == "/athletes/requests"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9.74967 10.0159C7.50602 10.0159 5.68717 11.8347 5.68717 14.0784C5.68717 16.322 7.50602 18.1409 9.74967 18.1409H16.2497C18.4933 18.1409 20.3122 16.322 20.3122 14.0784C20.3122 11.8347 18.4933 10.0159 16.2497 10.0159H9.74967ZM7.31217 14.0784C7.31217 12.7322 8.40348 11.6409 9.74967 11.6409H16.2497C17.5959 11.6409 18.6872 12.7322 18.6872 14.0784C18.6872 15.4246 17.5959 16.5159 16.2497 16.5159H9.74967C8.40348 16.5159 7.31217 15.4246 7.31217 14.0784Z"
                            fill={
                              location.pathname == "/athletes/requests"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                          <path
                            d="M8.39783 7.18691C8.22696 6.91242 7.90634 6.76587 7.58301 6.76587C6.23681 6.76587 5.14551 5.67456 5.14551 4.32837C5.14551 2.98218 6.23681 1.89087 7.58301 1.89087C7.90634 1.89087 8.22696 1.74432 8.39783 1.46983C8.40538 1.45769 8.41299 1.44558 8.42064 1.4335C8.70512 0.984452 8.56098 0.348636 8.03259 0.290464C7.88497 0.274212 7.73496 0.265869 7.58301 0.265869C5.33935 0.265869 3.52051 2.08471 3.52051 4.32837C3.52051 6.57203 5.33935 8.39087 7.58301 8.39087C7.73496 8.39087 7.88497 8.38253 8.03259 8.36627C8.56098 8.3081 8.70512 7.67229 8.42064 7.22323C8.41299 7.21116 8.40538 7.19905 8.39783 7.18691Z"
                            fill={
                              location.pathname == "/athletes/requests"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                          <path
                            d="M5.10032 15.7758C4.97734 15.5706 4.76027 15.4325 4.52106 15.4325H4.33301C2.98681 15.4325 1.89551 14.3412 1.89551 12.995C1.89551 11.6488 2.98681 10.5575 4.33301 10.5575H4.52106C4.76027 10.5575 4.97734 10.4194 5.10032 10.2143C5.40051 9.71343 5.07475 8.93254 4.49084 8.93254H4.33301C2.08935 8.93254 0.270508 10.7514 0.270508 12.995C0.270508 15.2387 2.08935 17.0575 4.33301 17.0575H4.49084C5.07475 17.0575 5.40051 16.2766 5.10032 15.7758Z"
                            fill={
                              location.pathname == "/athletes/requests"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                          <path
                            d="M17.5787 7.22323C17.2942 7.67229 17.4384 8.3081 17.9668 8.36627C18.1144 8.38253 18.2644 8.39087 18.4163 8.39087C20.66 8.39087 22.4788 6.57203 22.4788 4.32837C22.4788 2.08471 20.66 0.265869 18.4163 0.265869C18.2644 0.265869 18.1144 0.274212 17.9668 0.290464C17.4384 0.348637 17.2942 0.984452 17.5787 1.4335C17.5864 1.44558 17.594 1.45769 17.6015 1.46982C17.7724 1.74432 18.093 1.89087 18.4163 1.89087C19.7625 1.89087 20.8538 2.98218 20.8538 4.32837C20.8538 5.67456 19.7625 6.76587 18.4163 6.76587C18.093 6.76587 17.7724 6.91242 17.6015 7.18691C17.594 7.19905 17.5864 7.21116 17.5787 7.22323Z"
                            fill={
                              location.pathname == "/athletes/requests"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                          <path
                            d="M20.899 15.7758C20.5988 16.2766 20.9246 17.0575 21.5085 17.0575H21.6663C23.91 17.0575 25.7288 15.2387 25.7288 12.995C25.7288 10.7514 23.91 8.93254 21.6663 8.93254H21.5085C20.9246 8.93254 20.5988 9.71343 20.899 10.2143C21.022 10.4194 21.2391 10.5575 21.4783 10.5575H21.6663C23.0125 10.5575 24.1038 11.6488 24.1038 12.995C24.1038 14.3412 23.0125 15.4325 21.6663 15.4325H21.4783C21.2391 15.4325 21.022 15.5706 20.899 15.7758Z"
                            fill={
                              location.pathname == "/athletes/requests"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                        </svg>
                        <p
                          className={
                            location.pathname == "/athletes/requests" &&
                            "grdiant-text"
                          }
                        >
                          Requests
                        </p>
                      </div>
                    )} */}


                    <div
                      onClick={() => navigate("/fanclub")}
                      className="menu-item"
                    >
                      <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.9897 2.30762C9.80452 2.30762 8.66788 2.77843 7.82983 3.61648C6.99177 4.45454 6.52096 5.59118 6.52096 6.77637C6.52096 7.03212 6.52096 7.17512 6.54296 7.34012C6.56221 7.50512 6.60484 7.71137 6.70796 8.06474L6.96921 8.97912L6.01771 8.94062C5.25896 8.90918 4.50472 9.07162 3.82618 9.4126C3.14763 9.75358 2.56718 10.2619 2.1396 10.8894C1.71203 11.517 1.45144 12.2432 1.38244 12.9995C1.31344 13.7557 1.4383 14.5171 1.74523 15.2117C2.05217 15.9063 2.53105 16.5113 3.13668 16.9694C3.74231 17.4276 4.4547 17.7238 5.20661 17.8302C5.95852 17.9366 6.72514 17.8496 7.4341 17.5775C8.14306 17.3054 8.77098 16.857 9.25859 16.2749C9.3641 16.147 9.51227 16.0616 9.67578 16.0343C9.8393 16.0071 10.0072 16.0398 10.1484 16.1265C10.2897 16.2132 10.3949 16.3481 10.4447 16.5062C10.4944 16.6644 10.4853 16.8351 10.4191 16.9871L10.415 16.994L10.4067 17.0146L10.3737 17.0902C10.1828 17.5165 9.98195 17.9383 9.77146 18.3552C9.24977 19.3948 8.66856 20.4035 8.03071 21.3761C8.01284 21.4009 8.00321 21.4449 8.03209 21.4999C8.04675 21.5265 8.0605 21.543 8.07334 21.5494C8.08201 21.5547 8.09201 21.5576 8.10221 21.5576H13.8772C13.89 21.5576 13.9001 21.5549 13.9075 21.5494C13.9243 21.5366 13.9379 21.5201 13.9473 21.5012C13.9748 21.4462 13.9666 21.4009 13.9487 21.3761C13.0584 20.01 12.2751 18.5771 11.6057 17.0902L11.5727 17.016L11.5645 16.9954L11.5617 16.9899C11.4969 16.839 11.4882 16.6699 11.5372 16.5132C11.5861 16.3565 11.6896 16.2225 11.8288 16.1354C11.9681 16.0484 12.1338 16.014 12.2962 16.0386C12.4585 16.0632 12.6067 16.145 12.714 16.2694C13.5403 17.2319 14.7985 17.8754 16.146 17.8754C16.7375 17.8701 17.3221 17.7475 17.8659 17.5146C18.4097 17.2817 18.9019 16.9432 19.3138 16.5186C19.7257 16.094 20.0493 15.5919 20.2657 15.0413C20.482 14.4907 20.5869 13.9027 20.5743 13.3112C20.5616 12.7198 20.4317 12.1367 20.192 11.5959C19.9522 11.0551 19.6075 10.5673 19.1778 10.1607C18.7481 9.75412 18.2419 9.43691 17.6887 9.22748C17.1354 9.01804 16.5461 8.92053 15.9548 8.94062L14.9937 8.98187L15.2673 8.05924C15.4598 7.41299 15.4598 7.03487 15.4585 6.78462V6.77637C15.4585 5.59118 14.9876 4.45454 14.1496 3.61648C13.3115 2.77843 12.1749 2.30762 10.9897 2.30762ZM14.0243 18.8406C14.3337 19.3975 14.694 20.0066 15.0968 20.6199C15.7156 21.5576 15.0803 22.9326 13.8772 22.9326H8.10221C6.89771 22.9326 6.26246 21.5576 6.88259 20.6185C7.28271 20.0107 7.64159 19.4085 7.94959 18.8544C7.17475 19.1543 6.34485 19.2856 5.51526 19.2395C4.68566 19.1933 3.87545 18.9708 3.13866 18.5867C2.40188 18.2027 1.75546 17.6659 1.24254 17.0123C0.729614 16.3586 0.361976 15.6031 0.164149 14.7961C-0.0336783 13.9891 -0.0571457 13.1492 0.0953121 12.3325C0.24777 11.5157 0.572648 10.7408 1.04827 10.0596C1.5239 9.37828 2.13933 8.80627 2.85352 8.38167C3.56771 7.95707 4.36424 7.68964 5.18996 7.59724L5.17759 7.50924C5.14596 7.25212 5.14596 7.03074 5.14596 6.79424V6.77637C5.14596 5.22651 5.76164 3.74013 6.85756 2.64421C7.95347 1.5483 9.43985 0.932617 10.9897 0.932617C12.5396 0.932617 14.026 1.5483 15.1219 2.64421C16.2178 3.74013 16.8335 5.22651 16.8335 6.77637C16.8335 6.96887 16.8335 7.23424 16.7785 7.59587C18.2672 7.75472 19.6382 8.47892 20.6086 9.61907C21.579 10.7592 22.0747 12.2283 21.9936 13.7233C21.9125 15.2183 21.2606 16.6251 20.1725 17.6536C19.0845 18.682 17.6431 19.2536 16.146 19.2504C15.4193 19.2485 14.6995 19.1095 14.0243 18.8406Z" fill={location.pathname == "/fanclub" ? "url(#paint1_linear_2634_1362)" : "#fff"} />
                      </svg>

                      <p
                        // className='text-nowrap'
                        className={
                          `text-nowrap ${location.pathname == "/fanclub" && "grdiant-text"}`
                        }
                      >
                        Fan Club
                      </p>
                    </div>

                    <div
                      onClick={() => navigate("/about-us")}
                      className="menu-item"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                      >
                        <path
                          d="M9.71973 14.6816C7.37973 14.6816 2.71973 15.8516 2.71973 18.1816V19.9316H16.7197V18.1816C16.7197 15.8516 12.0597 14.6816 9.71973 14.6816ZM5.05973 17.9316C5.89973 17.3516 7.92973 16.6816 9.71973 16.6816C11.5097 16.6816 13.5397 17.3516 14.3797 17.9316H5.05973ZM9.71973 12.9316C11.6497 12.9316 13.2197 11.3616 13.2197 9.43164C13.2197 7.50164 11.6497 5.93164 9.71973 5.93164C7.78973 5.93164 6.21973 7.50164 6.21973 9.43164C6.21973 11.3616 7.78973 12.9316 9.71973 12.9316ZM9.71973 7.93164C10.5497 7.93164 11.2197 8.60164 11.2197 9.43164C11.2197 10.2616 10.5497 10.9316 9.71973 10.9316C8.88973 10.9316 8.21973 10.2616 8.21973 9.43164C8.21973 8.60164 8.88973 7.93164 9.71973 7.93164ZM16.7597 14.7416C17.9197 15.5816 18.7197 16.7016 18.7197 18.1816V19.9316H22.7197V18.1816C22.7197 16.1616 19.2197 15.0116 16.7597 14.7416ZM15.7197 12.9316C17.6497 12.9316 19.2197 11.3616 19.2197 9.43164C19.2197 7.50164 17.6497 5.93164 15.7197 5.93164C15.1797 5.93164 14.6797 6.06164 14.2197 6.28164C14.8497 7.17164 15.2197 8.26164 15.2197 9.43164C15.2197 10.6016 14.8497 11.6916 14.2197 12.5816C14.6797 12.8016 15.1797 12.9316 15.7197 12.9316Z"
                          fill={
                            location.pathname == "/about-us"
                              ? "url(#paint1_linear_2634_1362)"
                              : "#fff"
                          }
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
                      <p
                        className={
                          location.pathname == "/about-us" && "grdiant-text"
                        }
                      >
                        About
                      </p>
                    </div>

                    <div
                      onClick={() => navigate("/faqs")}
                      className="menu-item"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="19"
                        viewBox="0 0 21 19"
                        fill="none"
                      >
                        <path
                          d="M10.5488 0.931641C5.04883 0.931641 0.548828 4.53164 0.548828 8.93164C0.548828 11.1316 1.64883 13.1316 3.34883 14.4316C3.34883 15.0316 2.94883 16.6316 0.548828 18.9316C2.94883 18.8316 5.14883 17.9316 7.04883 16.4316C8.14883 16.7316 9.34883 16.9316 10.5488 16.9316C16.0488 16.9316 20.5488 13.3316 20.5488 8.93164C20.5488 4.53164 16.0488 0.931641 10.5488 0.931641ZM10.5488 14.9316C6.14883 14.9316 2.54883 12.2316 2.54883 8.93164C2.54883 5.63164 6.14883 2.93164 10.5488 2.93164C14.9488 2.93164 18.5488 5.63164 18.5488 8.93164C18.5488 12.2316 14.9488 14.9316 10.5488 14.9316ZM10.7488 4.43164C9.84883 4.43164 9.14883 4.63164 8.64883 4.93164C8.04883 5.33164 7.74883 5.93164 7.84883 6.63164H9.84883C9.84883 6.33164 9.94883 6.13164 10.1488 6.03164C10.3488 5.93164 10.5488 5.83164 10.8488 5.83164C11.1488 5.83164 11.4488 5.93164 11.6488 6.13164C11.8488 6.33164 11.9488 6.53164 11.9488 6.83164C11.9488 7.13164 11.8488 7.33164 11.7488 7.53164C11.5488 7.73164 11.3488 7.93164 11.1488 8.03164C10.6488 8.33164 10.2488 8.63164 10.0488 8.83164C9.64883 9.13164 9.54883 9.43164 9.54883 9.93164H11.5488C11.5488 9.63164 11.6488 9.43164 11.6488 9.23164C11.7488 9.03164 11.9488 8.93164 12.1488 8.73164C12.6488 8.53164 12.9488 8.23164 13.2488 7.83164C13.5488 7.43164 13.6488 7.03164 13.6488 6.63164C13.6488 5.93164 13.3488 5.33164 12.8488 4.93164C12.4488 4.63164 11.6488 4.43164 10.7488 4.43164ZM9.54883 10.9316V12.9316H11.5488V10.9316H9.54883Z"
                          fill={location.pathname == "/faqs"
                            ? "url(#paint1_linear_2634_1362)"
                            : "#fff"
                          }
                        />
                      </svg>


                      <p
                        className={
                          location.pathname == "/faqs" && "grdiant-text"
                        }
                      >
                        FAQ's
                      </p>
                    </div>


                    {/* {userRole == "Parent" && (
                      <div
                        onClick={() => navigate("/parent/players")}
                        className="menu-item"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="19"
                          viewBox="0 0 26 19"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12.9997 0.265869C10.756 0.265869 8.93717 2.08471 8.93717 4.32837C8.93717 6.57203 10.756 8.39087 12.9997 8.39087C15.2433 8.39087 17.0622 6.57203 17.0622 4.32837C17.0622 2.08471 15.2433 0.265869 12.9997 0.265869ZM10.5622 4.32837C10.5622 2.98218 11.6535 1.89087 12.9997 1.89087C14.3459 1.89087 15.4372 2.98218 15.4372 4.32837C15.4372 5.67456 14.3459 6.76587 12.9997 6.76587C11.6535 6.76587 10.5622 5.67456 10.5622 4.32837Z"
                            fill={
                              location.pathname == "/parent/players"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9.74967 10.0159C7.50602 10.0159 5.68717 11.8347 5.68717 14.0784C5.68717 16.322 7.50602 18.1409 9.74967 18.1409H16.2497C18.4933 18.1409 20.3122 16.322 20.3122 14.0784C20.3122 11.8347 18.4933 10.0159 16.2497 10.0159H9.74967ZM7.31217 14.0784C7.31217 12.7322 8.40348 11.6409 9.74967 11.6409H16.2497C17.5959 11.6409 18.6872 12.7322 18.6872 14.0784C18.6872 15.4246 17.5959 16.5159 16.2497 16.5159H9.74967C8.40348 16.5159 7.31217 15.4246 7.31217 14.0784Z"
                            fill={
                              location.pathname == "/parent/players"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                          <path
                            d="M8.39783 7.18691C8.22696 6.91242 7.90634 6.76587 7.58301 6.76587C6.23681 6.76587 5.14551 5.67456 5.14551 4.32837C5.14551 2.98218 6.23681 1.89087 7.58301 1.89087C7.90634 1.89087 8.22696 1.74432 8.39783 1.46983C8.40538 1.45769 8.41299 1.44558 8.42064 1.4335C8.70512 0.984452 8.56098 0.348636 8.03259 0.290464C7.88497 0.274212 7.73496 0.265869 7.58301 0.265869C5.33935 0.265869 3.52051 2.08471 3.52051 4.32837C3.52051 6.57203 5.33935 8.39087 7.58301 8.39087C7.73496 8.39087 7.88497 8.38253 8.03259 8.36627C8.56098 8.3081 8.70512 7.67229 8.42064 7.22323C8.41299 7.21116 8.40538 7.19905 8.39783 7.18691Z"
                            fill={
                              location.pathname == "/parent/players"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                          <path
                            d="M5.10032 15.7758C4.97734 15.5706 4.76027 15.4325 4.52106 15.4325H4.33301C2.98681 15.4325 1.89551 14.3412 1.89551 12.995C1.89551 11.6488 2.98681 10.5575 4.33301 10.5575H4.52106C4.76027 10.5575 4.97734 10.4194 5.10032 10.2143C5.40051 9.71343 5.07475 8.93254 4.49084 8.93254H4.33301C2.08935 8.93254 0.270508 10.7514 0.270508 12.995C0.270508 15.2387 2.08935 17.0575 4.33301 17.0575H4.49084C5.07475 17.0575 5.40051 16.2766 5.10032 15.7758Z"
                            fill={
                              location.pathname == "/parent/players"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                          <path
                            d="M17.5787 7.22323C17.2942 7.67229 17.4384 8.3081 17.9668 8.36627C18.1144 8.38253 18.2644 8.39087 18.4163 8.39087C20.66 8.39087 22.4788 6.57203 22.4788 4.32837C22.4788 2.08471 20.66 0.265869 18.4163 0.265869C18.2644 0.265869 18.1144 0.274212 17.9668 0.290464C17.4384 0.348637 17.2942 0.984452 17.5787 1.4335C17.5864 1.44558 17.594 1.45769 17.6015 1.46982C17.7724 1.74432 18.093 1.89087 18.4163 1.89087C19.7625 1.89087 20.8538 2.98218 20.8538 4.32837C20.8538 5.67456 19.7625 6.76587 18.4163 6.76587C18.093 6.76587 17.7724 6.91242 17.6015 7.18691C17.594 7.19905 17.5864 7.21116 17.5787 7.22323Z"
                            fill={ location.pathname == "/parent/players" ? "url(#paint1_linear_2634_1362)" : "#fff" }
                          />
                          <path
                            d="M20.899 15.7758C20.5988 16.2766 20.9246 17.0575 21.5085 17.0575H21.6663C23.91 17.0575 25.7288 15.2387 25.7288 12.995C25.7288 10.7514 23.91 8.93254 21.6663 8.93254H21.5085C20.9246 8.93254 20.5988 9.71343 20.899 10.2143C21.022 10.4194 21.2391 10.5575 21.4783 10.5575H21.6663C23.0125 10.5575 24.1038 11.6488 24.1038 12.995C24.1038 14.3412 23.0125 15.4325 21.6663 15.4325H21.4783C21.2391 15.4325 21.022 15.5706 20.899 15.7758Z"
                            fill={
                              location.pathname == "/parent/players"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                        </svg>
                        <p
                          className={
                            location.pathname == "/parent/players" &&
                            "grdiant-text"
                          }
                        >
                          Players
                        </p>
                      </div>
                    )}

                    {userRole == "Coach" && (
                      <div
                        onClick={() => navigate("/coach/players")}
                        className="menu-item"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="19"
                          viewBox="0 0 26 19"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12.9997 0.265869C10.756 0.265869 8.93717 2.08471 8.93717 4.32837C8.93717 6.57203 10.756 8.39087 12.9997 8.39087C15.2433 8.39087 17.0622 6.57203 17.0622 4.32837C17.0622 2.08471 15.2433 0.265869 12.9997 0.265869ZM10.5622 4.32837C10.5622 2.98218 11.6535 1.89087 12.9997 1.89087C14.3459 1.89087 15.4372 2.98218 15.4372 4.32837C15.4372 5.67456 14.3459 6.76587 12.9997 6.76587C11.6535 6.76587 10.5622 5.67456 10.5622 4.32837Z"
                            fill={
                              location.pathname == "/coach/players"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9.74967 10.0159C7.50602 10.0159 5.68717 11.8347 5.68717 14.0784C5.68717 16.322 7.50602 18.1409 9.74967 18.1409H16.2497C18.4933 18.1409 20.3122 16.322 20.3122 14.0784C20.3122 11.8347 18.4933 10.0159 16.2497 10.0159H9.74967ZM7.31217 14.0784C7.31217 12.7322 8.40348 11.6409 9.74967 11.6409H16.2497C17.5959 11.6409 18.6872 12.7322 18.6872 14.0784C18.6872 15.4246 17.5959 16.5159 16.2497 16.5159H9.74967C8.40348 16.5159 7.31217 15.4246 7.31217 14.0784Z"
                            fill={
                              location.pathname == "/coach/players"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                          <path
                            d="M8.39783 7.18691C8.22696 6.91242 7.90634 6.76587 7.58301 6.76587C6.23681 6.76587 5.14551 5.67456 5.14551 4.32837C5.14551 2.98218 6.23681 1.89087 7.58301 1.89087C7.90634 1.89087 8.22696 1.74432 8.39783 1.46983C8.40538 1.45769 8.41299 1.44558 8.42064 1.4335C8.70512 0.984452 8.56098 0.348636 8.03259 0.290464C7.88497 0.274212 7.73496 0.265869 7.58301 0.265869C5.33935 0.265869 3.52051 2.08471 3.52051 4.32837C3.52051 6.57203 5.33935 8.39087 7.58301 8.39087C7.73496 8.39087 7.88497 8.38253 8.03259 8.36627C8.56098 8.3081 8.70512 7.67229 8.42064 7.22323C8.41299 7.21116 8.40538 7.19905 8.39783 7.18691Z"
                            fill={
                              location.pathname == "/coach/players"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                          <path
                            d="M5.10032 15.7758C4.97734 15.5706 4.76027 15.4325 4.52106 15.4325H4.33301C2.98681 15.4325 1.89551 14.3412 1.89551 12.995C1.89551 11.6488 2.98681 10.5575 4.33301 10.5575H4.52106C4.76027 10.5575 4.97734 10.4194 5.10032 10.2143C5.40051 9.71343 5.07475 8.93254 4.49084 8.93254H4.33301C2.08935 8.93254 0.270508 10.7514 0.270508 12.995C0.270508 15.2387 2.08935 17.0575 4.33301 17.0575H4.49084C5.07475 17.0575 5.40051 16.2766 5.10032 15.7758Z"
                            fill={
                              location.pathname == "/coach/players"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                          <path
                            d="M17.5787 7.22323C17.2942 7.67229 17.4384 8.3081 17.9668 8.36627C18.1144 8.38253 18.2644 8.39087 18.4163 8.39087C20.66 8.39087 22.4788 6.57203 22.4788 4.32837C22.4788 2.08471 20.66 0.265869 18.4163 0.265869C18.2644 0.265869 18.1144 0.274212 17.9668 0.290464C17.4384 0.348637 17.2942 0.984452 17.5787 1.4335C17.5864 1.44558 17.594 1.45769 17.6015 1.46982C17.7724 1.74432 18.093 1.89087 18.4163 1.89087C19.7625 1.89087 20.8538 2.98218 20.8538 4.32837C20.8538 5.67456 19.7625 6.76587 18.4163 6.76587C18.093 6.76587 17.7724 6.91242 17.6015 7.18691C17.594 7.19905 17.5864 7.21116 17.5787 7.22323Z"
                            fill={
                              location.pathname == "/coach/players"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                          <path
                            d="M20.899 15.7758C20.5988 16.2766 20.9246 17.0575 21.5085 17.0575H21.6663C23.91 17.0575 25.7288 15.2387 25.7288 12.995C25.7288 10.7514 23.91 8.93254 21.6663 8.93254H21.5085C20.9246 8.93254 20.5988 9.71343 20.899 10.2143C21.022 10.4194 21.2391 10.5575 21.4783 10.5575H21.6663C23.0125 10.5575 24.1038 11.6488 24.1038 12.995C24.1038 14.3412 23.0125 15.4325 21.6663 15.4325H21.4783C21.2391 15.4325 21.022 15.5706 20.899 15.7758Z"
                            fill={
                              location.pathname == "/coach/players"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                        </svg>
                        <p
                          className={
                            location.pathname == "/coach/players" &&
                            "grdiant-text"
                          }
                        >
                          Players
                        </p>
                      </div>
                    )}

                    {userRole == "Coach" && (
                      <div
                        onClick={() => navigate("/coach/teams")}
                        className="menu-item"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="19"
                          viewBox="0 0 26 19"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12.9997 0.265869C10.756 0.265869 8.93717 2.08471 8.93717 4.32837C8.93717 6.57203 10.756 8.39087 12.9997 8.39087C15.2433 8.39087 17.0622 6.57203 17.0622 4.32837C17.0622 2.08471 15.2433 0.265869 12.9997 0.265869ZM10.5622 4.32837C10.5622 2.98218 11.6535 1.89087 12.9997 1.89087C14.3459 1.89087 15.4372 2.98218 15.4372 4.32837C15.4372 5.67456 14.3459 6.76587 12.9997 6.76587C11.6535 6.76587 10.5622 5.67456 10.5622 4.32837Z"
                            fill={
                              location.pathname == "/coach/teams"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9.74967 10.0159C7.50602 10.0159 5.68717 11.8347 5.68717 14.0784C5.68717 16.322 7.50602 18.1409 9.74967 18.1409H16.2497C18.4933 18.1409 20.3122 16.322 20.3122 14.0784C20.3122 11.8347 18.4933 10.0159 16.2497 10.0159H9.74967ZM7.31217 14.0784C7.31217 12.7322 8.40348 11.6409 9.74967 11.6409H16.2497C17.5959 11.6409 18.6872 12.7322 18.6872 14.0784C18.6872 15.4246 17.5959 16.5159 16.2497 16.5159H9.74967C8.40348 16.5159 7.31217 15.4246 7.31217 14.0784Z"
                            fill={
                              location.pathname == "/coach/teams"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                          <path
                            d="M8.39783 7.18691C8.22696 6.91242 7.90634 6.76587 7.58301 6.76587C6.23681 6.76587 5.14551 5.67456 5.14551 4.32837C5.14551 2.98218 6.23681 1.89087 7.58301 1.89087C7.90634 1.89087 8.22696 1.74432 8.39783 1.46983C8.40538 1.45769 8.41299 1.44558 8.42064 1.4335C8.70512 0.984452 8.56098 0.348636 8.03259 0.290464C7.88497 0.274212 7.73496 0.265869 7.58301 0.265869C5.33935 0.265869 3.52051 2.08471 3.52051 4.32837C3.52051 6.57203 5.33935 8.39087 7.58301 8.39087C7.73496 8.39087 7.88497 8.38253 8.03259 8.36627C8.56098 8.3081 8.70512 7.67229 8.42064 7.22323C8.41299 7.21116 8.40538 7.19905 8.39783 7.18691Z"
                            fill={
                              location.pathname == "/coach/teams"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                          <path
                            d="M5.10032 15.7758C4.97734 15.5706 4.76027 15.4325 4.52106 15.4325H4.33301C2.98681 15.4325 1.89551 14.3412 1.89551 12.995C1.89551 11.6488 2.98681 10.5575 4.33301 10.5575H4.52106C4.76027 10.5575 4.97734 10.4194 5.10032 10.2143C5.40051 9.71343 5.07475 8.93254 4.49084 8.93254H4.33301C2.08935 8.93254 0.270508 10.7514 0.270508 12.995C0.270508 15.2387 2.08935 17.0575 4.33301 17.0575H4.49084C5.07475 17.0575 5.40051 16.2766 5.10032 15.7758Z"
                            fill={
                              location.pathname == "/coach/teams"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                          <path
                            d="M17.5787 7.22323C17.2942 7.67229 17.4384 8.3081 17.9668 8.36627C18.1144 8.38253 18.2644 8.39087 18.4163 8.39087C20.66 8.39087 22.4788 6.57203 22.4788 4.32837C22.4788 2.08471 20.66 0.265869 18.4163 0.265869C18.2644 0.265869 18.1144 0.274212 17.9668 0.290464C17.4384 0.348637 17.2942 0.984452 17.5787 1.4335C17.5864 1.44558 17.594 1.45769 17.6015 1.46982C17.7724 1.74432 18.093 1.89087 18.4163 1.89087C19.7625 1.89087 20.8538 2.98218 20.8538 4.32837C20.8538 5.67456 19.7625 6.76587 18.4163 6.76587C18.093 6.76587 17.7724 6.91242 17.6015 7.18691C17.594 7.19905 17.5864 7.21116 17.5787 7.22323Z"
                            fill={
                              location.pathname == "/coach/teams"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                          <path
                            d="M20.899 15.7758C20.5988 16.2766 20.9246 17.0575 21.5085 17.0575H21.6663C23.91 17.0575 25.7288 15.2387 25.7288 12.995C25.7288 10.7514 23.91 8.93254 21.6663 8.93254H21.5085C20.9246 8.93254 20.5988 9.71343 20.899 10.2143C21.022 10.4194 21.2391 10.5575 21.4783 10.5575H21.6663C23.0125 10.5575 24.1038 11.6488 24.1038 12.995C24.1038 14.3412 23.0125 15.4325 21.6663 15.4325H21.4783C21.2391 15.4325 21.022 15.5706 20.899 15.7758Z"
                            fill={
                              location.pathname == "/coach/teams"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                        </svg>
                        <p
                          className={
                            location.pathname == "/coach/teams" &&
                            "grdiant-text"
                          }
                        >
                          Teams
                        </p>
                      </div>
                    )}

                    {(userRole == "Athlete" || userRole == "Athletes") && (
                      <div
                        onClick={() => navigate("/athletes/requests")}
                        className="menu-item"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="19"
                          viewBox="0 0 26 19"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12.9997 0.265869C10.756 0.265869 8.93717 2.08471 8.93717 4.32837C8.93717 6.57203 10.756 8.39087 12.9997 8.39087C15.2433 8.39087 17.0622 6.57203 17.0622 4.32837C17.0622 2.08471 15.2433 0.265869 12.9997 0.265869ZM10.5622 4.32837C10.5622 2.98218 11.6535 1.89087 12.9997 1.89087C14.3459 1.89087 15.4372 2.98218 15.4372 4.32837C15.4372 5.67456 14.3459 6.76587 12.9997 6.76587C11.6535 6.76587 10.5622 5.67456 10.5622 4.32837Z"
                            fill={
                              location.pathname == "/athletes/requests"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9.74967 10.0159C7.50602 10.0159 5.68717 11.8347 5.68717 14.0784C5.68717 16.322 7.50602 18.1409 9.74967 18.1409H16.2497C18.4933 18.1409 20.3122 16.322 20.3122 14.0784C20.3122 11.8347 18.4933 10.0159 16.2497 10.0159H9.74967ZM7.31217 14.0784C7.31217 12.7322 8.40348 11.6409 9.74967 11.6409H16.2497C17.5959 11.6409 18.6872 12.7322 18.6872 14.0784C18.6872 15.4246 17.5959 16.5159 16.2497 16.5159H9.74967C8.40348 16.5159 7.31217 15.4246 7.31217 14.0784Z"
                            fill={
                              location.pathname == "/athletes/requests"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                          <path
                            d="M8.39783 7.18691C8.22696 6.91242 7.90634 6.76587 7.58301 6.76587C6.23681 6.76587 5.14551 5.67456 5.14551 4.32837C5.14551 2.98218 6.23681 1.89087 7.58301 1.89087C7.90634 1.89087 8.22696 1.74432 8.39783 1.46983C8.40538 1.45769 8.41299 1.44558 8.42064 1.4335C8.70512 0.984452 8.56098 0.348636 8.03259 0.290464C7.88497 0.274212 7.73496 0.265869 7.58301 0.265869C5.33935 0.265869 3.52051 2.08471 3.52051 4.32837C3.52051 6.57203 5.33935 8.39087 7.58301 8.39087C7.73496 8.39087 7.88497 8.38253 8.03259 8.36627C8.56098 8.3081 8.70512 7.67229 8.42064 7.22323C8.41299 7.21116 8.40538 7.19905 8.39783 7.18691Z"
                            fill={
                              location.pathname == "/athletes/requests"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                          <path
                            d="M5.10032 15.7758C4.97734 15.5706 4.76027 15.4325 4.52106 15.4325H4.33301C2.98681 15.4325 1.89551 14.3412 1.89551 12.995C1.89551 11.6488 2.98681 10.5575 4.33301 10.5575H4.52106C4.76027 10.5575 4.97734 10.4194 5.10032 10.2143C5.40051 9.71343 5.07475 8.93254 4.49084 8.93254H4.33301C2.08935 8.93254 0.270508 10.7514 0.270508 12.995C0.270508 15.2387 2.08935 17.0575 4.33301 17.0575H4.49084C5.07475 17.0575 5.40051 16.2766 5.10032 15.7758Z"
                            fill={
                              location.pathname == "/athletes/requests"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                          <path
                            d="M17.5787 7.22323C17.2942 7.67229 17.4384 8.3081 17.9668 8.36627C18.1144 8.38253 18.2644 8.39087 18.4163 8.39087C20.66 8.39087 22.4788 6.57203 22.4788 4.32837C22.4788 2.08471 20.66 0.265869 18.4163 0.265869C18.2644 0.265869 18.1144 0.274212 17.9668 0.290464C17.4384 0.348637 17.2942 0.984452 17.5787 1.4335C17.5864 1.44558 17.594 1.45769 17.6015 1.46982C17.7724 1.74432 18.093 1.89087 18.4163 1.89087C19.7625 1.89087 20.8538 2.98218 20.8538 4.32837C20.8538 5.67456 19.7625 6.76587 18.4163 6.76587C18.093 6.76587 17.7724 6.91242 17.6015 7.18691C17.594 7.19905 17.5864 7.21116 17.5787 7.22323Z"
                            fill={
                              location.pathname == "/athletes/requests"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                          <path
                            d="M20.899 15.7758C20.5988 16.2766 20.9246 17.0575 21.5085 17.0575H21.6663C23.91 17.0575 25.7288 15.2387 25.7288 12.995C25.7288 10.7514 23.91 8.93254 21.6663 8.93254H21.5085C20.9246 8.93254 20.5988 9.71343 20.899 10.2143C21.022 10.4194 21.2391 10.5575 21.4783 10.5575H21.6663C23.0125 10.5575 24.1038 11.6488 24.1038 12.995C24.1038 14.3412 23.0125 15.4325 21.6663 15.4325H21.4783C21.2391 15.4325 21.022 15.5706 20.899 15.7758Z"
                            fill={
                              location.pathname == "/athletes/requests"
                                ? "url(#paint1_linear_2634_1362)"
                                : "#fff"
                            }
                          />
                        </svg>
                        <p
                          className={
                            location.pathname == "/athletes/requests" &&
                            "grdiant-text"
                          }
                        >
                          Requests
                        </p>
                      </div>
                    )} */}


                    <div ref={dropdownRef} className="menu-item hammad">
                      <div
                        onClick={() => toggle2()}
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
                        <p
                          className={dropdownOpen2 ? "grdiant-text" : "#fff"}
                        >
                          More
                        </p>
                      </div>
                      <div>
                        <Dropdown
                          isOpen={dropdownOpen2}
                          toggle={toggle2}
                          direction="down"
                          tag="span"
                        >
                          <DropdownMenu>
                            <div onClick={function noRefCheck1() { }}>

                              <div
                                onClick={() => {

                                  navigate("/parent/profile");
                                  toggle2()
                                }}
                                className="more-item d-flex  align-items-center justify-content-between"
                              >
                                <div className="d-flex align-items-center ">
                                  <svg
                                    className="me-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="19"
                                    viewBox="0 0 20 19"
                                    fill="none"
                                  >
                                    <path
                                      d="M13.3337 8.41699C12.9194 8.41699 12.5837 8.75278 12.5837 9.16699C12.5837 9.58121 12.9194 9.91699 13.3337 9.91699V8.41699ZM18.3337 9.91699C18.7479 9.91699 19.0837 9.58121 19.0837 9.16699C19.0837 8.75278 18.7479 8.41699 18.3337 8.41699V9.91699ZM15.0837 11.667C15.0837 12.0812 15.4194 12.417 15.8337 12.417C16.2479 12.417 16.5837 12.0812 16.5837 11.667H15.0837ZM16.5837 6.66699C16.5837 6.25278 16.2479 5.91699 15.8337 5.91699C15.4194 5.91699 15.0837 6.25278 15.0837 6.66699H16.5837ZM10.0837 5.00033C10.0837 6.42706 8.92706 7.58366 7.50033 7.58366V9.08366C9.75549 9.08366 11.5837 7.25549 11.5837 5.00033H10.0837ZM7.50033 7.58366C6.07359 7.58366 4.91699 6.42706 4.91699 5.00033H3.41699C3.41699 7.25549 5.24516 9.08366 7.50033 9.08366V7.58366ZM4.91699 5.00033C4.91699 3.57359 6.07359 2.41699 7.50033 2.41699V0.916992C5.24516 0.916992 3.41699 2.74516 3.41699 5.00033H4.91699ZM7.50033 2.41699C8.92706 2.41699 10.0837 3.57359 10.0837 5.00033H11.5837C11.5837 2.74516 9.75549 0.916992 7.50033 0.916992V2.41699ZM5.00033 11.5837H10.0003V10.0837H5.00033V11.5837ZM10.0003 16.7503H5.00033V18.2503H10.0003V16.7503ZM5.00033 16.7503C3.57359 16.7503 2.41699 15.5937 2.41699 14.167H0.916992C0.916992 16.4222 2.74516 18.2503 5.00033 18.2503V16.7503ZM12.5837 14.167C12.5837 15.5937 11.4271 16.7503 10.0003 16.7503V18.2503C12.2555 18.2503 14.0837 16.4222 14.0837 14.167H12.5837ZM10.0003 11.5837C11.4271 11.5837 12.5837 12.7403 12.5837 14.167H14.0837C14.0837 11.9118 12.2555 10.0837 10.0003 10.0837V11.5837ZM5.00033 10.0837C2.74516 10.0837 0.916992 11.9118 0.916992 14.167H2.41699C2.41699 12.7403 3.57359 11.5837 5.00033 11.5837V10.0837ZM13.3337 9.91699H18.3337V8.41699H13.3337V9.91699ZM16.5837 11.667V9.16699H15.0837V11.667H16.5837ZM16.5837 9.16699V6.66699H15.0837V9.16699H16.5837Z"
                                      fill="white"
                                    />
                                  </svg>
                                  <label> My Profile </label>
                                </div>

                              </div>
                              <div
                                onClick={() => {
                                  {
                                    userRole === "Parent" ? navigate("/parent/requests") :
                                      userRole === "Athlete" ? navigate("/athlete/requests") :
                                        userRole === "Coach" ? navigate("/coach/requests") :
                                          userRole === "Recruiter" ? navigate("/recruiter/requests") :
                                            userRole === "Assistant" ? navigate("/coach/requests") :
                                              userRole === "Head" ? navigate("/coach/requests") :
                                                userRole === "Coach" ? navigate("/coach/requests") : null
                                  }
                                  toggle2()
                                }}
                                className="more-item d-flex  align-items-center justify-content-between"
                              >
                                <div className="d-flex align-items-center ">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    className='me-3'
                                    viewBox="0 0 26 19"
                                    fill="none"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M12.9997 0.265869C10.756 0.265869 8.93717 2.08471 8.93717 4.32837C8.93717 6.57203 10.756 8.39087 12.9997 8.39087C15.2433 8.39087 17.0622 6.57203 17.0622 4.32837C17.0622 2.08471 15.2433 0.265869 12.9997 0.265869ZM10.5622 4.32837C10.5622 2.98218 11.6535 1.89087 12.9997 1.89087C14.3459 1.89087 15.4372 2.98218 15.4372 4.32837C15.4372 5.67456 14.3459 6.76587 12.9997 6.76587C11.6535 6.76587 10.5622 5.67456 10.5622 4.32837Z"
                                      fill="#fff"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M9.74967 10.0159C7.50602 10.0159 5.68717 11.8347 5.68717 14.0784C5.68717 16.322 7.50602 18.1409 9.74967 18.1409H16.2497C18.4933 18.1409 20.3122 16.322 20.3122 14.0784C20.3122 11.8347 18.4933 10.0159 16.2497 10.0159H9.74967ZM7.31217 14.0784C7.31217 12.7322 8.40348 11.6409 9.74967 11.6409H16.2497C17.5959 11.6409 18.6872 12.7322 18.6872 14.0784C18.6872 15.4246 17.5959 16.5159 16.2497 16.5159H9.74967C8.40348 16.5159 7.31217 15.4246 7.31217 14.0784Z"
                                      fill={"#fff"
                                      }
                                    />
                                    <path
                                      d="M8.39783 7.18691C8.22696 6.91242 7.90634 6.76587 7.58301 6.76587C6.23681 6.76587 5.14551 5.67456 5.14551 4.32837C5.14551 2.98218 6.23681 1.89087 7.58301 1.89087C7.90634 1.89087 8.22696 1.74432 8.39783 1.46983C8.40538 1.45769 8.41299 1.44558 8.42064 1.4335C8.70512 0.984452 8.56098 0.348636 8.03259 0.290464C7.88497 0.274212 7.73496 0.265869 7.58301 0.265869C5.33935 0.265869 3.52051 2.08471 3.52051 4.32837C3.52051 6.57203 5.33935 8.39087 7.58301 8.39087C7.73496 8.39087 7.88497 8.38253 8.03259 8.36627C8.56098 8.3081 8.70512 7.67229 8.42064 7.22323C8.41299 7.21116 8.40538 7.19905 8.39783 7.18691Z"
                                      fill={"#fff"
                                      }
                                    />
                                    <path
                                      d="M5.10032 15.7758C4.97734 15.5706 4.76027 15.4325 4.52106 15.4325H4.33301C2.98681 15.4325 1.89551 14.3412 1.89551 12.995C1.89551 11.6488 2.98681 10.5575 4.33301 10.5575H4.52106C4.76027 10.5575 4.97734 10.4194 5.10032 10.2143C5.40051 9.71343 5.07475 8.93254 4.49084 8.93254H4.33301C2.08935 8.93254 0.270508 10.7514 0.270508 12.995C0.270508 15.2387 2.08935 17.0575 4.33301 17.0575H4.49084C5.07475 17.0575 5.40051 16.2766 5.10032 15.7758Z"
                                      fill={"#fff"
                                      }
                                    />
                                    <path
                                      d="M17.5787 7.22323C17.2942 7.67229 17.4384 8.3081 17.9668 8.36627C18.1144 8.38253 18.2644 8.39087 18.4163 8.39087C20.66 8.39087 22.4788 6.57203 22.4788 4.32837C22.4788 2.08471 20.66 0.265869 18.4163 0.265869C18.2644 0.265869 18.1144 0.274212 17.9668 0.290464C17.4384 0.348637 17.2942 0.984452 17.5787 1.4335C17.5864 1.44558 17.594 1.45769 17.6015 1.46982C17.7724 1.74432 18.093 1.89087 18.4163 1.89087C19.7625 1.89087 20.8538 2.98218 20.8538 4.32837C20.8538 5.67456 19.7625 6.76587 18.4163 6.76587C18.093 6.76587 17.7724 6.91242 17.6015 7.18691C17.594 7.19905 17.5864 7.21116 17.5787 7.22323Z"
                                      fill={"#fff"
                                      }
                                    />
                                    <path
                                      d="M20.899 15.7758C20.5988 16.2766 20.9246 17.0575 21.5085 17.0575H21.6663C23.91 17.0575 25.7288 15.2387 25.7288 12.995C25.7288 10.7514 23.91 8.93254 21.6663 8.93254H21.5085C20.9246 8.93254 20.5988 9.71343 20.899 10.2143C21.022 10.4194 21.2391 10.5575 21.4783 10.5575H21.6663C23.0125 10.5575 24.1038 11.6488 24.1038 12.995C24.1038 14.3412 23.0125 15.4325 21.6663 15.4325H21.4783C21.2391 15.4325 21.022 15.5706 20.899 15.7758Z"
                                      fill={"#fff"
                                      }
                                    />
                                  </svg>
                                  <label> Requests </label>
                                </div>

                              </div>

                              <div onClick={async () =>

                                await navigator.share({
                                  title: "Spot Me Id",
                                  text: "Spot Me Id",
                                  //selectedMessage && modal.activeTab === "images" && selectedMessage.content,
                                  url: "https://www.sportmeid.com",
                                })
                                // console.log("Shared successfully");
                              }
                                className="more-item d-flex  align-items-center justify-content-between">
                                <div className="d-flex align-items-center ">
                                  <svg
                                    className="me-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="22"
                                    viewBox="0 0 20 22"
                                    fill="none"
                                  >
                                    <path
                                      d="M13.9167 4.54199L5.52083 9.70866M5.52083 12.9378L13.9167 17.4587M13.9167 4.54199L5.52083 9.70866M5.52083 12.9378L13.9167 17.4587M6.16667 11.0003C6.16667 12.4271 5.01007 13.5837 3.58333 13.5837C2.1566 13.5837 1 12.4271 1 11.0003C1 9.57359 2.1566 8.41699 3.58333 8.41699C5.01007 8.41699 6.16667 9.57359 6.16667 11.0003ZM19.0833 3.25033C19.0833 4.67706 17.9267 5.83366 16.5 5.83366C15.0733 5.83366 13.9167 4.67706 13.9167 3.25033C13.9167 1.82359 15.0733 0.666992 16.5 0.666992C17.9267 0.666992 19.0833 1.82359 19.0833 3.25033ZM19.0833 18.7503C19.0833 20.1771 17.9267 21.3337 16.5 21.3337C15.0733 21.3337 13.9167 20.1771 13.9167 18.7503C13.9167 17.3236 15.0733 16.167 16.5 16.167C17.9267 16.167 19.0833 17.3236 19.0833 18.7503ZM6.16667 11.0003C6.16667 12.4271 5.01007 13.5837 3.58333 13.5837C2.1566 13.5837 1 12.4271 1 11.0003C1 9.57359 2.1566 8.41699 3.58333 8.41699C5.01007 8.41699 6.16667 9.57359 6.16667 11.0003Z"
                                      stroke="white"
                                      stroke-width="0.833333"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                  <label> Share App</label>
                                </div>
                              </div>

                              <div onClick={() => {
                                toggle2()
                                navigate("/privacy-policy")
                              }} className="more-item d-flex  align-items-center justify-content-between">
                                <div className="d-flex align-items-center ">
                                  <svg
                                    className="me-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="19"
                                    viewBox="0 0 18 19"
                                    fill="none"
                                  >
                                    <path
                                      d="M4.00033 8.00033V6.16699C4.00033 3.12942 6.2389 0.666992 9.00033 0.666992C11.7617 0.666992 14.0003 3.12942 14.0003 6.16699V8.00033M0.666992 13.3337C0.666992 10.9767 0.666992 9.79816 1.39923 9.06591C2.13146 8.33366 3.30997 8.33366 5.66699 8.33366H12.3337C14.6907 8.33366 15.8692 8.33366 16.6014 9.06591C17.3337 9.79816 17.3337 10.9767 17.3337 13.3337C17.3337 15.6907 17.3337 16.8692 16.6014 17.6014C15.8692 18.3337 14.6907 18.3337 12.3337 18.3337H5.66699C3.30997 18.3337 2.13146 18.3337 1.39923 17.6014C0.666992 16.8692 0.666992 15.6907 0.666992 13.3337Z"
                                      stroke="white"
                                      stroke-width="0.833333"
                                      stroke-linecap="round"
                                    />
                                  </svg>
                                  <label> Privacy Policy</label>
                                </div>
                              </div>

                              {
                                console.log(authinfo?.user?.data?.account_type)
                              }
                              {
                                authinfo?.user?.data?.account_type === "Email" && (
                                  <div
                                    onClick={() => {
                                      toggle2()
                                      navigate("/change-password")
                                    }}
                                    className="more-item d-flex  align-items-center justify-content-between"
                                  >
                                    <div className="d-flex align-items-center ">
                                      <svg
                                        className="me-3"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="19"
                                        viewBox="0 0 18 19"
                                        fill="none"
                                      >
                                        <path
                                          d="M4.00033 8.00033V6.16699C4.00033 3.12942 6.2389 0.666992 9.00033 0.666992C11.7617 0.666992 14.0003 3.12942 14.0003 6.16699V8.00033M0.666992 13.3337C0.666992 10.9767 0.666992 9.79816 1.39923 9.06591C2.13146 8.33366 3.30997 8.33366 5.66699 8.33366H12.3337C14.6907 8.33366 15.8692 8.33366 16.6014 9.06591C17.3337 9.79816 17.3337 10.9767 17.3337 13.3337C17.3337 15.6907 17.3337 16.8692 16.6014 17.6014C15.8692 18.3337 14.6907 18.3337 12.3337 18.3337H5.66699C3.30997 18.3337 2.13146 18.3337 1.39923 17.6014C0.666992 16.8692 0.666992 15.6907 0.666992 13.3337Z"
                                          stroke="white"
                                          stroke-width="0.833333"
                                          stroke-linecap="round"
                                        />
                                      </svg>
                                      <label> Change Password </label>
                                    </div>
                                  </div>
                                )
                              }

                              <div
                                onClick={() => {
                                  toggle2()
                                  navigate("/purchase-history")
                                }}
                                className="more-item d-flex  align-items-center justify-content-between"
                              >
                                <div className="d-flex align-items-center ">
                                  <svg
                                    className="me-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M6.81786 2.00028C5.26142 2.00028 4.33301 2.9287 4.33301 4.48513V19.5154C4.33301 21.0719 5.26142 22.0003 6.81786 22.0003H13.1687C12.9659 21.7308 12.7949 21.436 12.6616 21.1215H6.85826C6.33945 21.1215 5.16634 20.5003 5.2522 19.5154V4.48513C5.2522 3.50028 6.33945 2.87907 6.85826 2.87907H12.4138V8.24271C12.4138 9.17619 12.5877 9.17403 13.3782 9.16419C13.4663 9.16309 13.5622 9.1619 13.6663 9.1619H18.9896V16.1608C19.3435 16.4254 19.6541 16.7449 19.9088 17.1065V9.02093C19.9088 8.89737 19.912 8.78298 19.9151 8.67572C19.9305 8.13413 19.9408 7.77423 19.4997 7.33308L14.333 2.49975C13.8317 1.9984 13.6538 1.99877 12.9989 2.00013L12.8881 2.00028H6.81786ZM18.9338 8.24271L13.333 2.93485V8.24271H18.9338Z"
                                      fill="white"
                                    />
                                    <path
                                      d="M12.7497 19.4997C12.7497 17.4323 14.4322 15.7497 16.4997 15.7497C18.5671 15.7497 20.2497 17.4323 20.2497 19.4997C20.2497 21.567 18.5671 23.2497 16.4997 23.2497C14.4322 23.2497 12.7497 21.567 12.7497 19.4997Z"
                                      stroke="white"
                                      stroke-width="0.833333"
                                    />
                                    <path
                                      d="M16.4333 21.666C16.6727 21.666 16.8667 21.472 16.8667 21.2327V19.3994C16.8667 19.16 16.6727 18.966 16.4333 18.966C16.194 18.966 16 19.16 16 19.3994V21.2327C16 21.472 16.194 21.666 16.4333 21.666Z"
                                      fill="white"
                                    />
                                    <path
                                      d="M16 18.0993C16 18.3387 16.194 18.5327 16.4333 18.5327C16.6727 18.5327 16.8667 18.3387 16.8667 18.0993C16.8667 17.86 16.6727 17.666 16.4333 17.666C16.194 17.666 16 17.86 16 18.0993Z"
                                      fill="white"
                                    />
                                  </svg>
                                  <label> My Purchase History </label>
                                </div>
                              </div>

                              <div
                                onClick={() => {
                                  toggle2()
                                  navigate("/contact-form");
                                }}
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
                                      d="M20.6364 4.33301H3.36364C3.00227 4.33398 2.65598 4.47915 2.40046 4.7368C2.14494 4.99446 2.00096 5.34363 2 5.70801V17.6247C2 17.9893 2.14367 18.3391 2.3994 18.5969C2.65513 18.8548 3.00198 18.9997 3.36364 18.9997H20.6364C20.998 18.9997 21.3449 18.8548 21.6006 18.5969C21.8563 18.3391 22 17.9893 22 17.6247V5.70801C21.999 5.34363 21.8551 4.99446 21.5995 4.7368C21.344 4.47915 20.9977 4.33398 20.6364 4.33301ZM12 11.7305L3.65455 5.24967H20.3455L12 11.7305ZM9.41273 10.878L2.90909 17.434V5.82809L9.41273 10.878ZM10.1382 11.4418L12 12.8855L13.8618 11.4408L20.4482 18.083H3.55182L10.1382 11.4418ZM14.5873 10.8771L21.0909 5.82809V17.4349L14.5873 10.8771Z"
                                      fill="white"
                                    />
                                  </svg>
                                  <label> Contact</label>
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

                            <div className="inner-class-qr"></div>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </div>

                    <div
                      className={` me-3 ${userRole == "Athletes" || userRole == "Athlete"
                        ? `bell_icon2`
                        : `bell_icon`
                        }`}
                      style={{ position: "relative" }}
                      ref={dropdownRef2}
                    >
                      <div onClick={() => toggle()}>
                        <div
                          style={{
                            cursor: "pointer",
                            border: "2px solid #fff ",
                            borderColor: dropdownOpen
                              ? "transparent"
                              : "#fff",
                            borderRadius: "50%",
                            height: "25px",
                            width: "25px",
                            background: dropdownOpen
                              ? "var(--primary-grad-color1)"
                              : "transparent",
                          }}
                          className="d-flex align-items-center justify-content-center"
                        >
                          <FiBell
                            size={15}
                            color={dropdownOpen ? "grdiant-text" : "#fff"}
                          />
                        </div>
                      </div>

                      <Dropdown
                        isOpen={dropdownOpen}
                        toggle={toggle}
                        direction="down"
                        tag="span"
                      >
                        <DropdownMenu>
                          <div onClick={function noRefCheck() { }}>
                            <div className=" d-flex  align-items-center justify-content-between "></div>
                          </div>
                          <h6 className="pt-1 pb-2 d-flex justify-content-center">
                            Notifications
                          </h6>
                          <div>

                            <div className='noti_drop py-2'>
                              {/* {allNotifications?.getAllNotifications?.data?.map(
                                (item) => {
                                  return (
                                    <>
                                <div
                                  onClick={() => {
                                          if (userRole == "Athlete" || userRole == "Athletes") {
                                            navigate("/athletes/requests")
                                            setDropdownOpen(false)
                                          }
                                        }}
                                        className={`${""}  home_profile_card_min p-2 gray  d-flex align-items-center justify-content-between `}
                                        style={{
                                          cursor: "pointer",
                                          border: "none",
                                        }}
                                      >
                                        <img
                                          style={{
                                            borderRadius: "50%",
                                            height: "70px",
                                            width: "70px",
                                            objectFit: "cover",
                                          }}
                                          src={
                                            profile
                                            // currentChild?.player_id == item?.player_id
                                            //   ? `${import.meta.env.VITE_BASE_URL_IMAGE}${
                                            //       currentChild?.user?.picture
                                            //     }`
                                            //   : `${import.meta.env.VITE_BASE_URL_IMAGE}${
                                            //       item?.user?.picture
                                            //     }`
                                          }
                                        />
                                        <div>
                                          {hasUnread && (
                                            <h4
                                              className="d-flex px-2 py-1 "
                                              style={{
                                                width: "fit-content",
                                                fontSize: "12px",
                                                color: "#000",
                                                fontWeight: "600",
                                                borderRadius: "12px",
                                                background:
                                                  "var(--primary-grad-color1)",
                                              }}
                                            >
                                              new
                                            </h4>
                                          )}

                                          <h3
                                            className="py-1"
                                            style={{ fontSize: "16px" }}
                                          >
                                            {item?.sender?.full_name}
                                          </h3>
                                          <h4
                                            className="my-1"
                                            style={{ fontSize: "12px" }}
                                          >
                                            {item?.title}
                                          </h4>

                                        </div>
                                        <h4
                                          className="d-flex justify-content-end"
                                          style={{ fontSize: "12px" }}
                                        >
                                          14 mins
                                        </h4>
                                      </div>
                                    </>
                                  );
                                }
                              )} */}
                            </div>
                          </div>
                        </DropdownMenu>
                      </Dropdown>
                      {/* {hasUnread && (
                        <div
                          style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            height: "7px",
                            width: "7px",
                            backgroundColor: "red",
                            borderRadius: "50%",
                          }}
                        ></div>
                      )} */}
                    </div>

                    {/* {userRole == "Parent" && (
                      <div
                        onClick={() => {
                          dispatch(handleProfileType("Basic"))
                          navigate("/select-type")
                        }
                        }
                        style={{
                          cursor: "pointer",
                          border: "1px solid #fff",
                          borderRadius: "20px",
                          padding: "5px 10px",
                          fontSize: "14px",
                          color: "#fff",
                        }}
                        className="ms-2 create-new d-flex align-items-center"
                      >
                        <label className='text-nowrap' style={{ cursor: "pointer" }}>
                          New Profile
                        </label>
                        <svg
                          style={{ cursor: "pointer" }}
                          className="ms-2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="13"
                          viewBox="0 0 19 18"
                          fill="none"
                        >
                          <path
                            d="M13.1618 7.84961C12.7476 7.84961 12.4118 8.1854 12.4118 8.59961C12.4118 9.01382 12.7476 9.34961 13.1618 9.34961V7.84961ZM18.1618 9.34961C18.576 9.34961 18.9118 9.01382 18.9118 8.59961C18.9118 8.1854 18.576 7.84961 18.1618 7.84961V9.34961ZM14.9118 11.0996C14.9118 11.5138 15.2476 11.8496 15.6618 11.8496C16.076 11.8496 16.4118 11.5138 16.4118 11.0996H14.9118ZM16.4118 6.09961C16.4118 5.6854 16.076 5.34961 15.6618 5.34961C15.2476 5.34961 14.9118 5.6854 14.9118 6.09961H16.4118ZM9.91178 4.43294C9.91178 5.85968 8.75519 7.01628 7.32845 7.01628V8.51628C9.58361 8.51628 11.4118 6.68811 11.4118 4.43294H9.91178ZM7.32845 7.01628C5.90171 7.01628 4.74512 5.85968 4.74512 4.43294H3.24512C3.24512 6.68811 5.07329 8.51628 7.32845 8.51628V7.01628ZM4.74512 4.43294C4.74512 3.00621 5.90171 1.84961 7.32845 1.84961V0.349609C5.07329 0.349609 3.24512 2.17778 3.24512 4.43294H4.74512ZM7.32845 1.84961C8.75519 1.84961 9.91178 3.00621 9.91178 4.43294H11.4118C11.4118 2.17778 9.58361 0.349609 7.32845 0.349609V1.84961ZM4.82845 11.0163H9.82845V9.51628H4.82845V11.0163ZM9.82845 16.1829H4.82845V17.6829H9.82845V16.1829ZM4.82845 16.1829C3.40171 16.1829 2.24512 15.0263 2.24512 13.5996H0.745117C0.745117 15.8548 2.57329 17.6829 4.82845 17.6829V16.1829ZM12.4118 13.5996C12.4118 15.0263 11.2552 16.1829 9.82845 16.1829V17.6829C12.0836 17.6829 13.9118 15.8548 13.9118 13.5996H12.4118ZM9.82845 11.0163C11.2552 11.0163 12.4118 12.1729 12.4118 13.5996H13.9118C13.9118 11.3444 12.0836 9.51628 9.82845 9.51628V11.0163ZM4.82845 9.51628C2.57329 9.51628 0.745117 11.3444 0.745117 13.5996H2.24512C2.24512 12.1729 3.40172 11.0163 4.82845 11.0163V9.51628ZM13.1618 9.34961H18.1618V7.84961H13.1618V9.34961ZM16.4118 11.0996V8.59961H14.9118V11.0996H16.4118ZM16.4118 8.59961V6.09961H14.9118V8.59961H16.4118Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    )} */}
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
                    // onClick={() => {
                    //   (userRole == "Coach" && navigate("/coach/")) ||
                    //     (userRole == "Recruiter" &&
                    //       navigate("/recruiter/")) ||
                    //     (userRole == "Parent" && navigate("/parent/")) ||
                    //     (userRole == "Athlete" && navigate("/athletes/"));
                    // }}
                    style={{ cursor: "pointer" }}
                    className=" logo d-flex align-items-center"
                  >
                    <img src={logo} alt="" />
                    <h3>Sport me ID</h3>
                  </div>
                  <div></div>
                  <div className="menu">

                    <div
                      className={` ${userRole == "Athletes" || userRole == "Athlete"
                        ? `bell_icon2`
                        : `bell_icon`
                        }`}
                      style={{ position: "relative" }}
                    >
                      <div onClick={() => toggle()}>
                        <div
                          style={{
                            cursor: "pointer",
                            border: "2px solid #fff ",
                            borderColor: dropdownOpen
                              ? "transparent"
                              : "#fff",
                            borderRadius: "50%",
                            height: "25px",
                            width: "25px",
                            background: dropdownOpen
                              ? "var(--primary-grad-color1)"
                              : "transparent",
                          }}
                          className="d-flex align-items-center justify-content-center"
                        >
                          <FiBell
                            size={15}
                            color={dropdownOpen ? "grdiant-text" : "#fff"}
                          />
                        </div>
                      </div>

                      <Dropdown
                        isOpen={dropdownOpen}
                        toggle={toggle}
                        direction="down"
                        tag="span"
                      >
                        <DropdownMenu>
                          <div onClick={function noRefCheck() { }}>
                            <div className=" d-flex  align-items-center justify-content-between "></div>
                          </div>
                          <h6 className="pt-1 pb-2 d-flex justify-content-center">
                            Notifications
                          </h6>
                          <div>

                            <div className='noti_drop py-2'>
                              {/* {allNotifications?.getAllNotifications?.data?.map(
                                (item) => {
                                  return (
                                    <>
                                      <div
                                        onClick={() => {
                                          if (userRole == "Athlete" || userRole == "Athletes") {
                                            navigate("/athletes/requests")
                                            setDropdownOpen(false)
                                          }
                                        }}
                                        className={`${""}  home_profile_card_min p-2 gray  d-flex align-items-center justify-content-between `}
                                        style={{
                                          cursor: "pointer",
                                          border: "none",
                                        }}
                                      >
                                        <img
                                          style={{
                                            borderRadius: "50%",
                                            height: "70px",
                                            width: "70px",
                                            objectFit: "cover",
                                          }}
                                          src={
                                            profile
                                            // currentChild?.player_id == item?.player_id
                                            //   ? `${import.meta.env.VITE_BASE_URL_IMAGE}${
                                            //       currentChild?.user?.picture
                                            //     }`
                                            //   : `${import.meta.env.VITE_BASE_URL_IMAGE}${
                                            //       item?.user?.picture
                                            //     }`
                                          }
                                        />
                                        <div>
                                          {hasUnread && (
                                            <h4
                                              className="d-flex px-2 py-1 "
                                              style={{
                                                width: "fit-content",
                                                fontSize: "12px",
                                                color: "#000",
                                                fontWeight: "600",
                                                borderRadius: "12px",
                                                background:
                                                  "var(--primary-grad-color1)",
                                              }}
                                            >
                                              new
                                            </h4>
                                          )}

                                          <h3
                                            className="py-1"
                                            style={{ fontSize: "16px" }}
                                          >
                                            {item?.sender?.full_name}
                                          </h3>
                                          <h4
                                            className="my-1"
                                            style={{ fontSize: "12px" }}
                                          >
                                            {item?.title}
                                          </h4>

                                        </div>
                                        <h4
                                          className="d-flex justify-content-end"
                                          style={{ fontSize: "12px" }}
                                        >
                                          14 mins
                                        </h4>
                                      </div>
                                    </>
                                  );
                                }
                              )} */}
                            </div>
                          </div>
                        </DropdownMenu>
                      </Dropdown>
                      {/* {hasUnread && (
                        <div
                          style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            height: "7px",
                            width: "7px",
                            backgroundColor: "red",
                            borderRadius: "50%",
                          }}
                        ></div>
                      )} */}
                    </div>

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
                      <div>
                        <Dropdown
                          isOpen={dropdownOpen2}
                          toggle={toggle2}
                          direction="down"
                          tag="span"
                        >
                          <DropdownMenu>
                            <div onClick={function noRefCheck() { }}>

                              <div
                                onClick={() => {
                                  toggle2()
                                  navigate("/parent/profile");
                                }}
                                className="more-item d-flex  align-items-center justify-content-between"
                              >
                                <div className="d-flex align-items-center ">
                                  <svg
                                    className="me-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="19"
                                    viewBox="0 0 20 19"
                                    fill="none"
                                  >
                                    <path
                                      d="M13.3337 8.41699C12.9194 8.41699 12.5837 8.75278 12.5837 9.16699C12.5837 9.58121 12.9194 9.91699 13.3337 9.91699V8.41699ZM18.3337 9.91699C18.7479 9.91699 19.0837 9.58121 19.0837 9.16699C19.0837 8.75278 18.7479 8.41699 18.3337 8.41699V9.91699ZM15.0837 11.667C15.0837 12.0812 15.4194 12.417 15.8337 12.417C16.2479 12.417 16.5837 12.0812 16.5837 11.667H15.0837ZM16.5837 6.66699C16.5837 6.25278 16.2479 5.91699 15.8337 5.91699C15.4194 5.91699 15.0837 6.25278 15.0837 6.66699H16.5837ZM10.0837 5.00033C10.0837 6.42706 8.92706 7.58366 7.50033 7.58366V9.08366C9.75549 9.08366 11.5837 7.25549 11.5837 5.00033H10.0837ZM7.50033 7.58366C6.07359 7.58366 4.91699 6.42706 4.91699 5.00033H3.41699C3.41699 7.25549 5.24516 9.08366 7.50033 9.08366V7.58366ZM4.91699 5.00033C4.91699 3.57359 6.07359 2.41699 7.50033 2.41699V0.916992C5.24516 0.916992 3.41699 2.74516 3.41699 5.00033H4.91699ZM7.50033 2.41699C8.92706 2.41699 10.0837 3.57359 10.0837 5.00033H11.5837C11.5837 2.74516 9.75549 0.916992 7.50033 0.916992V2.41699ZM5.00033 11.5837H10.0003V10.0837H5.00033V11.5837ZM10.0003 16.7503H5.00033V18.2503H10.0003V16.7503ZM5.00033 16.7503C3.57359 16.7503 2.41699 15.5937 2.41699 14.167H0.916992C0.916992 16.4222 2.74516 18.2503 5.00033 18.2503V16.7503ZM12.5837 14.167C12.5837 15.5937 11.4271 16.7503 10.0003 16.7503V18.2503C12.2555 18.2503 14.0837 16.4222 14.0837 14.167H12.5837ZM10.0003 11.5837C11.4271 11.5837 12.5837 12.7403 12.5837 14.167H14.0837C14.0837 11.9118 12.2555 10.0837 10.0003 10.0837V11.5837ZM5.00033 10.0837C2.74516 10.0837 0.916992 11.9118 0.916992 14.167H2.41699C2.41699 12.7403 3.57359 11.5837 5.00033 11.5837V10.0837ZM13.3337 9.91699H18.3337V8.41699H13.3337V9.91699ZM16.5837 11.667V9.16699H15.0837V11.667H16.5837ZM16.5837 9.16699V6.66699H15.0837V9.16699H16.5837Z"
                                      fill="white"
                                    />
                                  </svg>
                                  <label> My Profile </label>
                                </div>

                              </div>


                              <div onClick={async () =>

                                await navigator.share({
                                  title: "Spot Me Id",
                                  text: "Spot Me Id",
                                  //selectedMessage && modal.activeTab === "images" && selectedMessage.content,
                                  url: "https://www.sportmeid.com",
                                })
                                // console.log("Shared successfully");
                              }
                                className="more-item d-flex  align-items-center justify-content-between">
                                <div className="d-flex align-items-center ">
                                  <svg
                                    className="me-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="22"
                                    viewBox="0 0 20 22"
                                    fill="none"
                                  >
                                    <path
                                      d="M13.9167 4.54199L5.52083 9.70866M5.52083 12.9378L13.9167 17.4587M13.9167 4.54199L5.52083 9.70866M5.52083 12.9378L13.9167 17.4587M6.16667 11.0003C6.16667 12.4271 5.01007 13.5837 3.58333 13.5837C2.1566 13.5837 1 12.4271 1 11.0003C1 9.57359 2.1566 8.41699 3.58333 8.41699C5.01007 8.41699 6.16667 9.57359 6.16667 11.0003ZM19.0833 3.25033C19.0833 4.67706 17.9267 5.83366 16.5 5.83366C15.0733 5.83366 13.9167 4.67706 13.9167 3.25033C13.9167 1.82359 15.0733 0.666992 16.5 0.666992C17.9267 0.666992 19.0833 1.82359 19.0833 3.25033ZM19.0833 18.7503C19.0833 20.1771 17.9267 21.3337 16.5 21.3337C15.0733 21.3337 13.9167 20.1771 13.9167 18.7503C13.9167 17.3236 15.0733 16.167 16.5 16.167C17.9267 16.167 19.0833 17.3236 19.0833 18.7503ZM6.16667 11.0003C6.16667 12.4271 5.01007 13.5837 3.58333 13.5837C2.1566 13.5837 1 12.4271 1 11.0003C1 9.57359 2.1566 8.41699 3.58333 8.41699C5.01007 8.41699 6.16667 9.57359 6.16667 11.0003Z"
                                      stroke="white"
                                      stroke-width="0.833333"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                  <label> Share App</label>
                                </div>
                              </div>

                              <div onClick={() => {
                                toggle2()
                                navigate("/privacy-policy")
                              }} className="more-item d-flex  align-items-center justify-content-between">
                                <div className="d-flex align-items-center ">
                                  <svg
                                    className="me-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="19"
                                    viewBox="0 0 18 19"
                                    fill="none"
                                  >
                                    <path
                                      d="M4.00033 8.00033V6.16699C4.00033 3.12942 6.2389 0.666992 9.00033 0.666992C11.7617 0.666992 14.0003 3.12942 14.0003 6.16699V8.00033M0.666992 13.3337C0.666992 10.9767 0.666992 9.79816 1.39923 9.06591C2.13146 8.33366 3.30997 8.33366 5.66699 8.33366H12.3337C14.6907 8.33366 15.8692 8.33366 16.6014 9.06591C17.3337 9.79816 17.3337 10.9767 17.3337 13.3337C17.3337 15.6907 17.3337 16.8692 16.6014 17.6014C15.8692 18.3337 14.6907 18.3337 12.3337 18.3337H5.66699C3.30997 18.3337 2.13146 18.3337 1.39923 17.6014C0.666992 16.8692 0.666992 15.6907 0.666992 13.3337Z"
                                      stroke="white"
                                      stroke-width="0.833333"
                                      stroke-linecap="round"
                                    />
                                  </svg>
                                  <label> Privacy Policy</label>
                                </div>
                              </div>

                              {
                                authinfo?.user?.data?.account_type === "Email" && (
                                  <div
                                    onClick={() => {
                                      toggle2()
                                      navigate("/change-password")
                                    }}
                                    className="more-item d-flex  align-items-center justify-content-between"
                                  >
                                    <div className="d-flex align-items-center ">
                                      <svg
                                        className="me-3"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="19"
                                        viewBox="0 0 18 19"
                                        fill="none"
                                      >
                                        <path
                                          d="M4.00033 8.00033V6.16699C4.00033 3.12942 6.2389 0.666992 9.00033 0.666992C11.7617 0.666992 14.0003 3.12942 14.0003 6.16699V8.00033M0.666992 13.3337C0.666992 10.9767 0.666992 9.79816 1.39923 9.06591C2.13146 8.33366 3.30997 8.33366 5.66699 8.33366H12.3337C14.6907 8.33366 15.8692 8.33366 16.6014 9.06591C17.3337 9.79816 17.3337 10.9767 17.3337 13.3337C17.3337 15.6907 17.3337 16.8692 16.6014 17.6014C15.8692 18.3337 14.6907 18.3337 12.3337 18.3337H5.66699C3.30997 18.3337 2.13146 18.3337 1.39923 17.6014C0.666992 16.8692 0.666992 15.6907 0.666992 13.3337Z"
                                          stroke="white"
                                          stroke-width="0.833333"
                                          stroke-linecap="round"
                                        />
                                      </svg>
                                      <label> Change Password </label>
                                    </div>
                                  </div>
                                )
                              }

                              <div
                                onClick={() => {
                                  toggle2()
                                  navigate("/purchase-history")
                                }}
                                className="more-item d-flex  align-items-center justify-content-between"
                              >
                                <div className="d-flex align-items-center ">
                                  <svg
                                    className="me-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M6.81786 2.00028C5.26142 2.00028 4.33301 2.9287 4.33301 4.48513V19.5154C4.33301 21.0719 5.26142 22.0003 6.81786 22.0003H13.1687C12.9659 21.7308 12.7949 21.436 12.6616 21.1215H6.85826C6.33945 21.1215 5.16634 20.5003 5.2522 19.5154V4.48513C5.2522 3.50028 6.33945 2.87907 6.85826 2.87907H12.4138V8.24271C12.4138 9.17619 12.5877 9.17403 13.3782 9.16419C13.4663 9.16309 13.5622 9.1619 13.6663 9.1619H18.9896V16.1608C19.3435 16.4254 19.6541 16.7449 19.9088 17.1065V9.02093C19.9088 8.89737 19.912 8.78298 19.9151 8.67572C19.9305 8.13413 19.9408 7.77423 19.4997 7.33308L14.333 2.49975C13.8317 1.9984 13.6538 1.99877 12.9989 2.00013L12.8881 2.00028H6.81786ZM18.9338 8.24271L13.333 2.93485V8.24271H18.9338Z"
                                      fill="white"
                                    />
                                    <path
                                      d="M12.7497 19.4997C12.7497 17.4323 14.4322 15.7497 16.4997 15.7497C18.5671 15.7497 20.2497 17.4323 20.2497 19.4997C20.2497 21.567 18.5671 23.2497 16.4997 23.2497C14.4322 23.2497 12.7497 21.567 12.7497 19.4997Z"
                                      stroke="white"
                                      stroke-width="0.833333"
                                    />
                                    <path
                                      d="M16.4333 21.666C16.6727 21.666 16.8667 21.472 16.8667 21.2327V19.3994C16.8667 19.16 16.6727 18.966 16.4333 18.966C16.194 18.966 16 19.16 16 19.3994V21.2327C16 21.472 16.194 21.666 16.4333 21.666Z"
                                      fill="white"
                                    />
                                    <path
                                      d="M16 18.0993C16 18.3387 16.194 18.5327 16.4333 18.5327C16.6727 18.5327 16.8667 18.3387 16.8667 18.0993C16.8667 17.86 16.6727 17.666 16.4333 17.666C16.194 17.666 16 17.86 16 18.0993Z"
                                      fill="white"
                                    />
                                  </svg>
                                  <label> My Purchase History </label>
                                </div>
                              </div>

                              <div
                                onClick={() => {
                                  toggle2()
                                  navigate("/contact-form");
                                }}
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
                                      d="M20.6364 4.33301H3.36364C3.00227 4.33398 2.65598 4.47915 2.40046 4.7368C2.14494 4.99446 2.00096 5.34363 2 5.70801V17.6247C2 17.9893 2.14367 18.3391 2.3994 18.5969C2.65513 18.8548 3.00198 18.9997 3.36364 18.9997H20.6364C20.998 18.9997 21.3449 18.8548 21.6006 18.5969C21.8563 18.3391 22 17.9893 22 17.6247V5.70801C21.999 5.34363 21.8551 4.99446 21.5995 4.7368C21.344 4.47915 20.9977 4.33398 20.6364 4.33301ZM12 11.7305L3.65455 5.24967H20.3455L12 11.7305ZM9.41273 10.878L2.90909 17.434V5.82809L9.41273 10.878ZM10.1382 11.4418L12 12.8855L13.8618 11.4408L20.4482 18.083H3.55182L10.1382 11.4418ZM14.5873 10.8771L21.0909 5.82809V17.4349L14.5873 10.8771Z"
                                      fill="white"
                                    />
                                  </svg>
                                  <label> Contact</label>
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

                            <div className="inner-class-qr"></div>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </div>



                    {/* {userRole == "Parent" && (
                      <div
                        onClick={() => {
                          dispatch(handleProfileType("Basic"))
                          navigate("/select-type")
                        }
                        }
                        style={{
                          cursor: "pointer",
                          border: "1px solid #fff",
                          borderRadius: "20px",
                          padding: "5px 10px",
                          fontSize: "14px",
                          color: "#fff",
                        }}
                        className="ms-2 create-new d-flex align-items-center"
                      >
                        <label className='text-nowrap' style={{ cursor: "pointer" }}>
                          New Profile
                        </label>
                        <svg
                          style={{ cursor: "pointer" }}
                          className="ms-2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="13"
                          viewBox="0 0 19 18"
                          fill="none"
                        >
                          <path
                            d="M13.1618 7.84961C12.7476 7.84961 12.4118 8.1854 12.4118 8.59961C12.4118 9.01382 12.7476 9.34961 13.1618 9.34961V7.84961ZM18.1618 9.34961C18.576 9.34961 18.9118 9.01382 18.9118 8.59961C18.9118 8.1854 18.576 7.84961 18.1618 7.84961V9.34961ZM14.9118 11.0996C14.9118 11.5138 15.2476 11.8496 15.6618 11.8496C16.076 11.8496 16.4118 11.5138 16.4118 11.0996H14.9118ZM16.4118 6.09961C16.4118 5.6854 16.076 5.34961 15.6618 5.34961C15.2476 5.34961 14.9118 5.6854 14.9118 6.09961H16.4118ZM9.91178 4.43294C9.91178 5.85968 8.75519 7.01628 7.32845 7.01628V8.51628C9.58361 8.51628 11.4118 6.68811 11.4118 4.43294H9.91178ZM7.32845 7.01628C5.90171 7.01628 4.74512 5.85968 4.74512 4.43294H3.24512C3.24512 6.68811 5.07329 8.51628 7.32845 8.51628V7.01628ZM4.74512 4.43294C4.74512 3.00621 5.90171 1.84961 7.32845 1.84961V0.349609C5.07329 0.349609 3.24512 2.17778 3.24512 4.43294H4.74512ZM7.32845 1.84961C8.75519 1.84961 9.91178 3.00621 9.91178 4.43294H11.4118C11.4118 2.17778 9.58361 0.349609 7.32845 0.349609V1.84961ZM4.82845 11.0163H9.82845V9.51628H4.82845V11.0163ZM9.82845 16.1829H4.82845V17.6829H9.82845V16.1829ZM4.82845 16.1829C3.40171 16.1829 2.24512 15.0263 2.24512 13.5996H0.745117C0.745117 15.8548 2.57329 17.6829 4.82845 17.6829V16.1829ZM12.4118 13.5996C12.4118 15.0263 11.2552 16.1829 9.82845 16.1829V17.6829C12.0836 17.6829 13.9118 15.8548 13.9118 13.5996H12.4118ZM9.82845 11.0163C11.2552 11.0163 12.4118 12.1729 12.4118 13.5996H13.9118C13.9118 11.3444 12.0836 9.51628 9.82845 9.51628V11.0163ZM4.82845 9.51628C2.57329 9.51628 0.745117 11.3444 0.745117 13.5996H2.24512C2.24512 12.1729 3.40172 11.0163 4.82845 11.0163V9.51628ZM13.1618 9.34961H18.1618V7.84961H13.1618V9.34961ZM16.4118 11.0996V8.59961H14.9118V11.0996H16.4118ZM16.4118 8.59961V6.09961H14.9118V8.59961H16.4118Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Offcanvas isOpen={isOpen} toggle={toggle1} style={{ backgroundColor: "#3C3C3C", color: "white" }}>
        <OffcanvasHeader toggle={toggle1} className='fw-bold'>
          Sport Me Id
        </OffcanvasHeader>
        <OffcanvasBody>
          <div className="menu d-flex flex-column gap-2">
            <div
              onClick={() => handleHomeClick()}
              className="more-item d-flex  align-items-center justify-content-between">
              <div className="d-flex align-items-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 23"
                  fill="none"
                  className='me-3'
                >
                  <path
                    d="M5.81777 3.31205C2.92872 5.41107 1.4842 6.46058 0.916849 8.01085C0.871337 8.13521 0.8304 8.2612 0.794123 8.38857C0.34189 9.97624 0.893649 11.6744 1.99717 15.0707C3.10069 18.4669 3.65245 20.1651 4.95152 21.1837C5.05573 21.2654 5.16291 21.3433 5.27283 21.4172C5.73503 21.7277 6.24449 21.9336 6.8538 22.0699V17.2373C6.8538 14.3954 9.15767 12.0915 11.9996 12.0915C14.8416 12.0915 17.1455 14.3954 17.1455 17.2373V22.07C17.7548 21.9336 18.2642 21.7277 18.7265 21.4172C18.8364 21.3433 18.9435 21.2654 19.0478 21.1837C20.3468 20.1651 20.8986 18.4669 22.0021 15.0707C23.1056 11.6744 23.6574 9.97624 23.2052 8.38857C23.1689 8.2612 23.1279 8.13521 23.0824 8.01085C22.5151 6.46058 21.0706 5.41108 18.1815 3.31206C15.2925 1.21305 13.8479 0.163526 12.1982 0.103006C12.0659 0.0981515 11.9334 0.0981515 11.8011 0.103006C10.1513 0.163526 8.70682 1.21304 5.81777 3.31205Z"
                    fill="#fff"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.5205 22.2787V17.2373C15.5205 15.2928 13.9441 13.7165 11.9996 13.7165C10.0551 13.7165 8.4788 15.2928 8.4788 17.2373V22.2787C9.4245 22.3379 10.5687 22.3379 11.9996 22.3379C13.4305 22.3379 14.5748 22.3379 15.5205 22.2787ZM12.8121 17.2373C12.8121 16.7886 12.4484 16.4248 11.9996 16.4248C11.5509 16.4248 11.1871 16.7886 11.1871 17.2373V19.404C11.1871 19.8527 11.5509 20.2165 11.9996 20.2165C12.4484 20.2165 12.8121 19.8527 12.8121 19.404V17.2373Z"
                    fill="#fff"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_2634_1362"
                      x1="0.637033"
                      y1="11.2195"
                      x2="23.364"
                      y2="11.2195"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#DDA027" />
                      <stop offset="0.3198" stop-color="#CE9B2B" />
                      <stop offset="0.6802" stop-color="#FEF48E" />
                      <stop offset="1" stop-color="#FFD046" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_2634_1362"
                      x1="0.637033"
                      y1="11.2195"
                      x2="23.364"
                      y2="11.2195"
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
                  Home
                </label>
              </div>
            </div>

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
              onClick={() => {
                toggle1()
                navigate("/faqs")
              }}
              className="more-item d-flex  align-items-center justify-content-between">
              <div className="d-flex align-items-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className='me-3'
                  viewBox="0 0 21 19"
                  fill="none"
                >
                  <path
                    d="M10.5488 0.931641C5.04883 0.931641 0.548828 4.53164 0.548828 8.93164C0.548828 11.1316 1.64883 13.1316 3.34883 14.4316C3.34883 15.0316 2.94883 16.6316 0.548828 18.9316C2.94883 18.8316 5.14883 17.9316 7.04883 16.4316C8.14883 16.7316 9.34883 16.9316 10.5488 16.9316C16.0488 16.9316 20.5488 13.3316 20.5488 8.93164C20.5488 4.53164 16.0488 0.931641 10.5488 0.931641ZM10.5488 14.9316C6.14883 14.9316 2.54883 12.2316 2.54883 8.93164C2.54883 5.63164 6.14883 2.93164 10.5488 2.93164C14.9488 2.93164 18.5488 5.63164 18.5488 8.93164C18.5488 12.2316 14.9488 14.9316 10.5488 14.9316ZM10.7488 4.43164C9.84883 4.43164 9.14883 4.63164 8.64883 4.93164C8.04883 5.33164 7.74883 5.93164 7.84883 6.63164H9.84883C9.84883 6.33164 9.94883 6.13164 10.1488 6.03164C10.3488 5.93164 10.5488 5.83164 10.8488 5.83164C11.1488 5.83164 11.4488 5.93164 11.6488 6.13164C11.8488 6.33164 11.9488 6.53164 11.9488 6.83164C11.9488 7.13164 11.8488 7.33164 11.7488 7.53164C11.5488 7.73164 11.3488 7.93164 11.1488 8.03164C10.6488 8.33164 10.2488 8.63164 10.0488 8.83164C9.64883 9.13164 9.54883 9.43164 9.54883 9.93164H11.5488C11.5488 9.63164 11.6488 9.43164 11.6488 9.23164C11.7488 9.03164 11.9488 8.93164 12.1488 8.73164C12.6488 8.53164 12.9488 8.23164 13.2488 7.83164C13.5488 7.43164 13.6488 7.03164 13.6488 6.63164C13.6488 5.93164 13.3488 5.33164 12.8488 4.93164C12.4488 4.63164 11.6488 4.43164 10.7488 4.43164ZM9.54883 10.9316V12.9316H11.5488V10.9316H9.54883Z"
                    fill="#fff"
                  />
                </svg>
                <label>
                  FAQ's
                </label>
              </div>
            </div>

            {userRole == "Parent" && (
              <div
                onClick={() => {
                  toggle1()
                  navigate("/parent/players")
                }}
                className="more-item d-flex  align-items-center justify-content-between">
                <div className="d-flex align-items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className='me-3'
                    viewBox="0 0 26 19"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.9997 0.265869C10.756 0.265869 8.93717 2.08471 8.93717 4.32837C8.93717 6.57203 10.756 8.39087 12.9997 8.39087C15.2433 8.39087 17.0622 6.57203 17.0622 4.32837C17.0622 2.08471 15.2433 0.265869 12.9997 0.265869ZM10.5622 4.32837C10.5622 2.98218 11.6535 1.89087 12.9997 1.89087C14.3459 1.89087 15.4372 2.98218 15.4372 4.32837C15.4372 5.67456 14.3459 6.76587 12.9997 6.76587C11.6535 6.76587 10.5622 5.67456 10.5622 4.32837Z"
                      fill="#fff"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.74967 10.0159C7.50602 10.0159 5.68717 11.8347 5.68717 14.0784C5.68717 16.322 7.50602 18.1409 9.74967 18.1409H16.2497C18.4933 18.1409 20.3122 16.322 20.3122 14.0784C20.3122 11.8347 18.4933 10.0159 16.2497 10.0159H9.74967ZM7.31217 14.0784C7.31217 12.7322 8.40348 11.6409 9.74967 11.6409H16.2497C17.5959 11.6409 18.6872 12.7322 18.6872 14.0784C18.6872 15.4246 17.5959 16.5159 16.2497 16.5159H9.74967C8.40348 16.5159 7.31217 15.4246 7.31217 14.0784Z"
                      fill={"#fff"
                      }
                    />
                    <path
                      d="M8.39783 7.18691C8.22696 6.91242 7.90634 6.76587 7.58301 6.76587C6.23681 6.76587 5.14551 5.67456 5.14551 4.32837C5.14551 2.98218 6.23681 1.89087 7.58301 1.89087C7.90634 1.89087 8.22696 1.74432 8.39783 1.46983C8.40538 1.45769 8.41299 1.44558 8.42064 1.4335C8.70512 0.984452 8.56098 0.348636 8.03259 0.290464C7.88497 0.274212 7.73496 0.265869 7.58301 0.265869C5.33935 0.265869 3.52051 2.08471 3.52051 4.32837C3.52051 6.57203 5.33935 8.39087 7.58301 8.39087C7.73496 8.39087 7.88497 8.38253 8.03259 8.36627C8.56098 8.3081 8.70512 7.67229 8.42064 7.22323C8.41299 7.21116 8.40538 7.19905 8.39783 7.18691Z"
                      fill={"#fff"
                      }
                    />
                    <path
                      d="M5.10032 15.7758C4.97734 15.5706 4.76027 15.4325 4.52106 15.4325H4.33301C2.98681 15.4325 1.89551 14.3412 1.89551 12.995C1.89551 11.6488 2.98681 10.5575 4.33301 10.5575H4.52106C4.76027 10.5575 4.97734 10.4194 5.10032 10.2143C5.40051 9.71343 5.07475 8.93254 4.49084 8.93254H4.33301C2.08935 8.93254 0.270508 10.7514 0.270508 12.995C0.270508 15.2387 2.08935 17.0575 4.33301 17.0575H4.49084C5.07475 17.0575 5.40051 16.2766 5.10032 15.7758Z"
                      fill={"#fff"
                      }
                    />
                    <path
                      d="M17.5787 7.22323C17.2942 7.67229 17.4384 8.3081 17.9668 8.36627C18.1144 8.38253 18.2644 8.39087 18.4163 8.39087C20.66 8.39087 22.4788 6.57203 22.4788 4.32837C22.4788 2.08471 20.66 0.265869 18.4163 0.265869C18.2644 0.265869 18.1144 0.274212 17.9668 0.290464C17.4384 0.348637 17.2942 0.984452 17.5787 1.4335C17.5864 1.44558 17.594 1.45769 17.6015 1.46982C17.7724 1.74432 18.093 1.89087 18.4163 1.89087C19.7625 1.89087 20.8538 2.98218 20.8538 4.32837C20.8538 5.67456 19.7625 6.76587 18.4163 6.76587C18.093 6.76587 17.7724 6.91242 17.6015 7.18691C17.594 7.19905 17.5864 7.21116 17.5787 7.22323Z"
                      fill={"#fff"
                      }
                    />
                    <path
                      d="M20.899 15.7758C20.5988 16.2766 20.9246 17.0575 21.5085 17.0575H21.6663C23.91 17.0575 25.7288 15.2387 25.7288 12.995C25.7288 10.7514 23.91 8.93254 21.6663 8.93254H21.5085C20.9246 8.93254 20.5988 9.71343 20.899 10.2143C21.022 10.4194 21.2391 10.5575 21.4783 10.5575H21.6663C23.0125 10.5575 24.1038 11.6488 24.1038 12.995C24.1038 14.3412 23.0125 15.4325 21.6663 15.4325H21.4783C21.2391 15.4325 21.022 15.5706 20.899 15.7758Z"
                      fill={"#fff"
                      }
                    />
                  </svg>
                  <label>
                    Athlete
                  </label>
                </div>
              </div>
            )}
            {(
              (userRole1 && userRole1 === "Head") ||
              (!userRole1 && ["Head", "Coach"].includes(userRole))
            ) && (
                <div
                  onClick={() => {
                    toggle1()
                    navigate("/coach/my-organization")
                  }}
                  className="more-item d-flex  align-items-center justify-content-between">
                  <div className="d-flex gap-3 align-items-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 7.79 14.21 6 12 6ZM12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12ZM12 16C9.33 16 4 17.34 4 20V22H20V20C20 17.34 14.67 16 12 16Z"
                        fill={"#fff"}
                      />
                    </svg>
                    <label>
                      Organization
                    </label>
                  </div>
                </div>

              )}


            {/* {userRole == "Coach" && (
              <div
                onClick={() => {
                  toggle1()
                  navigate("/coach/players")
                }}
                className="more-item d-flex  align-items-center justify-content-between">
                <div className="d-flex align-items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className='me-3'
                    viewBox="0 0 26 19"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.9997 0.265869C10.756 0.265869 8.93717 2.08471 8.93717 4.32837C8.93717 6.57203 10.756 8.39087 12.9997 8.39087C15.2433 8.39087 17.0622 6.57203 17.0622 4.32837C17.0622 2.08471 15.2433 0.265869 12.9997 0.265869ZM10.5622 4.32837C10.5622 2.98218 11.6535 1.89087 12.9997 1.89087C14.3459 1.89087 15.4372 2.98218 15.4372 4.32837C15.4372 5.67456 14.3459 6.76587 12.9997 6.76587C11.6535 6.76587 10.5622 5.67456 10.5622 4.32837Z"
                      fill="#fff"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.74967 10.0159C7.50602 10.0159 5.68717 11.8347 5.68717 14.0784C5.68717 16.322 7.50602 18.1409 9.74967 18.1409H16.2497C18.4933 18.1409 20.3122 16.322 20.3122 14.0784C20.3122 11.8347 18.4933 10.0159 16.2497 10.0159H9.74967ZM7.31217 14.0784C7.31217 12.7322 8.40348 11.6409 9.74967 11.6409H16.2497C17.5959 11.6409 18.6872 12.7322 18.6872 14.0784C18.6872 15.4246 17.5959 16.5159 16.2497 16.5159H9.74967C8.40348 16.5159 7.31217 15.4246 7.31217 14.0784Z"
                      fill={"#fff"
                      }
                    />
                    <path
                      d="M8.39783 7.18691C8.22696 6.91242 7.90634 6.76587 7.58301 6.76587C6.23681 6.76587 5.14551 5.67456 5.14551 4.32837C5.14551 2.98218 6.23681 1.89087 7.58301 1.89087C7.90634 1.89087 8.22696 1.74432 8.39783 1.46983C8.40538 1.45769 8.41299 1.44558 8.42064 1.4335C8.70512 0.984452 8.56098 0.348636 8.03259 0.290464C7.88497 0.274212 7.73496 0.265869 7.58301 0.265869C5.33935 0.265869 3.52051 2.08471 3.52051 4.32837C3.52051 6.57203 5.33935 8.39087 7.58301 8.39087C7.73496 8.39087 7.88497 8.38253 8.03259 8.36627C8.56098 8.3081 8.70512 7.67229 8.42064 7.22323C8.41299 7.21116 8.40538 7.19905 8.39783 7.18691Z"
                      fill={"#fff"
                      }
                    />
                    <path
                      d="M5.10032 15.7758C4.97734 15.5706 4.76027 15.4325 4.52106 15.4325H4.33301C2.98681 15.4325 1.89551 14.3412 1.89551 12.995C1.89551 11.6488 2.98681 10.5575 4.33301 10.5575H4.52106C4.76027 10.5575 4.97734 10.4194 5.10032 10.2143C5.40051 9.71343 5.07475 8.93254 4.49084 8.93254H4.33301C2.08935 8.93254 0.270508 10.7514 0.270508 12.995C0.270508 15.2387 2.08935 17.0575 4.33301 17.0575H4.49084C5.07475 17.0575 5.40051 16.2766 5.10032 15.7758Z"
                      fill={"#fff"
                      }
                    />
                    <path
                      d="M17.5787 7.22323C17.2942 7.67229 17.4384 8.3081 17.9668 8.36627C18.1144 8.38253 18.2644 8.39087 18.4163 8.39087C20.66 8.39087 22.4788 6.57203 22.4788 4.32837C22.4788 2.08471 20.66 0.265869 18.4163 0.265869C18.2644 0.265869 18.1144 0.274212 17.9668 0.290464C17.4384 0.348637 17.2942 0.984452 17.5787 1.4335C17.5864 1.44558 17.594 1.45769 17.6015 1.46982C17.7724 1.74432 18.093 1.89087 18.4163 1.89087C19.7625 1.89087 20.8538 2.98218 20.8538 4.32837C20.8538 5.67456 19.7625 6.76587 18.4163 6.76587C18.093 6.76587 17.7724 6.91242 17.6015 7.18691C17.594 7.19905 17.5864 7.21116 17.5787 7.22323Z"
                      fill={"#fff"
                      }
                    />
                    <path
                      d="M20.899 15.7758C20.5988 16.2766 20.9246 17.0575 21.5085 17.0575H21.6663C23.91 17.0575 25.7288 15.2387 25.7288 12.995C25.7288 10.7514 23.91 8.93254 21.6663 8.93254H21.5085C20.9246 8.93254 20.5988 9.71343 20.899 10.2143C21.022 10.4194 21.2391 10.5575 21.4783 10.5575H21.6663C23.0125 10.5575 24.1038 11.6488 24.1038 12.995C24.1038 14.3412 23.0125 15.4325 21.6663 15.4325H21.4783C21.2391 15.4325 21.022 15.5706 20.899 15.7758Z"
                      fill={"#fff"
                      }
                    />
                  </svg>
                  <label>
                    Players
                  </label>
                </div>
              </div>
            )}

            {userRole == "Coach" && (
              <div
                onClick={() => {
                  toggle1()
                  navigate("/coach/teams")
                }}
                className="more-item d-flex  align-items-center justify-content-between">
                <div className="d-flex align-items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className='me-3'
                    viewBox="0 0 26 19"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.9997 0.265869C10.756 0.265869 8.93717 2.08471 8.93717 4.32837C8.93717 6.57203 10.756 8.39087 12.9997 8.39087C15.2433 8.39087 17.0622 6.57203 17.0622 4.32837C17.0622 2.08471 15.2433 0.265869 12.9997 0.265869ZM10.5622 4.32837C10.5622 2.98218 11.6535 1.89087 12.9997 1.89087C14.3459 1.89087 15.4372 2.98218 15.4372 4.32837C15.4372 5.67456 14.3459 6.76587 12.9997 6.76587C11.6535 6.76587 10.5622 5.67456 10.5622 4.32837Z"
                      fill="#fff"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.74967 10.0159C7.50602 10.0159 5.68717 11.8347 5.68717 14.0784C5.68717 16.322 7.50602 18.1409 9.74967 18.1409H16.2497C18.4933 18.1409 20.3122 16.322 20.3122 14.0784C20.3122 11.8347 18.4933 10.0159 16.2497 10.0159H9.74967ZM7.31217 14.0784C7.31217 12.7322 8.40348 11.6409 9.74967 11.6409H16.2497C17.5959 11.6409 18.6872 12.7322 18.6872 14.0784C18.6872 15.4246 17.5959 16.5159 16.2497 16.5159H9.74967C8.40348 16.5159 7.31217 15.4246 7.31217 14.0784Z"
                      fill={"#fff"
                      }
                    />
                    <path
                      d="M8.39783 7.18691C8.22696 6.91242 7.90634 6.76587 7.58301 6.76587C6.23681 6.76587 5.14551 5.67456 5.14551 4.32837C5.14551 2.98218 6.23681 1.89087 7.58301 1.89087C7.90634 1.89087 8.22696 1.74432 8.39783 1.46983C8.40538 1.45769 8.41299 1.44558 8.42064 1.4335C8.70512 0.984452 8.56098 0.348636 8.03259 0.290464C7.88497 0.274212 7.73496 0.265869 7.58301 0.265869C5.33935 0.265869 3.52051 2.08471 3.52051 4.32837C3.52051 6.57203 5.33935 8.39087 7.58301 8.39087C7.73496 8.39087 7.88497 8.38253 8.03259 8.36627C8.56098 8.3081 8.70512 7.67229 8.42064 7.22323C8.41299 7.21116 8.40538 7.19905 8.39783 7.18691Z"
                      fill={"#fff"
                      }
                    />
                    <path
                      d="M5.10032 15.7758C4.97734 15.5706 4.76027 15.4325 4.52106 15.4325H4.33301C2.98681 15.4325 1.89551 14.3412 1.89551 12.995C1.89551 11.6488 2.98681 10.5575 4.33301 10.5575H4.52106C4.76027 10.5575 4.97734 10.4194 5.10032 10.2143C5.40051 9.71343 5.07475 8.93254 4.49084 8.93254H4.33301C2.08935 8.93254 0.270508 10.7514 0.270508 12.995C0.270508 15.2387 2.08935 17.0575 4.33301 17.0575H4.49084C5.07475 17.0575 5.40051 16.2766 5.10032 15.7758Z"
                      fill={"#fff"
                      }
                    />
                    <path
                      d="M17.5787 7.22323C17.2942 7.67229 17.4384 8.3081 17.9668 8.36627C18.1144 8.38253 18.2644 8.39087 18.4163 8.39087C20.66 8.39087 22.4788 6.57203 22.4788 4.32837C22.4788 2.08471 20.66 0.265869 18.4163 0.265869C18.2644 0.265869 18.1144 0.274212 17.9668 0.290464C17.4384 0.348637 17.2942 0.984452 17.5787 1.4335C17.5864 1.44558 17.594 1.45769 17.6015 1.46982C17.7724 1.74432 18.093 1.89087 18.4163 1.89087C19.7625 1.89087 20.8538 2.98218 20.8538 4.32837C20.8538 5.67456 19.7625 6.76587 18.4163 6.76587C18.093 6.76587 17.7724 6.91242 17.6015 7.18691C17.594 7.19905 17.5864 7.21116 17.5787 7.22323Z"
                      fill={"#fff"
                      }
                    />
                    <path
                      d="M20.899 15.7758C20.5988 16.2766 20.9246 17.0575 21.5085 17.0575H21.6663C23.91 17.0575 25.7288 15.2387 25.7288 12.995C25.7288 10.7514 23.91 8.93254 21.6663 8.93254H21.5085C20.9246 8.93254 20.5988 9.71343 20.899 10.2143C21.022 10.4194 21.2391 10.5575 21.4783 10.5575H21.6663C23.0125 10.5575 24.1038 11.6488 24.1038 12.995C24.1038 14.3412 23.0125 15.4325 21.6663 15.4325H21.4783C21.2391 15.4325 21.022 15.5706 20.899 15.7758Z"
                      fill={"#fff"
                      }
                    />
                  </svg>
                  <label>
                    Teams
                  </label>
                </div>
              </div>
            )}
              */}

            {(userRole == "Athlete" || userRole == "Athletes") && (
              <div
                onClick={() => {
                  toggle1()
                  navigate("/athlete/requests")
                }}
                className="more-item d-flex  align-items-center justify-content-between">
                <div className="d-flex align-items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className='me-3'
                    viewBox="0 0 26 19"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.9997 0.265869C10.756 0.265869 8.93717 2.08471 8.93717 4.32837C8.93717 6.57203 10.756 8.39087 12.9997 8.39087C15.2433 8.39087 17.0622 6.57203 17.0622 4.32837C17.0622 2.08471 15.2433 0.265869 12.9997 0.265869ZM10.5622 4.32837C10.5622 2.98218 11.6535 1.89087 12.9997 1.89087C14.3459 1.89087 15.4372 2.98218 15.4372 4.32837C15.4372 5.67456 14.3459 6.76587 12.9997 6.76587C11.6535 6.76587 10.5622 5.67456 10.5622 4.32837Z"
                      fill="#fff"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.74967 10.0159C7.50602 10.0159 5.68717 11.8347 5.68717 14.0784C5.68717 16.322 7.50602 18.1409 9.74967 18.1409H16.2497C18.4933 18.1409 20.3122 16.322 20.3122 14.0784C20.3122 11.8347 18.4933 10.0159 16.2497 10.0159H9.74967ZM7.31217 14.0784C7.31217 12.7322 8.40348 11.6409 9.74967 11.6409H16.2497C17.5959 11.6409 18.6872 12.7322 18.6872 14.0784C18.6872 15.4246 17.5959 16.5159 16.2497 16.5159H9.74967C8.40348 16.5159 7.31217 15.4246 7.31217 14.0784Z"
                      fill={"#fff"
                      }
                    />
                    <path
                      d="M8.39783 7.18691C8.22696 6.91242 7.90634 6.76587 7.58301 6.76587C6.23681 6.76587 5.14551 5.67456 5.14551 4.32837C5.14551 2.98218 6.23681 1.89087 7.58301 1.89087C7.90634 1.89087 8.22696 1.74432 8.39783 1.46983C8.40538 1.45769 8.41299 1.44558 8.42064 1.4335C8.70512 0.984452 8.56098 0.348636 8.03259 0.290464C7.88497 0.274212 7.73496 0.265869 7.58301 0.265869C5.33935 0.265869 3.52051 2.08471 3.52051 4.32837C3.52051 6.57203 5.33935 8.39087 7.58301 8.39087C7.73496 8.39087 7.88497 8.38253 8.03259 8.36627C8.56098 8.3081 8.70512 7.67229 8.42064 7.22323C8.41299 7.21116 8.40538 7.19905 8.39783 7.18691Z"
                      fill={"#fff"
                      }
                    />
                    <path
                      d="M5.10032 15.7758C4.97734 15.5706 4.76027 15.4325 4.52106 15.4325H4.33301C2.98681 15.4325 1.89551 14.3412 1.89551 12.995C1.89551 11.6488 2.98681 10.5575 4.33301 10.5575H4.52106C4.76027 10.5575 4.97734 10.4194 5.10032 10.2143C5.40051 9.71343 5.07475 8.93254 4.49084 8.93254H4.33301C2.08935 8.93254 0.270508 10.7514 0.270508 12.995C0.270508 15.2387 2.08935 17.0575 4.33301 17.0575H4.49084C5.07475 17.0575 5.40051 16.2766 5.10032 15.7758Z"
                      fill={"#fff"
                      }
                    />
                    <path
                      d="M17.5787 7.22323C17.2942 7.67229 17.4384 8.3081 17.9668 8.36627C18.1144 8.38253 18.2644 8.39087 18.4163 8.39087C20.66 8.39087 22.4788 6.57203 22.4788 4.32837C22.4788 2.08471 20.66 0.265869 18.4163 0.265869C18.2644 0.265869 18.1144 0.274212 17.9668 0.290464C17.4384 0.348637 17.2942 0.984452 17.5787 1.4335C17.5864 1.44558 17.594 1.45769 17.6015 1.46982C17.7724 1.74432 18.093 1.89087 18.4163 1.89087C19.7625 1.89087 20.8538 2.98218 20.8538 4.32837C20.8538 5.67456 19.7625 6.76587 18.4163 6.76587C18.093 6.76587 17.7724 6.91242 17.6015 7.18691C17.594 7.19905 17.5864 7.21116 17.5787 7.22323Z"
                      fill={"#fff"
                      }
                    />
                    <path
                      d="M20.899 15.7758C20.5988 16.2766 20.9246 17.0575 21.5085 17.0575H21.6663C23.91 17.0575 25.7288 15.2387 25.7288 12.995C25.7288 10.7514 23.91 8.93254 21.6663 8.93254H21.5085C20.9246 8.93254 20.5988 9.71343 20.899 10.2143C21.022 10.4194 21.2391 10.5575 21.4783 10.5575H21.6663C23.0125 10.5575 24.1038 11.6488 24.1038 12.995C24.1038 14.3412 23.0125 15.4325 21.6663 15.4325H21.4783C21.2391 15.4325 21.022 15.5706 20.899 15.7758Z"
                      fill={"#fff"
                      }
                    />
                  </svg>
                  <label>
                    Requests
                  </label>
                </div>
              </div>
            )}

            {/* {userRole == "Parent" && (
              <div
                onClick={() => {
                  toggle1()
                  dispatch(handleProfileType("Basic"))
                  navigate("/select-type")
                }
                }
                className="more-item d-flex  align-items-center justify-content-between">
                <div className="d-flex align-items-center ">
                  <svg
                    style={{ cursor: "pointer" }}
                    className="me-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 19 18"
                    fill="none"
                  >
                    <path
                      d="M13.1618 7.84961C12.7476 7.84961 12.4118 8.1854 12.4118 8.59961C12.4118 9.01382 12.7476 9.34961 13.1618 9.34961V7.84961ZM18.1618 9.34961C18.576 9.34961 18.9118 9.01382 18.9118 8.59961C18.9118 8.1854 18.576 7.84961 18.1618 7.84961V9.34961ZM14.9118 11.0996C14.9118 11.5138 15.2476 11.8496 15.6618 11.8496C16.076 11.8496 16.4118 11.5138 16.4118 11.0996H14.9118ZM16.4118 6.09961C16.4118 5.6854 16.076 5.34961 15.6618 5.34961C15.2476 5.34961 14.9118 5.6854 14.9118 6.09961H16.4118ZM9.91178 4.43294C9.91178 5.85968 8.75519 7.01628 7.32845 7.01628V8.51628C9.58361 8.51628 11.4118 6.68811 11.4118 4.43294H9.91178ZM7.32845 7.01628C5.90171 7.01628 4.74512 5.85968 4.74512 4.43294H3.24512C3.24512 6.68811 5.07329 8.51628 7.32845 8.51628V7.01628ZM4.74512 4.43294C4.74512 3.00621 5.90171 1.84961 7.32845 1.84961V0.349609C5.07329 0.349609 3.24512 2.17778 3.24512 4.43294H4.74512ZM7.32845 1.84961C8.75519 1.84961 9.91178 3.00621 9.91178 4.43294H11.4118C11.4118 2.17778 9.58361 0.349609 7.32845 0.349609V1.84961ZM4.82845 11.0163H9.82845V9.51628H4.82845V11.0163ZM9.82845 16.1829H4.82845V17.6829H9.82845V16.1829ZM4.82845 16.1829C3.40171 16.1829 2.24512 15.0263 2.24512 13.5996H0.745117C0.745117 15.8548 2.57329 17.6829 4.82845 17.6829V16.1829ZM12.4118 13.5996C12.4118 15.0263 11.2552 16.1829 9.82845 16.1829V17.6829C12.0836 17.6829 13.9118 15.8548 13.9118 13.5996H12.4118ZM9.82845 11.0163C11.2552 11.0163 12.4118 12.1729 12.4118 13.5996H13.9118C13.9118 11.3444 12.0836 9.51628 9.82845 9.51628V11.0163ZM4.82845 9.51628C2.57329 9.51628 0.745117 11.3444 0.745117 13.5996H2.24512C2.24512 12.1729 3.40172 11.0163 4.82845 11.0163V9.51628ZM13.1618 9.34961H18.1618V7.84961H13.1618V9.34961ZM16.4118 11.0996V8.59961H14.9118V11.0996H16.4118ZM16.4118 8.59961V6.09961H14.9118V8.59961H16.4118Z"
                      fill="white"
                    />
                  </svg>
                  <label>
                    New Profile
                  </label>
                </div>
              </div>
            )} */}

            {/* {userRole == "Parent" && ( */}
            <div
              onClick={() => {
                toggle1()
                navigate("/parent/profile");
              }}
              className="more-item d-flex  align-items-center justify-content-between"
            >
              <div className="d-flex align-items-center ">
                <svg
                  className="me-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 20 19"
                  fill="none"
                >
                  <path
                    d="M13.3337 8.41699C12.9194 8.41699 12.5837 8.75278 12.5837 9.16699C12.5837 9.58121 12.9194 9.91699 13.3337 9.91699V8.41699ZM18.3337 9.91699C18.7479 9.91699 19.0837 9.58121 19.0837 9.16699C19.0837 8.75278 18.7479 8.41699 18.3337 8.41699V9.91699ZM15.0837 11.667C15.0837 12.0812 15.4194 12.417 15.8337 12.417C16.2479 12.417 16.5837 12.0812 16.5837 11.667H15.0837ZM16.5837 6.66699C16.5837 6.25278 16.2479 5.91699 15.8337 5.91699C15.4194 5.91699 15.0837 6.25278 15.0837 6.66699H16.5837ZM10.0837 5.00033C10.0837 6.42706 8.92706 7.58366 7.50033 7.58366V9.08366C9.75549 9.08366 11.5837 7.25549 11.5837 5.00033H10.0837ZM7.50033 7.58366C6.07359 7.58366 4.91699 6.42706 4.91699 5.00033H3.41699C3.41699 7.25549 5.24516 9.08366 7.50033 9.08366V7.58366ZM4.91699 5.00033C4.91699 3.57359 6.07359 2.41699 7.50033 2.41699V0.916992C5.24516 0.916992 3.41699 2.74516 3.41699 5.00033H4.91699ZM7.50033 2.41699C8.92706 2.41699 10.0837 3.57359 10.0837 5.00033H11.5837C11.5837 2.74516 9.75549 0.916992 7.50033 0.916992V2.41699ZM5.00033 11.5837H10.0003V10.0837H5.00033V11.5837ZM10.0003 16.7503H5.00033V18.2503H10.0003V16.7503ZM5.00033 16.7503C3.57359 16.7503 2.41699 15.5937 2.41699 14.167H0.916992C0.916992 16.4222 2.74516 18.2503 5.00033 18.2503V16.7503ZM12.5837 14.167C12.5837 15.5937 11.4271 16.7503 10.0003 16.7503V18.2503C12.2555 18.2503 14.0837 16.4222 14.0837 14.167H12.5837ZM10.0003 11.5837C11.4271 11.5837 12.5837 12.7403 12.5837 14.167H14.0837C14.0837 11.9118 12.2555 10.0837 10.0003 10.0837V11.5837ZM5.00033 10.0837C2.74516 10.0837 0.916992 11.9118 0.916992 14.167H2.41699C2.41699 12.7403 3.57359 11.5837 5.00033 11.5837V10.0837ZM13.3337 9.91699H18.3337V8.41699H13.3337V9.91699ZM16.5837 11.667V9.16699H15.0837V11.667H16.5837ZM16.5837 9.16699V6.66699H15.0837V9.16699H16.5837Z"
                    fill="white"
                  />
                </svg>
                <label> My Profile </label>
              </div>

            </div>
            <div
              onClick={() => {
                {
                  userRole === "Parent" ? navigate("/parent/requests") :
                    userRole === "Athlete" ? navigate("/athlete/requests") :
                      userRole === "Coach" ? navigate("/coach/requests") :
                        userRole === "Recruiter" ? navigate("/recruiter/requests") : null
                }
                toggle1()
              }}
              className="more-item d-flex  align-items-center justify-content-between"
            >
              <div className="d-flex align-items-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className='me-3'
                  viewBox="0 0 26 19"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.9997 0.265869C10.756 0.265869 8.93717 2.08471 8.93717 4.32837C8.93717 6.57203 10.756 8.39087 12.9997 8.39087C15.2433 8.39087 17.0622 6.57203 17.0622 4.32837C17.0622 2.08471 15.2433 0.265869 12.9997 0.265869ZM10.5622 4.32837C10.5622 2.98218 11.6535 1.89087 12.9997 1.89087C14.3459 1.89087 15.4372 2.98218 15.4372 4.32837C15.4372 5.67456 14.3459 6.76587 12.9997 6.76587C11.6535 6.76587 10.5622 5.67456 10.5622 4.32837Z"
                    fill="#fff"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.74967 10.0159C7.50602 10.0159 5.68717 11.8347 5.68717 14.0784C5.68717 16.322 7.50602 18.1409 9.74967 18.1409H16.2497C18.4933 18.1409 20.3122 16.322 20.3122 14.0784C20.3122 11.8347 18.4933 10.0159 16.2497 10.0159H9.74967ZM7.31217 14.0784C7.31217 12.7322 8.40348 11.6409 9.74967 11.6409H16.2497C17.5959 11.6409 18.6872 12.7322 18.6872 14.0784C18.6872 15.4246 17.5959 16.5159 16.2497 16.5159H9.74967C8.40348 16.5159 7.31217 15.4246 7.31217 14.0784Z"
                    fill={"#fff"
                    }
                  />
                  <path
                    d="M8.39783 7.18691C8.22696 6.91242 7.90634 6.76587 7.58301 6.76587C6.23681 6.76587 5.14551 5.67456 5.14551 4.32837C5.14551 2.98218 6.23681 1.89087 7.58301 1.89087C7.90634 1.89087 8.22696 1.74432 8.39783 1.46983C8.40538 1.45769 8.41299 1.44558 8.42064 1.4335C8.70512 0.984452 8.56098 0.348636 8.03259 0.290464C7.88497 0.274212 7.73496 0.265869 7.58301 0.265869C5.33935 0.265869 3.52051 2.08471 3.52051 4.32837C3.52051 6.57203 5.33935 8.39087 7.58301 8.39087C7.73496 8.39087 7.88497 8.38253 8.03259 8.36627C8.56098 8.3081 8.70512 7.67229 8.42064 7.22323C8.41299 7.21116 8.40538 7.19905 8.39783 7.18691Z"
                    fill={"#fff"
                    }
                  />
                  <path
                    d="M5.10032 15.7758C4.97734 15.5706 4.76027 15.4325 4.52106 15.4325H4.33301C2.98681 15.4325 1.89551 14.3412 1.89551 12.995C1.89551 11.6488 2.98681 10.5575 4.33301 10.5575H4.52106C4.76027 10.5575 4.97734 10.4194 5.10032 10.2143C5.40051 9.71343 5.07475 8.93254 4.49084 8.93254H4.33301C2.08935 8.93254 0.270508 10.7514 0.270508 12.995C0.270508 15.2387 2.08935 17.0575 4.33301 17.0575H4.49084C5.07475 17.0575 5.40051 16.2766 5.10032 15.7758Z"
                    fill={"#fff"
                    }
                  />
                  <path
                    d="M17.5787 7.22323C17.2942 7.67229 17.4384 8.3081 17.9668 8.36627C18.1144 8.38253 18.2644 8.39087 18.4163 8.39087C20.66 8.39087 22.4788 6.57203 22.4788 4.32837C22.4788 2.08471 20.66 0.265869 18.4163 0.265869C18.2644 0.265869 18.1144 0.274212 17.9668 0.290464C17.4384 0.348637 17.2942 0.984452 17.5787 1.4335C17.5864 1.44558 17.594 1.45769 17.6015 1.46982C17.7724 1.74432 18.093 1.89087 18.4163 1.89087C19.7625 1.89087 20.8538 2.98218 20.8538 4.32837C20.8538 5.67456 19.7625 6.76587 18.4163 6.76587C18.093 6.76587 17.7724 6.91242 17.6015 7.18691C17.594 7.19905 17.5864 7.21116 17.5787 7.22323Z"
                    fill={"#fff"
                    }
                  />
                  <path
                    d="M20.899 15.7758C20.5988 16.2766 20.9246 17.0575 21.5085 17.0575H21.6663C23.91 17.0575 25.7288 15.2387 25.7288 12.995C25.7288 10.7514 23.91 8.93254 21.6663 8.93254H21.5085C20.9246 8.93254 20.5988 9.71343 20.899 10.2143C21.022 10.4194 21.2391 10.5575 21.4783 10.5575H21.6663C23.0125 10.5575 24.1038 11.6488 24.1038 12.995C24.1038 14.3412 23.0125 15.4325 21.6663 15.4325H21.4783C21.2391 15.4325 21.022 15.5706 20.899 15.7758Z"
                    fill={"#fff"
                    }
                  />
                </svg>
                <label> Requests </label>
              </div>

            </div>

            <div onClick={() => {
              toggle1()
              navigate("/privacy-policy")
            }} className="more-item d-flex  align-items-center justify-content-between">
              <div className="d-flex align-items-center ">
                <svg
                  className="me-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 18 19"
                  fill="none"
                >
                  <path
                    d="M4.00033 8.00033V6.16699C4.00033 3.12942 6.2389 0.666992 9.00033 0.666992C11.7617 0.666992 14.0003 3.12942 14.0003 6.16699V8.00033M0.666992 13.3337C0.666992 10.9767 0.666992 9.79816 1.39923 9.06591C2.13146 8.33366 3.30997 8.33366 5.66699 8.33366H12.3337C14.6907 8.33366 15.8692 8.33366 16.6014 9.06591C17.3337 9.79816 17.3337 10.9767 17.3337 13.3337C17.3337 15.6907 17.3337 16.8692 16.6014 17.6014C15.8692 18.3337 14.6907 18.3337 12.3337 18.3337H5.66699C3.30997 18.3337 2.13146 18.3337 1.39923 17.6014C0.666992 16.8692 0.666992 15.6907 0.666992 13.3337Z"
                    stroke="white"
                    stroke-width="0.833333"
                    stroke-linecap="round"
                  />
                </svg>
                <label> Privacy Policy</label>
              </div>
            </div>

            {
              authinfo?.user?.data?.account_type === "Email" && (
                <div
                  onClick={() => {
                    toggle1()
                    navigate("/change-password")
                  }}
                  className="more-item d-flex  align-items-center justify-content-between"
                >
                  <div className="d-flex align-items-center ">
                    <svg
                      className="me-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                    >
                      <path
                        d="M4.00033 8.00033V6.16699C4.00033 3.12942 6.2389 0.666992 9.00033 0.666992C11.7617 0.666992 14.0003 3.12942 14.0003 6.16699V8.00033M0.666992 13.3337C0.666992 10.9767 0.666992 9.79816 1.39923 9.06591C2.13146 8.33366 3.30997 8.33366 5.66699 8.33366H12.3337C14.6907 8.33366 15.8692 8.33366 16.6014 9.06591C17.3337 9.79816 17.3337 10.9767 17.3337 13.3337C17.3337 15.6907 17.3337 16.8692 16.6014 17.6014C15.8692 18.3337 14.6907 18.3337 12.3337 18.3337H5.66699C3.30997 18.3337 2.13146 18.3337 1.39923 17.6014C0.666992 16.8692 0.666992 15.6907 0.666992 13.3337Z"
                        stroke="white"
                        stroke-width="0.833333"
                        stroke-linecap="round"
                      />
                    </svg>
                    <label> Change Password </label>
                  </div>
                </div>
              )
            }

            <div
              onClick={() => {
                toggle1()
                navigate("/purchase-history")
              }}
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
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.81786 2.00028C5.26142 2.00028 4.33301 2.9287 4.33301 4.48513V19.5154C4.33301 21.0719 5.26142 22.0003 6.81786 22.0003H13.1687C12.9659 21.7308 12.7949 21.436 12.6616 21.1215H6.85826C6.33945 21.1215 5.16634 20.5003 5.2522 19.5154V4.48513C5.2522 3.50028 6.33945 2.87907 6.85826 2.87907H12.4138V8.24271C12.4138 9.17619 12.5877 9.17403 13.3782 9.16419C13.4663 9.16309 13.5622 9.1619 13.6663 9.1619H18.9896V16.1608C19.3435 16.4254 19.6541 16.7449 19.9088 17.1065V9.02093C19.9088 8.89737 19.912 8.78298 19.9151 8.67572C19.9305 8.13413 19.9408 7.77423 19.4997 7.33308L14.333 2.49975C13.8317 1.9984 13.6538 1.99877 12.9989 2.00013L12.8881 2.00028H6.81786ZM18.9338 8.24271L13.333 2.93485V8.24271H18.9338Z"
                    fill="white"
                  />
                  <path
                    d="M12.7497 19.4997C12.7497 17.4323 14.4322 15.7497 16.4997 15.7497C18.5671 15.7497 20.2497 17.4323 20.2497 19.4997C20.2497 21.567 18.5671 23.2497 16.4997 23.2497C14.4322 23.2497 12.7497 21.567 12.7497 19.4997Z"
                    stroke="white"
                    stroke-width="0.833333"
                  />
                  <path
                    d="M16.4333 21.666C16.6727 21.666 16.8667 21.472 16.8667 21.2327V19.3994C16.8667 19.16 16.6727 18.966 16.4333 18.966C16.194 18.966 16 19.16 16 19.3994V21.2327C16 21.472 16.194 21.666 16.4333 21.666Z"
                    fill="white"
                  />
                  <path
                    d="M16 18.0993C16 18.3387 16.194 18.5327 16.4333 18.5327C16.6727 18.5327 16.8667 18.3387 16.8667 18.0993C16.8667 17.86 16.6727 17.666 16.4333 17.666C16.194 17.666 16 17.86 16 18.0993Z"
                    fill="white"
                  />
                </svg>
                <label> My Purchase History </label>
              </div>
            </div>

            <div
              onClick={() => {
                toggle1()
                navigate("/contact-form");
              }}
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
                    d="M20.6364 4.33301H3.36364C3.00227 4.33398 2.65598 4.47915 2.40046 4.7368C2.14494 4.99446 2.00096 5.34363 2 5.70801V17.6247C2 17.9893 2.14367 18.3391 2.3994 18.5969C2.65513 18.8548 3.00198 18.9997 3.36364 18.9997H20.6364C20.998 18.9997 21.3449 18.8548 21.6006 18.5969C21.8563 18.3391 22 17.9893 22 17.6247V5.70801C21.999 5.34363 21.8551 4.99446 21.5995 4.7368C21.344 4.47915 20.9977 4.33398 20.6364 4.33301ZM12 11.7305L3.65455 5.24967H20.3455L12 11.7305ZM9.41273 10.878L2.90909 17.434V5.82809L9.41273 10.878ZM10.1382 11.4418L12 12.8855L13.8618 11.4408L20.4482 18.083H3.55182L10.1382 11.4418ZM14.5873 10.8771L21.0909 5.82809V17.4349L14.5873 10.8771Z"
                    fill="white"
                  />
                </svg>
                <label> Contact</label>
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
