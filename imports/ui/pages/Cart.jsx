// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
import Product from "../components/Product";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      error: null
    };
  }

  componentWillMount() {
    Meteor.call("merchants.getMerchants", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        this.setState(() => ({ merchants: response }));
      }
    });
  }

  goBack = () => this.props.history.push("/shop");

  render() {
    const { items, error } = this.state;
    return (
      <Page pageTitle="shop" history goBack={this.goBack}>
        <div className="shop-page">
          {this.state.items.map(({ id, ...product }) =>
            <Product {...product} key={id} />
          )}
        </div>
      </Page>
    );
  }
}

export default Shop;
