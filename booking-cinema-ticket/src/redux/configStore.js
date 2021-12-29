import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from "redux-thunk";

const rootReducer = combineReducers({
  // Reducers
});
export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
