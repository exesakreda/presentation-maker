import { combineReducers } from "redux";
import presentationReducer from "./presentationReducer";
import toolReducer from "./toolReducer";
import selectionReducer from "./selectionReducer";
import notificationReducer from "./notificationReducer";

const rootReducer = combineReducers({
    presentation: presentationReducer,
    tool: toolReducer,
    selection: selectionReducer,
    notifications: notificationReducer
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>