import { useCallback, useEffect, useState } from "react"
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

    const getBackgroundValue = useCallback(() => {
        const backgroundType = slide.background.type
        switch (backgroundType) {
            case 'color':
                return String(slide.background.value);

            case 'image':
                return `url(${String(slide.background.src)})`

            case 'gradient': {
                const colors = slide.background.colors.map((color) => {
                    return `${color.color} ${color.position}%`
                }).join(', ')

                return `linear-gradient(${slide.background.direction}deg, ${colors})`
            }

            default:
                return '#FFFFFF'
        }
    }, [slide.background])

    const [backgroundStyle, setBackgroundStyle] = useState('')
    useEffect(() => {
        setBackgroundStyle(getBackgroundValue())
    }, [slide, getBackgroundValue])

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
                    background: backgroundStyle,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
                onClick={() => { dispatch(setSelectedObjects([])) }}
            >
            </div>
        </div >
    )
}

export { Slide }
