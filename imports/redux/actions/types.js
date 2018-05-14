// define the types of actions we need to change state of our app
const actionTypes = {
  // filter
  SET_FILTER: "SET_FILTER",
  UNSET_FILTER: "UNSET_FILTER",
  SET_SORT: "SET_SORT",
  SET_PRODUCT_SHOW: "SET_PRODUCT_SHOW",
  UNSET_PRODUCT_SHOW: "UNSET_PRODUCT_SHOW",
  SET_FILTERED: "SET_FILTERED",
  RESET_UI: "RESET_UI",
  ADD_TO_CART: "ADD_TO_CART",
  UPDATE_CART_ITEMS: "UPDATE_CART_ITEMS",
  RESET_CART: "RESET_CART",
  SHOW_MODAL: "SHOW_MODAL",
  CLOSE_MODAL: "CLOSE_MODAL"
};

// export module
export default actionTypes;
