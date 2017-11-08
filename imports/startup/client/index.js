// Framework
import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { Accounts } from "meteor/accounts-base";
import { Tracker } from "meteor/tracker";
// Libraries
import "bootstrap/dist/css/bootstrap.css";

// Client Imports
import Routes from "../../ui/Routes.jsx";
Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const userInfo = Meteor.user();
});
// Actual Rendering Function
const renderApp = () =>
  render(<Routes />, document.getElementById("render-target"));

// Start App
Meteor.startup(() => {
  renderApp();
});
