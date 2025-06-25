import React from "react";
//import "./index.css";
import { Button } from "reactstrap";

const Header = () => {
  return (
    <header className={"header"}>
      <div className={"container "}>

        <nav className={"nav"}>
          <button className={"navItem"}>
            <span>Company</span>
            <i className={"chevronDown"} />
          </button>
          <button className={"navItem"}>Services</button>
          <button className={"navItem"}>Resources</button>
        </nav>
        <Button variant="secondary">Contact</Button>
      </div>
    </header>
  );
};
export default Header;
