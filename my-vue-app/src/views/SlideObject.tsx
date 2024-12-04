import React, { useRef, useState, MouseEvent } from "react"
import { useDragAndDropToMoveObjects } from "../services/useDragAndDropToMoveObjects"
import { resizeInput } from "../services/resizeInput"
import { dispatch } from "../services/editor"
import { setTextAreaValue } from "../services/editorFunctions"
import styles from './Slide.module.css'
import { TextArea, ImageArea } from "../../../types"
import { useDragAndDropToResizeObjectsLT } from "../services/useDragAndDropToResizeObjectsLeftTop"
import { useDragAndDropToResizeObjectsRT } from "../services/useDragAndDropToResizeObjectsRightTop"
import { useDragAndDropToResizeObjectsLB } from "../services/useDragAndDropToResizeObjectsLeftBot"
import { useDragAndDropToResizeObjectsRB } from "../services/useDragAndDropToResizeObjectsRightBot"
import { useDragAndDropToResizeObjectsTop } from "../services/useDragAndDropToResizeObjectsTop"
import { useDragAndDropToResizeObjectsBot } from "../services/useDragAndDropToResizeObjectsBot"
import { useDragAndDropToResizeObjectsLeft } from "../services/useDragAndDropToResizeObjectsLeft"
import { useDragAndDropToResizeObjectsRight } from "../services/useDragAndDropToResizeObjectsRight"

type SlideObjectProps = {
    obj: TextArea | ImageArea,
    slideId: string
    selectedObjects: string[]
    setSelectedObjects: (objects: string[]) => void
    scale: number,
    showSelection: boolean
}

