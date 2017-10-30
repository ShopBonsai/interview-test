// Framework
import { Meteor } from "meteor/meteor";

// Types
import types from "./types";
import constants from "../constants/constants";

// Helper
import {
  getProductsFromMerchant,
  getAttributePossibilities
} from "../helpers/products-helper";

export function fetchProducts() {
  return function(dispatch) {
    Meteor.call("merchants.getMerchants", (error, response) => {
      if (error) {
        // do something with error
      } else {
        const products = response.reduce(
          (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
          []
        );

        const filterOptions = getAttributePossibilities(
          constants.ATTRIBUTES,
          products
        );

        // set products
        dispatch({
          type: types.SET_ALL_PRODUCTS,
          products,
          filterOptions
        });
      }
    });
  };
}

export function filterProducts(attribute, value) {
  return {
    type: types.FILTER_PRODUCTS,
    attribute,
    value
  };
}

export function addToCart(product) {
  return {
    type: types.ADD_TO_CART,
    product
  };
}

export function removeFromCart(product) {
  return {
    type: types.REMOVE_FROM_CART,
    product
  };
}

export function checkout() {
  return function(dispatch, getState) {
    const { items } = getState().cart;
    if (Object.keys(items).length === 0) {
      alert("No items in cart! Add some items before checking out.");
      return;
    }

    Meteor.call("orders.createOrder", items, (error, response) => {
      if (error) {
        // do something with the error
      } else {
        alert("Your order has been placed!");
        dispatch({
          type: types.CLEAR_CART
        });
      }
    });
  };
}
