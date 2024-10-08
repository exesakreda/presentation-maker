import { SlideList } from "./SlideList"

import { Presentation } from "../../../types"

import styles from './Actions.module.css'

type ActionsProps = {
    presentation: Presentation
}

function Actions(props: ActionsProps) {
    const slides = props.presentation.slideList
    const selectedSlides = props.presentation.selectedSlides

    return(
        <div className={styles.actionbar}>
            <div className={styles.actionbar__menu}>
                <img src="/src/assets/menu.svg" alt="menu"/>
            </div>

            <div className={styles.actionbar__title}>
                <div className={styles.title}>{props.presentation.title}</div>
            </div>
            
            <div className={styles.divider} /> 

            <div className={styles.actionbar__newslide}>
                <div className={styles.newslide__text}>Новый слайд</div>
                <img src="/src/assets/plus.svg" alt="" />
            </div>
            
            <div className={styles.divider} /> 

            <SlideList slides={slides} selectedSlides={selectedSlides}/>
        </div>
    )
}

export { Actions }