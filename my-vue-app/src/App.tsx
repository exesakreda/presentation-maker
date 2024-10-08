import '../../types.ts'

import { Actions } from './views/Actions.tsx'
import { SlideArea } from './views/SlideArea.tsx'
import { Tools } from './views/Tools.tsx'
import { Properties } from './views/Properties.tsx'

import { minPresentation } from './presentations.ts'
import { maxPresentation } from './presentations.ts'

function App() {
  const isMax = true

  const currentPresentation = isMax ? maxPresentation : minPresentation

  return (
    <>
      <Actions presentation={currentPresentation}/>
      <SlideArea presentation={currentPresentation} />
      <Tools />
      <Properties presentation={currentPresentation} />
    </>
  )
}

export { 
  App
}