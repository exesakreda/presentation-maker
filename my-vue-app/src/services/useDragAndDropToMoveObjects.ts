import { RefObject, useEffect } from "react"
import { dispatch } from "./editor"
import { setObjectPos } from "./editorFunctions"

type DragAndDropProps = {
    ref: RefObject<HTMLElement>,
    setPos: (pos: { x: number, y: number }) => void,
    dragData: {
        slideId: string,
        objId: string,
        scale: number
    }
}

function useDragAndDropToMoveObjects({ ref, setPos, dragData }: DragAndDropProps) {
    if (!dragData) return
    const slide = document.getElementById('slide')
    if (!slide) return
    const slideTopBorder = slide?.offsetTop 
    const slideLeftBorder = slide?.offsetLeft
    const slideRightBorder = slide?.offsetLeft + slide?.offsetWidth
    const slideBottomBorder = slide?.offsetTop + slide?.offsetHeight

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const onMouseDown = (e: MouseEvent) => {
            e.preventDefault()
            const startPos = { x: e.pageX, y: e.pageY }
            const initialPos = { x: element.offsetLeft, y: element.offsetTop }

            let newPos = { x: initialPos.x, y: initialPos.y }
            const onMouseMove = (e: MouseEvent) => {
                const delta = {
                    x: (e.pageX - startPos.x) / dragData.scale,
                    y: (e.pageY - startPos.y) / dragData.scale,
                }
                newPos = {
                    x: (initialPos.x + delta.x),
                    y: (initialPos.y + delta.y)
                }
                if (newPos.x < slideLeftBorder) {
                    newPos.x = slideLeftBorder
                }
                if (newPos.x > slideRightBorder) {
                    newPos.x = slideRightBorder
                }
                if (newPos.y < slideTopBorder) {
                    newPos.y = slideTopBorder
                }
                if (newPos.y > slideBottomBorder) {
                    newPos.y = slideBottomBorder
                }

                setPos(newPos)
            }

            const onMouseUp = (e: MouseEvent) => {
                const endPos = { x: e.pageX, y: e.pageY }
                if (startPos.x !== endPos.x && startPos.y !== endPos.y) {
                    dispatch(setObjectPos, {
                        slideId: dragData.slideId,
                        objectId: dragData.objId,
                        newPos: newPos
                    })
                }

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