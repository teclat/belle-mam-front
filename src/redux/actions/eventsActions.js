import { Modal } from "antd";
import axios from "axios";
import { Constants } from "../../constants";
import * as actions from "../constants/eventConstants";

export const getEventRequest = (user) => async (dispatch) => {
  if (user) {
    dispatch({
      type: actions.EVENT_FETCH_REQUESTED,
    });

    axios
      .get(Constants.ApiUrl + "events/" + user.id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: actions.EVENT_FETCHED_SUCCESSFULLY,
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actions.EVENT_FETCH_HAS_FAILED,
          payload: err.message,
        });
      });
  } else {
    dispatch({
      type: actions.EVENT_FETCH_HAS_FAILED,
      payload: "User not logged in.",
    });
  }
};

export const deleteEventRequest = (user, event) => async (dispatch) => {
  dispatch({
    type: actions.EVENT_DELETE_REQUESTED,
  });

  axios
    .delete(Constants.ApiUrl + "events/" + event.id, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: actions.EVENT_DELETED_SUCCESSFULLY,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actions.EVENT_DELETE_HAS_FAILED,
        payload: err.message,
      });
    });
};

export const getSubscribedEventsRequest = (user) => async (dispatch) => {
  if (user) {
    dispatch({
      type: actions.SUBSCRIBED_EVENTS_FETCH_REQUESTED,
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
          type: actions.SUBSCRIBED_EVENTS_FETCHED_SUCCESSFULLY,
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actions.SUBSCRIBED_EVENTS_FETCH_HAS_FAILED,
          payload: err.message,
        });
      });
  } else {
    dispatch({
      type: actions.SUBSCRIBED_EVENTS_FETCH_HAS_FAILED,
      payload: "User not logged in.",
    });
  }
};

export const selectSubscribedEventAction = (eventId) => (dispatch) => {
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
