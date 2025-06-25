import React, { useState } from 'react'
import "./index.css"

// import logo from "./../../../assets/dashboardLogo.png";

// import { Col, Container, Row } from 'reactstrap'

// import Avatar from "@mui/material/Avatar";

import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { NavLink, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
// import CreateForm from '../../../pages/creatForm';
// import Builder from '../../../pages/bulider';
// import PreviewForm from '../../../pages/previewForm';
// import AllPreviewForm from '../../../pages/AllForm';


const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function DashboardSideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location =  useLocation()
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const back = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 22 22"
      fill="none"
    >
      <path
        d="M15.7953 15.2305L15.7953 6.76917L11.5387 10.9998L15.7953 15.2305ZM19.513 0.33317C20.1097 0.33317 20.6179 0.542948 21.0377 0.962503C21.4572 1.38228 21.667 1.8905 21.667 2.48717L21.667 19.5125C21.667 20.1092 21.4572 20.6174 21.0377 21.0372C20.6179 21.4567 20.1097 21.6665 19.513 21.6665L2.48766 21.6665C1.89099 21.6665 1.38277 21.4567 0.962992 21.0372C0.543436 20.6174 0.333658 20.1092 0.333658 19.5125L0.33366 2.48717C0.33366 1.8905 0.543438 1.38228 0.962994 0.962502C1.38277 0.542946 1.89099 0.333168 2.48766 0.333168L19.513 0.33317ZM5.66699 1.6665L1.66699 1.6665L1.66699 19.5125C1.66699 19.7178 1.75244 19.9059 1.92332 20.0768C2.09421 20.2477 2.28232 20.3332 2.48766 20.3332L5.66699 20.3332L5.66699 1.6665ZM7.00033 1.6665L7.00033 20.3332L19.513 20.3332C19.7183 20.3332 19.9064 20.2477 20.0773 20.0768C20.2482 19.9059 20.3337 19.7178 20.3337 19.5125L20.3337 2.48717C20.3337 2.28184 20.2482 2.09373 20.0773 1.92284C19.9064 1.75195 19.7183 1.6665 19.513 1.6665L7.00033 1.6665Z"
        fill="#1C1B1F"
      />
    </svg>
  );

  const forword = (
    <svg
    style={{transform: "rotate(180deg)"}}
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 22 22"
      fill="none"
    >
      <path
        d="M15.7953 15.2305L15.7953 6.76917L11.5387 10.9998L15.7953 15.2305ZM19.513 0.33317C20.1097 0.33317 20.6179 0.542948 21.0377 0.962503C21.4572 1.38228 21.667 1.8905 21.667 2.48717L21.667 19.5125C21.667 20.1092 21.4572 20.6174 21.0377 21.0372C20.6179 21.4567 20.1097 21.6665 19.513 21.6665L2.48766 21.6665C1.89099 21.6665 1.38277 21.4567 0.962992 21.0372C0.543436 20.6174 0.333658 20.1092 0.333658 19.5125L0.33366 2.48717C0.33366 1.8905 0.543438 1.38228 0.962994 0.962502C1.38277 0.542946 1.89099 0.333168 2.48766 0.333168L19.513 0.33317ZM5.66699 1.6665L1.66699 1.6665L1.66699 19.5125C1.66699 19.7178 1.75244 19.9059 1.92332 20.0768C2.09421 20.2477 2.28232 20.3332 2.48766 20.3332L5.66699 20.3332L5.66699 1.6665ZM7.00033 1.6665L7.00033 20.3332L19.513 20.3332C19.7183 20.3332 19.9064 20.2477 20.0773 20.0768C20.2482 19.9059 20.3337 19.7178 20.3337 19.5125L20.3337 2.48717C20.3337 2.28184 20.2482 2.09373 20.0773 1.92284C19.9064 1.75195 19.7183 1.6665 19.513 1.6665L7.00033 1.6665Z"
        fill="#1C1B1F"
      />
    </svg>
  );

