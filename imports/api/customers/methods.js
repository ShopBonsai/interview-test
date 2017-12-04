// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { Customers } from "./collection";

export const getCustomerById = CustomerId => {
  try {
    return Customers.findOne({ _id: CustomerId });
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getOrderById.findOrFetchError`,
      `Could not find or fetch product with order id: '${CustomerId}'`,
      error
    );
  }
};

// Register meteor methods.
Meteor.methods({
  "customers.getCustomersById": getCustomerById
});
