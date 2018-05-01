// Framework
import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

// Create new Collection
const Customers = new Mongo.Collection("customers");

// set schema for players
const CustomerSchema = new SimpleSchema({
  profileType: { type: Object },
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  likedProducts: [Object],
  orders: [Object],
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
Customers.attachSchema(CustomerSchema);

// export module
export default Customers;
