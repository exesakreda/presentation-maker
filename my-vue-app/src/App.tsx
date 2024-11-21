import '../../types.ts'

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
  const [selectedSlides, setSelectedSlides] = useState(
    editor.slideList && editor.slideList.length > 0
      ? [editor.slideList[0].id]
      : [] 
  )
  const currentSlideId = selectedSlides[selectedSlides.length - 1]

  const [tool, setTool] = useState<'cursor' | 'text' | 'image'>('cursor')

  return (
    <>
      <Title editor={editor} />
      <SlideList editor={editor} selectedSlides={selectedSlides} onSlideSelect={setSelectedSlides} />
      <SlideArea editor={editor} currentSlideId={currentSlideId} currentTool={tool} onToolSelect={setTool}/>
      <Tools currentTool={tool} onToolSelect={setTool} />
      <Properties editor={editor} currentSlideId={currentSlideId} />
    </>
  )
}

export {
  App
}