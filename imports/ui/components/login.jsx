import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Template } from "meteor/templating";
import { Blaze } from "meteor/blaze";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

export default class AccountsUIWrapper extends Component {
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(
      Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container)
    );

    let self = this;
    Accounts.onLogin(function(options) {
      self.props.userActions.onLogin(Meteor.user());
    });

    Accounts.onLogout(function(options) {
      self.props.userActions.onClear();
    });
  }
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }
  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="container" />;
  }
}
