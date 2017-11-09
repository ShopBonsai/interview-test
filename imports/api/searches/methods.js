// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { Searches } from "./collection";

/**
 * Log search client's request
 *
 */
export const createSearch = search => {
  try {
    return Searches.insert({ search, createdAt: new Date() });
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:createSearch.insertError`,
      `Could not insert search: '${search}'`,
      error
    );
  }
};
