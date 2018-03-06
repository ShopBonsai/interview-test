// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { Users } from "./collection";

/**
 * Get an user by id
 *
 * @returns {Object} A single order object.
 */
export const getUserById = userId => {
  try {
    return Users.findOne(userId);
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getUserById.findOrFetchError`,
      `Could not find or fetch User with user id: '${userId}'`,
      error
    );
  }
};

/**
 * Get an user by userName
 *
 * @returns {Object} A single order object.
 */
export const getUserByUserName = userName => {
  try {
    return Users.findOne({ userName: userName });
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getUserByUserName.findOrFetchError`,
      `Could not find or fetch User with user name: '${userName}'`,
      error
    );
  }
};

/**
 * Insert a user
 *
 * @returns {Object} the result of the db operation.
 */
export const insertUser = user => {
  try {
    let existingUser = Users.findOne({ userName: user.userName });
    if (!existingUser) {
      existingUser = Users.insert(user);
    } else {
      existingUser = undefined;
    }
    return existingUser;
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:insertUser.findOrFetchError`,
      `Could not insert user with supplied data`,
      error
    );
  }
};

// Register meteor methods.
Meteor.methods({
  "users.getUserById": getUserById,
  "users.getUserByUserName": getUserByUserName,
  "users.insertUser": insertUser
});
