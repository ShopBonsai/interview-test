// Framework
import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

// Create new Collection
const ProfileTypes = new Mongo.Collection("profiletypes");

// set schema for players
const ProfileTypeSchema = new SimpleSchema({
  name: { type: String },
  createdAt: {
    type: Date,
    autoValue: () => new Date()
  },
  updatedAt: {
    type: Date,
    autoValue: () => new Date()
  }
});

// add schema to players collection
ProfileTypes.attachSchema(ProfileTypeSchema);

// export module
export default ProfileTypes;
