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
} from "reactstrap";
import profile from "./../../assets/dummyprofile.png"
import qr from "./../../assets/qr.png";
import { CHANGE_NOTIFICATION_STATUS, LOGOUT, READ_NOTIFICATIONS } from '../../graphql/mutation'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { FiBell } from "react-icons/fi";
import { logoutOnSubmit, UpdateStatusNotificationOnSubmit } from '../../graphql/api-callings'
import { useDispatch, useSelector } from 'react-redux'
import { handleLogin, handleLogout } from '../../redux/authSlice'
import { handleClearProfile } from '../../redux/profileSlice'
import { GET_ALL_NOTIFICATIONS } from '../../graphql/query/query'

export default function PublicLayout() {

  const navigate = useNavigate()
  const dropdownRef2 = useRef(null);

  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [details, setDetails] = useState(false)
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const toggle2 = () => setDropdownOpen2((prevState) => !prevState);
  const [Logout, { loading: loading1, error, data }] = useMutation(LOGOUT);



  const dispatch = useDispatch()
  const userRole = useSelector(
    (state) => state.authSlice?.role
  );
  const location = useLocation()
  console.log(userRole, "location");

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
      <div className="header-main w-100">
        <div className="outer-grad">
          <div className="inner-grad">
            <div className="final-black">
              <div className="CustomeConatiner">
                <div className="header-inner1 h-100 ">
                  <div
                    // onClick={() => {
                    //    }}
                    style={{ cursor: "pointer" }}
                    className=" logo d-flex align-items-center"
                  >
                    <img src={logo} alt="" />
                    <h3 className='d-sm-block d-none'>Sport me ID</h3>
                  </div>
                  <div className="search ">

                  </div>
                  <div className='d-flex align-items-center justify-content-end me-3'>
                    <button className='primary-btn py-2 px-sm-4 px-2 text-nowrap' onClick={() => navigate("/auth/sign-up")}>
                      Explore More
                    </button>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
}
