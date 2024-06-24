import { applyMiddleware } from "redux";
import { combineReducers } from "redux";
import { legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import {reducer as adminDetails} from "./addAdminReducer/Reducer";
import {reducer as memberDetails} from "./memberReducer/Reducer";
import {reducer as blockMembersDetails} from "./blockedMember/Reducer";

const rootReducer = combineReducers({
    adminDetails,
    memberDetails,
    blockMembersDetails
});
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));