import { Meteor } from "meteor/meteor";

import { Carts } from "./collection";

/**
 * insert a new Cart order in the collection
 * @param cart
 */
export const addNewCart = cart => {
  Carts.insert({ ...cart });
  return true;
};

Meteor.methods({
  "carts.addNewCart": addNewCart
});
