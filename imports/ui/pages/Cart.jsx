import React, { Component } from "react";
import { Accounts } from 'meteor/accounts-base';
import { Orders } from "../../api/orders/collection.js";
import { Tracker } from "meteor/tracker";
import { withHistory, Link } from 'react-router-dom';
export default class Cart extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      items: []
    };
  }
  componentDidMount(){
    Tracker.autorun(()=> {
      const items = Orders.find({belongsTo: Meteor.userId()}).fetch();
      this.setState({ items });
        const info = this.state.items;
    });
  }
  componentWillMount(){

  }
  // render user cart items with quantity incrementer
  renderCartItems(){
    return this.state.items.map((item)=>{
        return <ul className="cartItems" key={item._id}>
          <li>{item.name} - {item.size}</li>
          <li className="cost">${item.price.toFixed(2)} (x{item.quantity})</li>
          <li>
          <button className="qtyBtn" onClick={() => {
            if(item.quantity > 1){
            Orders.update(item._id, {$inc: {quantity: -1}});
              }
            }}>←</button>{item.quantity}
          <button className="qtyBtn" onClick={() => {
            Orders.update(item._id, {$inc: {quantity: 1}});
            }}>→</button>
            <button id="close" className="qtyBtn" onClick={() => {
              Orders.remove({_id: item._id})
            }}>X</button>
        </li>
        </ul>
        });
      }

  handlePurchase = () => {
    // generate user balance
  var userItems = document.getElementsByClassName("addedTotal")[0].innerText;
    Meteor.users.update({_id: Meteor.userId()}, {$push: {balance: userItems}});
    const orders = Orders.find({belongsTo: Meteor.userId()}).fetch();
    for(let order of Orders.find({belongsTo: Meteor.userId()}).fetch()){
      // remove purchased items from orders
      Orders.remove({_id: order["_id"]});
    }
    this.props.history.push('/shop')
  }

  render (){
    var addedTotal = 0
    for(let obj of this.state.items){
      addedTotal += (obj["quantity"] * obj["price"]);
    }
    return(
      <div>
        <p>Cart Items</p>
        <p><Link to="/shop">Shop</Link></p>
        <ul className="cartHeadings">
        <li>Item</li>
        <li>Total</li>
        <li>Quantity</li>
      </ul>
        <div>
          {this.renderCartItems()}
        </div>
        <div className="addedTotal">
          ${addedTotal.toFixed(2)}
        </div>
        <div className="total">Total:</div>
        <div></div>
        <button className="confirmCart" onClick={this.handlePurchase}>Confirm</button>
      </div>
    );
  }
};
