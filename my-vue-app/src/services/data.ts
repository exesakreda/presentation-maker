import { EditorType } from "./EditorType"

// const storedTitle = localStorage.getItem('title')
// const storedSlideList = localStorage.getItem('slideList')

const storedEditor = localStorage.getItem('editor')
const storedTitle = storedEditor ? JSON.parse(storedEditor).title : 'Новая презентация'
const storedSlideList = storedEditor ? JSON.parse(storedEditor).slideList : [
    {
        id: '1',
        background: { type: 'color', value: '#F7F7F7' },
        objects: [],
    },
    {
        id: '2',
        background: { type: 'color', value: '#F7F7F7' },
        objects: [],
    },
]

const editor: EditorType = {
    title: storedTitle,
    slideList: storedSlideList
}

export {
    editor
}