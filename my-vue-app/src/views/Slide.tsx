import React, { useEffect, useState, useRef, MouseEvent } from "react"
import { useDragAndDropToMoveObjects } from "../services/useDragAndDropToMoveObjects"
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
    const [selectedObjects, setSelectedObjects] = useState<string[]>([])

    useEffect(() => {
        document.querySelectorAll('input').forEach(input => resizeInput(input as HTMLInputElement))

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key == 'Delete') {
                setSelectedObjects((prevSelectedObjects) => {
                    if (prevSelectedObjects.length > 0) {
                        dispatch(deleteObject, {
                            slideId: slide.id,
                            objectsToDelete: prevSelectedObjects
                        })
                    }
                    return []
                })
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [slide.id])

    const handleObjectSelect = (e: MouseEvent<HTMLDivElement | HTMLInputElement | HTMLImageElement>) => {
        const target = e.currentTarget as HTMLElement
        if (!target || !target.id) return

        if (e.ctrlKey) {
            if (selectedObjects.includes(target.id)) {
                const newSelectedObjects = selectedObjects.filter(obj => obj !== target.id)
                setSelectedObjects(newSelectedObjects)
            } else {
                setSelectedObjects([...selectedObjects, target.id])
            }
        } else {
            setSelectedObjects([target.id]);
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

        const dragData = {
            slideId: slide.id,
            objId: obj.id
        }
        useDragAndDropToMoveObjects(ref, setPos, dragData)

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
                        onMouseDown={handleObjectSelect}
                    />
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
                            width: `${obj.size.w}px`,
                            height: `${obj.size.h}px`
                        }}
                        onMouseDown={handleObjectSelect}
                    />
                )

            // сделать выпадающее меню с выбором способа вставки картинки (как в google slides)
        }
    })

    const backgroundValue = slide.background.type == 'color' ? String(slide.background.value) : ''

    return (
        <div className={styles.slide} style={{ transform: `scale(${scale})`, backgroundColor: backgroundValue }} id='slide'>
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