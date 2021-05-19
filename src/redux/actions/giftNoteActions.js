import api from "../../services/api";
import * as actions from "../constants/giftNoteConstants";

export const saveNoteAction = (user, eventId, text) => async (dispatch) => {
  try {
    dispatch({
      type: actions.CREATE_NOTE_REQUESTED,
    });

    const note = { user_id: user.id, event_id: eventId, text: text };

    dispatch({
      type: actions.NOTE_CREATED_SUCCESSFULLY,
      payload: note,
    });
  } catch (err) {
    dispatch({
      type: actions.NOTE_CREATION_FAILED,
      payload: err.message,
    });
  }
};

export const postNoteAction = (user, eventId, text) => async (dispatch) => {
  try {
    dispatch({
      type: actions.POST_NOTE_REQUESTED,
    });
    const body = { user_id: user.id, event_id: eventId, text: text };
    const response = await api.post("notes/create", body);
    const note = response.data;
    console.log("Note Posted! Text: ", note.text);
    dispatch({
      type: actions.NOTE_POSTED_SUCCESSFULLY,
      payload: note,
    });
    dispatch({
      type: actions.DELETED_NOTE_SUCCESFULLY,
    });
  } catch (err) {
    dispatch({
      type: actions.NOTE_POST_FAILED,
      payload: err.message,
    });
  }
};

// export const deleteNoteAction = () => async (dispatch) => {
//   dispatch({
//     type: actions.DELETED_NOTE_SUCCESFULLY,
//   });
// };
