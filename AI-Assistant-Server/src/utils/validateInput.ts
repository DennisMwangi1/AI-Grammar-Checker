/**
 * Validate if the given input is a non-empty string.
 * @param {any} value - The value to be validated
 * @returns {{ isValid: boolean, message?: string }} - An object with a boolean
 *   indicating whether the input is valid and an optional message explaining
 *   why the input is invalid.
 */
export const validateInput = (value: any): { isValid: boolean; message?: string } => {
  if (!value || typeof value !== "string" || value.trim() === "") {
    return {
      isValid: false,
      message: "Invalid input. 'value' must be a non-empty string.",
    };
  }
  return { isValid: true };
};
