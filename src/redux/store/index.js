import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "remote-redux-devtools";
import eventsReducer from "../reducers/eventReducers";
import userLoginReducer from "../reducers/userReducers";
import cartReducer from "../reducers/cartReducers";
import checkoutReducer from "../reducers/checkoutReducers";
import giftNoteReducer from "../reducers/giftNoteReducers";
import orderReducers from "../reducers/orderReducers";

const reducer = combineReducers({
  event: eventsReducer,
  user: userLoginReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  giftNote: giftNoteReducer,
  order: orderReducers,
});

const composeEnhancers = composeWithDevTools({
  realtime: true,
  name: "Your Instance Name",
  hostname: "localhost",
  port: 8000, // the port your remotedev server is running at
});

const initialState = {};

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
