// Framework
import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

// Create new Collection
const OrderStatus = new Mongo.Collection("orderstatus");

// set schema for players
const OrderStatusSchema = new SimpleSchema({
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
OrderStatus.attachSchema(OrderStatusSchema);

// export module
export default OrderStatus;
