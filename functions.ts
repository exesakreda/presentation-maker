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





function testMinimum() {
    let presentation: Presentation = {
        title: 'test minimum',
        slideList: [],
        selectedSlides: []
    }

    const slides: Slide[] = [
        { id: '1', background: { type: 'color', value: '#FFFFFF'}, objects: [], selectedObjects: [] },
        { id: '2', background: { type: 'color', value: '#000000' }, objects: [], selectedObjects: [] },
        { id: '3', background: { type: 'image', src: '/icons/icon1.svg' }, objects: [], selectedObjects: [] }
    ]

    const textObject: TextArea = {
        id: 'text1',
        position: { x: 10, y: 20 },
        size: { h: 100, w: 200 },
        value: 'Hello, World!',
        fontFamily: 'Arial',
        textSize: 16,
        type: 'text'
    }

    console.log('\nchangePresentationTitle()')
    console.log('old title:', presentation.title)
    presentation = changePresentationTitle(presentation, 'changed title')
    console.log('new title:', presentation.title)

    console.log('\n\n\naddSlide()')
    console.log('old slideList:', presentation.slideList)
    slides.forEach(slide => {
        presentation = addSlide(presentation, slide)
    })
    console.log('new slideList:', presentation.slideList)

    console.log('\n\n\ndeleteSlide()')
    console.log('old slideList:', presentation.slideList)
    presentation = deleteSlide(presentation, '1')
    console.log('new slideList:', presentation.slideList)

    console.log('\n\n\nchangeSlidePosition()')
    console.log('old slideList:', presentation.slideList)
    presentation = changeSlidePosition(presentation, '3', 0)
    console.log('new slideList:', presentation.slideList)

    console.log('\n\n\naddSlideObject()')
    console.log('old slide objects:', presentation.slideList[1].objects)
    presentation = addSlideObject(presentation, '2', textObject)
    console.log('new slide objects:', presentation.slideList[1].objects)

    console.log('\n\n\naddSlideObject()')
    console.log('old slide objects:', presentation.slideList[1].objects)
    presentation = deleteSlideObject(presentation, '2', 'text1')
    console.log('new slide objects:', presentation.slideList[1].objects)
    presentation = addSlideObject(presentation, '2', textObject)

    console.log('\n\n\nchangeTextAreaValue()')
    const oldTextArea = presentation.slideList.find(slide => slide.id === '2')?.objects.find(textarea => textarea.id === 'text1') as TextArea
    console.log('old text area value:', oldTextArea.value)
    presentation = changeTextAreaValue(presentation, '2', 'text1', 'new text')
    const newTextArea = presentation.slideList.find(slide => slide.id === '2')?.objects.find(textarea => textarea.id === 'text1') as TextArea
    console.log('new text area value:', newTextArea.value)
    

    console.log('\n\n\nchangeObjectSize()')
    console.log('old object size:', presentation.slideList.find(slide => slide.id === '2')?.objects.find(textarea => textarea.id === 'text1') as TextArea)
    presentation = changeObjectSize(presentation, '2', 'text1', {h: 150, w: 150})
    console.log('new object size:', presentation.slideList.find(slide => slide.id === '2')?.objects.find(textarea => textarea.id === 'text1') as TextArea)
    
    console.log('\nchangeTextAreaTextSize()')
    const oldTextSize = presentation.slideList[1].objects.find(obj => obj.id === 'text1') as TextArea
    console.log('old textSize:', oldTextSize.textSize)
    presentation = changeTextAreaTextSize(presentation, '2', 'text1', 24)
    const newTextSize = presentation.slideList[1].objects.find(obj => obj.id === 'text1') as TextArea
    console.log('new textSize:', newTextSize.textSize)

    console.log('\nchangeTextAreaFontFamily():')
    const oldFontFamily = presentation.slideList[1].objects.find(obj => obj.id === 'text1') as TextArea
    console.log('old ff:', oldFontFamily.fontFamily)
    presentation = changeTextAreaFontFamily(presentation, '2', 'text1', 'Verdana')
    const newFontFamily = presentation.slideList[1].objects.find(obj => obj.id === 'text1') as TextArea
    console.log('new ff:', newFontFamily.fontFamily)

    console.log('\nchangeSlideBackground()')
    const oldSlide = presentation.slideList.find(slide => slide.id === '3')?.background
    console.log('old slide bg:', oldSlide)
    presentation = changeSlideBackground(presentation, '3', 'image', '/images/image1.png')
    const newSlide = presentation.slideList.find(slide => slide.id === '3')?.background
    console.log('new slide bg:', newSlide)

    console.log()
}

