// Framework
import { Meteor } from "meteor/meteor";

// Action Types
import {
  FETCH_LAST_ORDER,
  OPEN_RETURNS_DRAWER,
  UPDATE_RETURNS_QUANTITY
} from "../constants/actionTypes.js";

export const fetchLastOrder = () => dispatch => {
  Meteor.call("orders.getLastOrder", (error, response) => {
    if (error) {
      throw new Error("Meteor (fetchLastOrder) error:", error);
    }
    return dispatch({
      type: FETCH_LAST_ORDER,
      payload: response.merchantOrders
    });
  });
};

export const openReturnsDrawer = (id, purchaseQuantity) => {
  const returnItem = { id, purchaseQuantity, returnQuantity: 0 };
  return { type: OPEN_RETURNS_DRAWER, payload: returnItem };
};

export const updateReturnsQuantity = data => {
  return { type: UPDATE_RETURNS_QUANTITY, payload: data };
};
