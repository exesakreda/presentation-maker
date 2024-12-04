import { RefObject, useEffect, useRef } from "react"
import { dispatch } from "./editor"
import { setObjectSize } from "./editorFunctions"

type DragAndDropProps = {
    ref: RefObject<HTMLElement>,
    size: { h: number, w: number },
    setSize: (size: { h: number, w: number }) => void,
    slideId: string,
    objId: string,
    scale: number,
    setSelectedObjects: (newSelectedObjects: string[]) => void,
    isResizing: boolean,
    setIsResizing: (isResizing: boolean) => void
}

function useDragAndDropToResizeObjectsBot({ ref, size, setSize, slideId, objId, scale, setSelectedObjects, isResizing, setIsResizing }: DragAndDropProps) {
    const isResizingRef = useRef(isResizing)

    useEffect(() => {
        isResizingRef.current = isResizing
    }, [isResizing])

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const slide = document.getElementById('slide')
        if (!slide) return

        const onMouseDown = (e: MouseEvent) => {
            e.preventDefault()
            setIsResizing(true)
            isResizingRef.current = true
            const startPos = { x: e.pageX, y: e.pageY }
            const initialSize = size

            let newSize = initialSize
            const onMouseMove = (e: MouseEvent) => {
                const delta = {
                    x: 0,
                    y: (e.pageY - startPos.y) / scale
                }
                newSize = {
                    w: initialSize.w,
                    h: Math.max(initialSize.h + delta.y, 0)
                }
                setSize(newSize)
            }

            const onMouseUp = () => {
                setIsResizing(false)
                isResizingRef.current = false
                if (newSize.h !== initialSize.h || newSize.w !== initialSize.w) {
                    dispatch(setObjectSize, {
                        slideId: slideId,
                        objectId: objId,
                        newSize: newSize
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

    }, [ref, size, setSize, slideId, objId, scale, setSelectedObjects, setIsResizing])
}

export { useDragAndDropToResizeObjectsBot }