// @flow

// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Button } from "reactstrap";
import Page from "../components/Page.jsx";
import MerchantOrders from "../components/MerchantOrders";
import SupportModal from "../components/SupportModal";

class ReturnsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastOrder: null,
      error: null,
      showModal: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    Meteor.call("orders.getLastOrder", (error, response) => {
      if (error) {
        this.setState({ error });
      }
      this.setState({ lastOrder: response });
    });
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    const { lastOrder, error, showModal } = this.state;
    return (
      <Page>
        <div>
          <p>←</p>
          <p>1 of 3</p>
          <p>How many items would you like to return?</p>
          <Button color="primary" onClick={this.toggleModal}>
            Talk to someone
          </Button>
        </div>
        <SupportModal showModal={showModal} toggleModal={this.toggleModal} />
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
