// import modules
import { Meteor } from "meteor/meteor";
import Orders from "./collection";

// set server methods
Meteor.methods({
  insertOrder: order => {
    // console.log("TEST".magenta, order);
    const doc = Orders.insert(order);
    return doc;
  }
});
