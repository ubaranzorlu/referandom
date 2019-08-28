import {
  UI_FINISH_LOADING,
  UI_START_LOADING,
  UI_SHOW_TOAST,
  UI_CLOSE_TOAST,
  UI_START_COMMENT_BUTTON,
  UI_STOP_COMMENT_BUTTON,
  UI_START_LOGIN_BUTTON,
  UI_STOP_LOGIN_BUTTON,
  UI_START_REGISTER_BUTTON,
  UI_STOP_REGISTER_BUTTON
} from "../actions/actionTypes";

const initialState = {
  isLoaded: false,
  toast: {
    text: "Beklenmedik bir hata gerçekleşti",
    show: false,
    variant: "white"
  },
  commentButton: false,
  loginButton: false,
  registerButton: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UI_FINISH_LOADING:
      return {
        ...state,
        isLoaded: true
      };
    case UI_START_LOADING:
      return {
        ...state,
        isLoaded: false
      };
    case UI_SHOW_TOAST:
      return {
        ...state,
        toast: {
          ...state.toast,
          text: action.text,
          show: true,
          variant: action.variant
        }
      };
    case UI_CLOSE_TOAST:
      return {
        ...state,
        toast: {
          ...state.toast,
          show: false
        }
      };
    case UI_START_COMMENT_BUTTON:
      return {
        ...state,
        commentButton: true
      };
    case UI_STOP_COMMENT_BUTTON:
      return {
        ...state,
        commentButton: false
      };
    case UI_START_LOGIN_BUTTON:
      return {
        ...state,
        loginButton: true
      };
    case UI_STOP_LOGIN_BUTTON:
      return {
        ...state,
        loginButton: false
      };
    case UI_START_REGISTER_BUTTON:
      return {
        ...state,
        registerButton: true
      };
    case UI_STOP_REGISTER_BUTTON:
      return {
        ...state,
        registerButton: false
      };
    default:
      return state;
  }
};

export default reducer;
