// Action types
import types from "../actions/types";
// Helpers
import { getTypeName, filterProduct } from "../helpers/products-helper";

const INITIAL_STATE = {
  allObj: {},
  allArr: [],
  shown: [],
  filters: {
    selected: {
      name: null,
      brand: null,
      color: null,
      size: null
    },
    options: {
      name: [],
      brand: [],
      color: [],
      size: []
    }
  }
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SET_ALL_PRODUCTS:
      // build the product object (for quick id reference of all products across the app)
      const productObj = {};
      action.products.forEach(product => (productObj[product.id] = product));

      return {
        ...state,
        allObj: productObj,
        allArr: action.products,
        shown: action.products,
        filters: { ...state.filters, options: action.filterOptions }
      };
    case types.FILTER_PRODUCTS:
      // update the selected filters
      let filteredProducts;
      const selectedFilters = {
        ...state.filters.selected,
        [action.attribute]: action.value
      };

      // filter the products based on the updated filter
      filteredProducts = state.allArr.filter(product =>
        filterProduct(product, selectedFilters)
      );

      return {
        ...state,
        shown: filteredProducts,
        filters: {
          ...state.filters,
          selected: {
            ...state.filters.selected,
            [action.attribute]: action.value
          }
        }
      };
  }

  return state;
}
