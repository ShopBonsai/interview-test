// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

import moment from "moment";

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

// Components
import Page from "../components/Page.jsx";
import Button from "../components/Button";
import ProductInline from "../components/ProductInline";
// import Button from "../components/Button";

import {updateCart,createOrder} from "../reducers/orders";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message:""
    };
  }

  createOrder = (productsInCart,totalCost) => {
    if(this.props.userId){
      const order = {
        CreatedAt:moment().format(),
        totalCost,
        products:productsInCart.map(({quantityInCart,name,id,price})=>({
          quantity:quantityInCart,
          name,id,price
        }))
      }
      this.props.createOrder(order)
    } else {
      this.setState({message:"Please login first."})
    }

  }

  goBack = () => this.props.history.push("/shop");

  createOrderbutton = (productsInCart,totalCost, userId) => {
    return (
      <Button block disabled={!userId} className="not-bordered" onClick={()=>{this.createOrder(productsInCart,totalCost)}}>Buy (${totalCost})</Button>
      )
  }

  render() {

    let {currentCart,merchants,userId} = this.props;

    const getProductsFromMerchantInCart = ({ products, brands }) =>
      products
      .map(({ belongsToBrand, ...product }) => { 
        if(currentCart[product.id])
          return {
            ...product,
            brand: brands[belongsToBrand],
            quantityInCart:currentCart[product.id]
          }
        return null;
      }
    ).filter(p=> p);

    const productsInCart = merchants.reduce(
      (acc, merchant) => [...acc, ...getProductsFromMerchantInCart(merchant)],
      []
    );
    const totalCost = productsInCart.reduce((acc,p)=> acc + p.price*p.quantityInCart , 0)

    return (
      <Page pageTitle="cart" history goBack={this.goBack} 
      footer={() => this.createOrderbutton(productsInCart,totalCost,userId)}>
        <div className="shop-page">
          {userId ? null : "Please sign in before you can buy"}
          {productsInCart.map(({ id, ...product }) =>
            <ProductInline {...product} 
              key={id}
              onPlusClick={()=>{this.props.updateCart(id,1)}}
              onMinusClick={()=>{this.props.updateCart(id,-1)}}
              />
          )}
        </div>
      </Page>
    );
  }
}

/*
orders = {
  orders:[],          // has all past orders
  currentCart:[],     // has all the items for the current order
  progress:false      // flag to check if committing or not
}
*/

mapStateToProps = (state) => ({
  merchants:state.merchants.merchants,
  currentCart:state.orders.cart,
  userId:state.auth.userId
})

mapDispatchToProps = (dispatch) => bindActionCreators({
  updateCart,
  createOrder
},dispatch)

export default connect(  
  mapStateToProps,
  mapDispatchToProps
)(Cart);
