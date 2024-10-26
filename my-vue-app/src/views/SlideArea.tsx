import type { Slide as SlideType } from "../../../types"
import { EditorType } from "../services/EditorType"
import styles from './SlideArea.module.css'

import { Slide } from "./Slide"

type SlideAreaProps = {
    editor: EditorType,
}

function SlideArea({ editor }: SlideAreaProps) {
    const currentSlide: SlideType | undefined = editor.presentation.slideList.find(slide => slide.id === editor.selection?.selectedSlides[editor.selection?.selectedSlides.length - 1])
    return (
        <div className={styles.slideArea}>
            {currentSlide ? ( 
                <Slide slide={currentSlide} scale={1}/>
            ) : (
                <></>
            )}
        </div>
    )
}

export { SlideArea }