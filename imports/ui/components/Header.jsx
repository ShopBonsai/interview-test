// Framework
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
      <Link to="/checkout">
        <h3>
          {cartCount === 0
            ? <span>cart</span>
            : <span>
                cart ({cartCount})
              </span>}
        </h3>
      </Link>
    </div>
  </header>;

const mapStateToProps = state => ({
  cartCount: state.orders.cartCount
});

export default connect(mapStateToProps)(Header);
