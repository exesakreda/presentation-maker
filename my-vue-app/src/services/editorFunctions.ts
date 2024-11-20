import { Slide } from "../../../types"
import { EditorType } from "./EditorType"
import { Tool, SlideObject } from "../../../types"
import { getTextWidth, getTextHeight } from "./getTextDimensions"
import { MouseEvent } from "react"


function setTitle(editor: EditorType, newTitle: string): EditorType {
    return {
        ...editor,
        title: newTitle

    }
}

// function setSelection(editor: EditorType, newSelection: SelectionType): EditorType {
//     return {
//         ...editor,
//         selection: newSelection
//     }
// }

function addSlide(editor: EditorType): EditorType {
    const newSlide: Slide = {
        id: editor.slideList.length > 0
            ? String(Number(editor.slideList[editor.slideList.length - 1].id) + 1)
            : '1',
        background: { type: 'color', value: '#FFFFFF' },
        objects: []
    }
    return {
        ...editor,
        slideList: [
            ...editor.slideList,
            newSlide
        ]

    }
}

function removeSlide(editor: EditorType, { selectedSlides }: { selectedSlides: string[] }): EditorType {
    if (editor.slideList.length <= 1) {
        return editor
    }

    const newSlides = editor.slideList.filter(slide => !selectedSlides.includes(slide.id));
    return {
        ...editor,
        slideList: newSlides
    }

}

function selectTool(editor: EditorType) {
    return editor
}

function changeBackground(editor: EditorType, newSlideList: Slide[]) {
    return {
        ...editor,
        slideList: newSlideList
    }
}

function updateSlideList(editor: EditorType, newSlideList: Slide[]) {
    return {
        ...editor,
        slideList: newSlideList
    }
}


function createObject(editor: EditorType, { e, slideId, currentTool }: { e: MouseEvent, slideId: string, currentTool: Tool }) {
    const slideArea = document.getElementById('slideArea')

    const rect = slideArea?.getBoundingClientRect()
    const shiftX = e.clientX - (rect?.left || 0)
    const shiftY = e.clientY - (rect?.top || 0)

    const currentSlideIndex = editor.slideList.findIndex(slide => slide.id === slideId)

    const currentSlide = editor.slideList[currentSlideIndex]

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
                size: { h: 200, w: 200 },
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

    const updatedSlideList: Slide[] = [...editor.slideList]
    updatedSlideList[currentSlideIndex] = updatedSlide

    return {
        ...editor,
        slideList: updatedSlideList
    }
}


function deleteObject(editor: EditorType, { slideId, objectsToDelete }: { slideId: string, objectsToDelete: string[] }) {
    const updatedSlideList = editor.slideList.map(slide => {
        if (slide.id === slideId) {
            return {
                ...slide,
                objects: slide.objects.filter(obj => !objectsToDelete.includes(obj.id))
            }
        }
        return slide
    })
    return {
        ...editor,
        slideList: updatedSlideList
    }
}

function updateSlideObjects(editor: EditorType, slideId: string, objects: SlideObject[]) {
    return {
        editor: {
            ...editor,
            slideList: editor.slideList.map(slide => {
                if (slide.id === slideId) {
                    return {
                        ...slide,
                        objects: objects
                    }
                }
                return slide
            })
        }
    }
}

function setTextAreaValue(editor: EditorType, { newValue, objId, slideId }: { newValue: string, slideId: string, objId: string }) {
    const updateSlideList = editor.slideList.map(slide => {
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
        editor: {
            ...editor,
            slideList: updateSlideList
        }
    }
}

function setObjectSelection(editor: EditorType, slideId: string, objects: string[]) {
    const updatedSlideList = editor.slideList.map(slide => {
        if (slide.id === slideId) {
            return {
                ...slide,
                selectedObjects: objects
            }
        }
        return slide
    })
    return {
        editor: {
            ...editor,
            slideList: updatedSlideList
        }
    }
}

function setObjectPos(editor: EditorType, { slideId, objectId, newPos }: { slideId: string, objectId: string, newPos: { x: number, y: number } }) {
    const updatedSlideList = editor.slideList.map(slide => {
        if (slide.id == slideId) {
            const newSlideObjects = slide.objects.map(obj => {
                if (obj.id === objectId) {
                    return {
                        ...obj,
                        position: newPos
                    }
                }
                return obj
            })
            return {
                ...slide,
                objects: newSlideObjects
            }
        }
        return slide
    })


    return {
        ...editor,
        slideList: updatedSlideList
    }
}

export {
    setTitle,
    addSlide,
    removeSlide,
    selectTool,
    changeBackground,
    updateSlideList,
    setTextAreaValue,
    setObjectSelection,
    createObject,
    deleteObject,
    updateSlideObjects,
    setObjectPos
}