import { Presentation, Slide, Position, SlideObject, TextArea, Size, Image, Color } from "./types"

// Изменение названия презентации
function changePresentationTitle(presentation: Presentation, newTitle: string): Presentation {
    return {
        ...presentation,
        title: newTitle,
    }
}

// Создание слайда
function addSlide(presentation: Presentation, newSlide: Slide): Presentation {
    return {
        ...presentation,
        slideList: [...presentation.slideList, newSlide]
    }
}

// Удаление слайда
function deleteSlide(presentation: Presentation, slideId: string): Presentation {
    return {
        ...presentation,
        slideList: presentation.slideList.filter(slide => slide.id !== slideId)
    }
}

// Изменение позиции слайда
function changeSlidePosition(presentation: Presentation, slideId: string, newIndex: number): Presentation {
    const updatedSlideList = [...presentation.slideList]

    const oldIndex = updatedSlideList.findIndex(slide => slide.id === slideId)
    if (oldIndex !== -1) {
        const [slide] = updatedSlideList.splice(oldIndex, 1)
        updatedSlideList.splice(newIndex, 0, slide)
    }

    return {
        ...presentation,
        slideList: updatedSlideList,
    }
}

// Добавление объекта 
function addSlideObject(presentation: Presentation, slideId: string, newObject: SlideObject): Presentation {
    const updatedSlideList = presentation.slideList.map(slide => {
        if (slide.id === slideId) {
            return {
                ...slide,
                objects: [...slide.objects, newObject]
            }
        }
        return slide
    })

    return {
        ...presentation,
        slideList: updatedSlideList
    }
}

// Удаление объекта 
function deleteSlideObject(presentation: Presentation, slideId: string, objectId: string): Presentation {
    const updatedSlideList = presentation.slideList.map(slide => {
        if (slide.id === slideId) {
            return {
                ...slide,
                objects: slide.objects.filter(object => object.id !== objectId)
            }
        }
        return slide
    })

    return {
        ...presentation,
        slideList: updatedSlideList
    }
}

// Изменение позиции текста/картинки
function changeObjectPosition(presentation: Presentation, slideId: string, objectId: string, newPosition: Position): Presentation {
    const updatedSlideList = presentation.slideList.map(slide => {
        if (slide.id === slideId) {
            const updatedSlideObjects = slide.objects.map(object => {
                if (object.id === objectId) {
                    return {
                        ...object,
                        position: newPosition
                    }
                }
                return object
            })
        }
        return slide
    })

    return {
        ...presentation,
        slideList: updatedSlideList
    }
}


// Изменение размера текста/картинки
function changeObjectSize(presentation: Presentation, slideId: string, objectId: string, newSize: Size): Presentation {
    const updatedSlideList = presentation.slideList.map(slide => {
        if (slide.id === slideId) {
            const updatedSlideObjects = slide.objects.map(object => {
                if (object.id === objectId) {
                    return {
                        ...object,
                        size: newSize
                    }
                }
                return object
            })
        }
        return slide
    })

    return {
        ...presentation,
        slideList: updatedSlideList
    }
}

// Изменение текста
function changeTextAreaValue(presentation: Presentation, slideId: string, objectId: string, newValue: string): Presentation {
    const updatedSlideList = presentation.slideList.map(slide => {
        if (slide.id === slideId) {
            const updatedSlideObjects = slide.objects.map(object => {
                if (object.id === objectId) {
                    return {
                        ...object,
                        value: newValue
                    }
                }
                return object
            })
            return {
                ...slide,
                objects: updatedSlideObjects
            }
        }
        return slide
    })

    return {
        ...presentation,
        slideList: updatedSlideList
    }
}

// Изменение размера текста
function changeTextAreaTextSize(presentation: Presentation, slideId: string, objectId: string, newTextSize: number): Presentation {
    const updatedSlideList = presentation.slideList.map(slide => {
        if (slide.id === slideId) {
            const updatedSlideObjects = slide.objects.map(object => {
                if (object.id === objectId) {
                    return {
                        ...object,
                        textSize: newTextSize
                    }
                }
                return object
            })
            return {
                ...slide,
                objects: updatedSlideObjects
            }
        }
        return slide
    })

    return {
        ...presentation,
        slideList: updatedSlideList
    }
}

// Изменение шрифта текста
function changeTextAreaFontFamily(presentation: Presentation, slideId: string, objectId: string, newFontFamily: string): Presentation {
    const updatedSlideList = presentation.slideList.map(slide => {
        if (slide.id === slideId) {
            const updatedSlideObjects = slide.objects.map(object => {
                if (object.id === objectId && object.type === 'text') {
                    return {
                        ...object,
                        fontFamily: newFontFamily
                    }
                }
                return object
            })
            return {
                ...slide,
                objects: updatedSlideObjects
            }
        }
        return slide
    })

    return {
        ...presentation,
        slideList: updatedSlideList
    }
}

