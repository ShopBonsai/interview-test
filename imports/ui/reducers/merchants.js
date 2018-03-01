const initialState = { merchants: [], openSnackbar: false, message: "" };

export default function(state = initialState, action) {
  switch (action.type) {
    case "FETCH_ALL":
      return { ...state, merchants: action.payload };
    case "DELETE_MERCHANT":
      return {
        ...state,
        merchants: state.merchants.filter(item => item._id !== action.payload)
      };
    case "ADD_MERCHANT":
      return {
        ...state,
        merchants: [...state.merchants, action.payload]
      };
    case "OPEN_SNACKBAR":
      return {
        ...state,
        openSnackbar: true,
        message: action.payload
      };
    case "CLOSE_SNACKBAR":
      return {
        ...state,
        openSnackbar: false,
        message: ""
      };

    default:
      return state;
  }
}
