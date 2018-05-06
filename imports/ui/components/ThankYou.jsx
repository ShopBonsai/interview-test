// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import Modal from "../components/Modal.jsx";

class ThankYou extends Component {
  render() {
    return (
      <Modal
        title={`Thank you for purchasing ${this.props.order.name}!`}
        body={`Your tracking number: ${this.props.order.trackingNumber}`}
        close={this.props.close}
      />
    );
  }
}

export default ThankYou;
