import styles from './SlideList.module.css'
import { Slide } from "../../../types"
import { SlideComponent } from './SlideComponent'
import { dispatch } from '../services/editor'
import { setSelection } from '../services/editorFunctions'
import { EditorType } from '../services/EditorType'

type SlideListProps = {
    editor: EditorType,
}

function SlideList({ editor }: SlideListProps) {
    function onSlideClick(slideId: String) {
        dispatch(setSelection, {
            selectedSlideId: slideId
        })
    }

    const slides: Slide[] = editor.presentation.slideList

    const slideListItems = slides.map(slide => {
        return(
            <div 
                key={slide.id} 
                onClick={() => onSlideClick(slide.id)} 
                className={`${styles.slideContainer} ${editor.selection?.selectedSlideId === slide.id
                    ? styles.selectedSlide 
                    : ''
                }`}
            >
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