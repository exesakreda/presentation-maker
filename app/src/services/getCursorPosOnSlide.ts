import { MouseEvent } from "react"

function getCursorPosOnSlide(e: MouseEvent, scale: number) {
    const slideArea = document.getElementById('slideArea')
    const rect = slideArea?.getBoundingClientRect()
    const shiftX = (e.clientX - (rect?.left || 0)) / scale
    const shiftY = (e.clientY - (rect?.top || 0)) / scale

    return { x: shiftX, y: shiftY }
}

export default getCursorPosOnSlide 