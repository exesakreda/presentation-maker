import { RefObject, useEffect } from "react"
import { dispatch } from "./editor"
import { setObjectPos } from "./editorFunctions"

type DragAndDropProps = {
    ref: RefObject<HTMLElement>,
    setPos: (pos: { x: number, y: number }) => void,
    slideId: string,
    objId: string,
    scale: number
    setSelectedObjects: (newSelectedObjects: string[]) => void,

}

function useDragAndDropToMoveObjects({ ref, setPos, slideId, objId, scale, setSelectedObjects }: DragAndDropProps) {

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const slide = document.getElementById('slide')
        if (!slide) return
        const slideTopBorder = slide.offsetTop
        const slideLeftBorder = slide.offsetLeft
        const slideRightBorder = slide.offsetLeft + slide?.offsetWidth
        const slideBottomBorder = slide.offsetTop + slide?.offsetHeight

        const onMouseDown = (e: MouseEvent) => {
            e.preventDefault()
            const startPos = { x: e.pageX, y: e.pageY }
            const initialPos = { x: element.offsetLeft, y: element.offsetTop }

            let newPos = { x: initialPos.x, y: initialPos.y }
            const onMouseMove = (e: MouseEvent) => {
                const delta = {
                    x: (e.pageX - startPos.x) / scale,
                    y: (e.pageY - startPos.y) / scale,
                }
                newPos = {
                    x: Math.max(slideLeftBorder, Math.min(slideRightBorder, initialPos.x + delta.x)),
                    y: Math.max(slideTopBorder, Math.min(slideBottomBorder, initialPos.y + delta.y))
                }
                setPos(newPos)
            }

            const onMouseUp = () => {
                if (newPos !== initialPos) {
                    dispatch(setObjectPos, {
                        slideId: slideId,
                        objectId: objId,
                        newPos: newPos
                    })
                }
                setSelectedObjects([objId])
                document.removeEventListener('mousemove', onMouseMove)
                document.removeEventListener('mouseup', onMouseUp)
            }

            document.addEventListener('mousemove', onMouseMove)
            document.addEventListener('mouseup', onMouseUp)
        }

        element.addEventListener('mousedown', onMouseDown)

        return () => {
            element.removeEventListener('mousedown', onMouseDown)
        }

    }, [ref, setPos])
}

export { useDragAndDropToMoveObjects }