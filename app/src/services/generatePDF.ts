import { jsPDF } from 'jspdf';
import { Slide } from "../../../types";
import { loadFonts } from './fonts';

const getImageFromBase64 = async (base64string: string): Promise<string> => {
    return base64string.includes('base64,') ? base64string : `data:image/jpeg;base64,${base64string}`;
};

export const generatePDF = async (slideList: Slide[], title: string) => {
    try {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [1080, 1920],
            hotfixes: ["px_scaling"]
        });

        loadFonts(doc)

        for (let i = 0; i < slideList.length; i++) {
            if (i > 0) doc.addPage();

            const slide = slideList[i];
            const pageHeight = doc.internal.pageSize.getHeight();
            const pageWidth = doc.internal.pageSize.getWidth();

            // Фон
            if (slide.background.type === 'color') {
                doc.setFillColor(slide.background.value);
                doc.rect(0, 0, pageWidth, pageHeight, 'F');
            } else if (slide.background.type === 'image') {
                const imgData = await getImageFromBase64(slide.background.src);
                doc.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight);
            }

            // Объекты
            for (const obj of slide.objects) {
                if (obj.type === 'text') {
                    doc.setFont(obj.font.fontFamily, 'normal');
                    doc.setFontSize(obj.font.size);
                    doc.setTextColor(obj.font.color);
                    
                    // Вычисляем позицию левого верхнего угла текста
                    const xPos = obj.position.x - (obj.size.w / 2);
                    // Конвертируем Y-координату, учитывая, что в PDF начало координат снизу
                    const yPos = obj.position.y - (obj.size.h / 2)
                    
                    doc.text(
                        obj.value, 
                        xPos,
                        yPos,
                        { 
                            baseline: 'bottom',
                            align: 'left',
                            maxWidth: obj.size.w
                        }
                    );
                } else if (obj.type === 'image') {
                    const imgData = await getImageFromBase64(obj.src);
                    
                    // Вычисляем позицию левого верхнего угла изображения
                    const xPos = obj.position.x - (obj.size.w / 2);
                    // Конвертируем Y-координату
                    const yPos = pageHeight - (obj.position.y + (obj.size.h / 2));
                    
                    doc.addImage(
                        imgData,
                        'JPEG',
                        xPos,
                        yPos,
                        obj.size.w,
                        obj.size.h
                    );
                }
            }
        }

        doc.save(`${title || 'presentation'}.pdf`);

    } catch (error) {
        console.error('Ошибка при генерации PDF:', error);
        throw error;
    }
};