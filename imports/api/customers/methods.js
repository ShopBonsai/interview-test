// import modules
import { Meteor } from "meteor/meteor";
import Customers from "./collection";

// set server methods
Meteor.methods({
  insertCustomer: async profile => {
    const user = await Customers.findOne({ email: profile.email });
    if (user === undefined) {
      const doc = await Customers.insert(profile);
      return doc;
    }
    // console.log("RETURN:".yellow, user._id);
    return user._id;
  },
  addOrderToCustomer: async (customer, orderId) => {
    const result = await Customers.update(customer, {
      $push: { orders: orderId }
    });
    // const check = await Customers.findOne({ _id: customer });
    // console.log("TEST:".yellow, check);
    return result;
  }
});
