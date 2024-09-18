export type Presentation = {
    title: string,
    slideList: Slide[],
    selectedSlides: string[],
}

export type Slide = {
    id: string,
    background: Background,
    objects: SlideObject[],
}

export type SlideObject = TextArea | ImageArea

export type Background = Color | Image

export type Color = {
    value: string
}

export type Image = {
    src: string
}

export type SelectedObjects = { 
    slideId: string,
    selectedObjects: string[],
}

export type CommonObject = {
    id: string,
    position: Position,
    size: Size,
}

export type Position = {
    x: number,
    y: number,
}

export type Size = {
    h: number,
    w: number,
}

export type TextArea = CommonObject & {
    value: string, 
    fontFamily: string,
    textSize: number,
    type: 'text',
}

type ImageArea = CommonObject & {
    src: string,
    type: 'image',
}