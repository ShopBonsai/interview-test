// @flow

// Framework
import { Mongo } from "meteor/mongo";

// Create new Collection
export const Users = new Mongo.Collection("users");
