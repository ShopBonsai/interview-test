// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { Orders } from "./collection";

export const getProfile = (userId) => {
  let profileData;
  try {
    profileData = Profiles.find({userId}).fetch();
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getProfile.findOrFetchError`,
      `Could not find or fetch profile`,
      error
    );
  }
  return profileData;
};

export const updateProfile = (profile) => {
  const userId = Meteor.userId();
  try {
    return Profile.update({userId},profile,{upsert:true});
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:createOrder.createError`,
      `Could not create a new order`,
      error
    )
  }
}

// Register meteor methods.
Meteor.methods({
  "rofiles.getProfile": getProfile,
  "profile.updateProfile": updateProfile,
});
