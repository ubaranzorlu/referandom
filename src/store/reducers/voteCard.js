import { STATE_DATA } from "../actions/actionTypes";

const initialState = {
  data: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STATE_DATA:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
};

export default reducer;
