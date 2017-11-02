// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { Visits } from "./collection";

/**
 * Log a page visit
 *
 * @returns The order id sting
 */
export const logVisit = page => {
  try {
    //not familari with meteor, could not find documentation on where to get the request data
    // console.log(this.connection.httpHeaders.host);
    // let ip = this.connection.httpHeaders.methodClientIP(this);
    // let agent = this.connection.httpHeaders.get(this)["user-agent"];

    return Visits.insert({ page, createOn: new Date() });
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:createOrder.insertError`,
      `Could not insert visit log. Got error: ${error}`,
      error
    );
  }
};

/**
 * get a page visit
 * @params {string} page
 * @returns The count
 */
export const getPageCount = page => {
  let vCount;
  try {
    vCount = Visits.find({ page }).fetch().length;
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getPageCount.findOrFetchError`,
      `Could not find or fetch Visits`,
      error
    );
  }
  return vCount;
};

// Register meteor methods.
Meteor.methods({
  "visits.logVisit": logVisit,
  "visits.getPageCount": getPageCount
});
