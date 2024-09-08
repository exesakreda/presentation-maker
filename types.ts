type Presentation = {
    title: string,               // Заголовок презентации
    slideList: Slide[],          // Массив слайдов
}

type Slide = {
    id: string,                  // Уникальный идентификатор слайда
    backgroundColor: string,     // Цвет фона слайда
    elementsList: SlideElement[], // Массив элементов слайда
}

type SlideElement = {
    id: string,                  // Уникальный идентификатор элемента
    type: ElementType,           // Тип элемента (textarea, figure, image)
    x: number,                   // Координата X элемента на слайде
    y: number,                   // Координата Y элемента на слайде
    height: number,              // Высота элемента
    width: number,               // Ширина элемента
}

type ElementType = 'textarea' | 'figure' | 'image'  // Возможные типы элемента
type FigureType = 'rectangle' | 'circle' | 'triangle' // Возможные типы фигуры
// Дополнительные стили для текстовых полей
type TextStyling = 'bold' | 'italic' | 'underlined'

// Текстовое поле
type TextArea = SlideElement & {
    color: string,               // Цвет текста
    backgroundColor: string,     // Цвет фона текстового поля
    font: string,                // Шрифт текста
    textSize: number,            // Размер текста
    styling: TextStyling,        // Стиль текста (жирный, курсив, подчёркнутый)
}

// Фигура
type Figure = SlideElement & {
    color: string,               // Цвет фигуры
    borderWidth: number,         // Толщина границы фигуры
    borderColor: string,         // Цвет границы фигуры
}

// Изображение
type Image = SlideElement & {
    source: string,              // Источник изображения (URL или путь к файлу)
}

// Выделенные элементы
type SelectedElements = {
    idList: number[],            // Массив уникальных идентификаторов выделенных элементов
    amount: number,              // Количество выделенных элементов
}
