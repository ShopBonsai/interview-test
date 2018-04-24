// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import moment from "moment"


// Components
import { Alert, Row, Col, Table } from "reactstrap";
import Page from "../components/Page.jsx";
import OrderDetails from "../components/OrderDetails"

import {getOrders,removeAllOrders} from "../reducers/orders";

class Shop extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getOrders();
  }

  goBack = () => this.props.history.push("/");

  render() {
    const {orders} = this.props.orders;
    const ordersByDate = orders.reduce((cc,o)=> {
      const date = moment(o.createAt).format("MMM-Do-YY");
      cc[date] ?  (cc[date].push(o) ) : (cc[date]=[o]) ;
      return cc;
      }
      ,{})

    console.log(ordersByDate);
    return (
      <Page pageTitle="orders" history goBack={this.goBack} goTo={this.goTo} goToTitle={"Cart"}>
        <div style={{width:"100%"}}>
          {Object.keys(ordersByDate).map((key) => {
              const orders = ordersByDate[key];
              return(
              <div key={key}>
                <h2 style={{textAlign:"center"}}>{key.split("-").join(' ')}</h2>
                {orders.map(O=>{
                  const products = O.products;
                  return (
                    <OrderDetails key={O.id} products={products}/>
                  )
                })}
              </div>
              ) 
          }
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
