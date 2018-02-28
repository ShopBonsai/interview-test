// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import Button from "../components/Button";

/*
   the cart component is reponsible for showing the 
   user the items added by him. 
*/ 
class Cart extends Component {
   constructor(props) {
    super(props);
    this.state = {
        items : []
    };
  }

  componentWillMount(){
     console.log(this.props.items);
     this.setState({items : this.props.items});
  }

  /*
    this function renders the items that is added into the 
    cart in the Porduct component. If te items array 
    length is 0 then null is returned
  */
  renderItems(){
    const {items} = this.state;
    console.log(items.length);
    if(items.length > 0){
        const mappedItens = items.map((item) => 
            <li className="list-group-item">
                description: {item.product.name} subtotal: {item.product.price * item.quantity} </li>);
        return mappedItens;
    }else{
        return null;
    }
}

render() {
    return (
         <div className="cart-wrapper">
            <ul className="list-group cart-list">
                {this.renderItems()}
            </ul>
        </div>
    );
  }
}

export default Cart;