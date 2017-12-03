// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { Carts } from "./collection";

export const getCart = Id => {
  let cart;
  try {
    cart = Carts.findOne(Id);
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getCart.findOrFetchError`,
      `Could not find cart wit id ${Id}`,
      error
    );
  }

  if (cart) {
    return cart;
  } else {
    try {
      cart = {};
      cart._id = Carts.insert({ products: [] });
    } catch (error) {
      throw new Meteor.Error(
        `${__filename}:createCart.insertError`,
        `Unable to create cart :(`,
        error
      );
    }
  }

  return cart;
};

export const addToCart = (cartId, product) => {
  let cart;

  try {
    cart = Carts.update({ _id: cartId }, { $addToSet: { products: product } });
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:addToCart`,
      `Could not add product to cart`,
      error
    );
  }

  return cart;
};

export const removeFromCart = (cartId, productId) => {
  let cart;

  try {
    cart = Carts.update(
      { _id: cartId },
      { $pull: { products: { id: productId } } }
    );
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:removeFromCart`,
      `Could not remove product from cart`,
      error
    );
  }

  return cart;
};

export const changeCartItemQuantity = (cartId, productId, value) => {
  let cart;

  try {
    cart = Carts.update(
      { _id: cartId, "products.id": productId },
      { $inc: { "products.$.quantity": value } }
    );
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:changeCartItemQuantity`,
      `Could not update cart item quantity`,
      error
    );
  }

  return cart;
};

// Register meteor methods.
Meteor.methods({
  "carts.getCart": getCart,
  "carts.addToCart": addToCart,
  "carts.removeFromCart": removeFromCart,
  "carts.changeCartItemQuantity": changeCartItemQuantity
});
