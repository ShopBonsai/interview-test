import React, { Component } from "react";
import ReactDOM from "react-dom";
import Button from "../Button";
import { Template } from "meteor/templating";
import { Blaze } from "meteor/blaze";

import "./styles.css";

class AccountsUIWrapper extends Component {
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(
      Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container)
    );
  }
  componentWillUnmount() {
    Blaze.remove(this.view); // Clean up Blaze view
  }
  render() {
    return <span ref="container" />; // Render a placeholder
  }
}

export default AccountsUIWrapper;
