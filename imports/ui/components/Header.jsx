// Framework
import React from "react";

const Header = ({ children, goBack }) =>
  <header>
    <button onClick={goBack} className="back-button">
      {/* Image added here to show image inclusion, prefer inline-SVG. */}
      <img alt="Back" src={`/icon/header/back-white.svg`} />
    </button>
    <h1>
      {children}
    </h1>
    <div className="right-content">
        <h3>cart</h3>
    </div>
  </header>;

export default Header;
