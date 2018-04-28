// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Table } from 'reactstrap';

// Components
import Page from "../components/Page.jsx";
import Checkbox from "../components/Checkbox.jsx";
import Button from "../components/Button.jsx";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products : [],
      error: null,
      total: 0,
      taxRate: 0.12,
      availablePoints: 1000,
      redeemValue: 10
    };
  }

  componentWillMount() {
    //TODO: fetch data from Users collection to retrieve availablePoints
    // and then calculate redeemValue ( availablePoints * 0.01)

    //retrieve all products from Carts collection
    let cartId = document.cookie.split("=")[1];
    Meteor.call("carts.getCartById", cartId, (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        let productsObj = response.products;
        let products = Object.values(productsObj);
        this.setState(() => ({ products: products }));
        this.calculateTotal();
      }
    });
  }

  goBack = () => this.props.history.push("/shop");

  calculateTotal() {
    let total = this.state.total;
    this.state.products.map((order) =>
      total += order.total
    )
    total -= this.state.redeemValue;
    this.setTotalToState(total);
  }

  //call back from Checkbox
  handleCheckboxChange(isChecked) {
    let total = this.state.total;
    if (isChecked) {
      total += 10;
    }else{
      total -= 10;
    }
    this.setTotalToState(total);
  }

  setTotalToState(total) {
    let newTotal = Math.round(total * 100) / 100;
    this.setState({total: newTotal});
  }

  calculateTotalWithTax(rate) {
    let result = this.state.total * rate;
    return Math.round(result * 100) / 100;
  }

  //MARK: handle checkout button tapped
  handleCheckout() {
  
  }


  //render table component
  renderTable() {
    const {
      total,
      availablePoints,
      redeemValue,
      taxRate
    } = this.state
    return(
      <Table>
        <thead>
          <tr className='table-heading'>
            <th className='name-heading'>Name</th>
            <th>Color</th>
            <th>Size</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {this.renderOrderTr()}
          <tr>
            <td colSpan={4} className='points-will-earn'>You will earn {total} points with this order.</td>
            <td colSpan={2} className="subtotal">Sub-total: {total}</td>
          </tr>
          {this.renderTotalSectionTr('Tax', taxRate)}
          {this.renderTotalSectionTr('Total', taxRate)}
          <tr>
            <td colSpan={4} />
            <td colSpan={2} className="use-points">
              <Checkbox isChecked={true}
                label={`Redeem ${availablePoints} points for $${redeemValue}`}
                handleCheckboxChange={this.handleCheckboxChange.bind(this)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={5} />
            <td colSpan={1}>
              <Button className="checkout" onClick={this.handleCheckout}>Check out</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    )
  }

  //render the body part that is populated by products
  renderOrderTr() {
    return(
      this.state.products.map((order) =>
        <tr className='table-content' key={order.id}>
          <td className='name-data'>{order.name}</td>
          <td className='order-data'>{order.color}</td>
          <td className='order-data'>{order.size}</td>
          <td className='order-data'>{order.price}</td>
          <td className='order-data'>{order.orderQuantity}</td>
          <td className='order-data'>{order.total}</td>
        </tr>
      )
    )
  }

  renderTotalSectionTr( label, rate) {
    return(
      <tr>
        <td colSpan={4} />
        <td colSpan={2} className={label.toLowerCase()}>{label}: {this.calculateTotalWithTax(rate)}</td>
      </tr>
    )
  }


  render() {
    const { products } = this.state;
    return (
      <Page pageTitle="cart" history goBack={this.goBack}>
        <div className="cart-page">
          {this.renderTable()}
        </div>
      </Page>
    );
  }
}

export default Cart;
