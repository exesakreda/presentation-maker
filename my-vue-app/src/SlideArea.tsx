import React from "react"
import { Slide } from "../../types"
import styles from './SlideArea.module.css'

import { TextArea, ImageArea } from "../../types"

type SlideAreaProps = {
    slide: Slide
}

function SlideArea(props: SlideAreaProps) {
    const slide = props.slide
    const slideObjects = slide.objects.map(obj => 
        <>
            <p><strong>object id: </strong>{obj.id}</p>
            <p><strong>x: </strong>{obj.position.x}; <strong>y: </strong>{obj.position.y}</p>
            <p><strong>h: </strong>{obj.size.h} <strong>w: </strong>{obj.size.w}</p>
            <p><strong>type: </strong>{obj.type}</p>
            {obj.type === 'text' && <p><strong>value: </strong>{(obj as TextArea).value}</p>}
            {obj.type === 'image' && <p><strong>src: </strong>{(obj as ImageArea).src}</p>}
            <br></br>
        </>
    )

    return (
        <div className={styles.slideArea}>
            <div className={styles.slidearea__content}>
                {/* {slideObjects} */}
            </div>
        </div>
    )
}

export { SlideArea }