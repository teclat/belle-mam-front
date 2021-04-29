import axios from "axios";
import { Constants } from "../../constants";
import * as actions from "../constants/eventConstants";

export const getEventsRequest = (user) => async (dispatch) => {
  if (user) {
    dispatch({
      type: actions.EVENTS_FETCH_REQUESTED,
    });

    axios
      .post(
        Constants.ApiUrl + "users/subscribed-events",
        {
          user_id: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: actions.EVENTS_FETCHED_SUCCESSFULLY,
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actions.EVENTS_FETCH_HAS_FAILED,
          payload: err.message,
        });
      });
  } else {
    dispatch({
      type: actions.EVENTS_FETCH_HAS_FAILED,
      payload: "User not logged in.",
    });
  }
};

export const selectEventAction = (eventId) => (dispatch) => {
  dispatch({
    type: actions.EVENT_SELECT_REQUESTED,
  });
  try {
    dispatch({
      type: actions.EVENT_SELECTED_SUCCESSFULLY,
      payload: eventId,
    });
  } catch (err) {
    dispatch({
      type: actions.EVENT_SELECT_FAILED,
      payload: err.message,
    });
  }
};
