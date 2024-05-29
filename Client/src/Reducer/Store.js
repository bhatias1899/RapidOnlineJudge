import { applyMiddleware, createStore } from "redux";
import {thunk} from "redux-thunk";
import RootReducer from "./RootReducer";

const Store=createStore(RootReducer,applyMiddleware(thunk));
export default Store;