// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

import moment from "moment";

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

// Components
import { Alert, Row, Col, Button } from "reactstrap";
import Page from "../components/Page.jsx";
import ProductInline from "../components/ProductInline";
// import Button from "../components/Button";

import {updateCart,createOrder} from "../reducers/orders";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchants: [],
      error: null
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
      alert("Please login first.")
    }

  }

  footer = () => {
    return (
      <Container>
      <Row style={{textAlign:"center"}}>
        <Col style={{padding:"0"}}>
          <Button
            style={{width:"100%"}}
            onClick={()=>{this.props.history.push("/cart")}}
          >
            Cart
          </Button>
        </Col>
        <Col style={{textAlign:"center"}}>
          Total
        </Col>
        <Col style={{padding:"0"}}>
          <Button
            style={{width:"100%"}}
            onClick={()=>{this.createOrder}}
          >
            Buy
          </Button>
        </Col>
      </Row>
      </Container>  
  )}

  goBack = () => this.props.history.push("/shop");

  createOrderbutton = (productsInCart,totalCost) => {
    return (
      <Button block onClick={()=>{this.createOrder(productsInCart,totalCost)}}>Buy (${totalCost})</Button>
      )
  }

  render() {

    let {currentCart,merchants} = this.props;

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
      footer={() => this.createOrderbutton(productsInCart,totalCost)}>
        <div className="shop-page">
          this is the current cart of products, has prices and total and buy button to commit the order.
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
