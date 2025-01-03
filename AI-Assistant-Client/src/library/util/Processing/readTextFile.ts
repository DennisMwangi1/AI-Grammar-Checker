/**
 * Reads a plain text file and returns its content as a string.
 * 
 * @param {File} file - The file to be read, which must be of type "text/plain".
 * @returns {Promise<string>} - A promise that resolves with the file's content as a string.
 * 
 * @throws {Error} - Throws an error if the file type is not "text/plain" or if there is an error reading the file.
 */

export const readTextFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (file.type !== "text/plain") {
      return reject(
        new Error("Invalid file type. Only plain text files are supported.")
      );
    }

    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };

    reader.readAsText(file, "utf-8"); // Ensures the encoding is UTF-8
  });
};
