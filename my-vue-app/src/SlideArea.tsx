import React from "react"
import './SlideArea.css'
import { Color, Image, Slide } from "../../types"
import { TextArea } from "../../types"
import { ImageArea } from "../../types"

type SlideAreaProps = {
    slide: Slide
}

function SlideArea(props: SlideAreaProps) {
    const slide:Slide = props.slide
    const slideObjects = slide.objects.map(obj => 
        <>
            <p> - id: {obj.id}</p>
            <p> - position:  x: {obj.position.x} | y: {obj.position.y}</p>
            <p> - size: h: {obj.size.h} | w: {obj.size.w}</p>
            <p> - type: {obj.type}</p>

            {obj.type === 'text' && <p> - value: {(obj as TextArea).value}</p>}
            {obj.type === 'image' && <p> - src: {(obj as ImageArea).src}</p>}
        </>
    )
    return (
        <div className="slidearea">
            <div className="slidearea__content">
                <p> id: {slide.id} </p>
                <p> background type: {slide.background.type}</p>
                {slide.background.type === 'color' && <p>background color: {(slide.background as Color).value}</p>}
                {slide.background.type === 'image' && <p>background color: {(slide.background as Image).src}</p>}
                <p> objects: </p>
                {slideObjects}
                <p> selectedObjects: {slide.selectedObjects} </p>
            </div>
        </div>
    )
}

export default SlideArea