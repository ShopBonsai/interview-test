// Framework
import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

// Create new Collection
const Products = new Mongo.Collection("products");

// set schema for players
const ProductSchema = new SimpleSchema({
  name: { type: String },
  brand: { type: String },
  category: { type: String },
  user: { type: String },
  published: { type: Boolean },
  price: { type: Number },
  description: { type: String },
  color: { type: String },
  size: { type: String },
  quantity: { type: String },
  image: { type: String },
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
Products.attachSchema(ProductSchema);

// export module
export default Products;