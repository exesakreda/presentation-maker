import React from 'react'
import './App.css'
import Actionbar from './Actionbar'
import Toolbar from './Toolbar'
import Slidelist from './SlideList'
import SlideArea from './SlideArea' 
import Render from './Render'


function App() {
  let title = 'Новая презентация'

  const minClick = () => {
    title = 'Презентация с минимальными данными'
    updateTitle()
  }

  const maxClick = () => {
    title = 'Презентация с максимальными данными'
    updateTitle()
  }
  
  const resetClick = () => {
    title = 'Новая презентация'
    updateTitle()
  }

  const updateTitle = () => {
    const titleField = document.getElementById('titleField')
    if (titleField) {
      titleField.innerText = title
    }
  }

  return (
    <>
      <Actionbar title={title}/>
      <Toolbar />
      
      <Slidelist />
      <SlideArea />
      <Render onMinClick={minClick} onMaxClick={maxClick} onResetClick={resetClick}/>

    </>
  )
}

export default App