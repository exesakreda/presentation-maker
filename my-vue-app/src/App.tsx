import React, { useState } from 'react'
import './App.css'
import Actionbar from './Actionbar'
import Toolbar from './Toolbar'
import Slidelist from './SlideList'
import SlideArea from './SlideArea' 

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

export let minPresentation: Presentation = {
  title: 'Презентация с минимальными данными',
  slideList: [{
    id: '1',
    background: { type: 'color', value: '#F7F7F7'},
    objects: [],
    selectedObjects: []
  }],
  selectedSlide: '1',
}

export let maxPresentation: Presentation = {
  title: 'Презентация с максимальными данными',
  slideList: [
    {
      id: '1',
      background: { type: 'color', value: '#F7F7F7'},
      objects: [
        {
          id: 'obj1',
          position: { x: 10, y: 20 },
          size: { h: 100, w: 200 },
          value: 'Заголовок',
          fontFamily: 'Arial',
          textSize: 24,
          type: 'text',
        },
      ],
      selectedObjects: [],
    },
    {
      id: '2',
      background: { type: 'color', value: '#F7F7F7'},
      objects: [],
      selectedObjects: [],
    },
    {
      id: '3',
      background: { type: 'color', value: '#F7F7F7'},
      objects: [],
      selectedObjects: [],
    },
    {
      id: '4',
      background: { type: 'color', value: '#F7F7F7'},
      objects: [],
      selectedObjects: [],
    },
    {
      id: '5',
      background: { type: 'color', value: '#F7F7F7'},
      objects: [],
      selectedObjects: [],
    },
    {
      id: '6',
      background: { type: 'color', value: '#F7F7F7'},
      objects: [],
      selectedObjects: [],
    },
    {
      id: '7',
      background: { type: 'color', value: '#F7F7F7'},
      objects: [],
      selectedObjects: [],
    },
    {
      id: '8',
      background: { type: 'color', value: '#F7F7F7'},
      objects: [],
      selectedObjects: [],
    },
    {
      id: '9',
      background: { type: 'color', value: '#F7F7F7'},
      objects: [],
      selectedObjects: [],
    },
    {
      id: '10',
      background: { type: 'color', value: '#F7F7F7'},
      objects: [],
      selectedObjects: [],
    },
  ],
  selectedSlide: '1',
}

function App() {
  let isMax = true
  if (isMax) {
    return (
      <>
        <Actionbar title={'Презентация с максимальными данными'}/>
        <Toolbar />
        
        <Slidelist slides={maxPresentation.slideList} selectedSlide={'1'} />
        <SlideArea slide={maxPresentation.slideList[0]}/>
      </>
    )
  } else {
    return (
      <>
        <Actionbar title={minPresentation.title}/>
        <Toolbar />
        
        <Slidelist slides={minPresentation.slideList} selectedSlide={minPresentation.selectedSlide}/>
        <SlideArea slide={minPresentation.slideList[0]}/>
      </>
    )
  }
}

export default App