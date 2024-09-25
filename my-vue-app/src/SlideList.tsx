import React from "react"
import './SlideList.css'
import { Slide } from "../../types"

type SlideListProps = {
    slides: Slide[],
    selectedSlide: string,
}

function Slidelist(props: SlideListProps) {
    const slides: Array<Slide> = props.slides
    const selectedSlideId = props.selectedSlide

    const slideListItems = slides.map(slide => {
        const isSelected = slide.id === selectedSlideId 
        
        return(
            <div className="slideList__slide small-slide">
            <p className="small-slide__number">{slides.indexOf(slide) + 1}</p>
            <div 
                key={slide.id}
                className={`small-slide__preview ${isSelected ? 'selectedSlide' : ''}`}
            ></div>    
        </div>  
        )
                 
    })

    return(
        <div className="slideList">
            {slideListItems}
        </div>
    )
}

export default Slidelist