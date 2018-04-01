// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { Carts } from "./collection";


export const createCart = () => {
  let id;
  try {
    id = Carts.insert({products: []})
  } catch (error) {
    throw new Meteor.Error("Error: ", error);
  }
  return id;
};

export const getCart = (cartId) => {
  let cart;
  try {
    cart = Carts.find({_id: cartId}).fetch();

  } catch (error) {
    throw new Meteor.Error("Error: ", error);
  }
  console.log(cart);
  return cart;
};

export const addProductToCart = (params) => {
  console.log("IT WORKS");
  console.log(params.cartId);
  console.log(params.product);
  Carts.update(
    {_id: params.cartId},
    {$push: { products : params.product}}
  );

  console.log(Carts.find().fetch());

};


Meteor.methods({
  "carts.createCart": createCart,
  "carts.getCart": getCart,
  "carts.addProductToCart": addProductToCart
});