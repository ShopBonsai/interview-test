// Framework
import React from "react";
import { Link } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

// define component
const MainNavComp = ({ ...props }) => {
  const setCartLink = length => {
    if (length === 0) {
      return (
        <Link to="/cart" href="/cart" className="nav-link">
          <FontAwesomeIcon icon="shopping-cart" />
          SmartCart
        </Link>
      );
    }
    return (
      <Link to="/cart" href="/cart" className="nav-link">
        <FontAwesomeIcon icon="cart-plus" />
        SmartCart ({length})
      </Link>
    );
  };
  return (
    <nav id="main-nav">
      <Nav id="nav-brand">
        <NavItem>
          <Link to="/" className="nav-link">
            <img src="icon/bonsai-white.svg" />
          </Link>
        </NavItem>
      </Nav>
      <Nav id="nav-menu">
        <NavItem>
          <Link
            to="/shop"
            href="/shop"
            className="nav-link"
            onClick={props.shopLink}
          >
            <FontAwesomeIcon icon="gem" />
            Shop
          </Link>
        </NavItem>
        <NavItem>
          {setCartLink(props.cartItemsLength)}
        </NavItem>
      </Nav>
    </nav>
  );
};

// export component
export default MainNavComp;
