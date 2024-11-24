import styles from './Properties.module.css'
import { EditorType } from '../services/EditorType'
import { dispatch } from '../services/editor'
import { changeBackground } from '../services/editorFunctions'
import { Background } from '../../../types'

import { resizeInput } from '../services/resizeInput'
import { useEffect, useRef } from 'react'

type PropertiesProps = {
    editor: EditorType,
    currentSlideId: string
}

function Properties({ editor, currentSlideId }: PropertiesProps) {
    function isValidColor(value: string) {
        const pattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
        return pattern.test(value)
    }

    const slideIndex = editor.slideList.findIndex(slide => slide.id === currentSlideId)
    const slide = editor.slideList[slideIndex]
    const backgroundValue = slide?.background.type === 'color' && slide.background.value 
        ? slide.background.value.slice(1)
        : ''
    
    const onColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newBackground: Background = { type: 'color', value: String(event.target.value) }
        const newSlideList = editor.slideList.map(slide => {
            if (slide.id == currentSlideId) {
                return {
                    ...slide,
                    background: newBackground
                }
            }
            return slide
        })

        dispatch(changeBackground, newSlideList)
    }

    const onColorTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newBackground: Background

        const newValue:string = '#' + event.target.value
        
        if (isValidColor(newValue)) {
            newBackground = { type: 'color', value: newValue }
        } else {
            newBackground = { type: 'color', value: '#FFFFFF' }
        }

        const newSlideList = editor.slideList.map(slide => {
            if (slide.id == currentSlideId) {
                return {
                    ...slide,
                    background: newBackground
                }
            }
            return slide
        })

        dispatch(changeBackground, newSlideList)
    }

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        resizeInput(inputRef.current!);
    }, []);

    return (
        <div className={styles.properties} id="properties">
            <div className={styles.slideid}>
                <p>Слайд {slideIndex + 1} (id: {currentSlideId})</p>
            </div>

            <div className={styles.divider} />

            <div className={styles.backgroudSettings}>
                <div className={styles.backgroudSettings__title}>Фон</div>
                <div className={styles.backgroudSettings__bgType}>
                    <div className={styles.bgType__color}>
                        <img src="src/assets/color.svg" alt="" />
                    </div>
                    <div className={styles.bgType__image}>
                        <img src="src/assets/image2.svg" alt="" />
                    </div>
                </div>

                <div className={styles.backgroudSettings__colorField}>
                    <div className={styles.color__container}>
                        <input type='color' className={styles.currentColor} onBlur={onColorChange} defaultValue={`#${backgroundValue}`}/>
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
                    {/* <div className={styles.currentColorText}>{backgroundValue}</div> */}
                    {/* <img src="src/assets/arrow-down.svg" alt="" className={styles.colorField__arrow} /> */}
                </div>

                {/* <div className={styles.colorField__colorPicker}>
                
                </div> */}

            </div>

            <div className={styles.export}>
                <div className={styles.export__text}>Export to PDF</div>
            </div>
        </div>
    )
}


export { Properties } 