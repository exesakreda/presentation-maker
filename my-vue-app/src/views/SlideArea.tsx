import { Presentation, Slide } from "../../../types"
import styles from './SlideArea.module.css'

import { SlideComponent } from "./SlideComponent"

type SlideAreaProps = {
    presentation: Presentation,
}

function SlideArea(props: SlideAreaProps) {
    const currentSlide: Slide | undefined = props.presentation.slideList.find(slide => slide.id === props.presentation.selectedSlides[0])
    return (
        <div className={styles.slideArea}>
            {currentSlide ? ( 
                <SlideComponent slide={currentSlide} scale={1}/>
            ) : (
                <p>Слайд не найден</p>
            )}
        </div>
    )
}

export { SlideArea }