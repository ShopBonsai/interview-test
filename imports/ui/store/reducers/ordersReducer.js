const initialState = {
  loading: false,
  error: false,
  orders: []
};

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case "TEST":
    default:
      return state;
  }
}
