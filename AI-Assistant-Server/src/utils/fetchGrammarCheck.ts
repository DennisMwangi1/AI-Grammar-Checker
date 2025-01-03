import axios from 'axios';

/**
 * Performs a grammar check on the given text using the LanguageTool API.
 *
 * @param {string} text - The text to be checked.
 * @returns {Promise<any>} - A promise that resolves with an object containing the API response data and status.
 * If the request fails, the promise resolves with an object containing the error message and status.
 */
export const fetchGrammarCheck = async (text: string): Promise<any> => {
  try {
    const response = await axios.post(
      "https://api.languagetool.org/v2/check",
      new URLSearchParams({
        text,
        language: "en",
        isPreferedVariant: "true",
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    return { data: response.data, status: response.status };
  } catch (error: any) {
    console.error(
      "Error during grammar check:",
      error.response?.data || error.message
    );
    return {
      status: error.response?.status || 500,
      data: error.response?.data || error.message,
    };
  }
};
