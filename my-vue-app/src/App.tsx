import '../../types.ts'

import { Actions } from './views/Actions.tsx'
import { SlideArea } from './views/SlideArea.tsx'
import { Tools } from './views/Tools.tsx'
import { Properties } from './views/Properties.tsx'

import { getEditor } from './services/editor.ts'
import { EditorType } from './services/EditorType.ts'

type AppProps = {
  editor: EditorType
}

function App({ editor }: AppProps) {
  return (
    <>
      <Actions editor={editor} />
      <SlideArea editor={editor} />
      <Tools />
      <Properties editor={editor} />
    </>
  )
}

export { 
  App
}