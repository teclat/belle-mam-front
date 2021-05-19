import * as actions from "./../constants/eventConstants";

const initialState = {
  isLoading: false,
  err: "",
  events: [],
  selectedEventId: null,
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.EVENT_FETCH_REQUESTED:
      return { ...state, isLoading: true };
    case actions.EVENT_FETCHED_SUCCESSFULLY:
      return { ...state, isLoading: false, events: action.payload };
    case actions.EVENT_FETCH_HAS_FAILED:
      return { ...state, isLoading: false, err: action.payload };
    case actions.EVENT_DELETE_REQUESTED:
      return { ...state, isLoading: true };
    case actions.EVENT_DELETED_SUCCESSFULLY:
      return { ...state, isLoading: false, events: action.payload };
    case actions.EVENT_DELETE_HAS_FAILED:
      return { ...state, isLoading: false, err: action.payload };
    case actions.SUBSCRIBED_EVENTS_FETCH_REQUESTED:
      return { ...state, isLoading: true };
    case actions.SUBSCRIBED_EVENTS_FETCHED_SUCCESSFULLY:
      return { ...state, isLoading: false, events: action.payload };
    case actions.SUBSCRIBED_EVENTS_FETCH_HAS_FAILED:
      return { ...state, isLoading: false, err: action.payload };
    case actions.EVENT_SELECT_REQUESTED:
      return { ...state, isLoading: true };
    case actions.EVENT_SELECTED_SUCCESSFULLY:
      return { ...state, isLoading: false, selectedEventId: action.payload };
    case actions.EVENT_SELECT_FAILED:
      return { ...state, isLoading: false, err: action.payload };
    default:
      return state;
  }
};

export default eventsReducer;
