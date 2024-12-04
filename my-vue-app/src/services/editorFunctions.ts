import { Slide } from "../../../types"
import { EditorType } from "./EditorType"
import { SlideObject } from "../../../types"
import { MouseEvent } from "react"


function setTitle(editor: EditorType, newTitle: string): EditorType {
    localStorage.setItem('title', newTitle)
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
        id: String(Number(editor.slideList[editor.slideList.length - 1].id) + 1),
        background: { type: 'color', value: '#FFFFFF' },
        objects: []
    }
    localStorage.setItem('slideList', JSON.stringify([...editor.slideList, newSlide]))
    return {
        ...editor,
        slideList: [
            ...editor.slideList,
            newSlide
        ]
    }
}

function removeSlide(editor: EditorType, { selectedSlides, setSelectedSlides }: { selectedSlides: string[], setSelectedSlides: (slidesId: string[]) => void }): EditorType {
    if (editor.slideList.length > selectedSlides.length) {
        const newSlides = editor.slideList.filter(slide => !selectedSlides.includes(slide.id))
        let closestSlideId = null
        if (newSlides.length > 0) {
            const firstSelectedIndex = editor.slideList.findIndex(slide => selectedSlides.includes(slide.id))
            if (firstSelectedIndex !== -1) {
                if (firstSelectedIndex < newSlides.length) {
                    closestSlideId = newSlides[firstSelectedIndex].id
                } else {
                    closestSlideId = newSlides[newSlides.length - 1].id
                }
            } else {
                closestSlideId = newSlides[0].id
            }
            setSelectedSlides([closestSlideId])
            localStorage.setItem('selectedSlides', JSON.stringify([closestSlideId]))
        } else {
            setSelectedSlides([])
            localStorage.setItem('selectedSlides', JSON.stringify([]))
        }
        localStorage.setItem('slideList', JSON.stringify(newSlides))
        return {
            ...editor,
            slideList: newSlides
        }
    }
    return editor
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
    localStorage.setItem('slideList', JSON.stringify(newSlideList))
    return {
        ...editor,
        slideList: newSlideList
    }
}

function createTextArea(editor: EditorType, { e, slideId, scale }: { e: MouseEvent, slideId: string, scale: number }) {
    const slideArea = document.getElementById('slideArea')
    const rect = slideArea?.getBoundingClientRect()
    const shiftX = (e.clientX - (rect?.left || 0)) / scale
    const shiftY = (e.clientY - (rect?.top || 0)) / scale
    const currentSlideIndex = editor.slideList.findIndex(slide => slide.id === slideId)
    const currentSlide = editor.slideList[currentSlideIndex]


    const id = 'textarea_' + Math.random().toString(36).substring(2, 9)

    const textSize = 24
    const fontWeight = 800
    const fontFamily = 'Inter'
    const value = 'Текст'

    const newObject: SlideObject = {
        id: id,
        position: { x: shiftX, y: shiftY },
        size: { h: 35, w: 80 },
        value: value,
        fontFamily: fontFamily,
        textSize: textSize,
        fontWeight: fontWeight,
        type: 'text'
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

function createImage(editor: EditorType, { slideId, src, height, width }: { slideId: string, src: string, height: number, width: number }) {
    const slideIndex = editor.slideList.findIndex(slide => slide.id === slideId)
    if (slideIndex === -1) return editor

    const slideArea = document.getElementById('slideArea')
    const rect = slideArea?.getBoundingClientRect()
    const shiftX = (window.innerWidth / 2 - (rect?.left || 0))
    const shiftY = (window.innerHeight / 2 - (rect?.top || 0))

    const id = 'image_' + Math.random().toString(36).substring(2, 9)

    const newImage: SlideObject = {
        id: id,
        position: { x: shiftX, y: shiftY },
        size: { h: height, w: width },
        src: src,
        type: 'image'
    }
    const updatedSlideObjects = [...editor.slideList[slideIndex].objects, newImage]
    const updatedSlide = {
        ...editor.slideList[slideIndex],
        objects: updatedSlideObjects
    }
    const updatedSlideList = [...editor.slideList]
    updatedSlideList[slideIndex] = updatedSlide
    localStorage.setItem('slideList', JSON.stringify(updatedSlideList))

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
    localStorage.setItem('slideList', JSON.stringify(updatedSlideList))
    return {
        ...editor,
        slideList: updatedSlideList
    }
}

function updateSlideObjects(editor: EditorType, slideId: string, objects: SlideObject[]) {
    const updatedSlideList = editor.slideList.map(slide => {
        if (slide.id === slideId) {
            return {
                ...slide,
                objects: objects
            }
        }
        return slide
    })
    localStorage.setItem('slideList', JSON.stringify(updatedSlideList))
    return {
        editor: {
            ...editor,
            slideList: updatedSlideList
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
    localStorage.setItem('slideList', JSON.stringify(updatedSlideList))

    return {
        ...editor,
        slideList: updatedSlideList
    }
}


function setObjectSize(editor: EditorType, { slideId, objectId, newSize }: { slideId: string, objectId: string, newSize: { h: number, w: number } }) {
    const updatedSlideList = editor.slideList.map(slide => {
        if (slide.id == slideId) {
            const newSlideObjects = slide.objects.map(obj => {
                if (obj.id === objectId) {
                    return {
                        ...obj,
                        size: { h: newSize.h, w: newSize.w }
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
    localStorage.setItem('slideList', JSON.stringify(updatedSlideList))

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
    createTextArea,
    deleteObject,
    updateSlideObjects,
    setObjectPos,
    setObjectSize,
    createImage
}