import { RefObject, useEffect } from "react"

function useDragAndDrop(ref: RefObject<HTMLElement>, setPos: (pos: { x: number, y: number }) => void) {
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

            const onMouseUp = () => {
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

export { useDragAndDrop }