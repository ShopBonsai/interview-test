// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';


// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
// import Product from "../components/Product";

import {getOrders,removeAllOrders} from "../reducers/orders";

class Shop extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getOrders();
  }

  goBack = () => this.props.history.push("/");

  render() {
    const {orders} = this.props.orders;
    return (
      <Page pageTitle="orders" history goBack={this.goBack} goTo={this.goTo} goToTitle={"Cart"}>
        <div className="shop-page">
          {/*
          <button onClick={this.props.removeAllOrders} >remove orders</button>
          */}
          list of orders
          {orders.map(({ id, products, CreatedAt }) =>
            <div key={id}>
              <h2>{CreatedAt}</h2>
              <ul>
              {products.map(p=>(
                <li key={p.id}>{`${p.name} | ${p.quantity}`}</li>
              ))}
              </ul>
            </div>
          )}
        </div>
      </Page>
    );
  }
}

mapStateToProps = (state) => ({
  orders:state.orders,
})

mapDispatchToProps = (dispatch) => bindActionCreators({
  getOrders,
  removeAllOrders
},dispatch)

export default connect(  
  mapStateToProps,
  mapDispatchToProps
)(Shop);
