import { RefObject, useEffect } from "react"

function useDragAndDropToMoveSlides(ref: RefObject<HTMLElement>, index: number, setIndex: (index: number) => void) {
    useEffect(() => {
        const element = ref.current
        if (!element) return
        
    }
    )

}

export {
    useDragAndDropToMoveSlides
}