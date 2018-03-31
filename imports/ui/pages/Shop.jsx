// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
import Product from "../components/Product";
import Button from "../components/Button.jsx";

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
  
  // add a selected item and its quantity to the items list
  handleAddBtn = (item, quantityOrdered) => {
    let items = this.state.items;
    const orderItem = {
      item: item,
      quantity: quantityOrdered
    }

    this.setState(() => ({items: items.concat([orderItem])}));
  }

  handleCheckOutBtn = () => {
    this.props.history.push("/cart");
  }

  createNewOrder() {
    const items = this.state.items;
    const user = this.state.user;
    const email = this.state.user.email;

    Meteor.call("orders.addOrder", items, user, email, (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        this.setState(() => ({ orders: this.state.concat(response) }));
      }
    });
  }

  componentWillMount() {
    const email = this.state.user.email;
    
    let promise = new Promise((resolve, reject) => {
      Meteor.call("orders.getOrdersByEmail", { email: email }, (error, response) => {
        if (error) {
          this.setState(() => ({ error: error }));
          reject(error);
        } else {
          this.setState(() => ({ orders: response }));
          resolve(response);
        }
      })
    });

    promise
      .then(() => {
        let orders = this.state.orders;
        if (orders.length) {
          console.log('ok passei ', this.state.orders.length)
        } else{
          console.log('error no promise')
        }})
      .catch((error) => console.log('catch ', error));

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
    const { merchants, error, orders, items, user } = this.state; //+++++++++++++
    
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
        <div className="check-out">
          <Button className="bonsai-button btn-check-out" onClick={this.handleCheckOutBtn}>
            CHECK OUT
          </Button>
        </div>
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
