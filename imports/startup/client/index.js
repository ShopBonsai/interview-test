// Framework
import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

// Libraries
import "bootstrap/dist/css/bootstrap.css";

/* the IntlProvider component is neccesary 
to set the default language, measure and currency in the application */
import {IntlProvider} from 'react-intl';

// Client Imports
import Routes from "../../ui/Routes.jsx";

// Actual Rendering Function
const renderApp = () =>
  render(
  <IntlProvider locale="en">
        <Routes />
    </IntlProvider>
  , document.getElementById("render-target"));

// Start App
Meteor.startup(() => {
  renderApp();
});
