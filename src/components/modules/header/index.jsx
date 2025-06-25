import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./index.css";

function Header() {
  return (
    <>
      <header className="h-100">
        <div className="d-flex align-items-center head">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active1" : "")}
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active1" : "")}
          >
            About
          </NavLink>

          <NavLink
            to="/about/team"
            className={({ isActive }) => (isActive ? "active1" : "")}
          >
            Team
          </NavLink>

          <NavLink
            to="/about/history"
            className={({ isActive }) => (isActive ? "active1" : "")}
          >
            History
          </NavLink>

          <NavLink
            to="/about/history/1947"
            className={({ isActive }) => (isActive ? "active1" : "")}
          >
            <div className=""> 1947 </div>
          </NavLink>
        </div>
      </header>
    </>
  );
}

export default Header;
