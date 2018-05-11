// Framework
import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

// Create new Collection
const Orders = new Mongo.Collection("orders");

// set restrictions on what actions can be made to this collection
Orders.allow({
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
Orders.deny({
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
const OrderSchema = new SimpleSchema({
  customer: { type: String },
  products: { type: Array },
  "products.$": { type: Object },
  "products.$.id": { type: String },
  "products.$.quantity": { type: Number },
  destination: { type: String },
  trackingNumber: { type: String, optional: true },
  status: { type: String },
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
Orders.attachSchema(OrderSchema);

// export module
export default Orders;
