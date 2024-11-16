import React, { useEffect, useState, useRef, MouseEvent } from "react"
import { useDragAndDrop } from "../services/useDragAndDrop"
import type { Slide } from "../../../types"
import styles from './Slide.module.css'
import { resizeInput } from "../services/resizeInput"
import { dispatch } from "../services/editor"
import { setTextAreaValue, deleteObject } from "../services/editorFunctions"
type SlideProps = {
    slide: Slide,
    scale: number,
}

function Slide({ slide, scale }: SlideProps) {
    useEffect(() => {
        document.querySelectorAll('input').forEach(input => resizeInput(input as HTMLInputElement))
        document.addEventListener('keydown', (event) => {
            if (event.key == 'Delete' && selectedObjects.length > 0) {
                const objectsToDelete = [...selectedObjects]
                dispatch(deleteObject, {
                    slideId: slide.id,
                    objectsToDelete: objectsToDelete
                })
                setSelectedObjects([])
                console.log(selectedObjects)
            }
        })
    }, [slide])

    const [selectedObjects, setSelectedObjects] = useState<string[]>([])

    const handleObjectSelect = (e: MouseEvent) => {
        if (e.ctrlKey) {
            setSelectedObjects([...selectedObjects, e.currentTarget.id])
        } else {
            setSelectedObjects([e.currentTarget.id])
        }
    }

    const onTextAreaChange: React.ChangeEventHandler = (e) => {
        dispatch(setTextAreaValue, {
            newValue: (e.target as HTMLInputElement).value,
            objId: (e.target as HTMLInputElement).id,
            slideId: slide.id
        })
    }

    const slideObjects = slide.objects.map(obj => {
        const inputRef = useRef<HTMLInputElement>(null)
        const imageRef = useRef<HTMLImageElement>(null)

        let ref
        obj.type == 'text' ? ref = inputRef : ref = imageRef

        const [pos, setPos] = useState(obj.position)

        useDragAndDrop(ref, setPos)

        switch (obj.type) {
            case 'text':
                return (
                    <input
                        key={obj.id}
                        ref={inputRef}
                        id={obj.id}
                        type="text"
                        className={`${styles.textArea} ${selectedObjects.includes(obj.id) ? styles.selectedObject : ''}`}
                        style={{
                            left: `${pos.x}px`,
                            top: `${pos.y}px`,
                            width: `${obj.size.w}px`,
                            height: `${obj.size.h}px`
                        }}
                        defaultValue={obj.value}
                        onBlur={onTextAreaChange}
                        onInput={(event) => resizeInput(event.target as HTMLInputElement)}
                        onMouseDown={(event) => handleObjectSelect(event)}
                    >
                    </input>
                )

            case 'image':
                return (
                    <img
                        key={obj.id}
                        ref={imageRef}
                        id={obj.id}
                        src={obj.src}
                        className={`${styles.imageArea} ${selectedObjects.includes(obj.id) ? styles.selectedObject : ''}`}
                        style={{
                            left: `${pos.x}px`,
                            top: `${pos.y}px`,
                            width: 'auto',
                            height: 'auto'
                        }}
                        onMouseDown={(event) => handleObjectSelect(event)}
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
                style={{ backgroundColor: backgroundValue }}
                onMouseDown={() => setSelectedObjects([])}
            >
            </div>
        </div>
    )
}

export { Slide }