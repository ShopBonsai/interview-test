// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { Carts } from "./collection";

export const createCart = () => {
  let id;
  try {
    id = Carts.insert({ products: [] });
  } catch (error) {
    throw new Meteor.Error("Error: ", error);
  }
  return id;
};

export const getCart = cartId => {
  let cart;
  try {
    cart = Carts.find({ _id: cartId }).fetch();
  } catch (error) {
    throw new Meteor.Error("Error: ", error);
  }
  return cart;
};

export const addProductToCart = params => {
  Carts.update({ _id: params.cartId }, { $push: { products: params.product } });
};

export const deleteCart = cartId => {
  try {
    Carts.remove({ _id: cartId });
  } catch (error) {
    throw new Meteor.Error("Error: ", error);
  }
};

Meteor.methods({
  "carts.createCart": createCart,
  "carts.getCart": getCart,
  "carts.addProductToCart": addProductToCart,
  "carts.deleteCart": deleteCart
});
