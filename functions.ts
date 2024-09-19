import { Presentation, Slide, Position, SlideObject, TextArea } from "./types"

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
                    object.position.x = newPosition.x
                    object.position.y = newPosition.y
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
function changeObjectSize(presentation: Presentation, slideId: string, objectId: string, newHeight: number, newWidth: number): Presentation {
    const updatedSlideList = presentation.slideList.map(slide => {
        if (slide.id === slideId) {
            const updatedSlideObjects = slide.objects.map(object => {
                if (object.id === objectId) {
                    object.size.h = newHeight
                    object.size.w = newWidth
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
                if (object.id === objectId) {
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
function changeSlideBackground(presentation: Presentation, slideId: string, newBackgroundType: string, newBackground: string): Presentation {
    const updatedSlideList = presentation.slideList.map(slide => {
        if (slide.id === slideId) {
            if (newBackgroundType === 'Color') {
                slide.background = { src: '' }
                return {
                    ...slide,
                    background: { value: newBackground }
                }
            } else if (newBackgroundType === 'Image') {
                slide.background = { value: '' }
                return {
                    ...slide, 
                    background: { src: newBackground }
                }
            }
        }
        return slide
    })
    return {
        ...presentation,
        slideList: updatedSlideList
    }
}




function testMinimum() {
    let presentation: Presentation = {
        title: 'test minimum',
        slideList: [],
        selectedSlides: []
    }

    const slides: Slide[] = [
        { id: '1', background: { value: '#FFFFFF' }, objects: [] },
        { id: '2', background: { value: '#000000' }, objects: [] },
        { id: '3', background: { src: '/icons/icon1.svg' }, objects: [] }
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
    presentation = changeObjectSize(presentation, '2', 'text1', 150, 300)
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
    presentation = changeSlideBackground(presentation, '3', 'Image', '/images/image1.png')
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
                background: { value: '#FFFFFF' }, 
                objects: [
                    { 
                        id: '1', 
                        position: { x: 100, y: 50 }, 
                        size: { h: 100, w: 100 }, 
                        value: 'Sample Text', 
                        fontFamily: 'Arial', 
                        textSize: 14, 
                        type: 'text' 
                    } as TextArea 
                ] 
            },
            { 
                id: '2', 
                background: { src: '/icons/icon1.svg' }, 
                objects: [] 
            }
        ],
        selectedSlides: []
    }

    const slides: Slide[] = [
        { id: '3', background: { value: '#FFFFFF' }, objects: [] },
        { id: '4', background: { value: '#000000' }, objects: [] },
        { id: '5', background: { src: '/icons/icon1.svg' }, objects: [] }
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
    presentation = changeObjectSize(presentation, '2', 'text1', 150, 300)
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
    presentation = changeSlideBackground(presentation, '3', 'Image', '/images/image1.png')
    const newBackground = presentation.slideList.find(slide => slide.id === '3')?.background
    console.log('new slide bg:', newBackground)

    console.log()
}

testMaximum()


// testMinimum()

