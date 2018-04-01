// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
import Product from "../components/Product";
import CartTable from "../components/CartTable";
import Button from "../components/Button.jsx";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: "",
      currentOrder: "",
      items: ""
    }
  }
  componentWillMount() {
    const userId = Meteor.userId();
    
    Meteor.call("orders.getOrdersByUserId", { userId: userId }, (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        this.setState(() => ({ orders: response }));
        let orders = this.state.orders.slice();
        let lastOrder = orders.pop();
        this.setState(() => ({ currentOrder: lastOrder }));
        this.setState(() => ({ items: lastOrder.items }));
      }
    });
  }
  
  goBack = () => this.props.history.push("/shop");

  render() {    
    const userId = Meteor.userId();
    const { orders, currentOrder, items } = this.state;

    const Table = () => {
      if (orders) {       
        let cartCalculation;
        let cartItems;
        
        if (items.length) {
          const subTotal = items.reduce((sum, item) => sum + item.item.price, 0);
          const tax = subTotal * 0.13;
          const total = subTotal + tax;
          cartCalculation = {
            subTotal: subTotal,
            tax: tax,
            total: total
          }
          cartItems = items;
        }

        return (
          <Page pageTitle="Shopping Cart" history goBack={this.goBack}>
            <div className="cart-page">
              <div className="cart-table">
                <CartTable cartCalculation={cartCalculation} cartItems={cartItems} />
              </div>
              <div className="go-to-payment">
                <Button className="bonsai-button go-to-payment-btn">
                  Go to Payment
                </Button>
              </div>
            </div>
          </Page>
        );
      } else {
        return null;
      }
    }
    return (
      <Table />
    );
  }
}

export default Cart;