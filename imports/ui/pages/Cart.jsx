// Framework
import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';

// Components
import Page from "../components/Page.jsx";

class Cart extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      total: 0,
      checkoutModal: false,
      empty: true
    }

    this.toggle = this.toggle.bind(this);
    this.clearCart = this.clearCart.bind(this);
  }

  goBack = () => this.props.history.push("/shop");

  toggle() {
    this.setState({
      checkoutModal: !this.state.checkoutModal
    });
  }

  clearCart() {
    let cartId = document.cookie.split('=')[1];

    Meteor.call("carts.deleteCart", cartId, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        document.cookie = "cartId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        this.setState(() => ({ products: [], total: 0, empty: true, checkoutModal: !this.state.checkoutModal}));
      }
    });
  }

  componentWillMount() {
    if (!document.cookie == '') {
      Meteor.call("carts.getCart", document.cookie.split('=')[1], (error, response) => {
        let products = [];
        let total = 0;
        let empty = this.state.empty;
        for (let i in response[0].products) {
          total += response[0].products[i].price
          products.push(
            <tr key={i}>
              <td>{response[0].products[i].name}</td>
              <td>{response[0].products[i].brand}</td>
              <td>{response[0].products[i].color}</td>
              <td>{response[0].products[i].size}</td>
              <td>{response[0].products[i].qty}</td>
              <td>{response[0].products[i].price.toFixed(2)}</td>
            </tr>
          );
        }
        if (products.length > 0)
          empty = false;
        this.setState(() => ({ products: products, total: total.toFixed(2), empty: empty}));
      });
    }
  }

  render() {
    return (
      <Page history goBack={this.goBack}>
        <div className="cart-page">
          <h2 className="title">Shopping Cart</h2>
          {this.state.empty && <p>Shopping Cart is Empty!</p>}
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
               {this.state.products}
               <tr className="cart-total">
                <td>Total:</td>
                <td colSpan="5" className="total-number">{this.state.total}</td>
               </tr>
              </tbody>
            </Table>
            {!this.state.empty && <Button color="success" onClick={this.toggle}>Checkout</Button>}
            <Modal isOpen={this.state.checkoutModal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Enter Payment</ModalHeader>
              <ModalBody>
                Payment Options would be here!
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.clearCart}>Finish Paying</Button>
              </ModalFooter>
            </Modal>
          </div>
      </div>
      </Page>
    );
  }
}

export default Cart;
