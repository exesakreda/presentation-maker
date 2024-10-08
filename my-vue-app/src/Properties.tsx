import React from "react"

import styles from './Properties.module.css'
import { Slide } from "../../types"

type PropertiesProps = {
    slide: Slide
}

function Properties(props: PropertiesProps) {
    const slide = props.slide

    return (
        <div className={styles.properties}>
            <div className={styles.slideid}>
                <p>Слайд {slide.id}</p>
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
                    <img src="src/assets/arrow-down.svg" alt="" className={styles.colorField__arrow}/>
                </div>
            </div>
        </div>
    )
}

export { Properties } 