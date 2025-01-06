import ConvertApi from "convertapi-js";
import * as mammoth from "mammoth";

/**
 * Converts a PDF file to HTML using the ConvertAPI and Mammoth libraries.
 * @param {File} file The PDF file to convert
 * @returns {Promise<string | undefined>} The extracted HTML content of the PDF file, or undefined if conversion fails
 */
export const convertPdfToHtmlWithMammoth = async (
  file: File
): Promise<string | undefined> => {
  try {
    const convertApiKey = import.meta.env.VITE_CONVERT_API_KEY;
    const convertApi = ConvertApi.auth(convertApiKey || "");

    const params = convertApi.createParams();
    params.add("File", file);

    const conversionResult = await convertApi.convert("pdf", "docx", params);
    const docxUrl = conversionResult.files[0].Url;

    const docxResponse = await fetch(docxUrl);
    const docxArrayBuffer = await docxResponse.arrayBuffer();

    const mammothResult = await mammoth.convertToHtml({
      arrayBuffer: docxArrayBuffer,
    });

    return mammothResult.value;
  } catch (error) {
    console.error("Error converting PDF to HTML using Mammoth:", error);
    return undefined;
  }
};
