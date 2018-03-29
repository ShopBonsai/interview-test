// Framework
import React from "react";

renderCart = (firstpage, goCart) => {
  switch (firstpage) {
    case false:
      return( <div className="right-content"><button
            onClick={goCart}
          > CART </button></div>)
    default: 
    return( <div hidden className="right-content"><button
            onClick={goCart}
          > CART </button></div>)
  }
}
const Header = ({ children, goBack, goCart, firstpage = false }) =>
  <header>
    <button onClick={goBack} className="back-button">
      {/* Image added here to show image inclusion, prefer inline-SVG. */}
      <img alt="Back" src={`/icon/header/back-white.svg`} />
    </button>
    <h1>
      {children}
    </h1>
    <div>
    {this.renderCart(firstpage, goCart)}
    </div>
  </header>;

export default Header;
