import { useEffect } from "react"
import { SlideObject } from "./SlideObject"
import type { Slide } from "../../../types"
import styles from '../assets/styles/Slide.module.css'
import { RootState } from "../store/reducers/rootReducer"
import { useSelector } from "react-redux"
import { setSelectedObjects } from "../store/actions/presentationActions"
import { deleteObjects } from "../store/actions/presentationActions"
import createDispatch from "../store/utils/createDispatch"
import store from "../store"

type SlideProps = {
    slide: Slide,
    scale: number,
    showSelection: boolean,
}

function Slide({ slide, scale, showSelection }: SlideProps) {
    const selectedObjects = useSelector((state: RootState) => state.presentation.selection.objects)
    const dispatch = createDispatch(store)

    useEffect(() => {
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

    const backgroundType = slide.background.type
    const backgroundValue = backgroundType == 'color' ? String(slide.background.value) : String(slide.background.src)

    return (
        <div
            className={styles.slide}
            id='slide'
        >
            {slideObjects}

            <div
                id="blankArea"
                className={styles.blankArea}
                style={{
                    backgroundColor: backgroundType == 'color' ? backgroundValue : '#ffffff',
                    backgroundImage: backgroundType == 'image' ? `url(${backgroundValue})` : 'none'
                }}
                onClick={() => { dispatch(setSelectedObjects([])) }}
            >
            </div>
        </div>
    )
}

export { Slide }
