import React from "react"
import './Toolbar.css'

function Toolbar() {
    return (
        <>
            <div className="toolbar">
                <div className="toolbar__newslide newslide button2">
                    <img src="/src/assets/add.svg" alt="" className="newslide__icon"/>
                    <div className="newslide__text">Новый слайд</div>
                </div>
                
                <div className="toolbar__undo undo button1">
                    <img src="/src/assets/undo.svg" alt="" className="undo__image"/>
                </div>

                <div className="toolbar__redo redo button1">
                    <img src="/src/assets/redo.svg" alt="" className="redo__image"/>
                </div>
               <img src="/src/assets/divider.svg" alt="" className="toolbar__divider"/>

               <div className="toolbar__cursor cursor button1">
                    <img src="/src/assets/cursor.svg" alt="" className="cursor__image"/>
               </div>

               <div className="toolbar__textarea textarea button1">
                    <img src="/src/assets/textarea.svg" alt="" className="textarea__image"/>
               </div>

               <div className="toolbar__shape shape button1">
                    <img src="/src/assets/shape.svg" alt="" />
               </div>
            </div>
        </>
    )
}

export {
    Toolbar
}