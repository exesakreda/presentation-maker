import Ajv from 'ajv'

function validateJSON(object: unknown) {
    const ajv = new Ajv({ allErrors: true })
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
                            oneOf: [
                                {
                                    properties: {
                                        type: { type: 'string', enum: ['color'] },
                                        value: { type: 'string' }
                                    },
                                    required: ['type', 'value']
                                },
                                {
                                    properties: {
                                        type: { type: 'string', enum: ['image'] },
                                        src: { type: 'string' }
                                    },
                                    required: ['type', 'src'],
                                    additionalProperties: false
                                }
                            ]
                        },
                        objects: {
                            type: 'array',
                            items: {
                                type: 'object',
                                oneOf: [
                                    {
                                        properties: {
                                            id: { type: 'string' },
                                            position: {
                                                type: 'object',
                                                properties: {
                                                    x: { type: 'number' },
                                                    y: { type: 'number' }
                                                },
                                                required: ['x', 'y'],
                                                additionalProperties: false
                                            },
                                            size: {
                                                type: 'object',
                                                properties: {
                                                    h: { type: 'number' },
                                                    w: { type: 'number' }
                                                },
                                                required: ['h', 'w'],
                                                additionalProperties: false
                                            },
                                            value: { type: 'string' },
                                            type: { type: 'string', enum: ['text'] },
                                            font: {
                                                type: 'object',
                                                properties: {
                                                    weight: { type: 'number' },
                                                    fontFamily: { type: 'string' },
                                                    size: { type: 'number' },
                                                    color: { type: 'string' }
                                                },
                                                required: ['weight', 'fontFamily', 'size', 'color'],
                                                additionalProperties: false
                                            }
                                        },
                                        required: ['id', 'position', 'size', 'value', 'type', 'font'],
                                        additionalProperties: false
                                    },
                                    {
                                        properties: {
                                            id: { type: 'string' },
                                            position: {
                                                type: 'object',
                                                properties: {
                                                    x: { type: 'number' },
                                                    y: { type: 'number' }
                                                },
                                                required: ['x', 'y'],
                                                additionalProperties: false
                                            },
                                            size: {
                                                type: 'object',
                                                properties: {
                                                    h: { type: 'number' },
                                                    w: { type: 'number' }
                                                },
                                                required: ['h', 'w'],
                                                additionalProperties: false
                                            },
                                            src: { type: 'string' },
                                            type: { type: 'string', enum: ['image'] },
                                            aspectRatio: { type: 'number' }
                                        },
                                        required: ['id', 'position', 'size', 'src', 'type', 'aspectRatio'],
                                        additionalProperties: false
                                    }
                                ],
                            }
                        }
                    },
                    required: ['id', 'background', 'objects'],
                    additionalProperties: false
                }
            },
            selectedSlides: {
                type: 'array',
                items: {
                    type: 'string'
                }
            },
            history: {
                type: 'object',
                properties: {
                    undoable: {
                        type: 'array',
                        items: {
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
                                                oneOf: [
                                                    {
                                                        properties: {
                                                            type: { type: 'string', enum: ['color'] },
                                                            value: { type: 'string' }
                                                        },
                                                        required: ['type', 'value']
                                                    },
                                                    {
                                                        properties: {
                                                            type: { type: 'string', enum: ['image'] },
                                                            src: { type: 'string' }
                                                        },
                                                        required: ['type', 'src'],
                                                        additionalProperties: false
                                                    }
                                                ]
                                            },
                                            objects: {
                                                type: 'array',
                                                items: {
                                                    type: 'object',
                                                    oneOf: [
                                                        {
                                                            properties: {
                                                                id: { type: 'string' },
                                                                position: {
                                                                    type: 'object',
                                                                    properties: {
                                                                        x: { type: 'number' },
                                                                        y: { type: 'number' }
                                                                    },
                                                                    required: ['x', 'y'],
                                                                    additionalProperties: false
                                                                },
                                                                size: {
                                                                    type: 'object',
                                                                    properties: {
                                                                        h: { type: 'number' },
                                                                        w: { type: 'number' }
                                                                    },
                                                                    required: ['h', 'w'],
                                                                    additionalProperties: false
                                                                },
                                                                value: { type: 'string' },
                                                                type: { type: 'string', enum: ['text'] },
                                                                font: {
                                                                    type: 'object',
                                                                    properties: {
                                                                        weight: { type: 'number' },
                                                                        fontFamily: { type: 'string' },
                                                                        size: { type: 'number' },
                                                                        color: { type: 'string' }
                                                                    },
                                                                    required: ['weight', 'fontFamily', 'size', 'color'],
                                                                    additionalProperties: false
                                                                }
                                                            },
                                                            required: ['id', 'position', 'size', 'value', 'type', 'font'],
                                                            additionalProperties: false
                                                        },
                                                        {
                                                            properties: {
                                                                id: { type: 'string' },
                                                                position: {
                                                                    type: 'object',
                                                                    properties: {
                                                                        x: { type: 'number' },
                                                                        y: { type: 'number' }
                                                                    },
                                                                    required: ['x', 'y'],
                                                                    additionalProperties: false
                                                                },
                                                                size: {
                                                                    type: 'object',
                                                                    properties: {
                                                                        h: { type: 'number' },
                                                                        w: { type: 'number' }
                                                                    },
                                                                    required: ['h', 'w'],
                                                                    additionalProperties: false
                                                                },
                                                                src: { type: 'string' },
                                                                type: { type: 'string', enum: ['image'] },
                                                                aspectRatio: { type: 'number' }
                                                            },
                                                            required: ['id', 'position', 'size', 'src', 'type', 'aspectRatio'],
                                                            additionalProperties: false
                                                        }
                                                    ],
                                                }
                                            }
                                        },
                                        required: ['id', 'background', 'objects'],
                                        additionalProperties: false
                                    }
                                },
                                selection: {
                                    type: 'object',
                                    properties: {
                                        slides: {
                                            type: 'array',
                                            items: { type: 'string' }
                                        },
                                        objects: {
                                            type: 'array',
                                            items: { type: 'string' }
                                        }
                                    },
                                    required: ['slides', 'objects']
                                }
                            },
                            required: ['title', 'slideList', 'selection']
                        }
                    },
                    redoable: {
                        type: 'array',
                        items: {
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
                                                oneOf: [
                                                    {
                                                        properties: {
                                                            type: { type: 'string', enum: ['color'] },
                                                            value: { type: 'string' }
                                                        },
                                                        required: ['type', 'value']
                                                    },
                                                    {
                                                        properties: {
                                                            type: { type: 'string', enum: ['image'] },
                                                            src: { type: 'string' }
                                                        },
                                                        required: ['type', 'src'],
                                                        additionalProperties: false
                                                    }
                                                ]
                                            },
                                            objects: {
                                                type: 'array',
                                                items: {
                                                    type: 'object',
                                                    oneOf: [
                                                        {
                                                            properties: {
                                                                id: { type: 'string' },
                                                                position: {
                                                                    type: 'object',
                                                                    properties: {
                                                                        x: { type: 'number' },
                                                                        y: { type: 'number' }
                                                                    },
                                                                    required: ['x', 'y'],
                                                                    additionalProperties: false
                                                                },
                                                                size: {
                                                                    type: 'object',
                                                                    properties: {
                                                                        h: { type: 'number' },
                                                                        w: { type: 'number' }
                                                                    },
                                                                    required: ['h', 'w'],
                                                                    additionalProperties: false
                                                                },
                                                                value: { type: 'string' },
                                                                type: { type: 'string', enum: ['text'] },
                                                                font: {
                                                                    type: 'object',
                                                                    properties: {
                                                                        weight: { type: 'number' },
                                                                        fontFamily: { type: 'string' },
                                                                        size: { type: 'number' },
                                                                        color: { type: 'string' }
                                                                    },
                                                                    required: ['weight', 'fontFamily', 'size', 'color'],
                                                                    additionalProperties: false
                                                                }
                                                            },
                                                            required: ['id', 'position', 'size', 'value', 'type', 'font'],
                                                            additionalProperties: false
                                                        },
                                                        {
                                                            properties: {
                                                                id: { type: 'string' },
                                                                position: {
                                                                    type: 'object',
                                                                    properties: {
                                                                        x: { type: 'number' },
                                                                        y: { type: 'number' }
                                                                    },
                                                                    required: ['x', 'y'],
                                                                    additionalProperties: false
                                                                },
                                                                size: {
                                                                    type: 'object',
                                                                    properties: {
                                                                        h: { type: 'number' },
                                                                        w: { type: 'number' }
                                                                    },
                                                                    required: ['h', 'w'],
                                                                    additionalProperties: false
                                                                },
                                                                src: { type: 'string' },
                                                                type: { type: 'string', enum: ['image'] },
                                                                aspectRatio: { type: 'number' }
                                                            },
                                                            required: ['id', 'position', 'size', 'src', 'type', 'aspectRatio'],
                                                            additionalProperties: false
                                                        }
                                                    ],
                                                }
                                            }
                                        },
                                        required: ['id', 'background', 'objects'],
                                        additionalProperties: false
                                    }
                                },
                                selection: {
                                    type: 'object',
                                    properties: {
                                        slides: {
                                            type: 'array',
                                            items: { type: 'string' }
                                        },
                                        objects: {
                                            type: 'array',
                                            items: { type: 'string' }
                                        }
                                    },
                                    required: ['slides', 'objects']
                                }
                            },
                            required: ['title', 'slideList', 'selection']
                        }
                    }
                },
                required: ['undoable', 'redoable'],
                additionalProperties: false
            }
        },
        required: ['title', 'slideList', 'selectedSlides', 'history'],
        additionalProperties: false
    }
    const validate = ajv.compile(schema)

    return validate(object)
}

export default validateJSON
