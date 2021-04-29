import * as actions from "../constants/checkoutConstants";

export const nextStepAction = (index) => (dispatch) => {
  dispatch({
    type: actions.CHECKOUT_NEXT_STEP_REQUESTED,
  });
  if (index < 4 && index >= 0) {
    let next = index + 1;
    dispatch({
      type: actions.CHECKOUT_NEXT_STEP_REACHED,
      payload: next,
    });
  } else {
    dispatch({
      type: actions.CHECKOUT_NEXT_STEP_FAILED,
      payload: "Índice de passo inválido.",
    });
  }
};

export const previousStepAction = (index) => (dispatch) => {
  dispatch({
    type: actions.CHECKOUT_PREVIOUS_STEP_REQUESTED,
  });
  if (index < 4 && index >= 0) {
    let previous = index - 1;
    dispatch({
      type: actions.CHECKOUT_PREVIOUS_STEP_REACHED,
      payload: previous,
    });
  } else {
    dispatch({
      type: actions.CHECKOUT_PREVIOUS_STEP_FAILED,
      payload: "Índice de passo inválido.",
    });
  }
};

export const jumpToStepAction = (index) => (dispatch) => {
  dispatch({
    type: actions.CHECKOUT_STEP_JUMP_REQUESTED,
  });
  if (index < 4 && index >= 0) {
    dispatch({
      type: actions.CHECKOUT_STEP_JUMP_COMPLETED,
      payload: index,
    });
  } else {
    dispatch({
      type: actions.CHECKOUT_STEP_JUMP_FAILED,
      payload: "Índice de passo inválido.",
    });
  }
};
