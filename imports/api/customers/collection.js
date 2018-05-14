// Framework
import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

// Create new Collection
const Customers = new Mongo.Collection("customers");

// set restrictions on what actions can be made to this collection
Customers.allow({
  insert() {
    return false;
  },
  update() {
    return false;
  },
  remove() {
    return false;
  }
});
Customers.deny({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  }
});

// set schema for players
const CustomerSchema = new SimpleSchema({
  profileType: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  orders: { type: Array },
  "orders.$": { type: String },
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
Customers.attachSchema(CustomerSchema);

// export module
export default Customers;
