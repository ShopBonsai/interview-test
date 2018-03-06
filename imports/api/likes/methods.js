// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { Likes } from "./collection";

/**
 * Get the most recently created like, not safe for production
 *
 * @returns {Object} A single like object.
 */
export const getLastLike = () => {
  const options = { sort: { createdAt: -1 }, limit: 1 };
  try {
    const lastLikeCursor = Products.find({}, options);
    const lastLike = lastLikeCursor.fetch()[0];
    return lastLike;
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getLastLike.findOrFetchError`,
      `Could not find or fetch like. Got error: ${error}`,
      error
    );
  }
};

/**
 * Get an like by id
 *
 * @returns {Object} A single like object.
 */
export const getLikeById = likeId => {
  try {
    return Products.findOne(likeId);
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getLikeById.findOrFetchError`,
      `Could not find or fetch like with like id: '${likeId}'`,
      error
    );
  }
};

/**
 * Get an like by userName
 *
 * @returns {Object} A single like object.
 */
export const getLikesByUserName = userName => {
  try {
    return Likes.find({ userName: userName }).fetch();
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getLikeByUserName.findOrFetchError`,
      `Could not find or fetch like with user name: '${userName}'`,
      error
    );
  }
};

/**
 * Get an like by productId
 *
 * @returns {Object} A single like object.
 */
export const getLikesByProductId = productId => {
  try {
    return Likes.find({ productId: productId }).fetch();
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getLikeByProductId.findOrFetchError`,
      `Could not find or fetch like with product id: '${productId}'`,
      error
    );
  }
};

export const insertLike = like => {
  try {
    return Likes.insert(like);
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:insertLike.insertError`,
      `Could not insert like to database`,
      error
    );
  }
};

export const removeLike = (productId, userName) => {
  try {
    return Likes.remove({ productId: productId, userName: userName });
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:removeLike.insertError`,
      `Could not remove like from database`,
      error
    );
  }
};

// Register meteor methods.
Meteor.methods({
  "likes.getLastLike": getLastLike,
  "likes.getLikeById": getLikeById,
  "likes.getLikesByUserName": getLikesByUserName,
  "likes.getLikesByProductId": getLikesByProductId,
  "likes.insertLike": insertLike,
  "likes.removeLike": removeLike
});
