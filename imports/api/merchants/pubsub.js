import { Meteor } from "meteor/meteor";
import { Merchants } from "./collection";

Meteor.publish('merchants', function () {
  return Merchants.find({});
});