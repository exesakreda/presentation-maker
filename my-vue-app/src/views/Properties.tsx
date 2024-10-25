import styles from './Properties.module.css'
import { EditorType } from '../services/EditorType'

type PropertiesProps = {
    editor: EditorType
}

function Properties({ editor }: PropertiesProps) {

    const slideId = editor.selection?.selectedSlides[editor.selection?.selectedSlides.length - 1]
    const slideIndex = editor.presentation.slideList.findIndex((slide) => slide.id === slideId)

    return (
        <div className={styles.properties}>
            <div className={styles.slideid}>
                <p>Слайд {slideIndex + 1} (id: {slideId})</p>
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
                    <div className={styles.currentColor} />
                    <div className={styles.currentColorText}>FFFFFF</div>
                    <img src="src/assets/arrow-down.svg" alt="" className={styles.colorField__arrow} />
                </div>


                <div className={styles.colorField__colorPicker}>
                
                </div>

            </div>

            <div className={styles.export}>
                <div className={styles.export__text}>Export to PDF</div>
            </div>
        </div>
    )
}


export { Properties } 