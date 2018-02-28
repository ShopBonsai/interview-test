// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
import Product from "../components/Product";

/*
  This is the shop component where the products 
  is loaded from server, as well as 
  store the items in order.  
*/ 

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchants: [],
      error: null,
      orderItems: [],
      numItems : 0,
      fade : false
    };
  }
  
  /* 
    this method add each product and 
    its respective quantity in the 
    orderItems state attribute 
  */
  addItem = (product,quantity) => {
   const items = this.state.orderItems;
   const item = {
       product : product,
       quantity : quantity
   }
   items.push(item);
   this.setState(() => ({ orderItems: items, numItems : items.length }));
   console.log(this.state.orderItems)
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
    const { merchants, error } = this.state;

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
            // the addItem is passes as props in the Product component
            <Product {...product} key={id} addItem={this.addItem} />
          )}
        </div>
      </Page>
    );
  }
}

export default Shop;
