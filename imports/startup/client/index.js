// Framework
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Meteor } from "meteor/meteor";

// Libraries
import "bootstrap/dist/css/bootstrap.min.css";

// Client Imports
import store from "../../redux/store";
import Ui from "../../ui";

// Actual Rendering Function
const renderApp = () =>
  render(
    <Provider store={store}>
      <Ui />
    </Provider>,
    document.getElementById("render-target")
  );

// Start App
Meteor.startup(() => {
  renderApp();
});
