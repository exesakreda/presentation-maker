import React, { useState } from 'react'
import './App.css'
import Actionbar from './Actionbar'
import Toolbar from './Toolbar'
import Slidelist from './SlideList'
import SlideArea from './SlideArea' 
import Render from './Render'

import '../../types.ts'
import { Presentation } from '../../types.ts'

import { 
  changePresentationTitle, 
  addSlide, 
  deleteSlide, 
  changeSlidePosition, 
  addSlideObject, 
  deleteSlideObject, 
  changeObjectPosition, 
  changeObjectSize, 
  changeTextAreaValue, 
  changeTextAreaTextSize, 
  changeTextAreaFontFamily, 
  changeSlideBackground 
} from '../../functions.ts';

let initialPresentation: Presentation = {
  title: 'Новая презентация',
  slideList: [],
  selectedSlides: [],
}

function App() {
  const [presentation, setPresentation] = useState<Presentation>(initialPresentation)

  const minClick = () => {
    const updatedPresentation = changePresentationTitle(presentation, 'Презентация с минимальными данными')
    setPresentation(updatedPresentation)
  }

  const maxClick = () => {
    const updatedPresentation = changePresentationTitle(presentation, 'Презентация с максимальными данными')
    setPresentation(updatedPresentation)
  }
  
  const resetClick = () => {
    const updatedPresentation = changePresentationTitle(presentation, 'Новая презентация')
    setPresentation(updatedPresentation)
  }

  return (
    <>
      <Actionbar title={presentation.title}/>
      <Toolbar />
      
      <Slidelist />
      <SlideArea />
      <Render onMinClick={minClick} onMaxClick={maxClick} onResetClick={resetClick}/>

    </>
  )
}

export default App