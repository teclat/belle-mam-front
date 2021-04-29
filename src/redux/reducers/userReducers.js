import * as actions from "./../constants/userConstants";

const initialState = {
  loading: false,
  err: "",
  user: {},
};

const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.USER_LOGIN_REQUESTED:
      return { loading: true };
    case actions.USER_LOGGED_IN_SUCCESSFULLY:
      return {
        loading: false,
        user: action.payload,
      };
    case actions.USER_LOGIN_FAILED:
      return { loading: false, err: action.payload };
    case actions.USER_LOGGED_OUT:
      return initialState;
    default:
      return state;
  }
};

export default userLoginReducer;
