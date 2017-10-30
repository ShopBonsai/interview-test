// Framework
import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

// Libraries
import "bootstrap/dist/css/bootstrap.css";

// Client Imports
import Routes from "../../ui/Routes.jsx";
import reducers from "../../ui/reducers";

// Create redux store from reducers and allow for redux debugging
const store = compose(
  applyMiddleware(reduxThunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)(reducers);

// Start App
Meteor.startup(() => {
  render(
    <Provider store={store}>
      <Routes />
    </Provider>,
    document.getElementById("render-target")
  );
});
