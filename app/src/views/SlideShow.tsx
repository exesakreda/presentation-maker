import { useSelector } from "react-redux"
import { RootState } from "../store/reducers/rootReducer"
import { useEffect, useState } from "react"
import styles from '../assets/styles/SlideShow.module.css'
import { Slide } from "./Slide"
import { useNavigate } from "react-router-dom"

function SlideShow({ slideIndex }: { slideIndex: number }) {
    const navigate = useNavigate()

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                document.exitFullscreen()
                    .catch(err => console.error('Error exiting full screen:', err))
                navigate('/')
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [navigate])

    const slideList = useSelector((state: RootState) => state.presentation.slideList)

    const [curentSlideIndex, setCurrentSlideIndex] = useState(slideIndex)

    const [viewportHeight, setViewportHeight] = useState(window.innerHeight)
    window.addEventListener('resize', () => {
        setViewportHeight(window.innerHeight)
    })

    const scale = viewportHeight / 1080

    function changeSlideIndex(action: 'next' | 'previous') {
        switch (action) {
            case 'next':
                setCurrentSlideIndex(Math.min(slideList.length - 1, curentSlideIndex + 1))
                break

            case 'previous':
                setCurrentSlideIndex(Math.max(0, curentSlideIndex - 1))
                break

            default:
                return
        }
    }

    useEffect(() => {
        const handleChangeSlideIndexWithKey = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowLeft':
                    changeSlideIndex('previous')
                    break

                case 'ArrowRight':
                    changeSlideIndex('next')
                    break

                default:
                    return
            }
        }

        document.addEventListener('keydown', event => handleChangeSlideIndexWithKey(event))

        return () => {
            document.removeEventListener('keydown', event => handleChangeSlideIndexWithKey(event))
        }
    }, [])

    const renderCurrentSlide = (curentSlideIndex: number) => {
        const currentSlide = slideList[curentSlideIndex]
        return (
            <div className={styles.slideShow}>
                <div className={styles.controls}>
                    <div className={styles.controls__previous_slide} onClick={() => changeSlideIndex('previous')} />
                    <div className={styles.controls__next_slide} onClick={() => changeSlideIndex('next')} />
                </div>

                <div
                    className={styles.slide}
                    style={{
                        transform: `scale(${scale})`
                    }}
                >
                    {currentSlide ? (
                        <Slide slide={currentSlide} scale={scale} showSelection={false} />
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        )
    }

    return (
        <>
            {renderCurrentSlide(curentSlideIndex)}
        </>
    )
}

export { SlideShow }