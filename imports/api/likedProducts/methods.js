// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { LikedProducts } from "./collection";

export const addLikedProduct = (name, brand, price) => {
  let likedProduct;
  try {
    likedProduct = LikedProducts.insert({
      name: name,
      brand: brand,
      price: price,
      liked: true,
      createdAt: new Date(), // current time
      owner: Meteor.userId()
    });
  } catch (error) {
    throw new Meteor.Error("this is an error", error);
  }
  return likedProduct;
};

export const removeLikedProduct = name => {
  try {
    LikedProducts.remove({ name: name });
  } catch (error) {
    throw new Meteor.Error("this is an error", error);
  }
};

Meteor.methods({
  "likedProducts.addLikedProduct": addLikedProduct,
  "likedProducts.removeLikedProduct": removeLikedProduct
});
