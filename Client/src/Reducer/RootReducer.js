import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import ProblemReducer from "./ProblemReducer";


const RootReducer=combineReducers({
    user:UserReducer,
    problem:ProblemReducer,
})

export default RootReducer;