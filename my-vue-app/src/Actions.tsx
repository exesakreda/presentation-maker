import React from "react"
import { Title } from "./Title"
import { SlideList } from "./SlideList"

import { Slide } from "../../types"

import styles from './Actions.module.css'

type ActionsProps = {
    slides: Slide[],
    selectedSlides: string[]
}

function Actions(props: ActionsProps) {
    return(
        <div className={styles.actionbar}>
            <div className={styles.actionbar__menu}>
                <img src="/src/assets/menu.svg" alt="menu"/>
            </div>

            <div className={styles.actionbar__title}>
                <Title />
            </div>
            
            <div className={styles.divider} /> 

            <div className={styles.actionbar__newslide}>
                <div className={styles.newslide__text}>Новый слайд</div>
                <img src="/src/assets/plus.svg" alt="" />
            </div>
            
            <div className={styles.divider} /> 

            <SlideList slides={props.slides} selectedSlides={props.selectedSlides}/>
        </div>
    )
}

export { Actions }