import { text } from "stream/consumers"

// Изменение названия презентации
function rename (presentation: Presentation, newTitle: string): Presentation {
    return {
        ...presentation,
        title: newTitle,
    }
}

// Создание слайда
function createSlide (presentation: Presentation, newSlide: Slide): Presentation {
    return {
        ...presentation,
        slideList: [...presentation.slideList, newSlide]
    }
}

// Удаление слайда
function deleteSlide (presentation: Presentation, slideId: string): Presentation {
    return {
        ...presentation,
        slideList: presentation.slideList.filter(slide => slide.id !== slideId)
    }
}

// Изменение позиции слайда
function changeSlidePosition (presentation: Presentation, slideId: string, newIndex: number): Presentation {
    const updatedSlideList = [...presentation.slideList]
    
    const oldIndex = updatedSlideList.findIndex(slide => slide.id == slideId)
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
function createSlideObject(presentation: Presentation, slideId: string, newObject: SlideObject): Presentation {
    const updatedSlideList = presentation.slideList.map(slide => {
        if (slide.id == slideId) {
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
        if (slide.id == slideId) {
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
function changeObjectPosition(presentation: Presentation, slideId: string, objectId: string, newPositionX: number, newPositionY: number): Presentation {
    const updatedSlideList = presentation.slideList.map(slide => {
        if (slide.id == slideId) {
            const updatedSlideObjects = slide.objects.map(object => {
                if (object.id == objectId) {
                    object.position.x = newPositionX
                    object.position.y = newPositionY
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
        if (slide.id == slideId) {
            const updatedSlideObjects = slide.objects.map(object => {
                if (object.id == objectId) {
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
        if (slide.id == slideId) {
            const updatedSlideObjects = slide.objects.map(object => {
                if (object.id == objectId) {
                    return {
                        ...object,
                        value: newValue
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

// Изменение размера текста
function changeTextAreaTextSize(presentation: Presentation, slideId: string, objectId: string, newTextSize: string): Presentation {
    const updatedSlideList = presentation.slideList.map(slide => {
        if (slide.id == slideId) {
            const updatedSlideObjects = slide.objects.map(object => {
                if (object.id == objectId) {
                    return {
                        ...object,
                        textSize: newTextSize
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

// Изменение шрифта текста
function changeTextAreaFontFamily(presentation: Presentation, slideId: string, objectId: string, newFontFamily: string): Presentation {
    const updatedSlideList = presentation.slideList.map(slide => {
        if (slide.id == slideId) {
            const updatedSlideObjects = slide.objects.map(object => {
                if (object.id == objectId) {
                    return {
                        ...object,
                        fontFamily: newFontFamily
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

// Изменение фона слайда