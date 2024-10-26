import { Background, Slide } from "../../../types"
import { EditorType, SelectionType } from "./EditorType"

function setTitle(editor: EditorType, newTitle: string): EditorType {
    console.log(newTitle)
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
        background: { type: 'color', value: '#FFFFFF' },
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

    if (editor.presentation.slideList.length > 1) {
        const removeSlidesId = editor.selection.selectedSlides
        // const removeSlideIndex = editor.presentation.slideList.findIndex(slide => slide.id == removeSlideId)

        const newSlides = editor.presentation.slideList.filter(slide => removeSlidesId.indexOf(slide.id) == -1)

        let newSelectedSlideId = ''
        if (newSlides.length > 0) {
            const index = Math.min(Number(removeSlidesId[0]), newSlides.length - 1)
            newSelectedSlideId = newSlides[index].id
        }

        return {
            presentation: {
                ...editor.presentation,
                slideList: newSlides
            },
            selection: {
                selectedSlides: [newSelectedSlideId]
            }
        }
    }

    return editor
}

function setPosition(editor: EditorType, { x, y }: { x: number, y: number }) {
    return {
        ...editor,
        position: { x, y }
    }
}

function selectTool(editor: EditorType) {
    return editor
}

function changeBackground(editor: EditorType, newSlideList: Slide[]) {
    
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slideList: newSlideList
        }
    }
}

export { setTitle, setPosition, addSlide, setSelection, removeSlide, selectTool, changeBackground }