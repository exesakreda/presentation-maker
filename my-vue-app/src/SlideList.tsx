import React from "react"
import './SlideList.css'
import { Slide } from "../../types"

type SlideListProps = {
    slides: Slide[],
    selectedSlides: string[],
}

function Slidelist(props: SlideListProps) {
    const slides: Array<Slide> = props.slides
    let isSelected: boolean

    const slideListItems = slides.map(slide => {
        if (props.selectedSlides.includes(slide.id)) {
            isSelected = true
        } else {
            isSelected = false
        }

        return (
            <div key={slide.id} className="slideList__slide small-slide">
                <p className="small-slide__number">{slides.indexOf(slide) + 1}</p>
                <div
                    className={`small-slide__preview ${isSelected ? 'selectedSlide' : ''}`}
                ></div>
            </div>
        )

    })

    return (
        <div className="slideList">
            {slideListItems}
        </div>
    )
}

export {
    Slidelist
}