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
    cartId = Carts.insert({ products: {} });
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
  const { id, product} = cartParams;
  let productId = product.id;
  let keyName = `products.${productId}`;
  Carts.update(
    {_id: id},
    {$set: { [keyName] : product }}
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

/**
 * get a cart by cartId
 *
 * @returns {Object} A single cart object.
 */
export const getAllProductsInCart = cartId => {
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

/**
 * Delete a cart by cartId
 *
 */
export const deleteACartById = cartId => {
  try {
    return Carts.deleteOne({_id: cartId});
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:carts.deleteError`,
      `Could not delete cart with cart id: '${cartId}'`,
      error
    );
  }
};


// Register meteor methods.
Meteor.methods({
  "carts.createCart": createCart,
  "carts.updateCartById": updateCartById,
  "carts.getCartById": getCartById,
  "carts.deleteACartById": deleteACartById
});
