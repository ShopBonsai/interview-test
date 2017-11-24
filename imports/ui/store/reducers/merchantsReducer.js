const initialState = {
  loading: false,
  error: null,
  objects: []
};

export default function merchantsReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_MERCHANTS_SUCCESS": {
      return Object.assign({}, state, {
        loading: false,
        error: null,
        objects: [...action.merchants]
      });
    }
    case "FETCH_MERCHANTS_FAILURE": {
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
