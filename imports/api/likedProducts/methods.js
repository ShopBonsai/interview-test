// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { LikedProducts } from "./collection";

export const addLikedProduct = name => {
  let likedProduct;
  try {
    likedProduct = LikedProducts.insert({
      name: name,
      liked: true
    });
  } catch (error) {
    throw new Meteor.Error("this is an error", error);
  }
  return likedProduct;
};

export const removeLikedProduct = name => {
  let removeLikedProduct;
  try {
    removeLikedProduct = LikedProducts.findOne(("name": name));
  } catch (error) {
    throw new Meteor.Error("this is an error", error);
  }
};

Meteor.methods({
  "likedProducts.addLikedProduct": addLikedProduct
});
