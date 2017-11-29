// Framework
import React from "react";
import { withRouter } from "react-router";

const Header = ({ children, goBack, goCart, cartNumber, pageTitle }) =>
  <header>
    <button onClick={goBack} className="back-button">
      {/* Image added here to show image inclusion, prefer inline-SVG. */}
      <img alt="Back" src={`/icon/header/back-white.svg`} />
    </button>
    <h1>
      {children}
    </h1>
    <div className="right-content">
      ( {cartNumber} )
      <i
        className="fa fa-shopping-cart fa-2x"
        aria-hidden="true"
        onClick={goCart}
      />
    </div>
  </header>;
export default withRouter(Header);
