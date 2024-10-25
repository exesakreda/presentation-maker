import { Slide } from "../../../types"
import { EditorType } from "../services/EditorType"
import styles from './SlideArea.module.css'

import { SlideComponent } from "./SlideComponent"

type SlideAreaProps = {
    editor: EditorType,
}

function SlideArea({ editor }: SlideAreaProps) {
    const currentSlide: Slide | undefined = editor.presentation.slideList.find(slide => slide.id === editor.selection?.selectedSlides[editor.selection?.selectedSlides.length - 1])
    return (
        <div className={styles.slideArea}>
            {currentSlide ? ( 
                <SlideComponent slide={currentSlide} scale={1}/>
            ) : (
                <></>
            )}
        </div>
    )
}

export { SlideArea }