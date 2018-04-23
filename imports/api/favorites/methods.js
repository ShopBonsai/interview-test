// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { Favorites } from "./collection";


export const getFavorites = (userId) => {
  let favorites;
  try {
    favorites = Favorites.find({userId}).fetch();
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getFavorites.findOrFetchError`,
      `Could not find or fetch favorties`,
      error
    );
  }
  return Favorites;
};

// Register meteor methods.
Meteor.methods({
  "favorites": getFavorites,
});
