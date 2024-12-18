import { Tool } from "../../../../types";
import { ToolActionType } from "../types/toolTypes";

const initialState: Tool = 'cursor'

const toolReducer = (state = initialState, action: any): Tool => {
    switch (action.type) {
        case ToolActionType.SET_TOOL:
            return action.payload.newTool
        
        default: 
            return state
    }
}

export default toolReducer