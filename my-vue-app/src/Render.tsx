import React from "react"

import './Render.css'

type myRenderProps = {
    onMinClick: () => void,
    onMaxClick: () => void,
    onResetClick: () => void,
}

function Render({ onMinClick, onMaxClick, onResetClick }: myRenderProps) {
    return (
        <div className="render">
            <div className="render__renderMin renderMin button2" style={{marginRight: '10px'}} onClick={onMinClick}>
                <p className="renderMin__text">render min</p>
            </div>
            
            <div className="render__renderMax renderMax button2" style={{marginRight: '10px'}} onClick={onMaxClick}>
                <p className="renderMax__text">render max</p>
            </div>

            <div className="render__renderMax renderMax button2" style={{marginRight: '10px'}} onClick={onResetClick}>
                <p className="renderMax__text">render default</p>
            </div>
        </div>
    )
}

export default Render