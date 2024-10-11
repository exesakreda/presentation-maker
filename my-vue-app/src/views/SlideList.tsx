import styles from './SlideList.module.css'
import { Presentation, Slide } from "../../../types"
import { SlideComponent } from './SlideComponent'

type SlideListProps = {
    presentation: Presentation
}

function SlideList(props: SlideListProps) {
    const slides: Slide[] = props.presentation.slideList
    const selectedSlides: string[] = props.presentation.selectedSlides

    const slideListItems = slides.map(slide => {
        var slide = props.presentation.slideList[props.presentation.slideList.indexOf(slide)]
        return(
            <div key={slide.id} className={`${styles.slideContainer} ${selectedSlides.includes(slide.id) ? styles.selectedSlide : ''}`}>
                <p className={styles.slide__id}>{slides.indexOf(slide) + 1}</p>
                <div className={styles.slidePreview}>
                    <SlideComponent slide={slide} scale={0.15}/>
                </div>
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