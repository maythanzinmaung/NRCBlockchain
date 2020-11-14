import React from "react";
import { Link, withRouter, } from "react-router-dom";
import "./style.css"
function Navigation(props) {
  return (
    <div className="navigation-head">
      <nav >
        <Link to="/DataEntry">
          <label className="navigation-text"> Registration</label>
         </Link>

        <Link to="/Verify">
          
          <label className="navigation-text">Verification</label></Link>
          
        <Link to="/">
          <label className="logout">Log Out</label>
          
        </Link>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
