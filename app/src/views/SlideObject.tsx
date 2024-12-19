import React, { useRef, useState, MouseEvent } from "react"
import { useMoveObjects } from "../services/hooks/useMoveObjects"
import styles from '../assets/styles/Slide.module.css'
import { TextArea, ImageArea } from "../../../types"
import { useResizeObjects } from "../services/hooks/useResizeObjects"

import { RootState } from "../store/reducers/rootReducer"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedObjects } from "../store/actions/selectionActions"
import { setTextAreaValue } from "../store/actions/presentationActions"

type SlideObjectProps = {
    obj: TextArea | ImageArea,
    slideId: string,
    scale: number,
    showSelection: boolean
}

function SlideObject({ obj, slideId, scale, showSelection }: SlideObjectProps) {
    const selectedObjects = useSelector((state: RootState) => state.selection.objects)
    const dispatch = useDispatch()

    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)

    const ref = obj.type == 'text' ? textAreaRef : imageRef

    const [pos, setPos] = useState(obj.position)

    const [size, setSize] = useState(obj.size)
    const [isResizing, setIsResizing] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const isSelected = selectedObjects.includes(obj.id)

    const handleStartEditing = () => {
        if (textAreaRef.current) {
            textAreaRef.current.focus()
            setIsEditing(true)
        }
    }

    const handleFinishEditing = () => {
        setIsEditing(false)
    }

    useMoveObjects({
        ref: ref,
        setPos: setPos,
        slideId: slideId,
        objId: obj.id,
        objType: obj.type,
        scale: scale,
        isResizing: isResizing,
        isDragging: isDragging,
        setIsDragging: setIsDragging,
        isEditing: isEditing
    })

    const handleObjectSelect = (e: MouseEvent<HTMLDivElement | HTMLInputElement | HTMLImageElement>) => {
        const target = e.currentTarget as HTMLElement
        if (!target || !target.id) return

        if (e.ctrlKey) {
            if (selectedObjects.includes(target.id)) {
                const newSelectedObjects = selectedObjects.filter(objId => objId !== target.id)
                dispatch(setSelectedObjects(newSelectedObjects))
            } else {
                dispatch(setSelectedObjects([...selectedObjects, target.id]))
            }
        } else {
            dispatch(setSelectedObjects([target.id]))
        }
    }

    const onTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        dispatch(setTextAreaValue(slideId, obj.id, e.currentTarget.value))
    }

    const TopLeftRH = () => {
        const resizeRef = useRef<HTMLDivElement>(null)
        useResizeObjects({
            anchorPoint: 'topleft',
            ref: resizeRef,
            size: size,
            setSize: setSize,
            slideId: slideId,
            objId: obj.id,
            scale: scale,
            isResizing: isResizing,
            setIsResizing: setIsResizing,
            pos: pos,
            setPos: setPos,
            aspectRatio: obj.type == 'image' ? obj.aspectRatio : 1
        })

        return (
            <div
                ref={resizeRef}
                className={`${styles.resizeHandle}`}
                style={{ top: '-6px', left: '-6.5px', cursor: 'nw-resize' }}
            />
        )
    }

    const TopRightRH = () => {
        const resizeRef = useRef<HTMLDivElement>(null)
        useResizeObjects({
            anchorPoint: 'topright',
            ref: resizeRef,
            size: size,
            setSize: setSize,
            slideId: slideId,
            objId: obj.id,
            scale: scale,
            isResizing: isResizing,
            setIsResizing: setIsResizing,
            pos: pos,
            setPos: setPos,
            aspectRatio: obj.type == 'image' ? obj.aspectRatio : 1
        })

        return (
            <div
                ref={resizeRef}
                className={`${styles.resizeHandle}`}
                style={{ top: '-6px', left: 'calc(100% - 5px)', cursor: 'ne-resize' }}
            />
        )
    }

    const BotLeftRH = () => {
        const resizeRef = useRef<HTMLDivElement>(null)
        useResizeObjects({
            anchorPoint: 'botleft',
            ref: resizeRef,
            size: size,
            setSize: setSize,
            slideId: slideId,
            objId: obj.id,
            scale: scale,
            isResizing: isResizing,
            setIsResizing: setIsResizing,
            pos: pos,
            setPos: setPos,
            aspectRatio: obj.type == 'image' ? obj.aspectRatio : 1
        })

        return (
            <div
                ref={resizeRef}
                className={`${styles.resizeHandle}`}
                style={{ top: 'calc(100% - 5.5px)', left: '-6.5px', cursor: 'sw-resize' }}
            />
        )
    }

    const BotRightRH = () => {
        const resizeRef = useRef<HTMLDivElement>(null)
        useResizeObjects({
            anchorPoint: 'botright',
            ref: resizeRef,
            size: size,
            setSize: setSize,
            slideId: slideId,
            objId: obj.id,
            scale: scale,
            isResizing: isResizing,
            setIsResizing: setIsResizing,
            pos: pos,
            setPos: setPos,
            aspectRatio: obj.type == 'image' ? obj.aspectRatio : 1
        })

        return (
            <div
                ref={resizeRef}
                className={`${styles.resizeHandle}`}
                style={{ top: 'calc(100% - 5.5px)', left: 'calc(100% - 5px)', cursor: 'se-resize' }}
            />
        )
    }

    const TopHorizontalRH = () => {
        const resizeRef = useRef<HTMLDivElement>(null)
        useResizeObjects({
            anchorPoint: 'top',
            ref: resizeRef,
            size: size,
            setSize: setSize,
            slideId: slideId,
            objId: obj.id,
            scale: scale,
            isResizing: isResizing,
            setIsResizing: setIsResizing,
            pos: pos,
            setPos: setPos,
            aspectRatio: obj.type == 'image' ? obj.aspectRatio : 1
        })

        return (
            <div
                ref={resizeRef}
                className={`${styles.horizontalRH}`}
                style={{ top: '-10px', cursor: 'n-resize' }}
            />
        )
    }

    const BotHorizontalRH = () => {
        const resizeRef = useRef<HTMLDivElement>(null)
        useResizeObjects({
            anchorPoint: 'bot',
            ref: resizeRef,
            size: size,
            setSize: setSize,
            slideId: slideId,
            objId: obj.id,
            scale: scale,
            isResizing: isResizing,
            setIsResizing: setIsResizing,
            pos: pos,
            setPos: setPos,
            aspectRatio: obj.type == 'image' ? obj.aspectRatio : 1
        })

        return (
            <div
                ref={resizeRef}
                className={`${styles.horizontalRH}`}
                style={{ top: 'calc(100% - 10px)', cursor: 'n-resize' }}
            />
        )
    }

    const LetftVerticalRH = () => {
        const resizeRef = useRef<HTMLDivElement>(null)
        useResizeObjects({
            anchorPoint: 'left',
            ref: resizeRef,
            size: size,
            setSize: setSize,
            slideId: slideId,
            objId: obj.id,
            scale: scale,
            isResizing: isResizing,
            setIsResizing: setIsResizing,
            pos: pos,
            setPos: setPos,
            aspectRatio: obj.type == 'image' ? obj.aspectRatio : 1
        })

        return (
            <div
                ref={resizeRef}
                className={`${styles.verticalRH}`}
                style={{ top: '-10px', left: '-10px', cursor: 'e-resize' }}
            />
        )
    }

    const RightVerticalRH = () => {
        const resizeRef = useRef<HTMLDivElement>(null)
        useResizeObjects({
            anchorPoint: 'right',
            ref: resizeRef,
            size: size,
            setSize: setSize,
            slideId: slideId,
            objId: obj.id,
            scale: scale,
            isResizing: isResizing,
            setIsResizing: setIsResizing,
            pos: pos,
            setPos: setPos,
            aspectRatio: obj.type == 'image' ? obj.aspectRatio : 1
        })

        return (
            <div
                ref={resizeRef}
                className={`${styles.verticalRH}`}
                style={{ top: '-10px', left: 'calc(100% - 10px)', cursor: 'e-resize' }}
            />
        )
    }


    switch (obj.type) {
        case 'text':
            return (
                <div
                    id={obj.id}
                    key={obj.id}
                    className={`${styles.slideObject} ${(selectedObjects?.includes(obj.id) && showSelection) ? styles.selectedObject : ''}`}
                    style={{
                        left: `${pos.x}px`,
                        top: `${pos.y}px`,
                        width: `${size.w}px`,
                        height: `${size.h}px`,
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
                            display: (isSelected && !isEditing && showSelection) ? 'block' : 'none'
                        }}
                    >
                        {TopLeftRH()}
                        {TopRightRH()}
                        {BotLeftRH()}
                        {BotRightRH()}
                        {TopHorizontalRH()}
                        {BotHorizontalRH()}
                        {LetftVerticalRH()}
                        {RightVerticalRH()}
                    </div>
                    <textarea
                        ref={textAreaRef}
                        className={styles.textArea}
                        defaultValue={obj.value}
                        onDoubleClick={handleStartEditing}
                        onBlur={(e) => {
                            onTextAreaChange(e)
                            handleFinishEditing()
                        }}
                        style={{
                            border: isSelected ? 'none' : '1px solid #59595950',
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
                    id={obj.id}
                    key={obj.id}
                    ref={imageRef}
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
                        {TopLeftRH()}
                        {TopRightRH()}
                        {BotLeftRH()}
                        {BotRightRH()}
                        {TopHorizontalRH()}
                        {BotHorizontalRH()}
                        {LetftVerticalRH()}
                        {RightVerticalRH()}
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
