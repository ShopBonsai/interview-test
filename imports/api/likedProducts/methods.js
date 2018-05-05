// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { LikedProducts } from "./collection";

// checks on server for who's logged. query for documents based on owner field
// if (Meteor.isServer) {
//   Meteor.publish("likedProducts", function todosPublication() {
//     return LikedProducts.find({
//       owner: this.userId
//     });
//   });
// }

export const addLikedProduct = (name, brand, price) => {
  let likedProduct;
  try {
    likedProduct = LikedProducts.insert({
      name: name,
      brand: brand,
      price: price,
      liked: true,
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
