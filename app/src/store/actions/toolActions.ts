import { Tool } from "../../../../types";
import { ToolActionType } from "../types/toolTypes";

export const setTool = (newTool: Tool) => ({
    type: ToolActionType.SET_TOOL,
    payload: { newTool }
})