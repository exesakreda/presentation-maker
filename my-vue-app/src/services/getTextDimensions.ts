const getTextHeight = (text: string, font: string): number => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
        context.font = font;
        const metrics = context.measureText(text);
        const height = Math.max(metrics.fontBoundingBoxAscent || 0, metrics.fontBoundingBoxDescent || 0);
        return height;
    }
    return 0;
};

const getTextWidth = (text: string, font: string): number => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
        context.font = font;
        const metrics = context.measureText(text);
        return metrics.width;
    }
    return 0;
};

export { getTextWidth, getTextHeight }