// Изменение фона слайда
function changeSlideBackground(presentation: Presentation, slideId: string, newBackgroundType: 'color' | 'image', newBackground: string): Presentation {
    const updatedSlideList = presentation.slideList.map(slide => {
        if (slide.id === slideId) {
            if (newBackgroundType === 'color') {
                return {
                    ...slide,
                    background: {
                        type: 'color',
                        value: newBackground
                    } as Color
                };
            }
            else {
                return {
                    ...slide,
                    background: {
                        type: 'image',
                        src: newBackground
                    } as Image
                };
            }
        }
        return slide;
    });

    return {
        ...presentation,
        slideList: updatedSlideList
    };
}




const minPresentation: Presentation = {
    title: 'Презентация с минимальными данными',
    slideList: [{
        id: '1',
        background: { type: 'color', value: '#F7F7F7' },
        objects: [],
        selectedObjects: []
    }],
    selectedSlides: ['1'],
}

const maxPresentation: Presentation = {
    title: 'Презентация с максимальными данными',
    slideList: [
        {
            id: '1',
            background: { type: 'color', value: '#F7F7F7' },
            objects: [
                {
                    id: 'obj1',
                    position: { x: 10, y: 20 },
                    size: { h: 100, w: 200 },
                    value: 'Заголовок',
                    fontFamily: 'Arial',
                    textSize: 24,
                    type: 'text',
                },
                {
                    id: 'obj2',
                    position: { x: 20, y: 20 },
                    size: { h: 150, w: 300 },
                    value: 'Текст',
                    fontFamily: 'Calibri',
                    textSize: 12,
                    type: 'text',
                },
            ],
            selectedObjects: [],
        },
        {
            id: '2',
            background: { type: 'image', src: '../../images/backgrounds/mountains.png' },
            objects: [
                {
                    id: 'obj3',
                    position: { x: 10, y: 20 },
                    size: { h: 500, w: 500 },
                    src: '../../images/image1.png',
                    type: 'image',
                },
                {
                    id: 'obj4',
                    position: { x: 20, y: 20 },
                    size: { h: 150, w: 300 },
                    value: 'Текст',
                    fontFamily: 'Calibri',
                    textSize: 12,
                    type: 'text',
                },
            ],
            selectedObjects: [],
        },
        {
            id: '3',
            background: { type: 'color', value: '#F7F7F7' },
            objects: [],
            selectedObjects: [],
        },
    ],
    selectedSlides: ['2', '3', '1'],
}


