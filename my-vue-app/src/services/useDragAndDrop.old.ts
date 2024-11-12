import { useEffect, useRef, useState } from "react"

function useDragAndDrop(initialPosition: { x: number, y: number }) {
    const [position, setPosition] = useState(initialPosition)
    const ref = useRef<HTMLDivElement>(null)
    const isDragging = useRef(false) 

    useEffect(() => {
        const onMouseDown = (event: MouseEvent) => {
            const shiftX = event.pageX - position.x
            const shiftY = event.pageY - position.y
            isDragging.current = true

            const onMouseMove = (event: MouseEvent) => {
                if (isDragging.current) {
                    const newX = event.pageX - shiftX
                    const newY = event.pageY - shiftY
                    setPosition({ x: newX, y: newY })
                }
            }

            const onMouseUp = () => {
                isDragging.current = false
                document.removeEventListener('mousemove', onMouseMove)
                document.removeEventListener('mouseup', onMouseUp)
            }

            document.addEventListener('mousemove', onMouseMove)
            document.addEventListener('mouseup', onMouseUp)
        }

        const onDragStart = (event: DragEvent) => {
            event.preventDefault()
        }

        if (ref.current) {
            ref.current.addEventListener('mousedown', onMouseDown)
            ref.current.addEventListener('dragstart', onDragStart) 
        }

        return () => {
            if (ref.current) {
                ref.current.removeEventListener('mousedown', onMouseDown)
                ref.current.removeEventListener('dragstart', onDragStart)
            }
        }
    }, [position])

    return { ref, position }
}

export { useDragAndDrop }
