import '../../types.ts'

import { SlideList } from './views/SlideList.tsx'
import { SlideArea } from './views/SlideArea.tsx'
import { Tools } from './views/Tools.tsx'
import { Properties } from './views/Properties.tsx'
import { Title } from './views/Title.tsx'

import { EditorType } from './services/EditorType.ts'

type AppProps = {
  editor: EditorType
}

function App({ editor }: AppProps) {
  return (
    <>
      <Title editor={editor} />
      <SlideList editor={editor} />
      <SlideArea editor={editor} />
      <Tools />
      <Properties editor={editor} />
    </>
  )
}

export {
  App
}