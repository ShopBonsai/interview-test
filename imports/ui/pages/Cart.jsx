// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
import Product from "../components/Product";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      error: null
    };
  }

  componentWillMount() {
    Meteor.call("carts.getCart", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        this.setState(() => ({ items: response.items }));
      }
    });
  }

  goBack = () => this.props.history.push("/shop");

  render() {
    const { items, error } = this.state;
    return (
      <Page pageTitle="cart" history goBack={this.goBack}>
        <div className="cart-page">
          {this.state.items.map(({ id, ...product }) =>
            <Product {...product} key={id} />
          )}
        </div>
      </Page>
    );
  }
}

export default Cart;
