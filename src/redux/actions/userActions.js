import * as actions from "../constants/userConstants";

import api from "../../services/api";

export const loginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: actions.USER_LOGIN_REQUESTED,
    });
    const body = { email: email, password: password };
    const response = await api.post("users/login", body);

    const user = response.data;
    await localStorage.setItem("user", JSON.stringify(user));
    console.log(user);
    dispatch({
      type: actions.USER_LOGGED_IN_SUCCESSFULLY,
      payload: user,
    });
  } catch (err) {
    dispatch({
      type: actions.USER_LOGIN_FAILED,
      payload: err.message,
    });
  }
};

export const logoutAction = () => async (dispatch) => {
  dispatch({
    type: actions.USER_LOGGED_OUT,
  });
};
