import { SlideObject, Tool } from "../../../types"
import { EditorType } from "./EditorType"
import { dispatch } from "./editor"
import { MouseEvent } from "react"
import { updateSlideList } from "./editorFunctions"
import { getTextWidth, getTextHeight } from "./getTextDimensions"

function createObject(editor: EditorType, e: MouseEvent, currentTool: Tool) {
    const slideArea = document.getElementById('slideArea')

    const rect = slideArea?.getBoundingClientRect()
    const shiftX = e.clientX - (rect?.left || 0)
    const shiftY = e.clientY - (rect?.top || 0)
    
    const slideId = editor.selection?.selectedSlides[editor.selection.selectedSlides.length - 1]
    const currentSlideIndex = editor.presentation.slideList.findIndex(slide => slide.id === slideId)

    const currentSlide = editor.presentation.slideList[currentSlideIndex]

    let newObject: SlideObject | null = null
    switch (currentTool) {
        case 'text':
            newObject = {
                id: 'obj' + Math.random().toString(36).substring(2, 9),
                position: { x: shiftX, y: shiftY },
                size: { h: 0, w: 0 },
                value: 'Текст',
                fontFamily: 'Inter',
                textSize: 16,
                type: 'text'
            }
            const font = `${newObject.textSize}px ${newObject.fontFamily}`
            const textAreaWidth = getTextWidth(newObject.value, font)
            const textAreaHeight = getTextHeight(newObject.value, font)
            newObject.size.w = textAreaWidth 
            newObject.size.h = textAreaHeight 
            newObject.position.y = newObject.position.y - newObject.size.h / 2
            newObject.position.x = newObject.position.x - newObject.size.w / 2
            break

        case 'image':
            newObject = {
                id: 'obj' + Math.random().toString(36).substring(2, 9),
                position: { x: shiftX, y: shiftY },
                size: { h: 500, w: 500 },
                src: '../../images/image1.png',
                type: 'image',
            }
            break
        case 'cursor':
        default:
            return
    }

    const updatedSlideObjects: SlideObject[] = [...currentSlide.objects, newObject]
    const updatedSlide = { ...currentSlide, objects: updatedSlideObjects }

    const updatedSlideList = [...editor.presentation.slideList]
    updatedSlideList[currentSlideIndex] = updatedSlide

    dispatch(updateSlideList, updatedSlideList)

    return { shiftX, shiftY }
}

export { createObject }
