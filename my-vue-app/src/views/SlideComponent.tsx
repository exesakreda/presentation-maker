import type { Slide } from "../../../types"
import styles from './SlideComponent.module.css'

import { TextArea, ImageArea } from "../../../types"

type SlideProps = {
    slide: Slide,
    scale: number,
}

//переименовать в Slide
function SlideComponent({slide, scale}: SlideProps) {
    const slideObjects = slide.objects.map(obj =>
        <>
            <p><strong>object id: </strong>{obj.id}</p>
            <p><strong>x: </strong>{obj.position.x}; <strong>y: </strong>{obj.position.y}</p>
            <p><strong>h: </strong>{obj.size.h} <strong>w: </strong>{obj.size.w}</p>
            <p><strong>type: </strong>{obj.type}</p>
            {obj.type === 'text' && <p><strong>value: </strong>{(obj as TextArea).value}</p>}
            {obj.type === 'image' && <p><strong>src: </strong>{(obj as ImageArea).src}</p>}
            <br/>
        </>
    )

    return (
        <div className={styles.slide} style={{ transform: `scale(${scale})`}}>
            {slideObjects}
        </div>
    )
}

export { SlideComponent }