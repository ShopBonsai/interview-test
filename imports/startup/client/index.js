// Framework
import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

// Libraries
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
export const store = createStore(returnItemsApp, {});

// Client Imports
import Routes from "../../ui/Routes.jsx";
import returnItemsApp from "../../ui/reducers/reducers.jsx";
import { addItemToReturnList } from "../../ui/actions/actions.jsx";

// Actual Rendering Function
let renderApp = () =>
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
