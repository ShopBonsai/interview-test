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
} from 'reactstrap';

// define component
const MainNav = () =>
  <nav id="main-nav">
    <Nav>
      <NavItem>
        <Link to="/" className="nav-link">
          Store Front
        </Link>
      </NavItem>
    </Nav>
    <Nav>
      <NavItem>
        <Link to="/products" className="nav-link">
          Products
        </Link>
      </NavItem>
      <NavItem>
        <Link to="/categories" className="nav-link">
          Categories
        </Link>
      </NavItem>
      <NavItem>
        <Link to="/brands" className="nav-link">
          Brands
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
