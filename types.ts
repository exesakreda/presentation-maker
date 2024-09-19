export type Presentation = {
    title: string,
    slideList: Slide[],
    selectedSlides: string[],
}

export type Slide = {
    id: string,
    background: Background,
    objects: SlideObject[],
    selectedObjects: string[]
}

export type SlideObject = TextArea | ImageArea

export type Background = Color | Image

export type Color = {
    type: 'color',
    value: string
}

export type Image = {
    type: 'image',
    src: string
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


// 1 export type
export type {

}