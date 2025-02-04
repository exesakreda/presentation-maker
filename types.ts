type Slide = {
    id: string,
    background: Background,
    objects: SlideObject[],
}

type SlideObject = TextArea | ImageArea | Shape

type Background = Color | Image | Gradient

type Color = {
    type: 'color',
    value: string
}

type Image = {
    type: 'image',
    src: string
}

type Gradient = {
    type: 'gradient',
    direction: number;
    colors: {
        color: string,
        position: number
    }[]
}

type CommonObject = {
    id: string,
    position: Position,
    size: Size,
}

type Position = {
    x: number,
    y: number,
}

type Size = {
    h: number,
    w: number,
}

type TextArea = CommonObject & {
    value: string,
    type: 'text',
    font: {
        weight: number,
        fontFamily: string,
        size: number,
        color: string
    }
}

type ImageArea = CommonObject & {
    src: string,
    type: 'image',
    aspectRatio: number
}

type Shape = CommonObject & {
    type: 'shape',
    shapeType: 'rectangle' | 'circle'
}

type Tool =
    | { type: 'cursor' }
    | { type: 'text' }
    | { type: 'image' }
    | { type: 'shape'; shapeType: 'circle' | 'rectangle' | 'triangle' | null }


type Notification = {
    id: string,
    type: 'error' | 'success',
    message: string,
    info?: string,
}

type HistoryState = {
    undoable: PresentationRecordState[],
    redoable: PresentationRecordState[]
}

type PresentationState = {
    title: string,
    slideList: Slide[],
    selection: {
        slides: string[],
        objects: string[]
    },
    history: HistoryState
}

// запись в истории состояний 
type PresentationRecordState = {
    title: string,
    slideList: Slide[],
    selection: {
        slides: string[],
        objects: string[]
    }
}

// текущее состояние (все поля) 
type AppState = {
    presentation: {
        title: string,
        slideList: Slide[],
        selection: {
            slides: string[],
            objects: string[]
        },
        history: HistoryState
    },
    notifications: Notification[],
    tool: Tool
}

// для обмена с localStorage.  
// При загрузке поля CurrentState заполняются из этого типа, недостающие обнуляются (реализация ниже) 
type StoredPresentationState = {
    title: string,
    slideList: Slide[],
    selectedSlides: string[],
    history: HistoryState
}

export type {
    Slide,
    SlideObject,
    Background,
    Color,
    Image,
    Shape,
    CommonObject,
    Position,
    Size,
    TextArea,
    ImageArea,
    Tool,
    Notification,
    PresentationState,
    PresentationRecordState,
    AppState,
    StoredPresentationState,
    HistoryState,
    Gradient
}