// Framework
import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

// Libraries
import "bootstrap/dist/css/bootstrap.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

// Client Imports
import Routes from "../../ui/Routes.jsx";

// Actual Rendering Function
const renderApp = () =>
  render(
    <MuiThemeProvider>
      <Routes />
    </MuiThemeProvider>,
    document.getElementById("render-target")
  );

// Start App
Meteor.startup(() => {
  renderApp();
});