function testMaximum() {
    let presentation: Presentation = {
        title: 'test maximum',
        slideList: [
            { 
                id: '1', 
                background: { type:'color', value: '#FFFFFF' }, 
                objects: [
                    { 
                        id: '1', 
                        position: { x: 100, y: 50 }, 
                        size: { h: 100, w: 100 }, 
                        value: 'Sample Text', 
                        fontFamily: 'Arial', 
                        textSize: 14, 
                        type: 'text' 
                    } as TextArea,
                    { 
                        id: '2', 
                        position: { x: 300, y: 150 }, 
                        size: { h: 120, w: 80 }, 
                        value: 'Sample Text 2', 
                        fontFamily: 'Arial', 
                        textSize: 14, 
                        type: 'text' 
                    } as TextArea,
                ],
                selectedObjects: [],
            },
            { 
                id: '3', 
                background: { type: 'image', src: '/icons/icon1.svg' }, 
                objects: [
                    {
                        id: 'text5',
                        position: { x: 10, y: 20 },
                        size: { h: 100, w: 200 },
                        value: 'Hello, World!',
                        fontFamily: 'Arial',
                        textSize: 16,
                        type: 'text'
                    },
                    {
                        id: 'text4',
                        position: { x: 10, y: 20 },
                        size: { h: 100, w: 200 },
                        value: 'Hello, World! HELLO!',
                        fontFamily: 'Arial',
                        textSize: 16,
                        type: 'text'
                    }
                ],
                selectedObjects: []
            }
        ],
        selectedSlides: []
    }

    const slides: Slide[] = [
        { id: '4', background: { type:'color', value: '#000000' }, objects: [], selectedObjects: [] },
        { id: '5', background: { type:'image', src: '/icons/icon1.svg' }, objects: [], selectedObjects: [] }
    ]

    const textObject: TextArea = {
        id: 'text1',
        position: { x: 10, y: 20 },
        size: { h: 100, w: 200 },
        value: 'Hello, World!',
        fontFamily: 'Arial',
        textSize: 16,
        type: 'text'
    }

    console.log('\nchangePresentationTitle()')
    console.log('old title:', presentation.title)
    presentation = changePresentationTitle(presentation, 'changed title')
    console.log('new title:', presentation.title)

    console.log('\n\n\naddSlide()')
    console.log('old slideList:', presentation.slideList)
    slides.forEach(slide => {
        presentation = addSlide(presentation, slide)
    })
    console.log('new slideList:', presentation.slideList)

    console.log('\n\n\ndeleteSlide()')
    console.log('old slideList:', presentation.slideList)
    presentation = deleteSlide(presentation, '1')
    console.log('new slideList:', presentation.slideList)

    console.log('\n\n\nchangeSlidePosition()')
    console.log('old slideList:', presentation.slideList)
    presentation = changeSlidePosition(presentation, '3', 0)
    console.log('new slideList:', presentation.slideList)

    console.log('\n\n\naddSlideObject()')
    console.log('old slide objects:', presentation.slideList[1].objects)
    presentation = addSlideObject(presentation, '2', textObject)
    console.log('new slide objects:', presentation.slideList[1].objects)

    console.log('\n\n\ndeleteSlideObject()')
    console.log('old slide objects:', presentation.slideList[1].objects)
    presentation = deleteSlideObject(presentation, '2', 'text1')
    console.log('new slide objects:', presentation.slideList[1].objects)
    presentation = addSlideObject(presentation, '2', textObject)

    console.log('\n\n\nchangeTextAreaValue()')
    const oldTextArea = presentation.slideList.find(slide => slide.id === '2')?.objects.find(textarea => textarea.id === 'text1') as TextArea
    console.log('old text area value:', oldTextArea.value)
    presentation = changeTextAreaValue(presentation, '2', 'text1', 'new text')
    const newTextArea = presentation.slideList.find(slide => slide.id === '2')?.objects.find(textarea => textarea.id === 'text1') as TextArea
    console.log('new text area value:', newTextArea.value)

    console.log('\n\n\nchangeObjectSize()')
    const oldSize = presentation.slideList.find(slide => slide.id === '2')?.objects.find(textarea => textarea.id === 'text1') as TextArea
    console.log('old object size:', oldSize.size)
    presentation = changeObjectSize(presentation, '2', 'text1', {h: 150, w: 200})
    const newSize = presentation.slideList.find(slide => slide.id === '2')?.objects.find(textarea => textarea.id === 'text1') as TextArea
    console.log('new object size:', newSize.size)

    console.log('\nchangeTextAreaTextSize()')
    const oldTextSize = presentation.slideList.find(slide => slide.id === '2')?.objects.find(textarea => textarea.id === 'text1') as TextArea
    console.log('old textSize:', oldTextSize.textSize)
    presentation = changeTextAreaTextSize(presentation, '2', 'text1', 24)
    const newTextSize = presentation.slideList.find(slide => slide.id === '2')?.objects.find(textarea => textarea.id === 'text1') as TextArea
    console.log('new textSize:', newTextSize.textSize)

    console.log('\nchangeTextAreaFontFamily()')
    const oldFontFamily = presentation.slideList.find(slide => slide.id === '2')?.objects.find(textarea => textarea.id === 'text1') as TextArea
    console.log('old fontFamily:', oldFontFamily.fontFamily)
    presentation = changeTextAreaFontFamily(presentation, '2', 'text1', 'Verdana')
    const newFontFamily = presentation.slideList.find(slide => slide.id === '2')?.objects.find(textarea => textarea.id === 'text1') as TextArea
    console.log('new fontFamily:', newFontFamily.fontFamily)

    console.log('\nchangeSlideBackground()')
    const oldBackground = presentation.slideList.find(slide => slide.id === '3')?.background
    console.log('old slide bg:', oldBackground)
    presentation = changeSlideBackground(presentation, '3', 'image', '/images/image1.png')
    const newBackground = presentation.slideList.find(slide => slide.id === '3')?.background
    console.log('new slide bg:', newBackground)

    console.log()
}

testMaximum()


// testMinimum()

