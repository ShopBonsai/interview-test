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
      orders: [],
      items: [],
      user: {
        email: "johnDoe@email.ca", // hardcoded will change later
        password: "xfaf-8$ji-ify)" // hardcoded will change later
      }
    };
  }
  
  handleAddBtn = (item, quantityOrdered) => {
    // save a new item into this.state.items
    let items = this.state.items;
    const orderItem = {
      item: item,
      quantity: parseInt(quantityOrdered)
    }
    items = items.concat([orderItem]);
    this.setState(() => ({ items: items}));
    
    // update a current order with a new item
    let orders = this.state.orders.slice();
    const currentOrder = orders.pop();
    const currentOrderId = currentOrder._id;
    this.updateOrder(currentOrderId, items);
  }

  updateOrder = (orderId, items) => {
    Meteor.call("orders.updateOrder", orderId, items, (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } 
    });
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
        this.setState(() => ({ orders: this.state.orders.concat(response) }));
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
        let orders = this.state.orders.slice();       
        if (orders.length) {
          let lastOrder = orders.pop();          
          if (lastOrder.isCheckOut) {
            this.createNewOrder();
          } else {
            this.setState(() => ({ items: lastOrder.items }));
          }
        } 
      })
      .catch((error) => console.log('Error while getting orders by email: ', error));

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
