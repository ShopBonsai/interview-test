// Framework
import React from "react";
import { Link } from "react-router-dom";

const logout = () => {
  localStorage.removeItem("Meteor.userId");
  localStorage.removeItem("Meteor.loginToken");
  localStorage.removeItem("Meteor.loginTokenExpires");
}

const Header = ({ children, goBack }) =>
  <header>
    <div >
      <button onClick={goBack} className="back-button" >
        {/* Image added here to show image inclusion, prefer inline-SVG. */}
        <img alt="Back" src={`/icon/header/back-white.svg`} />
      </button>
      <span><Link to="/shop" >Shop</Link></span>
      <span><Link to={localStorage.getItem("Meteor.loginToken") ? "/cart" : "/login"} >{localStorage.getItem("Meteor.loginToken") ? "My Cart" : "Login"}</Link></span>
      {localStorage.getItem("Meteor.loginToken") ? <span onClick={logout} ><Link to="/login" >Logout</Link></span> : "" }
    </div>
    <h1 className="mr-3" >
      {children}
    </h1>
  </header>;

export default Header;
