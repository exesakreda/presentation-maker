import type { Slide as SlideType } from "../../../types.ts"
import { Slide } from "./Slide.tsx"
import styles from '../assets/styles/SlideList.module.css'
import { MouseEvent, useRef, useState } from "react"
import { useMoveSlides } from "../services/hooks/useMoveSlides.ts"

import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/reducers/rootReducer.ts"
import { addSlide, removeSlides } from "../store/actions/presentationActions.ts"
import { setSelectedSlides, setSelectedObjects } from "../store/actions/selectionActions.ts"

type SlideItemProps = {
    slide: SlideType
    slides: SlideType[]
    isDragging: boolean
    setIsDragging: (value: boolean) => void
    setInsertionTop: (value: number) => void
    selectedSlides: string[]
    onSlideClick: (e: React.MouseEvent, slideId: string) => void
}

function SlideListItem({
    slide,
    slides,
    isDragging,
    setIsDragging,
    setInsertionTop,
    selectedSlides,
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
                />
            </div>
        </div>
    )
}

function SlideList() {
    const slideList = useSelector((state: RootState) => state.presentation.slideList)
    const selection = useSelector((state: RootState) => state.selection)
    const dispatch = useDispatch()

    const [isDragging, setIsDragging] = useState(false)
    const [insertionTop, setInsertionTop] = useState(60)

    function onSlideClick(e: MouseEvent, slideId: string) {
        if (isDragging) return
        dispatch(setSelectedObjects([]))
        if (e.ctrlKey) {
            if (selection.slides.includes(slideId)) {
                if (selection.slides.length > 1 && slideList.length > 1) {
                    const newSelectedSlides = selection.slides.filter(id => id !== slideId)
                    dispatch(setSelectedSlides(newSelectedSlides))
                }
            } else {
                const newSelectedSlides = [...selection.slides, slideId]
                dispatch(setSelectedSlides(newSelectedSlides))
            }
        } else {
            const newSelectedSlides = [slideId]
            dispatch(setSelectedSlides(newSelectedSlides))
        }
    }

    function handleRemoveSlide() {
        if (slideList.length - selection.slides.length > 0 ) {
            dispatch(removeSlides(selection.slides))
            const newSlides = slideList.filter(slide => !selection.slides.includes(slide.id))
            let closestSlideId = null
            if (newSlides.length > 0) {
                const firstSelectedIndex = slideList.findIndex(slide => selection.slides.includes(slide.id))
                if (firstSelectedIndex !== -1) {
                    if (firstSelectedIndex < newSlides.length) {
                        closestSlideId = newSlides[firstSelectedIndex].id
                    } else {
                        closestSlideId = newSlides[newSlides.length - 1].id
                    }
                } else {
                    closestSlideId = newSlides[0].id
                }
                dispatch(setSelectedSlides([closestSlideId]))
            } else {
                dispatch(setSelectedSlides([]))
            }
        }
    }

    const slideListItems = slideList.map((slide) => {
        if (!slide || !slide.id) return null
        return (
            <SlideListItem
                key={slide.id}
                slide={slide}
                slides={slideList}
                isDragging={isDragging}
                setIsDragging={setIsDragging}
                setInsertionTop={setInsertionTop}
                selectedSlides={selection.slides}
                onSlideClick={onSlideClick}
            />)
    })

    return (
        <div className={styles.actionbar} id="actionbar">
            <button
                className={styles.actionbar__newslide}
                onClick={() =>
                    dispatch(addSlide({
                        id: String(Number(slideList[slideList.length - 1]?.id || 0) + 1),
                        background: { type: 'color', value: '#ffffff' },
                        objects: []
                    }))
                }
            >
                <div className={styles.newslidebutton__text}>Новый слайд</div>
                <img src="/src/assets/images/plus.svg" alt="" />
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
                <div className={styles.deleteslidebutton__text} onClick={() => handleRemoveSlide()}>Удалить выбранные слайды</div>
                <img src="/src/assets/images/minus.svg" alt="" />
            </button>

        </div>
    )
}

export { SlideList }