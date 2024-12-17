import { SlideList } from './views/SlideList.tsx'
import { SlideArea } from './views/SlideArea.tsx'
import { Tools } from './views/Tools.tsx'
import { Properties } from './views/Properties.tsx'
import { Title } from './views/Title.tsx'
import { FileMenu } from './views/FileMenu.tsx'
import { Notifications } from './views/Notifications.tsx'
import { EditorType } from './services/EditorType.ts'
import { Notification } from '../../types.ts'
import { useState } from 'react'

type AppProps = {
  editor: EditorType
}

function App({ editor }: AppProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  function isKeyExists(key: string) {
    return localStorage.getItem(key) !== null
  }

  if (!isKeyExists('selectedSlides')) {
    localStorage.setItem('selectedSlides', JSON.stringify(['1']))
  }

  if (!isKeyExists('editor')) {
    localStorage.setItem('editor', JSON.stringify(editor))
  }

  const [selectedSlides, setSelectedSlides] = useState<string[]>(() => {
    const storedSlides = localStorage.getItem('selectedSlides')
    return storedSlides ? JSON.parse(storedSlides) : ['1']
  })

  const [tool, setTool] = useState<'cursor' | 'text' | 'image'>('cursor')
  const currentSlide = editor.slideList.find(slide => slide.id === selectedSlides[selectedSlides.length - 1])
  const [selectedObjects, setSelectedObjects] = useState<string[]>([])

  return (
    <>
      {currentSlide ? (
        <>
          <Title editor={editor} />

          <FileMenu editor={editor} notifications={notifications} setNotifications={setNotifications}/>

          <Notifications notifications={notifications} setNotifications={setNotifications}/>

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
            currentTool={tool}
            setTool={setTool}
            currentSlide={currentSlide}
          />

          <Properties
            editor={editor}
            currentSlideId={selectedSlides[selectedSlides.length - 1]}
          />
        </>
      ) : (
        <p>No slide selected</p>
      )}
    </>
  )
}

export {
  App
}