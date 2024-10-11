import { SlideList } from "./SlideList"

import { Presentation } from "../../../types"

import styles from './Actions.module.css'

import { dispatch } from '../services/editor.ts'
import { setTitle, addSlide } from '../services/editorFunctions.ts'

type ActionsProps = {
    presentation: Presentation,
}

function Actions(props: ActionsProps, { editor }) {
    function onTextClick() {
        dispatch(setTitle, "New Title")
    }
     
    function onButtonClick() {
        dispatch(
            addSlide,
            {
                id: '11',
                background: { type: 'color', value: '#F7F7F7' },
                objects: [],
                selectedObjects: [],
            },
        )

    }

    return(
        <div className={styles.actionbar}>
            <div className={styles.actionbar__menu}>
                <img src="/src/assets/menu.svg" alt="menu"/>
            </div>

            <div className={styles.actionbar__title} onClick={onTextClick}>
                {/* <textarea className={styles.title} defaultValue={props.presentation.title} maxLength={45}/> */}
                <div className={styles.title}>{props.editor.title}</div>
            </div>
            
            <div className={styles.divider} /> 

            <div className={`${styles.actionbar__newslide} ${styles.actionbar__button}`} onClick={onButtonClick}>  /** при выполнении onButtonClick слайд добавляется в editor.slidelist, а отрисовывается presentation.slidelist */
                <div className={`${styles.button__text} ${styles.newslidebutton__text}`}>Новый слайд</div>
                <img src="/src/assets/plus.svg" alt="" />
            </div>

            <div className={`${styles.actionbar__deleteslide} ${styles.actionbar__button}`}>
                <div className={`${styles.button__text} ${styles.deleteslidebutton__text}`}>Удалить выбранные слайды</div>
                <img src="/src/assets/plus.svg" alt="" />
            </div>
            
            <div className={styles.divider} /> 

            <SlideList presentation={props.presentation} />
        </div>
    )
}

export { Actions }