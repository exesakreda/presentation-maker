import { useEffect } from "react"
import { SlideObject } from "./SlideObject"
import type { Slide } from "../../../types"
import styles from '../assets/styles/Slide.module.css'
import { resizeInput } from "../services/hooks/resizeInput"
import { RootState } from "../store/reducers/rootReducer"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedObjects } from "../store/actions/selectionActions"
import { deleteObjects } from "../store/actions/presentationActions"

type SlideProps = {
    slide: Slide,
    scale: number,
    showSelection: boolean,
}

function Slide({ slide, scale, showSelection }: SlideProps) {
    const selectedObjects = useSelector((state: RootState) => state.selection.objects)
    const dispatch = useDispatch()

    useEffect(() => {
        document.querySelectorAll('input').forEach(input => resizeInput(input as HTMLInputElement))

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Delete' && selectedObjects.length > 0) {
                dispatch(deleteObjects(slide.id, selectedObjects))
                dispatch(setSelectedObjects([]))
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [selectedObjects, slide.id, dispatch])

    const slideObjects = slide.objects.map(obj => (
        <SlideObject
            key={obj.id}
            obj={obj}
            slideId={slide.id}
            scale={scale}
            showSelection={showSelection}
        />
    ))

    const backgroundValue = slide.background.type == 'color' ? String(slide.background.value) : ''

    return (
        <div
            className={styles.slide}
            style={{
                backgroundColor: backgroundValue
            }}
            id='slide'
        >
            {slideObjects}

            <div
                id="blankArea"
                className={styles.blankArea}
                style={{ backgroundColor: backgroundValue }}
                onClick={() => { dispatch(setSelectedObjects([])) }}
            >
            </div>
        </div>
    )
}

export { Slide }
