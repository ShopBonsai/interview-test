// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';


// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
// import Product from "../components/Product";

import {getOrders} from "../reducers/orders";

class Shop extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getOrders();
  }

  goBack = () => this.props.history.push("/");

  render() {
    const { orders, error } = this.props.orders;
    console.log(orders);

    return (
      <Page pageTitle="shop" history goBack={this.goBack} goTo={this.goTo} goToTitle={"Cart"}>
        <div className="shop-page">
          list of orders
          {/*
          {products.map(({ id, ...product }) =>
            <Product {...product} 
              key={id} 
              onPlusClick={()=>{this.props.updateCart(id,1)}}
              onMinusClick={()=>{this.props.updateCart(id,-1)}}
              quantityInCart={this.props.currentCart[id]}
              />
          )}
          */}
        </div>
      </Page>
    );
  }
}

mapStateToProps = (state) => ({
  orders:state.orders,
})

mapDispatchToProps = (dispatch) => bindActionCreators({
  getOrders
},dispatch)

export default connect(  
  mapStateToProps,
  mapDispatchToProps
)(Shop);
