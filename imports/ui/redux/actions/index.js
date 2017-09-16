import { Meteor } from "meteor/meteor";

import { FETCH_LAST_ORDER, OPEN_RETURNS_DRAWER } from "../constants";

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

export const openReturnsDrawer = (id, purchaseQuantity) => dispatch => {
  const returnItem = { id, purchaseQuantity, returnQuantity: 0 };
  console.log("openReturnDrawer action creator payload:", returnItem);
  return dispatch({
    type: OPEN_RETURNS_DRAWER,
    payload: returnItem
  });
};
