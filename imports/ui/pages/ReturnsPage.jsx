// @flow

// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Button } from "reactstrap";
import Page from "../components/Page.jsx";
import MerchantOrders from "../components/MerchantOrders";

class ReturnsPage extends Component {
  constructor(props) {
    super(props);
    // Initialize State
    this.state = {
      lastOrder: null,
      error: null
    };
  }

  componentDidMount() {
    Meteor.call("orders.getLastOrder", (error, response) => {
      if (error) {
        this.setState({ error });
      }
      this.setState({ lastOrder: response });
    });
  }

  render() {
    const { lastOrder, error } = this.state;
    console.log("lastOrder:", lastOrder);
    return (
      <Page>
        <div>
          <p>←</p>
          <p>1 of 3</p>
          <p>How many items would you like to return?</p>
          <Button color="primary">Talk to someone</Button>
        </div>
        <div>
          {error && <p>{error}</p>}
        </div>
        <div>
          {lastOrder
            ? <MerchantOrders lastOrder={lastOrder} />
            : <p>Loading in 2017, lol</p>}
        </div>
        <div>
          <Button color="primary">Terms & Conditions →</Button>
        </div>
      </Page>
    );
  }
}

export default ReturnsPage;
