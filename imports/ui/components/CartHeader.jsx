// Framework
import React from "react";
import { withRouter } from "react-router";

const CartHeader = ({ children, goBack, goCart, cartNumber, pageTitle }) =>
  <header>
    <button onClick={goBack} className="back-button">
      {/* Image added here to show image inclusion, prefer inline-SVG. */}
      <img alt="Back" src={`/icon/header/back-white.svg`} />
    </button>
    <h1>
      {children}
    </h1>
    <div className="right-content" />
  </header>;
export default withRouter(CartHeader);
