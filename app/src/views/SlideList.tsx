import { Slide } from "./Slide.tsx"
import styles from '../assets/styles/SlideList.module.css'
import { useCallback, useEffect, useState } from "react"

import { useSelector } from "react-redux"
import createDispatch from "../store/utils/createDispatch.ts"
import { RootState } from "../store/reducers/rootReducer.ts"
import { addSlide, removeSlides, updateSlideList } from "../store/actions/presentationActions.ts"
import { setSelectedSlides, setSelectedObjects } from "../store/actions/presentationActions.ts"
import { addNotification } from "../store/actions/notificationActions.ts"
import store from "../store/index.ts"
import { uid } from 'uid'


function SlideList() {
    const slideList = useSelector((state: RootState) => state.presentation.slideList)
    const selectedSlides = useSelector((state: RootState) => state.presentation.selection.slides)
    const dispatch = createDispatch(store)

    const [isDragging, setIsDragging] = useState(false)
    const [insertionTop, setInsertionTop] = useState(60)
    const [activeShift, setActiveShift] = useState(0)

    const handleSlideClick = useCallback((e: React.MouseEvent, slideId: string) => {
        e.stopPropagation()

        if (e.shiftKey) {
            const currentIndex = slideList.findIndex(slide => slide.id === slideId)
            const lastSelectedIndex = slideList.findIndex(
                slide => slide.id === selectedSlides[selectedSlides.length - 1]
            )

            const start = Math.min(currentIndex, lastSelectedIndex)
            const end = Math.max(currentIndex, lastSelectedIndex)

            const newSelection = slideList
                .slice(start, end + 1)
                .map(slide => slide.id)

            dispatch(setSelectedSlides(newSelection))
        } else if (e.ctrlKey || e.metaKey) {
            const newSelection = selectedSlides.includes(slideId)
                ? selectedSlides.filter(id => id !== slideId)
                : [...selectedSlides, slideId]

            dispatch(setSelectedSlides(newSelection))
        } else {
            dispatch(setSelectedSlides([slideId]))
        }

        dispatch(setSelectedObjects([]))
    }, [slideList, selectedSlides, dispatch])

    useEffect(() => {
        const handleMouseDown = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const slideContainer = target.closest(`.${styles.slideContainer}`)
            if (slideContainer && selectedSlides.includes(slideContainer.id)) {
                const initialMouseY = e.pageY
                setIsDragging(true)

                let index = 0
                const handleMouseMove = (e: MouseEvent) => {
                    const deltaY = e.pageY - initialMouseY
                    setActiveShift(deltaY)

                    const slideListElement = document.getElementById('slidelist')
                    const slideElement = e.target as HTMLElement
                    const elementTop = slideElement.getBoundingClientRect().top - 60
                    if (slideListElement) {
                        index = Math.round(elementTop / 107)
                        index = Math.max(0, Math.min(index, slideList.length - 1))
                        const newInsertionTop = index * 107 + 60 + 80.5

                        setInsertionTop(newInsertionTop)
                    }
                }

                const handleMouseUp = (e: MouseEvent) => {
                    const deltaY = e.pageY - initialMouseY
                    if (Math.abs(deltaY) > 10) {
                        const selectedSlidesIndexes = selectedSlides
                            .map(id => slideList.findIndex(slide => slide.id === id))
                            .sort((a, b) => a - b)

                        const newSlideList = [...slideList]
                        const slidesToMove = selectedSlidesIndexes.map(index => newSlideList[index])

                        selectedSlidesIndexes.reverse().forEach(index => {
                            newSlideList.splice(index, 1)
                        })

                        const targetIndex = Math.min(Math.max(0, index), newSlideList.length)
                        newSlideList.splice(targetIndex, 0, ...slidesToMove)

                        setTimeout(() => {
                            dispatch(updateSlideList(newSlideList))
                            dispatch(setSelectedSlides(slidesToMove.map(slide => slide.id)))
                        }, 1)

                    }

                    setActiveShift(0)
                    setIsDragging(false)

                    document.removeEventListener('mousemove', handleMouseMove)
                    document.removeEventListener('mouseup', handleMouseUp)
                }

                document.addEventListener('mousemove', handleMouseMove)
                document.addEventListener('mouseup', handleMouseUp)

                e.preventDefault()
                e.stopPropagation()
            }
        }

        document.addEventListener('mousedown', handleMouseDown)
        return () => {
            document.removeEventListener('mousedown', handleMouseDown)
        }
    }, [selectedSlides, dispatch, slideList])

    function handleRemoveSlide() {
        if (slideList.length - selectedSlides.length > 0) {
            dispatch(removeSlides(selectedSlides))
            const newSlides = slideList.filter(slide => !selectedSlides.includes(slide.id))
            let closestSlideId = null
            if (newSlides.length > 0) {
                const firstSelectedIndex = slideList.findIndex(slide => selectedSlides.includes(slide.id))
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
        } else {
            dispatch(addNotification('error', 'Ошибка удаления слайда.', 'Нельзя удалить единственный слайд.'))
        }
    }

    const slideListItems = slideList.map((slide) => {
        if (!slide || !slide.id) return null
        return (
            <div
                key={slide.id}
                id={slide.id}
                className={`${styles.slideContainer} ${selectedSlides.includes(slide.id)
                    ? styles.selectedSlide
                    : ''
                    }`}
                onClick={(event) => handleSlideClick(event, slide.id)}
                style={{
                    transform: isDragging && selectedSlides.includes(slide.id)
                        ? `translateY(${activeShift}px)`
                        : 'translateY(0px)',
                    // transition: isDragging ? 'none' : ' 0.2s ease-out'
                }}
            >
                <p className={styles.slide__id}>{slideList.indexOf(slide) + 1}</p>
                <div
                    className={styles.slidePreview}
                    style={{ transform: 'scale(0.088020833)' }}
                >
                    <Slide
                        slide={slide}
                        scale={0.1362903225806452}
                        showSelection={false}
                    />
                </div>
            </div>
        )
    })

    return (
        <div className={styles.actionbar} id="actionbar">
            <button
                className={styles.actionbar__newslide}
                onClick={() => {
                    const id = 'slide_' + uid(10)
                    dispatch(addSlide({
                        id: id,
                        background: { type: 'color', value: '#ffffff' },
                        objects: []
                    }))
                    dispatch(setSelectedSlides([id]))
                }
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