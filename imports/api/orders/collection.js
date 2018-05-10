// Framework
import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

// Create new Collection
const Orders = new Mongo.Collection("orders");

// set schema for players
const OrderSchema = new SimpleSchema({
  customerProfile: { type: String },
  products: Array,
  "products.$": Object,
  destination: { type: String },
  trackingNumber: { type: String, optional: true },
  orderStatus: { type: String },
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
