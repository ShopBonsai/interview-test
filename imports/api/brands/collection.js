// Framework
import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

// Create new Collection
const Brands = new Mongo.Collection("brands");

// set schema for players
const BrandSchema = new SimpleSchema({
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
Brands.attachSchema(BrandSchema);

// export module
export default Brands;
