// @flow

// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Alert } from "reactstrap";
import Page from "../components/Page.jsx";

class ReturnsPage extends Component {
  constructor(props) {
    super(props);
    // Initialize State
    this.initialState = {
      lastOrder: null,
      error: null
    };
    this.state = this.initialState;
  }

  componentWillMount() {
    Meteor.call("orders.getLastOrder", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      }
      this.setState(() => ({ lastOrder: response }));
    });
  }

  render() {
    const { lastOrder, error } = this.state;
    const sellersWithItems = lastOrder && lastOrder.merchantOrders;
    if (error) {
      return (
        <Alert>
          <div>Oh no! Error!</div>
          {error}
        </Alert>
      );
    }
    return (
        <Page sellersWithItems={sellersWithItems}></Page>
    );
  }
}

export default ReturnsPage;
