// Framework
import React, { Component } from "react";
import CartRow from "./CartRow.jsx";

class CartTable extends Component {
  render() {
    const rows = [];
    const cartItems = this.props.cartItems;
    
    if (cartItems) {
      cartItems.map(item => {
        rows.push(
          <CartRow key={item.item.name} item={item}/>
        )
      })
    }

    let subTotal;
    let tax;
    let total;
    const cartCalculation = this.props.cartCalculation;
    
    if (cartCalculation) {
      subTotal = cartCalculation.subTotal;
      tax = cartCalculation.tax;
      total = cartCalculation.total;
    }

    const Rows = () => {
      if (rows.length) {
        return (
          <table>
            <thead>
              <tr>
                <th>NAME</th>
                <th>QUANTITY</th>
                <th>PRICE</th>
              </tr>
            </thead>
            <tbody>
              {rows}
              <tr>
                <td></td>
                <td>SUB-TOTAL</td>
                <td>$&nbsp;{subTotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td></td>
                <td>TAX</td>
                <td>$&nbsp;{tax.toFixed(2)}</td>
              </tr>
              <tr>
                <td></td>
                <td>TOTAL</td>
                <td>$&nbsp;{total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        );
      } else {
        return null;
      }
    }

    return (
      <Rows />
    );
  }
}

export default CartTable;