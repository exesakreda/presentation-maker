import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import './assets/styles/index.css'
import { getEditor, addEditorChangeHandler } from './services/editor.ts'
import { Provider } from 'react-redux'
import store from './store'

function render() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={store}>
        <App editor={getEditor()} />
      </Provider>
    </StrictMode>,
  )
}

addEditorChangeHandler(render)
render()