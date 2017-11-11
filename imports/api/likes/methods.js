// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { Likes } from "./collection";

/**
 * Get an like by id
 *
 * @returns {Object} A single like object.
 */
export const getLikes = () => {
  try {
    return Likes.find({}).fetch();
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getLikes.findOrFetchError`,
      `Could not find or fetch likes with product id: '${productId}'`,
      error
    );
  }
};

export const createLikeByProductId = productId => {
  let likes = Likes.find({ productId: productId }).fetch();
  if (likes.length === 0) {
    try {
      return Likes.insert({ productId: productId, count: 1 });
    } catch (error) {
      throw new Meteor.Error(
        `${__filename}:createLikeByProductId.insertError`,
        `Could not insert like with product id: '${productId}'`,
        error
      );
    }
  }
         
  try {
    let count = likes[0].count + 1;
    Likes.update(likes[0]._id, { $set: { count: count } });
    return count;    
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:createLikeByProductId.updateError`,
      `Could not update with product id: '${productId}'`,
      error
    );
  }
}

// Register meteor methods.
Meteor.methods({
  "likes.getLikes": getLikes,
  "likes.createLikeByProductId": createLikeByProductId
});
