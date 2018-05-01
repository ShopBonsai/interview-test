// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import Modal from "../components/Modal.jsx";

class ThankYou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: null,
      error: null
    };
  }

  componentWillMount() {
    // Handle u
    if (!this.props.location.state || !this.props.location.state.orderId) {
      return this.props.history.push("/shop");
    }
    Meteor.call(
      "orders.getOrderById",
      this.props.location.state.orderId,
      (error, response) => {
        if (error) {
          this.setState(() => ({ error: error }));
        } else {
          this.setState(() => ({ order: response }));
        }
      }
    );
  }
  render() {
    if (!this.state.order) {
      return <div />;
    }
    return (
      <Modal
        title="Thank you for your purchase!"
        body={`Your tracking number: ${this.state.order.trackingNumber}`}
        close={() => this.props.history.push("/shop")}
      />
    );
  }
}

export default ThankYou;
