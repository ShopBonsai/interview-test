// Framework
import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";
import { Table } from 'reactstrap';

// Components
import Page from "../components/Page.jsx";
import Button from "../components/Button.jsx";

//go back from cart to shop

class Cart extends PureComponent {

  goBack = () => this.props.history.push("/shop");

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
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </div>
      </div>
      </Page>
    );
  }
}

export default Cart;
