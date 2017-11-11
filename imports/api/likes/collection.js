// @flow

// Framework
import { Mongo } from "meteor/mongo";

// Create new Collection
export const Likes = new Mongo.Collection("likes");
