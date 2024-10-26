const getTextWidth = (text: string, font: string): number => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (context) {
        context.font = font
        return context.measureText(text).width
    }
    return 0
}

const resizeInput = (input: HTMLInputElement) => {
    console.log('resizeInput called');
    if (input) {
        const font = window.getComputedStyle(input).font
        const textWidth = getTextWidth(input.value || input.placeholder, font)
        input.style.width = `${textWidth}px`
    }
};

export { getTextWidth, resizeInput };
