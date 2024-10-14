import { Presentation } from "../../../types";

type SelectionType = {
    selectedSlideId: string,
}

type EditorType = {
    presentation: Presentation,
    selection: SelectionType | null,
}

export {
    EditorType,
    SelectionType,
}