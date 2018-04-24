// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';


// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
import Product from "../components/Product";

import {updateCart} from "../reducers/orders";
import {getMerchants} from "../reducers/merchants";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchants: [],
      error: null
    };
  }

  componentWillMount() {
    const {merchants} = this.props.merchants;
    merchants.length == 0 ? this.props.getMerchants() : null;
  }

  goBack = () => this.props.history.push("/");
  goTo = () => this.props.history.push("/cart");

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
      <Page pageTitle="shop" history goBack={this.goBack} goTo={this.goTo} goToTitle={"Cart"}>
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

mapStateToProps = (state) => ({
  merchants:state.merchants,
  orders:state.orders.orders,
  currentCart:state.orders.cart,
  progress:state.orders.progress
})

mapDispatchToProps = (dispatch) => bindActionCreators({
  updateCart,
  getMerchants
},dispatch)

export default connect(  
  mapStateToProps,
  mapDispatchToProps
)(Shop);
