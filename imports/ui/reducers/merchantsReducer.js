const initialState = {
  isLoading: false,
  hasError: false,
  objects: []
};

export default function merchantsReducer(state = initialState, action) {
  switch (action.type) {
    case "TEST":
    default:
      return state;
  }
}
