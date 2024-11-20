import { RefObject, useEffect } from "react"
import { dispatch } from "./editor"
import { setObjectPos } from "./editorFunctions"

function useDragAndDropToMoveObjects(ref: RefObject<HTMLElement>, setPos: (pos: { x: number, y: number }) => void, dragData: { slideId: string, objId: string }) {
    if (!dragData) return
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
                    x: e.pageX - startPos.x,
                    y: e.pageY - startPos.y,
                }
                newPos = {
                    x: initialPos.x + delta.x,
                    y: initialPos.y + delta.y
                }
                setPos(newPos)
            }

            const onMouseUp = (e: MouseEvent) => {
                const endPos = { x: e.pageX, y: e.pageY}
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