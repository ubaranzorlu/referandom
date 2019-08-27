import { SET_USER } from "../actions/actionTypes";

const initialState = {
  data: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        data: action.user
      };
    default:
      return state;
  }
};

export default reducer;
