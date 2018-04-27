// @flow

// Framework
import { Mongo } from "meteor/mongo";

// Create new Collection
export const Favorites = new Mongo.Collection("favorites");
