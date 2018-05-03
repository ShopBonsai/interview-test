// Framework
import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Table,
  Button,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

// define component
const MainNav = () =>
  <nav id="main-nav">
    <Nav id="nav-brand">
      <NavItem>
        <Link to="/" className="nav-link">
          <img src="http://shopbonsai.ca/img/logo-bonsai-white.svg" />
        </Link>
      </NavItem>
    </Nav>
    <Nav id="nav-menu">
      <NavItem>
        <Link to="#" className="nav-link">
          My Account
        </Link>
      </NavItem>
      <NavItem>
        <Link to="#" className="nav-link">
          Cart
        </Link>
      </NavItem>
    </Nav>
  </nav>;

// export component
export default MainNav;
