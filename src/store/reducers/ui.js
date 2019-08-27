import { UI_FINISH_LOADING } from "../actions/actionTypes";

const initialState = {
  isLoaded: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UI_FINISH_LOADING:
      return {
        ...state,
        isLoaded: true
      };
    default:
      return state;
  }
};

export default reducer;
