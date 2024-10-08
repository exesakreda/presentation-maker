import '../../types.ts'
import { Presentation } from '../../types'

import { Actions } from './Actions.tsx'
import { SlideArea } from './SlideArea.tsx'
import { Tools } from './Tools.tsx' 
import { Properties } from './Properties.tsx'

export let minPresentation: Presentation = {
  title: 'Презентация с минимальными данными',
  slideList: [{
    id: '1',
    background: { type: 'color', value: '#F7F7F7' },
    objects: [],
    selectedObjects: []
  }],
  selectedSlides: ['1'],
}

export let maxPresentation: Presentation = {
  title: 'Презентация с максимальными данными',
  slideList: [
    {
      id: '1',
      background: { type: 'color', value: '#F7F7F7' },
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
        {
          id: 'obj2',
          position: { x: 20, y: 20 },
          size: { h: 150, w: 300 },
          value: 'Текст',
          fontFamily: 'Calibri',
          textSize: 12,
          type: 'text',
        },
      ],
      selectedObjects: [],
    },
    {
      id: '2',
      background: { type: 'image', src: '../../images/backgrounds/mountains.png' },
      objects: [
        {
          id: 'obj3',
          position: { x: 10, y: 20 },
          size: { h: 500, w: 500 },
          src: '../../images/image1.png',
          type: 'image',
        },
        {
          id: 'obj4',
          position: { x: 20, y: 20 },
          size: { h: 150, w: 300 },
          value: 'Текст',
          fontFamily: 'Calibri',
          textSize: 12,
          type: 'text',
        },
      ],
      selectedObjects: [],
    },
    {
      id: '3',
      background: { type: 'color', value: '#F7F7F7' },
      objects: [],
      selectedObjects: [],
    },
    {
      id: '4',
      background: { type: 'color', value: '#F7F7F7' },
      objects: [],
      selectedObjects: [],
    },
    {
      id: '5',
      background: { type: 'color', value: '#F7F7F7' },
      objects: [],
      selectedObjects: [],
    },
    {
      id: '6',
      background: { type: 'color', value: '#F7F7F7' },
      objects: [],
      selectedObjects: [],
    },
    {
      id: '7',
      background: { type: 'color', value: '#F7F7F7' },
      objects: [],
      selectedObjects: [],
    },
    {
      id: '8',
      background: { type: 'color', value: '#F7F7F7' },
      objects: [],
      selectedObjects: [],
    },
    {
      id: '9',
      background: { type: 'color', value: '#F7F7F7' },
      objects: [],
      selectedObjects: [],
    },
    {
      id: '10',
      background: { type: 'color', value: '#F7F7F7' },
      objects: [],
      selectedObjects: [],
    },
  ],
  selectedSlides: ['1', '2', '4'],
}

export let isMax = true

function App() {
  if (isMax) {
    return (
      <>
        <SlideArea slide={maxPresentation.slideList[0]}/>
        <Actions slides={maxPresentation.slideList} selectedSlides={maxPresentation.selectedSlides}/>
        <Tools />
        <Properties slide={maxPresentation.slideList[0]}/>
      </>
    )
  } 

  return (
    <>
      <SlideArea slide={minPresentation.slideList[0]}/>
      <Actions slides={minPresentation.slideList} selectedSlides={minPresentation.selectedSlides}/>
      <Tools />
      <Properties slide={minPresentation.slideList[0]}/>
    </>
  )
}

export {
  App
}