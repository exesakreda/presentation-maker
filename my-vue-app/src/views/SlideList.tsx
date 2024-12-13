import type { Slide as SlideType } from "../../../types.ts"
import { Slide } from "./Slide.tsx"
import styles from './SlideList.module.css'
import { dispatch } from '../services/editor.ts'
import { addSlide, removeSlide } from '../services/editorFunctions.ts'
import { EditorType } from "../services/EditorType.ts"
import { MouseEvent, useRef, useState } from "react"
import { useMoveSlides } from "../services/hooks/useMoveSlides.ts"

type SlideList = {
    editor: EditorType,
    selectedSlides: string[],
    setSelectedSlides: (slidesId: string[]) => void,
    selectedObjects: string[],
    setSelectedObjects: (selectedObjects: string[]) => void
}

type SlideItemProps = {
    slide: SlideType
    slides: SlideType[]
    isDragging: boolean
    setIsDragging: (value: boolean) => void
    setInsertionTop: (value: number) => void
    selectedSlides: string[]
    selectedObjects: string[]
    setSelectedObjects: (selectedObjects: string[]) => void
    onSlideClick: (e: React.MouseEvent, slideId: string) => void
}


function SlideListItem({
    slide,
    slides,
    isDragging,
    setIsDragging,
    setInsertionTop,
    selectedSlides,
    selectedObjects,
    setSelectedObjects,
    onSlideClick
}: SlideItemProps) {
    const [shift, setShift] = useState(0)
    const ref = useRef<HTMLDivElement>(null)
    useMoveSlides({ ref, shift, setShift, slide: slide, slides: slides, isDragging, setIsDragging, setInsertionTop })
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
                top: `${shift}px`,
            }}
        >
            <p className={styles.slide__id}>{slides.indexOf(slide) + 1}</p>
            <div
                className={styles.slidePreview}
                style={{ transform: 'scale(0.1362903225806452)' }}
            >
                <Slide
                    slide={slide}
                    scale={0.1362903225806452}
                    showSelection={false}
                    selectedObjects={selectedObjects}
                    setSelectedObjects={setSelectedObjects}
                />
            </div>
        </div>
    )
}

function SlideList({ editor, selectedSlides, setSelectedSlides, selectedObjects, setSelectedObjects }: SlideList) {
    function onAddSlide() {
        dispatch(addSlide, {})
    }

    function onRemoveSlide() {
        dispatch(removeSlide, { selectedSlides: selectedSlides, setSelectedSlides: setSelectedSlides })
    }

    const [isDragging, setIsDragging] = useState(false)
    function onSlideClick(e: MouseEvent, slideId: string) {
        if (isDragging) return
        setSelectedObjects([])
        if (e.ctrlKey) {
            if (selectedSlides.includes(slideId)) {
                if (selectedSlides.length > 1 && editor.slideList.length > 1) {
                    const newSelectedSlides = selectedSlides.filter(id => id !== slideId)
                    setSelectedSlides(newSelectedSlides)
                    localStorage.setItem('selectedSlides', JSON.stringify(newSelectedSlides))
                }
            } else {
                const newSelectedSlides = [...selectedSlides, slideId]
                setSelectedSlides(newSelectedSlides)
                localStorage.setItem('selectedSlides', JSON.stringify(newSelectedSlides))
            }
        } else {
            const newSelectedSlides = [slideId]
            setSelectedSlides(newSelectedSlides)
            localStorage.setItem('selectedSlides', JSON.stringify(newSelectedSlides))
        }
    }

    const [insertionTop, setInsertionTop] = useState(60)

    const slides: SlideType[] = editor.slideList
    const slideListItems = slides.map((slide) => {
        return (
            <SlideListItem
                key={slide.id}
                slide={slide}
                slides={slides}
                isDragging={isDragging}
                setIsDragging={setIsDragging}
                setInsertionTop={setInsertionTop}
                selectedSlides={selectedSlides}
                selectedObjects={selectedObjects}
                setSelectedObjects={setSelectedObjects}
                onSlideClick={onSlideClick}
            />)
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