import { Slide } from "../../../types.ts"

import { SlideComponent } from "./SlideComponent.tsx"

import styles from './SlideList.module.css'

import { dispatch } from '../services/editor.ts'
import { addSlide, removeSlide, setSelection } from '../services/editorFunctions.ts'
import { EditorType } from "../services/EditorType.ts"

type ActionsProps = {
    editor: EditorType,
}

function SlideList({ editor }: ActionsProps) {
    function onButtonClick() {
        dispatch(addSlide)
    }

    function onRemoveSlide() {
        dispatch(removeSlide)
    }

    function onSlideClick(slideId: string) {
        if (editor.selection) {
            if (event.ctrlKey) {
                if (editor.selection.selectedSlides.includes(slideId)) {
                    dispatch(setSelection, {
                        selectedSlides: editor.selection.selectedSlides.filter(id => id !== slideId)
                    })
                } else {
                    dispatch(setSelection, {
                        selectedSlides: [...editor.selection?.selectedSlides, slideId]
                    })
                }
            } else {
                dispatch(setSelection, {
                    selectedSlides: [slideId]
                })
            }
            
        }
    }

    const slides: Slide[] = editor.presentation.slideList

    const slideListItems = slides.map(slide => {
        return (
            <div
                key={slide.id}
                onClick={() => onSlideClick(slide.id)}
                className={`${styles.slideContainer} ${editor.selection?.selectedSlides.includes(slide.id)
                    ? styles.selectedSlide
                    : ''
                    }`}
            >
                <p className={styles.slide__id}>{slides.indexOf(slide) + 1}</p>
                <div className={styles.slidePreview}>
                    <SlideComponent slide={slide} scale={0.15} />
                </div>
            </div>
        )
    })

    return (
        <div className={styles.actionbar}>
            <button
                className={styles.actionbar__newslide}
                onClick={onButtonClick}
            >
                <div className={styles.newslidebutton__text}>Новый слайд</div>
                <img src="/src/assets/plus.svg" alt="" />
            </button>

            <div className={styles.divider} />

            <div className={styles.slidelist}>
                {slideListItems}
            </div>

            <button className={styles.actionbar__deleteslide}>
                <div className={styles.deleteslidebutton__text} onClick={onRemoveSlide}>Удалить выбранные слайды</div>
                <img src="/src/assets/minus.svg" alt="" />
            </button>

        </div>
    )
}

export { SlideList }