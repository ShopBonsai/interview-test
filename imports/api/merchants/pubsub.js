import { Meteor } from "meteor/meteor";
import { Merchants } from "./collection";

Meteor.publish('merchants', () => {
  return Merchants.find({});
});