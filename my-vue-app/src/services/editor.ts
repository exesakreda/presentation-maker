import { editor } from "./data"
import { EditorType } from "./EditorType"

let _editor = editor
let _handler: () => void = () => { }

function getEditor() {
  return _editor
}

function setEditor(newEditor: EditorType) {
  _editor = newEditor
}

type ModifyFunction<T = unknown> = (editor: EditorType, payload: T) => EditorType

function dispatch<T>(modifyFn: ModifyFunction<T>, payload: T): void {
  const newEditor = modifyFn(_editor, payload)
  setEditor(newEditor)

  if (_handler) {
    _handler()
  }
}

function addEditorChangeHandler(handler: () => void): void {
  _handler = handler
}

export {
  getEditor,
  dispatch,
  addEditorChangeHandler
}