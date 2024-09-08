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
function updateSlidePosition (presentation: Presentation, slideId: String, newPosition: number): Presentation {
    const currentIndex = presentation.slideList.findIndex(slide => slide.id == slideId)
    if (currentIndex == -1) {
        console.log('Слайд с указаным id не найден.')
        return presentation
    }

    const movedSlideArray = presentation.slideList.splice(currentIndex, 1)
    presentation.slideList.splice(newPosition, 0, movedSlideArray[0])
}