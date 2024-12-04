import styles from './SlideArea.module.css'
import { createTextArea } from "../services/editorFunctions"
import { Slide } from "./Slide"
import { dispatch } from "../services/editor"
import { useEffect, useState } from "react"
import { CSSProperties } from "react"
import type { Slide as SlideType } from "../../../types"

type SlideAreaProps = {
    currentSlide: SlideType,
    currentTool: 'cursor' | 'text' | 'image',
    onToolSelect: (tool: 'cursor' | 'text' | 'image') => void,
    selectedObjects: string[],
    setSelectedObjects: (selectedObjectrs: string[]) => void
}

function SlideArea({ currentSlide, currentTool, onToolSelect, selectedObjects, setSelectedObjects }: SlideAreaProps) {
    const innerWidth = 2560
    const [scale, setScale] = useState(window.innerWidth / innerWidth)
    const [zoom, setZoom] = useState(1)

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

        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [innerWidth, zoom])

    return (
        <div
            className={styles.slideArea}
            id='slideArea'
            style={{
                cursor: currentTool === 'cursor' ? 'default' : 'text',
                '--scale': scale
            } as CSSProperties}
            onClick={(event) => {
                if (currentTool == 'text') {
                    dispatch(createTextArea, {
                        e: event,
                        slideId: currentSlide.id,
                        scale: scale
                    })
                    onToolSelect('cursor')
                }
            }}
        >
            {currentSlide ? (
                <Slide slide={currentSlide} scale={scale} showSelection={true} selectedObjects={selectedObjects} setSelectedObjects={setSelectedObjects} />
            ) : (
                <></>
            )}
        </div>
    )
}

export { SlideArea }
