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
    <div className="right-content">
    <button onClick={goCart} className="cart-button">
      {/* Image added here to show image inclusion, prefer inline-SVG. */}
      <img alt="Back" src={`/icon/header/shopping-cart.svg`} />
    </button>
    </div>
  </header>;

export default Header;
