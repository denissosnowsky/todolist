import { createStore, combineReducers, applyMiddleware } from "redux";
import reducer from "./reducer";
import thunkMiddleware from "redux-thunk";

let rootReducer = combineReducers({
  reducer: reducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

type RootReducerType = typeof rootReducer;
export type StateType = ReturnType<RootReducerType>;

//@ts-ignore
window.store = store;

export default store;
