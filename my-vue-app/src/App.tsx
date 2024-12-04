import { SlideList } from './views/SlideList.tsx'
import { SlideArea } from './views/SlideArea.tsx'
import { Tools } from './views/Tools.tsx'
import { Properties } from './views/Properties.tsx'
import { Title } from './views/Title.tsx'

import { EditorType } from './services/EditorType.ts'
import { useState } from 'react'

type AppProps = {
  editor: EditorType
}

function App({ editor }: AppProps) {
  function isKeyExists(key: string) {
    return localStorage.getItem(key) !== null
  }

  if (!isKeyExists('selectedSlides')) {
    localStorage.setItem('selectedSlides', JSON.stringify(['1']))
  }

  if (!isKeyExists('slideList')) {
    localStorage.setItem('slideList', JSON.stringify(editor.slideList))
  }

  if (!isKeyExists('title')) {
    localStorage.setItem('title', JSON.stringify('Новая презентация'))
  }

  const [selectedSlides, setSelectedSlides] = useState<string[]>(() => {
    const storedSlides = localStorage.getItem('selectedSlides')
    return storedSlides ? JSON.parse(storedSlides) : ['1']
  })

  const [tool, setTool] = useState<'cursor' | 'text' | 'image'>('cursor')
  const currentSlide = editor.slideList.find(slide => slide.id === selectedSlides[selectedSlides.length - 1])
  if (!currentSlide) return

  const [selectedObjects, setSelectedObjects] = useState<string[]>([])

  return (
    <>
      <Title
        editor={editor}
      />
      <SlideList
        editor={editor}
        selectedSlides={selectedSlides}
        setSelectedSlides={setSelectedSlides}
        selectedObjects={selectedObjects}
        setSelectedObjects={setSelectedObjects}
      />

      <SlideArea
        currentSlide={currentSlide}
        currentTool={tool}
        onToolSelect={setTool}
        selectedObjects={selectedObjects}
        setSelectedObjects={setSelectedObjects}
      />

      <Tools
        editor={editor}
        currentTool={tool}
        setTool={setTool}
        currentSlide={currentSlide}
      />
      <Properties
        editor={editor}
        currentSlideId={selectedSlides[selectedSlides.length - 1]}
      />
    </>
  )
}

export {
  App
}