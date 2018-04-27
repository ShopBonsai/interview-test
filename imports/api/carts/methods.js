// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { Carts } from "./collection";

/**
 * Insert a cart
 *
 */
export const createCart = product => {
  let cartId;
  try {
    cartId = Carts.insert({products:[product]});
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}`,
      `Could not insert ${product}`,
      error
    );
  }
  return cartId;
};

/**
 * Update a cart with new product
 *
 */
export const updateCartById = cartParams => {
  Carts.update(
    {_id: cartParams.id},
    {$push: { products: cartParams.product }}
  );
};

// Register meteor methods.
Meteor.methods({
  "carts.createCart": createCart,
  "carts.updateCartById": updateCartById
});
