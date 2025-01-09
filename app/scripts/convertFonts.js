const fs = require('fs');
const path = require('path');

const FONTS_DIR = path.join(__dirname, '../src/assets/fonts');

const fonts = [
    { name: 'AlumniSans', file: 'AlumniSans-VariableFont_wght.ttf' },
    { name: 'Geologica', file: 'Geologica-VariableFont_CRSV,SHRP,slnt,wght.ttf' },
    { name: 'Inter', file: 'Inter-VariableFont_opsz,wght.ttf' },
    { name: 'JetBrainsMono', file: 'JetBrainsMono-VariableFont_wght.ttf' },
    { name: 'Montserrat', file: 'Montserrat-VariableFont_wght.ttf' },
    { name: 'OpenSans', file: 'OpenSans-VariableFont_wdth,wght.ttf' },
    { name: 'RobotoFlex', file: 'RobotoFlex-VariableFont_GRAD,XOPQ,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf' },
    { name: 'TildaSans', file: 'TildaSans-VF.ttf' },
    { name: 'Unbounded', file: 'Unbounded-Variable.ttf' }
];

let output = `import { jsPDF } from 'jspdf';\n\n`;
output += `export const loadFonts = (doc: jsPDF) => {\n`;

fonts.forEach(font => {
    try {
        const fontPath = path.join(FONTS_DIR, font.file);
        const fontBuffer = fs.readFileSync(fontPath);
        const base64Font = fontBuffer.toString('base64');

        output += `  doc.addFileToVFS('${font.file}', '${base64Font}');\n`;
        output += `  doc.addFont('${font.file}', '${font.name}', 'normal');\n\n`;
    } catch (error) {
        console.error(`Ошибка при обработке шрифта ${font.file}:`, error);
    }
});

output += `};\n`;

fs.writeFileSync(
    path.join(__dirname, '../src/services/fonts.ts'),
    output
);

console.log('Шрифты успешно сконвертированы!');