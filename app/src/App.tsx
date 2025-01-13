import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PresentationEditor } from './views/PresentationEditor'
import { SlideShow } from './views/SlideShow'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <PresentationEditor />
        } />

        <Route path='/slideshow' element={
          <SlideShow slideIndex={0} />
        } />
      </Routes>
    </Router>

  )
}

export {
  App
}