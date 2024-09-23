import React from "react"
import './SlideList.css'

function Slidelist() {
    return(
        <div className="slideList">
            <div className="slideList__slide small-slide">
                <p className="small-slide__number">1</p>
                <div className="small-slide__preview"></div>
            </div>            
        </div>
    )
}

export default Slidelist