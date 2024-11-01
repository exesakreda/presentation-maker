import type { Slide } from "../../../types"
import styles from './Slide.module.css'
import { resizeInput } from "../services/resizeInput"
import { useEffect } from "react"
import { dispatch } from "../services/editor"
import { setTextAreaValue } from "../services/editorFunctions"

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

    const slideObjects = slide.objects.map(obj => {
        if (obj.type === 'text') {
            return (
                <input
                    key={obj.id}
                    id={obj.id}
                    type="text"
                    className={styles.textArea}
                    style={{
                        left: `${obj.position.x}px`,
                        top: `${obj.position.y}px`,
                        width: `${obj.size.w}px`,
                        height: `${obj.size.h}px`
                    }}
                    defaultValue={obj.value}
                    onBlur={onTextAreaChange}
                    onInput={(event) => resizeInput(event.target as HTMLInputElement)}
                >
                </input>
            )
        }
    })

    const backgroundValue = slide.background.type == 'color' ? String(slide.background.value) : ''

    return (
        <div className={styles.slide} style={{ transform: `scale(${scale})`, backgroundColor: backgroundValue }}>
            {slideObjects}
        </div>
    )
}

export { Slide }