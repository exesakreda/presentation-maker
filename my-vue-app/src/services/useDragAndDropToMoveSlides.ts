import { RefObject, useEffect, useRef } from "react"
import { Slide } from "../../../types"
import { dispatch } from "./editor"
import { updateSlideList } from "./editorFunctions"

type DragAndDropProps = {
    ref: RefObject<HTMLElement>,
    shift: number,
    setShift: (y: number) => void,
    slide: Slide,
    slides: Slide[],
    isDragging: boolean,
    setIsDragging: (isDragging: boolean) => void,
    setInsertionTop: (insertionTop: number) => void
}

function useDragAndDropToMoveSlides({ ref, shift, setShift, slide, slides, isDragging, setIsDragging, setInsertionTop }: DragAndDropProps) {
    const isDraggingRef = useRef(isDragging)
    useEffect(() => {
        isDraggingRef.current = isDragging;
    }, [isDragging])

    function calculateIndex(elementTop: number) {
        let index = Math.round(elementTop / 107)
        index = Math.max(0, Math.min(index, slides.length - 1))
        let newInsertionTop = index * 107 + 60 + 53.5

        setInsertionTop(newInsertionTop)

        return index
    }

    function insertSlide(index: number, oldIndex: number) {
        const newSlideList = [...slides]
        newSlideList.splice(oldIndex, 1)
        newSlideList.splice(index, 0, slide)

        dispatch(updateSlideList, newSlideList)
    }

    useEffect(() => {
        const element = ref.current
        const oldIndex = slides.indexOf(slide)
        if (!element) return
        const onMouseDown = (e: MouseEvent) => {
            e.preventDefault()
            const initialMouseY = e.pageY
            const initialShift = shift
            let shiftWhileDragging = initialShift
            let index = 0

            const onMouseMove = (e: MouseEvent) => {
                if (!isDraggingRef.current) {
                    setIsDragging(true)
                    isDraggingRef.current = true
                }
                const deltaY = e.pageY - initialMouseY
                const slideListTop = document.getElementById('slidelist')?.getBoundingClientRect().top || 0
                const elementTop = element.getBoundingClientRect().top - slideListTop
                index = calculateIndex(elementTop)
                shiftWhileDragging = initialShift + deltaY
                setShift(shiftWhileDragging)
            }

            const onMouseUp = () => {
                setShift(0)
                if (shiftWhileDragging !== initialShift) {
                    insertSlide(index, oldIndex)
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
    }, [ref, setShift, shift, slide, slides, setIsDragging])
}

export { useDragAndDropToMoveSlides }
