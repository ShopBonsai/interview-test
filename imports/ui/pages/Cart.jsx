// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

//Component
import Page from "../components/Page.jsx";

class Cart extends Component {
	constructor(props){
	  super(props);
	  this.state = {
      orderTime: '',
	    orderedItems: [],
      totalPrice: ''
	  }
	}

  componentWillMount() {
    Meteor.call("orders.getIncompeleteOrderByUserId", Meteor.userId(), (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        this.setState(() => ({ 
          orderTime: response[0].createdAt,
          orderedItems: response[0].itemInfo,
          totalPrice: response[0].totalPrice
         }));
      }
    });
  }
    
  goBack = () => this.props.history.push("/shop");

  register = () => this.props.history.push("/register");

  login = () => this.props.history.push("/login");

  userProfile = () => this.props.history.push("/profile");

  logout = (e) => {
    e.preventDefault();
    Meteor.logout((er) => {
      if(er){
        M.toast({html: er.reason, classes: 'rounded red', displayLength: '2000'});
      } else {
        M.toast({html: "Logout Successfully!", classes: 'rounded green', displayLength: '2000'});
        this.props.history.push("/shop");
      }
    })

  }

  handleDeleteItem = (deletedItem) => {
    console.log(deletedItem.item);
    console.log(deletedItem.item.totalPrice);
    const deleteItem = deletedItem.item;
    const newStatePrice = (this.state.totalPrice - deletedItem.item.totalPrice);
    let index = this.state.orderedItems.indexOf(deleteItem)
    const newItemArr = this.state.orderedItems
    newItemArr.splice(index, 1);
    console.log(index)
    console.log(newItemArr)
    Meteor.call("orders.deleteSingleItemInOrder", Meteor.userId(), deleteItem, (error) => {
      if (error) {
        M.toast({html: error.reason, classes: 'rounded green', displayLength: '2000'});
      } else {
        M.toast({html: "Item deleted Successfully!", classes: 'rounded green', displayLength: '2000'});
        this.setState({
          totalPrice: newStatePrice,
          orderedItems: newItemArr
          })
      }
    });
  }

  handleCancel = (e) => {
    e.preventDefault();
    Meteor.call("orders.removeOrderByUserId", Meteor.userId(), (error) => {
      if (error) {
        M.toast({html: error.reason, classes: 'rounded green', displayLength: '2000'});
      } else {
        M.toast({html: "Cancelled Order Successfully!", classes: 'rounded green', displayLength: '2000'});
        this.props.history.push("/shop");
      }
    });
  }
  
  render() {
    const { orderTime, orderedItems, totalPrice } = this.state
    
    return(
      <Page pageTitle="My Cart" history goBack={this.goBack} register={this.register} login={this.login} logout={this.logout} userProfile={this.userProfile}>
        <div className="cart-page">
          <div className="container">
            <h4>Order Details: </h4>
            <div className="divider"></div>
            <div className="section">
              <div className="row">
                <div className="col s4">
                  <h5>Order Date:</h5>
                </div>
                <div className="col s8">
                  <p>{ Date(JSON.stringify(orderTime).substring(1, JSON.stringify(orderTime).length-1)) }</p>
                </div> 
              </div>   
            </div>
            <div className="divider"></div>
            <div className="section">
              <h5>Item List</h5>
              {orderedItems.map((item) => {
                let itemName = item.productInfo.name;
                let itemImage = item.productInfo.image;
                let itemColor = item.productInfo.color;
                let itemBrand = item.productInfo.brand;
                let itemDescription = item.productInfo.description;
                let itemPrice = item.productInfo.price;
                let itemSize = item.productInfo.size;
                let itemQuantity = item.quantityBought;
                let sumPrice = item.totalPrice;
                let index = orderedItems.indexOf(item);
                console.log(index)
                return( <div className="row" key={itemName}>
                         <div className="col s4">
                           <img alt={itemName} src={itemImage} height="150" width="150" />
                         </div>
                         <div className="col s4">
                          <p>{itemDescription}</p>
                         </div>
                         <div className="col s3">
                          <ul>
                            <li>Name: {itemName}</li>
                            <li>Brand: {itemBrand}</li>
                            <li>Color: {itemColor}</li>
                            <li>Price: {itemPrice}</li>
                            <li>Size: {itemSize}</li>
                            <li>Quantity: {itemQuantity}</li>
                            <li>Total Price: {sumPrice}</li>
                          </ul>
                         </div>
                         <div className="col s1">
                          <button onClick={() => this.handleDeleteItem({item})} className="btn-floating red"><i className="far fa-trash-alt"></i></button>
                         </div>
                       </div>)
               })
              }
            </div>
            <div className="divider"></div>
            <div className="section">
              <div className="row">
                <div className="col s4">
                  <h5>Total Price</h5>
                </div>
                <div className="col s8">
                  <p>{ totalPrice }</p>
                </div> 
              </div>             
            </div>
            <div className="divider"></div>
            <br /><br />
            <button className="btn waves-effect waves-light green">Check Out</button>
            <br /><br />
            <button className="btn waves-effect waves-light red"onClick={this.handleCancel}>Cancel orders</button>	
          </div>
        </div>
      </Page>
    );
  }

}

export default Cart;