// Framework
import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

import { Provider } from 'react-redux'  
import { createStore, applyMiddleware } from 'redux';  
import thunk from 'redux-thunk';

// Libraries
import "bootstrap/dist/css/bootstrap.css";

// Client Imports
import Routes from "../../ui/Routes.jsx";
import appReducer from '../imports/ui/reducers'; // need to create

const store = createStore(appReducer, applyMiddleware(thunk));

// Actual Rendering Function
const renderApp = () =>
  render(
	<Provider store={store}>
  		<Routes />
  	</Provider>
	, document.getElementById("render-target"));

// Start App
Meteor.startup(() => {
  renderApp();
});
