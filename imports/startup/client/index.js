// Framework
import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import * as firebase from "firebase";

// Libraries
import "bootstrap/dist/css/bootstrap.css";

// Client Imports
import Routes from "../../ui/Routes.jsx";

// Actual Rendering Function
const renderApp = () =>
  render(<Routes />, document.getElementById("render-target"));

// Start App
//Unadvised exposure of apikey in env environment TODO : run grunt Encryption for ApiKey
Meteor.startup(() => {
  firebase.initializeApp({
    apiKey: "AIzaSyBJ2FxMWnSs9jTQQt0n7dEy2z20otd1-DI",
    storageBucket: "interview-test-e52ba.appspot.com",
    authDomain: "interview-test-e52ba.firebaseapp.com"
  });
  renderApp();
});
