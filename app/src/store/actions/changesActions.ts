import { ChangesActionType } from "../types/changesTypes";

export const undo = () => ({
    type: ChangesActionType.UNDO
})

export const redo = () => ({
    type: ChangesActionType.REDO
})