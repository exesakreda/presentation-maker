export const getImageDimensions = (src: string): Promise<{ h: number, w: number }> => {
    return new Promise((resolve) => {
        const img = new Image()
        img.src = src
        img.onload = () => {
            resolve({ w: img.width / 2, h: img.height / 2 })
        }
    })
}