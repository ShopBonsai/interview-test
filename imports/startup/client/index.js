// Framework
import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

// Redux
import { Provider } from "react-redux";
import store from "../../ui/redux/store";

// Libraries
import "bootstrap/dist/css/bootstrap.css";

// Client Imports
import Routes from "../../ui/Routes.jsx";

// Actual Rendering Function
const renderApp = () =>
  render(
    <Provider store={store}>
      <Routes />
    </Provider>,
    document.getElementById("render-target")
  );

// Start App
Meteor.startup(() => {
  renderApp();
});
