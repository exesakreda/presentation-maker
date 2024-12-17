import { SelectionActionType } from "../types/selectionTypes";
import { editor } from "../../services/data";

type Selection = {
    selectedSlides: string[],
    selectedObjects: string[]
}

const initialState: Selection = {
    selectedSlides: [editor.slideList[0].id],
    selectedObjects: []
}

const selectionReducer = (state = initialState, action: any): Selection => {
    switch (action.type) {
        case SelectionActionType.SLIDES_SET_SELECTION:
            return {
                ...state,
                selectedSlides: action.payload.newSelectedSlides
            }

        case SelectionActionType.OBJECTS_SET_SELECTION:
            return {
                ...state,
                selectedObjects: action.payload.newSelectedObjects
            }

        default:
            return state
    }
}

export default selectionReducer