function testMinimum() {

    console.log('----------------------------------------TEST MINIMUM----------------------------------------')
    console.log('\n\nchangePresentationTitle() \nold title:', minPresentation.title)
    var tempPresentation: Presentation = changePresentationTitle(minPresentation, 'new title!')
    console.log('\nnew title', tempPresentation.title)

    console.log('\n\addSlide() \nold slideList:', minPresentation.slideList)
    var tempPresentation: Presentation = addSlide(minPresentation, { id: '2', background: { type: 'color', value: '#FFFFFF' }, objects: [], selectedObjects: [] },)
    console.log('\nnew slideList', tempPresentation.slideList)

    var tempPresentation: Presentation = addSlide(minPresentation, { id: '2', background: { type: 'color', value: '#FFFFFF' }, objects: [], selectedObjects: [] },)
    console.log('\n\ndeleteslide() \nold slideList:', tempPresentation.slideList)
    tempPresentation = deleteSlide(tempPresentation, '1')
    console.log('\nnew slideList', tempPresentation.slideList)

    var tempPresentation: Presentation = addSlide(minPresentation, { id: '2', background: { type: 'color', value: '#FFFFFF' }, objects: [], selectedObjects: [] },)
    tempPresentation = addSlide(tempPresentation, { id: '3', background: { type: 'color', value: '#000000' }, objects: [], selectedObjects: [] })
    console.log('\n\nchangeSlidePosition() \nold slideList:', tempPresentation.slideList)
    tempPresentation = changeSlidePosition(tempPresentation, '2', 1)
    console.log('\nnew slideList', tempPresentation.slideList)

    console.log('\n\naddSlideObject() \nold objectList:', minPresentation.slideList[0])
    var tempPresentation: Presentation = addSlideObject(minPresentation, '1',
        {
            id: 'text1',
            position: { x: 10, y: 20 },
            size: { h: 100, w: 200 },
            value: 'Hello, World!',
            fontFamily: 'Arial',
            textSize: 16,
            type: 'text'
        }
    )
    console.log('new objectList:', tempPresentation.slideList[0])

    console.log('\n\naddSlideObject() \nold objectList:', minPresentation.slideList[0])
    var tempPresentation: Presentation = addSlideObject(minPresentation, '1',
        {
            id: 'text1',
            position: { x: 10, y: 20 },
            size: { h: 100, w: 200 },
            value: 'Hello, World!',
            fontFamily: 'Arial',
            textSize: 16,
            type: 'text'
        }
    )
    tempPresentation = deleteSlide(tempPresentation, '1')
    console.log('new objectList:', tempPresentation.slideList[0])

    var tempPresentation: Presentation = addSlideObject(minPresentation, '1',
        {
            id: 'text1',
            position: { x: 10, y: 20 },
            size: { h: 100, w: 200 },
            value: 'Hello, World!',
            fontFamily: 'Arial',
            textSize: 16,
            type: 'text'
        }
    )
    console.log('\n\nchangeObjectPosition() \nold object:', tempPresentation.slideList[0].objects[0].position)
    tempPresentation = changeObjectPosition(tempPresentation, '1', 'text1', { x: 120, y: 300 })
    console.log('new objectList:', tempPresentation.slideList[0].objects[0].position)

    
    var tempPresentation: Presentation = addSlideObject(minPresentation, '1',
        {
            id: 'text1',
            position: { x: 10, y: 20 },
            size: { h: 100, w: 200 },
            value: 'Hello, World!',
            fontFamily: 'Arial',
            textSize: 16,
            type: 'text'
        }
    )
    console.log('\n\nchangeObjectSize() \nold object:', tempPresentation.slideList[0].objects[0].size)
    tempPresentation = changeObjectSize(tempPresentation, '1', 'text1', { h: 120, w: 300 })
    console.log('new object:', tempPresentation.slideList[0].objects[0].size)

    console.log('\n\nchangeTextAreaValue() \nold objectList:', minPresentation.slideList[0])
    var tempPresentation: Presentation = addSlideObject(minPresentation, '1',
        {
            id: 'text1',
            position: { x: 10, y: 20 },
            size: { h: 100, w: 200 },
            value: 'Hello, World!',
            fontFamily: 'Arial',
            textSize: 16,
            type: 'text'
        }
    )
    tempPresentation = changeTextAreaValue(tempPresentation, '1', 'text1', 'Changed Value')
    console.log('new objectList:', tempPresentation.slideList[0].objects)

    console.log('\n\nchangeTextAreaTextSize() \nold objectList:', minPresentation.slideList[0])
    var tempPresentation: Presentation = addSlideObject(minPresentation, '1',
        {
            id: 'text1',
            position: { x: 10, y: 20 },
            size: { h: 100, w: 200 },
            value: 'Hello, World!',
            fontFamily: 'Arial',
            textSize: 16,
            type: 'text'
        }
    )
    tempPresentation = changeTextAreaTextSize(tempPresentation, '1', 'text1', 24)
    console.log('new objectList:', tempPresentation.slideList[0].objects)

    console.log('\n\nchangeTextAreaFontFamily() \nold objectList:', minPresentation.slideList[0])
    var tempPresentation: Presentation = addSlideObject(minPresentation, '1',
        {
            id: 'text1',
            position: { x: 10, y: 20 },
            size: { h: 100, w: 200 },
            value: 'Hello, World!',
            fontFamily: 'Arial',
            textSize: 16,
            type: 'text'
        }
    )
    tempPresentation = changeTextAreaFontFamily(tempPresentation, '1', 'text1', 'Times NewRoman')
    console.log('new objectList:', tempPresentation.slideList[0].objects)
}

