import React, { Component } from "react";
import { withHistory, Link } from 'react-router-dom';
import { Orders } from "../../api/orders/collection.js";

import { Accounts } from 'meteor/accounts-base';

const Footer = () => {
  // show sign-in status and user cart
  if(Meteor.userId() !== null){
    return <footer>Signed In - {Orders.find({belongsTo: Meteor.userId()}).count()} Items in . <Link to="/cart"> Cart </Link></footer>;
  } else {
    return <footer>You Are Not Logged in - Log in or Signup <Link to="/signup">here</Link></footer>
  }
}

export default Footer;
