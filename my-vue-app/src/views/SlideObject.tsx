import React, { useRef, useState, MouseEvent, useEffect } from "react"
import { useDragAndDropToMoveObjects } from "../services/useDragAndDropToMoveObjects"
import { resizeInput } from "../services/resizeInput"
import { dispatch } from "../services/editor"
import { setTextAreaValue } from "../services/editorFunctions"
import styles from './Slide.module.css'
import { TextArea, ImageArea } from "../../../types"

type SlideObjectProps = {
    obj: TextArea | ImageArea,
    slideId: string
    selectedObjects: string[]
    setSelectedObjects: (objects: string[]) => void
    scale: number
}

function SlideObject({ obj, slideId, selectedObjects, setSelectedObjects, scale }: SlideObjectProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)

    let ref
    obj.type == 'text' ? ref = inputRef : ref = imageRef

    const [pos, setPos] = useState(obj.position)
    const isSelected = selectedObjects.includes(obj.id)

    const dragData = {
        ref: ref,
        setPos: setPos, 
        slideId: slideId,
        objId: obj.id,
        scale: scale,
        setSelectedObjects: setSelectedObjects,
    }

    useDragAndDropToMoveObjects(dragData)
    useEffect(() => {
        setSelectedObjects([obj.id])
    }, [pos])


    const handleObjectSelect = (e: MouseEvent<HTMLDivElement | HTMLInputElement | HTMLImageElement>) => {
        const target = e.currentTarget as HTMLElement
        if (!target || !target.id) return

        if (e.ctrlKey) {
            if (selectedObjects?.includes(target.id)) {
                const newSelectedObjects = selectedObjects.filter(obj => obj !== target.id)
                setSelectedObjects(newSelectedObjects)
            } else {
                setSelectedObjects([...selectedObjects, target.id])
            }
        } else {
            setSelectedObjects([target.id])
        }
    }

    const onTextAreaChange: React.ChangeEventHandler = (e) => {
        dispatch(setTextAreaValue, {
            newValue: (e.target as HTMLInputElement).value,
            objId: (e.target as HTMLInputElement).id,
            slideId: slideId
        })
    }

    switch (obj.type) {
        case 'text':
            return (
                <input
                    key={obj.id}
                    ref={inputRef}
                    id={obj.id}
                    type="text"
                    className={`${styles.textArea} ${selectedObjects?.includes(obj.id) ? styles.selectedObject : ''}`}
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
                <div
                    key={obj.id}
                    ref={imageRef}
                    id={obj.id}
                    className={`${styles.slideObject} ${styles.imageArea} ${selectedObjects?.includes(obj.id) ? styles.selectedObject : ''}`}
                    style={{
                        left: `${pos.x}px`,
                        top: `${pos.y}px`,
                        width: `${obj.size.w}px`,
                        height: `${obj.size.h}px`
                    }}
                    onMouseDown={handleObjectSelect}
                >
                    <div
                        className={styles.resizeHandles}
                        style={{
                            display: isSelected ? 'block' : 'none'
                        }}
                    >
                        <div className={`${styles.topLeftRH} ${styles.resizeHandle}`} style={{ top: '-6px', left: '-6.5px' }} />
                        <div className={`${styles.topRightRH} ${styles.resizeHandle}`} style={{ top: '-6px', left: 'calc(100% - 5px)' }} />
                        <div className={`${styles.botLeftRH} ${styles.resizeHandle}`} style={{ top: 'calc(100% - 5.5px)', left: '-6.5px' }} />
                        <div className={`${styles.botRightRH} ${styles.resizeHandle}`} style={{ top: 'calc(100% - 5.5px)', left: 'calc(100% - 5px)' }} />
                    </div>
                    <img
                        src={obj.src}
                    />
                </div>
            )

        default:
            return null
    }
}

export { SlideObject }
