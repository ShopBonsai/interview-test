// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// import connectMeteor from 'react-redux-meteor-data';
import {connect} from 'react-redux-meteor';

import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux';


// Components
import { Alert, Row, Col, ButtonGroup, Button, Container } from "reactstrap";
import Page from "../components/Page.jsx";
import Product from "../components/Product";

import {updateCart} from "../reducers/orders";
import {getMerchants} from "../reducers/merchants";
// import {Merchants} from "../../api/merchants/collection";


class Shop extends Component {
  constructor(props) {
    super(props);
  }

  goBack = () => this.props.history.push("/");

  footer = () => {
      return (
        <Container>
        <Row style={{textAlign:"center"}}>
          <Col style={{padding:"0"}}>
            <Button
              block
              style={{width:"100%"}}
              onClick={()=>{this.props.history.push("/cart")}}
            >
              Cart
            </Button>
          </Col>
        {/*
          <Col style={{textAlign:"center"}}>
            Total
          </Col>
          <Col style={{padding:"0"}}>
            <Button
              style={{width:"100%"}}
              onClick={()=>{console.log("clicked on Buy")}}
            >
              Buy
            </Button>
          </Col>
        */}
        </Row>
        </Container>  
      )}

  render() {
    const { merchants, error } = this.props.merchants;

    const getProductsFromMerchant = ({ products, brands }) =>
      products.map(({ belongsToBrand, ...product }) => ({
        ...product,
        brand: brands[belongsToBrand]
      }));

    const products = merchants.reduce(
      (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
      []
    );

    return (
      <Page pageTitle="shop" history goBack={this.goBack} goTo={this.goTo} goToTitle={"Cart"} footer={this.footer}>
        <div className="shop-page">
          {products.map(({ id, ...product }) =>
            <Product {...product} 
              key={id} 
              onPlusClick={()=>{this.props.updateCart(id,1)}}
              onMinusClick={()=>{this.props.updateCart(id,-1)}}
              quantityInCart={this.props.currentCart[id]}
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

const mapTrackerToProps = (state, props) => {
  if (Meteor.subscribe('merchants').ready()) {
    return { merchants: { merchants: Merchants.find().fetch(),error:false} };
  }
  return { merchants: {merchants:[],error:false} };
};

const mapStateToProps = (state) => ({
  merchants:state.merchants,
  orders:state.orders.orders,
  currentCart:state.orders.cart,
  progress:state.orders.progress
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateCart,
  getMerchants
},dispatch)

export default connect(
  //mapTrackerToProps, 
  null,
  mapStateToProps,
  mapDispatchToProps
)(Shop);
