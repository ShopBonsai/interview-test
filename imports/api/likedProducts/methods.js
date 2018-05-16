// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { LikedProducts } from "./collection";

//Method to get likedproducts for current user

export const getLikedProducts = () => {
  let userLikedProducts;
  try {
    userLikedProducts = LikedProducts.find({
      owner: Meteor.userId()
    }).fetch();
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getMerchants.findOrFetchError`,
      `Could not find or fetch merchants`,
      error
    );
  }
  return userLikedProducts;
};

export const addLikedProduct = (name, brand, price, image) => {
  let likedProduct;
  try {
    likedProduct = LikedProducts.insert({
      name: name,
      brand: brand,
      price: price,
      image: image,
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
  "likedProducts.getLikedProducts": getLikedProducts,
  "likedProducts.addLikedProduct": addLikedProduct,
  "likedProducts.removeLikedProduct": removeLikedProduct
});
