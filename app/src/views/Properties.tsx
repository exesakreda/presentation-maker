import styles from '../assets/styles/Properties.module.css'
import { Background } from '../../../types'
import { resizeInput } from '../services/resizeInput'
import { useEffect, useRef } from 'react'

import { RootState } from '../store/reducers/rootReducer'
import { useDispatch, useSelector } from 'react-redux'
import { changeBackground } from '../store/actions/presentationActions'

function Properties() {
    const slideList = useSelector((state: RootState) => state.presentation.slideList)
    const selectedSlides = useSelector((state: RootState) => state.selection.slides)
    const dispatch = useDispatch()

    const currentSlide = slideList.find(slide => slide.id == selectedSlides[selectedSlides.length - 1])
    const currentSlideId = currentSlide ? currentSlide.id : '0'

    function isValidColor(value: string) {
        const pattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
        return pattern.test(value)
    }

    const backgroundValue = currentSlide?.background.type === 'color' && currentSlide.background.value
        ? currentSlide.background.value.slice(1)
        : ''

    const onColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newBackground: Background = { type: 'color', value: String(event.target.value) }

        dispatch(changeBackground(currentSlideId, newBackground))
    }

    const onColorTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newBackground: Background

        const newValue: string = '#' + event.target.value

        if (isValidColor(newValue)) {
            newBackground = { type: 'color', value: newValue }
        } else {
            newBackground = { type: 'color', value: '#FFFFFF' }
        }

        dispatch(changeBackground(currentSlideId, newBackground))
    }

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        resizeInput(inputRef.current!);
    }, []);

    return (
        <div className={styles.properties} id="properties">
            <div className={styles.slideid}>
                <p>Слайд id: {currentSlideId}</p>
            </div>

            <div className={styles.divider} />

            <div className={styles.backgroudSettings}>
                <div className={styles.backgroudSettings__title}>Фон</div>
                <div className={styles.backgroudSettings__bgType}>
                    <div className={styles.bgType__color}>
                        <img src="src/assets/images/color.svg" alt="" />
                    </div>
                    <div className={styles.bgType__image}>
                        <img src="src/assets/images/image2.svg" alt="" />
                    </div>
                </div>

                <div className={styles.backgroudSettings__colorField}>
                    <div className={styles.color__container}>
                        <input type='color' className={styles.currentColor} onBlur={onColorChange} defaultValue={`#${backgroundValue}`} />
                    </div>

                    <input
                        ref={inputRef}
                        type="text"
                        className={styles.currentColorText}
                        defaultValue={backgroundValue.toUpperCase()}
                        placeholder='FFFFFF'
                        onBlur={onColorTextChange}
                        onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                            event.target.value = event.target.value.toUpperCase()
                            resizeInput(event.target as HTMLInputElement)
                        }}
                        maxLength={6}
                    />
                </div>
            </div>
        </div>
    )
}


export { Properties } 