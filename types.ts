type Presentation = {
    title: string,
    slideList: Slide[]
}

type Slide = {
    id: string,
    background: Background,
    objects: SlideObject[],
}

type SlideObject = TextArea | ImageArea

type Background = Color | Image

type Color = {
    type: 'color',
    value: string
}

type Image = {
    type: 'image',
    src: string
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
        size: number
    }
}

type ImageArea = CommonObject & {
    src: string,
    type: 'image',
    aspectRatio: number
}

type Tool = 
  | { type: 'cursor' }
  | { type: 'text' }
  | { type: 'image' }
  | { type: 'shape'; shape: 'circle' | 'rectangle' | 'triangle' | null }


type Notification = {
    id: string,    
    type: 'error' | 'success',
    message: string,
    info?: string,
}

export type {
    Presentation,
    Slide,
    SlideObject,
    Background,
    Color,
    Image,
    CommonObject,
    Position,
    Size,
    TextArea,
    ImageArea,
    Tool,
    Notification
}