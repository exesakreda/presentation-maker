import { combineReducers } from "redux";
import presentationReducer from "./presentationReducer";
import toolReducer from "./toolReducer";
import selectionReducer from "./selectionReducer";
import notificationReducer from "./notificationReducer";
// import changesReducer from "./changesReducer";

const rootReducer = combineReducers({
    presentation: presentationReducer,
    tool: toolReducer,
    selection: selectionReducer,
    notifications: notificationReducer,
    // changes: changesReducer
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>