import { Presentation } from "../../../types"
import { EditorType } from "./EditorType"

const presentation: Presentation = {
    title: 'Новая презентация о чем-то очень важном',
    slideList: [
        {
            id: '1',
            background: { type: 'color', value: '#F7F7F7' },
            objects: [],
            selectedObjects: [],
        },
    ]
}

const editor: EditorType = presentation

export {
    editor
}