const initialState = { message: "", opened: false };

export default function(state = initialState, action) {
  switch (action.type) {
    case "ALERT":
      return { ...state, message: action.message, opened: true };

    case "CLOSE_ALERT":
      return { ...state, opened: false };

    default:
      return state;
  }
}
