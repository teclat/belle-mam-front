import * as actions from "../constants/cartConstants";

export const cartAddRequest = (gift, onCart) => (dispatch) => {
  const giftsOnCart = onCart.slice();
  let isOnCart = false;
  giftsOnCart.forEach((giftOnCart) => {
    if (giftOnCart.id === gift.id) {
      isOnCart = true;
      giftOnCart.count++;
    }
  });
  if (!isOnCart) {
    giftsOnCart.push({ ...gift, count: 1 });
  }
  dispatch({
    type: actions.CART_ITEM_ADD_REQUESTED,
  });
  try {
    dispatch({
      type: actions.CART_ITEM_ADDED_SUCCESSFULLY,
      payload: giftsOnCart,
    });
  } catch (err) {
    dispatch({
      type: actions.CART_ITEM_ADD_FAILED,
      payload: err.message,
    });
  }
};

export const cartRemoveRequest = (gift, onCart) => (dispatch) => {
  const giftsOnCart = onCart
    .slice()
    .filter((giftOnCart) => giftOnCart.id !== gift.id);
  dispatch({
    type: actions.CART_ITEM_REMOVED_SUCCESSFULLY,
    payload: giftsOnCart,
  });
};

export const cartItemChangeQtd = (gift, onCart, count) => (dispatch) => {
  dispatch({
    type: actions.CART_ITEM_QUANTITY_CHANGE_REQUESTED,
  });
  const giftsOnCart = onCart
    .slice()
    .filter((giftOnCart) => giftOnCart.id === gift.id);
  if (count >= 0 && count <= parseFloat(gift.selected_quantity)) {
    giftsOnCart.forEach((giftOnCart) => {
      giftOnCart.count = count;
    });
    console.log(count);
    try {
      dispatch({
        type: actions.CART_ITEM_QUANTITY_CHANGED,
        payload: giftsOnCart,
      });
    } catch (err) {
      dispatch({
        type: actions.CART_ITEM_QUANTITY_CHANGE_FAILED,
        payload: err.message,
      });
    }
  } else {
    dispatch({
      type: actions.CART_ITEM_QUANTITY_CHANGE_FAILED,
      payload: "Quantidade Inválida.",
    });
  }
};
