import { SelectionActionType } from "../types/selectionTypes";

type Selection = {
    slides: string[],
    objects: string[]
}

const initialState: Selection = {
    slides: [],
    objects: []
}

const selectionReducer = (state = initialState, action: any): Selection => {
    switch (action.type) {
        case SelectionActionType.SLIDES_SET_SELECTION:
            return {
                ...state,
                slides: action.payload.newSelectedSlides
            }

        case SelectionActionType.OBJECTS_SET_SELECTION:
            return {
                ...state,
                objects: action.payload.newSelectedObjects
            }

        default:
            return state
    }
}

export default selectionReducer