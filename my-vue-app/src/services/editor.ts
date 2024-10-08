let editor = {
  title: 'Old Title'
}
let editorChangeHandler = null

function getEditor() {
  return editor
}

function setEditor(newEditor) {
  editor = newEditor
}

function addEditorChangeHandler(handler) {
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



export { getEditor, setEditor, dispatch, addEditorChangeHandler }