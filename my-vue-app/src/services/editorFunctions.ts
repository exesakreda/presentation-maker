import { Slide } from "../../../types"
import { EditorType, SelectionType } from "./EditorType"
import { Tool, SlideObject } from "../../../types"
import { getTextWidth, getTextHeight } from "./getTextDimensions"
import { MouseEvent } from "react"

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

function createObject(editor: EditorType, e: MouseEvent, currentTool: Tool) {
    const slideArea = document.getElementById('slideArea')

    const rect = slideArea?.getBoundingClientRect()
    const shiftX = e.clientX - (rect?.left || 0)
    const shiftY = e.clientY - (rect?.top || 0)

    const slideId = editor.selection?.selectedSlides[editor.selection.selectedSlides.length - 1]
    const currentSlideIndex = editor.presentation.slideList.findIndex(slide => slide.id === slideId)

    const currentSlide = editor.presentation.slideList[currentSlideIndex]

    let newObject: SlideObject | null = null
    const id = 'obj' + Math.random().toString(36).substring(2, 9)

    switch (currentTool) {
        case 'text':
            const textSize = 16
            const fontFamily = 'Inter'
            const font = `${textSize}px ${fontFamily}`
            const value = 'Текст'
            const textWidth = getTextWidth(value, font)
            const textHeight = getTextHeight(value, font)
            newObject = {
                id: id,
                position: { x: shiftX, y: shiftY },
                size: { h: textHeight, w: textWidth },
                value: value,
                fontFamily: fontFamily,
                textSize: textSize,
                type: 'text'
            }
            break

        case 'image':
            const src = "defaultimage.png"
            newObject = {
                id: id,
                position: { x: shiftX, y: shiftY },
                size: { h: 0, w: 0 },
                src: src,
                type: 'image',
            }
            break

        case 'cursor':

        default:
            return
    }

    const updatedSlideObjects: SlideObject[] = [...currentSlide.objects, newObject]
    const updatedSlide = { ...currentSlide, objects: updatedSlideObjects }

    const updatedSlideList: Slide[] = [...editor.presentation.slideList]
    updatedSlideList[currentSlideIndex] = updatedSlide

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slideList: updatedSlideList
        }
    }
}

function deleteObject(editor: EditorType, slideId: string, objectsToDelete: string[]) {
    const updatedSlideList = editor.presentation.slideList.map(slide => {
        if (slide.id === slideId) {
            return {
                ...slide,
                objects: slide.objects.filter(obj => !objectsToDelete.includes(obj.id)),
                selectedObjects: []
            }
        }
        return slide
    })
    console.log('deleted obj')
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slideList: updatedSlideList
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

function setObjectSelection(editor: EditorType, slideId: string, objects: string[]) {
    const updatedSlideList = editor.presentation.slideList.map(slide => {
        if (slide.id === slideId) {
            return {
                ...slide,
                selectedObjects: objects
            }
        }
        return slide
    })
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slideList: updatedSlideList
        }
    }
}

export {
    setTitle,
    setPosition,
    addSlide,
    setSelection,
    removeSlide,
    selectTool,
    changeBackground,
    updateSlideList,
    setTextAreaValue,
    setObjectSelection,
    createObject,
    deleteObject
}