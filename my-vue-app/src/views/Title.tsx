import { EditorType } from "../services/EditorType"
import styles from './Title.module.css'
import { dispatch } from "../services/editor"
import { setTitle } from "../services/editorFunctions"


type TitleProps = {
    editor: EditorType
}

import { useRef, useEffect } from 'react';

function Title({ editor }: TitleProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const getTextWidth = (text: string, font: string) => {
        const canvas = document.createElement('canvas'); // Используем canvas для точного расчета
        const context = canvas.getContext('2d');
        if (context) {
            context.font = font;
            return context.measureText(text).width; // Получаем ширину текста
        }
        return 0;
    };
    const resizeInput = () => {
        const input = inputRef.current;
        if (input) {
            const font = window.getComputedStyle(input).font; // Получаем текущий шрифт
            const textWidth = getTextWidth(input.value || input.placeholder, font); // Рассчитываем ширину текста
            input.style.width = `${textWidth + 5}px`; // Устанавливаем новую ширину с небольшим отступом
        }
    };
    useEffect(() => {
        resizeInput();
    }, []);


    const onTitleChange: React.ChangeEventHandler = (event) => {
        if ((event.target as HTMLInputElement).value) {
            dispatch(setTitle, (event.target as HTMLInputElement).value)
        } else {
            dispatch(setTitle, 'Новая презентация')
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
                onInput={resizeInput}
                maxLength={100}
            />
        </div>
    );
}

export {
    Title
}