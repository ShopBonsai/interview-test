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
      merchants: [],
      error: null,
      orders: [], //+++++++++++++
      items: [],
      user: {
        email: "johnDoe@email.ca", // hardcoded will change later
        password: "xfaf-8$ji-ify)" // hardcoded will change later
      }
    };
  }
  
  // add a selected item to the items list
  handleAddBtn = (product) => {
    let items = this.state.items;
    
    this.setState(() => ({items: items.concat([product])}));
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

  goBack = () => this.props.history.push("/");

  render() {
    const { merchants, error } = this.state; //+++++++++++++

    const getProductsFromMerchant = ({ products, brands }) =>
      products.map(({ belongsToBrand, ...product }) => ({
        ...product,
        brand: brands[belongsToBrand]
      }));

    const products = merchants.reduce(
      (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
      []
    );   

    return (
      <Page pageTitle="shop" history goBack={this.goBack}>
        <div className="shop-page">
          {products.map(({ id, ...product }) =>
            <Product {...product} key={id} handleAddBtn={this.handleAddBtn} />
          )}
        </div>
      </Page>
    );
  }
}

export default Shop;
