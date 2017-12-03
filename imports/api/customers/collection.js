// @flow

// Framework
import { Mongo } from "meteor/mongo";

// Create new Collection
export const Customers = new Mongo.Collection("customers");
