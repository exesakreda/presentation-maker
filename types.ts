type Presentation = {
    title: string,
    slideList: Slide[],
}

type Slide = {
    id: string,
    background: 'color' | 'image',
    objects: SlideObject[],
}

type SelectedSlides = {
    selectedSlideID: string,
}

type SlideObject = {
    id: string,
    position: {
        x: number,
        y: number,
    }

    size: {
        h: number,
        w: number,
    }
}

type TextArea = SlideObject & {
    value: string, 
    fontFamily: string,
    textSize: number,
}

type Image = SlideObject & {
    src: string,
}