import { RefObject, useEffect } from "react"
import { editor } from "./data"

type DragAndDropProps = {
    ref: RefObject<HTMLElement>,
    shift: number,
    setShift: (y: number) => void,
    slideId: string
}

function useDragAndDropToMoveSlides({ ref, shift, setShift, slideId }: DragAndDropProps) {
    useEffect(() => {
        function updateObjectsPos() {
            const slide = editor.slideList.find(slide => slide.id === slideId)
            if (!slide) return
            slide.objects.forEach(obj => {
                const element = document.getElementById(obj.id)
                if (element) {
                    element.style.top = obj.position.y + 'px'
                    element.style.left = obj.position.x + 'px'
                }
            })
        }

        const element = ref.current
        if (!element) return

        const onMouseDown = (e: MouseEvent) => {
            e.preventDefault()
            const startY = e.pageY
            const initialY = shift
            let newY = initialY
            const onMouseMove = (e: MouseEvent) => {
                const deltaY = e.pageY - startY
                newY = initialY + deltaY
                setShift(newY)
            }

            const onMouseUp = () => {
                setShift(initialY)
                updateObjectsPos()
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
    }, [ref, setShift])
}

export { useDragAndDropToMoveSlides }
