// Framework
import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

// Libraries
import "bootstrap/dist/css/bootstrap.css";

// Client Imports
import App from "../../ui/App.jsx";

// Actual Rendering Function
const renderApp = () =>
  render(<App />, document.getElementById("render-target"));

// Start App
Meteor.startup(() => {
  renderApp();
});