console.log( location, "window?.location?.pathname");

  return (
    <>
      <div className={`Sidebar ${isCollapsed ? "collapsed" : ""}`}>
        {/* Toggle Button */}
        <button className="ToggleButton" onClick={toggleSidebar}>
          {isCollapsed ? back : forword} {/* Icons for toggle */}
        </button>

        {/* Menu Items */}
        <div className="mt-5 pt-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "active1" : "")}
          >
            <div className="MenuItem">
              <span className="Icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M2.30775 17.5C1.80908 17.5 1.38308 17.3234 1.02975 16.9703C0.676583 16.6169 0.5 16.1909 0.5 15.6923V2.30775C0.5 1.80908 0.676583 1.38308 1.02975 1.02975C1.38308 0.676583 1.80908 0.5 2.30775 0.5H15.6923C16.1909 0.5 16.6169 0.676583 16.9703 1.02975C17.3234 1.38308 17.5 1.80908 17.5 2.30775V8.63275C17.2538 8.52758 17.0073 8.4385 16.7605 8.3655C16.5137 8.29233 16.2602 8.234 16 8.1905V2.30775C16 2.23075 15.9679 2.16025 15.9038 2.09625C15.8398 2.03208 15.7692 2 15.6923 2H2.30775C2.23075 2 2.16025 2.03208 2.09625 2.09625C2.03208 2.16025 2 2.23075 2 2.30775V15.6923C2 15.7692 2.03208 15.8398 2.09625 15.9038C2.16025 15.9679 2.23075 16 2.30775 16H8.1655C8.20267 16.2768 8.25775 16.5387 8.33075 16.7855C8.40392 17.0323 8.493 17.2705 8.598 17.5H2.30775ZM2 16V2V8.1905V8.1155V16ZM4.25 13.6345H8.26725C8.31092 13.3743 8.37567 13.1208 8.4615 12.874C8.5475 12.6272 8.64108 12.3808 8.74225 12.1348H4.25V13.6345ZM4.25 9.75H10.5905C11.0212 9.38467 11.4808 9.07858 11.9693 8.83175C12.4578 8.58492 12.9808 8.40958 13.5385 8.30575V8.25H4.25V9.75ZM4.25 5.86525H13.75V4.3655H4.25V5.86525ZM15 19.5578C13.7513 19.5578 12.6892 19.1199 11.8135 18.2443C10.9378 17.3686 10.5 16.3064 10.5 15.0577C10.5 13.8091 10.9378 12.7469 11.8135 11.8713C12.6892 10.9956 13.7513 10.5577 15 10.5577C16.2487 10.5577 17.3108 10.9956 18.1865 11.8713C19.0622 12.7469 19.5 13.8091 19.5 15.0577C19.5 16.3064 19.0622 17.3686 18.1865 18.2443C17.3108 19.1199 16.2487 19.5578 15 19.5578ZM14.5577 18H15.4423V15.5H17.9423V14.6155H15.4423V12.1155H14.5577V14.6155H12.0577V15.5H14.5577V18Z"
                    fill="#1C1B1F"
                  />
                </svg>
              </span>
              <span className="Text">Create new Form</span>
            </div>
          </NavLink>

          <NavLink
            to="/page2"
            className={({ isActive }) => (isActive ? "active1" : "")}
          >
            <div className="MenuItem">
              <span className="Icon">
                <svg
                  style={{ marginTop: "-6px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <mask
                    id="mask0_77_137"
                    maskType="alpha" // Corrected to camelCase
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                  >
                    <rect width="24" height="24" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_77_137)">
                    <path
                      d="M13.25 9V3.5H20.5V9H13.25ZM3.5 12.5V3.5H10.75V12.5H3.5ZM13.25 20.5V11.5H20.5V20.5H13.25ZM3.5 20.5V15H10.75V20.5H3.5ZM5 11H9.25V5H5V11ZM14.75 19H19V13H14.75V19ZM14.75 7.5H19V5H14.75V7.5ZM5 19H9.25V16.5H5V19Z"
                      fill="black"
                    />
                  </g>
                </svg>
              </span>
              <span className="Text">Form Builder</span>
            </div>
          </NavLink>



          {/*


            <div className="MenuItem">
              <span className="Icon">
                <svg
                  style={{ marginTop: "-6px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <mask
                    id="mask0_77_137"
                    maskType="alpha" // Corrected to camelCase
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                  >
                    <rect width="24" height="24" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_77_137)">
                    <path
                      d="M13.25 9V3.5H20.5V9H13.25ZM3.5 12.5V3.5H10.75V12.5H3.5ZM13.25 20.5V11.5H20.5V20.5H13.25ZM3.5 20.5V15H10.75V20.5H3.5ZM5 11H9.25V5H5V11ZM14.75 19H19V13H14.75V19ZM14.75 7.5H19V5H14.75V7.5ZM5 19H9.25V16.5H5V19Z"
                      fill="black"
                    />
                  </g>
                </svg>
              </span>
              <span className="Text">Forms</span>
            </div>


            */}
        </div>
      </div>

      <div className={`Content ${isCollapsed ? "collapsed" : ""}`}>
        <Outlet />
      </div>
    </>
  );
}
