// import modules
import { Meteor } from "meteor/meteor";
import Orders from "./collection";

// set server methods
Meteor.methods({
  insertOrder: order => {
    // console.log("TEST".magenta, order);
    const doc = Orders.insert(order);
    return doc;
  },
  updateStatus: (orderId, newStatus) => {
    const doc = Orders.update(orderId, {
      $set: {
        status: newStatus,
        updatedAt: new Date()
      }
    });
    return doc;
  }
});
