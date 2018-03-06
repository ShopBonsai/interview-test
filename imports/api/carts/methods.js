// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { Carts } from "./collection";

/**
 * Get an cart by id
 *
 * @returns {Object} A single order object.
 */
export const getCartById = cartId => {
  try {
    return Carts.findOne(cartId);
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getCartById.findOrFetchError`,
      `Could not find or fetch product with cart id: '${cartId}'`,
      error
    );
  }
};

/**
 * Get a cart by user userName
 *
 * @returns {Object} A single order object.
 */
export const getCartByUserName = userName => {
  try {
    return Carts.findOne({ userName: userName });
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getCartByUserName.findOrFetchError`,
      `Could not find or fetch cart entries with userName: '${userName}'`,
      error
    );
  }
};

/**
 * Insert Cart entry
 *
 * @returns {Object} A single order object.
 */
export const insertCartEntry = (userName, cartEntry) => {
  let userCart;
  try {
    let newUserCart;
    userCart = Carts.findOne({ userName: userName });
    if (!userCart) {
      newUserCart = {
        userName: userName,
        items: [cartEntry]
      };
      userCart = Carts.insert(newUserCart);
    } else {
      userCart.items.push(cartEntry);
      userCart = Carts.update(
        { userName: userName },
        { $set: { items: userCart.items } }
      );
    }
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:insertCartEntry.findOrFetchError`,
      `Could not insert cart entry into database'`,
      error
    );
  }
  return userCart;
};

/**
 * Cleans items array from user cart
 *
 * @returns {Object} A single order object.
 */
export const emptyUserCart = userName => {
  let userCart;
  try {
    userCart = Carts.update({ userName: userName }, { $set: { items: [] } });
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:emptyUserCart.findOrFetchError`,
      `Could not clean cart entries from database'`,
      error
    );
  }
  return userCart;
};

/**
 * Remove item from user cart
 *
 * @returns {Object} A single order object.
 */
export const removeItemFromUserCart = (userName, productId) => {
  let userCart;
  try {
    let newUserCart = Carts.findOne({ userName: userName });
    newUserCart.items = newUserCart.items.filter(item => {
      return item.productId !== productId;
    });
    userCart = Carts.update(
      { userName: userName },
      { $set: { items: newUserCart.items } }
    );
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:removeItemFromUserCart.findOrFetchError`,
      `Could not remove cart entries from database'`,
      error
    );
  }
  return userCart;
};

// Register meteor methods.
Meteor.methods({
  "carts.insertCartEntry": insertCartEntry,
  "carts.emptyUserCart": emptyUserCart,
  "carts.removeItemFromUserCart": removeItemFromUserCart,
  "carts.cleanCartEntry": emptyUserCart,
  "carts.getCartById": getCartById,
  "carts.getCartByUserName": getCartByUserName
});
