// Framework
import React from "react";

const Header = ({ children, goBack, goCart }) =>
  <header>
    <button onClick={goBack} className="back-button">
      {/* Image added here to show image inclusion, prefer inline-SVG. */}
      <img alt="Back" src={`/icon/header/back-white.svg`} />
    </button>
    <h1>
      {children}
    </h1>
    <i className="fa fa-shopping-cart fa-2x" aria-hidden="true"></i>
    {/* <div className="right-content" /> */}
  </header>;

export default Header;
