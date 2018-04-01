// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { PageLoads } from "./collection";

/**
 * Increase each time the page loads
 *
 * @returns {Object} 
 */
export const increaseCountLoad = () => {
  try {
    let lastCount = PageLoads.find({}).fetch()[0].loads;
    lastCount += 1;
    PageLoads.update({} ,{ loads: lastCount })
    return lastCount
  } catch (error) {
    throw new Meteor.Error(
      `increaseCountLoad error`,
      `Could not increase time visit. Got error: ${error}`,
      error
    );
  }
};

// Register meteor methods.
Meteor.methods({
  "pageLoads.increaseCountLoad": increaseCountLoad
});
