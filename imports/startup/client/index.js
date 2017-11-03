// Framework
import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "../../ui/store/reducers";

// Libraries
import "bootstrap/dist/css/bootstrap.css";

// Client Imports
import Routes from "../../ui/Routes.jsx";

let store = createStore(reducers);

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
