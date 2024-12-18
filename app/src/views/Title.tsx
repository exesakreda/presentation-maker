import styles from '../assets/styles/Title.module.css'
import { resizeInput } from "../services/hooks/resizeInput"

import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/reducers/rootReducer'
import { setTitle } from '../store/actions/presentationActions'

function Title() {
    const {
        title,
    } = useSelector((state: RootState) => state.presentation)
    const dispatch = useDispatch()

    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        resizeInput(inputRef.current!)
        document.title = title
    }, [title])

    const onTitleChange: React.ChangeEventHandler = (event) => {
        if ((event.target as HTMLInputElement).value) {
            dispatch(setTitle((event.target as HTMLInputElement).value))
        } else {
            dispatch(setTitle('Презентация без названия'))
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
                    defaultValue={title}
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