// Framework
import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

// Create new Collection
const Categories = new Mongo.Collection("categories");

// set schema for players
const CategorySchema = new SimpleSchema({
  name: { type: String },
  createdAt: {
    type: Date,
    defaultValue: new Date()
  },
  updatedAt: {
    type: Date,
    defaultValue: new Date()
  }
});

// add schema to players collection
Categories.attachSchema(CategorySchema);

// export module
export default Categories;
