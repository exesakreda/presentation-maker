import { EditorType } from "../services/EditorType"
import styles from './Title.module.css'
import { dispatch } from "../services/editor"
import { setTitle } from "../services/editorFunctions"
import React, { useRef, useEffect } from 'react'
import { resizeInput } from "../services/hooks/resizeInput"

type TitleProps = {
    editor: EditorType
}

function Title({ editor }: TitleProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        resizeInput(inputRef.current!)
        document.title = editor.title
    }, [editor.title])


    const onTitleChange: React.ChangeEventHandler = (event) => {
        if ((event.target as HTMLInputElement).value) {
            dispatch(setTitle, (event.target as HTMLInputElement).value)
        } else {
            dispatch(setTitle, 'Презентация без названия')
        }
    }

    return (
        <>
            <div className={styles.title__container} id='title__container'>
                <input
                    id='title_input'
                    ref={inputRef}
                    className={styles.title}
                    type='text'
                    defaultValue={editor.title}
                    placeholder='Введите название презентации'
                    onBlur={onTitleChange}
                    onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                        resizeInput(event.target as HTMLInputElement)
                    }}
                    maxLength={100}
                />

            </div>
        </>
    )
}

export {
    Title
}