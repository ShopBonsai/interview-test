// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { LikedProducts } from "./collection";

// export const addLikedProduct = (id, name) => {
//   LikedProducts.insert({
//     itemid: id,
//     productName: name,
//     liked: true
//   });
// };

Meteor.methods({
  "LikedProducts.addLikedProduct": addLikedProduct
});
