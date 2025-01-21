import { getTextWidth } from "./getTextDimensions"

const resizeInput = (input: HTMLInputElement) => {
    if (input) {
        const computedStyle = window.getComputedStyle(input)
        const font = `${computedStyle.fontWeight} ${computedStyle.fontSize} ${computedStyle.fontFamily}`
        const textWidth = getTextWidth(input.value || input.placeholder, font)
        input.style.width = `${textWidth}px`
    }
}

export { resizeInput }