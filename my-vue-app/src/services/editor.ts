import { Presentation } from "../../../types"

import { currentPresentation } from "../App"


let editor: Presentation 

function initEditor(currentPresentation: Presentation) {
  editor = {
    title: currentPresentation.title,
    slideList: currentPresentation.slideList,
    selectedSlides: currentPresentation.selectedSlides
  }
}

let editorChangeHandler = null

function getEditor(): Presentation {
  if (editor) {
    return editor
  }
}

function setEditor(newEditor: Presentation) {
  editor = newEditor
}

function addEditorChangeHandler(handler: Presentation) {
  editorChangeHandler = handler
}

/**
 * @param {Function} modifyFn
 * @param {Object} payload
 */
function dispatch(modifyFn, payload) {
  const newEditor = modifyFn(editor, payload)
  setEditor(newEditor)

  if (editorChangeHandler) {
    editorChangeHandler()
  }
}



export { getEditor, setEditor, dispatch, addEditorChangeHandler, initEditor }