// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
/* this component will be responsible for formatting 
the item subtotal as well as the purchase amount due */
import {FormattedNumber} from 'react-intl';
                                
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
        amountDue : 0,
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
                description: {item.product.name} subtotal: 
                 <FormattedNumber value={item.product.price * item.quantity} 
                style="currency" currency="CAD" /></li>);
            /* if the amount due is not zero it means 
               that the order is stored in the database and
               a item regarding the ammountDue value will be 
               added into the items list   */
            if(amountDue !== 0){
                mappedItens.push(<li className="list-group-item">AMOUNT DUE: 
                    <FormattedNumber value={amountDue} 
                     style="currency" currency="CAD" /></li>);
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
      const {items,amountDue} = this.state;
      // if the number of items ins greater then service api function is called
      if(amountDue === 0){
          Meteor.call("orders.finishPurchase",items,(error,response) => {
          if(error){
              console.log('erro');
          }else{
              this.setState({amountDue : response});
          }
        });    
      }else{ 
        /* 
           if the user clicks on finish purchase button 
           when it is already finished then the toaster component 
           will be raised and the message stated below will be displayed
        */

        // this is the function call to render the toaster    
        this.props.raise();
        
        // this is the function call to set the according message 
        this.props.setMessage("purchase was finished");
      }
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

     renderFinishPurchaseButton = () => {
         const {items} = this.state;
         if(items.length > 0){
            return (<button onClick={this.handleFinishPurchase} className=" btn btn-success btn-cart-actions">  
                        finish purchase
                    </button>);
         }
     }

    render() {
        return (
             <div className="cart-wrapper">
                <ul className="list-group cart-list">
                    {this.renderItems()}
                </ul>
                <div className="action-wrapper">
                    {this.renderFinishPurchaseButton()}
                    {this.renderNewPurchaseButton()}   
                </div>
            </div>
         );
    }
}

export default Cart;