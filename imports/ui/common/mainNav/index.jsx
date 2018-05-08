// Framework
import React from "react";
import { Link } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

// define component
const MainNav = () =>
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
        <Link to="/shop" href="/shop" className="nav-link">
          <FontAwesomeIcon icon="gem" />
          Shop
        </Link>
      </NavItem>
      <NavItem>
        <Link to="/cart" href="/cart" className="nav-link">
          <FontAwesomeIcon icon="shopping-cart" />
          SmartCart
        </Link>
      </NavItem>
    </Nav>
  </nav>;

// export component
export default MainNav;
