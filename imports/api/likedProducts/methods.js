// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { LikedProducts } from "./collection";

export const addLikedProduct = () => {
  LikedProducts.insert({
    itemid: "hello"
  });
};

Meteor.methods({
  "likedProducts.addLikedProduct": addLikedProduct
});
