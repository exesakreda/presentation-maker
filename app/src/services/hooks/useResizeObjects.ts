import { RefObject, useCallback, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { setObjectSize, setObjectPosition } from "../../store/actions/presentationActions"
import { setSelectedObjects } from "../../store/actions/selectionActions"

type useResizeObjectsProps = {
    anchorPoint: 'topleft' | 'topright' | 'botleft' | 'botright' | 'top' | 'bot' | 'left' | 'right',
    ref: RefObject<HTMLElement>,
    size: { h: number, w: number },
    setSize: (size: { h: number, w: number }) => void,
    slideId: string,
    objId: string,
    scale: number,
    isResizing: boolean,
    setIsResizing: (isResizing: boolean) => void,
    pos: { x: number, y: number },
    setPos: (pos: { x: number, y: number }) => void,
    aspectRatio: number
}

function useResizeObjects({ anchorPoint, ref, size, setSize, slideId, objId, scale, isResizing, setIsResizing, pos, setPos, aspectRatio }: useResizeObjectsProps) {
    const dispatch = useDispatch()
    
    const isResizingRef = useRef(isResizing)

    const onMouseDown = useCallback((e: MouseEvent) => {
        e.preventDefault()
        setIsResizing(true)
        isResizingRef.current = true
        const startPos = { x: e.pageX, y: e.pageY }
        const initialPos = pos
        const initialSize = size

        let deltaSize = {
            x: 0,
            y: 0
        }
        let newPos = { x: initialPos.x, y: initialPos.y }
        let newSize = initialSize

        const onMouseMove = (e: MouseEvent) => {
            switch (anchorPoint) {
                case 'botleft':
                    if (e.shiftKey) {
                        deltaSize = {
                            x: - ((e.pageX - startPos.x) / scale),
                            y: - ((e.pageX - startPos.x) / scale) / aspectRatio
                        }
                        newSize = {
                            w: Math.max(initialSize.w + deltaSize.x, 10),
                            h: Math.max(initialSize.w + deltaSize.x, 10) / aspectRatio
                        }
                        newPos = {
                            x: Math.min(initialPos.x - deltaSize.x / 2, initialPos.x + initialSize.w / 2, initialPos.x + initialSize.w / 2 - newSize.w / 2,),
                            y: initialPos.y + (newSize.h - initialSize.h) / 2
                        }
                    } else {
                        const deltaSize = {
                            x: - ((e.pageX - startPos.x) / scale),
                            y: (e.pageY - startPos.y) / scale
                        }
                        newSize = {
                            w: Math.max(initialSize.w + deltaSize.x, 10),
                            h: Math.max(initialSize.h + deltaSize.y, 10)
                        }
                        newPos = {
                            x: Math.min(initialPos.x - deltaSize.x / 2, initialPos.x + initialSize.w / 2 - newSize.w / 2),
                            y: Math.max(initialPos.y + deltaSize.y / 2, initialPos.y - initialSize.h / 2 + newSize.h / 2)
                        }
                    }
                    break

                case 'botright':
                    if (e.shiftKey) {
                        deltaSize = {
                            x: (e.pageX - startPos.x) / scale,
                            y: - ((e.pageX - startPos.x) / scale) / aspectRatio
                        }
                        newSize = {
                            w: Math.max(initialSize.w + deltaSize.x, 10),
                            h: Math.max(initialSize.w + deltaSize.x, 10) / aspectRatio
                        }
                        newPos = {
                            x: Math.max(initialPos.x + deltaSize.x / 2, initialPos.x - initialSize.w / 2 + newSize.w / 2),
                            y: initialPos.y + (newSize.h - initialSize.h) / 2
                        }
                    } else {
                        deltaSize = {
                            x: (e.pageX - startPos.x) / scale,
                            y: (e.pageY - startPos.y) / scale
                        }
                        newSize = {
                            w: Math.max(initialSize.w + deltaSize.x, 10),
                            h: Math.max(initialSize.h + deltaSize.y, 10)
                        }
                        newPos = {
                            x: Math.max(initialPos.x + deltaSize.x / 2, initialPos.x - initialSize.w / 2 + newSize.w / 2),
                            y: Math.max(initialPos.y + deltaSize.y / 2, initialPos.y - initialSize.h / 2 + newSize.h / 2)
                        }
                    }
                    break

                case 'topleft':
                    if (e.shiftKey) {
                        deltaSize = {
                            x: - ((e.pageX - startPos.x) / scale),
                            y: - ((e.pageX - startPos.x) / scale) / aspectRatio
                        }
                        newSize = {
                            w: Math.max(initialSize.w + deltaSize.x, 10),
                            h: Math.max(initialSize.w + deltaSize.x, 10) / aspectRatio
                        }
                        newPos = {
                            x: Math.min(initialPos.x - deltaSize.x / 2, initialPos.x + initialSize.w / 2 - newSize.w / 2),
                            y: initialPos.y - (newSize.h - initialSize.h) / 2
                        }
                    } else {
                        const deltaSize = {
                            x: - ((e.pageX - startPos.x) / scale),
                            y: - ((e.pageY - startPos.y) / scale)
                        }
                        newSize = {
                            w: Math.max(initialSize.w + deltaSize.x, 10),
                            h: Math.max(initialSize.h + deltaSize.y, 10)
                        }
                        newPos = {
                            x: Math.min(initialPos.x - deltaSize.x / 2, initialPos.x + initialSize.w / 2 - newSize.w / 2),
                            y: Math.min(initialPos.y - deltaSize.y / 2, initialPos.y + initialSize.h / 2 - newSize.h / 2)
                        }
                    }
                    break

                case 'topright':
                    if (e.shiftKey) {
                        deltaSize = {
                            x: (e.pageX - startPos.x) / scale,
                            y: - ((e.pageX - startPos.x) / scale) / aspectRatio
                        }
                        newSize = {
                            w: Math.max(initialSize.w + deltaSize.x, 10),
                            h: Math.max(initialSize.w + deltaSize.x, 10) / aspectRatio
                        }
                        newPos = {
                            x: Math.max(initialPos.x + deltaSize.x / 2, initialPos.x - initialSize.w / 2 + newSize.w / 2),
                            y: initialPos.y - (newSize.h - initialSize.h) / 2
                        }
                    } else {
                        deltaSize = {
                            x: (e.pageX - startPos.x) / scale,
                            y: - ((e.pageY - startPos.y) / scale)
                        }
                        newSize = {
                            w: Math.max(initialSize.w + deltaSize.x, 10),
                            h: Math.max(initialSize.h + deltaSize.y, 10)
                        }
                        newPos = {
                            x: Math.max(initialPos.x + deltaSize.x / 2, initialPos.x - initialSize.w / 2 + newSize.w / 2),
                            y: Math.min(initialPos.y - deltaSize.y / 2, initialPos.y + initialSize.h / 2 - newSize.h / 2)
                        }
                    }
                    break

                case 'top':
                    if (e.shiftKey) {
                        deltaSize = {
                            x: - ((e.pageY - startPos.y) / scale),
                            y: - ((e.pageY - startPos.y) / scale)
                        }
                        newSize = {
                            w: Math.max(initialSize.w + deltaSize.x, 10),
                            h: Math.max(initialSize.w + deltaSize.x, 10) / aspectRatio
                        }
                        newPos = {
                            x: initialPos.x,
                            y: initialPos.y - (newSize.h - initialSize.h) / 2
                        }
                    } else {
                        deltaSize = {
                            x: 0,
                            y: - ((e.pageY - startPos.y) / scale)
                        }
                        newSize = {
                            w: initialSize.w,
                            h: Math.max(initialSize.h + deltaSize.y, 10)
                        }
                        newPos = {
                            x: Math.min(initialPos.x - deltaSize.x / 2, initialPos.x + initialSize.w / 2),
                            y: Math.min(initialPos.y - deltaSize.y / 2, initialPos.y + initialSize.h / 2 - newSize.h / 2)
                        }
                    }
                    break

                case 'bot':
                    if (e.shiftKey) {
                        deltaSize = {
                            x: (e.pageY - startPos.y) / scale,
                            y: - ((e.pageY - startPos.y) / scale)
                        }
                        newSize = {
                            w: Math.max(initialSize.w + deltaSize.x, 10),
                            h: Math.max(initialSize.w + deltaSize.x, 10) / aspectRatio
                        }
                        newPos = {
                            x: initialPos.x,
                            y: initialPos.y + (newSize.h - initialSize.h) / 2
                        }
                    } else {
                        deltaSize = {
                            x: 0,
                            y: ((e.pageY - startPos.y) / scale)
                        }
                        newSize = {
                            w: initialSize.w,
                            h: Math.max(initialSize.h + deltaSize.y, 10)
                        }
                        newPos = {
                            x: Math.min(initialPos.x - deltaSize.x / 2, initialPos.x + initialSize.w / 2),
                            y: Math.max(initialPos.y + deltaSize.y / 2, initialPos.y - initialSize.h / 2 + newSize.h / 2)
                        }
                    }
                    break

                case 'left':
                    if (e.shiftKey) {
                        deltaSize = {
                            x: - ((e.pageX - startPos.x) / scale),
                            y: - ((e.pageX - startPos.x) / scale) / aspectRatio
                        }
                        newSize = {
                            w: Math.max(initialSize.w + deltaSize.x, 10),
                            h: Math.max(initialSize.w + deltaSize.x, 10) / aspectRatio
                        }
                        newPos = {
                            x: Math.min(initialPos.x - deltaSize.x / 2, initialPos.x + initialSize.w / 2 - newSize.w / 2),
                            y: initialPos.y
                        }
                    } else {
                        const deltaSize = {
                            x: - ((e.pageX - startPos.x) / scale),
                            y: 0
                        }
                        newSize = {
                            w: Math.max(initialSize.w + deltaSize.x, 10),
                            h: Math.max(initialSize.h + deltaSize.y, 10)
                        }
                        newPos = {
                            x: Math.min(initialPos.x - deltaSize.x / 2, initialPos.x + initialSize.w / 2 - newSize.w / 2),
                            y: Math.min(initialPos.y - deltaSize.y / 2, initialPos.y + initialSize.h / 2 - newSize.h / 2)
                        }
                    }
                    break

                case 'right':
                    if (e.shiftKey) {
                        deltaSize = {
                            x: (e.pageX - startPos.x) / scale,
                            y: - ((e.pageX - startPos.x) / scale) / aspectRatio
                        }
                        newSize = {
                            w: Math.max(initialSize.w + deltaSize.x, 10),
                            h: Math.max(initialSize.w + deltaSize.x, 10) / aspectRatio
                        }
                        newPos = {
                            x: Math.max(initialPos.x + deltaSize.x / 2, initialPos.x - initialSize.w / 2 + newSize.w / 2),
                            y: initialPos.y
                        }
                    } else {
                        deltaSize = {
                            x: (e.pageX - startPos.x) / scale,
                            y: 0
                        }
                        newSize = {
                            w: Math.max(initialSize.w + deltaSize.x, 10),
                            h: Math.max(initialSize.h + deltaSize.y, 10)
                        }
                        newPos = {
                            x: Math.max(initialPos.x + deltaSize.x / 2, initialPos.x - initialSize.w / 2 + newSize.w / 2),
                            y: Math.min(initialPos.y - deltaSize.y / 2, initialPos.y + initialSize.h / 2 - newSize.h / 2)
                        }
                    }
                    break

                default:
                    console.error('Error. Anchor point not found')
            }
            setSize(newSize)
            setPos(newPos)
        }

        const onMouseUp = () => {
            setIsResizing(false)
            isResizingRef.current = false
            if (newSize.h !== initialSize.h || newSize.w !== initialSize.w) {
                dispatch(setObjectSize(slideId, objId, newSize))
            }
            if (newPos.x !== initialPos.x || newPos.y !== initialPos.y) {
                dispatch(setObjectPosition(slideId, objId, newPos))
            }
            dispatch(setSelectedObjects([objId]))
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp, { once: true })
    }, [setIsResizing, pos, size, scale, aspectRatio, slideId, objId, anchorPoint, setPos, setSize, dispatch])

    useEffect(() => {
        isResizingRef.current = isResizing
    }, [isResizing])

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const slide = document.getElementById('slide')
        if (!slide) return

        element.addEventListener('mousedown', onMouseDown)

        return () => {
            element.removeEventListener('mousedown', onMouseDown)
        }

    }, [ref, onMouseDown])
}

export { useResizeObjects }
