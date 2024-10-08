import React from "react"
import styles from './SlideList.module.css'
import { Slide } from "../../types"
import { minPresentation } from "./App"
import { maxPresentation } from "./App"
import { isMax } from "./App"
import { SlidePreview } from "./SlidePreview"


type SlideListProps = {
    slides: Slide[],
    selectedSlides: string[]
}

function SlideList(props: SlideListProps) {
    const slides: Slide[] = props.slides
    const selectedSlides: string[] = props.selectedSlides

    const slideListItems = slides.map(slide => {
        return(
            <div key={slide.id} className={`${styles.slide} ${selectedSlides.includes(slide.id) ? styles.selectedSlide : ''}`}>
                <p className={styles.slide__id}>{slides.indexOf(slide) + 1}</p>
                <SlidePreview />
            </div>
        )
    })

    return (
        <div className={styles.slidelist}>
            {slideListItems}
        </div>
    )

}

export { SlideList }