import api from "../../services/api";
import * as actions from "../constants/orderConstants";

export const saveOrderAction = (order, isSandbox) => async (dispatch) => {
  try {
    dispatch({
      type: actions.CREATE_ORDER_REQUESTED,
    });

    if (isSandbox) {
      order = { ...order, isSandbox };
    }
    dispatch({
      type: actions.ORDER_CREATED_SUCCESSFULLY,
      payload: order,
    });
  } catch (err) {
    dispatch({
      type: actions.ORDER_CREATE_FAILED,
      payload: err.message,
    });
  }
};

export const postOrderAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actions.POST_ORDER_REQUESTED,
    });
    const response = await api.post("payment/credit", order);
    const res = response.data;
    console.log("Order Posted Succesfully! Res: ", res);
    dispatch({
      type: actions.ORDER_POSTED_SUCCESFULLY,
      payload: res,
    });
    dispatch({
      type: actions.DELETED_ORDER_SUCCESFULLY,
    });
  } catch (err) {
    dispatch({
      type: actions.ORDER_POST_FAILED,
      payload: err.message,
    });
  }
};

// export const deleteOrderAction = () => async (dispatch) => {
//   dispatch({
//     type: actions.DELETED_ORDER_SUCCESFULLY,
//   });
// };
