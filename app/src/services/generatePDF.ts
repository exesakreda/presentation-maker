import { Slide } from "../../../types"

declare const html2pdf: any

const createSlideHTML = (slide: Slide, isLast: boolean): HTMLDivElement => {
    const slideDiv = document.createElement('div')
    slideDiv.className = 'pdf-slide'
    slideDiv.style.cssText = `    
        position: relative;
        ${isLast ? '' : 'page-break-after: always;'}        
    `

    if (slide.background.type === 'color') {
        const backgroundDiv = document.createElement('div')
        backgroundDiv.style.cssText = `
            background-color: ${slide.background.value};
            width: 1920px;
            height: 1080px;
            position: absolute;
            top: 0;
            left: 0
        `
        slideDiv.appendChild(backgroundDiv)
    }

    if (slide.background.type === 'image') {
        // slideDiv.style.backgroundImage = `url(${slide.background.src})`
        const backgroundImg = document.createElement('img')
        backgroundImg.src = slide.background.src
        backgroundImg.style.cssText = `
            width: 1920px;
            height: 1080px;
            object-fit: cover;
            top: 0;
            left: 0
        `
        slideDiv.appendChild(backgroundImg)
        // slideDiv.style.backgroundSize = 'cover'
        // slideDiv.style.backgroundPosition = 'center'
    }

    slide.objects.forEach(obj => {
        const element = document.createElement('div')
        element.style.cssText = `
            position: absolute;
            left: ${obj.position.x - obj.size.w / 2}px;
            top: ${obj.position.y - obj.size.h / 2}px;
            textWrap: wrap
        `

        if (obj.type === 'text') {
            element.style.cssText += `
                width: ${obj.size.w}px;
                height: ${obj.size.h}px;
                color: ${obj.font.color};
                font-family: '${obj.font.fontFamily}';
                font-size: ${obj.font.size}px;
                font-weight: ${obj.font.weight};
                white-space: pre-wrap;
                word-wrap: break-word;
                overflow-wrap: break-word;
            `
            element.textContent = obj.value
        } else if (obj.type === 'image') {
            const img = document.createElement('img')
            img.src = obj.src
            img.style.cssText = `
                width: ${obj.size.w}px;
                height: ${obj.size.h}px;
                object-fit: contain;
            `
            element.appendChild(img)
        }

        slideDiv.appendChild(element)
    })

    return slideDiv
}

export const generatePDF = async (slideList: Slide[], title: string) => {
    try {
        const container = document.createElement('div')
        container.style.cssText = `
            width: 1920px;
            height: ${1080 * slideList.length}px;
        `
        const style = document.createElement('style')
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Alumni+Sans:ital,wght@0,100..900;1,100..900&family=Geologica:wght@100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto+Flex:opsz,wght@8..144,100..1000&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Unbounded:wght@200..900&display=swap');`
        container.appendChild(style)
        slideList.forEach(slide => {
            container.appendChild(createSlideHTML(slide, slide === slideList[slideList.length - 1]))
        })

        document.body.appendChild(container)

        await document.fonts.ready

        const opt = {
            margin: 0,
            filename: `${title || 'presentation'}.pdf`,
            image: { type: 'jpeg', quality: 1 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                letterRendering: true,
                logging: false
            },
            jsPDF: {
                unit: 'px',
                format: [1920, 1080],
                orientation: 'landscape',
            }
        }

        const pdf = await html2pdf().set(opt).from(container).output('blob')
        // await html2pdf().set(opt).from(container).save();

        document.body.removeChild(container)
        return pdf

    } catch (error) {
        console.error('Ошибка при генерации PDF:', error)
    }
}