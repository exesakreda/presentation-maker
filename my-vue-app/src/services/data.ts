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
    ],
    selectedSlides: ['1'],
}

const editor: EditorType = {
    presentation,
    selection: {
        selectedSlides: [ presentation.slideList[0].id ]
    }
}

export {
    editor
}