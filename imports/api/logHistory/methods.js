// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { LogHistory } from "./collection";

/**
 * Get a logHistory entry by id
 *
 * @returns {Object} A single order object.
 */
export const getLogHistoryById = Id => {
  try {
    return LogHistory.findOne({ id: Id });
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getLogHistoryById.findOrFetchError`,
      `Could not find or fetch log entries with id: '${Id}'`,
      error
    );
  }
};

/**
 * Get a logHistory entries by userName
 *
 * @returns {Object} A single order object.
 */
export const getLogHistoryByUserName = userName => {
  try {
    return LogHistory.find({ userName: userName }).fetch();
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getLogHistoryByLogHistoryName.findOrFetchError`,
      `Could not find or fetch log entries with user name: '${userName}'`,
      error
    );
  }
};

/**
 * insert a logHistory entry
 *
 * @returns {Object} A single order object.
 */
export const insertLogEntry = user => {
  try {
    return LogHistory.insert(user);
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:insertLogEntry.findOrFetchError`,
      `Could not insert record with supplied data`,
      error
    );
  }
};

// Register meteor methods.
Meteor.methods({
  "logHistory.getLogHistoryById": getLogHistoryById,
  "logHistory.getLogHistoryByLogHistoryName": getLogHistoryByUserName,
  "logHistory.insertLogEntry": insertLogEntry
});
