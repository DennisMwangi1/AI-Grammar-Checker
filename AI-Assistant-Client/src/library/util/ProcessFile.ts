import { convertPdfToHtmlWithMammoth } from "./Processing/convertPdfToHtmlWithMammoth";
import { convertWordToHtml } from "./Processing/convertWordToHtml";
import { readTextFile } from "./Processing/readTextFile";

/**
 * Process a given file and return the extracted text.
 * @param {File} file - File to process
 * @returns {Promise<string | undefined>} - Extracted text or undefined if the file is not supported
 */
export const processFile = async (file: File) => {
  if (!file) return;
  let result;
  switch (file.type) {
    case "text/plain":
      result = await readTextFile(file);
      break;
    case "application/pdf":
      result = await convertPdfToHtmlWithMammoth(file);
      break;
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      result = await convertWordToHtml(file);
      break;
    default:
      console.warn("Unsupported file type");
      break;
  }

  return result;
};
