// import modules
import { Meteor } from "meteor/meteor";
import Customers from "./collection";

// set server methods
Meteor.methods({
  insertCustomer: profile => {
    const doc = Customers.insert(profile);
    return doc;
  }
});
