import '../../types.ts'

import { Actions } from './views/Actions.tsx'
import { SlideArea } from './views/SlideArea.tsx'
import { Tools } from './views/Tools.tsx'
import { Properties } from './views/Properties.tsx'

import { minPresentation } from './presentations.ts'
import { maxPresentation } from './presentations.ts'
import { getEditor } from './services/editor.ts'

function App(props: { editor }) {
  const isMax = true

  const currentPresentation = isMax ? maxPresentation : minPresentation

  return (
    <>
      {/* <h1 onClick={onTextClick}>{props.editor.title}</h1> */}
      <Actions presentation={currentPresentation} editor={getEditor()}/>
      <SlideArea presentation={currentPresentation} />
      <Tools />
      <Properties presentation={currentPresentation} />
    </>
  )
}

export {
  App
}