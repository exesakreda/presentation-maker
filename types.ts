type Presentation = {
    title: string,
    slideList: Slide[],
    selectedSlides: string[],
}

type Slide = {
    id: string,
    background: Background,
    objects: SlideObject[],
}

type SlideObject = TextArea | ImageArea

type Background = Color | Image

type Color = {
    value: string
}

type Image = {
    src: string
}

type SelectedObjects = { 
    slideId: string,
    selectedObjects: string[],
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