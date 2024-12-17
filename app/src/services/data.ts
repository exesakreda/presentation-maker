import { EditorType } from "./EditorType"
import Ajv from 'ajv'

const ajv = new Ajv()

const schema = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        slideList: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    background: {
                        type: 'object',
                        properties: {
                            type: { type: 'string' },
                            value: { type: 'string' },
                            src: { type: 'string' }
                        },
                        required: ['type'],
                        oneOf: [
                            { required: ['value'] },
                            { required: ['src'] }
                        ],
                        additionalProperties: false
                    },
                    objects: { type: 'array' }
                },
                required: ['id', 'background', 'objects'],
                additionalProperties: false
            }
        }
    },
    required: ['title', 'slideList'],
    additionalProperties: false
}
const validate = ajv.compile(schema)

const storedEditor = localStorage.getItem('editor')
let parsedEditor
try {
    parsedEditor = storedEditor ? JSON.parse(storedEditor) : null
} catch (e) {
    console.error('Invalid JSON in localStorage.', e)
    parsedEditor = null
}

const isValid = validate(parsedEditor)

const editor: EditorType = parsedEditor && isValid ? parsedEditor : {
    title: 'Новая презентация',
    slideList: [
        {
            id: '1',
            background: { type: 'color', value: '#F7F7F7' },
            objects: [],
        }
    ]
}

export {
    editor
}