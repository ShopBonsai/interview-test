import { FILL_PRODUCTS } from "./types";
import { getMerchants } from "./merchantActions";

export const fillProducts = products => {
  return {
    type: FILL_PRODUCTS,
    products
  };
};

export const getProducts = () => {
  return dispatch => {
    return dispatch(getMerchants());
  };
};
