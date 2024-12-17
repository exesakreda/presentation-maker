import { SelectionActionType } from "../types/selectionTypes";

export const setSelectedSlides = (newSelectedSlides: string[]) => ({
    type: SelectionActionType.SLIDES_SET_SELECTION,
    payload: { newSelectedSlides }
})

export const setSelectedObjects = (newSelectedObjects: string[]) => ({
    type: SelectionActionType.OBJECTS_SET_SELECTION,
    payload: { newSelectedObjects }
})