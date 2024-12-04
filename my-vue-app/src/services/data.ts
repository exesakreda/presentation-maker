import { EditorType } from "./EditorType"

const storedTitle = localStorage.getItem('title')
const storedSlideList = localStorage.getItem('slideList')

const editor: EditorType = {
    title: storedTitle ? JSON.parse(storedTitle) : 'Новая презентация',
    slideList: storedSlideList ? JSON.parse(storedSlideList) : [
        {
            id: '1',
            background: { type: 'color', value: '#F7F7F7' },
            objects: [],
        },
    ]
}

export {
    editor
}