import { EditorType } from "../services/EditorType"
import styles from './SlideArea.module.css'
import { createObject } from "../services/editorFunctions"
import { Slide } from "./Slide"
import { dispatch } from "../services/editor"
import { useEffect, useState } from "react"
type SlideAreaProps = {
    editor: EditorType,
    currentSlideId: string,
    currentTool: 'cursor' | 'text' | 'image',
    onToolSelect: (tool: 'cursor' | 'text' | 'image') => void
}

function SlideArea({ editor, currentSlideId, currentTool, onToolSelect }: SlideAreaProps) {
    const currentSlide = editor.slideList.find(slide => slide.id === currentSlideId)

    const [scale, setScale] = useState(1)
    const [zoom, setZoom] = useState(1)

    const innerWidth = 2560

    useEffect(() => {
        const handleWindowResize = () => {
            const newInnerWidth = window.innerWidth

            if (window.visualViewport) {
                const newZoom = window.visualViewport.scale
                setZoom(newZoom)
            }

            if (newInnerWidth !== innerWidth) {
                const newScale = (newInnerWidth / innerWidth) * zoom
                setScale(newScale)
            }
        }
        handleWindowResize()

        window.addEventListener('resize', handleWindowResize)
    }, [])

    return (
        <div
            className={styles.slideArea}
            id='slideArea'
            style={
                {
                    cursor: currentTool === 'cursor' ? 'default' : 'text',
                    transform: `translate(-50%, -50%) scale(${scale})`
                }}
            onClick={(event) => {
                if (currentTool !== 'cursor') {
                    dispatch(createObject, {
                        e: event,
                        slideId: currentSlideId,
                        currentTool: currentTool
                    })
                    onToolSelect('cursor')
                }
            }}>
            {currentSlide ? (
                <Slide slide={currentSlide} scale={1} />
            ) : (
                <></>
            )}
        </div>
    )
}

export { SlideArea }