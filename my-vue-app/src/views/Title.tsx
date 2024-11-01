import { EditorType } from "../services/EditorType"
import styles from './Title.module.css'
import { dispatch } from "../services/editor"
import { setTitle } from "../services/editorFunctions"

import { resizeInput } from "../services/resizeInput"

type TitleProps = {
    editor: EditorType
}

import { useRef, useEffect } from 'react';

function Title({ editor }: TitleProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        resizeInput(inputRef.current!)
        document.title = editor.presentation.title
    }, []);


    const onTitleChange: React.ChangeEventHandler = (event) => {
        if ((event.target as HTMLInputElement).value) {
            dispatch(setTitle, (event.target as HTMLInputElement).value)
        } else {
            dispatch(setTitle, 'Презентация без названия')
        }
    };

    return (
        <div className={styles.title__container}>
            <input
                ref={inputRef}
                className={styles.title}
                type="text"
                defaultValue={editor.presentation.title}
                placeholder="Введите название презентации"
                onBlur={onTitleChange}
                onInput={(event) => resizeInput(event.target as HTMLInputElement)}
                maxLength={100}
            />
        </div>
    );
}

export {
    Title
}