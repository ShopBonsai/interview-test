// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
import Product from "../components/Product";
//import Button from "../components/Button.jsx";

class Cart extends Component {
  goBack = () => this.props.history.push("/shop");

  render() {
    return(
      <Page pageTitle="cart" history goBack={this.goBack}>
        <div>
          CART PAGE
        </div>
      </Page>
    );

  }
}

export default Cart;
