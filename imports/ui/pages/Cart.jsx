// Framework
import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";
import { Table } from 'reactstrap';

// Components
import Page from "../components/Page.jsx";
import Button from "../components/Button.jsx";

//go back from cart to shop
import { Carts } from "../../api/carts/collection.js";
// Carts.insert({
//   products: [{name:"test1"},{name:"test2"}]
// });
// console.log("coming from Carts");


class Cart extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  }

  goBack = () => this.props.history.push("/shop");

  componentWillMount() {
    Meteor.call("carts.getCart", document.cookie.split('=')[1], (error, response) => {
      products = [];
      for (let i in response[0].products) {
        products.push(
          <tr key={i}>
            <td>{response[0].products[i].name}</td>
            <td>{response[0].products[i].brand}</td>
            <td>{response[0].products[i].color}</td>
            <td>{response[0].products[i].size}</td>
            <td>{response[0].products[i].qty}</td>
            <td>{response[0].products[i].price}</td>
          </tr>
        );
      }
      this.setState(() => ({ products: products }));
    });
  }


  render() {
    return (
      <Page history goBack={this.goBack}>
        <div className="cart-page">
          <h2 className="title">Shopping Cart</h2>
          <div className="cart-table">
            <Table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Brand</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>QTY</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
               { this.state.products }
              </tbody>
            </Table>
          </div>
      </div>
      </Page>
    );
  }
}

export default Cart;
