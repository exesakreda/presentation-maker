import { Presentation } from "../../../types";

type SelectionType = {
    selectedSlides: string[],
}

type EditorType = {
    presentation: Presentation,
    selection: SelectionType | null,
}

export type {
    EditorType,
    SelectionType,
}