function testMaximum() {
    console.log('----------------------------------------TEST MAXIMUM----------------------------------------')

    console.log('\n\nchangePresentationTitle() \nold title:', maxPresentation.title)
    var tempPresentation: Presentation = changePresentationTitle(maxPresentation, 'new title!')
    console.log('\nnew title', tempPresentation.title)

    console.log('\n\addSlide() \nold slideList:', maxPresentation.slideList)
    var tempPresentation: Presentation = addSlide(maxPresentation, { id: '2', background: { type: 'color', value: '#FFFFFF' }, objects: [], selectedObjects: [] },)
    console.log('\nnew slideList', tempPresentation.slideList)

    var tempPresentation: Presentation = addSlide(maxPresentation, { id: '2', background: { type: 'color', value: '#FFFFFF' }, objects: [], selectedObjects: [] },)
    console.log('\n\ndeleteslide() \nold slideList:', tempPresentation.slideList)
    tempPresentation = deleteSlide(tempPresentation, '1')
    console.log('\nnew slideList', tempPresentation.slideList)

    var tempPresentation: Presentation = addSlide(maxPresentation, { id: '2', background: { type: 'color', value: '#FFFFFF' }, objects: [], selectedObjects: [] },)
    tempPresentation = addSlide(tempPresentation, { id: '3', background: { type: 'color', value: '#000000' }, objects: [], selectedObjects: [] })
    console.log('\n\nchangeSlidePosition() \nold slideList:', tempPresentation.slideList)
    tempPresentation = changeSlidePosition(tempPresentation, '2', 1)
    console.log('\nnew slideList', tempPresentation.slideList)

    console.log('\n\naddSlideObject() \nold objectList:', maxPresentation.slideList[0])
    var tempPresentation: Presentation = addSlideObject(maxPresentation, '1',
        {
            id: 'text1',
            position: { x: 10, y: 20 },
            size: { h: 100, w: 200 },
            value: 'Hello, World!',
            fontFamily: 'Arial',
            textSize: 16,
            type: 'text'
        }
    )
    console.log('new objectList:', tempPresentation.slideList[0])

    console.log('\n\naddSlideObject() \nold objectList:', maxPresentation.slideList[0])
    var tempPresentation: Presentation = addSlideObject(maxPresentation, '1',
        {
            id: 'text1',
            position: { x: 10, y: 20 },
            size: { h: 100, w: 200 },
            value: 'Hello, World!',
            fontFamily: 'Arial',
            textSize: 16,
            type: 'text'
        }
    )
    tempPresentation = deleteSlide(tempPresentation, '1')
    console.log('new objectList:', tempPresentation.slideList[0])

    var tempPresentation: Presentation = addSlideObject(maxPresentation, '1',
        {
            id: 'text1',
            position: { x: 10, y: 20 },
            size: { h: 100, w: 200 },
            value: 'Hello, World!',
            fontFamily: 'Arial',
            textSize: 16,
            type: 'text'
        }
    )
    console.log('\n\nchangeObjectPosition() \nold object:', tempPresentation.slideList[0].objects[0].position)
    tempPresentation = changeObjectPosition(tempPresentation, '1', 'text1', { x: 120, y: 300 })
    console.log('new objectList:', tempPresentation.slideList[0].objects[0].position)

    
    var tempPresentation: Presentation = addSlideObject(maxPresentation, '1',
        {
            id: 'text1',
            position: { x: 10, y: 20 },
            size: { h: 100, w: 200 },
            value: 'Hello, World!',
            fontFamily: 'Arial',
            textSize: 16,
            type: 'text'
        }
    )
    console.log('\n\nchangeObjectSize() \nold object:', tempPresentation.slideList[0].objects[0].size)
    tempPresentation = changeObjectSize(tempPresentation, '1', 'text1', { h: 120, w: 300 })
    console.log('new object:', tempPresentation.slideList[0].objects[0].size)

    console.log('\n\nchangeTextAreaValue() \nold objectList:', maxPresentation.slideList[0])
    var tempPresentation: Presentation = addSlideObject(maxPresentation, '1',
        {
            id: 'text1',
            position: { x: 10, y: 20 },
            size: { h: 100, w: 200 },
            value: 'Hello, World!',
            fontFamily: 'Arial',
            textSize: 16,
            type: 'text'
        }
    )
    tempPresentation = changeTextAreaValue(tempPresentation, '1', 'text1', 'Changed Value')
    console.log('new objectList:', tempPresentation.slideList[0].objects)

    console.log('\n\nchangeTextAreaTextSize() \nold objectList:', maxPresentation.slideList[0])
    var tempPresentation: Presentation = addSlideObject(maxPresentation, '1',
        {
            id: 'text1',
            position: { x: 10, y: 20 },
            size: { h: 100, w: 200 },
            value: 'Hello, World!',
            fontFamily: 'Arial',
            textSize: 16,
            type: 'text'
        }
    )
    tempPresentation = changeTextAreaTextSize(tempPresentation, '1', 'text1', 24)
    console.log('new objectList:', tempPresentation.slideList[0].objects)

    console.log('\n\nchangeTextAreaFontFamily() \nold objectList:', maxPresentation.slideList[0])
    var tempPresentation: Presentation = addSlideObject(maxPresentation, '1',
        {
            id: 'text1',
            position: { x: 10, y: 20 },
            size: { h: 100, w: 200 },
            value: 'Hello, World!',
            fontFamily: 'Arial',
            textSize: 16,
            type: 'text'
        }
    )
    tempPresentation = changeTextAreaFontFamily(tempPresentation, '1', 'text1', 'Times NewRoman')
    console.log('new objectList:', tempPresentation.slideList[0].objects)
}



testMinimum()
testMaximum()

export {
    changePresentationTitle,
    addSlide,
    deleteSlide,
    changeSlidePosition,
    addSlideObject,
    deleteSlideObject,
    changeObjectPosition,
    changeObjectSize,
    changeTextAreaValue,
    changeTextAreaTextSize,
    changeTextAreaFontFamily,
    changeSlideBackground
}