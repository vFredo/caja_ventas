import { combineReducers } from "redux";
import userReducer from "./users";

const allReducers = combineReducers({
    users: userReducer
})

export default allReducers