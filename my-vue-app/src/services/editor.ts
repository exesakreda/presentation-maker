import { editor } from "./data"
import { EditorType } from "./EditorType"

let _editor = editor
let _handler: Function = () => {}

function getEditor() {
  return _editor
}

function setEditor(newEditor: EditorType) {
  _editor = newEditor
}

function dispatch(modifyFn: Function, payload?: Object, param1?: any, param2?:any): void {
  const newEditor = modifyFn(_editor, payload, param1, param2)
  setEditor(newEditor)

  if (_handler) {
    _handler()
  }
}

function addEditorChangeHandler(handler: Function): void { 
  _handler = handler
}

export { 
  getEditor, 
  dispatch, 
  addEditorChangeHandler 
}