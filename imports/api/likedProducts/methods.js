// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { LikedProducts } from "./collection";

export const addLikedProduct = name => {
  let selectedProduct;
  try {
    selectedProduct = LikedProducts.insert({
      name: name,
      liked: true
    });
  } catch (error) {
    throw new Meteor.Error("this is an error", error);
  }
  return selectedProduct;
};

Meteor.methods({
  "likedProducts.addLikedProduct": addLikedProduct
});
