import Ajv from "ajv"

function validateJSON(object: any) {
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

    return validate(object)
}

export default validateJSON