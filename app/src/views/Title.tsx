import styles from '../assets/styles/Title.module.css'
import { resizeInput } from "../services/resizeInput"

import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import createDispatch from '../store/utils/createDispatch'
import { RootState } from '../store/reducers/rootReducer'
import { setTitle } from '../store/actions/presentationActions'
import store from '../store'

function Title() {
    const { title } = useSelector((state: RootState) => state.presentation)
    const dispatch = createDispatch(store)

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