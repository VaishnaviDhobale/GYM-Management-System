import { applyMiddleware } from "redux";
import { combineReducers } from "redux";
import { legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import {reducer as adminDetails} from "./addAdminReducer/Reducer";
import {reducer as memberDetails} from "./memberReducer/Reducer";
import {reducer as blockMembersDetails} from "./blockedMember/Reducer";
import {reducer as messageDetails} from "./messageReducer/Reducer";
import {reducer as blockUsersDetails} from "./blockUsersReducer/Reducer"
import {reducer as usersDetails} from "./userReducer/Reducer";
import {reducer as packagesDetails} from "./packageReducer/Reducer";
import { reducer as supplementStoreDetails } from "./supplementStoreReducer/Reducer";
import { reducer as privateMsgDetails } from "./privateMsgsReducer/Reducer";
import { reducer as trainersDetails } from "./TrainersReducer/Reducer";

const rootReducer = combineReducers({
    adminDetails,
    memberDetails,
    blockMembersDetails,
    messageDetails,
    blockUsersDetails,
    usersDetails,
    packagesDetails,
    supplementStoreDetails,
    privateMsgDetails,
    trainersDetails
});
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));