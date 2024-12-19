import { Tool } from "../../../../types";
import { ToolActionType } from "../types/toolType";

export const setTool = (newTool: Tool) => ({
    type: ToolActionType.SET_TOOL,
    payload: { newTool }
})