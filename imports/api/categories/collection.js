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
    autoValue: () => new Date()
  },
  updatedAt: {
    type: Date,
    autoValue: () => new Date()
  }
});

// add schema to players collection
Categories.attachSchema(CategorySchema);

// export module
export default Categories;
