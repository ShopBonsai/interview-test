// @flow

// Framework
import { Mongo } from "meteor/mongo";

// Create new Collection
export const LogHistory = new Mongo.Collection("loghistory");
