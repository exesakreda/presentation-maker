import type { Slide } from "../../../types"
import styles from './Slide.module.css'
import { resizeInput } from "../services/resizeInput"
import { useEffect } from "react"
import { dispatch } from "../services/editor"
import { setTextAreaValue, setObjectSelection, deleteObject } from "../services/editorFunctions"

type SlideProps = {
    slide: Slide,
    scale: number,
}

function Slide({ slide, scale }: SlideProps) {
    useEffect(() => {
        document.querySelectorAll('input').forEach(input => resizeInput(input as HTMLInputElement));
    }, [slide]);

    const onTextAreaChange: React.ChangeEventHandler = (event) => {
        dispatch(setTextAreaValue, (event.target as HTMLInputElement).value, (event.target as HTMLInputElement).id, slide.id)
    }

    function onObjectClick(e: React.MouseEvent, objId: string) {
        if (e.ctrlKey) {
            if (slide.selectedObjects.includes(objId)) {
                dispatch(setObjectSelection, slide.id, slide.selectedObjects.filter(id => id !== objId))
            } else {
                dispatch(setObjectSelection, slide.id, [...slide.selectedObjects, objId])
            }
        } else {
            dispatch(setObjectSelection, slide.id, [e.currentTarget.id])
        }        
    }

    function onBlankAreaClick() {
        dispatch(setObjectSelection, slide.id, [])
    }

    document.addEventListener('keydown', (event) => {
        if (event.key == 'Delete' && slide.selectedObjects.length > 0) {
            dispatch(deleteObject, slide.id, slide.selectedObjects)

            slide.selectedObjects = []
        }
    })

    const slideObjects = slide.objects.map(obj => {
        switch (obj.type) {
            case 'text':
                return (
                    <input
                        key={obj.id}
                        id={obj.id}
                        type="text"
                        className={`${styles.textArea} ${slide.selectedObjects.includes(obj.id) ? styles.selectedObject : ''}`}
                        style={{
                            left: `${obj.position.x}px`,
                            top: `${obj.position.y}px`,
                            width: `${obj.size.w}px`,
                            height: `${obj.size.h}px`
                        }}
                        defaultValue={obj.value}
                        onBlur={onTextAreaChange}
                        onInput={(event) => resizeInput(event.target as HTMLInputElement)}
                        onClick={(event) => onObjectClick(event, obj.id)}
                    >
                    </input>
                )

            case 'image':
                return (
                    <img
                        id={obj.id}
                        key={obj.id}
                        src={obj.src}
                        className={`${styles.imageArea} ${slide.selectedObjects.includes(obj.id)
                            ? styles.selectedObject
                            : ''}`}
                        style={{
                            left: `${obj.position.x}px`,
                            top: `${obj.position.y}px`,
                            width: 'auto',
                            height: 'auto'
                        }}
                        onClick={(event) => onObjectClick(event, obj.id)}
                    >
                    </img>
                )

            // сделать выпадающее меню с выбором способа вставки картинки (как в google slides)
        }
    })

    const backgroundValue = slide.background.type == 'color' ? String(slide.background.value) : ''

    return (
        <div className={styles.slide} style={{ transform: `scale(${scale})`, backgroundColor: backgroundValue }}>
            {slideObjects}

            <div
                id="blankArea"
                className={styles.blankArea}
                onClick={onBlankAreaClick}
                style={{ backgroundColor: backgroundValue }}
            >

            </div>
        </div>
    )
}

export { Slide }