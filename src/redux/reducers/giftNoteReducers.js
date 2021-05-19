import * as actions from "./../constants/giftNoteConstants";

const initialState = {
  isLoading: false,
  err: "",
  note: {},
};

const giftNoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_NOTE_REQUESTED:
      return { ...state, isLoading: true };
    case actions.NOTE_CREATED_SUCCESSFULLY:
      return { ...state, isLoading: false, note: action.payload };
    case actions.NOTE_CREATION_FAILED:
      return { ...state, isLoading: false, err: action.payload };
    case actions.DELETED_NOTE_SUCCESFULLY:
      return { ...initialState };
    default:
      return state;
  }
};

export default giftNoteReducer;
