import { SlideList } from './views/SlideList.tsx'
import { SlideArea } from './views/SlideArea.tsx'
import { Tools } from './views/Tools.tsx'
import { Properties } from './views/Properties.tsx'
import { Title } from './views/Title.tsx'
import { FileMenu } from './views/FileMenu.tsx'
import { Notifications } from './views/Notifications.tsx'
import { Notification } from '../../types.ts'
import { useState } from 'react'


function App() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  return (
    <>
      <Title />
      <FileMenu notifications={notifications} setNotifications={setNotifications} />
      <Notifications notifications={notifications} setNotifications={setNotifications} />
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