import { CHECKOUT, GET_ORDERS } from "./types";

const request_checkout = () => {
  return {
    type: CHECKOUT.REQUEST
  };
};

const receive_checkout_success = success => {
  return {
    type: CHECKOUT.SUCCESS,
    success
  };
};

const receive_checkout_error = error => {
  return {
    type: CHECKOUT.ERROR,
    error
  };
};

export const checkout = (products, total) => {
  return dispatch => {
    dispatch(request_checkout());
    let order = {};
    order.products = products;
    order.total = total;
    order.customerUserId = "k37singh";
    order.status = "SENT";
    return Meteor.call("orders.createOrder", order, (error, response) => {
      if (error) {
        dispatch(receive_checkout_error(error));
      } else {
        dispatch(receive_checkout_success(response));
        alert("Order Successfully Created\nOrder ID: " + response);
      }
    });
  };
};

const request_get_orders = () => {
  return {
    type: GET_ORDERS.REQUEST
  };
};

const receive_get_orders_success = orders => {
  return {
    type: GET_ORDERS.SUCCESS,
    orders
  };
};

const receive_get_orders_error = error => {
  return {
    type: GET_ORDERS.ERROR,
    error
  };
};

export const getOrders = () => {
  return dispatch => {
    dispatch(request_get_orders());
    return Meteor.call("orders.getOrders", (error, response) => {
      if (error) {
        dispatch(receive_get_orders_error(error));
      } else {
        dispatch(receive_get_orders_success(response));
      }
    });
  };
};
