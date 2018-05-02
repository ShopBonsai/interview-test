// Framework
import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

// Libraries
import "bootstrap/dist/css/bootstrap.min.css";

// Client Imports
import Router from "../../ui/Router.jsx";

// Actual Rendering Function
const renderApp = () =>
  render(<Router />, document.getElementById("render-target"));

// Start App
Meteor.startup(() => {
  renderApp();
});
