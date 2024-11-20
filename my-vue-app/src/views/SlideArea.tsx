import { EditorType } from "../services/EditorType"
import styles from './SlideArea.module.css'
import { createObject } from "../services/editorFunctions"
import { Slide } from "./Slide"
import { dispatch } from "../services/editor"
type SlideAreaProps = {
    editor: EditorType,
    currentSlideId: string,
    currentTool: 'cursor' | 'text' | 'image',
    onToolSelect: (tool: 'cursor' | 'text' | 'image') => void
}

function SlideArea({ editor, currentSlideId, currentTool, onToolSelect }: SlideAreaProps) {
    const currentSlide = editor.slideList.find(slide => slide.id === currentSlideId)

    return (
        <div
            className={styles.slideArea}
            id='slideArea'
            style={
                {
                    cursor: currentTool === 'cursor' ? 'default' : 'text',
                }}
            onClick={(event) => {
                if (currentTool !== 'cursor') {
                    dispatch(createObject, {
                        e: event,
                        slideId: currentSlideId,
                        currentTool: currentTool
                    })
                    onToolSelect('cursor')
                }
            }}>
            {currentSlide ? (
                <Slide slide={currentSlide} scale={1} />
            ) : (
                <></>
            )}
        </div>
    )
}

export { SlideArea }