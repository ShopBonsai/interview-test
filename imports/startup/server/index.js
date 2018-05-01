// import modules
import { Meteor } from "meteor/meteor";
import "./registerApis";
import "./fixtures";
import ProfileTypes from "../../api/profileTypes/collection";

// startup function
Meteor.startup(() => {
  Meteor.publish("users", () => Meteor.users.find());
  Meteor.publish("profileTypes", () => ProfileTypes.find({}, { fields: { name: 1} }));
});
