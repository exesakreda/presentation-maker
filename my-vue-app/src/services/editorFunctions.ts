import { Slide, SlideObject } from "../../../types"
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

    if (editor.presentation.slideList.length <= 1) {
        return editor
    }

    if (editor.presentation.slideList.length > 0) {
        const removeSlidesId = editor.selection.selectedSlides
        const removeSlidesIndex = removeSlidesId.map(id => {
            return editor.presentation.slideList.findIndex(slide => slide.id == id)
        }).filter(index => index !== -1)

        const newSlides = editor.presentation.slideList.filter(slide => !removeSlidesId.includes(slide.id));

        let newSelectedSlideId = ''
        if (newSlides.length > 0) {
            const minIndex = Math.min(...removeSlidesIndex);
            newSelectedSlideId = newSlides[minIndex < newSlides.length ? minIndex : 0].id;
        }

        return {
            presentation: {
                ...editor.presentation,
                slideList: newSlides
            },
            selection: {
                selectedSlides: newSelectedSlideId ? [newSelectedSlideId] : []
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

function updateSlideList(editor: EditorType, newSlideList: Slide[]) {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slideList: newSlideList
        }
    }
}

function setTextAreaValue(editor: EditorType, newValue: string, objId: string, slideId: string) {
    const updateSlideList = editor.presentation.slideList.map(slide => {
        if (slide.id === slideId) {
            const updateSlideObjects = slide.objects.map(object => {
                if (object.id === objId) {
                    return {
                        ...object,
                        value: newValue
                    }
                }
                return object
            })
            return {
                ...slide,
                objects: updateSlideObjects
            }
        }
        return slide
    })

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slideList: updateSlideList
        }
    }
}

export { setTitle, setPosition, addSlide, setSelection, removeSlide, selectTool, changeBackground, updateSlideList, setTextAreaValue }