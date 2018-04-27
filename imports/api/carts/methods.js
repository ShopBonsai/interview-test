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

/**
 * get a cart by cartId
 *
 * @returns {Object} A single cart object.
 */
export const getCartById = cartId => {
  try {
    return Carts.findOne(cartId);
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:carts.findOrFetchError`,
      `Could not find or fetch cart with cart id: '${cartId}'`,
      error
    );
  }
};




// Register meteor methods.
Meteor.methods({
  "carts.createCart": createCart,
  "carts.updateCartById": updateCartById,
  "carts.getCartById": getCartById
});
