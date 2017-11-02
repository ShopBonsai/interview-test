// Framework
import React from "react";
import AccountsUIWrapper from "./login.jsx";

const Header = ({ children, goBack }) =>
  <header>
    <button onClick={goBack} className="back-button">
      {/* Image added here to show image inclusion, prefer inline-SVG. */}
      <img alt="Back" src={`/icon/header/back-white.svg`} />
    </button>
    <h1>
      {children}
    </h1>
    <div className="right-content" />
    <AccountsUIWrapper />
  </header>;

export default Header;
