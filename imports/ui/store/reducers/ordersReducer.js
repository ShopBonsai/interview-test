const initialState = {
  isLoading: false,
  hasError: false,
  objects: []
};

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case "TEST":
    default:
      return state;
  }
}