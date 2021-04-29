import * as actions from "./../constants/cartConstants";

const initialState = {
  isLoading: false,
  err: "",
  giftsOnCart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CART_ITEM_ADD_REQUESTED:
      return { ...state, isLoading: true, err: "" };
    case actions.CART_ITEM_ADDED_SUCCESSFULLY:
      return { ...state, isLoading: false, giftsOnCart: action.payload };
    case actions.CART_ITEM_ADD_FAILED:
      return { ...state, isLoading: false, err: action.payload };
    case actions.CART_ITEM_REMOVED_SUCCESSFULLY:
      return { ...state, isLoading: false, giftsOnCart: action.payload };
    case actions.CART_ITEM_QUANTITY_CHANGE_REQUESTED:
      return { ...state, isLoading: true, err: "" };
    case actions.CART_ITEM_QUANTITY_CHANGED:
      return { ...state, isLoading: false, giftsOnCart: action.payload };
    case actions.CART_ITEM_QUANTITY_CHANGE_FAILED:
      return { ...state, isLoading: false, err: action.payload };
    default:
      return state;
  }
};

export default cartReducer;
