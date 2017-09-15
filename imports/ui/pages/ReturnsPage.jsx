// @flow

// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Button } from "reactstrap";
import Page from "../components/Page.jsx";
import MerchantOrders from "../components/MerchantOrders";
import SupportModal from "../components/SupportModal";
import Drawer from "../components/Drawer";

class ReturnsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastOrder: null,
      error: null,
      showModal: false,
      showDrawer: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
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

  toggleDrawer() {
    this.setState({ showDrawer: !this.state.showDrawer });
  }

  render() {
    const { lastOrder, error, showModal, showDrawer } = this.state;
    const { toggleModal, toggleDrawer } = this;
    return (
      <Page>
        <div>
          <p>←</p>
          <p>1 of 3</p>
          <p>How many items would you like to return?</p>
          <Button color="primary" onClick={toggleModal}>
            Talk to someone
          </Button>
        </div>
        <Drawer right={true} showDrawer={showDrawer} />
        <SupportModal showModal={showModal} toggleModal={toggleModal} />
        <div>
          {lastOrder
            ? <MerchantOrders
                lastOrder={lastOrder}
                toggleDrawer={toggleDrawer}
              />
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
