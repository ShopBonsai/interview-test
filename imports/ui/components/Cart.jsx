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
        items : [],
        amountDue : 0
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

    /*
        this method will finish the purchase 
        called the orders api service. 
    */ 
    handleFinishPurchase = () => {
      const items = this.state.items;
      Meteor.call("orders.finishPurchase",items,(error,response) => {
          if(error){
              console.log('erro');
          }else{
              this.setState({amountDue : response});
              console.log(response);
          }
      });  
    }

    render() {
        return (
             <div className="cart-wrapper">
                <ul className="list-group cart-list">
                    {this.renderItems()}
                    <button onClick={this.handleFinishPurchase} className=" btn btn-success ">  
                        finish purchase
                    </button>
                </ul>
            </div>
         );
  }
}

export default Cart;