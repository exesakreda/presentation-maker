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
                    id: 'text1',
                    position: { x: 10, y: 20 },
                    size: { h: 100, w: 200 },
                    value: 'Заголовок',
                    fontFamily: 'Arial',
                    textSize: 24,
                    type: 'text',
                },
                {
                    id: 'text2',
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
    ],
    selectedSlides: ['2', '1'],
}


function testMinimum() {
    console.log('\n\n\n----------------------------------------TEST MINIMUM----------------------------------------')

    console.log('\n\n----------changePresentationTitle()----------\nold title:', minPresentation.title)
    const newTitlePresentation: Presentation = changePresentationTitle(minPresentation, 'new title!')
    console.log('new title:', newTitlePresentation.title)

    console.log('\n\n----------addSlide()---------- \nold slideList:', minPresentation.slideList)
    const addedSlidePresentation: Presentation = addSlide(minPresentation, { id: '2', background: { type: 'color', value: '#FFFFFF' }, objects: [], selectedObjects: [] },)
    console.log('new slideList:', addedSlidePresentation.slideList)

    console.log('\n\n----------deleteSlide()----------')
    console.log('old slideList:', minPresentation.slideList)
    const deletedSlidePresentation = deleteSlide(minPresentation, '1')
    console.log('new slideList:', deletedSlidePresentation.slideList)

    console.log('\n\n----------changeSlidePosition()----------')
    const changeSlidePositionInitPres: Presentation = {
        ...minPresentation,
        slideList: [
            {
                id: '1',
                background: { type: 'color', value: '#F7F7F7' },
                objects: [],
                selectedObjects: []
            },
            {
                id: '2',
                background: { type: 'color', value: '#000000' },
                objects: [],
                selectedObjects: []
            }
        ]
    }
    
    console.log('old slideList:', changeSlidePositionInitPres.slideList)
    const changedSlidePosPresentation = changeSlidePosition(changeSlidePositionInitPres, '2', 0)
    console.log('new slideList:', changedSlidePosPresentation.slideList)


    console.log('\n\n----------addSlideObject()---------- \nold objectList:', minPresentation.slideList[0])
    const addedSlideObjPresentation: Presentation = addSlideObject(minPresentation, '1',
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
    console.log('new objectList:', addedSlideObjPresentation.slideList[0])


    console.log('\n\n----------changeObjectPosition()----------')
    const changeObjectPositionInitPres: Presentation = {
        ...minPresentation,
        slideList: [{
            id: '1',
            background: { type: 'color', value: '#F7F7F7' },
            objects: [
                {
                    id: 'obj3',
                    position: { x: 10, y: 20 },
                    size: { h: 500, w: 500 },
                    src: '../../images/image1.png',
                    type: 'image',
                }
            ],
            selectedObjects: []
        }]
    }
    console.log('old object:', changeObjectPositionInitPres.slideList[0].objects[0].position)
    const changedObjectPosPresentation = changeObjectPosition(changeObjectPositionInitPres, '1', 'text1', { x: 120, y: 300 })
    console.log('new object:', changedObjectPosPresentation.slideList[0].objects[0].position)


    console.log('\n\n----------changeObjectSize()----------')
    const changeObjectSizeInitPres: Presentation = {
        ...minPresentation,
        slideList: [
            {
                id: '1',
                background: { type: 'color', value: '#F7F7F7' },
                objects: [
                    {
                        id: 'obj3',
                        position: { x: 10, y: 20 },
                        size: { h: 500, w: 500 },
                        src: '../../images/image1.png',
                        type: 'image',
                    }
                ],
                selectedObjects: []
            }
        ] 
    }
    console.log('old object:', changeObjectSizeInitPres.slideList[0].objects[0].size)
    const changedObjectSizePresentation = changeObjectSize(changeObjectSizeInitPres, '1', 'text1', { h: 120, w: 300 })
    console.log('new object:', changedObjectSizePresentation.slideList[0].objects[0].size)



    console.log('\n\n----------changeTextAreaValue()---------- \nold object:')
    const changeTextAreaValueInitPres: Presentation = {
        ...minPresentation,
        slideList: [
            {
                id: '1',
                background: { type: 'color', value: '#F7F7F7' },
                objects: [
                    {
                        id: 'text1',
                        position: { x: 10, y: 20 },
                        size: { h: 100, w: 200 },
                        value: 'Hello, World!',
                        fontFamily: 'Arial',
                        textSize: 16,
                        type: 'text'
                    }
                ],
                selectedObjects: []
            }
        ],
    }
    console.log(changeTextAreaValueInitPres.slideList[0].objects[0])
    const changedTextAreaValuePresentation = changeTextAreaValue(changeTextAreaValueInitPres, '1', 'text1', 'Changed Value')
    console.log('new object:', changedTextAreaValuePresentation.slideList[0].objects[0])


    console.log('\n\n----------changeTextAreaTextSize()---------- \nold objectList:')
    const changeTextAreaTextSizeInitPres: Presentation = {
        ...minPresentation,
        slideList: [
            {
                id: '1',
                background: { type: 'color', value: '#F7F7F7' },
                objects: [
                    {
                        id: 'text1',
                        position: { x: 10, y: 20 },
                        size: { h: 100, w: 200 },
                        value: 'Hello, World!',
                        fontFamily: 'Arial',
                        textSize: 16,
                        type: 'text'
                    }
                ],
                selectedObjects: []
            }
        ],
    }
    console.log(changeTextAreaTextSizeInitPres.slideList[0].objects[0])
    const changedTextAreaTexiSizePresentation = changeTextAreaTextSize(changeTextAreaTextSizeInitPres, '1', 'text1', 24)
    console.log('new objectList:', changedTextAreaTexiSizePresentation.slideList[0].objects[0])

    console.log('\n\n----------changeTextAreaFontFamily()---------- \nold objectList:')
    const changeTextAreaFontFamilyInitPres: Presentation = {
        ...minPresentation,
        slideList: [
            {
                id: '1',
                background: { type: 'color', value: '#F7F7F7' },
                objects: [
                    {
                        id: 'text1',
                        position: { x: 10, y: 20 },
                        size: { h: 100, w: 200 },
                        value: 'Hello, World!',
                        fontFamily: 'Arial',
                        textSize: 16,
                        type: 'text'
                    }
                ],
                selectedObjects: []
            }
        ]
    }
    console.log(changeTextAreaFontFamilyInitPres.slideList[0].objects[0])
    const changedTextAreaFontFamilyPresentation = changeTextAreaFontFamily(changeTextAreaFontFamilyInitPres, '1', 'text1', 'Times New Roman')
    console.log('new objectList:', changedTextAreaFontFamilyPresentation.slideList[0].objects[0])

    console.log('\n\n----------changeSlideBackground()----------')
    console.log('old slide bg:', minPresentation.slideList[0].background)
    const changedSlideBackgroundPresentation = changeSlideBackground(minPresentation, '1', 'color', '#FF0000')
    console.log('new slide bg:', changedSlideBackgroundPresentation.slideList[0].background)
}



function testMaximum() {
    console.log('\n\n\n----------------------------------------TEST MAXIMUM----------------------------------------')
    console.log('\n\n----------changePresentationTitle()n----------\nold title:', maxPresentation.title)
    const newTitlePresentation: Presentation = changePresentationTitle(maxPresentation, 'new title!')
    console.log('new title:', newTitlePresentation.title)


    console.log('\n\n----------addSlide()---------- \nold slideList:', maxPresentation.slideList)
    const addedSlidePresentation: Presentation = addSlide(maxPresentation, { id: '3', background: { type: 'color', value: '#FFFFFF' }, objects: [], selectedObjects: [] },)
    console.log('new slideList', addedSlidePresentation.slideList)


    console.log('\n\n----------deleteSlide()----------')
    console.log('old slideList:', maxPresentation.slideList)
    const deletedSlidePresentation = deleteSlide(maxPresentation, '1')
    console.log('new slideList', deletedSlidePresentation.slideList)


    console.log('\n\n----------changeSlidePosition()----------')
    console.log('old slideList:', maxPresentation.slideList)
    const changedSlidePosPresentation = changeSlidePosition(maxPresentation, '2', 0)
    console.log('new slideList', changedSlidePosPresentation.slideList)


    console.log('\n\n----------addSlideObject()---------- \nold objectList:', maxPresentation.slideList[0].objects)
    const addedSlideObjPresentation: Presentation = addSlideObject(maxPresentation, '1',
        {
            id: 'text3',
            position: { x: 10, y: 20 },
            size: { h: 100, w: 200 },
            value: 'HI, World!',
            fontFamily: 'Arial',
            textSize: 16,
            type: 'text'
        }
    )
    console.log('new objectList:', addedSlideObjPresentation.slideList[0].objects)


    console.log('\n\n----------changeObjectPosition()----------')
    console.log('old object:', maxPresentation.slideList[0].objects[0].position)
    const changedObjectPosPresentation = changeObjectPosition(maxPresentation, '1', 'text1', { x: 100, y: 350 })
    console.log('new object:', changedObjectPosPresentation.slideList[0].objects[0].position)


    console.log('\n\n----------changeObjectSize()----------')
    console.log('old object:', maxPresentation.slideList[0].objects[0].size)
    const changedObjectSizePresentation = changeObjectSize(maxPresentation, '1', 'text1', { h: 120, w: 300 })
    console.log('new object:', changedObjectSizePresentation.slideList[0].objects[0].size)


    console.log('\n\n----------changeTextAreaValue()---------- \nold object:')
    console.log(maxPresentation.slideList[0].objects[0])
    const changedTextAreaValuePresentation = changeTextAreaValue(maxPresentation, '1', 'text1', 'Changed Value')
    console.log('new object:', changedTextAreaValuePresentation.slideList[0].objects[0])


    console.log('\n\n----------changeTextAreaTextSize()---------- \nold objectList:')
    console.log(maxPresentation.slideList[0].objects[0])
    const changedTextAreaTexiSizePresentation = changeTextAreaTextSize(maxPresentation, '1', 'text1', 32)
    console.log('new objectList:', changedTextAreaTexiSizePresentation.slideList[0].objects[0])

    console.log('\n\n----------changeTextAreaFontFamily()---------- \nold objectList:')
    console.log(maxPresentation.slideList[0].objects[0])
    const changedTextAreaFontFamilyPresentation = changeTextAreaFontFamily(maxPresentation, '1', 'text1', 'Times New Roman')
    console.log('new objectList:', changedTextAreaFontFamilyPresentation.slideList[0].objects[0])

    console.log('\n\n----------changeSlideBackground()----------')
    console.log('old slide bg:', maxPresentation.slideList[0].background)
    const changedSlideBackgroundPresentation = changeSlideBackground(maxPresentation, '1', 'image', '../images/black_background.png')
    console.log('new slide bg:', changedSlideBackgroundPresentation.slideList[0].background)
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