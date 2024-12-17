import { useEffect } from "react"
import { SlideObject } from "./SlideObject"
import type { Slide } from "../../../types"
import styles from '../assets/styles/Slide.module.css'
import { resizeInput } from "../services/hooks/resizeInput"
import { dispatch } from "../services/editor"
import { deleteObject } from "../services/editorFunctions"

type SlideProps = {
    slide: Slide,
    scale: number,
    showSelection: boolean,
    selectedObjects: string[],
    setSelectedObjects: (selectedObjects: string[]) => void
}

function Slide({ slide, scale, showSelection, selectedObjects, setSelectedObjects }: SlideProps) {
    useEffect(() => {
        document.querySelectorAll('input').forEach(input => resizeInput(input as HTMLInputElement))

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Delete' && selectedObjects.length > 0) {
                dispatch(deleteObject, {
                    slideId: slide.id,
                    objectsToDelete: selectedObjects
                })
                setSelectedObjects([])
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [selectedObjects, slide.id, setSelectedObjects])

    const slideObjects = slide.objects.map(obj => (
        <SlideObject
            key={obj.id}
            obj={obj}
            slideId={slide.id}
            selectedObjects={selectedObjects}
            setSelectedObjects={setSelectedObjects}
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
                onClick={() => {
                    setSelectedObjects([])
                }}
            >
            </div>
        </div>
    )
}

export { Slide }