function SlideObject({ obj, slideId, selectedObjects, setSelectedObjects, scale, showSelection }: SlideObjectProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)

    let ref
    obj.type == 'text' ? ref = inputRef : ref = imageRef

    const [pos, setPos] = useState(obj.position)

    const [size, setSize] = useState(obj.size)
    const [isResizing, setIsResizing] = useState(false)
    const [isDragging, setIsDragging] = useState(false)

    const isSelected = selectedObjects.includes(obj.id)

    useDragAndDropToMoveObjects({
        ref: ref,
        setPos: setPos,
        slideId: slideId,
        objId: obj.id,
        scale: scale,
        setSelectedObjects: setSelectedObjects,
        isResizing: isResizing,
        isDragging: isDragging,
        setIsDragging: setIsDragging
    })


    const handleObjectSelect = (e: MouseEvent<HTMLDivElement | HTMLInputElement | HTMLImageElement>) => {
        const target = e.currentTarget as HTMLElement
        if (!target || !target.id) return

        if (e.ctrlKey) {
            if (selectedObjects.includes(target.id)) {
                const newSelectedObjects = selectedObjects.filter(objId => objId !== target.id)
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

    const topLeftRH = () => {
        const resizeRef = useRef<HTMLDivElement>(null)
        useDragAndDropToResizeObjectsLT({
            ref: resizeRef,
            size: size,
            setSize: setSize,
            slideId: slideId,
            objId: obj.id,
            scale: scale,
            setSelectedObjects: setSelectedObjects,
            isResizing: isResizing,
            setIsResizing: setIsResizing
        })

        return (
            <div
                ref={resizeRef}
                className={`${styles.resizeHandle}`}
                style={{ top: '-6px', left: '-6.5px', cursor: 'nw-resize' }}
            />
        )
    }

    const topRightRH = () => {
        const resizeRef = useRef<HTMLDivElement>(null)
        useDragAndDropToResizeObjectsRT({
            ref: resizeRef,
            size: size,
            setSize: setSize,
            slideId: slideId,
            objId: obj.id,
            scale: scale,
            setSelectedObjects: setSelectedObjects,
            isResizing: isResizing,
            setIsResizing: setIsResizing
        })

        return (
            <div
                ref={resizeRef}
                className={`${styles.resizeHandle}`}
                style={{ top: '-6px', left: 'calc(100% - 5px)', cursor: 'ne-resize' }}
            />
        )
    }

    const botLeftRH = () => {
        const resizeRef = useRef<HTMLDivElement>(null)
        useDragAndDropToResizeObjectsLB({
            ref: resizeRef,
            size: size,
            setSize: setSize,
            slideId: slideId,
            objId: obj.id,
            scale: scale,
            setSelectedObjects: setSelectedObjects,
            isResizing: isResizing,
            setIsResizing: setIsResizing
        })

        return (
            <div
                ref={resizeRef}
                className={`${styles.resizeHandle}`}
                style={{ top: 'calc(100% - 5.5px)', left: '-6.5px', cursor: 'sw-resize' }}
            />
        )
    }

    const botRightRH = () => {
        const resizeRef = useRef<HTMLDivElement>(null)
        useDragAndDropToResizeObjectsRB({
            ref: resizeRef,
            size: size,
            setSize: setSize,
            slideId: slideId,
            objId: obj.id,
            scale: scale,
            setSelectedObjects: setSelectedObjects,
            isResizing: isResizing,
            setIsResizing: setIsResizing
        })

        return (
            <div
                ref={resizeRef}
                className={`${styles.resizeHandle}`}
                style={{ top: 'calc(100% - 5.5px)', left: 'calc(100% - 5px)', cursor: 'se-resize' }}
            />
        )
    }

    const topHorizontalRH = () => {
        const resizeRef = useRef<HTMLDivElement>(null)
        useDragAndDropToResizeObjectsTop({
            ref: resizeRef,
            size: size,
            setSize: setSize,
            slideId: slideId,
            objId: obj.id,
            scale: scale,
            setSelectedObjects: setSelectedObjects,
            isResizing: isResizing,
            setIsResizing: setIsResizing
        })

        return (
            <div
                ref={resizeRef}
                className={`${styles.horizontalRH}`}
                style={{ top: '-2px', cursor: 'n-resize' }}
            />
        )
    }

    const botHorizontalRH = () => {
        const resizeRef = useRef<HTMLDivElement>(null)
        useDragAndDropToResizeObjectsBot({
            ref: resizeRef,
            size: size,
            setSize: setSize,
            slideId: slideId,
            objId: obj.id,
            scale: scale,
            setSelectedObjects: setSelectedObjects,
            isResizing: isResizing,
            setIsResizing: setIsResizing
        })

        return (
            <div
                ref={resizeRef}
                className={`${styles.horizontalRH}`}
                style={{ top: 'calc(100%)', cursor: 'n-resize' }}
            />
        )
    }

    const letftVerticalRH = () => {
        const resizeRef = useRef<HTMLDivElement>(null)
        useDragAndDropToResizeObjectsLeft({
            ref: resizeRef,
            size: size,
            setSize: setSize,
            slideId: slideId,
            objId: obj.id,
            scale: scale,
            setSelectedObjects: setSelectedObjects,
            isResizing: isResizing,
            setIsResizing: setIsResizing
        })

        return (
            <div
                ref={resizeRef}
                className={`${styles.verticalRH}`}
                style={{ top: '0px', left: '-2px', cursor: 'e-resize' }}
            />
        )
    }

    const rightVerticalRH = () => {
        const resizeRef = useRef<HTMLDivElement>(null)
        useDragAndDropToResizeObjectsRight({
            ref: resizeRef,
            size: size,
            setSize: setSize,
            slideId: slideId,
            objId: obj.id,
            scale: scale,
            setSelectedObjects: setSelectedObjects,
            isResizing: isResizing,
            setIsResizing: setIsResizing
        })

        return (
            <div
                ref={resizeRef}
                className={`${styles.verticalRH}`}
                style={{ top: '0px', left: '100%', cursor: 'e-resize' }}
            />
        )
    }

    switch (obj.type) {
        case 'text':
            return (
                <div
                    key={obj.id}
                    ref={inputRef}
                    id={obj.id}
                    className={`${styles.slideObject} ${(selectedObjects?.includes(obj.id) && showSelection) ? styles.selectedObject : ''}`}
                    style={{
                        left: `${pos.x}px`,
                        top: `${pos.y}px`,
                        width: `${obj.size.w}px`,
                        height: `${obj.size.h}px`,
                    }}
                    onMouseDown={handleObjectSelect}
                >
                    <div
                        className={styles.resizeHandles}
                        style={{
                            display: isSelected ? 'block' : 'none'
                        }}
                    >
                        {topLeftRH()}
                        {topRightRH()}
                        {botLeftRH()}
                        {botRightRH()}
                        {topHorizontalRH()}
                        {botHorizontalRH()}
                        {letftVerticalRH()}
                        {rightVerticalRH()}
                    </div>
                    <textarea
                        className={styles.textArea}
                        defaultValue={obj.value}
                        onBlur={onTextAreaChange}
                        onInput={(event) => resizeInput(event.target as HTMLInputElement)}
                        style={{
                            border: isSelected ? 'none' : '1px solid #59595975',
                            fontSize: `${obj.textSize}px`,
                            fontFamily: obj.fontFamily,
                            fontWeight: obj.fontWeight
                        }}
                    />
                </div>
            )

        case 'image':
            return (
                <div
                    key={obj.id}
                    ref={imageRef}
                    id={obj.id}
                    className={`${styles.slideObject} ${styles.imageArea} ${(selectedObjects?.includes(obj.id) && showSelection) ? styles.selectedObject : ''}`}
                    style={{
                        left: `${pos.x}px`,
                        top: `${pos.y}px`,
                        width: `${size.w}px`,
                        height: `${size.h}px`
                    }}
                    onMouseDown={(e: MouseEvent<HTMLDivElement>) => {
                        if (!isDragging) {
                            handleObjectSelect(e)
                        }
                    }}
                >
                    <div
                        className={styles.resizeHandles}
                        style={{
                            display: (isSelected && showSelection) ? 'block' : 'none'
                        }}
                    >
                        {topLeftRH()}
                        {topRightRH()}
                        {botLeftRH()}
                        {botRightRH()}
                        {topHorizontalRH()}
                        {botHorizontalRH()}
                        {letftVerticalRH()}
                        {rightVerticalRH()}
                    </div>
                    <img
                        src={obj.src}
                        width={`${size.w}px`}
                        height={`${size.h}px`}
                    />
                </div>
            )

        default:
            return null
    }
}

export { SlideObject }
