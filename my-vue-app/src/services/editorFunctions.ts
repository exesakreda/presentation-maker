import { Slide } from "../../../types"
import { SlideList } from "../views/SlideList"
import { EditorType, SelectionType } from "./EditorType"

function setTitle(editor: EditorType, newTitle: string): EditorType {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            title: newTitle
        }
    }
}

function setSelection(editor: EditorType, newSelection: SelectionType): EditorType {
    return {
        ...editor,
        selection: newSelection
    }
}

function addSlide(editor: EditorType): EditorType {
    const newSlide: Slide = {
        id: editor.presentation.slideList.length > 0
            ? String(Number(editor.presentation.slideList[editor.presentation.slideList.length - 1].id) + 1)
            : '1', 
        background: { type: 'color', value: '#FFFFFF'},
        objects: [],
        selectedObjects: []
    }
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slideList: [
                ...editor.presentation.slideList,
                newSlide
            ]
        }
    }
}

function removeSlide(editor: EditorType): EditorType {
    if (!editor.selection) {
        return editor
    }

    const removeSlideId = editor.selection.selectedSlideId
    const removeSlideIndex = editor.presentation.slideList.findIndex(slide => slide.id == removeSlideId)

    const newSlides = editor.presentation.slideList.filter(slide => slide.id != removeSlideId)

    let newSelectedSlideId = null 
    if (newSlides.length > 0) {
        const index = Math.min(removeSlideIndex, newSlides.length - 1)
        newSelectedSlideId = newSlides[index].id
    }

    return {
        presentation: {
            ...editor.presentation,
            slideList: newSlides
        },
        selection: {
            selectedSlideId: newSelectedSlideId
        }
    }
}

/**
 * @param {Editor} editor
 * @param {{
 *   x: number,
 *   y: number,
 * }} payload
 * @return {Editor}
 */
function setPosition(editor, { x, y }) {
    return {
        ...editor,
        position: { x, y }
    }
}

export { setTitle, setPosition, addSlide, setSelection, removeSlide }