import mammoth from 'mammoth';
export const preProcessDOCXFile = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.convertToHtml({ arrayBuffer });
    return result.value
 };