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
    let isQuantiyUpdate = false;
    let items = this.state.items;
    
    items.map(aItem => {
      // check if an item is already added
      if (aItem.item.name == item.name) {  
        aItem.quantity += parseInt(quantityOrdered);
        isQuantiyUpdate = true; // set isQuantityUpdate to true since the item quantity is being updated
      }
    });

    // if an item is a new item
    if (!isQuantiyUpdate) { 
      const orderItem = {
        item: item,
        quantity: parseInt(quantityOrdered)
      }
      items = items.concat([orderItem]);
    }

    this.setState(() => ({ items: items}));
    
    this.updateOrderDB(items);
  }

  handleCheckOutBtn = () => {
    this.props.history.push("/cart");
  }

  updateOrderDB = (items) => {
    // update a current order with a new item
    let orders = this.state.orders.slice(); //
    let currentOrder = orders.pop(); //
    const currentOrderId = currentOrder._id; //

    Meteor.call("orders.updateOrder", currentOrderId, items, (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } 
    });
  }
    
  createNewOrderDB() {
    const items = this.state.items;
    const userId = Meteor.userId();
    
    Meteor.call("orders.addOrder", items, userId, (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        this.setState(() => ({ orders: this.state.orders.concat(response) }));
      }
    });
  }

  componentWillMount() {
    const userId = Meteor.userId();
    
    let promise = new Promise((resolve, reject) => {
      Meteor.call("orders.getOrdersByUserId", { userId: userId }, (error, response) => {
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
      .then((response) => {
        if (!response.length) {
          this.createNewOrderDB();
          Meteor.call("orders.getOrdersByUserId", { userId: userId }, (error, response) => {
            if (error) {
              this.setState(() => ({ error: error }));
            } else {
              this.setState(() => ({ orders: response }));
            }
          });
          return;
        }
        let orders = this.state.orders.slice();       
        if (orders.length) {
          let lastOrder = orders.pop();          
          if (lastOrder.isCheckOut) {
            this.createNewOrderDB();
          } else {
            this.setState(() => ({ items: lastOrder.items }));
          }
        } 

     })
      .catch((error) => console.log('Error while getting orders by userId: ', error));

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
    const { merchants, error, orders, items, user } = this.state;
    
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
            <Product {...product} key={id} handleAddBtn={this.handleAddBtn} itemsSelected={this.state.items}/>
          )}
        </div>
      </Page>
    );
  }
}

export default Shop;
