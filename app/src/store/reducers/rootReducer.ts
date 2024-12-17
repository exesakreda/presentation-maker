import { combineReducers } from "redux";
import presentationReducer from "./presentationReducer";
import toolReducer from "./toolReducer";
import selectionReducer from "./selectionReducer";

const rootReducer = combineReducers({
    presentation: presentationReducer,
    tool: toolReducer,
    selection: selectionReducer
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>