
import { RefObject, useEffect, useRef } from "react"
import { setObjectPosition } from "../../store/actions/presentationActions"
import createDispatch from "../../store/utils/createDispatch"
import store from "../../store"

type useMoveObjectsProps = {
    ref: RefObject<HTMLElement>,
    setPos: (pos: { x: number, y: number }) => void,
    slideId: string,
    objId: string,
    objType: 'image' | 'text' | 'shape',
    scale: number
    isResizing: boolean,
    isDragging: boolean,
    setIsDragging: (isDragging: boolean) => void,
    isEditing: boolean
}

function useMoveObjects({ ref, setPos, slideId, objId, objType, scale, isResizing, isDragging, setIsDragging, isEditing }: useMoveObjectsProps) {
    const dispatch = createDispatch(store)

    const isDraggingRef = useRef(isDragging)
    const isResizingRef = useRef(isResizing)
    const isEditingRef = useRef(isEditing)
    
    useEffect(() => {
        isDraggingRef.current = isDragging
    }, [isDragging])

    useEffect(() => {
        isResizingRef.current = isResizing
    }, [isResizing])

    useEffect(() => {
        isEditingRef.current = isEditing
    }, [isEditing])

    useEffect(() => {
        if (isResizingRef.current || isEditingRef.current) return

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
            const initialPos = objType == 'text' 
                ? {
                    x: (element.offsetParent as HTMLElement).offsetLeft,
                    y: (element.offsetParent as HTMLElement).offsetTop
                }
                : {
                    x: element.offsetLeft,
                    y: element.offsetTop
                }

            let newPos = { x: initialPos.x, y: initialPos.y }
            const onMouseMove = (e: MouseEvent) => {
                const delta = {
                    x: (e.pageX - startPos.x) / scale,
                    y: (e.pageY - startPos.y) / scale,
                }
                if (!isDraggingRef.current && (delta.x > 3 || delta.y > 3)) {
                    setIsDragging(true)
                    isDraggingRef.current = true
                }
                newPos = {
                    x: Math.max(slideLeftBorder, Math.min(slideRightBorder, initialPos.x + delta.x)),
                    y: Math.max(slideTopBorder, Math.min(slideBottomBorder, initialPos.y + delta.y))
                }
                setPos(newPos)
            }

            const onMouseUp = () => {
                if (newPos.x !== initialPos.x || newPos.y !== initialPos.y) {
                    dispatch(setObjectPosition(slideId, objId, newPos))
                }
                setIsDragging(false)
                isDraggingRef.current = false

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

    }, [ref, setPos, slideId, objId, scale, isResizing, setIsDragging, objType, isEditing, dispatch])
}

export { useMoveObjects }
