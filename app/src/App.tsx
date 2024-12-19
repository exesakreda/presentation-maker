import { SlideList } from './views/SlideList.tsx'
import { SlideArea } from './views/SlideArea.tsx'
import { Tools } from './views/Tools.tsx'
import { Properties } from './views/Properties.tsx'
import { Title } from './views/Title.tsx'
import { FileMenu } from './views/FileMenu.tsx'
import { Notifications } from './views/Notifications.tsx'

function App() {
  return (
    <>
      <Title />
      <FileMenu  />
      <Notifications />
      <SlideList />
      <SlideArea />
      <Tools />
      <Properties />
    </>

  )
}

export {
  App
}