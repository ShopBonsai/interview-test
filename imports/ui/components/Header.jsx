// Framework
import React from "react";
import { connect } from "react-redux";

const Header = ({ children, goBack, cartCount }) =>
  <header>
    <button onClick={goBack} className="back-button">
      {/* Image added here to show image inclusion, prefer inline-SVG. */}
      <img alt="Back" src={`/icon/header/back-white.svg`} />
    </button>
    <h1>
      {children}
    </h1>
    <div className="right-content">
      <h3>
        cart ({cartCount})
      </h3>
    </div>
  </header>;

const mapStateToProps = state => ({
  cartCount: state.orders.cart.length || 0
});

export default connect(mapStateToProps)(Header);
