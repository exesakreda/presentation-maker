import * as React from "react"
import './Actionbar.css' 
import Title from './Title.tsx'

//
type TitleProps = {
    title: string
}

function Actionbar({ title } : TitleProps) {
    return (
        <div className="actionbar">
            <img src="/src/assets/file-pdf.svg" alt="" className="actionbar__image"/>
            <div className="actionbar__text abtext">
                <a className="abtext__title" id="titleField"><Title title={title} /></a>
                <div className="abtext__actions actions">
                    <p className="actions__item">Файл</p>
                    <p className="actions__item">Правка</p>
                    <p className="actions__item">Вид</p>
                </div>
            </div>
        </div>
    )
}

export {
    Actionbar,
} 
    
