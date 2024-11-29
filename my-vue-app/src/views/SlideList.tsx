import type { Slide as SlideType } from "../../../types.ts"
import { Slide } from "./Slide.tsx"
import styles from './SlideList.module.css'
import { dispatch } from '../services/editor.ts'
import { addSlide, removeSlide } from '../services/editorFunctions.ts'
import { EditorType } from "../services/EditorType.ts"
import { MouseEvent, useRef, useState } from "react"
import { useDragAndDropToMoveSlides } from "../services/useDragAndDropToMoveSlides.ts"

type ActionsProps = {
    editor: EditorType,
    selectedSlides: string[],
    onSlideSelect: (slidesId: string[]) => void
}

function SlideList({ editor, selectedSlides, onSlideSelect }: ActionsProps) {
    function onAddSlide() {
        dispatch(addSlide)
    }

    function onRemoveSlide() {
        dispatch(removeSlide, { selectedSlides: selectedSlides, setSelectedSlides: onSlideSelect })
    }

    const [isDragging, setIsDragging] = useState(false)
    function onSlideClick(e: MouseEvent, slideId: string) {
        if (isDragging) return
        if (e.ctrlKey) {
            if (selectedSlides.includes(slideId)) {
                if (selectedSlides.length > 1 && editor.slideList.length > 1) {
                    onSlideSelect(selectedSlides.filter(id => id !== slideId))
                }
            } else {
                onSlideSelect([...selectedSlides, slideId])
            }
        } else {
            onSlideSelect([slideId])
        }
    }

    const [insertionTop, setInsertionTop] = useState(60)

    const slides: SlideType[] = editor.slideList
    const slideListItems = slides.map(slide => {
        const [shift, setShift] = useState(0)
        const ref = useRef<HTMLDivElement>(null)
        useDragAndDropToMoveSlides({ ref, shift, setShift, slide: slide, slides: slides, isDragging, setIsDragging, setInsertionTop })
        return (
            <div
                key={slide.id}
                ref={ref}
                id={slide.id}
                onMouseDown={(event) => onSlideClick(event, slide.id)}
                className={`${styles.slideContainer} ${selectedSlides.includes(slide.id)
                    ? styles.selectedSlide
                    : ''
                    }`}
                style={{
                    // transform: `translateY(${shift}px)`
                    top: `${shift}px`,
                }}
            >
                <p className={styles.slide__id}>{slides.indexOf(slide) + 1}</p>
                <div
                    className={styles.slidePreview}
                    style={{ transform: 'scale(0.1362903225806452)' }}
                >
                    <Slide slide={slide} scale={0.1362903225806452} />
                </div>
            </div>
        )
    })

    return (
        <div className={styles.actionbar} id="actionbar">
            <button
                className={styles.actionbar__newslide}
                onClick={onAddSlide}
            >
                <div className={styles.newslidebutton__text}>Новый слайд</div>
                <img src="/src/assets/plus.svg" alt="" />
            </button>

            <div className={styles.divider} />

            <div className={styles.slidelist} id='slidelist'>
                <div
                    className={styles.insertionMarker}
                    style={{
                        top: `${insertionTop}px`,
                        display: isDragging ? 'block' : 'none'
                    }}
                />
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