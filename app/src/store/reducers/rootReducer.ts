import { combineReducers } from "redux";
import presentationReducer from "./presentationReducer";
import toolReducer from "./toolReducer";
import notificationReducer from "./notificationReducer";

const rootReducer = combineReducers({
    presentation: presentationReducer,
    notifications: notificationReducer,
    tool: toolReducer,
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>