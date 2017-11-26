import * as types from "../types";

const initialState = {
  loading: false,
  error: null,
  merchants: [],
  products: []
};

export default function merchantsReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_MERCHANTS_SUCCESS: {
      const merchants = [...action.merchants];

      const getProductsFromMerchant = ({ products, brands }) =>
        products.map(({ belongsToBrand, ...product }) => ({
          ...product,
          brand: brands[belongsToBrand]
        }));

      const products = merchants.reduce(
        (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
        []
      );

      return Object.assign({}, state, {
        loading: false,
        error: null,
        merchants,
        products
      });
    }
    case types.FETCH_MERCHANTS_FAILURE: {
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
    }
    default: {
      return state;
    }
  }
}
