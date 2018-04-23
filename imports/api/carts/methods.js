// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { Carts } from "./collection";

/**
 * Used to create the user's cart item when a new user is registered
 *
 * @returns {Object} A single cart object.
 */
export const newCart = () => {
  try {
    return Carts.insert({
      userId: Meteor.userId(),
      items: []
    });
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:newCart.createError`,
      `Could not create new cart. Got error: ${error}`,
      error
    );
  }
};

/**
 * Get cart by logged in userId
 *
 * @returns {Object} A single cart object.
 */
export const getCart = () => {
  try {
    return Carts.findOne({ userId: Meteor.userId() });
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getCart.findOrFetchError`,
      `Could not find or fetch cart`,
      error
    );
  }
};

/**
 * Adds selected item to cart
 */
export const addCartItem = ({ id, image, name, price, selected, quantity }) => {
  try {
    let cartData = getCart();
    let newItem = true;

    // loops through the current cart trying to find if this item is already there
    for (let i = 0; i < cartData.items.length; i++) {
      // if the item already exists
      if (cartData.items[i].id === id) {
        // if the added amount will not push the quantity over what is in stock, update the amount
        if (cartData.items[i].selected + selected <= quantity) {
          newItem = false;
          cartData.items[i].selected += selected;
          break;
        } else {
          // otherwise, throw an error
          newItem = false;
          throw new Meteor.Error("Cannot add more than stock amount to cart");
          break;
        }
      }
    }

    // if newItem did not get toggled to false, push the item into the cart
    if (newItem) {
      cartData.items.push({
        id: id,
        image: image,
        name: name,
        price: price,
        selected: selected
      });
    }

    Carts.update({ userId: Meteor.userId() }, { ...cartData });
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:addCartItem.updateError`,
      `Could not update cart`,
      error
    );
  }
};

/**
 * Deletes target item from cart
 */
export const delCartItem = id => {
  try {
    let cartData = getCart(),
      newitems = cartData.items.filter(item => {
        return item.id !== id;
      }),
      newCart = {
        userId: cartData.userId,
        items: newitems
      };

    Carts.update({ userId: Meteor.userId() }, { ...newCart });
    return getCart();
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:delCartItem.deleteError`,
      `Could not delete item`,
      error
    );
  }
};

// Register meteor methods.
Meteor.methods({
  "carts.newCart": newCart,
  "carts.getCart": getCart,
  "carts.addCartItem": addCartItem,
  "carts.delCartItem": delCartItem
});
