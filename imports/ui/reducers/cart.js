const initialState = {
  opened: false,
  products: []
};

function resolveAddProducts(stateProducts, productToAdd) {
  let products = [];
  if (stateProducts.map(item => item.id).includes(productToAdd.id)) {
    products = stateProducts.map(item => {
      if (item.id === productToAdd.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
  } else {
    products = [...stateProducts, productToAdd];
  }

  return products;
}

export default function(state = initialState, action) {
  switch (action.type) {
    case "SET_CART":
      return { ...state, ...action.cart };

    case "OPEN_CART_DIALOG":
      return { ...state, opened: true };

    case "CLOSE_CART_DIALOG":
      return { ...state, opened: false };

    case "ADD_TO_CART":
      return {
        ...state,
        products: resolveAddProducts(state.products, action.product)
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        products: state.products.filter(item => item.id !== action.productId)
      };

    default:
      return state;
  }
}
