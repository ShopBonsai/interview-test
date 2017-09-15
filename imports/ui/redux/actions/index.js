import { Meteor } from "meteor/meteor";

import { FETCH_LAST_ORDER } from "../constants";

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
