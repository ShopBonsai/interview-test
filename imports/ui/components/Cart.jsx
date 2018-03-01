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
  renderItems = () => {
     const {items,amountDue} = this.state;
     console.log(items.length);
     if(items.length > 0){
        const mappedItens = items.map((item) => 
            <li className="list-group-item">
                description: {item.product.name} subtotal: {item.product.price * item.quantity} </li>);
            /* if the amount due is not zero it means 
               that the order is stored in the database and
               a item regarding the ammountDue value will be 
               added into the items list   */
            if(amountDue !== 0){
                mappedItens.push(<li className="list-group-item">AMOUNT DUE: {amountDue}</li>);
            }
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
          }
      });  
    }

    /*
       this function will clear the cart items, 
       and the amountDue.  
    */
    handleNewPurchase = () => {
        this.setState({items : [], amountDue : 0});
        this.props.clearItems();
    }

    /*
       this function will render the new button 
       if the current purchase is finished
    */
    renderNewPurchaseButton = () => {
         const {amountDue} = this.state;
            if(amountDue !== 0){
                 return (
                     <button onClick={this.handleNewPurchase} className="btn btn-success btn-cart-actions">  
                        new Purchase
                    </button>
                )
            } 
    }

    render() {
        return (
             <div className="cart-wrapper">
                <ul className="list-group cart-list">
                    {this.renderItems()}
                    <div className="action-wrapper">
                    <button onClick={this.handleFinishPurchase} className=" btn btn-success btn-cart-actions">  
                        finish purchase
                    </button>
                    {this.renderNewPurchaseButton()}
                    </div>
                </ul>
            </div>
         );
    }
}

export default Cart;