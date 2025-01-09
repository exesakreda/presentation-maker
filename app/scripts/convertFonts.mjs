import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const FONTS_DIR = join(__dirname, '../src/assets/fonts');

const fonts = [
    { name: 'Alumni Sans', file: 'AlumniSans-VariableFont_wght.ttf' },
    { name: 'Geologica', file: 'Geologica-VariableFont_CRSV,SHRP,slnt,wght.ttf' },
    { name: 'Inter', file: 'Inter-VariableFont_opsz,wght.ttf' },
    { name: 'JetBrains Mono', file: 'JetBrainsMono-VariableFont_wght.ttf' },
    { name: 'Montserrat', file: 'Montserrat-VariableFont_wght.ttf' },
    { name: 'Open Sans', file: 'OpenSans-VariableFont_wdth,wght.ttf' },
    { name: 'Roboto Flex', file: 'RobotoFlex-VariableFont_GRAD,XOPQ,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf' },
    { name: 'Tilda Sans', file: 'TildaSans-VF.ttf' },
    { name: 'Unbounded', file: 'Unbounded-Variable.ttf' }
];

let output = `import { jsPDF } from 'jspdf';\n\n`;
output += `// Карта соответствия имен шрифтов\n`;
output += `export const fontMap: { [key: string]: string } = {\n`;
fonts.forEach(font => {
    output += `  '${font.name}': '${font.name}',\n`;
});
output += `};\n\n`;

output += `export const loadFonts = (doc: jsPDF) => {\n`;

fonts.forEach(font => {
    try {
        const fontPath = join(FONTS_DIR, font.file);
        const fontBuffer = readFileSync(fontPath);
        const base64Font = fontBuffer.toString('base64');

        output += `  // ${font.name}\n`;
        output += `  doc.addFileToVFS('${font.file}', '${base64Font}');\n`;
        output += `  doc.addFont('${font.file}', '${font.name}', 'normal');\n\n`;
    } catch (error) {
        console.error(`Ошибка при обработке шрифта ${font.file}:`, error);
    }
});

output += `};\n`;

writeFileSync(
    join(__dirname, '../src/services/fonts.ts'), 
    output,
    'utf-8'
);

console.log('Шрифты успешно сконвертированы!'); 