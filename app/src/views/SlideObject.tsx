import React, { useRef, useState, MouseEvent, useEffect } from "react"
import { useMoveObjects } from "../services/hooks/useMoveObjects"
import styles from '../assets/styles/Slide.module.css'
import { TextArea, ImageArea, Shape } from "../../../types"
import { useResizeObjects } from "../services/hooks/useResizeObjects"
import { RootState } from "../store/reducers/rootReducer"
import { useSelector } from "react-redux"
import createDispatch from "../store/utils/createDispatch"
import { setSelectedObjects, setTextAreaValue } from "../store/actions/presentationActions"
import store from "../store"

type SlideObjectProps = {
    obj: TextArea | ImageArea | Shape,
    slideId: string,
    scale: number,
    showSelection: boolean
}

function SlideObject({ obj, slideId, scale, showSelection }: SlideObjectProps) {
    const selectedObjects = useSelector((state: RootState) => state.presentation.selection.objects)
    const dispatch = createDispatch(store)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)

    const ref = obj.type == 'text' ? textAreaRef : imageRef

    const [pos, setPos] = useState(obj.position)
    useEffect(() => {
        if (obj?.position) {
            setPos(obj.position)
        }
    }, [obj?.position])

    const [size, setSize] = useState(obj.size)
    useEffect(() => {
        if (obj?.size) {
            setSize(obj.size)
        }
    }, [obj?.size])

    const [localTextareaValue, setLocalTextareaValue] = useState((obj as TextArea).value)
    const textValue = obj.type === 'text' ? (obj as TextArea).value : null
    useEffect(() => {
        if (obj.type === 'text') {
            setLocalTextareaValue((obj as TextArea).value)
        }
    }, [textValue, obj])

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
        setLocalTextareaValue(e.currentTarget.value)
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
                        value={localTextareaValue}
                        onChange={onTextAreaChange}
                        onDoubleClick={handleStartEditing}
                        onBlur={(e) => {
                            dispatch(setTextAreaValue(slideId, obj.id, e.currentTarget.value))
                            handleFinishEditing()
                        }}
                        style={{
                            // border: isSelected ? 'none' : '1px solid #59595950',
                            border: 'none',
                            fontSize: `${obj.font.size}px`,
                            fontFamily: obj.font.fontFamily,
                            fontWeight: obj.font.weight,
                            color: obj.font.color
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

        // case 'shape':
        //     return (
        //         <div
        //             id={obj.id}
        //             key={obj.id}
        //             ref={shapeRef}
        //             className={`${styles.slideObject} ${styles.imageArea} ${(selectedObjects?.includes(obj.id) && showSelection) ? styles.selectedObject : ''}`}
        //             style={{
        //                 left: `${pos.x}px`,
        //                 top: `${pos.y}px`,
        //                 width: `${size.w}px`,
        //                 height: `${size.h}px`
        //             }}
        //             onMouseDown={(e: MouseEvent<HTMLDivElement>) => {
        //                 if (!isDragging) {
        //                     handleObjectSelect(e)
        //                 }
        //             }}
        //         >
        //             <div
        //                 className={styles.resizeHandles}
        //                 style={{
        //                     display: (isSelected && showSelection) ? 'block' : 'none'
        //                 }}
        //             >
        //                 {TopLeftRH()}
        //                 {TopRightRH()}
        //                 {BotLeftRH()}
        //                 {BotRightRH()}
        //                 {TopHorizontalRH()}
        //                 {BotHorizontalRH()}
        //                 {LetftVerticalRH()}
        //                 {RightVerticalRH()}
        //             </div>
        //             <div
        //                 style={{
        //                     width: `${size.w}px`,
        //                     height: `${size.h}px`
        //                 }}
        //             />

        //         </div>
        //     )

        default:
            return null
    }
}

export { SlideObject }
