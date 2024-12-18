import styles from '../assets/styles/SlideArea.module.css'
import { Slide } from "./Slide"
import { MouseEvent, useEffect, useState } from "react"
import { CSSProperties } from "react"

import { RootState } from '../store/reducers/rootReducer'
import { useDispatch, useSelector } from 'react-redux'
import { createTextarea } from '../store/actions/presentationActions'
import { setTool } from '../store/actions/toolActions'
import getCursorPosOnSlide from '../services/getCursorPosOnSlide'

function SlideArea() {
    const slideList = useSelector((state: RootState) => state.presentation.slideList)
    const currentTool = useSelector((state: RootState) => state.tool)
    const selectedSlides = useSelector((state: RootState) => state.selection.slides)
    const dispatch = useDispatch()

    const currentSlide = slideList.find(slide => slide.id == selectedSlides[selectedSlides.length - 1])

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
                cursor: currentTool == 'text' ? 'text' : 'default',
                '--scale': scale
            } as CSSProperties}
            onClick={(e: MouseEvent) => {
                if (currentTool == 'text' && currentSlide) {
                    dispatch(createTextarea(currentSlide.id, getCursorPosOnSlide(e, scale)))
                    dispatch(setTool('cursor'))
                }
            }}
        >
            {currentSlide ? (
                <Slide slide={currentSlide} scale={scale} showSelection={true} />
            ) : (
                <></>
            )}
        </div>
    )
}

export { SlideArea }
