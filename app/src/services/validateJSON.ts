import Ajv from "ajv"

function validateJSON(object: any) {
    const ajv = new Ajv({ allErrors: true })
    const schema = {
        type: "object",
        properties: {
            presentation: {
                type: "object",
                properties: {
                    title: { type: "string" },
                    slideList: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                id: { type: "string" },
                                background: {
                                    type: "object",
                                    properties: {
                                        type: { type: "string" },
                                        value: { type: "string" },
                                        src: { type: "string" }
                                    },
                                    required: ["type"],
                                    oneOf: [
                                        { required: ["value"] },
                                        { required: ["src"] }
                                    ],
                                    additionalProperties: false
                                },
                                objects: {
                                    type: "array",
                                    items: {
                                        type: 'object',
                                        properites: {
                                            id: { type: 'string' },
                                            position: {
                                                type: 'object',
                                                properties: {
                                                    x: { type: 'number' },
                                                    y: { type: 'number' }
                                                },
                                                required: ['x', 'y']
                                            },
                                            size: {
                                                type: 'object',
                                                properties: {
                                                    w: { type: 'number' },
                                                    h: { type: 'number' }
                                                },
                                                required: ['w', 'h']
                                            },
                                            type: { type: 'string', enum: ['image', 'text', 'shape'] },
                                            font: {
                                                type: 'object',
                                                properties: {
                                                    weight: { type: 'number' },
                                                    fontFamily: { type: 'string' },
                                                    size: { type: 'number' }
                                                }
                                            },
                                            value: { type: 'string' },
                                            src: { type: 'string' },
                                            aspectRatio: { type: 'number' },
                                            required: ['id', 'position', 'size', 'type'],
                                            oneOf: [
                                                { required: ['font', 'value'] },
                                                { required: ['src', 'aspectRatio'] }
                                            ]
                                        }
                                    }
                                }
                            },
                            required: ["id", "background", "objects"],
                            additionalProperties: false
                        }
                    }
                },
                required: ["title", "slideList"],
                additionalProperties: false
            },
            notifications: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        message: { type: "string" },
                        info: { type: ["string", "null"] },
                        type: { type: "string", enum: ["error", "success", "info"] }
                    },
                    required: ["id", "message", "type"],
                    additionalProperties: false
                }
            },
            selection: {
                type: "object",
                properties: {
                    objects: { type: "array", items: { type: "string" } },
                    slides: { type: "array", items: { type: "string" } }
                },
                required: ["objects", "slides"],
                additionalProperties: false
            },
            tool: { type: "string" }
        },
        required: ["presentation", "notifications", "selection", "tool"],
        additionalProperties: false
    }
    const validate = ajv.compile(schema)

    return validate(object)
}

export default validateJSON
