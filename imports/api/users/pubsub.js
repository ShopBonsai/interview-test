import { Meteor } from "meteor/meteor";
import { Merchants } from "./collection";

 Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId});
  } else {
    this.ready();
  }
});