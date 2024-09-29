type Presentation = {
    title: string,
    slideList: Slide[],
    selectedSlides: string[],
}

type Slide = {
    id: string,
    background: Background,
    objects: SlideObject[],
    selectedObjects: string[]
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
    fontFamily: string,
    textSize: number,
    type: 'text',
}

type ImageArea = CommonObject & {
    src: string,
    type: 'image',
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
}