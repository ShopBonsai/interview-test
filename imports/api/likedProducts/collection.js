// @flow

// Framework
import { Mongo } from "meteor/mongo";

// Create new Collection
export const LikedProducts = new Mongo.Collection("likedProducts");
