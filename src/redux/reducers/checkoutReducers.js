import * as actions from "./../constants/checkoutConstants";

const initialState = {
  isLoading: false,
  err: "",
  step: 0,
};

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CHECKOUT_NEXT_STEP_REQUESTED:
      return { ...state, isLoading: true };
    case actions.CHECKOUT_NEXT_STEP_REACHED:
      return { ...state, isLoading: false, step: action.payload };
    case actions.CHECKOUT_NEXT_STEP_FAILED:
      return { ...state, isLoading: false, err: action.payload };
    case actions.CHECKOUT_PREVIOUS_STEP_REQUESTED:
      return { ...state, isLoading: true };
    case actions.CHECKOUT_PREVIOUS_STEP_REACHED:
      return { ...state, isLoading: false, step: action.payload };
    case actions.CHECKOUT_PREVIOUS_STEP_FAILED:
      return { ...state, isLoading: false, err: action.payload };
    case actions.CHECKOUT_STEP_JUMP_REQUESTED:
      return { ...state, isLoading: true };
    case actions.CHECKOUT_STEP_JUMP_COMPLETED:
      return { ...state, isLoading: false, step: action.payload };
    case actions.CHECKOUT_STEP_JUMP_FAILED:
      return { ...state, isLoading: false, err: action.payload };
    default:
      return state;
  }
};

export default checkoutReducer;
