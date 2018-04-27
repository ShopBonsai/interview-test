// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { Profiles } from "./collection";
import { Merchants } from "../merchants/collection"

export const getProfile = async () => {
  const userId = Meteor.userId();
  let profileData;
  try {
    profileData =  await Profiles.findOne({userId});
    if(!profileData){
        await Profiles.insert({userId,favorites:[]});
        profileData =  await Profiles.findOne({userId});
    }
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getProfile.findOrFetchError`,
      `Could not find or fetch profile`,
      error
    );
  }
  return profileData;
};

export const updateProfile = async (profile) => {
  const userId = Meteor.userId();
  profile = {...profile,userId}
  let updatedProfileData,updateData,profileData;
  try {
    profileData =  await Profiles.findOne({userId});
    updateData =  await Profiles.update({userId},{$set:{favorites:profile.favorites}},{upsert:true});
    updatedProfileData =  await Profiles.findOne({userId});
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:updateProfile.updateError`,
      `Could not create a new profile`,
      error
    )
  }
  return updatedProfileData;
}

// Register meteor methods.
Meteor.methods({
  "profile.getProfile": getProfile,
  "profile.updateProfile": updateProfile,
});
