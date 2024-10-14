import { SlideList } from "./SlideList"

import styles from './Actions.module.css'

import { dispatch } from '../services/editor.ts'
import { setTitle, addSlide, removeSlide } from '../services/editorFunctions.ts'
import { EditorType } from "../services/EditorType.ts"
import React from "react"

type ActionsProps = {
    editor: EditorType,
}

function Actions({ editor }: ActionsProps) {     
    function onButtonClick() {
        dispatch(addSlide)
    }

    const onTitleChange: React.ChangeEventHandler = (event) => {
        dispatch(setTitle, (event.target as HTMLInputElement).value)
    }

    function onRemoveSlide() {
        dispatch(removeSlide)
    }

    return(
        <div className={styles.actionbar}>
            <div className={styles.actionbar__menu}>
                <img src="/src/assets/menu.svg" alt="menu"/>
            </div>

            <div className={styles.actionbar__title}>
                {/* <textarea className={styles.title} defaultValue={props.presentation.title} maxLength={45}/> */}
                <input 
                    className={styles.title} 
                    type="text" 
                    defaultValue={editor.presentation.title} 
                    onBlur={onTitleChange} 
                />
            </div>
            
            <div className={styles.divider} /> 

            <button 
                className={`${styles.actionbar__newslide} ${styles.actionbar__button}`} 
                onClick={onButtonClick}
            >  
            {/* при выполнении onButtonClick слайд добавляется в editor.slidelist, а отрисовывается presentation.slidelist   */}
                {/* сделать кнопкой */}
                <div className={`${styles.button__text} ${styles.newslidebutton__text}`}>Новый слайд</div>
                <img src="/src/assets/plus.svg" alt="" />
            </button>
            
            <div className={styles.divider} /> 

            <SlideList editor={editor}/>
        
            <div className={`${styles.actionbar__deleteslide} ${styles.actionbar__button}`}>
                <div className={`${styles.button__text} ${styles.deleteslidebutton__text}`} onClick={onRemoveSlide}>Удалить выбранные слайды</div>
                <img src="/src/assets/minus.svg" alt="" />
            </div>

        </div>
    )
}

export { Actions }