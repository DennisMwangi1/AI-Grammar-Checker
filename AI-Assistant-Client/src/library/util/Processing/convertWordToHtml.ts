import * as mammoth from "mammoth";

/**
 * Converts a DOCX file to HTML format using Mammoth.
 * 
 * @param {File} file - The DOCX file to be converted.
 * @returns {Promise<string | undefined>} A promise that resolves to the HTML string, 
 * or undefined if an error occurs during conversion.
 */

export const convertWordToHtml = async (
  file: File
): Promise<string | undefined> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const mammothResult = await mammoth.convertToHtml({ arrayBuffer });
    return mammothResult.value;
  } catch (error) {
    console.error("Error converting DOCX to HTML using Mammoth:", error);
    return undefined;
  }
};
