import * as actions from "./../constants/orderConstants";

const initialState = {
  loading: false,
  err: "",
  data: {},
};

const orderLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_ORDER_REQUESTED:
      return { ...state, loading: true };
    case actions.ORDER_CREATED_SUCCESSFULLY:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case actions.ORDER_CREATE_FAILED:
      return { ...state, loading: false, err: action.payload };
    case actions.DELETED_ORDER_SUCCESFULLY:
      return { ...initialState };
    case actions.POST_ORDER_REQUESTED:
      return { ...state, loading: true };
    case actions.ORDER_POSTED_SUCCESFULLY:
      return { ...state, loading: false, data: action.payload };
    case actions.ORDER_POST_FAILED:
      return { ...state, loading: false, err: action.payload };
    default:
      return state;
  }
};

export default orderLoginReducer;
