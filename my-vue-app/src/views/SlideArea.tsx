import type { Slide as SlideType } from "../../../types"
import { EditorType } from "../services/EditorType"
import styles from './SlideArea.module.css'
import { createObject } from "../services/editorFunctions"
import { getTool, handleToolSelect } from "./Tools"

import { Slide } from "./Slide"
import { dispatch } from "../services/editor"

type SlideAreaProps = {
    editor: EditorType,
}

function SlideArea({ editor }: SlideAreaProps) {
    const currentSlide: SlideType | undefined = editor.presentation.slideList.find(slide => slide.id === editor.selection?.selectedSlides[editor.selection?.selectedSlides.length - 1])
    const tool = getTool()
    
    return (
        <div
            className={styles.slideArea}
            id='slideArea'
            style={
                { 
                    cursor: tool === 'cursor' ? 'default' : 'text' 
                
                }}
            onClick={(event) => {
                if (tool !== 'cursor') {
                    dispatch(createObject, event, tool)
                    handleToolSelect('cursor')
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