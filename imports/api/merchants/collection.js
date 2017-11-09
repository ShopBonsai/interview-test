// @flow

// Framework
import { Mongo } from "meteor/mongo";

// Create new Collection
export const Merchants = new Mongo.Collection("merchants");

if (Meteor.isServer) {
  Merchants._ensureIndex({
    "merchant": "text",
    "brands": "text",
    "products.name": "text",
  });
}