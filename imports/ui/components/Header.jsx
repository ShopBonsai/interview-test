// Framework
import React from "react";
import AccountsUIWrapper from "../components/AccountsUIWrapper";
const Header = ({ children, goBack, goProfile }) =>
  <header>
    <AccountsUIWrapper />
    <button onClick={goBack} className="back-button">
      {/* Image added here to show image inclusion, prefer inline-SVG. */}
      <img alt="Back" src={`/icon/header/back-white.svg`} />
    </button>
    <h1>
      {children}
    </h1>
    <button onClick={this.goProfile}>
      profile
      {/* <i className="ion-person" /> */}
    </button>
    <div className="right-content" />
  </header>;

export default Header;
