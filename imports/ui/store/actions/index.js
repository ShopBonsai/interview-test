import { SET_USER, CLEAR_USER, SET_PRODUCTS } from "./types";

export function setUser(user) {
  return {
    type: SET_USER,
    user
  };
}

export function clearUser() {
  return {
    type: CLEAR_USER
  };
}

export function setProducts(products) {
  return {
    type: SET_PRODUCTS,
    products
  };
}
